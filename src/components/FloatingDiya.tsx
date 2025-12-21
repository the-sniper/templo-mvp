import { useState, useEffect } from 'react';

const FloatingDiya = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="fixed top-20 right-4 z-40 pointer-events-none">
      <div className="relative animate-pulse">
        {/* Glow effect */}
        <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary/30 blur-xl" />
        
        {/* Diya */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
            🪔
          </span>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: '1.5s' }} />
        <div className="absolute -top-3 left-1/3 w-0.5 h-0.5 rounded-full bg-accent/60 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default FloatingDiya;
