import { useState, useEffect } from 'react';
import { Radio, Eye, Building2 } from 'lucide-react';

const LiveActivityCounter = () => {
  const [devotees, setDevotees] = useState(107);
  const [temples, setTemples] = useState(12);

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevotees((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setTemples((prev) => Math.max(8, Math.min(15, prev + Math.floor(Math.random() * 3) - 1)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
        </span>
        <Eye className="h-3.5 w-3.5" />
        <span>
          <span className="font-medium text-foreground">{devotees}</span> devotees watching darshan
        </span>
      </div>
      <span className="text-border">·</span>
      <div className="flex items-center gap-2">
        <Building2 className="h-3.5 w-3.5" />
        <span>
          <span className="font-medium text-foreground">{temples}</span> temples streaming today
        </span>
      </div>
    </div>
  );
};

export default LiveActivityCounter;
