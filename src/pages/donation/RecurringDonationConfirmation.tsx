import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useRecurringDonation } from '@/context/RecurringDonationContext';
import ShareButton from '@/components/ShareButton';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const RecurringDonationConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { recurringDonations } = useRecurringDonation();
  
  const donation = recurringDonations.find(d => d.id === id);

  if (!donation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Donation not found</p>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const getFrequencyText = () => {
    switch (donation.frequency) {
      case 'daily':
        return 'Every day';
      case 'weekly':
        return `Every ${daysOfWeek[donation.dayOfWeek || 0]}`;
      case 'monthly':
        return `${donation.dayOfMonth}${getOrdinalSuffix(donation.dayOfMonth || 1)} of every month`;
    }
  };

  const getOrdinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const nextDate = new Date(donation.nextDonationDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Recurring Donation Set Up!
          </h1>
          <p className="text-muted-foreground">
            Your seva to {donation.templeName} will begin soon 🙏
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-4xl font-bold text-primary">₹{donation.amount}</p>
              <Badge variant="secondary" className="mt-2">
                <RefreshCw className="h-3 w-3 mr-1" />
                {getFrequencyText()}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temple</span>
                <span className="font-medium text-foreground">{donation.templeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Donor Name</span>
                <span className="font-medium text-foreground">{donation.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium text-foreground uppercase">{donation.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Donation</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{nextDate}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent/50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              We'll send you a reminder before each donation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              Your payment will be auto-processed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              You can pause or cancel anytime from your profile
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <ShareButton
            title={`Recurring Donation to ${donation.templeName}`}
            text={`🙏 I'm donating ₹${donation.amount} ${donation.frequency} to ${donation.templeName}. Join me in supporting our temples!`}
            url={window.location.href}
            variant="outline"
            className="w-full h-12"
          />
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RecurringDonationConfirmation;
