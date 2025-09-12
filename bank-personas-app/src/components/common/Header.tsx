import React from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBackClick }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-background">
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="flex items-center gap-1 text-text hover:opacity-80 transition-opacity"
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
      
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-secondary rounded-sm"></div>
        <h1 className="text-xs font-ibm uppercase text-text">
          PIVDENNY INSIGHTS AGENT
        </h1>
      </div>
      
      {!showBackButton && <div className="w-24"></div>}
    </header>
  );
};

export default Header;
