import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { apiService } from './services/api';
import { chatService } from './services/chat';
import { personas } from './utils/constants';
import type { Persona } from './types';

// Header Component
const Header: React.FC<{ showBackButton?: boolean; onBackClick?: () => void; onLogout?: () => void }> = ({ 
  showBackButton = false, 
  onBackClick,
  onLogout
}) => {
  return (
    <header className="relative bg-background" style={{ height: '64px' }}>
      <div 
        className="flex items-center gap-2 absolute"
        style={{
          top: '24px',
          left: '24px',
          width: '183px',
          height: '16px'
        }}
      >
        {/* Correct Figma logo - 16x16px with proper design */}
        <div className="w-4 h-4 relative">
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8936 34.2637L13.1582 39.999L11.459 29.3076L17.1943 23.5723L18.8936 34.2637ZM28.5371 29.3076L26.8379 39.999L21.1025 34.2637L22.8018 23.5723L28.5371 29.3076ZM16.4268 22.8018L10.6816 28.5381L-0.000976562 26.8389L5.73438 21.1035L16.4268 22.8018ZM40.001 26.8389L29.3086 28.5381L23.5732 22.8027L34.2646 21.1035L40.001 26.8389ZM16.4268 17.1982L5.73438 18.8965L-0.000976562 13.1611L10.6904 11.4619L16.4268 17.1982ZM40.001 13.1611L34.2646 18.8965L23.5732 17.1982L29.3086 11.4629L40.001 13.1611ZM18.8936 5.73535L17.1943 16.4277L11.459 10.6914L13.1582 0L18.8936 5.73535ZM28.5371 10.6826L22.8008 16.4277L21.1025 5.73535L26.8379 0L28.5371 10.6826Z" fill="#2DADA4"/>
          </svg>
        </div>
        <h1 style={{
          fontFamily: 'IBM Plex Sans',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          textTransform: 'uppercase',
          width: '159px',
          height: '16px',
          color: '#284541',
          margin: 0,
          padding: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}>
          PIVDENNY INSIGHTS AGENT
        </h1>
      </div>
      
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="flex items-center gap-1 text-text hover:opacity-80 transition-opacity absolute"
          style={{ left: '220px', top: '20px' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-ibm uppercase">назад до персон</span>
        </button>
      )}

      {onLogout && (
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-text hover:opacity-80 transition-opacity absolute"
          style={{ right: '24px', top: '20px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-ibm uppercase">вийти</span>
        </button>
      )}
    </header>
  );
};

// Login Page Component
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      setError(error.message || 'Помилка входу');
      setIsLoading(false);
    } else {
      navigate('/personas');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main container with exact Figma positioning */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-[470px]">
          {/* Title Section - exact Figma specs */}
          <div className="text-center mb-[69px]">
            {/* Central Logo - 40x40px with correct Figma design */}
            <div className="w-10 h-10 mx-auto mb-8">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8936 34.2637L13.1582 39.999L11.459 29.3076L17.1943 23.5723L18.8936 34.2637ZM28.5371 29.3076L26.8379 39.999L21.1025 34.2637L22.8018 23.5723L28.5371 29.3076ZM16.4268 22.8018L10.6816 28.5381L-0.000976562 26.8389L5.73438 21.1035L16.4268 22.8018ZM40.001 26.8389L29.3086 28.5381L23.5732 22.8027L34.2646 21.1035L40.001 26.8389ZM16.4268 17.1982L5.73438 18.8965L-0.000976562 13.1611L10.6904 11.4619L16.4268 17.1982ZM40.001 13.1611L34.2646 18.8965L23.5732 17.1982L29.3086 11.4629L40.001 13.1611ZM18.8936 5.73535L17.1943 16.4277L11.459 10.6914L13.1582 0L18.8936 5.73535ZM28.5371 10.6826L22.8008 16.4277L21.1025 5.73535L26.8379 0L28.5371 10.6826Z" fill="#2DADA4"/>
              </svg>
            </div>
            
            {/* Title with exact Figma specs */}
            <div className="space-y-4">
              <h1 className="text-[48px] font-forum text-text leading-[1.167] font-normal text-center">
                Pivdenny Insights Agent
              </h1>
              <p className="text-base font-ibm font-light text-text leading-[1.5] text-center">
                Для доступу звертайтеся до research@pivdenny.com.
              </p>
            </div>
          </div>

          {/* Login Form - exact Figma specs */}
          <div className="w-[437px] mx-auto">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Введіть електронну пошту"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  style={{
                    width: '437px',
                    height: '56px',
                    paddingTop: '8px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    backgroundColor: '#FFFFFF',
                    color: '#284541',
                    fontSize: '16px',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: '300',
                    lineHeight: '1.5',
                    border: 'none',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  style={{
                    width: '437px',
                    height: '56px',
                    paddingTop: '8px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    backgroundColor: '#FFFFFF',
                    color: '#284541',
                    fontSize: '16px',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: '300',
                    lineHeight: '1.5',
                    border: 'none',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
                
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00A599] text-white font-forum text-[18px] leading-[1.333] hover:bg-[#00A599]/90 transition-colors mt-4 h-[56px] rounded-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Вхід...' : 'Увійти'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Persona Selection Page Component
const PersonaSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleSelectPersona = (personaId: string) => {
    navigate(`/chat/${personaId}`);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#ECF0EF]">
      <Header onLogout={handleLogout} />
      
      <main className="w-full px-4 py-8">
        <h1 className="font-forum text-5xl text-center mb-12">Оберіть персону</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl mx-auto">
          {personas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handleSelectPersona(persona.id)}
              className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 relative overflow-hidden w-full"
              style={{ aspectRatio: '2.2/1' }}
            >
              <img
                src={persona.avatar}
                alt={persona.displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 p-6">
                <h3 className="text-white font-forum text-2xl">
                  {persona.displayName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Chat Page Wrapper Component
const ChatPageWrapper: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personas.find(p => p.id === personaId) || personas[0];
  
  return <ChatPage persona={persona} onBack={onBack} />;
};

// Chat Page Component
const ChatPage: React.FC<{ persona: Persona; onBack: () => void }> = ({ persona, onBack }) => {
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

// ROUTES
export const ROUTES = {
  LOGIN: '/login',
  PERSONAS: '/personas',
  CHAT: '/chat',
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleBack = () => {
    navigate(ROUTES.PERSONAS);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path={ROUTES.LOGIN} 
        element={user ? <Navigate to={ROUTES.PERSONAS} replace /> : <LoginPage />} 
      />
      <Route 
        path={ROUTES.PERSONAS} 
        element={
          <ProtectedRoute>
            <PersonaSelectionPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={`${ROUTES.CHAT}/:personaId`} 
        element={
          <ProtectedRoute>
            <ChatPageWrapper onBack={handleBack} />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to={user ? ROUTES.PERSONAS : ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default App;