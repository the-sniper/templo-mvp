import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import TempleCard from './TempleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const FeaturedTemples = () => {
  const { temples, loading, error } = useTemple();
  const { t } = useLanguage();

  // Show first 6 temples as featured
  const featuredTemples = useMemo(() => {
    return temples.slice(0, 6);
  }, [temples]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="mb-3 flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Featured
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Popular Temples
          </h2>
        </div>
        <Link to="/temples">
          <Button variant="outline" className="gap-2 rounded-full">
            View All Temples
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-2xl border border-border bg-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemples.map((temple, index) => (
            <div 
              key={temple.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TempleCard temple={temple} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedTemples;
