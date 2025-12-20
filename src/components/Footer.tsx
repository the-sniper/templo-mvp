import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Brand & Message */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground text-lg">Templo</span>
            </div>
            
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Connecting devotees with temples across India. Your spiritual home awaits, wherever you are.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8 py-6 border-y border-border">
            <div className="text-center">
              <p className="text-xl font-bold text-primary font-serif">500+</p>
              <p className="text-xs text-muted-foreground">Temples</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary font-serif">50K+</p>
              <p className="text-xs text-muted-foreground">Devotees</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary font-serif">25+</p>
              <p className="text-xs text-muted-foreground">Countries</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/temples" className="text-muted-foreground hover:text-primary transition-colors">
              Temples
            </Link>
            <Link to="/ancestral" className="text-muted-foreground hover:text-primary transition-colors">
              Find Roots
            </Link>
            <Link to="/how-to" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Bottom */}
          <div className="text-center text-xs text-muted-foreground">
            <p className="flex items-center justify-center gap-1 mb-1">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for devotees worldwide
            </p>
            <p>© {new Date().getFullYear()} Templo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;