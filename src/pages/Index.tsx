import Header from '@/components/Header';
import TempleList from '@/components/TempleList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent to-background py-10 sm:py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-10 text-6xl sm:text-8xl">🕉️</div>
          <div className="absolute right-1/4 top-20 hidden text-6xl sm:block">🪷</div>
          <div className="absolute bottom-10 left-1/3 hidden text-7xl sm:block">🪔</div>
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
            🙏 Discover Sacred Spaces
          </span>
          <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-foreground sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Connect with the
            <span className="block text-primary">Divine</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:mb-8 sm:text-base md:text-lg">
            Explore temples across India, stay updated with pooja timings, festivals, 
            and special announcements from your favorite sacred places.
          </p>
        </div>
      </section>

      {/* Temple List Section */}
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <TempleList />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Divine Temple Platform. Connecting devotees with sacred spaces.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
