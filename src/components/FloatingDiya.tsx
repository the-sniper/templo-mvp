import { useState, useEffect } from 'react';

// Collection of spiritual GIFs/animations to randomly display
const spiritualElements = [
  { emoji: '🪔', label: 'Diya' },
  { emoji: '🕉️', label: 'Om' },
  { emoji: '🔔', label: 'Temple Bell' },
  { emoji: '🪷', label: 'Lotus' },
  { emoji: '🙏', label: 'Namaste' },
  { emoji: '📿', label: 'Prayer Beads' },
  { emoji: '✨', label: 'Divine Light' },
  { emoji: '🌸', label: 'Flower' },
  { emoji: '🌺', label: 'Hibiscus' },
  { emoji: '🪻', label: 'Hyacinth' },
  { emoji: '🌼', label: 'Blossom' },
  { emoji: '💐', label: 'Bouquet' },
  { emoji: '🏵️', label: 'Rosette' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🌟', label: 'Glowing Star' },
];

const FloatingDiya = () => {
  const [currentElement, setCurrentElement] = useState(spiritualElements[0]);

  // Select a random spiritual element on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * spiritualElements.length);
    setCurrentElement(spiritualElements[randomIndex]);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-40 pointer-events-none">
      <div className="relative animate-pulse">
        {/* Glow effect */}
        <div className="absolute inset-0 w-10 h-10 rounded-full bg-primary/30 blur-xl" />
        
        {/* Spiritual Element */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <span 
            className="text-3xl animate-bounce" 
            style={{ animationDuration: '2.5s' }}
            title={currentElement.label}
          >
            {currentElement.emoji}
          </span>
        </div>
        
        {/* Floating particles */}
        <div 
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/60 animate-ping" 
          style={{ animationDuration: '1.5s' }} 
        />
        <div 
          className="absolute -top-3 left-1/3 w-1 h-1 rounded-full bg-accent/60 animate-ping" 
          style={{ animationDuration: '2s', animationDelay: '0.5s' }} 
        />
        <div 
          className="absolute -top-1 right-1/4 w-0.5 h-0.5 rounded-full bg-primary/40 animate-ping" 
          style={{ animationDuration: '2.5s', animationDelay: '1s' }} 
        />
      </div>
    </div>
  );
};

export default FloatingDiya;
