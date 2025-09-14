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
    <div className="min-h-screen bg-[#ECF0EF]">
      <Header />
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="font-forum text-5xl text-center mb-12">Оберіть персону</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {personas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonaClick(persona.id)}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-200 w-full relative overflow-hidden"
            >
              <img
                src={persona.avatar}
                alt={persona.displayName}
                className="w-full h-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PersonaSelectionPage;
