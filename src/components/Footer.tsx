import { Link } from 'react-router-dom';
import { Sparkles, Heart, Instagram, Youtube, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import FeedbackPopup, { useFeedbackTrigger } from '@/components/FeedbackPopup';

const Footer = () => {
  const { t } = useLanguage();
  const { isOpen, openFeedback, closeFeedback } = useFeedbackTrigger();
  return (
    <footer className="border-t border-border bg-gradient-to-b from-card to-card/80">
      {/* Spiritual Quote Banner */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-lg sm:text-xl text-foreground italic leading-relaxed">
              "Where there is faith, there is always a way."
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground text-xl">Templo</span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Bridging the distance between devotees and their sacred temples. 
                Your spiritual home, always within reach.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Explore</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Find Temples
                  </Link>
                </li>
                <li>
                  <Link to="/ancestral" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Ancestral Temples
                  </Link>
                </li>
                <li>
                  <Link to="/how-to" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    My Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Live Darshan
                  </Link>
                </li>
                <li>
                  <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Book Pooja
                  </Link>
                </li>
                <li>
                  <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Make Donations
                  </Link>
                </li>
                <li>
                  <Link to="/temples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Temple Music
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Join Our Community</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Be part of a global family of devotees. Share stories, find support, and stay connected.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-medium">50,000+</span>
                <span className="text-muted-foreground">devotees worldwide</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Made with Love */}
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for devotees worldwide
              </p>
              
              {/* Feedback Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={openFeedback}
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Share Feedback
              </Button>
              
              {/* Copyright */}
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Templo. All rights reserved.
              </p>
            </div>
          </div>

          {/* Feedback Popup */}
          <FeedbackPopup isOpen={isOpen} onClose={closeFeedback} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;