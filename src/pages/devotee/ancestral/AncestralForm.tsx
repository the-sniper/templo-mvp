import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const AncestralForm = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useAncestral();
  
  const [localData, setLocalData] = useState({
    nativeVillage: formData.nativeVillage,
    district: formData.district,
    state: formData.state,
    familySurname: formData.familySurname,
    knownTempleName: formData.knownTempleName,
    notSure: formData.notSure,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(formData.photoFile);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormData({
      ...localData,
      photoFile,
    });
    
    navigate('/ancestral/searching');
  };

  return (
    <div className="min-h-screen bg-background">
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
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground">
            Share details about your native place to help us find your ancestral temple.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Native Village */}
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

            {/* State */}
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

            {/* District */}
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

            {/* Family Surname */}
            <div className="space-y-2">
              <Label htmlFor="familySurname">Family Surname (Optional)</Label>
              <Input
                id="familySurname"
                placeholder="Enter your family surname"
                value={localData.familySurname}
                onChange={(e) => setLocalData({ ...localData, familySurname: e.target.value })}
              />
            </div>

            {/* Known Temple Name */}
            <div className="space-y-2">
              <Label htmlFor="knownTempleName">Known Temple Name (Optional)</Label>
              <Input
                id="knownTempleName"
                placeholder="If you know the temple name"
                value={localData.knownTempleName}
                onChange={(e) => setLocalData({ ...localData, knownTempleName: e.target.value })}
              />
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

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Photo (Optional)</Label>
              <p className="text-sm text-muted-foreground">
                Upload a photo of any old temple document or family record
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
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card p-6 transition-colors hover:border-primary/50">
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

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 sm:h-14 text-base rounded-full" size="lg">
              Find My Ancestral Temple
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AncestralForm;
