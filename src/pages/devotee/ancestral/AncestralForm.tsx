import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';
import { trackEvent } from '@/utils/analytics';

// Tamil Nadu districts for focused MVP
const tamilNaduDistricts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
  'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur',
  'Ranipet', 'Sivaganga', 'Karur', 'Namakkal', 'Cuddalore', 'Kanchipuram',
  'Tiruvallur', 'Tiruvannamalai', 'Villupuram', 'Nagapattinam', 'Pudukkottai',
  'Virudhunagar', 'Ramanathapuram', 'Theni', 'Krishnagiri', 'Dharmapuri',
  'Perambalur', 'Ariyalur', 'Nilgiris', 'Kanniyakumari', 'Kallakurichi',
  'Chengalpattu', 'Tirupattur', 'Tenkasi', 'Mayiladuthurai'
].sort();

const indianStates = [
  'Tamil Nadu', 'Andhra Pradesh', 'Karnataka', 'Kerala', 'Telangana',
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Bihar',
  'West Bengal', 'Odisha', 'Madhya Pradesh', 'Punjab', 'Haryana',
  'Other'
];

const primaryDeities = [
  { value: 'murugan', label: 'Lord Murugan (முருகன்)' },
  { value: 'amman', label: 'Amman / Mariamman (அம்மன்)' },
  { value: 'shiva', label: 'Lord Shiva (சிவன்)' },
  { value: 'vishnu', label: 'Lord Vishnu / Perumal (விஷ்ணு)' },
  { value: 'ganesha', label: 'Lord Ganesha (விநாயகர்)' },
  { value: 'hanuman', label: 'Lord Hanuman (அனுமன்)' },
  { value: 'other', label: 'Other' },
];

const AncestralForm = () => {
  const navigate = useNavigate();
  const { setFormData, saveSearchAttempt } = useAncestral();
  
  // Simplified form state for MVP
  const [nativeVillage, setNativeVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Tamil Nadu'); // Default to Tamil Nadu
  const [familySurname, setFamilySurname] = useState('');
  const [primaryDeity, setPrimaryDeity] = useState('');
  const [nearbyLandmark, setNearbyLandmark] = useState('');
  
  const [optionalOpen, setOptionalOpen] = useState(false);

  useEffect(() => {
    trackEvent('page_view', { page: 'ancestral_form' });
  }, []);

  const canSubmit = nativeVillage.trim() && district.trim() && state;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      nativeVillage: nativeVillage.trim(),
      district: district.trim(),
      state,
      familySurname: familySurname.trim(),
      deityName: primaryDeity,
      nearbyLandmarks: nearbyLandmark.trim(),
      // Reset other fields
      gotra: '',
      caste: '',
      motherTongue: '',
      knownTempleName: '',
      familyMemberWhoKnows: '',
      approximateTempleAge: '',
      festivalsCelebrated: [],
      additionalNotes: '',
      notSure: false,
      consentToStore: true,
      photoFile: null,
    };
    
    setFormData(formData);
    
    // Save search attempt
    saveSearchAttempt({
      id: `search-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formData,
      selectedTemple: null,
      wasManuallyAdded: false,
    });
    
    trackEvent('ancestral_show_matches', {
      state,
      district,
      hasDeity: !!primaryDeity,
      hasSurname: !!familySurname,
    });
    
    navigate('/ancestral/results');
  };

  const handleSkipOptional = () => {
    // Just submit without optional fields
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <Link to="/ancestral" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Form */}
      <main className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-foreground">
            Tell Us About Your Roots
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Takes 30 seconds. You can improve matching later.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Fields */}
            <div className="p-4 rounded-xl bg-card border border-border/50 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📍</span>
                <h2 className="font-medium text-foreground">Location</h2>
                <Badge variant="outline" className="text-xs ml-auto">Required</Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nativeVillage">Native Village / Town *</Label>
                <Input
                  id="nativeVillage"
                  placeholder="e.g., Thiruvaiyaru, Kumbakonam"
                  value={nativeVillage}
                  onChange={(e) => setNativeVillage(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                {state === 'Tamil Nadu' ? (
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {tamilNaduDistricts.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="h-12"
                  />
                )}
              </div>
            </div>

            {/* Optional Fields - Collapsed */}
            <Collapsible open={optionalOpen} onOpenChange={setOptionalOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <h2 className="font-medium text-foreground">Optional Details</h2>
                    <Badge variant="secondary" className="text-xs">Better matches</Badge>
                  </div>
                  {optionalOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4 bg-card">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      These help find more accurate matches
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="familySurname">Family Surname</Label>
                      <Input
                        id="familySurname"
                        placeholder="e.g., Iyer, Pillai, Nadar"
                        value={familySurname}
                        onChange={(e) => setFamilySurname(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryDeity">Primary Deity</Label>
                      <Select value={primaryDeity} onValueChange={setPrimaryDeity}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select deity" />
                        </SelectTrigger>
                        <SelectContent>
                          {primaryDeities.map((deity) => (
                            <SelectItem key={deity.value} value={deity.value}>
                              {deity.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nearbyLandmark">Nearby Landmark</Label>
                      <Input
                        id="nearbyLandmark"
                        placeholder="e.g., Near Kaveri River, Railway Station"
                        value={nearbyLandmark}
                        onChange={(e) => setNearbyLandmark(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Submit Buttons */}
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg rounded-full gap-2"
                disabled={!canSubmit}
              >
                Show Matches
              </Button>
              
              {!optionalOpen && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => setOptionalOpen(true)}
                >
                  Add optional details for better matches
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AncestralForm;
