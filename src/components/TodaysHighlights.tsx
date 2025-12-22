import { Calendar, Radio, Sparkles, Eye, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const TodaysHighlights = () => {
  const events = [
    {
      id: 1,
      title: 'Morning Aarti',
      temple: 'Varanasi Kashi Vishwanath',
      time: 'Live Now',
      type: 'live',
      description: 'The eternal flame burns on the banks of the Ganga. Join thousands in the morning invocation.',
      emotion: 'Feel the sacred energy of Kashi',
    },
    {
      id: 2,
      title: 'Abhishekam Ceremony',
      temple: 'Madurai Meenakshi Temple',
      time: '6:00 PM',
      type: 'today',
      description: 'The goddess is adorned with flowers and sacred waters. A blessing for your family.',
      emotion: 'Receive divine grace from Meenakshi',
    },
    {
      id: 3,
      title: 'Thai Poosam Festival',
      temple: 'Palani Murugan Temple',
      time: 'All Day',
      type: 'festival',
      description: 'Witness the kavadi procession as devotees honor Lord Murugan with their vows.',
      emotion: 'Experience the power of devotion',
    },
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'live':
        return 'destructive';
      case 'festival':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getBadgeContent = (type: string, time: string) => {
    switch (type) {
      case 'live':
        return (
          <span className="flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
            </span>
            Live Now
          </span>
        );
      case 'festival':
        return (
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Festival
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {time}
          </span>
        );
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Radio className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">Be Present From Anywhere</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Happening Right Now
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Sacred moments unfolding across India. You do not have to miss them anymore.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className={`group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-xl ${
                  event.type === 'live' ? 'border-destructive/30 bg-destructive/5 ring-1 ring-destructive/20' : 'border-border hover:border-primary/30'
                }`}
              >
                {/* Badge */}
                <Badge 
                  variant={getBadgeVariant(event.type)}
                  className="mb-4"
                >
                  {getBadgeContent(event.type, event.time)}
                </Badge>

                {/* Content */}
                <h3 className="font-serif font-bold text-xl text-foreground mb-1">
                  {event.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {event.temple}
                </p>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {event.description}
                </p>
                
                {/* Emotional Hook */}
                <p className="text-xs text-primary/80 font-medium flex items-center gap-1 mb-5">
                  <Heart className="h-3 w-3" />
                  {event.emotion}
                </p>

                {/* CTA */}
                <div className="flex gap-2">
                  {event.type === 'live' ? (
                    <Button size="sm" className="rounded-full w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Watch Live Darshan
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="rounded-full w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">
              More temples streaming live throughout the day
            </p>
            <Link to="/temples">
              <Button variant="outline" className="rounded-full px-8">
                View All Live Temples
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysHighlights;
