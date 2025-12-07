import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import ShareButton from '@/components/ShareButton';

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category?: 'festival' | 'daily_darshan' | 'architecture' | 'event';
  date?: string;
}

interface TempleGalleryProps {
  images: GalleryImage[];
  templeName: string;
  templeId: string;
}

const TempleGallery: React.FC<TempleGalleryProps> = ({ images, templeName, templeId }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border bg-accent/50">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <Images className="h-5 w-5 text-primary" />
            Gallery
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 6).map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.caption || `${templeName} photo`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                {index === 5 && images.length > 6 && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="text-background font-bold text-lg">+{images.length - 6}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur">
          <DialogClose className="absolute right-4 top-4 z-10">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-background/80">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>

          {selectedImage && (
            <div className="relative">
              <div className="flex items-center justify-center min-h-[60vh] p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption || `${templeName} photo`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>

              {/* Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Caption & Share */}
              <div className="p-4 space-y-3">
                {selectedImage.caption && (
                  <p className="text-center text-foreground">{selectedImage.caption}</p>
                )}
                <div className="flex justify-center gap-2">
                  <ShareButton
                    title={`${templeName} - Photo`}
                    text={selectedImage.caption || `Beautiful photo from ${templeName} 🙏`}
                    url={`${window.location.origin}/temple/${templeId}`}
                    variant="outline"
                    size="sm"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {selectedIndex !== null && `${selectedIndex + 1} of ${images.length}`}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TempleGallery;
