import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Heart, Play, CreditCard, CalendarCheck, Palmtree, ChevronRight } from 'lucide-react';
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

  const testimonials = [
    { quote: "Being thousands of miles away, Templo helps me stay connected to my family temple. It's like being home.", name: "Priya Sharma", location: "California, USA" },
    { quote: "I watched my grandmother's shraddh ceremony live from London. Tears of gratitude still flow.", name: "Rajesh Iyer", location: "London, UK" },
    { quote: "Found my ancestral temple after 3 generations. The priests welcomed us like family.", name: "Meera Krishnan", location: "Sydney, Australia" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Spacious & Emotional */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Warm Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/20 to-background" />
        
        {/* Subtle Glow Effects */}
        <div className="absolute top-32 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content - Emotional Message */}
            <div className="text-center lg:text-left py-16 lg:py-0">
              {/* Badge */}
              <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                {t('heroTagline')}
              </div>
              
              {/* Main Heading - Personal & Warm */}
              <h1 className="mb-8 animate-fade-in font-serif text-5xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.1s' }}>
                Your Temple,
                <span className="block mt-2 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                  Always With You
                </span>
              </h1>
              
              {/* Emotional Subtitle */}
              <p className="mb-10 max-w-lg mx-auto lg:mx-0 animate-fade-in text-lg text-muted-foreground leading-relaxed" style={{ animationDelay: '0.2s' }}>
                Distance fades when devotion speaks. Whether you're across the street or across the ocean, 
                feel the warmth of the temple bells and the blessings of the divine.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex animate-fade-in flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                <Link to="/temples">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-10 py-7 text-base shadow-lg">
                    <MapPin className="mr-2 h-5 w-5" />
                    Find Your Temple
                  </Button>
                </Link>
                <Link to="/ancestral">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-2 px-10 py-7 text-base">
                    <Heart className="mr-2 h-5 w-5" />
                    Discover Roots
                  </Button>
                </Link>
              </div>

              {/* Emotional Tagline */}
              <p className="mt-12 animate-fade-in text-base text-muted-foreground italic" style={{ animationDelay: '0.4s' }}>
                "Where distance meets devotion, miracles happen."
              </p>
            </div>

            {/* Right - Service Cards with more spacing */}
            <div className="hidden lg:grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.path}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                    <ChevronRight className="absolute bottom-8 right-8 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Services Section */}
      <section className="lg:hidden bg-card border-y border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-3">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{service.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Devotee Stories Section */}
      <section className="py-20 md:py-28 bg-card/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Stories from the Heart
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Real devotees sharing their sacred journeys with Templo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className="text-primary text-5xl font-serif mb-4">"</div>
                <p className="text-foreground leading-relaxed mb-8 italic text-lg">
                  {item.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">{item.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples Section */}
      <section className="py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <FeaturedTemples />
        </div>
      </section>

      {/* Emotional CTA Banner */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative p-10 md:p-16 lg:p-20 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                The Temple Door is Always Open
              </h2>
              <p className="text-primary-foreground/90 mb-10 max-w-2xl mx-auto text-lg">
                No matter where life takes you, your spiritual home awaits. 
                Begin your journey of faith, connection, and inner peace today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/temples">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-10 py-7 text-base font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/how-to">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-10 py-7 text-base font-semibold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                    Learn More
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