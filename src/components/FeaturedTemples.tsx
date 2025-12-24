import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import TempleCard from './TempleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const FeaturedTemples = () => {
  const { temples, loading, error } = useTemple();
  const { t } = useLanguage();

  // Show first 6 temples as featured
  const featuredTemples = useMemo(() => {
    return temples.slice(0, 6);
  }, [temples]);

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* View All Link */}
      <div className="flex justify-center">
        <Link to="/temples">
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            View All Temples
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {featuredTemples.map((temple, index) => (
                <CarouselItem key={temple.id} className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <div 
                    className="animate-fade-in h-[320px]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TempleCard temple={temple} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-5 h-8 w-8" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-5 h-8 w-8" />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default FeaturedTemples;