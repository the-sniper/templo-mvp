import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Plus, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAncestral, SuggestedTemple } from '@/context/AncestralContext';
import Header from '@/components/Header';
import FamilyConfirmationModal from '@/components/FamilyConfirmationModal';
import { trackEvent } from '@/utils/analytics';

// Confidence scoring based on matching criteria
const getConfidenceLevel = (temple: SuggestedTemple, formData: any): { level: 'high' | 'medium' | 'low', reason: string } => {
  let score = 0;
  const reasons: string[] = [];
  
  // Check district match
  if (formData.district && temple.location.toLowerCase().includes(formData.district.toLowerCase())) {
    score += 2;
    reasons.push('district');
  }
  
  // Check state match
  if (formData.state && temple.location.toLowerCase().includes(formData.state.toLowerCase())) {
    score += 1;
    reasons.push('state');
  }
  
  // Check deity match (simulated - in real app would check temple.deity)
  if (formData.deityName) {
    score += 1;
    reasons.push('deity');
  }
  
  // Random boost for demo (remove in production)
  score += Math.floor(Math.random() * 2);
  
  if (score >= 3) {
    return { level: 'high', reason: `Matches ${reasons.join(' + ')}` };
  } else if (score >= 2) {
    return { level: 'medium', reason: `Matches ${reasons.join(' + ')}` };
  } else {
    return { level: 'low', reason: 'Nearby location' };
  }
};

const confidenceBadgeStyles = {
  high: 'bg-green-500/10 text-green-700 border-green-500/20',
  medium: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  low: 'bg-muted text-muted-foreground border-border',
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

  // Filter and sort temples by confidence
  const processedTemples = suggestedTemples
    .map(temple => ({
      ...temple,
      confidence: getConfidenceLevel(temple, formData),
    }))
    .filter(temple =>
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.confidence.level] - order[b.confidence.level];
    })
    .slice(0, 5); // Show top 5 matches

  const handleSelectTemple = (temple: SuggestedTemple & { confidence: { level: string; reason: string } }) => {
    trackEvent('ancestral_save_temple', {
      templeId: temple.id,
      templeName: temple.name,
      confidence: temple.confidence.level,
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
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
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
              Based on {formData.nativeVillage}, {formData.district}
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

          {/* Temple List with Confidence Scores */}
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
                      className="h-32 w-28 object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-base font-bold text-foreground leading-tight mb-1">
                          {temple.name}
                        </h3>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          {temple.location}
                        </p>
                        
                        {/* Confidence Badge */}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${confidenceBadgeStyles[temple.confidence.level]}`}
                        >
                          {temple.confidence.level === 'high' && '🎯 '}
                          {temple.confidence.level.toUpperCase()} MATCH
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {temple.confidence.reason}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => handleSelectTemple(temple)}
                        size="sm"
                        className="mt-3 rounded-full gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Save as My Temple
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

      {/* Family Confirmation Modal */}
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
