import { Link } from 'react-router-dom';
import { Search, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const AncestralIntro = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative Icon */}
          <div className="mx-auto mb-6 sm:mb-8 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-4xl sm:text-5xl">🏛️</span>
          </div>

          <h1 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Discover Your Ancestral Temple
          </h1>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every family has a sacred connection to their ancestral temple — a place where generations 
            have offered prayers and sought blessings. Let us help you identify and reconnect with 
            your family's spiritual heritage.
          </p>

          {/* Features */}
          <div className="mb-8 sm:mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                We analyze your native village and family details
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Auto Identify</h3>
              <p className="text-sm text-muted-foreground">
                Get suggestions based on regional temple data
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Save & Connect</h3>
              <p className="text-sm text-muted-foreground">
                Add your ancestral temple to your profile
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/ancestral/form">
            <Button size="lg" className="rounded-full px-8 h-12 sm:h-14 text-base font-medium shadow-lg shadow-primary/20">
              Find My Ancestral Temple
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Takes only 2 minutes to complete
          </p>
        </div>
      </main>
    </div>
  );
};

export default AncestralIntro;
