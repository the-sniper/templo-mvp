import { useState, useEffect } from 'react';
import { MapPin, Locate, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { temples } from '@/data/temples';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TemplesNearYouProps {
  locationGranted: boolean;
  onRequestLocation: () => void;
}

const TemplesNearYou = ({ locationGranted, onRequestLocation }: TemplesNearYouProps) => {
  // Mock nearby temples (in real app, would filter based on geolocation)
  const nearbyTemples = temples.slice(0, 5);

  if (!locationGranted) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 text-center overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/10" />
              
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Navigation className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Discover Temples Near You
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Enable location to find sacred spaces close to you. Whether at home or traveling, your temple is never far.
                </p>
                
                <Button 
                  onClick={onRequestLocation}
                  className="rounded-full px-8"
                >
                  <Locate className="h-4 w-4 mr-2" />
                  Enable Location
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">Based on Your Location</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Temples Near You
            </h2>
            <p className="text-muted-foreground mt-2">
              Sacred spaces close to you, waiting for your visit
            </p>
          </div>

          {/* Carousel */}
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {nearbyTemples.map((temple) => (
                <CarouselItem key={temple.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link to={`/temples/${temple.id}`}>
                    <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all h-[280px]">
                      <img 
                        src={temple.image}
                        alt={temple.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                      
                      {/* Distance Badge */}
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>2.5 km</span>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-serif font-bold text-primary-foreground text-lg mb-1 line-clamp-1">
                          {temple.name}
                        </h3>
                        <p className="text-primary-foreground/80 text-sm flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {temple.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TemplesNearYou;
