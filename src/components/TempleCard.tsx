import { Link } from 'react-router-dom';
import { MapPin, Heart, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTemple } from '@/context/TempleContext';
import { Temple } from '@/data/temples';
import { cn } from '@/lib/utils';

interface TempleCardProps {
  temple: Temple;
  variant?: 'default' | 'compact' | 'horizontal';
  showActions?: boolean;
}

const TempleCard = ({ temple, variant = 'default', showActions = true }: TempleCardProps) => {
  const { toggleFollowTemple, isFollowing } = useTemple();
  const following = isFollowing(temple.id);

  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/temple/${temple.id}`}
        className="group flex gap-4 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {temple.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{temple.location}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {temple.deity}
          </Badge>
        </div>
        {showActions && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full flex-shrink-0 self-center",
              following && "text-primary"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFollowTemple(temple.id);
            }}
          >
            <Heart className={cn("h-4 w-4", following && "fill-primary text-primary")} />
          </Button>
        )}
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link 
        to={`/temple/${temple.id}`}
        className="group block overflow-hidden rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          
          {showActions && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background",
                following && "text-primary"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFollowTemple(temple.id);
              }}
            >
              <Heart className={cn("h-4 w-4", following && "fill-primary text-primary")} />
            </Button>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-semibold text-background text-sm mb-1 line-clamp-1">
              {temple.name}
            </h3>
            <div className="flex items-center gap-1 text-background/80 text-xs">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{temple.city}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant - full featured card
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
      {/* Image Section */}
      <Link to={`/temple/${temple.id}`} className="block flex-shrink-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Follow Button - top right */}
          {showActions && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-md shadow-sm hover:bg-background hover:scale-110 transition-all",
                following && "text-primary bg-primary/10"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFollowTemple(temple.id);
              }}
            >
              <Heart className={cn("h-4 w-4 transition-all", following && "fill-primary text-primary scale-110")} />
            </Button>
          )}
          
          {/* Deity badge - bottom left */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-background/90 text-foreground backdrop-blur-md border-0 px-2.5 py-1 text-xs font-medium shadow-sm">
              <Flame className="w-3 h-3 mr-1.5 text-primary" />
              {temple.deity}
            </Badge>
          </div>
        </div>
      </Link>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/temple/${temple.id}`} className="block mb-2">
          <h3 className="font-serif text-lg font-bold text-foreground transition-colors hover:text-primary line-clamp-1">
            {temple.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-sm line-clamp-1">{temple.location}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
          {temple.description}
        </p>
        
        {/* CTA Button */}
        <Link to={`/temple/${temple.id}`} className="mt-4">
          <Button 
            className="w-full rounded-full font-medium transition-all"
          >
            Visit Temple
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TempleCard;
