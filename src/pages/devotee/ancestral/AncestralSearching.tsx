import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import Header from '@/components/Header';

const AncestralSearching = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 6;
      });
    }, 100);

    // Navigate after 1.5 seconds (shorter wait)
    const timer = setTimeout(() => {
      navigate('/ancestral/results');
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="mx-auto max-w-md px-4 text-center">
          {/* Animated Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Save className="h-12 w-12 text-primary animate-pulse" />
          </div>

          <h1 className="mb-4 font-serif text-2xl font-bold text-foreground">
            Recording Your Details
          </h1>

          <p className="mb-8 text-muted-foreground">
            We're saving your information to help build our ancestral temple database...
          </p>

          {/* Progress Bar */}
          <div className="mx-auto max-w-xs">
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </div>

          {/* Info Message */}
          <div className="mt-8 p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground">
              Your contribution helps future devotees find their ancestral temples through our AI matching system.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center gap-4 text-4xl opacity-20">
            <span>🕉️</span>
            <span>🪔</span>
            <span>🙏</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AncestralSearching;
