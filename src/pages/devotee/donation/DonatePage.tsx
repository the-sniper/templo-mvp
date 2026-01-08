import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, CreditCard, Smartphone, Building2, Gift, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTemple } from '@/context/TempleContext';
import { useDonation } from '@/context/DonationContext';
import { useToast } from '@/hooks/use-toast';

const predefinedAmounts = [101, 251, 501, 1001, 2501, 5001];

const DonatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTempleById } = useTemple();
  const { addDonation } = useDonation();
  const { toast } = useToast();
  
  const temple = getTempleById(id || '');
  
  const [amount, setAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [inMemoryOf, setInMemoryOf] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Temple not found</p>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
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

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const donation = addDonation({
      templeId: temple.id,
      templeName: temple.name,
      amount,
      donorName: donorName.trim(),
      donorPhone: donorPhone.trim(),
      donorEmail: donorEmail.trim() || undefined,
      paymentMethod,
    });
    
    setIsProcessing(false);
    navigate(`/donation/receipt/${donation.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Donate</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{temple.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Select Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={amount === preset && !customAmount ? "default" : "outline"}
                    className="h-12"
                    onClick={() => handleAmountSelect(preset)}
                  >
                    ₹{preset}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customAmount">Or enter custom amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8"
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="h-5 w-5 text-primary" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI (GPay, PhonePe, Paytm)</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit / Debit Card</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Building2 className="h-5 w-5 text-primary" />
                  <Label htmlFor="netbanking" className="flex-1 cursor-pointer">Net Banking</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Special Occasion / In Memory Of */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Dedicate This Donation
              </CardTitle>
              <CardDescription>Optional: Add a personal touch to your offering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occasion">On Occasion Of</Label>
                <Input
                  id="occasion"
                  placeholder="e.g., Birthday, Anniversary, Festival"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inMemoryOf">In Loving Memory Of</Label>
                <Textarea
                  id="inMemoryOf"
                  placeholder="Name(s) of departed loved ones"
                  value={inMemoryOf}
                  onChange={(e) => setInMemoryOf(e.target.value)}
                  maxLength={200}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Donor Details */}
          <Card>
            <CardHeader>
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
                  maxLength={100}
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
                  maxLength={15}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donorEmail">Email (optional)</Label>
                <Input
                  id="donorEmail"
                  type="email"
                  placeholder="Enter email for receipt"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  maxLength={255}
                />
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
                <Heart className="h-5 w-5" />
                Donate ₹{amount.toLocaleString()}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your donation is secure. A receipt will be generated after successful payment.
          </p>
        </form>
      </main>
    </div>
  );
};

export default DonatePage;
