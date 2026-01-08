import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, CreditCard, Smartphone, Building2, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTemple } from '@/context/TempleContext';
import { useRecurringDonation, RecurringFrequency } from '@/context/RecurringDonationContext';
import { useToast } from '@/hooks/use-toast';

const predefinedAmounts = [11, 21, 51, 101, 251, 501];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const RecurringDonatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTempleById } = useTemple();
  const { addRecurringDonation } = useRecurringDonation();
  const { toast } = useToast();
  
  const temple = getTempleById(id || '');
  
  const [amount, setAmount] = useState<number>(21);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<RecurringFrequency>('weekly');
  const [dayOfWeek, setDayOfWeek] = useState<number>(1); // Monday
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-x-hidden">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <RefreshCw className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 font-serif text-xl font-semibold text-foreground">Temple not found</h2>
          <p className="text-muted-foreground text-sm mb-4">The temple you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="rounded-full px-6">Go back home</Button>
          </Link>
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

  const getFrequencyDescription = () => {
    switch (frequency) {
      case 'daily':
        return `₹${amount} will be donated every day`;
      case 'weekly':
        return `₹${amount} will be donated every ${daysOfWeek[dayOfWeek]}`;
      case 'monthly':
        return `₹${amount} will be donated on the ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} of every month`;
    }
  };

  const getOrdinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
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

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const donation = addRecurringDonation({
      templeId: temple.id,
      templeName: temple.name,
      amount,
      frequency,
      dayOfWeek: frequency === 'weekly' ? dayOfWeek : undefined,
      dayOfMonth: frequency === 'monthly' ? dayOfMonth : undefined,
      donorName: donorName.trim(),
      donorPhone: donorPhone.trim(),
      donorEmail: donorEmail.trim() || undefined,
      paymentMethod,
    });
    
    setIsProcessing(false);
    navigate(`/recurring-donation/confirmation/${donation.id}`);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Recurring Donation</h1>
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
              <CardDescription>Start with a small amount - every ₹ counts!</CardDescription>
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

          {/* Frequency Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Donation Frequency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={frequency} onValueChange={(v) => setFrequency(v as RecurringFrequency)}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="flex-1 cursor-pointer">
                    <span className="font-medium">Daily</span>
                    <p className="text-sm text-muted-foreground">Donate every day</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="flex-1 cursor-pointer">
                    <span className="font-medium">Weekly</span>
                    <p className="text-sm text-muted-foreground">Donate every week on a specific day</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                    <span className="font-medium">Monthly</span>
                    <p className="text-sm text-muted-foreground">Donate every month on a specific date</p>
                  </Label>
                </div>
              </RadioGroup>

              {frequency === 'weekly' && (
                <div className="space-y-2 pt-2">
                  <Label>Select Day of Week</Label>
                  <Select value={dayOfWeek.toString()} onValueChange={(v) => setDayOfWeek(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day, index) => (
                        <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {frequency === 'monthly' && (
                <div className="space-y-2 pt-2">
                  <Label>Select Day of Month</Label>
                  <Select value={dayOfMonth.toString()} onValueChange={(v) => setDayOfMonth(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="bg-accent/50 rounded-lg p-3 text-sm text-center">
                <Calendar className="h-4 w-4 inline-block mr-2 text-primary" />
                {getFrequencyDescription()}
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
                  placeholder="Enter email for receipts"
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
              <>Setting up...</>
            ) : (
              <>
                <RefreshCw className="h-5 w-5" />
                Start ₹{amount}/{frequency === 'daily' ? 'day' : frequency === 'weekly' ? 'week' : 'month'}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You can pause or cancel anytime. We'll send you a reminder before each donation.
          </p>
        </form>
      </main>
    </div>
  );
};

export default RecurringDonatePage;
