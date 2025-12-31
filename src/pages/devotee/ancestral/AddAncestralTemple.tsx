import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAncestral } from '@/context/AncestralContext';
import Header from '@/components/Header';

const AddAncestralTemple = () => {
  const navigate = useNavigate();
  const { setSelectedTemple } = useAncestral();
  
  const [templeName, setTempleName] = useState('');
  const [location, setLocation] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSelectedTemple({
      id: `custom-${Date.now()}`,
      name: templeName,
      location: location,
      image: photoPreview || '/temples/tirupati.jpg', // Fallback image
      description: description,
      isCustom: true,
    });
    
    navigate('/ancestral/confirmation');
  };

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="mb-2 font-serif text-2xl font-bold text-foreground">
            Add Your Ancestral Temple
          </h1>
          <p className="mb-8 text-muted-foreground">
            Help us grow our temple database by adding your ancestral temple details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Temple Name */}
            <div className="space-y-2">
              <Label htmlFor="templeName">Temple Name *</Label>
              <Input
                id="templeName"
                placeholder="Enter temple name"
                value={templeName}
                onChange={(e) => setTempleName(e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Village/Town, District, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Tell us about this temple - its history, deity, festivals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Temple Photo (Optional)</Label>
              
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
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card p-8 transition-colors hover:border-primary/50">
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
            <Button type="submit" className="w-full" size="lg">
              Add & Save as My Ancestral Temple
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAncestralTemple;
