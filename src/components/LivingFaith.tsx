import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const LivingFaith = () => {
  const moments = [
    {
      id: 1,
      message: 'The morning aarti has begun.',
      subtext: 'The lamps are lit. The chants have started.',
    },
    {
      id: 2,
      message: 'An abhishekam is being offered today.',
      subtext: 'Sacred waters flow over the deity.',
    },
    {
      id: 3,
      message: 'A festival is being prepared with devotion.',
      subtext: 'Flowers are gathered. Offerings are made.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Prayers Are Still Happening
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Even if you're far away, the rituals continue.<br />
              The lamps are lit. The bells ring. The prayers go on.
            </p>
          </div>

          {/* Prayer Moments - Warm, presence-focused */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
            {moments.map((moment) => (
              <div
                key={moment.id}
                className="text-center p-6 sm:p-8 rounded-2xl bg-card border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-serif text-foreground text-lg sm:text-xl mb-3 leading-snug">
                  {moment.message}
                </p>
                <p className="text-muted-foreground text-sm">
                  {moment.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/temples">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50">
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
