import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const motherTongues = [
  'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Hindi', 'Marathi', 
  'Gujarati', 'Bengali', 'Punjabi', 'Odia', 'Assamese', 'Konkani',
  'Tulu', 'Other'
];

const templeAges = [
  { value: 'ancient', label: 'Ancient (500+ years)' },
  { value: 'old', label: 'Old (100-500 years)' },
  { value: 'recent', label: 'Recent (less than 100 years)' },
  { value: 'unknown', label: "Don't know" },
];

const commonFestivals = [
  'Pongal', 'Diwali', 'Navaratri', 'Ganesh Chaturthi', 'Maha Shivaratri',
  'Rama Navami', 'Krishna Janmashtami', 'Onam', 'Ugadi', 'Sankranti',
  'Holi', 'Durga Puja', 'Karva Chauth', 'Chhath Puja'
];

const AncestralForm = () => {
  const navigate = useNavigate();
  const { formData, setFormData, saveSearchAttempt } = useAncestral();
  
  const [localData, setLocalData] = useState({
    nativeVillage: formData.nativeVillage,
    district: formData.district,
    state: formData.state,
    familySurname: formData.familySurname,
    gotra: formData.gotra,
    caste: formData.caste,
    motherTongue: formData.motherTongue,
    knownTempleName: formData.knownTempleName,
    deityName: formData.deityName,
    nearbyLandmarks: formData.nearbyLandmarks,
    familyMemberWhoKnows: formData.familyMemberWhoKnows,
    approximateTempleAge: formData.approximateTempleAge,
    festivalsCelebrated: formData.festivalsCelebrated,
    additionalNotes: formData.additionalNotes,
    notSure: formData.notSure,
    consentToStore: formData.consentToStore,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(formData.photoFile);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [familyDetailsOpen, setFamilyDetailsOpen] = useState(false);
  const [templeHintsOpen, setTempleHintsOpen] = useState(false);
  const [additionalOpen, setAdditionalOpen] = useState(false);

  // Calculate completion percentage
  const calculateCompletion = () => {
    let filled = 0;
    let total = 15;
    
    if (localData.nativeVillage) filled++;
    if (localData.district) filled++;
    if (localData.state) filled++;
    if (localData.familySurname) filled++;
    if (localData.gotra) filled++;
    if (localData.caste) filled++;
    if (localData.motherTongue) filled++;
    if (localData.knownTempleName) filled++;
    if (localData.deityName) filled++;
    if (localData.nearbyLandmarks) filled++;
    if (localData.familyMemberWhoKnows) filled++;
    if (localData.approximateTempleAge) filled++;
    if (localData.festivalsCelebrated.length > 0) filled++;
    if (localData.additionalNotes) filled++;
    if (photoFile) filled++;
    
    return Math.round((filled / total) * 100);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const toggleFestival = (festival: string) => {
    if (localData.festivalsCelebrated.includes(festival)) {
      setLocalData({
        ...localData,
        festivalsCelebrated: localData.festivalsCelebrated.filter(f => f !== festival)
      });
    } else {
      setLocalData({
        ...localData,
        festivalsCelebrated: [...localData.festivalsCelebrated, festival]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullFormData = {
      ...localData,
      photoFile,
    };
    
    setFormData(fullFormData);
    
    // Save the search attempt for data collection
    saveSearchAttempt({
      id: `search-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formData: fullFormData,
      selectedTemple: null,
      wasManuallyAdded: false,
    });
    
    navigate('/ancestral/searching');
  };

  const completionPercent = calculateCompletion();

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

      {/* Form */}
      <main className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-foreground">
            Tell Us About Your Roots
          </h1>
          <p className="mb-4 text-sm sm:text-base text-muted-foreground">
            Share details about your native place. The more you share, the better we can help.
          </p>

          {/* Progress Indicator */}
          <div className="mb-6 p-3 rounded-xl bg-card border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Profile Completeness</span>
              <span className="text-sm text-primary font-semibold">{completionPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              More details help build better matching for future devotees
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Location (Required) */}
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <h2 className="font-medium text-foreground mb-4 flex items-center gap-2">
                📍 Basic Location
                <Badge variant="outline" className="text-xs">Required</Badge>
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nativeVillage">Native Village / Town *</Label>
                  <Input
                    id="nativeVillage"
                    placeholder="Enter your native village or town"
                    value={localData.nativeVillage}
                    onChange={(e) => setLocalData({ ...localData, nativeVillage: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={localData.state}
                    onValueChange={(value) => setLocalData({ ...localData, state: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    value={localData.district}
                    onChange={(e) => setLocalData({ ...localData, district: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Family Details (Optional - Collapsible) */}
            <Collapsible open={familyDetailsOpen} onOpenChange={setFamilyDetailsOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <h2 className="font-medium text-foreground flex items-center gap-2">
                    👪 Family Details
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </h2>
                  {familyDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4 bg-card">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      This helps identify regional temple traditions
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="familySurname">Family Surname</Label>
                      <Input
                        id="familySurname"
                        placeholder="Enter your family surname"
                        value={localData.familySurname}
                        onChange={(e) => setLocalData({ ...localData, familySurname: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gotra">Gotra</Label>
                      <Input
                        id="gotra"
                        placeholder="e.g., Bharadwaja, Kashyapa, Vasishtha"
                        value={localData.gotra}
                        onChange={(e) => setLocalData({ ...localData, gotra: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caste">Caste / Community</Label>
                      <Input
                        id="caste"
                        placeholder="Enter your caste or community"
                        value={localData.caste}
                        onChange={(e) => setLocalData({ ...localData, caste: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motherTongue">Mother Tongue</Label>
                      <Select
                        value={localData.motherTongue}
                        onValueChange={(value) => setLocalData({ ...localData, motherTongue: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your mother tongue" />
                        </SelectTrigger>
                        <SelectContent>
                          {motherTongues.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Section 3: Temple Hints (Optional - Collapsible) */}
            <Collapsible open={templeHintsOpen} onOpenChange={setTempleHintsOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <h2 className="font-medium text-foreground flex items-center gap-2">
                    🛕 Temple Hints
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </h2>
                  {templeHintsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4 bg-card">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Any information about the temple helps
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="knownTempleName">Known Temple Name</Label>
                      <Input
                        id="knownTempleName"
                        placeholder="If you know the temple name"
                        value={localData.knownTempleName}
                        onChange={(e) => setLocalData({ ...localData, knownTempleName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deityName">Primary Deity Worshipped</Label>
                      <Input
                        id="deityName"
                        placeholder="e.g., Lord Shiva, Goddess Mariamman"
                        value={localData.deityName}
                        onChange={(e) => setLocalData({ ...localData, deityName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nearbyLandmarks">Nearby Landmarks</Label>
                      <Input
                        id="nearbyLandmarks"
                        placeholder="e.g., Near Kaveri River, Near XYZ Hill"
                        value={localData.nearbyLandmarks}
                        onChange={(e) => setLocalData({ ...localData, nearbyLandmarks: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="approximateTempleAge">Approximate Temple Age</Label>
                      <Select
                        value={localData.approximateTempleAge}
                        onValueChange={(value) => setLocalData({ ...localData, approximateTempleAge: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How old is the temple?" />
                        </SelectTrigger>
                        <SelectContent>
                          {templeAges.map((age) => (
                            <SelectItem key={age.value} value={age.value}>
                              {age.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Section 4: Additional Information (Optional - Collapsible) */}
            <Collapsible open={additionalOpen} onOpenChange={setAdditionalOpen}>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 bg-card flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <h2 className="font-medium text-foreground flex items-center gap-2">
                    ✨ Additional Information
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </h2>
                  {additionalOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4 bg-card">
                    <div className="space-y-2">
                      <Label>Festivals Your Family Celebrates at This Temple</Label>
                      <div className="flex flex-wrap gap-2">
                        {commonFestivals.map((festival) => (
                          <Badge
                            key={festival}
                            variant={localData.festivalsCelebrated.includes(festival) ? "default" : "outline"}
                            className="cursor-pointer transition-colors"
                            onClick={() => toggleFestival(festival)}
                          >
                            {festival}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="familyMemberWhoKnows">Elder Who Might Know More</Label>
                      <Input
                        id="familyMemberWhoKnows"
                        placeholder="Name of elder family member (optional)"
                        value={localData.familyMemberWhoKnows}
                        onChange={(e) => setLocalData({ ...localData, familyMemberWhoKnows: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">Any Other Details</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Anything else you remember about the temple..."
                        value={localData.additionalNotes}
                        onChange={(e) => setLocalData({ ...localData, additionalNotes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Photo Upload */}
            <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
              <Label>Photo (Optional)</Label>
              <p className="text-xs text-muted-foreground">
                Upload a photo of any old temple document, family record, or temple photo
              </p>
              
              {photoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-32 w-32 rounded-lg border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background p-6 transition-colors hover:border-primary/50">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Not Sure Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notSure"
                checked={localData.notSure}
                onCheckedChange={(checked) => setLocalData({ ...localData, notSure: checked as boolean })}
              />
              <Label htmlFor="notSure" className="text-sm font-normal">
                I'm not sure about my ancestral temple
              </Label>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50">
              <Checkbox
                id="consent"
                checked={localData.consentToStore}
                onCheckedChange={(checked) => setLocalData({ ...localData, consentToStore: checked as boolean })}
              />
              <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                I consent to my data being stored and used to improve ancestral temple matching for all devotees
              </Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 sm:h-14 text-base rounded-full" size="lg">
              Continue
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AncestralForm;
