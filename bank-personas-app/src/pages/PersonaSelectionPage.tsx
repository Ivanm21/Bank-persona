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
              className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <div
                style={{
                  width: '100%',
                  paddingTop: '75%', // 4:3 aspect ratio
                  backgroundImage: `url(${persona.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PersonaSelectionPage;
