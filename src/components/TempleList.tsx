import { useState, useMemo } from 'react';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import TempleCard from './TempleCard';
import SearchBar from './SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Sparkles } from 'lucide-react';

const TempleList = () => {
  const { temples, loading, error } = useTemple();
  const { t } = useLanguage();
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
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              {t('discoverTemples')}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            {t('exploreTemples')}
          </h2>
        </div>
        
        <div className="w-full sm:w-80">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Results Count */}
      {!loading && filteredTemples.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>
            Showing <strong className="text-foreground">{filteredTemples.length}</strong> sacred {filteredTemples.length === 1 ? 'temple' : 'temples'}
          </span>
        </div>
      )}

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
      ) : filteredTemples.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground">{t('noTemplesFound')}</h3>
          <p className="text-muted-foreground">
            {t('tryDifferentSearch')}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((temple, index) => (
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

export default TempleList;