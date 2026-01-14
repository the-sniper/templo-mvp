import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MessageCircle, Bell, CreditCard, Receipt, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { trackEvent } from '@/utils/analytics';

const AncestralIntro = () => {
  useEffect(() => {
    trackEvent('page_view', { page: 'ancestral_intro' });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative Icon */}
          <div className="mx-auto mb-6 sm:mb-8 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-primary/10">
            <span className="text-5xl sm:text-6xl">🛕</span>
          </div>

          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            கூலதெய்வம் • Kuladeivam
          </Badge>

          <h1 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Find Your Ancestral Temple
          </h1>

          <p className="mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Discover your family's Kuladeivam, receive festival alerts, and make offerings 
            to the temple that has blessed your family for generations.
          </p>

          {/* Primary CTA */}
          <Link to="/ancestral/start">
            <Button 
              size="lg" 
              className="rounded-full px-10 h-14 text-lg font-medium shadow-lg shadow-primary/20 gap-2"
              onClick={() => trackEvent('ancestral_start')}
            >
              <Search className="h-5 w-5" />
              Find My Kuladeivam
            </Button>
          </Link>

          {/* Secondary CTA */}
          <div className="mt-4">
            <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              or explore temples →
            </Link>
          </div>

          {/* Trust Section */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Tamil Support</span>
              <span className="text-xs text-muted-foreground">தமிழில் உதவி</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">UPI Donations</span>
              <span className="text-xs text-muted-foreground">Direct to temple</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Receipt Provided</span>
              <span className="text-xs text-muted-foreground">For tax purposes</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Family Sharing</span>
              <span className="text-xs text-muted-foreground">WhatsApp confirmation</span>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">How It Works</h2>
            <div className="space-y-3">
              {[
                { step: 1, title: 'Share Your Roots', desc: 'Tell us about your native village and family' },
                { step: 2, title: 'Find Matches', desc: 'We suggest temples based on your details' },
                { step: 3, title: 'Confirm with Family', desc: 'Share with elders to verify on WhatsApp' },
                { step: 4, title: 'Stay Connected', desc: 'Get festival alerts and make offerings' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-3 rounded-xl bg-card/50">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10">
            <Link to="/ancestral/start">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-12 gap-2"
                onClick={() => trackEvent('ancestral_start')}
              >
                Get Started
                <CheckCircle2 className="h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Takes about 30 seconds
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AncestralIntro;
