import { useState } from 'react';
import { Search, MapPin, Sparkles, Filter, X, ChevronDown, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/context/LanguageContext';

export interface SearchFilters {
  query: string;
  deity: string;
  city: string;
  state: string;
}

interface AdvancedSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableDeities: string[];
  availableCities: string[];
  availableStates: string[];
  onNearbyClick?: () => void;
  isLoadingLocation?: boolean;
}

const AdvancedSearch = ({
  filters,
  onFiltersChange,
  availableDeities,
  availableCities,
  availableStates,
  onNearbyClick,
  isLoadingLocation,
}: AdvancedSearchProps) => {
  const { t } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = [filters.deity, filters.city, filters.state].filter(f => f && f !== 'all').length;

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({ query: '', deity: '', city: '', state: '' });
  };

  const clearFilter = (key: keyof SearchFilters) => {
    updateFilter(key, '');
  };

  return (
    <div className="space-y-3">
      {/* Combined Search Bar with Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-4 w-4 text-primary" />
          </div>
          <Input
            type="text"
            placeholder={t('searchTemples')}
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="h-12 rounded-xl border-2 border-border bg-card pl-13 pr-10 text-base transition-all focus:border-primary focus:shadow-md"
            style={{ paddingLeft: '3.25rem' }}
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg hover:bg-destructive/10 hover:text-destructive"
              onClick={() => updateFilter('query', '')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filter & Nearby Buttons */}
        <div className="flex gap-2">
          {/* Nearby Button */}
          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 rounded-xl border-2 px-4"
            onClick={onNearbyClick}
            disabled={isLoadingLocation}
          >
            <Navigation className={`h-4 w-4 ${isLoadingLocation ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{t('nearby')}</span>
          </Button>

          {/* Filters Popover */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 rounded-xl border-2 px-4"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">{t('filters')}</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="default" className="ml-1 h-5 min-w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 rounded-xl bg-card border-2 border-border shadow-xl" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{t('filters')}</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={clearAllFilters}
                    >
                      {t('clearAll')}
                    </Button>
                  )}
                </div>

                {/* Deity Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    {t('deity')}
                  </label>
                  <Select value={filters.deity || 'all'} onValueChange={(v) => updateFilter('deity', v)}>
                    <SelectTrigger className="rounded-lg h-11">
                      <SelectValue placeholder={t('allDeities')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">{t('allDeities')}</SelectItem>
                      {availableDeities.map((deity) => (
                        <SelectItem key={deity} value={deity}>
                          {deity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {t('city')}
                  </label>
                  <Select value={filters.city || 'all'} onValueChange={(v) => updateFilter('city', v)}>
                    <SelectTrigger className="rounded-lg h-11">
                      <SelectValue placeholder={t('allCities')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">{t('allCities')}</SelectItem>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {t('state')}
                  </label>
                  <Select value={filters.state || 'all'} onValueChange={(v) => updateFilter('state', v)}>
                    <SelectTrigger className="rounded-lg h-11">
                      <SelectValue placeholder={t('allStates')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">{t('allStates')}</SelectItem>
                      {availableStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.deity && filters.deity !== 'all' && (
            <Badge variant="secondary" className="gap-1 rounded-full py-1.5 pl-3 pr-1.5 text-sm">
              <Sparkles className="h-3 w-3" />
              {filters.deity}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full hover:bg-destructive/20 ml-1"
                onClick={() => clearFilter('deity')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.city && filters.city !== 'all' && (
            <Badge variant="secondary" className="gap-1 rounded-full py-1.5 pl-3 pr-1.5 text-sm">
              <MapPin className="h-3 w-3" />
              {filters.city}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full hover:bg-destructive/20 ml-1"
                onClick={() => clearFilter('city')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.state && filters.state !== 'all' && (
            <Badge variant="secondary" className="gap-1 rounded-full py-1.5 pl-3 pr-1.5 text-sm">
              <MapPin className="h-3 w-3" />
              {filters.state}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full hover:bg-destructive/20 ml-1"
                onClick={() => clearFilter('state')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
