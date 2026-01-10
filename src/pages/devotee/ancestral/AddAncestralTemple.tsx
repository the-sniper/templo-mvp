import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const templeTypes = [
  { value: 'family', label: 'Family Temple (Kuladeivam)' },
  { value: 'village', label: 'Village Temple (Gramadeivam)' },
  { value: 'regional', label: 'Regional Temple' },
  { value: 'major', label: 'Major Pilgrimage Temple' },
];

const commonFestivals = [
  'Pongal', 'Diwali', 'Navaratri', 'Ganesh Chaturthi', 'Maha Shivaratri',
  'Rama Navami', 'Krishna Janmashtami', 'Panguni Uthiram', 'Thai Poosam'
];

const AddAncestralTemple = () => {
  const navigate = useNavigate();
  const { setSelectedTemple, formData } = useAncestral();
  
  const [templeName, setTempleName] = useState('');
  const [village, setVillage] = useState(formData.nativeVillage || '');
  const [district, setDistrict] = useState(formData.district || '');
  const [state, setState] = useState(formData.state || '');
  const [primaryDeity, setPrimaryDeity] = useState('');
  const [templeType, setTempleType] = useState('');
  const [annualFestivals, setAnnualFestivals] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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
    if (annualFestivals.includes(festival)) {
      setAnnualFestivals(annualFestivals.filter(f => f !== festival));
    } else {
      setAnnualFestivals([...annualFestivals, festival]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const location = [village, district, state].filter(Boolean).join(', ');
    
    setSelectedTemple({
      id: `custom-${Date.now()}`,
      name: templeName,
      location: location,
      image: photoPreview || '/temples/tirupati.jpg', // Fallback image
      description: description,
      primaryDeity: primaryDeity,
      templeType: templeType,
      isCustom: true,
    });
    
    navigate('/ancestral/confirmation');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/ancestral/results" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-foreground">
            Add Your Ancestral Temple
          </h1>
          <p className="mb-4 text-muted-foreground">
            Help us grow our temple database by adding your ancestral temple details.
          </p>

          {/* Contribution Banner */}
          <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Your contribution matters!</span> Every 
              temple you add helps other devotees find their spiritual heritage.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Section */}
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <h2 className="font-medium text-foreground mb-4 flex items-center gap-2">
                📍 Temple Location
                <Badge variant="outline" className="text-xs">Required</Badge>
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="templeName">Temple Name *</Label>
                  <Input
                    id="templeName"
                    placeholder="e.g., Sri Mariamman Temple"
                    value={templeName}
                    onChange={(e) => setTempleName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="village">Village / Town *</Label>
                  <Input
                    id="village"
                    placeholder="Enter village or town"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Enter district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={state} onValueChange={setState} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Optional Temple Details */}
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <h2 className="font-medium text-foreground mb-4 flex items-center gap-2">
                🛕 Temple Details
                <Badge variant="secondary" className="text-xs">Optional</Badge>
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryDeity">Primary Deity</Label>
                  <Input
                    id="primaryDeity"
                    placeholder="e.g., Goddess Mariamman, Lord Murugan"
                    value={primaryDeity}
                    onChange={(e) => setPrimaryDeity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="templeType">Temple Type</Label>
                  <Select value={templeType} onValueChange={setTempleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select temple type" />
                    </SelectTrigger>
                    <SelectContent>
                      {templeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Annual Festivals</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonFestivals.map((festival) => (
                      <Badge
                        key={festival}
                        variant={annualFestivals.includes(festival) ? "default" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleFestival(festival)}
                      >
                        {festival}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description / History</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about this temple - its history, significance, traditions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
              <Label>Temple Photo (Optional)</Label>
              <p className="text-xs text-muted-foreground">
                A photo helps other devotees recognize the temple
              </p>
              
              {photoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-40 w-full rounded-lg border border-border object-cover"
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
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background p-8 transition-colors hover:border-primary/50">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload temple photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 rounded-full" size="lg">
              Add & Save as My Ancestral Temple
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAncestralTemple;
