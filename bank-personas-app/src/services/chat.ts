import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  chat_id: string;
  user_id: string;
  persona_id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  persona_id: string;
  created_at: string;
  updated_at: string;
}

class ChatService {
  async createChatSession(userId: string, personaId: string): Promise<{ chat: ChatSession | null; error: any }> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          user_id: userId,
          persona_id: personaId,
        }
      ])
      .select()
      .single();

    return { chat: data, error };
  }

  async getChatSessions(userId: string): Promise<{ chats: ChatSession[]; error: any }> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    return { chats: data || [], error };
  }

  async getChatMessages(chatId: string): Promise<{ messages: ChatMessage[]; error: any }> {
    // Use the view instead of direct table access since n8n_chat_histories has limited columns
    const { data, error } = await supabase
      .from('chat_messages_view')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      return { messages: [], error };
    }

    // Convert view format to our ChatMessage format
    const messages = (data || []).map((msg: any) => ({
      id: msg.id,
      chat_id: msg.chat_id,
      user_id: msg.user_id,
      persona_id: msg.persona_id,
      content: msg.content,
      role: msg.role,
      created_at: msg.created_at,
    }));

    return { messages, error: null };
  }

  // Note: Message saving is now handled by N8N
  // This method is kept for backward compatibility but does nothing
  async saveMessage(
    chatId: string,
    userId: string,
    personaId: string,
    content: string,
    isUser: boolean
  ): Promise<{ message: ChatMessage | null; error: any }> {
    // N8N handles all message storage now
    // This is a no-op method for backward compatibility
    return { message: null, error: null };
  }

  async updateChatSession(chatId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chatId);

    return { error };
  }

  subscribeToChatMessages(chatId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat-${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'n8n_chat_histories',
          filter: `session_id=eq.${chatId}`,
        },
        async (payload) => {
          // Since n8n_chat_histories has limited columns, we need to fetch the full message
          // from the view to get user_id, persona_id, etc.
          const { data: sessionData } = await supabase
            .from('chat_sessions')
            .select('user_id, persona_id')
            .eq('id', chatId)
            .single();

          const newMessage: ChatMessage = {
            id: payload.new.id,
            chat_id: payload.new.session_id,
            user_id: sessionData?.user_id || '',
            persona_id: sessionData?.persona_id || '',
            content: payload.new.message, // N8N uses 'message' not 'content'
            role: 'assistant', // N8N doesn't store role, assume assistant
            created_at: new Date().toISOString(), // N8N doesn't store timestamps
          };
          callback(newMessage);
        }
      )
      .subscribe();
  }
}

export const chatService = new ChatService();
