import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { chatService } from '../services/chat';
import type { Persona } from '../types';

interface ChatPageProps {
  persona: Persona;
  onBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ persona, onBack }) => {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; isUser: boolean; isLoading?: boolean }>>([]);
  const [isSending, setIsSending] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current;
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages]);

  // Initialize chat session and load messages
  useEffect(() => {
    const initializeChat = async () => {
      if (!user) return;

      try {
        // Create or get existing chat session
        const { chat, error: chatError } = await chatService.createChatSession(user.id, persona.id);
        
        if (chatError) {
          console.error('Error creating chat session:', chatError);
          return;
        }

        if (chat) {
          setChatId(chat.id);

          // Load existing messages
          const { messages, error: messagesError } = await chatService.getChatMessages(chat.id);
        
          if (messagesError) {
            console.error('Error loading messages:', messagesError);
            return;
          }

          // Convert database messages to UI format
          const uiMessages = messages.map(msg => ({
            id: msg.id,
            text: msg.content,
            isUser: msg.role === 'user',
          }));

          console.log('Loading messages from database:', uiMessages.length, 'messages');
          setMessages(uiMessages);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    // Only initialize if we don't have a chatId yet
    if (!chatId) {
      initializeChat();
    }
  }, [user, persona.id, chatId]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || !chatId || !user) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
    };

    const tempBotMessage = {
      id: (Date.now() + 1).toString(),
      text: "...",
      isUser: false,
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, tempBotMessage]);
    setInputMessage('');
    setIsSending(true);
    
    // Force scroll to bottom when user sends message
    setTimeout(scrollToBottom, 50);

    try {
      // Update chat session timestamp
      await chatService.updateChatSession(chatId);

      // Send message to N8N (N8N will handle all message storage)
      const response = await apiService.sendMessageToChat(persona.id, messageText, chatId, user.id);
      
      // Check if N8N returned a response directly
      if (response && Array.isArray(response) && response.length > 0 && response[0].output) {
        // N8N returned response directly, update the temp message
        setMessages(prev => prev.map(msg => 
          msg.id === tempBotMessage.id 
            ? { id: msg.id, text: response[0].output, isUser: false }
            : msg
        ));
      } else {
        // N8N saved to database, reload messages
        // Wait a moment for N8N to process and save messages
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Reload messages from N8N storage
        const { messages: updatedMessages } = await chatService.getChatMessages(chatId);
        const uiMessages = updatedMessages.map(msg => ({
          id: msg.id,
          text: msg.content,
          isUser: msg.role === 'user',
        }));
        console.log('Reloading messages after N8N response:', uiMessages.length, 'messages');
        setMessages(uiMessages);
      }
      
      // Force scroll to bottom when bot responds
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === tempBotMessage.id 
          ? { id: msg.id, text: "Вибачте, сталася помилка. Спробуйте ще раз.", isUser: false }
          : msg
      ));
      
      // Force scroll to bottom on error
      setTimeout(scrollToBottom, 100);
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showBackButton onBackClick={onBack} />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto px-4 w-full">
        {/* Persona Header */}
        <div className="text-center mb-16 pt-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
            <img
              src={persona.avatar}
              alt={persona.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-forum text-text mb-4">
            {persona.displayName}
          </h1>
          <p className="text-base font-ibm font-light text-text max-w-2xl mx-auto">
            Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.
          </p>
        </div>

        {/* Scrollable Content Area */}
        <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pb-4">
          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {persona.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-6 bg-white text-left hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col items-start text-left gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 18.1542C6.53967 18.1542 6.13933 18.0001 5.799 17.6917C5.45867 17.3834 5.25642 16.9992 5.19225 16.539H8.80775C8.74358 16.9992 8.54133 17.3834 8.201 17.6917C7.86067 18.0001 7.46033 18.1542 7 18.1542ZM3.5 14.7697V13.7697H10.5V14.7697H3.5ZM3.55775 12.0005C2.61292 11.3813 1.86708 10.5961 1.32025 9.64474C0.773417 8.69341 0.5 7.64532 0.5 6.50049C0.5 4.68632 1.12983 3.14949 2.3895 1.88999C3.649 0.630322 5.18583 0.000488281 7 0.000488281C8.81417 0.000488281 10.351 0.630322 11.6105 1.88999C12.8702 3.14949 13.5 4.68632 13.5 6.50049C13.5 7.64532 13.2266 8.69341 12.6798 9.64474C12.1329 10.5961 11.3871 11.3813 10.4423 12.0005H3.55775Z" fill="#2DADA4"/>
                      </svg>
                    </div>
                    <span className="text-lg font-forum text-[#284541] leading-relaxed">
                      {suggestion}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-white text-text'
                  } ${message.isLoading ? 'animate-pulse' : ''}`}
                >
                  <p className="text-base font-ibm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Input */}
        <div className="sticky bottom-0 bg-background pt-4 pb-8">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Поставте запитання"
              className="w-full px-4 py-4 pr-16 bg-white text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
