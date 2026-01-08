import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAncestral, SuggestedTemple } from '@/context/AncestralContext';
import Header from '@/components/Header';

const AncestralResults = () => {
  const navigate = useNavigate();
  const { suggestedTemples, setSelectedTemple, formData } = useAncestral();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate no results for certain conditions
  const showNoResults = formData.notSure && !formData.knownTempleName;

  const filteredTemples = suggestedTemples.filter((temple) =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTemple = (temple: SuggestedTemple) => {
    setSelectedTemple({
      id: temple.id,
      name: temple.name,
      location: temple.location,
      image: temple.image,
      isCustom: false,
    });
    navigate('/ancestral/confirmation');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/ancestral/form" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-2xl">
          {showNoResults ? (
            /* No Results State */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <span className="text-4xl">🔍</span>
              </div>
              <h1 className="mb-4 font-serif text-2xl font-bold text-foreground">
                We Couldn't Find Your Ancestral Temple
              </h1>
              <p className="mb-8 text-muted-foreground">
                Don't worry! You can browse temples manually or add your own ancestral temple.
              </p>

              {/* Search */}
              <div className="mb-6 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search temples..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Temple List */}
              <div className="mb-6 space-y-3">
                {filteredTemples.map((temple) => (
                  <button
                    key={temple.id}
                    onClick={() => handleSelectTemple(temple)}
                    className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
                  >
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{temple.name}</h3>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {temple.location}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <Link to="/ancestral/add-temple">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your Ancestral Temple
                </Button>
              </Link>
            </div>
          ) : (
            /* Results Found State */
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl">✨</span>
                </div>
                <h1 className="mb-2 font-serif text-2xl font-bold text-foreground">
                  We Found Some Matches!
                </h1>
                <p className="text-muted-foreground">
                  Based on your details, these temples might be your ancestral temple.
                </p>
              </div>

              {/* Search */}
              <div className="mb-6 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search in results..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Suggested Temples */}
              <div className="mb-6 space-y-4">
                {filteredTemples.map((temple) => (
                  <div
                    key={temple.id}
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <img
                        src={temple.image}
                        alt={temple.name}
                        className="h-40 w-full object-cover sm:h-auto sm:w-40"
                      />
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h3 className="mb-1 font-serif text-lg font-bold text-foreground">
                            {temple.name}
                          </h3>
                          <p className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {temple.location}
                          </p>
                          <p className="text-sm text-primary">{temple.distance}</p>
                        </div>
                        <Button
                          onClick={() => handleSelectTemple(temple)}
                          className="mt-4 w-full sm:w-auto"
                        >
                          This is My Ancestral Temple
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Can't Find Option */}
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="mb-4 text-muted-foreground">
                  Can't find your ancestral temple in the list?
                </p>
                <Link to="/ancestral/add-temple">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your Ancestral Temple
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AncestralResults;
