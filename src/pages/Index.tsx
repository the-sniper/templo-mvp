import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import QuickFilters from '@/components/QuickFilters';
import TemplesNearYou from '@/components/TemplesNearYou';
import TodaysHighlights from '@/components/TodaysHighlights';
import TempleAdminCTA from '@/components/TempleAdminCTA';
import LiveActivityCounter from '@/components/LiveActivityCounter';
import FloatingDiya from '@/components/FloatingDiya';
import villageTempleImg from '@/assets/village-temple.jpg';
import { Sparkles, MapPin, Heart, Search, Play, Pause, Volume2, VolumeX, Music, TreePine, Quote, Camera, Home, Star, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(true);
  const [locationGranted, setLocationGranted] = useState(false);
  const [testimonialTab, setTestimonialTab] = useState<'india' | 'nri'>('nri');

  useEffect(() => {
    const timer = setTimeout(() => setQuoteVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/temples?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/temples');
    }
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationGranted(true),
        () => console.log('Location access denied')
      );
    }
  };

  const testimonials = {
    nri: [
      { 
        quote: "My amma passed away last year in Chennai. I was in New Jersey, helpless. Through Templo, I watched the priests perform her final rites at our family temple. I wept, I prayed, I felt her presence. This platform gave me closure I never thought possible.", 
        name: "Lakshmi Venkatesh", 
        location: "New Jersey, USA",
        type: "video"
      },
      { 
        quote: "My children were born in London. They had never seen a temple until Templo. Now, every morning, we watch the live aarti together. My 6-year-old asks me to teach her the slokas. My heart overflows.", 
        name: "Anitha Ramachandran", 
        location: "London, UK",
        type: "text"
      },
      { 
        quote: "I left India 30 years ago. I forgot the name of our village temple. With Templo, I found it—a small shrine near Thanjavur where my grandmother took me. When I saw it on screen, I broke down.", 
        name: "Suresh Natarajan", 
        location: "Toronto, Canada",
        type: "text"
      },
    ],
    india: [
      { 
        quote: "I work 12-hour shifts in Bangalore. I cannot visit my mother in our village. Now, every month, I book a pooja through Templo. The priest calls me after—it feels like my mother is blessing me.", 
        name: "Karthik Sundaram", 
        location: "Bangalore, India",
        type: "text"
      },
      { 
        quote: "When my father took his last breath, I was on a train to Mumbai. I could not reach our temple in time. The priests performed the rituals while I watched on my phone, tears streaming.", 
        name: "Revathi Krishnan", 
        location: "Mumbai, India",
        type: "video"
      },
      { 
        quote: "Our temple in rural Kerala had no visitors for years. We listed it on Templo. Now, families from across India sponsor poojas every week. The temple is alive again.", 
        name: "Padmini Nair", 
        location: "Kochi, India",
        type: "text"
      },
    ]
  };

  const musicTracks = [
    { title: 'Suprabhatam', artist: 'Morning Awakening' },
    { title: 'Om Namah Shivaya', artist: 'Sacred Chants' },
    { title: 'Bhajans from Thanjavur', artist: 'Temple Priests' },
  ];

  const emotionalQuotes = [
    {
      text: "I close my eyes in California, and I am seven years old again, holding my thatha's hand at the temple entrance.",
      author: "Priya, San Francisco",
      context: "Found her ancestral temple after 25 years"
    },
    {
      text: "The distance is just geography. The connection is eternal.",
      author: "Rajesh, Dubai",
      context: "Watches live darshan every morning"
    },
    {
      text: "When the temple bells rang through my laptop, my soul remembered what my mind had forgotten.",
      author: "Meera, Sydney",
      context: "Reconnected with family traditions"
    }
  ];

  const [currentQuote] = useState(() => 
    emotionalQuotes[Math.floor(Math.random() * emotionalQuotes.length)]
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <FloatingDiya />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] sm:min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L30 55 M5 30 L55 30 M15 15 L45 45 M45 15 L15 45' stroke='%23B8860B' stroke-width='0.5' fill='none' opacity='0.5'/%3E%3Ccircle cx='30' cy='30' r='20' stroke='%23B8860B' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="py-8 sm:py-16 lg:py-20 max-w-5xl mx-auto">
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-primary">
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Come home. Your temple is waiting.</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="mb-6 sm:mb-8 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground px-2">
                <span className="block">Remember the temple</span>
                <span className="block mt-1">where your grandmother prayed?</span>
                <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                  It still prays for you.
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2">
                Thousands of miles away, your ancestral temple stands unchanged. 
                The same stones. The same bells. The same prayers your family has offered for generations.
                <span className="block mt-2 font-serif italic text-foreground/80">
                  Now, you can be there again.
                </span>
              </p>
              
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto px-2">
                <div className="relative">
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by temple, village, or deity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 md:h-16 pl-11 sm:pl-14 pr-4 sm:pr-36 text-sm sm:text-base md:text-lg rounded-full border-2 border-border bg-card shadow-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 h-10 md:h-12"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Temple
                  </Button>
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="sm:hidden w-full mt-3 rounded-full h-12"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Your Temple
                </Button>
              </form>

              {/* Quick Filters */}
              <div className="mb-8 sm:mb-10 px-2">
                <QuickFilters onLocationRequest={handleLocationRequest} />
              </div>
              
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                <Link to="/ancestral" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base">
                    <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Find My Ancestral Temple
                  </Button>
                </Link>
                <Link to="/temples" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base border-primary/30">
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Explore All Temples
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 text-xs sm:text-sm text-muted-foreground px-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>1,200+ temples connected</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span>50,000+ families reunited</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span>Live darshan 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-card/80 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 sm:mb-8 leading-tight px-2">
              You left home.<br />
              <span className="text-primary">But home never left you.</span>
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
              Perhaps you moved for work. Perhaps life just happened. 
              But somewhere deep inside, you still remember—the smell of camphor, the sound of bells, 
              the feeling of standing before something greater than yourself.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 px-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🪔</div>
                <h3 className="font-serif font-bold text-foreground mb-2 text-sm sm:text-base">Watch Live Darshan</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  See the aarti. Hear the mantras. Be present at your temple, from anywhere.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📿</div>
                <h3 className="font-serif font-bold text-foreground mb-2 text-sm sm:text-base">Book Pooja Online</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Request rituals for birthdays, anniversaries, or whenever your heart calls.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌳</div>
                <h3 className="font-serif font-bold text-foreground mb-2 text-sm sm:text-base">Trace Your Roots</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Discover the temple your ancestors built. The one that carries your family name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Highlights */}
      <TodaysHighlights />

      {/* Temples Near You */}
      <TemplesNearYou 
        locationGranted={locationGranted} 
        onRequestLocation={handleLocationRequest} 
      />

      {/* Your Sacred Journey Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image Side */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={villageTempleImg}
                    alt="Traditional South Indian village temple at golden hour with devotees"
                    className="w-full h-[280px] sm:h-[350px] lg:h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center">
                    <p className="text-primary-foreground font-serif text-base sm:text-lg lg:text-xl italic leading-snug">
                      "This is where my grandmother brought me when I was five."
                    </p>
                    <p className="text-primary-foreground/70 text-xs sm:text-sm mt-1 sm:mt-2">
                      — Every devotee who finds their temple
                    </p>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -right-2 sm:-right-4 top-4 sm:top-8 bg-card rounded-xl shadow-lg p-3 sm:p-4 border border-border hidden sm:block">
                  <p className="text-xl sm:text-2xl font-bold text-primary">2,847</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">families found their<br />ancestral temples</p>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2">
                  <TreePine className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary">Reconnect with your roots</span>
                </div>
                
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2 lg:px-0">
                  Somewhere in India,<br />
                  <span className="text-primary">your family temple is waiting.</span>
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg px-4 lg:px-0">
                  Maybe your grandparents mentioned it in stories. Maybe you visited as a child 
                  and forgot the name. Maybe you have only heard whispers of a village, a deity, a tradition.
                </p>
                
                <p className="text-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg font-serif px-4 lg:px-0">
                  <span className="text-primary font-bold">We will help you find it.</span> Tell us what you remember—
                  a village name, a deity, your family surname. Our network of 
                  1,200+ temples will search for your ancestral connection.
                </p>

                <div className="space-y-3 sm:space-y-4 px-4 lg:px-0">
                  <Link to="/ancestral" className="block sm:inline-block">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base">
                      <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Begin Your Search
                    </Button>
                  </Link>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Free. No commitment. Just a journey home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Quote Block */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-primary/5">
        <div className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-12 sm:h-24 lg:h-32 w-12 sm:w-24 lg:w-32 text-primary rotate-180" />
        </div>
        <div className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-12 sm:h-24 lg:h-32 w-12 sm:w-24 lg:w-32 text-primary" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div 
            className={`max-w-3xl lg:max-w-4xl mx-auto text-center transition-all duration-1000 ${
              quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground leading-relaxed px-4">
              "{currentQuote.text}"
            </blockquote>
            <footer className="mt-6 sm:mt-8">
              <p className="text-primary font-semibold text-base sm:text-lg">— {currentQuote.author}</p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{currentQuote.context}</p>
            </footer>
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

      {/* Voices of Devotion */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-card/50 via-card/80 to-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary">Real Stories. Real Tears. Real Faith.</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Voices of Devotion
              </h2>
              <p className="text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
                These are not testimonials. These are moments of grace, shared by families like yours.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center mb-8 sm:mb-10 px-2">
              <div className="inline-flex rounded-full bg-muted p-1 sm:p-1.5 gap-1">
                <button
                  onClick={() => setTestimonialTab('nri')}
                  className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    testimonialTab === 'nri' 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🌍 Living Abroad
                </button>
                <button
                  onClick={() => setTestimonialTab('india')}
                  className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    testimonialTab === 'india' 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🇮🇳 Living in India
                </button>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {testimonials[testimonialTab].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Decorative Corners */}
                  <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-xl sm:rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-primary/30 rounded-br-xl sm:rounded-br-2xl" />
                  
                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span className="hidden sm:inline">Video Story</span>
                      <span className="sm:hidden">Video</span>
                    </div>
                  )}
                  
                  {/* Quote */}
                  <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-primary/30 mb-3 sm:mb-4 rotate-180" />
                  <p className="text-foreground leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base min-h-[100px] sm:min-h-[120px]">
                    "{item.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/50">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/40 flex items-center justify-center ring-2 ring-primary/20 flex-shrink-0">
                      <span className="text-primary font-serif font-bold text-base sm:text-lg">{item.name[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">{item.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Share Your Story */}
            <div className="text-center mt-10 sm:mt-12 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-primary/5 border border-primary/10 mx-2 sm:mx-0">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2">
                Your story matters too.
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                If Templo has touched your life, we would be honored to hear from you.
              </p>
              <Button variant="outline" className="rounded-full px-6 sm:px-8 h-10 sm:h-11 text-sm">
                <Heart className="mr-2 h-4 w-4" />
                Share Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Sounds */}
      <section className="py-10 sm:py-12 lg:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-xl sm:max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                Close your eyes. Listen. Remember.
              </h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                The same sounds that echoed in your childhood temple.
              </p>
            </div>
            
            <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8 shadow-lg relative overflow-hidden">
              {musicPlaying && !musicMuted && (
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              )}
              
              <div className="relative flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center ${musicPlaying ? 'animate-pulse' : ''}`}>
                    <Music className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-foreground">Sacred Sounds</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Temple music for your soul</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMusicMuted(!musicMuted)}
                  className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                >
                  {musicMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                </Button>
              </div>
              
              <div className="relative space-y-2 sm:space-y-3">
                {musicTracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all ${
                      index === 0 
                        ? `bg-primary/10 border border-primary/20 ${musicPlaying ? 'ring-2 ring-primary/30' : ''}` 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {index === 0 && musicPlaying ? (
                        <Pause className={`h-3 w-3 sm:h-4 sm:w-4 ${index === 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      ) : (
                        <Play className={`h-3 w-3 sm:h-4 sm:w-4 ml-0.5 ${index === 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className={`font-medium text-sm sm:text-base truncate ${index === 0 ? 'text-primary' : 'text-foreground'}`}>{track.title}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{track.artist}</p>
                    </div>
                    {index === 0 && (
                      <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-full flex-shrink-0 ${musicPlaying ? 'text-primary-foreground bg-primary animate-pulse' : 'text-primary bg-primary/10'}`}>
                        {musicPlaying ? '🎵 Playing' : 'Now Playing'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Admin CTA */}
      <TempleAdminCTA />

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 p-6 sm:p-10 lg:p-16 text-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />
              </div>
              
              <div className="relative">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🙏</div>
                
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight px-2">
                  The temple door has always been open.<br />
                  <span className="text-primary-foreground/90">You just needed a way to reach it.</span>
                </h2>
                
                <p className="text-primary-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
                  No matter where life has taken you—across oceans, across time zones—
                  the divine connection remains unbroken. Your ancestors are with you. Your temple awaits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link to="/temples" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-12 sm:h-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-sm sm:text-base font-semibold">
                      <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Find Your Temple
                    </Button>
                  </Link>
                  <Link to="/ancestral" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-12 sm:h-14 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-sm sm:text-base font-semibold"
                    >
                      <TreePine className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Discover Your Roots
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-primary-foreground/20">
                  <LiveActivityCounter />
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
