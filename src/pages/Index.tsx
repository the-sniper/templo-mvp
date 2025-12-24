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
      
      {/* Hero Section - Emotional, Memory-Focused */}
      <section className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="py-16 sm:py-20 lg:py-28 max-w-4xl mx-auto text-center">
            
            {/* Main Headline - Large, Emotional */}
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
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-14 text-base sm:text-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Family Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-14 text-base sm:text-lg border-border">
                  <MapPin className="mr-2 h-5 w-5" />
                  Discover Temples Near Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Bridge Section */}
      <section className="py-16 sm:py-24 lg:py-32">
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
      </section>

      {/* Living Faith Section */}
      <LivingFaith />

      {/* Return & Belonging Section */}
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
              <Button size="lg" className="rounded-full px-10 h-14 text-base sm:text-lg">
                <Search className="mr-2 h-5 w-5" />
                Begin My Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Temples Section - De-emphasized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/30">
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

      {/* Voices of Devotion */}
      <section className="py-16 sm:py-24 lg:py-32">
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
                  className="text-center"
                >
                  <p className="text-foreground text-base sm:text-lg leading-relaxed mb-6 font-serif italic">
                    "{item.quote}"
                  </p>
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

      {/* Final Call to Return */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
              The temple door never closed.<br />
              <span className="text-primary">You just needed a way back.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 sm:mt-12">
              <Link to="/ancestral">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 text-base sm:text-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 text-base sm:text-lg border-border">
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
