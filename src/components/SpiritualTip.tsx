import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpiritualTip = () => {
  const tips = [
    { 
      message: "Start your day by chanting Om Namah Shivaya 11 times.", 
      icon: "🙏" 
    },
    { 
      message: "Light a lamp in your mind for peace within.", 
      icon: "🕯️" 
    },
    { 
      message: "Offer a flower of gratitude to the divine today.", 
      icon: "🌸" 
    },
    { 
      message: "Take 5 minutes to sit in silence and connect with your breath.", 
      icon: "🧘" 
    },
    { 
      message: "Remember: Where there is faith, there is always a way.", 
      icon: "✨" 
    },
  ];

  const [currentTip, setCurrentTip] = useState(0);

  // Change tip daily (using date-based selection)
  useEffect(() => {
    const today = new Date().getDate();
    setCurrentTip(today % tips.length);
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-xl bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 border border-primary/10 p-5 sm:p-6 text-center">
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">Spiritual Tip of the Day</span>
              </div>
              
              <p className="text-lg sm:text-xl font-serif text-foreground leading-relaxed">
                <span className="text-2xl mr-2">{tips[currentTip].icon}</span>
                {tips[currentTip].message}
              </p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTip}
                className="mt-4 rounded-full text-muted-foreground hover:text-primary"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Another tip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualTip;
