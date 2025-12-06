import { useState, useMemo } from 'react';
import { useTemple } from '@/context/TempleContext';
import TempleCard from './TempleCard';
import SearchBar from './SearchBar';
import { Skeleton } from '@/components/ui/skeleton';

const TempleList = () => {
  const { temples, loading, error } = useTemple();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemples = useMemo(() => {
    if (!searchQuery.trim()) return temples;
    
    const query = searchQuery.toLowerCase();
    return temples.filter(
      (temple) =>
        temple.name.toLowerCase().includes(query) ||
        temple.city.toLowerCase().includes(query) ||
        temple.deity.toLowerCase().includes(query) ||
        temple.location.toLowerCase().includes(query)
    );
  }, [temples, searchQuery]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-border bg-card p-3 sm:space-y-4 sm:p-4">
              <Skeleton className="aspect-[4/3] w-full rounded-md" />
              <Skeleton className="h-5 w-3/4 sm:h-6" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full sm:h-16" />
            </div>
          ))}
        </div>
      ) : filteredTemples.length === 0 ? (
        <div className="py-12 text-center sm:py-20">
          <div className="mb-3 text-5xl sm:mb-4 sm:text-6xl">🔍</div>
          <h3 className="mb-2 font-serif text-lg font-bold text-foreground sm:text-xl">No temples found</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Try searching with a different term
          </p>
        </div>
      ) : (
        <>
          <p className="text-center text-xs text-muted-foreground sm:text-sm">
            Showing {filteredTemples.length} sacred {filteredTemples.length === 1 ? 'temple' : 'temples'}
          </p>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TempleList;
