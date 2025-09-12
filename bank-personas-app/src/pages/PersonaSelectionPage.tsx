import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { personas } from '../utils/constants';

const PersonaSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePersonaClick = (personaId: string) => {
    navigate(`/chat/${personaId}`);
  };

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
                onClick={() => handlePersonaClick(persona.id)}
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

export default PersonaSelectionPage;
