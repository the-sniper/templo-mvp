import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';

const AncestralConfirmation = () => {
  const { selectedTemple, saveAncestralTemple, resetFlow } = useAncestral();

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

          <p className="mb-8 text-muted-foreground">
            You've successfully connected with your family's spiritual heritage.
          </p>

          {/* Temple Card */}
          <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={selectedTemple.image}
              alt={selectedTemple.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-left">
              <h2 className="mb-1 font-serif text-lg font-bold text-foreground">
                {selectedTemple.name}
              </h2>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {selectedTemple.location}
              </p>
              {selectedTemple.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedTemple.description}
                </p>
              )}
              {selectedTemple.isCustom && (
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  Added by you
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" onClick={handleDone}>
              <Button className="w-full gap-2 sm:w-auto">
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </Link>
            <Link to="/ancestral" onClick={handleDone}>
              <Button variant="outline" className="w-full sm:w-auto">
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
