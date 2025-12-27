import { useMemo } from 'react';
import { useTemple } from '@/context/TempleContext';
import TempleCard from './TempleCard';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Skeleton className="h-48 w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredTemples.map((temple) => (
        <div key={temple.id} className="h-[360px]">
          <TempleCard temple={temple} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedTemples;
