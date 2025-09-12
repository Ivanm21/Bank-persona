import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { personas } from '../utils/constants';
import { apiService } from '../services/api';
import { Message } from '../types';

const ChatPage: React.FC = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persona = personas.find(p => p.id === personaId);

  useEffect(() => {
    if (!persona) {
      navigate('/personas');
      return;
    }
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: `Привіт! Я ${persona.displayName}. Чим можу допомогти?`,
      isUser: false,
      timestamp: new Date(),
      persona: persona.name,
    };
    setMessages([welcomeMessage]);
  }, [persona, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || !persona || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.sendMessage({
        persona: persona.name,
        message: messageText,
      });

      if (response.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data?.message || 'Дякую за ваше повідомлення!',
          isUser: false,
          timestamp: new Date(),
          persona: persona.name,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        setError(response.error || 'Помилка при відправці повідомлення');
      }
    } catch (err) {
      setError('Помилка мережі. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleBackClick = () => {
    navigate('/personas');
  };

  if (!persona) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton onBackClick={handleBackClick} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Persona Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h1 className="text-5xl font-forum text-text mb-4">
            {persona.displayName}
          </h1>
          <p className="text-base font-ibm font-light text-text max-w-2xl mx-auto">
            {persona.description}
          </p>
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            {persona.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-5 bg-white rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-0.5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#2DADA4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-forum text-text">
                    {suggestion}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4 mb-8">
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
                }`}
              >
                <p className="text-base font-ibm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Поставте запитання"
            className="flex-1 px-4 py-4 bg-white rounded-lg text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
