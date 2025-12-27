import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import LivingFaith from '@/components/LivingFaith';
import { Heart, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [quoteVisible, setQuoteVisible] = useState(false);

  // Dynamic hero phrases
  const heroPhrases = [
    {
      headline: "Remember the temple where your grandmother prayed?",
      subline: "Some prayers don't fade with time. They wait quietly—just as they always have."
    },
    {
      headline: "The bells still ring in your village temple.",
      subline: "Distance changes everything. Except faith."
    },
    {
      headline: "Your family temple never forgot you.",
      subline: "Through generations, the lamps have stayed lit. Waiting."
    },
    {
      headline: "Some places hold more than memories.",
      subline: "They hold the prayers of everyone who came before you."
    },
    {
      headline: "The incense still rises at dawn.",
      subline: "In temples across India, rituals continue—whether you're there or not."
    },
    {
      headline: "Where did your ancestors offer their first prayers?",
      subline: "Every family has a temple. Most have just forgotten the way."
    },
    {
      headline: "Faith travelled with you. Now travel back.",
      subline: "The temple doors are open. They always have been."
    },
    {
      headline: "The same stone steps. The same sacred air.",
      subline: "Your grandmother walked here. Your children can too."
    },
    {
      headline: "Home is where your prayers began.",
      subline: "Before cities, before jobs—there was a temple."
    },
    {
      headline: "The temple waited. Now it's your turn.",
      subline: "Reconnect with the sacred spaces that shaped your family."
    }
  ];

  const [currentPhrase] = useState(() => 
    heroPhrases[Math.floor(Math.random() * heroPhrases.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => setQuoteVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const indianTestimonials = [
    { 
      quote: "My father's health kept us from travelling. Now he watches the morning aarti from his bed.", 
      name: "Karthik",
      location: "Chennai"
    },
    { 
      quote: "Living in Bangalore, I miss our family temple in the village. Templo brings it closer every day.", 
      name: "Meera",
      location: "Bangalore"
    },
    { 
      quote: "After my mother passed, I wanted to offer prayers at her favourite temple. Templo made it possible.", 
      name: "Suresh",
      location: "Mumbai"
    },
  ];

  const nriTestimonials = [
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

  const features = [
    {
      icon: Heart,
      title: "Find Your Family Temple",
      description: "Reconnect with the temple where your grandparents prayed"
    },
    {
      icon: Sparkles,
      title: "Live Darshan",
      description: "Watch morning aartis and evening prayers in real-time"
    },
    {
      icon: MapPin,
      title: "Discover Nearby",
      description: "Find sacred spaces wherever life takes you"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Clean, Focused */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-accent/50 via-accent/20 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`py-16 sm:py-20 lg:py-24 max-w-3xl mx-auto text-center transition-all duration-700 ${quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Connecting 50,000+ devotees worldwide
            </div>
            
            {/* Main Headline */}
            <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground tracking-tight">
              {currentPhrase.headline}
            </h1>
            
            {/* Subheadline */}
            <p className="mb-8 max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {currentPhrase.subline}
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/ancestral">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Family Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-medium border-2 hover:bg-accent">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Temples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Grid */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Bridge - Simplified */}
      <section className="py-20 sm:py-24 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              You didn't leave faith behind.
              <span className="block text-primary mt-2">Life just got louder.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Work took you away. Cities changed you. But somewhere, the same bells still ring—just as they did when you were young.
            </p>
            
            <p className="text-primary font-serif italic text-lg">
              Faith doesn't disappear. It waits.
            </p>
          </div>
        </div>
      </section>

      {/* Living Faith Section */}
      <LivingFaith />

      {/* Temples Section */}
      <section className="py-20 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Temples People Return To
                </h2>
                <p className="text-muted-foreground text-lg">
                  Sacred spaces that never stop calling their people back.
                </p>
              </div>
              <Link to="/temples" className="shrink-0">
                <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
                  View all temples
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Testimonials - Two Sections */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Voices of Devotion
              </h2>
              <p className="text-muted-foreground text-lg">
                These aren't reviews. They're moments people carried with them.
              </p>
            </div>

            {/* From India */}
            <div className="mb-14">
              <h3 className="text-center font-medium text-primary mb-8 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-primary/30" />
                From India
                <span className="h-px w-8 bg-primary/30" />
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {indianTestimonials.map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-5xl text-primary/20 font-serif leading-none mb-4">"</div>
                    <p className="text-foreground leading-relaxed mb-6 font-serif italic">
                      {item.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">{item.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-xs">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* From Abroad (NRI) */}
            <div>
              <h3 className="text-center font-medium text-primary mb-8 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-primary/30" />
                From Abroad
                <span className="h-px w-8 bg-primary/30" />
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nriTestimonials.map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-5xl text-primary/20 font-serif leading-none mb-4">"</div>
                    <p className="text-foreground leading-relaxed mb-6 font-serif italic">
                      {item.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">{item.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-xs">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Temples Section - Minimal */}
      <section className="py-16 sm:py-20 bg-accent/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              For Temples, By Devotees
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Templo exists to help temples stay connected to people—not as visitors, but as family.
            </p>
            <Link to="/register">
              <Button variant="outline" className="rounded-full px-8 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Heart className="h-4 w-4 mr-2" />
                I Manage a Temple
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Bold & Clear */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              The temple door never closed.
            </h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              You just needed a way back.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/ancestral">
                <Button size="lg" className="rounded-full px-10 h-14 text-base font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Find My Family Temple
                </Button>
              </Link>
              <Link to="/temples">
                <Button variant="ghost" size="lg" className="rounded-full px-10 h-14 text-base font-medium text-primary-foreground border-2 border-primary-foreground/40 hover:bg-primary-foreground/10 hover:border-primary-foreground/60">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Temples
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
