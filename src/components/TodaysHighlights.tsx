import { Calendar, Radio, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const TodaysHighlights = () => {
  const events = [
    {
      id: 1,
      title: 'Arudra Darshanam',
      temple: 'Chidambaram Temple',
      time: 'Live Now',
      type: 'live',
      description: 'Witness the cosmic dance of Lord Nataraja',
    },
    {
      id: 2,
      title: 'Pournami Pooja',
      temple: 'Madurai Meenakshi Temple',
      time: '6:00 PM',
      type: 'today',
      description: 'Full moon special abhishekam and archana',
    },
    {
      id: 3,
      title: 'Thai Poosam Festival',
      temple: 'Palani Murugan Temple',
      time: 'All Day',
      type: 'festival',
      description: 'Grand kavadi procession and special darshan',
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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Radio className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">Live & Upcoming</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Happening Today
            </h2>
            <p className="text-muted-foreground mt-2">
              Don't miss these sacred moments from temples across India
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className={`group relative rounded-xl border bg-card p-5 sm:p-6 transition-all hover:shadow-lg ${
                  event.type === 'live' ? 'border-destructive/30 bg-destructive/5' : 'border-border'
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
                <h3 className="font-serif font-bold text-lg text-foreground mb-1">
                  {event.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {event.temple}
                </p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* CTA */}
                <div className="flex gap-2">
                  {event.type === 'live' ? (
                    <Button size="sm" className="rounded-full">
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Watch Live
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="rounded-full">
                      <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                      Explore Temple
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-8">
            <Link to="/temples">
              <Button variant="ghost" className="rounded-full">
                View All Temple Events
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
