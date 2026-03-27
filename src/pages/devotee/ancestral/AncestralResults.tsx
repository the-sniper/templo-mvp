import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Plus, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useAncestral, SuggestedTemple } from '@/context/AncestralContext';
import Header from '@/components/Header';
import FamilyConfirmationModal from '@/components/FamilyConfirmationModal';
import { trackEvent } from '@/utils/analytics';

const getMatchColor = (pct: number) => {
  if (pct >= 80) return 'text-green-600';
  if (pct >= 50) return 'text-amber-600';
  return 'text-muted-foreground';
};

const getProgressColor = (pct: number) => {
  if (pct >= 80) return '[&>div]:bg-green-500';
  if (pct >= 50) return '[&>div]:bg-amber-500';
  return '';
};

const AncestralResults = () => {
  const navigate = useNavigate();
  const { suggestedTemples, setSelectedTemple, formData, saveAncestralTemple } = useAncestral();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTemple, setPendingTemple] = useState<SuggestedTemple | null>(null);

  useEffect(() => {
    trackEvent('page_view', { page: 'ancestral_results' });
  }, []);

  const processedTemples = suggestedTemples
    .filter(temple =>
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const handleSelectTemple = (temple: SuggestedTemple) => {
    trackEvent('ancestral_save_temple', {
      templeId: temple.id,
      templeName: temple.name,
      matchPercentage: temple.matchPercentage,
    });
    setPendingTemple(temple);
    setShowConfirmModal(true);
  };

  const handleConfirmTemple = () => {
    if (pendingTemple) {
      const templeData = {
        id: pendingTemple.id,
        name: pendingTemple.name,
        location: pendingTemple.location,
        image: pendingTemple.image,
        isCustom: false,
      };
      setSelectedTemple(templeData);
      saveAncestralTemple(templeData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <Link to="/ancestral/start" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Edit Details
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-foreground">
              Possible Ancestral Temples
            </h1>
            <p className="text-sm text-muted-foreground">
              Based on {formData.nativeVillage || 'your details'}, {formData.district || 'your district'}
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search temples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Temple List */}
          <div className="space-y-4 mb-6">
            {processedTemples.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No temples found matching your search.</p>
              </div>
            ) : (
              processedTemples.map((temple) => (
                <div
                  key={temple.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all"
                >
                  <div className="flex">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="h-36 w-28 object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-base font-bold text-foreground leading-tight mb-1">
                          {temple.name}
                        </h3>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3" />
                          {temple.location}
                        </p>

                        {/* Match Percentage */}
                        <div className="mb-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Match</span>
                            <span className={`text-sm font-bold ${getMatchColor(temple.matchPercentage)}`}>
                              {temple.matchPercentage}%
                            </span>
                          </div>
                          <Progress value={temple.matchPercentage} className={`h-1.5 ${getProgressColor(temple.matchPercentage)}`} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {temple.matchReason}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleSelectTemple(temple)}
                        size="sm"
                        className="mt-3 rounded-full gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        This is My Temple
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Didn't Find CTA */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 text-center">
            <h3 className="font-medium text-foreground mb-2">
              Didn't find your temple?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add more details or manually add your ancestral temple
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/ancestral/start">
                <Button variant="outline" size="sm" className="rounded-full w-full sm:w-auto">
                  Improve Details
                </Button>
              </Link>
              <Link to="/ancestral/add-temple">
                <Button size="sm" className="rounded-full gap-1 w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Temple
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {pendingTemple && (
        <FamilyConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          templeName={pendingTemple.name}
          templeLocation={pendingTemple.location}
          onConfirm={handleConfirmTemple}
        />
      )}
    </div>
  );
};

export default AncestralResults;
