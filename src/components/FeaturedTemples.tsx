import { useMemo } from 'react';
import { useTemple } from '@/context/TempleContext';
import TempleCard from './TempleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const FeaturedTemples = () => {
  const { temples, loading, error } = useTemple();

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
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1.5" />
            Sacred Destinations
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Featured Temples
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover revered temples across India, each with its own divine history and spiritual significance
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Skeleton className="aspect-[16/10] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTemples;
