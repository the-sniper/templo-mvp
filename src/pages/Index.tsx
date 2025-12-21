import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedTemples from '@/components/FeaturedTemples';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Heart, Search, Play, Pause, Volume2, VolumeX, Music, TreePine, Quote, Users, Camera } from 'lucide-react';
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

  // Fade in animation for quote
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

  const testimonials = [
    { 
      quote: "Being thousands of miles away in California, Templo helps me stay connected to my family temple in Madurai. Every ritual, every blessing—I feel like I'm there.", 
      name: "Priya Srinivasan", 
      location: "California, USA",
      image: null,
      type: "text"
    },
    { 
      quote: "I watched my grandmother's ceremony live from London. The temple bells, the chants, the fragrance of camphor—tears of gratitude flowed. Thank you, Templo.", 
      name: "Rajesh Iyer", 
      location: "London, UK",
      image: null,
      type: "video"
    },
    { 
      quote: "After 3 generations, we finally found our ancestral temple in a small village near Thanjavur. It felt like coming home after a century-long journey.", 
      name: "Meera Krishnamurthy", 
      location: "Sydney, Australia",
      image: null,
      type: "text"
    },
  ];

  const musicTracks = [
    { title: 'Suprabhatam', artist: 'Morning Awakening' },
    { title: 'Om Namah Shivaya', artist: 'Sacred Chants' },
    { title: 'Bhajans from Thanjavur', artist: 'Temple Priests' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Emotional & Sacred */}
      <section className="relative overflow-hidden">
        {/* Background with Traditional Textures */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-accent/5 to-transparent" />
        
        {/* Decorative Temple Bell Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="bells" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 L20 10 M15 15 Q20 20 25 15 Q30 25 20 35 Q10 25 15 15" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bells)" className="text-primary"/>
          </svg>
        </div>
        
        {/* Gopuram Outline (subtle) */}
        <div className="absolute left-0 bottom-0 w-64 h-80 opacity-[0.02]">
          <svg viewBox="0 0 100 150" className="w-full h-full">
            <path d="M50 0 L60 20 L70 45 L80 75 L85 110 L90 150 L10 150 L15 110 L20 75 L30 45 L40 20 Z" fill="currentColor" className="text-primary"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-16 sm:py-24 lg:py-32 max-w-4xl mx-auto text-center">
            {/* Sacred Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Your Divine Connection Awaits</span>
            </div>
            
            {/* Emotional Headline */}
            <h1 className="mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              The Temple of Your Childhood.
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                The Blessings of Your Lineage.
              </span>
            </h1>
            
            {/* Poetic Subtitle */}
            <p className="mb-10 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-serif italic">
              "Even from miles away, the divine hears you. Feel the sacred bells echo in your heart, wherever you are."
            </p>
            
            {/* Find My Temple Search */}
            <form onSubmit={handleSearch} className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Find your temple by name, location, or deity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-36 text-base rounded-full border-border bg-card shadow-sm focus:ring-2 focus:ring-primary/20"
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Temple
                </Button>
              </div>
            </form>
            
            {/* Secondary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/ancestral">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/30 hover:bg-primary/5">
                  <TreePine className="mr-2 h-4 w-4" />
                  Find My Ancestral Temple
                </Button>
              </Link>
              <span className="text-muted-foreground text-sm">or</span>
              <Link to="/temples" className="text-primary hover:underline font-medium">
                Browse All Temples →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Garland Border */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </section>

      {/* Your Sacred Journey Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-card/50 to-background relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&auto=format&fit=crop&q=80" 
                    alt="Traditional village temple with devotees"
                    className="w-full h-[300px] sm:h-[400px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  {/* Warm Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-sm text-primary-foreground font-medium bg-foreground/40 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                      A village temple, where generations have prayed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium uppercase tracking-wider text-primary">Reconnect With Your Roots</span>
                </div>
                
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Your Sacred Journey
                  <span className="block text-primary">Begins Here</span>
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
                  For generations, your ancestors walked the sacred grounds of their village temple. 
                  The same bells that rang for them still ring today, waiting to welcome you home.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg font-serif italic">
                  Whether you're an NRI longing for home, a child of Indian heritage discovering your roots, 
                  or a seeker of divine connection—your temple awaits.
                </p>
                
                <Link to="/ancestral">
                  <Button size="lg" className="rounded-full px-8">
                    <Heart className="mr-2 h-4 w-4" />
                    Find My Ancestral Temple
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Quote Block */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Warm Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5" />
        
        {/* Decorative Elements */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-32 w-32 text-primary rotate-180" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
          <Quote className="h-32 w-32 text-primary" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic">
              "A thousand miles away, I still hear the temple bells of my childhood."
            </blockquote>
            <footer className="mt-6">
              <p className="text-primary font-medium">— A devotee from Toronto</p>
              <p className="text-muted-foreground text-sm mt-1">Reconnected with their family temple after 25 years</p>
            </footer>
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <FeaturedTemples />
          </div>
        </div>
      </section>

      {/* Voices of Devotion - Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-card/30 via-card/50 to-card/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary">Stories of Faith</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Voices of Devotion
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                Heartfelt stories from devotees who reconnected with their spiritual roots
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all"
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-2xl" />
                  
                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      <Camera className="h-3 w-3" />
                      Video Story
                    </div>
                  )}
                  
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4 rotate-180" />
                  
                  {/* Quote */}
                  <p className="text-foreground leading-relaxed mb-6 text-sm sm:text-base">
                    "{item.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center ring-2 ring-primary/10">
                      <span className="text-primary font-serif font-bold text-lg">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Share Your Story CTA */}
            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-4">Have a story to share?</p>
              <Button variant="outline" className="rounded-full px-6">
                <Users className="mr-2 h-4 w-4" />
                Share Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Music Preview - Floating Block */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <Music className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">Sacred Sounds</h3>
                    <p className="text-sm text-muted-foreground">Temple music to soothe your soul</p>
                  </div>
                </div>
                
                {/* Mute Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMusicMuted(!musicMuted)}
                  className="rounded-full h-10 w-10"
                >
                  {musicMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
              
              {/* Track List */}
              <div className="space-y-3">
                {musicTracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      index === 0 
                        ? 'bg-primary/10 border border-primary/20' 
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
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">Now Playing</span>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Morning Reminder */}
              <div className="mt-6 p-4 bg-gradient-to-r from-accent/30 to-primary/10 rounded-xl text-center">
                <p className="text-sm text-foreground">🌅 Start your day with Suprabhatam at 5:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 p-8 sm:p-12 lg:p-16 text-center">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />
              </div>
              
              <div className="relative">
                <Sparkles className="h-10 w-10 text-primary-foreground/50 mx-auto mb-6" />
                
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                  The Temple Door is Always Open
                </h2>
                <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-base sm:text-lg">
                  No matter the distance, no matter the time—your spiritual home awaits. 
                  Begin your journey of faith, connection, and inner peace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/temples">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Your Temple
                    </Button>
                  </Link>
                  <Link to="/ancestral">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="w-full sm:w-auto rounded-full px-8 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                      <TreePine className="mr-2 h-4 w-4" />
                      Discover Your Roots
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