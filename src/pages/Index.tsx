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
      <section className="relative min-h-[70vh] sm:min-h-[65vh] flex items-center">
        {/* Warm ivory gradient background - slightly darker for visual mass */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-accent/30 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="py-12 sm:py-16 lg:py-20 max-w-4xl mx-auto text-center">
            
            {/* Main Headline - Deep charcoal with warmth */}
            <h1 className="mb-4 sm:mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Remember the temple where your grandmother prayed?
            </h1>
            
            {/* Subheadline - Quiet, Reflective */}
            <p className="mb-4 sm:mb-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
              Some prayers don't fade with time.<br />
              They wait quietly—just as they always have.
            </p>
            
            {/* Grounding line */}
            <p className="mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base text-foreground/70">
              Millions grew up with a temple like this.<br />
              Most don't remember its name. Some do.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
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
      <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-b from-background via-popover/60 to-background relative">
        {/* Subtle kumkum divider at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary/40" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              You didn't leave faith behind.<br />
              <span className="text-primary">Life just got louder.</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-4">
              Work took you away. Cities changed you.<br />
              But somewhere, the same bells still ring—<br />
              just as they did when you were young.
            </p>
            
            <p className="text-primary/90 text-sm sm:text-base font-serif italic">
              Faith doesn't disappear. It waits.
            </p>
          </div>
        </div>
        
        {/* Subtle kumkum divider at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary/40" />
      </section>

      {/* Living Faith Section */}
      <LivingFaith />

      {/* Return & Belonging Section - Quiet emotional lift */}
      <section className="py-10 sm:py-14 lg:py-18">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Somewhere in India,<br />
              <span className="text-primary">your family temple is waiting.</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-4">
              Between school mornings and adult responsibilities,<br />
              we stopped going.<br />
              But the temple never forgot us.
            </p>
            
            <p className="text-foreground/70 text-sm sm:text-base mb-6 font-serif italic">
              You may not remember the path.<br />
              But the place remembers you.
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
      <section className="py-10 sm:py-12 lg:py-16 bg-popover/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Temples People Still Return To
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-2">
                Some places never stop calling their people back.
              </p>
              <p className="text-foreground/80 text-sm sm:text-base">
                These temples hold stories—of families, festivals, and first prayers.
              </p>
            </div>
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Voices of Devotion - Handwritten, personal, human */}
      <section className="py-10 sm:py-14 lg:py-18 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Voices of Devotion
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                These aren't reviews. They're moments people carried with them.
              </p>
            </div>

            {/* Testimonials - Simple, Personal */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="text-center relative"
                >
                  {/* Kumkum quotation mark */}
                  <span className="text-secondary/50 font-serif text-5xl leading-none absolute -top-4 left-1/2 -translate-x-1/2">"</span>
                  
                  <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-4 pt-6 font-serif italic">
                    {item.quote}
                  </p>
                  
                  {/* Kumkum separator */}
                  <div className="w-8 h-0.5 bg-secondary/40 mx-auto mb-3" />
                  
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
      <section className="py-14 sm:py-20 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-foreground/80 text-sm sm:text-base mb-4 font-serif italic">
              No matter how far you went—
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              The temple door never closed.<br />
              <span className="text-primary-foreground/90">You just needed a way back.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 sm:mt-12">
              <Link to="/ancestral">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 text-base sm:text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Family Temple
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
