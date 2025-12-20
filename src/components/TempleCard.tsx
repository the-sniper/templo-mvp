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
    <Card className="group relative overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
      {/* Image Section - Fixed Height */}
      <Link to={`/temple/${temple.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Deity Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-card/90 text-foreground backdrop-blur-sm border-0 px-3 py-1.5 text-sm font-medium shadow-lg">
              {temple.deity}
            </Badge>
          </div>
          
          {/* Follow Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-4 top-4 h-10 w-10 rounded-full bg-card/90 shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:scale-110",
              following && "text-primary bg-primary/10"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFollowTemple(temple.id);
            }}
          >
            <Heart className={cn("h-5 w-5 transition-all", following && "fill-primary text-primary scale-110")} />
          </Button>
        </div>
      </Link>
      
      {/* Content Section - Flex grow to fill remaining space */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/temple/${temple.id}`} className="block group/link">
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground transition-colors group-hover/link:text-primary line-clamp-1">
            {temple.name}
          </h3>
        </Link>
        
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-sm line-clamp-1">{temple.location}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed flex-grow">
          {temple.description}
        </p>
        
        {/* CTA Button - Always at bottom */}
        <Link to={`/temple/${temple.id}`} className="mt-auto">
          <Button 
            variant="outline" 
            className="w-full rounded-xl border-2 py-5 text-sm font-medium transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Temple
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TempleCard;