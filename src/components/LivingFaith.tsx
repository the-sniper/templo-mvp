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
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Prayers Are Still Happening
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Even if you're far away, the rituals continue. Oil lamps glow, incense rises, and bells echo.
            </p>
          </div>

          {/* Prayer Moments */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {moments.map((moment) => (
              <div
                key={moment.id}
                className="group text-center p-6 rounded-2xl bg-accent/40 hover:bg-accent/60 border border-transparent hover:border-primary/10 transition-all duration-300"
              >
                <p className="font-serif text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
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
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Eye className="h-4 w-4 mr-2" />
                Witness Live Prayers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivingFaith;
