import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TempleAdminCTA = () => {
  return (
    <section className="py-8 sm:py-10 bg-popover/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
            For Temples, By Devotees
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg mb-4 max-w-xl mx-auto">
            Templo exists to help temples stay connected to people—<br />
            not as visitors, but as family.
          </p>
          <Link to="/register">
            <Button variant="outline" className="rounded-full px-8 h-12 text-base border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50">
              <Heart className="h-4 w-4 mr-2" />
              I Manage a Temple
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TempleAdminCTA;
