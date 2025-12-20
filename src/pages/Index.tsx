import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Heart, Play, CreditCard, CalendarCheck, Palmtree, ArrowRight, Quote } from 'lucide-react';
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
    { quote: "Being thousands of miles away, Templo helps me stay connected to my family temple.", name: "Priya S.", location: "California" },
    { quote: "I watched my grandmother's ceremony live from London. Tears of gratitude.", name: "Rajesh I.", location: "London" },
    { quote: "Found my ancestral temple after 3 generations. Like coming home.", name: "Meera K.", location: "Sydney" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-16 sm:py-20 lg:py-28 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                  <Sparkles className="h-3 w-3" />
                  {t('heroTagline')}
                </div>
                
                {/* Heading */}
                <h1 className="mb-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Your Temple,
                  <span className="block bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                    Always With You
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="mb-8 max-w-md mx-auto lg:mx-0 text-base text-muted-foreground leading-relaxed">
                  Distance fades when devotion speaks. Feel the blessings of the divine, wherever you are.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link to="/temples">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-6">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Your Temple
                    </Button>
                  </Link>
                  <Link to="/ancestral">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6">
                      Discover Roots
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Service Grid */}
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto lg:max-w-none">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-primary/20 hover:shadow-md"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm text-foreground">{service.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{service.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Quote */}
      <section className="py-12 sm:py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4 rotate-180" />
            <p className="font-serif text-lg sm:text-xl text-foreground italic leading-relaxed">
              "Where distance meets devotion, miracles happen."
            </p>
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">Stories</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                From the Heart
              </h2>
            </div>

            {/* Testimonial Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl border border-border bg-card"
                >
                  <p className="text-foreground leading-relaxed mb-4 text-sm sm:text-base">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-10 lg:p-12 text-center">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />
              </div>
              
              <div className="relative">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">
                  The Temple Door is Always Open
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto text-sm sm:text-base">
                  Begin your journey of faith, connection, and inner peace today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/temples">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/how-to">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="w-full sm:w-auto rounded-full px-6 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;