import { Link } from 'react-router-dom';
import { Search, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const AncestralIntro = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative Icon */}
          <div className="mx-auto mb-6 sm:mb-8 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-4xl sm:text-5xl">🏛️</span>
          </div>

          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Help Us Build Together
          </Badge>

          <h1 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Find Your Ancestral Temple
          </h1>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every family has a sacred connection to their ancestral temple. We're building India's 
            first comprehensive ancestral temple database — and we need your help! Share your 
            roots and help us map family lineages to temples across the nation.
          </p>

          {/* Features */}
          <div className="mb-8 sm:mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Share Your Roots</h3>
              <p className="text-sm text-muted-foreground">
                Tell us about your native village and family details
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Browse & Select</h3>
              <p className="text-sm text-muted-foreground">
                Explore temples or add your own ancestral temple
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors">
              <div className="mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Build Together</h3>
              <p className="text-sm text-muted-foreground">
                Help future devotees find their heritage
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/ancestral/form">
            <Button size="lg" className="rounded-full px-8 h-12 sm:h-14 text-base font-medium shadow-lg shadow-primary/20">
              Start Your Journey
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Takes about 3-5 minutes • More details = better future matching
          </p>

          {/* Info Banner */}
          <div className="mt-8 p-4 rounded-xl bg-card border border-border/50 text-left">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Why we're collecting this data:</span> We're 
              building an AI-powered matching system that will automatically connect families to their 
              ancestral temples. Every submission helps train our system and benefits devotees across India.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AncestralIntro;
