import React, { useState } from 'react';

// Simple types defined inline to avoid import issues
interface LoginFormData {
  email: string;
  password: string;
}

interface Persona {
  id: string;
  name: string;
  displayName: string;
  description: string;
  color: string;
  suggestions: string[];
}

// Dummy data
const personas: Persona[] = [
  {
    id: "business-owner",
    name: "Business Owner",
    displayName: "Business Owner",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    color: "#00A599",
    suggestions: [
      "З якими проблемами зустрічаєшся?",
      "Яких продуктів та сервісів не вистачає?",
      "У чому для тебе цінність банку Південний?"
    ]
  },
  {
    id: "digital-nomad",
    name: "Digital Nomad",
    displayName: "Digital Nomad",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    color: "#2DADA4",
    suggestions: [
      "Як часто використовуєш мобільний банкінг?",
      "Які функції найбільш важливі для тебе?",
      "Чи зручно керувати фінансами в дорозі?"
    ]
  },
  {
    id: "top-manager",
    name: "Top Manager",
    displayName: "Top Manager",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    color: "#284541",
    suggestions: [
      "Вам потрібен преміум менеджер?",
      "Які інвестиційні можливості цікавлять?",
      "Як оцінюєте рівень сервісу?"
    ]
  },
  {
    id: "digital-resident",
    name: "Digital Resident",
    displayName: "Digital Resident",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    color: "#ECF0EF",
    suggestions: [
      "Як часто використовуєш онлайн-платежі?",
      "Чи зручний інтерфейс банківського додатку?",
      "Які додаткові послуги потрібні?"
    ]
  }
];

// Header Component
const Header: React.FC<{ showBackButton?: boolean; onBackClick?: () => void }> = ({ 
  showBackButton = false, 
  onBackClick 
}) => {
  return (
    <header className="relative bg-background" style={{ height: '64px' }}>
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="flex items-center gap-1 text-text hover:opacity-80 transition-opacity absolute left-6 top-6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-ibm uppercase">назад до персон</span>
        </button>
      )}
      
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
    </header>
  );
};

// Login Page Component
const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any login for testing
    onLogin();
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
          <div style={{ marginBottom: '12px' }}>
            <input
              type="email"
              name="email"
              placeholder="Введіть електронну пошту"
              value={formData.email}
              onChange={handleInputChange}
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
                className="w-full bg-[#00A599] text-white font-forum text-[18px] leading-[1.333] hover:bg-[#00A599]/90 transition-colors mt-4 h-[56px] rounded-lg border-0"
              >
                Увійти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Persona Selection Page Component
const PersonaSelectionPage: React.FC<{ onSelectPersona: (persona: Persona) => void; onBack: () => void }> = ({ 
  onSelectPersona, 
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 py-8">
        <h1 className="text-6xl font-forum text-text text-center mb-16">
          Оберіть персону
        </h1>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => onSelectPersona(persona)}
                className="relative h-80 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{ backgroundColor: persona.color }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-forum text-white">
                    {persona.displayName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Page Component
const ChatPage: React.FC<{ persona: Persona; onBack: () => void }> = ({ persona, onBack }) => {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; isUser: boolean }>>([
    { id: '1', text: `Привіт! Я ${persona.displayName}. Чим можу допомогти?`, isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: `Дякую за ваше повідомлення про "${messageText}". Я ${persona.displayName} і готовий допомогти!`,
        isUser: false,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton onBackClick={onBack} />
      
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2DADA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Поставте запитання"
            className="flex-1 px-4 py-4 bg-white rounded-lg text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'personas' | 'chat'>('login');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const handleLogin = () => {
    setCurrentPage('personas');
  };

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setCurrentPage('chat');
  };

  const handleBackToPersonas = () => {
    setCurrentPage('personas');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'personas' && (
        <PersonaSelectionPage 
          onSelectPersona={handleSelectPersona} 
          onBack={handleBackToLogin}
        />
      )}
      {currentPage === 'chat' && selectedPersona && (
        <ChatPage 
          persona={selectedPersona} 
          onBack={handleBackToPersonas}
        />
      )}
    </div>
  );
}

export default App;