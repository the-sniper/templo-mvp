import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import TemplesNearYou from '@/components/TemplesNearYou';
import Footer from '@/components/Footer';
import SpiritualTip from '@/components/SpiritualTip';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Gift, CalendarDays, Users, Star, ArrowRight, Sparkles, Quote, Building2, TreePine, Search, Clock, Phone, ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import villageTempleImage from '@/assets/village-temple.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Hero phrases for dynamic content
const heroPhrases = [
  {
    headline: "Remember the temple where your grandmother prayed?",
    subline: "Some prayers don't fade with time. They wait quietly—just as they always have."
  },
  {
    headline: "The bells still ring for those who remember",
    subline: "Reconnect with the sacred spaces that shaped your family's faith."
  },
  {
    headline: "Your roots lead back to sacred ground",
    subline: "Every family has a temple story waiting to be rediscovered."
  },
  {
    headline: "Some blessings travel through generations",
    subline: "Find the temple where your ancestors found peace."
  },
  {
    headline: "The deity your grandfather worshipped still awaits",
    subline: "Distance cannot break the bond of devotion."
  },
  {
    headline: "Where did your family's prayers begin?",
    subline: "Journey back to the temple that knows your lineage."
  },
  {
    headline: "Faith has an address. Do you know yours?",
    subline: "Discover the sacred space your family called home."
  },
  {
    headline: "The lamp your great-grandmother lit still burns",
    subline: "Some traditions are waiting for you to continue them."
  },
  {
    headline: "Every temple holds a thousand family stories",
    subline: "Yours might be waiting to be remembered."
  },
  {
    headline: "The path to your ancestral temple begins here",
    subline: "Let us help you find where your family's faith was born."
  }
];

// Testimonials data
const indianTestimonials = [
  {
    name: "Lakshmi Venkataraman",
    location: "Chennai, Tamil Nadu",
    message: "Found our family's ancestral temple through this platform. My father was in tears seeing it after 40 years. 🙏",
    rating: 5
  },
  {
    name: "Rajesh Sharma",
    location: "Jaipur, Rajasthan",
    message: "The booking system made our temple visit so smooth. No more waiting in long queues!",
    rating: 5
  },
  {
    name: "Priya Nair",
    location: "Kochi, Kerala",
    message: "Being able to donate online to our village temple while living in the city is a blessing.",
    rating: 5
  },
  {
    name: "Suresh Reddy",
    location: "Hyderabad, Telangana",
    message: "The priest profiles helped us find the perfect pandit for my daughter's wedding ceremonies.",
    rating: 5
  }
];

const nriTestimonials = [
  {
    name: "Anand Krishnamurthy",
    location: "San Francisco, USA",
    message: "Living 10,000 miles away, I can now participate in every festival at my family temple. This platform is a bridge to home.",
    rating: 5
  },
  {
    name: "Meera Iyer",
    location: "London, UK",
    message: "Booked a special pooja for my parents' anniversary from London. The live darshan feature brought tears to my eyes.",
    rating: 5
  },
  {
    name: "Vikram Patel",
    location: "Dubai, UAE",
    message: "Finally found our ancestral temple in Gujarat that my grandfather always talked about. Connected with relatives I never knew existed!",
    rating: 5
  },
  {
    name: "Sunita Mehta",
    location: "Toronto, Canada",
    message: "The recurring donation feature helps me contribute to my village temple every month. Keeping our traditions alive from abroad.",
    rating: 5
  }
];

const Index = () => {
  const { t } = useLanguage();
  const [locationGranted, setLocationGranted] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(heroPhrases[0]);

  // Select a random phrase on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroPhrases.length);
    setCurrentPhrase(heroPhrases[randomIndex]);
  }, []);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationGranted(true),
        () => setLocationGranted(false)
      );
    }
  };

  const features = [
    {
      icon: Search,
      title: t('discoverTemples'),
      description: t('discoverTemplesDesc')
    },
    {
      icon: Users,
      title: t('connectPriests'),
      description: t('connectPriestsDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section with Image Background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${villageTempleImage})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('connectingDevotees')}
          </Badge>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            {currentPhrase.headline}
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {currentPhrase.subline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/temples">
              <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                {t('exploreTemples')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/ancestral">
              <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 border-2 bg-background/80 backdrop-blur-sm hover:bg-background">
                <TreePine className="w-5 h-5" />
                {t('findAncestral')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t('yourSpiritualJourney')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('everythingYouNeed')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:-translate-y-1 w-full sm:w-[280px]">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <FeaturedTemples />

      {/* Temples Near You */}
      <TemplesNearYou 
        locationGranted={locationGranted} 
        onRequestLocation={handleLocationRequest} 
      />

      {/* Spiritual Tip */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SpiritualTip />
        </div>
      </section>

      {/* Ancestral Temple CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-primary/20 bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src={villageTempleImage} 
                      alt="Village Temple"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                  </div>
                  
                  {/* Content Side */}
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary">
                      <TreePine className="w-3 h-3 mr-1" />
                      {t('ancestralConnection')}
                    </Badge>
                    
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
                      {t('reconnectRoots')}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                      {t('ancestralCTADescription')}
                    </p>
                    
                    <Link to="/ancestral">
                      <Button className="w-full sm:w-auto rounded-full gap-2 bg-primary hover:bg-primary/90">
                        {t('startJourney')}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Voices of Devotion - Indian Testimonials */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Heart className="w-3 h-3 mr-1" />
              {t('voicesOfDevotion')}
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              From India
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Devotees across India sharing their temple experiences
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {indianTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-foreground mb-6 italic leading-relaxed">
                        "{testimonial.message}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-0" />
            <CarouselNext className="hidden md:flex right-0" />
          </Carousel>
        </div>
      </section>

      {/* Voices of Devotion - NRI Testimonials */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-secondary/50 text-secondary-foreground border-secondary/30">
              <Globe2 className="w-3 h-3 mr-1" />
              {t('voicesOfDevotion')}
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              From Abroad
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              NRIs staying connected to their roots from around the world
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {nriTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                      <p className="text-foreground mb-6 italic leading-relaxed">
                        "{testimonial.message}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                          <span className="text-secondary-foreground font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Globe2 className="w-3 h-3" />
                            {testimonial.location}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-0" />
            <CarouselNext className="hidden md:flex right-0" />
          </Carousel>
        </div>
      </section>

      {/* Temple Owner / Priest CTA */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <Badge variant="outline" className="mb-2 border-primary/30 text-primary">
                  <Building2 className="w-3 h-3 mr-1" />
                  For Temple Owners & Priests
                </Badge>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  Are you a Temple Owner or Priest?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Bring your temple online and connect with devotees worldwide
                </p>
              </div>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="rounded-full px-6 gap-2 border-primary/30 hover:bg-primary/10">
                  <Building2 className="w-5 h-5" />
                  Temple Admin Portal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t('readyToBegin')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('joinThousands')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90">
                {t('createFreeAccount')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-to">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-2">
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
