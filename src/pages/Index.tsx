import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import ServiceHighlights from '@/components/ServiceHighlights';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Heart, Bell, Play, CreditCard, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const quickActions = [
    { icon: CreditCard, label: 'Donate', path: '/temples' },
    { icon: CalendarCheck, label: 'Book Darshan', path: '/temples' },
    { icon: Play, label: 'Live Darshan', path: '/temples' },
    { icon: Heart, label: 'Follow', path: '/temples' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Modern & Clean */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-accent/30 to-background">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 py-12 sm:py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {t('heroTagline')}
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-6 animate-fade-in font-serif text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
              {t('discoverIndias')}
              <span className="block bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                {t('sacredTemples')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-xl animate-fade-in text-base text-muted-foreground sm:text-lg" style={{ animationDelay: '0.2s' }}>
              {t('heroSubtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex animate-fade-in flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: '0.3s' }}>
              <Link to="/temples">
                <Button size="lg" className="w-full rounded-full px-8 py-6 text-base shadow-xl shadow-primary/30 sm:w-auto">
                  <MapPin className="mr-2 h-5 w-5" />
                  {t('exploreTemples')}
                </Button>
              </Link>
              <Link to="/ancestral">
                <Button variant="outline" size="lg" className="w-full rounded-full border-2 px-8 py-6 text-base sm:w-auto">
                  {t('findAncestralTemple')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Action Pills - Mobile Friendly */}
          <div className="mt-12 flex animate-fade-in flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ animationDelay: '0.4s' }}>
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2.5 text-sm backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <action.icon className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Services Section */}
        <ServiceHighlights />

        {/* Featured Temples Section */}
        <section className="py-8 sm:py-12">
          <FeaturedTemples />
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* How It Works CTA */}
        <section className="py-12 md:py-16">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl mb-4">
              New to Templo?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Learn how to discover temples, make donations, book darshan slots, and connect with your spiritual journey.
            </p>
            <Link to="/how-to">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                See How It Works
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;