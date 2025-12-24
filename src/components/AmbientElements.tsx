import { useEffect, useState } from 'react';

const AmbientElements = () => {
  const [opacity, setOpacity] = useState(0.05);

  useEffect(() => {
    // Gentle opacity breathing effect
    const interval = setInterval(() => {
      setOpacity(prev => {
        const next = prev + (Math.random() > 0.5 ? 0.01 : -0.01);
        return Math.max(0.04, Math.min(0.08, next));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Left Side Ambient Elements */}
      <div 
        className="fixed left-0 top-0 h-full w-16 sm:w-24 pointer-events-none hidden lg:block z-0"
        style={{ opacity }}
      >
        <div className="h-full flex flex-col justify-around items-center py-32">
          {/* Temple Bell Silhouette */}
          <svg viewBox="0 0 40 60" className="w-8 h-12 text-primary/30 animate-ambient-drift">
            <path 
              fill="currentColor" 
              d="M20 0c-1 0-2 1-2 2v4c-6 2-10 8-10 15v12c0 2-2 4-4 6v2h32v-2c-2-2-4-4-4-6V21c0-7-4-13-10-15V2c0-1-1-2-2-2zm-6 45v4h12v-4H14zm6 6c-2 0-4 2-4 4h8c0-2-2-4-4-4z"
            />
          </svg>
          
          {/* Oil Lamp Silhouette */}
          <svg viewBox="0 0 40 50" className="w-8 h-10 text-primary/25 animate-ambient-drift-slow">
            <ellipse cx="20" cy="40" rx="16" ry="6" fill="currentColor"/>
            <path 
              fill="currentColor" 
              d="M12 40v-8c0-4 4-7 8-7s8 3 8 7v8"
            />
            <path 
              fill="currentColor" 
              d="M18 25v-8c0-2 2-4 2-8 0 4 2 6 2 8v8"
              className="animate-flame-flicker"
            />
          </svg>
          
          {/* Floral Garland Element */}
          <svg viewBox="0 0 20 80" className="w-4 h-16 text-secondary/20 animate-ambient-drift">
            <circle cx="10" cy="8" r="6" fill="currentColor"/>
            <circle cx="10" cy="24" r="6" fill="currentColor"/>
            <circle cx="10" cy="40" r="6" fill="currentColor"/>
            <circle cx="10" cy="56" r="6" fill="currentColor"/>
            <circle cx="10" cy="72" r="6" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Right Side Ambient Elements */}
      <div 
        className="fixed right-0 top-0 h-full w-16 sm:w-24 pointer-events-none hidden lg:block z-0"
        style={{ opacity }}
      >
        <div className="h-full flex flex-col justify-around items-center py-40">
          {/* Floral Garland */}
          <svg viewBox="0 0 20 80" className="w-4 h-16 text-secondary/20 animate-ambient-drift-slow">
            <circle cx="10" cy="8" r="6" fill="currentColor"/>
            <circle cx="10" cy="24" r="6" fill="currentColor"/>
            <circle cx="10" cy="40" r="6" fill="currentColor"/>
            <circle cx="10" cy="56" r="6" fill="currentColor"/>
            <circle cx="10" cy="72" r="6" fill="currentColor"/>
          </svg>
          
          {/* Temple Bell */}
          <svg viewBox="0 0 40 60" className="w-8 h-12 text-primary/25 animate-ambient-drift">
            <path 
              fill="currentColor" 
              d="M20 0c-1 0-2 1-2 2v4c-6 2-10 8-10 15v12c0 2-2 4-4 6v2h32v-2c-2-2-4-4-4-6V21c0-7-4-13-10-15V2c0-1-1-2-2-2zm-6 45v4h12v-4H14zm6 6c-2 0-4 2-4 4h8c0-2-2-4-4-4z"
            />
          </svg>
          
          {/* Oil Lamp */}
          <svg viewBox="0 0 40 50" className="w-8 h-10 text-primary/30 animate-ambient-drift-slow">
            <ellipse cx="20" cy="40" rx="16" ry="6" fill="currentColor"/>
            <path 
              fill="currentColor" 
              d="M12 40v-8c0-4 4-7 8-7s8 3 8 7v8"
            />
            <path 
              fill="currentColor" 
              d="M18 25v-8c0-2 2-4 2-8 0 4 2 6 2 8v8"
              className="animate-flame-flicker"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default AmbientElements;
