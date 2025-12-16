import { Link } from 'react-router-dom';
import { Search, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const AncestralIntro = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-5xl">🏛️</span>
          </div>

          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Discover Your Ancestral Temple
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Every family has a sacred connection to their ancestral temple — a place where generations 
            have offered prayers and sought blessings. Let us help you identify and reconnect with 
            your family's spiritual heritage.
          </p>

          {/* Features */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <Search className="mx-auto mb-2 h-6 w-6 text-primary" />
              <h3 className="font-medium text-foreground">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                We analyze your native village and family details
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-primary" />
              <h3 className="font-medium text-foreground">Auto Identify</h3>
              <p className="text-sm text-muted-foreground">
                Get suggestions based on regional temple data
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <Heart className="mx-auto mb-2 h-6 w-6 text-primary" />
              <h3 className="font-medium text-foreground">Save & Connect</h3>
              <p className="text-sm text-muted-foreground">
                Add your ancestral temple to your profile
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/ancestral/form">
            <Button size="lg" className="px-8">
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
