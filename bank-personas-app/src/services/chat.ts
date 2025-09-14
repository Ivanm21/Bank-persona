import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  chat_id: string;
  user_id: string;
  persona_id: string;
  message: string;
  is_user: boolean;
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
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    return { messages: data || [], error };
  }

  async saveMessage(
    chatId: string,
    userId: string,
    personaId: string,
    message: string,
    isUser: boolean
  ): Promise<{ message: ChatMessage | null; error: any }> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          chat_id: chatId,
          user_id: userId,
          persona_id: personaId,
          message,
          is_user: isUser,
        }
      ])
      .select()
      .single();

    return { message: data, error };
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
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          callback(payload.new as ChatMessage);
        }
      )
      .subscribe();
  }
}

export const chatService = new ChatService();
