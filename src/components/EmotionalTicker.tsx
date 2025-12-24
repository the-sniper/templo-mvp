import { useState, useEffect } from 'react';

const EmotionalTicker = () => {
  const messages = [
    "Aarti begins at dawn",
    "A bell rings in Thanjavur",
    "Flowers gathered in Madurai",
    "A prayer offered quietly",
    "Incense rises in Kerala",
    "Lamps lit in Varanasi",
    "Chants echo in Tirupati",
    "A devotee bows in silence",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="py-6 bg-gradient-to-r from-transparent via-accent/40 to-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-8">
          <p 
            className={`text-foreground/70 font-serif italic text-sm sm:text-base transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            {messages[currentIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionalTicker;
