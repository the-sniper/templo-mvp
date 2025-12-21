import { MapPin, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QuickFiltersProps {
  onLocationRequest?: () => void;
}

const QuickFilters = ({ onLocationRequest }: QuickFiltersProps) => {
  const navigate = useNavigate();

  const filters = [
    { label: '🕉 Shiva', query: 'Shiva' },
    { label: '🙏 Murugan', query: 'Murugan' },
    { label: '📍 Tamil Nadu', query: 'Tamil Nadu' },
  ];

  const handleFilter = (query: string) => {
    navigate(`/temples?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.query}
          variant="outline"
          size="sm"
          onClick={() => handleFilter(filter.query)}
          className="rounded-full px-4 text-sm border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
        >
          {filter.label}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onLocationRequest}
        className="rounded-full px-4 text-sm border-primary/30 bg-primary/5 hover:bg-primary/15 text-primary transition-all"
      >
        <Locate className="h-3.5 w-3.5 mr-1.5" />
        Temples Near Me
      </Button>
    </div>
  );
};

export default QuickFilters;
