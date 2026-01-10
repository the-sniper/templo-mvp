import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const featureNames: Record<string, { title: string; description: string; icon: string }> = {
  donate: {
    title: 'Temple Donations',
    description: 'Make secure online donations to temples and receive instant digital receipts.',
    icon: '🙏'
  },
  'recurring-donate': {
    title: 'Recurring Donations',
    description: 'Set up automated monthly or weekly donations to support your favorite temples.',
    icon: '🔄'
  },
  book: {
    title: 'Darshan Slot Booking',
    description: 'Reserve your spot for VIP darshan and skip the regular queue.',
    icon: '📅'
  },
  pooja: {
    title: 'Pooja Requests',
    description: 'Request traditional poojas to be performed on your behalf by temple priests.',
    icon: '🪔'
  },
  default: {
    title: 'New Feature',
    description: 'We are working hard to bring you this feature.',
    icon: '✨'
  }
};

const ComingSoon = () => {
  const location = useLocation();
  
  // Extract feature from path
  const pathParts = location.pathname.split('/');
  const featureKey = pathParts[1] || 'default';
  const feature = featureNames[featureKey] || featureNames.default;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-lg text-center">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-5xl">{feature.icon}</span>
          </div>

          {/* Badge */}
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Coming Soon
          </Badge>

          {/* Title */}
          <h1 className="mb-4 font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {feature.title}
          </h1>

          {/* Description */}
          <p className="mb-8 text-muted-foreground text-base sm:text-lg leading-relaxed">
            {feature.description}
          </p>

          {/* Phase Info */}
          <div className="mb-8 p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground">
              We're currently in <span className="font-medium text-foreground">Phase I</span> of our launch, 
              focusing on temple discovery and community connections. This feature will be available in Phase II.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/temples">
              <Button size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto">
                Explore Temples
              </Button>
            </Link>
            <Link to="/ancestral">
              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto">
                Find Ancestral Temple
              </Button>
            </Link>
          </div>

          {/* Decorative */}
          <div className="mt-12 flex justify-center gap-4 text-3xl opacity-20">
            <span>🕉️</span>
            <span>🪔</span>
            <span>🙏</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
