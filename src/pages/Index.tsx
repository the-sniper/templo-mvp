import Header from '@/components/Header';
import TempleList from '@/components/TempleList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent to-background py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-10 text-8xl">🕉️</div>
          <div className="absolute right-1/4 top-20 text-6xl">🪷</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🪔</div>
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            🙏 Discover Sacred Spaces
          </span>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Connect with the
            <span className="block text-primary">Divine</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Explore temples across India, stay updated with pooja timings, festivals, 
            and special announcements from your favorite sacred places.
          </p>
        </div>
      </section>

      {/* Temple List Section */}
      <main className="container mx-auto px-4 py-12">
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
