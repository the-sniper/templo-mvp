import { Users, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TempleAdminCTA = () => {
  return (
    <section className="py-8 sm:py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 border border-primary/20 p-6 sm:p-8 overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                backgroundSize: '20px 20px',
              }} />
            </div>

            <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              {/* Icon */}
              <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="h-8 w-8 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2">
                  Are you a Temple Trustee or Priest?
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Add your temple to Templo and connect with devotees worldwide. 
                  Stream darshans, accept donations, and manage bookings—all in one place.
                </p>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <Link to="/register">
                  <Button className="rounded-full px-6">
                    <Users className="h-4 w-4 mr-2" />
                    Join as Temple Admin
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleAdminCTA;
