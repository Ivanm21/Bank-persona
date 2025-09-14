import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPage from './pages/ChatPage';
import { personas } from './utils/constants';

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

export default App;// Trigger Vercel deployment Sun Sep 14 16:19:18 CEST 2025
