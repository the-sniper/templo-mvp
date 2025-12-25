import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const LivingFaith = () => {
  const moments = [
    {
      id: 1,
      message: 'The morning aarti has begun.',
      subtext: 'Lamps lit. Chants rising.',
    },
    {
      id: 2,
      message: 'An abhishekam is being offered.',
      subtext: 'Sacred waters. Silent prayers.',
    },
    {
      id: 3,
      message: 'A festival is being prepared.',
      subtext: 'Flowers gathered. Offerings made.',
    },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-accent/40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Prayers Are Still Happening
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-2">
              Even if you're far away, the rituals continue.
            </p>
            <p className="text-foreground/80 text-sm sm:text-base">
              Across villages and cities, rituals continue every day—whether someone is watching or not.
            </p>
            <p className="text-primary/80 text-sm sm:text-base font-serif italic mt-2">
              Even now—oil lamps glow, incense rises, and bells echo.
            </p>
          </div>

          {/* Prayer Moments - Warm, presence-focused with subtle micro-motion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {moments.map((moment, index) => (
              <div
                key={moment.id}
                className="text-center p-4 sm:p-6 rounded-2xl bg-card border border-primary/15 shadow-sm group cursor-default animate-prayer-glow"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <p className="font-serif text-foreground text-base sm:text-lg md:text-xl mb-2 leading-snug transition-all duration-500 group-hover:text-primary">
                  {moment.message}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm transition-all duration-500 group-hover:opacity-100 opacity-80">
                  {moment.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/temples">
              <Button size="lg" variant="outline" className="rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base border-2 border-primary/40 text-foreground bg-card/80 hover:bg-primary/10 hover:border-primary/60">
                <Eye className="h-4 w-4 mr-2" />
                Witness the Prayers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivingFaith;
