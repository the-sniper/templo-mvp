import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpiritualTip = () => {
  const tips = [
    { 
      message: "Today, before you start your work, close your eyes for 30 seconds. Think of the temple where your grandmother prayed. Send her your love.", 
      icon: "🙏",
      source: "A practice from the heart"
    },
    { 
      message: "Light a diya tonight—even a small candle. Let its flame remind you that even in darkness, the divine light within you never dims.", 
      icon: "🪔",
      source: "Temple wisdom"
    },
    { 
      message: "Call someone older in your family today. Ask them about your ancestral temple. Their stories are treasures waiting to be discovered.", 
      icon: "📞",
      source: "Connecting generations"
    },
    { 
      message: "Wherever you are, face east and offer a simple prayer at sunrise. The same sun rises over your homeland.", 
      icon: "🌅",
      source: "Ancient tradition"
    },
    { 
      message: "Today, forgive one person who has hurt you. Carrying resentment blocks divine blessings. Let it go. Let grace flow.", 
      icon: "💫",
      source: "Spiritual freedom"
    },
    { 
      message: "Speak your mother tongue today, even if just a few words. Language carries the prayers of your ancestors.", 
      icon: "✨",
      source: "Heritage connection"
    },
  ];

  const [currentTip, setCurrentTip] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const today = new Date().getDate();
    setCurrentTip(today % tips.length);
  }, []);

  const nextTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <section className="py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-br from-accent/30 via-primary/10 to-accent/20 border border-primary/15 p-6 sm:p-8 text-center overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-4">
                <Heart className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">Daily Wisdom for Your Soul</span>
                <Heart className="h-4 w-4 text-primary animate-pulse" />
              </div>
              
              <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                <p className="text-lg sm:text-xl lg:text-2xl font-serif text-foreground leading-relaxed mb-4">
                  <span className="text-3xl mr-3">{tips[currentTip].icon}</span>
                  {tips[currentTip].message}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  — {tips[currentTip].source}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTip}
                className="mt-6 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Another blessing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualTip;
