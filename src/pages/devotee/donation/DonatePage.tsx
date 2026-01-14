import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTemple } from '@/context/TempleContext';
import { useDonation } from '@/context/DonationContext';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/utils/analytics';

// Culturally appropriate amounts
const predefinedAmounts = [51, 101, 501, 1001];

// Donation purposes
const donationPurposes = [
  { value: 'annadhanam', label: 'Annadhanam (Food Offering)' },
  { value: 'archana', label: 'Archana' },
  { value: 'maintenance', label: 'Temple Maintenance' },
  { value: 'festival', label: 'Festival Contribution' },
  { value: 'general', label: 'General Donation' },
];

const DonatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTempleById } = useTemple();
  const { addDonation } = useDonation();
  const { toast } = useToast();
  
  const temple = getTempleById(id || '');
  
  const [amount, setAmount] = useState<number>(101);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('general');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [dedicationName, setDedicationName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    trackEvent('page_view', { page: 'donate', templeId: id });
  }, [id]);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Temple not found</p>
          <Link to="/dashboard" className="text-primary hover:underline">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorName.trim() || !donorPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number",
        variant: "destructive"
      });
      return;
    }

    if (amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }

    trackEvent('donate_initiated', {
      templeId: temple.id,
      templeName: temple.name,
      amount,
      purpose,
    });

    setIsProcessing(true);
    
    // Simulate UPI payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const donation = addDonation({
      templeId: temple.id,
      templeName: temple.name,
      amount,
      donorName: donorName.trim(),
      donorPhone: donorPhone.trim(),
      paymentMethod: 'upi',
    });

    trackEvent('donate_success', {
      templeId: temple.id,
      amount,
      donationId: donation.id,
    });
    
    setIsProcessing(false);
    navigate(`/donation/receipt/${donation.id}`);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Make an Offering</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{temple.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        {/* Trust Banner */}
        <div className="mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-sm text-foreground">
            ✅ 100% direct to temple account • UPI supported • Receipt generated
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Select Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {predefinedAmounts.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={amount === preset && !customAmount ? "default" : "outline"}
                    className="h-14 text-lg font-semibold"
                    onClick={() => handleAmountSelect(preset)}
                  >
                    ₹{preset}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8 h-12 text-lg"
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purpose Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Purpose of Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {donationPurposes.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Donor Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donorName">Full Name *</Label>
                <Input
                  id="donorName"
                  placeholder="Enter your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donorPhone">Phone Number *</Label>
                <Input
                  id="donorPhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dedicationName">Dedication Name (optional)</Label>
                <Input
                  id="dedicationName"
                  placeholder="In the name of..."
                  value={dedicationName}
                  onChange={(e) => setDedicationName(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Name to be mentioned during the offering
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full h-14 text-lg rounded-full gap-2"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Smartphone className="h-5 w-5" />
                Pay ₹{amount.toLocaleString()} via UPI
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment • Receipt will be generated after payment
          </p>
        </form>
      </main>
    </div>
  );
};

export default DonatePage;
