import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';
import { trackEvent } from '@/utils/analytics';

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

const motherTongueOptions = [
  'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Hindi', 'Marathi', 'Bengali', 'Gujarati', 'Other'
];

const templeAgeOptions = [
  { value: 'ancient', label: 'Very Old (100+ years)' },
  { value: 'old', label: 'Old (50-100 years)' },
  { value: 'modern', label: 'Relatively New (< 50 years)' },
  { value: 'unknown', label: 'Not Sure' },
];

const festivalOptions = [
  'Pongal', 'Diwali', 'Navaratri', 'Ganesh Chaturthi', 'Maha Shivaratri',
  'Rama Navami', 'Krishna Janmashtami', 'Onam', 'Ugadi', 'Sankranti',
  'Holi', 'Durga Puja', 'Karva Chauth', 'Chhath Puja',
];

const AncestralForm = () => {
  const navigate = useNavigate();
  const { setFormData, saveSearchAttempt } = useAncestral();

  // Required fields
  const [nativeVillage, setNativeVillage] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  // Optional - Family Details
  const [familySurname, setFamilySurname] = useState('');
  const [gotra, setGotra] = useState('');
  const [caste, setCaste] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [familyOpen, setFamilyOpen] = useState(false);

  // Optional - Temple Hints
  const [knownTempleName, setKnownTempleName] = useState('');
  const [deityName, setDeityName] = useState('');
  const [nearbyLandmarks, setNearbyLandmarks] = useState('');
  const [templeAge, setTempleAge] = useState('');
  const [templeOpen, setTempleOpen] = useState(false);

  // Optional - Additional
  const [selectedFestivals, setSelectedFestivals] = useState<string[]>([]);
  const [elderName, setElderName] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [additionalOpen, setAdditionalOpen] = useState(false);

  // Photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Meta
  const [notSure, setNotSure] = useState(false);
  const [consentToStore, setConsentToStore] = useState(true);

  useEffect(() => {
    trackEvent('page_view', { page: 'ancestral_form' });
  }, []);

  // Calculate profile completeness
  const completeness = useMemo(() => {
    let filled = 0;
    const total = 14;
    if (nativeVillage.trim()) filled++;
    if (state) filled++;
    if (district.trim()) filled++;
    if (familySurname.trim()) filled++;
    if (gotra.trim()) filled++;
    if (caste.trim()) filled++;
    if (motherTongue) filled++;
    if (knownTempleName.trim()) filled++;
    if (deityName.trim()) filled++;
    if (nearbyLandmarks.trim()) filled++;
    if (templeAge) filled++;
    if (selectedFestivals.length > 0) filled++;
    if (elderName.trim()) filled++;
    if (additionalNotes.trim()) filled++;
    return Math.round((filled / total) * 100);
  }, [nativeVillage, state, district, familySurname, gotra, caste, motherTongue, knownTempleName, deityName, nearbyLandmarks, templeAge, selectedFestivals, elderName, additionalNotes]);

  const canSubmit = nativeVillage.trim() && district.trim() && state && consentToStore;

  const toggleFestival = (festival: string) => {
    setSelectedFestivals(prev =>
      prev.includes(festival) ? prev.filter(f => f !== festival) : [...prev, festival]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      nativeVillage: nativeVillage.trim(),
      district: district.trim(),
      state,
      familySurname: familySurname.trim(),
      gotra: gotra.trim(),
      caste: caste.trim(),
      motherTongue,
      knownTempleName: knownTempleName.trim(),
      deityName: deityName.trim(),
      nearbyLandmarks: nearbyLandmarks.trim(),
      familyMemberWhoKnows: elderName.trim(),
      approximateTempleAge: templeAge,
      festivalsCelebrated: selectedFestivals,
      additionalNotes: additionalNotes.trim(),
      photoFile,
      notSure,
      consentToStore,
    };

    setFormData(formData);

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
      hasDeity: !!deityName,
      hasSurname: !!familySurname,
    });

    navigate('/ancestral/searching');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <Link to="/ancestral" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Ancestral Temple
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-foreground">
            Tell Us About Your Roots
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Share details about your native place. The more you share, the better we can help.
          </p>

          {/* Profile Completeness */}
          <div className="mb-6 p-4 rounded-xl bg-card border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Profile Completeness</span>
              <span className="text-sm font-bold text-primary">{completeness}%</span>
            </div>
            <Progress value={completeness} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">More details help build better matching for future devotees</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required: Basic Location */}
            <div className="p-4 rounded-xl bg-card border border-border/50 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📍</span>
                <h2 className="font-medium text-foreground">Basic Location</h2>
                <Badge variant="outline" className="text-xs ml-auto">Required</Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nativeVillage">Native Village / Town *</Label>
                <Input
                  id="nativeVillage"
                  placeholder="Enter your native village or town"
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
                    <SelectValue placeholder="Select your state" />
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

            {/* Optional: Family Details */}
            <Collapsible open={familyOpen} onOpenChange={setFamilyOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                    <h2 className="font-medium text-foreground">Family Details</h2>
                    <Badge variant="destructive" className="text-xs">Optional</Badge>
                  </div>
                  {familyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-2 space-y-4 bg-card">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      This helps identify regional temple traditions
                    </p>
                    <div className="space-y-2">
                      <Label>Family Surname</Label>
                      <Input placeholder="Enter your family surname" value={familySurname} onChange={(e) => setFamilySurname(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gotra</Label>
                      <Input placeholder="e.g., Bharadwaja, Kashyapa, Vasishtha" value={gotra} onChange={(e) => setGotra(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Caste / Community</Label>
                      <Input placeholder="Enter your caste or community" value={caste} onChange={(e) => setCaste(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mother Tongue</Label>
                      <Select value={motherTongue} onValueChange={setMotherTongue}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your mother tongue" />
                        </SelectTrigger>
                        <SelectContent>
                          {motherTongueOptions.map((lang) => (
                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Optional: Temple Hints */}
            <Collapsible open={templeOpen} onOpenChange={setTempleOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🛕</span>
                    <h2 className="font-medium text-foreground">Temple Hints</h2>
                    <Badge variant="destructive" className="text-xs">Optional</Badge>
                  </div>
                  {templeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-2 space-y-4 bg-card">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Any information about the temple helps
                    </p>
                    <div className="space-y-2">
                      <Label>Known Temple Name</Label>
                      <Input placeholder="If you know the temple name" value={knownTempleName} onChange={(e) => setKnownTempleName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Deity Worshipped</Label>
                      <Input placeholder="e.g., Lord Shiva, Goddess Mariamman" value={deityName} onChange={(e) => setDeityName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Nearby Landmarks</Label>
                      <Input placeholder="e.g., Near Kaveri River, Near XYZ Hill" value={nearbyLandmarks} onChange={(e) => setNearbyLandmarks(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Approximate Temple Age</Label>
                      <Select value={templeAge} onValueChange={setTempleAge}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="How old is the temple?" />
                        </SelectTrigger>
                        <SelectContent>
                          {templeAgeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Optional: Additional Information */}
            <Collapsible open={additionalOpen} onOpenChange={setAdditionalOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <h2 className="font-medium text-foreground">Additional Information</h2>
                    <Badge variant="destructive" className="text-xs">Optional</Badge>
                  </div>
                  {additionalOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-2 space-y-4 bg-card">
                    <div className="space-y-2">
                      <Label>Festivals Your Family Celebrates at This Temple</Label>
                      <div className="flex flex-wrap gap-2">
                        {festivalOptions.map((festival) => (
                          <Badge
                            key={festival}
                            variant={selectedFestivals.includes(festival) ? 'default' : 'outline'}
                            className="cursor-pointer px-3 py-1.5 rounded-full transition-colors"
                            onClick={() => toggleFestival(festival)}
                          >
                            {festival}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Elder Who Might Know More</Label>
                      <Input placeholder="Name of elder family member (optional)" value={elderName} onChange={(e) => setElderName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Any Other Details</Label>
                      <Textarea placeholder="Anything else you remember about the temple..." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} rows={3} />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Photo Upload */}
            <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
              <Label className="font-medium">Photo (Optional)</Label>
              <p className="text-xs text-muted-foreground">Upload a photo of any old temple document, family record, or temple photo</p>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setPhotoFile(e.target.files[0])} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  {photoFile ? photoFile.name : 'Click to upload'}
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="notSure" checked={notSure} onCheckedChange={(checked) => setNotSure(checked as boolean)} className="mt-0.5" />
                <Label htmlFor="notSure" className="text-sm text-muted-foreground cursor-pointer">
                  I'm not sure about my ancestral temple
                </Label>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Checkbox id="consent" checked={consentToStore} onCheckedChange={(checked) => setConsentToStore(checked as boolean)} className="mt-0.5" />
                <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                  I consent to my data being stored and used to improve ancestral temple matching for all devotees
                </Label>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 text-lg rounded-full"
              disabled={!canSubmit}
            >
              Continue
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AncestralForm;
