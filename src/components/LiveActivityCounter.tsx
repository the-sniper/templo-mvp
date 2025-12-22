import { useState, useEffect } from 'react';
import { Users, Radio, Heart } from 'lucide-react';

const LiveActivityCounter = () => {
  const [devotees, setDevotees] = useState(107);
  const [temples, setTemples] = useState(12);
  const [blessings, setBlessings] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevotees(prev => Math.max(80, prev + Math.floor(Math.random() * 5) - 2));
      setBlessings(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm">
      <div className="flex items-center gap-2 text-primary-foreground/80">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
        </span>
        <Users className="h-4 w-4" />
        <span><strong>{devotees}</strong> devotees watching now</span>
      </div>
      
      <div className="flex items-center gap-2 text-primary-foreground/80">
        <Radio className="h-4 w-4" />
        <span><strong>{temples}</strong> temples streaming</span>
      </div>
      
      <div className="flex items-center gap-2 text-primary-foreground/80">
        <Heart className="h-4 w-4" />
        <span><strong>{blessings.toLocaleString()}</strong> families blessed</span>
      </div>
    </div>
  );
};

export default LiveActivityCounter;
