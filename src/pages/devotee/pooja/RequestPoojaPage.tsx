import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Star, Languages, Calendar, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTemple } from '@/context/TempleContext';
import { usePooja } from '@/context/PoojaContext';
import { useToast } from '@/hooks/use-toast';

const RequestPoojaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTempleById } = useTemple();
  const { getPriestsByTemple, getAllPoojaServices, addPoojaRequest } = usePooja();
  const { toast } = useToast();
  
  const temple = getTempleById(id || '');
  const templePriests = getPriestsByTemple(id || '');
  const allServices = getAllPoojaServices();
  
  const [selectedPriest, setSelectedPriest] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteePhone, setDevoteePhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [occasion, setOccasion] = useState('');
  const [inMemoryOf, setInMemoryOf] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Temple not found</p>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const selectedServiceData = allServices.find(s => s.id === selectedService);
  const selectedPriestData = templePriests.find(p => p.id === selectedPriest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPriest || !selectedService || !devoteeName.trim() || !devoteePhone.trim() || !preferredDate || !preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const request = addPoojaRequest({
      priestId: selectedPriest,
      priestName: selectedPriestData?.name || '',
      serviceId: selectedService,
      serviceName: selectedServiceData?.name || '',
      templeId: temple.id,
      templeName: temple.name,
      devoteeName: devoteeName.trim(),
      devoteePhone: devoteePhone.trim(),
      preferredDate,
      preferredTime,
      occasion: occasion.trim() || undefined,
      inMemoryOf: inMemoryOf.trim() || undefined,
    });
    
    setIsSubmitting(false);
    navigate(`/pooja/confirmation/${request.id}`);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Request a Pooja</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{temple.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Priest */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Select Priest
              </CardTitle>
            </CardHeader>
            <CardContent>
              {templePriests.length === 0 ? (
                <p className="text-muted-foreground text-sm">No priests available for this temple yet.</p>
              ) : (
                <RadioGroup value={selectedPriest} onValueChange={setSelectedPriest}>
                  {templePriests.map((priest) => (
                    <div 
                      key={priest.id}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer"
                    >
                      <RadioGroupItem value={priest.id} id={priest.id} className="mt-1" />
                      <Label htmlFor={priest.id} className="flex-1 cursor-pointer space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{priest.name}</span>
                          {priest.available && (
                            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                              Available
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>{priest.experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Languages className="h-4 w-4" />
                          <span>{priest.languages.join(', ')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{priest.bio}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Select Pooja Service */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Pooja Service</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a pooja service" />
                </SelectTrigger>
                <SelectContent>
                  {allServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedServiceData && (
                <div className="mt-4 p-4 rounded-lg bg-accent/50 space-y-2">
                  <h4 className="font-medium text-foreground">{selectedServiceData.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedServiceData.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration: {selectedServiceData.duration}</span>
                    <span className="text-primary font-medium">
                      ₹{selectedServiceData.suggestedDonationMin} - ₹{selectedServiceData.suggestedDonationMax}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferred Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Preferred Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Time *</Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger id="preferredTime">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 10 AM)</SelectItem>
                    <SelectItem value="midday">Midday (10 AM - 2 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2 PM - 6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM - 8 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Occasion / In Memory Of */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Special Occasion
              </CardTitle>
              <CardDescription>Optional details about the purpose of this pooja</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occasion">On Occasion Of</Label>
                <Input
                  id="occasion"
                  placeholder="e.g., Birthday, Anniversary, House Warming"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inMemoryOf">In Memory Of (for Shraddha/Tarpan)</Label>
                <Textarea
                  id="inMemoryOf"
                  placeholder="Name(s) of departed souls for ancestral rites"
                  value={inMemoryOf}
                  onChange={(e) => setInMemoryOf(e.target.value)}
                  maxLength={200}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Devotee Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="devoteeName">Full Name *</Label>
                <Input
                  id="devoteeName"
                  placeholder="Enter your name"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="devoteePhone">Phone Number *</Label>
                <Input
                  id="devoteePhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={devoteePhone}
                  onChange={(e) => setDevoteePhone(e.target.value)}
                  required
                  maxLength={15}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full h-14 text-lg rounded-full gap-2"
            disabled={isSubmitting || templePriests.length === 0}
          >
            {isSubmitting ? 'Submitting Request...' : 'Request Pooja'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            The priest will review your request and confirm availability. Payment is made directly to the temple.
          </p>
        </form>
      </main>
    </div>
  );
};

export default RequestPoojaPage;
