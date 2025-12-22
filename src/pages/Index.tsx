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
import { Sparkles, MapPin, Heart, Search, Play, Pause, Volume2, VolumeX, Music, TreePine, Quote, Users, Camera, Home, Star, Clock } from 'lucide-react';
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
        quote: "My children were born in London. They had never seen a temple until Templo. Now, every morning, we watch the live aarti together. My 6-year-old now asks me to teach her the slokas. My heart overflows.", 
        name: "Anitha Ramachandran", 
        location: "London, UK",
        type: "text"
      },
      { 
        quote: "I left India 30 years ago. I forgot the name of our village temple. With Templo, I found it—a small shrine near Thanjavur where my grandmother used to take me. When I saw it on screen, I broke down. I am home again.", 
        name: "Suresh Natarajan", 
        location: "Toronto, Canada",
        type: "text"
      },
    ],
    india: [
      { 
        quote: "I work 12-hour shifts in Bangalore. I cannot visit my mother in our village, let alone our ancestral temple. Now, every month, I book a pooja through Templo. The priest calls me after—it feels like my mother is blessing me through the phone.", 
        name: "Karthik Sundaram", 
        location: "Bangalore, India",
        type: "text"
      },
      { 
        quote: "When my father took his last breath, I was on a train to Mumbai. I could not reach our temple in time. The priests at our family shrine performed the rituals while I watched on my phone, tears streaming. Templo was my bridge to the divine that day.", 
        name: "Revathi Krishnan", 
        location: "Mumbai, India",
        type: "video"
      },
      { 
        quote: "Our temple in rural Kerala had no visitors for years. We listed it on Templo. Now, families from across India sponsor poojas every week. The temple is alive again. The bells ring again. The gods are smiling again.", 
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
      text: "When the temple bells rang through my laptop speaker, my soul remembered what my mind had forgotten.",
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
      
      {/* Hero Section - Deep Emotional Connection */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Warm Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        
        {/* Subtle Sacred Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L30 55 M5 30 L55 30 M15 15 L45 45 M45 15 L15 45' stroke='%23B8860B' stroke-width='0.5' fill='none' opacity='0.5'/%3E%3Ccircle cx='30' cy='30' r='20' stroke='%23B8860B' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="py-12 sm:py-16 lg:py-20 max-w-5xl mx-auto">
            <div className="text-center">
              {/* Emotional Opening */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary">
                <Home className="h-4 w-4" />
                <span>Come home. Your temple is waiting.</span>
              </div>
              
              {/* Main Headline - Deeply Personal */}
              <h1 className="mb-8 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-foreground">
                <span className="block">Remember the temple</span>
                <span className="block mt-1">where your grandmother prayed?</span>
                <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                  It still prays for you.
                </span>
              </h1>
              
              {/* Emotional Subtext */}
              <p className="mb-10 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Thousands of miles away, your ancestral temple stands unchanged. 
                The same stones. The same bells. The same prayers your family has offered for generations.
                <span className="block mt-2 font-serif italic text-foreground/80">
                  Now, you can be there again.
                </span>
              </p>
              
              {/* Search - The First Step Home */}
              <form onSubmit={handleSearch} className="mb-6 max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search your temple by name, village, deity, or memory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-14 pr-40 text-base sm:text-lg rounded-full border-2 border-border bg-card shadow-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 sm:px-8 h-12"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Find Temple</span>
                    <span className="sm:hidden">Find</span>
                  </Button>
                </div>
              </form>

              {/* Quick Filters */}
              <div className="mb-10">
                <QuickFilters onLocationRequest={handleLocationRequest} />
              </div>
              
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/ancestral">
                  <Button size="lg" className="rounded-full px-8 h-14 text-base">
                    <Heart className="mr-2 h-5 w-5" />
                    Find My Ancestral Temple
                  </Button>
                </Link>
                <Link to="/temples">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-primary/30">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore All Temples
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>1,200+ temples connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>50,000+ families reunited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Live darshan 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise Section - Why This Matters */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-card/80 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-tight">
              You left home.<br />
              <span className="text-primary">But home never left you.</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              Perhaps you moved for work. Perhaps your parents moved you. Perhaps life just happened. 
              But somewhere deep inside, you still remember—the smell of camphor, the sound of bells, 
              the feeling of standing before something greater than yourself.
            </p>

            {/* Three Pillars */}
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-4xl mb-4">🪔</div>
                <h3 className="font-serif font-bold text-foreground mb-2">Watch Live</h3>
                <p className="text-sm text-muted-foreground">
                  See the aarti. Hear the mantras. Be present at your temple, from anywhere in the world.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-4xl mb-4">📿</div>
                <h3 className="font-serif font-bold text-foreground mb-2">Request Pooja</h3>
                <p className="text-sm text-muted-foreground">
                  Book rituals for birthdays, anniversaries, or just because your heart calls you.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="font-serif font-bold text-foreground mb-2">Find Your Roots</h3>
                <p className="text-sm text-muted-foreground">
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

      {/* Your Ancestral Temple Section - Deep Emotional Design */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1621427642649-dd7d6c0ef3b8?w=800&auto=format&fit=crop&q=80" 
                    alt="Ancient village temple where generations have prayed"
                    className="w-full h-[350px] sm:h-[450px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent" />
                  
                  {/* Emotional Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="text-primary-foreground font-serif text-lg sm:text-xl italic">
                      "This is where my grandmother brought me when I was five."
                    </p>
                    <p className="text-primary-foreground/70 text-sm mt-2">
                      — Every devotee who finds their temple
                    </p>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -right-4 top-8 bg-card rounded-xl shadow-lg p-4 border border-border hidden lg:block">
                  <p className="text-2xl font-bold text-primary">2,847</p>
                  <p className="text-xs text-muted-foreground">families found their<br />ancestral temples</p>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <TreePine className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Reconnect with your roots</span>
                </div>
                
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Somewhere in India,<br />
                  <span className="text-primary">your family temple is waiting.</span>
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
                  Maybe your grandparents mentioned it in stories. Maybe you visited as a child 
                  and forgot the name. Maybe you have only heard whispers of a village, a deity, a tradition.
                </p>
                
                <p className="text-foreground leading-relaxed mb-8 text-base sm:text-lg font-serif">
                  <span className="text-primary font-bold">We will help you find it.</span> Tell us what you remember—
                  a village name, a deity, your family surname, your community. Our network of 
                  1,200+ temples will search for your ancestral connection.
                </p>

                <div className="space-y-4">
                  <Link to="/ancestral">
                    <Button size="lg" className="rounded-full px-10 h-14 text-base w-full sm:w-auto">
                      <Heart className="mr-2 h-5 w-5" />
                      Begin Your Search
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Free. No commitment. Just a journey home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Quote Block */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-primary/5">
        <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-16 sm:h-32 w-16 sm:w-32 text-primary rotate-180" />
        </div>
        <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-16 sm:h-32 w-16 sm:w-32 text-primary" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div 
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <blockquote className="font-serif text-xl sm:text-2xl md:text-4xl text-foreground leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <footer className="mt-8">
              <p className="text-primary font-semibold text-lg">— {currentQuote.author}</p>
              <p className="text-muted-foreground text-sm mt-1">{currentQuote.context}</p>
            </footer>
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Voices of Devotion - Emotional Testimonials */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card/50 via-card/80 to-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary">Real Stories. Real Tears. Real Faith.</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Voices of Devotion
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-base sm:text-lg">
                These are not testimonials. These are moments of grace, shared by families like yours.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-full bg-muted p-1.5 gap-1">
                <button
                  onClick={() => setTestimonialTab('nri')}
                  className={`px-5 sm:px-8 py-3 rounded-full text-sm font-medium transition-all ${
                    testimonialTab === 'nri' 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🌍 Living Abroad
                </button>
                <button
                  onClick={() => setTestimonialTab('india')}
                  className={`px-5 sm:px-8 py-3 rounded-full text-sm font-medium transition-all ${
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials[testimonialTab].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Decorative Corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
                  
                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                      <Camera className="h-3 w-3" />
                      Video Story
                    </div>
                  )}
                  
                  {/* Quote */}
                  <Quote className="h-6 w-6 text-primary/30 mb-4 rotate-180" />
                  <p className="text-foreground leading-relaxed mb-6 text-sm sm:text-base min-h-[120px]">
                    "{item.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/40 flex items-center justify-center ring-2 ring-primary/20">
                      <span className="text-primary font-serif font-bold text-lg">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Share Your Story */}
            <div className="text-center mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10">
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                Your story matters too.
              </h3>
              <p className="text-muted-foreground mb-6">
                If Templo has touched your life, we would be honored to hear from you.
              </p>
              <Button variant="outline" className="rounded-full px-8">
                <Heart className="mr-2 h-4 w-4" />
                Share Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Sounds - Temple Music */}
      <section className="py-12 sm:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                Close your eyes. Listen. Remember.
              </h3>
              <p className="text-muted-foreground mt-2">
                The same sounds that echoed in your childhood temple.
              </p>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg relative overflow-hidden">
              {musicPlaying && !musicMuted && (
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              )}
              
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center ${musicPlaying ? 'animate-pulse' : ''}`}>
                    <Music className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">Sacred Sounds</h3>
                    <p className="text-sm text-muted-foreground">Temple music for your soul</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMusicMuted(!musicMuted)}
                  className="rounded-full h-10 w-10"
                >
                  {musicMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="relative space-y-3">
                {musicTracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      index === 0 
                        ? `bg-primary/10 border border-primary/20 ${musicPlaying ? 'ring-2 ring-primary/30' : ''}` 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {index === 0 && musicPlaying ? (
                        <Pause className={`h-4 w-4 ${index === 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      ) : (
                        <Play className={`h-4 w-4 ml-0.5 ${index === 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`font-medium ${index === 0 ? 'text-primary' : 'text-foreground'}`}>{track.title}</p>
                      <p className="text-xs text-muted-foreground">{track.artist}</p>
                    </div>
                    {index === 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${musicPlaying ? 'text-primary-foreground bg-primary animate-pulse' : 'text-primary bg-primary/10'}`}>
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

      {/* Final CTA - The Invitation */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 p-8 sm:p-12 lg:p-16 text-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />
              </div>
              
              <div className="relative">
                <div className="text-5xl mb-6">🙏</div>
                
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 leading-tight">
                  The temple door has always been open.<br />
                  <span className="text-primary-foreground/90">You just needed a way to reach it.</span>
                </h2>
                
                <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-base sm:text-lg">
                  No matter where life has taken you—across oceans, across time zones, across the years—
                  the divine connection remains unbroken. Your ancestors are with you. Your temple awaits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/temples">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base font-semibold">
                      <MapPin className="mr-2 h-5 w-5" />
                      Find Your Temple
                    </Button>
                  </Link>
                  <Link to="/ancestral">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="w-full sm:w-auto rounded-full px-10 h-14 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-base font-semibold"
                    >
                      <TreePine className="mr-2 h-5 w-5" />
                      Discover Your Roots
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-primary-foreground/20">
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
