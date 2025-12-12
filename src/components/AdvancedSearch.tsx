import { useState } from 'react';
import { Search, MapPin, Sparkles, Filter, X, ChevronDown } from 'lucide-react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
}

const AdvancedSearch = ({
  filters,
  onFiltersChange,
  availableDeities,
  availableCities,
  availableStates,
}: AdvancedSearchProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = [filters.deity, filters.city, filters.state].filter(Boolean).length;

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
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/10">
          <Search className="h-5 w-5 text-primary" />
        </div>
        <Input
          type="text"
          placeholder={t('searchTemples')}
          value={filters.query}
          onChange={(e) => updateFilter('query', e.target.value)}
          className="h-14 rounded-2xl border-2 border-border bg-card pl-16 pr-14 text-lg shadow-sm transition-all focus:border-primary focus:shadow-lg focus:shadow-primary/10"
        />
        {filters.query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-xl hover:bg-destructive/10 hover:text-destructive"
            onClick={() => updateFilter('query', '')}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full border-2"
            >
              <Filter className="h-4 w-4" />
              {t('filters')}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="grid gap-4 rounded-2xl border-2 border-border bg-card/50 p-4 sm:grid-cols-3">
              {/* Deity Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  {t('deity')}
                </label>
                <Select value={filters.deity} onValueChange={(v) => updateFilter('deity', v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t('allDeities')} />
                  </SelectTrigger>
                  <SelectContent>
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
                <Select value={filters.city} onValueChange={(v) => updateFilter('city', v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t('allCities')} />
                  </SelectTrigger>
                  <SelectContent>
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
                <Select value={filters.state} onValueChange={(v) => updateFilter('state', v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t('allStates')} />
                  </SelectTrigger>
                  <SelectContent>
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
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filter Tags */}
        {filters.deity && filters.deity !== 'all' && (
          <Badge variant="secondary" className="gap-1 rounded-full py-1 pl-3 pr-1">
            <Sparkles className="h-3 w-3" />
            {filters.deity}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-destructive/20"
              onClick={() => clearFilter('deity')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {filters.city && filters.city !== 'all' && (
          <Badge variant="secondary" className="gap-1 rounded-full py-1 pl-3 pr-1">
            <MapPin className="h-3 w-3" />
            {filters.city}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-destructive/20"
              onClick={() => clearFilter('city')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {filters.state && filters.state !== 'all' && (
          <Badge variant="secondary" className="gap-1 rounded-full py-1 pl-3 pr-1">
            <MapPin className="h-3 w-3" />
            {filters.state}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-destructive/20"
              onClick={() => clearFilter('state')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={clearAllFilters}
          >
            <X className="h-4 w-4" />
            {t('clearAll')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
