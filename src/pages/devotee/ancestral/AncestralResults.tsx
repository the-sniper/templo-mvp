import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAncestral, SuggestedTemple } from '@/context/AncestralContext';
import Header from '@/components/Header';

const AncestralResults = () => {
  const navigate = useNavigate();
  const { suggestedTemples, setSelectedTemple, formData } = useAncestral();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter temples by user's state if available
  const templesInState = formData.state 
    ? suggestedTemples.filter(t => t.location.toLowerCase().includes(formData.state.toLowerCase()))
    : suggestedTemples;

  const filteredTemples = (templesInState.length > 0 ? templesInState : suggestedTemples).filter((temple) =>
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
          {/* Always show "building database" message in Phase I */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <span className="text-4xl">🏗️</span>
            </div>
            
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Phase I - Building Database
            </Badge>
            
            <h1 className="mb-4 font-serif text-xl sm:text-2xl font-bold text-foreground">
              We're Still Building Our Ancestral Temple Database
            </h1>
            
            <p className="mb-6 text-muted-foreground">
              Thank you for sharing your details! We're collecting information from devotees 
              like you to build an AI-powered matching system. In the meantime, you can 
              browse temples below or add your own.
            </p>

            {/* Contribution Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 text-sm">
              <span className="text-primary">✓</span>
              <span className="text-muted-foreground">Your details have been recorded</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 rounded-xl bg-card border border-primary/20 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">How this helps:</p>
              <p>Every submission trains our AI to better match families with their ancestral temples. 
              You're helping build something that will benefit devotees across India!</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search temples${formData.state ? ` in ${formData.state}` : ''}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {formData.state && (
              <p className="mt-2 text-xs text-muted-foreground">
                Showing temples near {formData.state}. Search to find more.
              </p>
            )}
          </div>

          {/* Temple List */}
          <div className="mb-6 space-y-3">
            {filteredTemples.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No temples found matching your search.</p>
                <Link to="/ancestral/add-temple">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your Ancestral Temple
                  </Button>
                </Link>
              </div>
            ) : (
              filteredTemples.map((temple) => (
                <div
                  key={temple.id}
                  className="overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="h-32 w-full object-cover sm:h-auto sm:w-32"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="mb-1 font-serif text-lg font-bold text-foreground">
                          {temple.name}
                        </h3>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {temple.location}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleSelectTemple(temple)}
                        variant="outline"
                        className="mt-3 w-full sm:w-auto"
                      >
                        Select as Ancestral Temple
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Custom Temple CTA */}
          <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 text-center">
            <h3 className="font-medium text-foreground mb-2">
              Can't find your ancestral temple?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help us grow the database by adding it yourself!
            </p>
            <Link to="/ancestral/add-temple">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your Ancestral Temple
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AncestralResults;
