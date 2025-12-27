import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    <Card className="group relative overflow-hidden rounded-2xl border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-full flex flex-col">
      {/* Image Section */}
      <Link to={`/temple/${temple.id}`} className="block flex-shrink-0">
        <div className="relative h-44 sm:h-48 overflow-hidden">
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
          
          {/* Deity Badge */}
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-card/90 text-foreground backdrop-blur-sm border-0 px-2 py-0.5 text-xs font-medium">
              {temple.deity}
            </Badge>
          </div>
          
          {/* Follow Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-2 top-2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card",
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
        </div>
      </Link>
      
      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <Link to={`/temple/${temple.id}`} className="block">
          <h3 className="mb-1 font-serif text-base font-bold text-foreground transition-colors hover:text-primary line-clamp-1">
            {temple.name}
          </h3>
        </Link>
        
        <div className="mb-2 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
          <span className="text-xs line-clamp-1">{temple.location}</span>
        </div>

        <p className="mb-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed flex-grow">
          {temple.description}
        </p>
        
        {/* CTA Button */}
        <Link to={`/temple/${temple.id}`} className="mt-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full rounded-lg text-xs font-medium transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Temple
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TempleCard;