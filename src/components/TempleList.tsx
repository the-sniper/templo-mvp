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
    <div className="space-y-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4 rounded-lg border border-border bg-card p-4">
              <Skeleton className="aspect-[4/3] w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : filteredTemples.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground">No temples found</h3>
          <p className="text-muted-foreground">
            Try searching with a different term
          </p>
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-muted-foreground">
            Showing {filteredTemples.length} sacred {filteredTemples.length === 1 ? 'temple' : 'temples'}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
