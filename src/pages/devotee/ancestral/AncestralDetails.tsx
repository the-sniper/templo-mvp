import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Info, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAncestral } from '@/context/AncestralContext';

const festivalOptions = [
  'Pongal', 'Thai Poosam', 'Maha Shivaratri', 'Panguni Uthiram',
  'Chithirai Thiruvizha', 'Aadi Perukku', 'Vinayaka Chaturthi',
  'Navaratri', 'Deepavali', 'Karthigai Deepam', 'Thirukarthigai'
];

const templeAgeOptions = [
  { value: 'ancient', label: 'Very Old (100+ years)' },
  { value: 'old', label: 'Old (50-100 years)' },
  { value: 'modern', label: 'Relatively New (< 50 years)' },
  { value: 'unknown', label: 'Not Sure' },
];

const AncestralDetails = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useAncestral();
  
  // Form state
  const [gotra, setGotra] = useState(formData.gotra || '');
  const [caste, setCaste] = useState(formData.caste || '');
  const [motherTongue, setMotherTongue] = useState(formData.motherTongue || '');
  const [templeAge, setTempleAge] = useState(formData.approximateTempleAge || '');
  const [selectedFestivals, setSelectedFestivals] = useState<string[]>(formData.festivalsCelebrated || []);
  const [elderName, setElderName] = useState(formData.familyMemberWhoKnows || '');
  const [elderPhone, setElderPhone] = useState('');
  const [notSure, setNotSure] = useState(formData.notSure);
  const [consentToStore, setConsentToStore] = useState(formData.consentToStore);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const toggleFestival = (festival: string) => {
    setSelectedFestivals(prev => 
      prev.includes(festival) 
        ? prev.filter(f => f !== festival)
        : [...prev, festival]
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      gotra,
      caste,
      motherTongue,
      approximateTempleAge: templeAge,
      festivalsCelebrated: selectedFestivals,
      familyMemberWhoKnows: elderName,
      notSure,
      consentToStore,
      photoFile,
    };
    
    setFormData(updatedFormData);
    navigate('/ancestral/results');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate('/ancestral/results')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Results</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Improve Matching
          </h1>
          <p className="text-muted-foreground">
            More details help us find the correct temple.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Genealogical Details */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-5">
            <h3 className="font-semibold text-foreground">Family Background</h3>
            
            <div className="space-y-2">
              <Label htmlFor="gotra" className="text-foreground">Gotra</Label>
              <Input
                id="gotra"
                placeholder="e.g., Bharadwaja, Kashyapa"
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                className="h-12 rounded-xl bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caste" className="text-foreground">Caste / Community</Label>
              <Input
                id="caste"
                placeholder="e.g., Mudaliar, Chettiar, Nadar"
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                className="h-12 rounded-xl bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherTongue" className="text-foreground">Mother Tongue</Label>
              <Input
                id="motherTongue"
                placeholder="e.g., Tamil, Telugu, Kannada"
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
                className="h-12 rounded-xl bg-background border-border/50"
              />
            </div>
          </div>

          {/* Temple Details */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-5">
            <h3 className="font-semibold text-foreground">Temple Information</h3>
            
            <div className="space-y-2">
              <Label className="text-foreground">Temple Age</Label>
              <Select value={templeAge} onValueChange={setTempleAge}>
                <SelectTrigger className="h-12 rounded-xl bg-background border-border/50">
                  <SelectValue placeholder="Select approximate age" />
                </SelectTrigger>
                <SelectContent>
                  {templeAgeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Festivals Celebrated</Label>
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
              <Label className="text-foreground">Upload Old Temple Photo (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {photoFile ? photoFile.name : 'Click to upload photo'}
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Elder Who Might Know */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-5">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Elder Who Might Know</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="elderName" className="text-foreground">Name</Label>
              <Input
                id="elderName"
                placeholder="e.g., Grandfather, Uncle"
                value={elderName}
                onChange={(e) => setElderName(e.target.value)}
                className="h-12 rounded-xl bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="elderPhone" className="text-foreground">Phone (optional)</Label>
              <Input
                id="elderPhone"
                placeholder="+91 9XXXXXXXXX"
                value={elderPhone}
                onChange={(e) => setElderPhone(e.target.value)}
                className="h-12 rounded-xl bg-background border-border/50"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="notSure"
                checked={notSure}
                onCheckedChange={(checked) => setNotSure(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="notSure" className="text-sm text-muted-foreground cursor-pointer">
                I'm not sure about my ancestral temple
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consentToStore}
                onCheckedChange={(checked) => setConsentToStore(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                I consent to my data being used to improve matching
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full h-14 rounded-full text-base font-semibold"
            >
              Update & Show Matches
            </Button>
            
            <Button
              onClick={() => navigate('/ancestral/results')}
              variant="ghost"
              className="w-full text-muted-foreground"
            >
              Back to Results
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AncestralDetails;
