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
    <div className="h-screen bg-[#ECF0EF] flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-2 w-full min-h-0" style={{ paddingTop: '25%', paddingBottom: '10%' }}>
        <h1 className="font-forum text-xl sm:text-2xl lg:text-3xl text-center mb-2 lg:mb-4 max-w-full" style={{ marginTop: '-10px' }}>Оберіть персону</h1>
        <div className="w-full max-w-4xl mx-auto px-2 flex items-center justify-center min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full h-full max-h-[50vh]">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handlePersonaClick(persona.id)}
                className="cursor-pointer hover:shadow-xl transition-shadow duration-200 w-full relative overflow-hidden rounded-lg shadow-lg max-w-full h-full"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={persona.avatar}
                  alt={persona.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonaSelectionPage;
