import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import TempleCard from './TempleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedTemples = () => {
  const { temples, loading, error } = useTemple();
  const { t } = useLanguage();

  // Show first 6 temples as featured
  const featuredTemples = useMemo(() => {
    return temples.slice(0, 6);
  }, [temples]);

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Link to="/temples">
          <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/40 text-foreground bg-card/80 hover:bg-primary/10 hover:border-primary/60">
            View All Temples
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
          {/* Horizontal scrollable container with visible partial cards */}
          <div 
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-0 pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredTemples.map((temple, index) => (
              <div 
                key={temple.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] snap-start animate-fade-in h-[340px]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TempleCard temple={temple} />
              </div>
            ))}
            {/* Spacer for last card visibility */}
            <div className="flex-shrink-0 w-4 sm:w-6 lg:hidden" />
          </div>
          
          {/* Scroll hint gradient on right */}
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-popover/80 to-transparent pointer-events-none lg:hidden" />
        </div>
      )}
    </div>
  );
};

export default FeaturedTemples;