import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content - Emotional & Community Focused */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-xl">Templo</p>
              <p className="text-xs text-muted-foreground">{t('sacredConnections')}</p>
            </div>
          </div>
          
          <p className="text-lg text-foreground font-serif max-w-2xl mx-auto mb-2">
            "Faith knows no distance. Devotion has no boundaries."
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join millions of devotees who carry their temples in their hearts, 
            wherever life takes them.
          </p>
        </div>

        {/* Social Proof / Community */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 py-8 border-y border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-serif">500+</p>
            <p className="text-sm text-muted-foreground">Sacred Temples</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-serif">50,000+</p>
            <p className="text-sm text-muted-foreground">Devoted Hearts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-serif">25+</p>
            <p className="text-sm text-muted-foreground">Countries Connected</p>
          </div>
        </div>

        {/* Quick Links - Minimal */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/temples" className="text-muted-foreground hover:text-primary transition-colors">
            Explore Temples
          </Link>
          <Link to="/ancestral" className="text-muted-foreground hover:text-primary transition-colors">
            Find Roots
          </Link>
          <Link to="/how-to" className="text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
            My Dashboard
          </Link>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 mb-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for devotees worldwide
          </p>
          <p>© {new Date().getFullYear()} Templo. Connecting hearts to temples.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;