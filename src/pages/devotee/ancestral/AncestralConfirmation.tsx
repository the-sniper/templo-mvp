import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Home, Share2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';
import ShareButton from '@/components/ShareButton';

const AncestralConfirmation = () => {
  const { selectedTemple, saveAncestralTemple, resetFlow, searchAttempts } = useAncestral();

  useEffect(() => {
    if (selectedTemple) {
      saveAncestralTemple(selectedTemple);
    }
  }, [selectedTemple, saveAncestralTemple]);

  const handleDone = () => {
    resetFlow();
  };

  if (!selectedTemple) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No temple selected.</p>
            <Link to="/ancestral">
              <Button className="mt-4">Start Over</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>

          <h1 className="mb-4 font-serif text-2xl font-bold text-foreground">
            Your Ancestral Temple is Saved!
          </h1>

          <p className="mb-6 text-muted-foreground">
            You've successfully connected with your family's spiritual heritage.
          </p>

          {/* Temple Card */}
          <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={selectedTemple.image}
              alt={selectedTemple.name}
              className="h-48 w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div className="p-4 text-left">
              <h2 className="mb-1 font-serif text-lg font-bold text-foreground">
                {selectedTemple.name}
              </h2>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {selectedTemple.location}
              </p>
              {selectedTemple.primaryDeity && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Deity: {selectedTemple.primaryDeity}
                </p>
              )}
              {selectedTemple.description && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {selectedTemple.description}
                </p>
              )}
              {selectedTemple.isCustom && (
                <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                  Added by you
                </Badge>
              )}
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 text-left">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">
                  Thank you for contributing!
                </p>
                <p className="text-xs text-muted-foreground">
                  Your details help us build a smarter ancestral temple matching system 
                  for devotees across India. You've joined {searchAttempts.length + 127} others 
                  in preserving our spiritual heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Share CTA */}
          <div className="mb-6 p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground mb-3">
              Know family members who might want to find their ancestral temple?
            </p>
            <ShareButton
              title="Find Your Ancestral Temple"
              text="I just found my ancestral temple on Templo! You can find yours too 🙏"
              url={`${window.location.origin}/ancestral`}
              className="w-full"
              showLabel={true}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" onClick={handleDone}>
              <Button className="w-full gap-2 sm:w-auto rounded-full">
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </Link>
            <Link to="/ancestral" onClick={handleDone}>
              <Button variant="outline" className="w-full sm:w-auto rounded-full">
                Add Another Temple
              </Button>
            </Link>
          </div>

          {/* Decorative */}
          <div className="mt-12 flex justify-center gap-4 text-3xl opacity-30">
            <span>🕉️</span>
            <span>🪔</span>
            <span>🙏</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AncestralConfirmation;
