import React from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBackClick }) => {
  return (
    <header className="flex items-center p-6 bg-background">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 relative">
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8936 34.2637L13.1582 39.999L11.459 29.3076L17.1943 23.5723L18.8936 34.2637ZM28.5371 29.3076L26.8379 39.999L21.1025 34.2637L22.8018 23.5723L28.5371 29.3076ZM16.4268 22.8018L10.6816 28.5381L-0.000976562 26.8389L5.73438 21.1035L16.4268 22.8018ZM40.001 26.8389L29.3086 28.5381L23.5732 22.8027L34.2646 21.1035L40.001 26.8389ZM16.4268 17.1982L5.73438 18.8965L-0.000976562 13.1611L10.6904 11.4619L16.4268 17.1982ZM40.001 13.1611L34.2646 18.8965L23.5732 17.1982L29.3086 11.4629L40.001 13.1611ZM18.8936 5.73535L17.1943 16.4277L11.459 10.6914L13.1582 0L18.8936 5.73535ZM28.5371 10.6826L22.8008 16.4277L21.1025 5.73535L26.8379 0L28.5371 10.6826Z" fill="#2DADA4"/>
          </svg>
        </div>
        <h1 className="text-xs font-ibm uppercase text-text">
          PIVDENNY INSIGHTS AGENT
        </h1>
      </div>
      
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="flex items-center gap-1 text-text hover:opacity-80 transition-opacity ml-6"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-ibm uppercase">назад до персон</span>
        </button>
      )}
    </header>
  );
};

export default Header;
