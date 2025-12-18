import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Heart, Play, CreditCard, CalendarCheck, Palmtree, Bell, Users, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const services = [
    { icon: CreditCard, title: 'Donate', desc: 'Support temples securely', path: '/temples' },
    { icon: CalendarCheck, title: 'Book Darshan', desc: 'Skip the queue', path: '/temples' },
    { icon: Palmtree, title: 'Request Pooja', desc: 'Remote rituals', path: '/temples' },
    { icon: Play, title: 'Live Darshan', desc: 'Watch anywhere', path: '/temples' },
  ];

  const stats = [
    { value: '500+', label: 'Temples' },
    { value: '50K+', label: 'Devotees' },
    { value: '1M+', label: 'Donations' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Immersive Design */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/40 to-background" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Mandala Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                {t('heroTagline')}
              </div>
              
              {/* Main Heading */}
              <h1 className="mb-6 animate-fade-in font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl" style={{ animationDelay: '0.1s' }}>
                Your Divine
                <span className="block bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                  Connection Awaits
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="mb-8 max-w-xl animate-fade-in text-lg text-muted-foreground" style={{ animationDelay: '0.2s' }}>
                {t('heroSubtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex animate-fade-in flex-col sm:flex-row gap-4" style={{ animationDelay: '0.3s' }}>
                <Link to="/temples">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base shadow-xl shadow-primary/30">
                    <MapPin className="mr-2 h-5 w-5" />
                    {t('exploreTemples')}
                  </Button>
                </Link>
                <Link to="/ancestral">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-2 px-8 py-6 text-base bg-background/50 backdrop-blur-sm">
                    {t('findAncestralTemple')}
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="mt-10 flex animate-fade-in justify-center lg:justify-start gap-8" style={{ animationDelay: '0.4s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Service Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.path}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                    <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Services Section */}
      <section className="lg:hidden bg-card/50 border-y border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-2">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{service.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Why Devotees Love Templo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the divine from anywhere in the world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bell, title: 'Never Miss a Festival', desc: 'Get notified about important temple events, festivals, and special poojas from temples you follow.' },
              { icon: Heart, title: 'Connect with Heritage', desc: 'Discover your ancestral temple and maintain a spiritual connection with your roots.' },
              { icon: Users, title: 'Support from Anywhere', desc: 'NRIs and devotees worldwide can participate in temple activities and make donations.' },
              { icon: Play, title: 'Live Divine Experiences', desc: 'Watch live darshan streams and feel the spiritual energy from the comfort of your home.' },
              { icon: Star, title: 'Trusted & Transparent', desc: 'All donations go directly to temples with complete transparency and digital receipts.' },
              { icon: Palmtree, title: 'Remote Pooja Services', desc: 'Request poojas for special occasions and receive prasad delivered to your doorstep.' },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-accent/20 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <FeaturedTemples />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Begin Your Sacred Journey Today
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of devotees connecting with temples across India. Discover, follow, donate, and experience divine darshan from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/temples">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold">
                    Explore Temples
                  </Button>
                </Link>
                <Link to="/how-to">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;