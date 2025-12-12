import { useState, useMemo } from 'react';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import TempleCard from './TempleCard';
import AdvancedSearch, { SearchFilters } from './AdvancedSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Sparkles } from 'lucide-react';

const TempleList = () => {
  const { temples, loading, error } = useTemple();
  const { t } = useLanguage();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    deity: '',
    city: '',
    state: '',
  });

  // Extract unique values for filters
  const availableDeities = useMemo(() => {
    return [...new Set(temples.map(t => t.deity))].sort();
  }, [temples]);

  const availableCities = useMemo(() => {
    return [...new Set(temples.map(t => t.city))].sort();
  }, [temples]);

  const availableStates = useMemo(() => {
    return [...new Set(temples.map(t => t.state))].sort();
  }, [temples]);

  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      // Text search
      if (filters.query.trim()) {
        const query = filters.query.toLowerCase();
        const matchesText = 
          temple.name.toLowerCase().includes(query) ||
          temple.city.toLowerCase().includes(query) ||
          temple.state.toLowerCase().includes(query) ||
          temple.deity.toLowerCase().includes(query) ||
          temple.location.toLowerCase().includes(query) ||
          temple.description.toLowerCase().includes(query);
        if (!matchesText) return false;
      }

      // Deity filter
      if (filters.deity && filters.deity !== 'all' && temple.deity !== filters.deity) {
        return false;
      }

      // City filter
      if (filters.city && filters.city !== 'all' && temple.city !== filters.city) {
        return false;
      }

      // State filter
      if (filters.state && filters.state !== 'all' && temple.state !== filters.state) {
        return false;
      }

      return true;
    });
  }, [temples, filters]);

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
      <div className="text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            {t('discoverTemples')}
          </span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {t('exploreTemples')}
        </h2>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch
        filters={filters}
        onFiltersChange={setFilters}
        availableDeities={availableDeities}
        availableCities={availableCities}
        availableStates={availableStates}
      />

      {/* Results Count */}
      {!loading && filteredTemples.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>
            {t('showingResults')} <strong className="text-foreground">{filteredTemples.length}</strong> {t('sacredTemplesCount')}
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
