import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import TempleAdminCTA from '@/components/TempleAdminCTA';
import FloatingDiya from '@/components/FloatingDiya';
import LivingFaith from '@/components/LivingFaith';
import { Heart, MapPin, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setQuoteVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleShareStory = () => {
    toast({
      title: "Share Your Story",
      description: "Thank you for wanting to share! This feature will be available soon.",
    });
  };

  const testimonials = [
    { 
      quote: "I hadn't visited my village temple in years. Seeing it again felt like meeting an old part of myself.", 
      name: "Priya",
      location: "San Francisco"
    },
    { 
      quote: "When the bells rang through my screen, I wept. It was exactly as I remembered from childhood.", 
      name: "Rajesh",
      location: "London"
    },
    { 
      quote: "My children had never seen a temple. Now they ask to watch the morning aarti together.", 
      name: "Anitha",
      location: "Toronto"
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <FloatingDiya />
      
      {/* Hero Section - Morning light entering a temple */}
      <section className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center">
        {/* Warm ivory gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-background to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="py-16 sm:py-20 lg:py-28 max-w-4xl mx-auto text-center">
            
            {/* Main Headline - Deep charcoal with warmth */}
            <h1 className="mb-6 sm:mb-8 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Remember the temple where your grandmother prayed?
            </h1>
            
            {/* Subheadline - Quiet, Reflective */}
            <p className="mb-10 sm:mb-14 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
              Some prayers don't fade with time.<br />
              They wait quietly for you to return.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/ancestral">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-14 text-base sm:text-lg shadow-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Family Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-14 text-base sm:text-lg border-2 border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50">
                  <MapPin className="mr-2 h-5 w-5" />
                  Discover Temples Near Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Bridge Section - Intimate and reflective */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-popover/50 to-background relative">
        {/* Subtle kumkum divider at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary/40" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
              You didn't leave faith behind.<br />
              <span className="text-primary">Life just got louder.</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
              Work took you away. Cities changed you.<br />
              But somewhere, temple bells still ring the same way they did when you were young.
            </p>
            
            <p className="mt-6 sm:mt-8 text-foreground text-base sm:text-lg md:text-xl font-serif">
              Templo helps you find that place again.
            </p>
          </div>
        </div>
        
        {/* Subtle kumkum divider at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary/40" />
      </section>

      {/* Living Faith Section */}
      <LivingFaith />

      {/* Return & Belonging Section - Quiet emotional lift */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
              Somewhere in India,<br />
              <span className="text-primary">your family temple is waiting.</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              Between school mornings and adult responsibilities,<br />
              we stopped going.<br />
              But the temple never forgot us.
            </p>
            
            <Link to="/ancestral">
              <Button size="lg" className="rounded-full px-10 h-14 text-base sm:text-lg shadow-lg">
                <Search className="mr-2 h-5 w-5" />
                Begin My Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Temples Section - Visual reverence */}
      <section className="py-12 sm:py-16 lg:py-20 bg-popover/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Temples People Still Return To
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Some places never stop calling their people back.
              </p>
            </div>
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Voices of Devotion - Handwritten, personal, human */}
      <section className="py-16 sm:py-24 lg:py-32 bg-accent/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Voices of Devotion
              </h2>
            </div>

            {/* Testimonials - Simple, Personal */}
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="text-center relative"
                >
                  {/* Kumkum quotation mark */}
                  <span className="text-secondary/50 font-serif text-5xl leading-none absolute -top-4 left-1/2 -translate-x-1/2">"</span>
                  
                  <p className="text-foreground text-base sm:text-lg leading-relaxed mb-6 pt-6 font-serif italic">
                    {item.quote}
                  </p>
                  
                  {/* Kumkum separator */}
                  <div className="w-8 h-0.5 bg-secondary/40 mx-auto mb-4" />
                  
                  <p className="text-muted-foreground text-sm">
                    — {item.name}, {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stewardship Section */}
      <TempleAdminCTA />

      {/* Final CTA Section - Standing at the temple entrance */}
      <section className="py-20 sm:py-28 lg:py-36 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 sm:mb-8 leading-tight">
              The temple door never closed.<br />
              <span className="text-primary-foreground/90">You just needed a way back.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 sm:mt-12">
              <Link to="/ancestral">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 text-base sm:text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 text-base sm:text-lg border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/60">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Nearby Temples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
