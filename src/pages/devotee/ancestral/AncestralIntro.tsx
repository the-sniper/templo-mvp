import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Users, CheckCircle2 } from 'lucide-react';
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

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative Icon */}
          <div className="mx-auto mb-6 sm:mb-8 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-muted">
            <span className="text-5xl sm:text-6xl">🛕</span>
          </div>

          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            Help Us Build Together
          </Badge>

          <h1 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Find Your Ancestral Temple
          </h1>

          <p className="mb-10 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every family has a sacred connection to their ancestral temple. We're building India's
            first comprehensive ancestral temple database — and we need your help! Share your
            roots and help us map family lineages to temples across the nation.
          </p>

          {/* 3-Step Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              {
                icon: <Search className="h-6 w-6 text-muted-foreground" />,
                title: 'Share Your Roots',
                desc: 'Tell us about your native village and family details',
              },
              {
                icon: <Heart className="h-6 w-6 text-muted-foreground" />,
                title: 'Browse & Select',
                desc: 'Explore temples or add your own ancestral temple',
              },
              {
                icon: <Users className="h-6 w-6 text-muted-foreground" />,
                title: 'Build Together',
                desc: 'Help future devotees find their heritage',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="w-full sm:w-[200px] p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <Link to="/ancestral/start">
            <Button
              size="lg"
              className="rounded-full px-12 h-14 text-lg font-medium shadow-lg shadow-primary/20 gap-2"
              onClick={() => trackEvent('ancestral_start')}
            >
              Start Your Journey
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Takes about 3-5 minutes • More details = better future matching
          </p>

          {/* Why Section */}
          <div className="mt-10 p-5 rounded-2xl bg-card border border-border/50 text-left max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Why we're collecting this data: </span>
              We're building an AI-powered matching system that will automatically
              connect families to their ancestral temples. Every submission helps train our system and benefits
              devotees across India.
            </p>
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
