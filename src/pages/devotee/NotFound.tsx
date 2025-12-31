import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          {/* Decorative Element */}
          <div className="mb-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-4">
              <span className="text-5xl">🏛️</span>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="font-serif text-6xl sm:text-7xl font-bold text-primary mb-4">
            404
          </h1>

          {/* Message */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Temple Not Found
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            The sacred path you seek doesn't exist. Perhaps the temple has moved to a higher realm.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="gap-2 rounded-full w-full sm:w-auto">
                <Home className="h-5 w-5" />
                Return Home
              </Button>
            </Link>
            <Link to="/temples">
              <Button size="lg" variant="outline" className="gap-2 rounded-full w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Explore Temples
              </Button>
            </Link>
          </div>

          {/* Decorative Text */}
          <p className="mt-12 text-sm text-muted-foreground italic">
            "Every wrong turn is still a step on the journey" — Ancient Proverb
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
