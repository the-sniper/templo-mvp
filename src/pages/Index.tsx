import Header from '@/components/Header';
import TempleList from '@/components/TempleList';
import { Sparkles, MapPin, Heart, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Modern & Clean */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-accent/30 to-background">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Your Sacred Journey Starts Here
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-6 animate-fade-in font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: '0.1s' }}>
              Discover India's
              <span className="block bg-gradient-to-r from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                Sacred Temples
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-xl animate-fade-in text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: '0.2s' }}>
              Connect with divine spaces, follow your favorite temples, and never miss a pooja or festival.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex animate-fade-in flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="w-full rounded-full px-8 py-6 text-base shadow-xl shadow-primary/30 sm:w-auto">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Temples
              </Button>
              <Link to="/ancestral">
                <Button variant="outline" size="lg" className="w-full rounded-full border-2 px-8 py-6 text-base sm:w-auto">
                  Find Ancestral Temple
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Feature Pills */}
          <div className="mt-16 flex animate-fade-in flex-wrap items-center justify-center gap-3 sm:gap-4" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Heart, label: 'Follow Temples' },
              { icon: Bell, label: 'Get Updates' },
              { icon: MapPin, label: 'Find Nearby' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm backdrop-blur-sm"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Temple List Section */}
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <TempleList />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">Templo</p>
                <p className="text-xs text-muted-foreground">Sacred Connections</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Templo. Connecting devotees with sacred spaces.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;