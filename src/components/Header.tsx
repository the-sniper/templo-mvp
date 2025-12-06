import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';

const Header = () => {
  const { followedTemples } = useTemple();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-xl">🙏</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">Divine Temple</h1>
              <p className="text-xs text-muted-foreground">Connect with the Divine</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Temples
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{followedTemples.length} Following</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
