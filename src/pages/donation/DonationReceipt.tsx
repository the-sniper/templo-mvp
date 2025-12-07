import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDonation } from '@/context/DonationContext';
import ShareButton from '@/components/ShareButton';

const DonationReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const { donations } = useDonation();
  
  const donation = donations.find(d => d.id === id);

  if (!donation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Receipt not found</p>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(donation.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-lg">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Donation Successful!</h1>
          <p className="text-muted-foreground">Thank you for your generous contribution</p>
        </div>

        {/* Receipt Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">Amount Donated</p>
              <p className="text-4xl font-bold text-primary">₹{donation.amount.toLocaleString()}</p>
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
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium text-foreground">{donation.donorPhone}</span>
              </div>
              {donation.donorEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground">{donation.donorEmail}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium text-foreground uppercase">{donation.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium text-foreground">{formattedDate}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Receipt Number</span>
                <span className="font-mono text-foreground">{donation.receiptNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-foreground">{donation.transactionId}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <ShareButton
              title={`Donation to ${donation.templeName}`}
              text={`🙏 I donated ₹${donation.amount.toLocaleString()} to ${donation.templeName}. Join me in supporting our temples!`}
              url={window.location.href}
              variant="outline"
              className="h-12"
            />
          </div>
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          This receipt serves as proof of your donation. The temple will receive 100% of your contribution.
        </p>
      </main>
    </div>
  );
};

export default DonationReceipt;
