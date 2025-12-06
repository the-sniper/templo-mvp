import { Link } from 'react-router-dom';
import { MapPin, Heart, Clock, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTemple } from '@/context/TempleContext';
import { Temple } from '@/data/temples';
import { cn } from '@/lib/utils';

interface TempleCardProps {
  temple: Temple;
}

const TempleCard = ({ temple }: TempleCardProps) => {
  const { toggleFollowTemple, isFollowing } = useTemple();
  const following = isFollowing(temple.id);

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={temple.image}
          alt={temple.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <Badge variant="secondary" className="bg-card/90 text-card-foreground backdrop-blur">
            {temple.deity}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-3 h-9 w-9 rounded-full bg-card/90 backdrop-blur transition-all hover:bg-card",
            following && "text-primary"
          )}
          onClick={(e) => {
            e.preventDefault();
            toggleFollowTemple(temple.id);
          }}
        >
          <Heart className={cn("h-5 w-5", following && "fill-current")} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/temple/${temple.id}`} className="block">
          <h3 className="mb-2 font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {temple.name}
          </h3>
        </Link>
        
        <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{temple.location}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {temple.description}
        </p>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {temple.poojaTimings.length} timings
            </span>
            <span className="flex items-center gap-1">
              <Bell className="h-3.5 w-3.5 text-primary" />
              {temple.announcements.length} updates
            </span>
          </div>
          
          <Link to={`/temple/${temple.id}`}>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-primary hover:bg-accent">
              View Details →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleCard;
