import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Printer, Receipt, Building2, User, Phone, Mail, CreditCard, Calendar, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDonation } from '@/context/DonationContext';
import ShareButton from '@/components/ShareButton';
import Header from '@/components/Header';

const DonationReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const { donations } = useDonation();
  
  const donation = donations.find(d => d.id === id);

  if (!donation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Receipt className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">Receipt not found</h2>
            <p className="text-muted-foreground mb-4">The donation receipt you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Go back home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(donation.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = new Date(donation.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Receipt Card */}
        <Card className="mb-6 overflow-hidden border-2 print:border print:shadow-none">
          {/* Receipt Header */}
          <div className="bg-primary/5 p-6 text-center border-b border-border print:bg-gray-50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Templo</span>
            </div>
            <h2 className="text-lg font-bold text-foreground">DONATION RECEIPT</h2>
            <p className="text-sm text-muted-foreground mt-1">Official Receipt for Tax Purposes</p>
          </div>

          <CardContent className="p-6">
            {/* Amount Section */}
            <div className="text-center mb-6 py-6 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Amount Donated</p>
              <p className="text-4xl font-bold text-primary">₹{donation.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {donation.amount > 0 && `(${numberToWords(donation.amount)} Rupees Only)`}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Temple Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Temple Details
              </h3>
              <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{donation.templeName}</p>
                  <p className="text-sm text-muted-foreground">Registered Temple</p>
                </div>
              </div>
            </div>

            {/* Donor Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Donor Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-medium text-foreground">{donation.donorName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="font-medium text-foreground">{donation.donorPhone}</span>
                </div>
                {donation.donorEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{donation.donorEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Method:</span>
                  <span className="font-medium text-foreground uppercase">{donation.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium text-foreground">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="font-medium text-foreground">{formattedTime}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Reference Numbers */}
            <div className="bg-accent/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Receipt Number</span>
                </div>
                <span className="font-mono font-medium text-foreground">{donation.receiptNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Transaction ID</span>
                </div>
                <span className="font-mono font-medium text-foreground">{donation.transactionId}</span>
              </div>
            </div>

            {/* Occasion/Dedication */}
            {(donation.occasion || donation.inMemoryOf) && (
              <>
                <Separator className="my-6" />
                <div className="space-y-2">
                  {donation.occasion && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Occasion</span>
                      <span className="font-medium text-foreground">{donation.occasion}</span>
                    </div>
                  )}
                  {donation.inMemoryOf && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">In Memory Of</span>
                      <span className="font-medium text-foreground">{donation.inMemoryOf}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>

          {/* Receipt Footer */}
          <div className="bg-accent/30 p-4 text-center border-t border-border">
            <p className="text-xs text-muted-foreground">
              This is a computer-generated receipt and does not require a signature.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              100% of your donation goes directly to the temple.
            </p>
          </div>
        </Card>

        {/* Actions - Hidden in Print */}
        <div className="space-y-3 print:hidden">
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12 rounded-full" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" className="h-12 rounded-full">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <ShareButton
              title={`Donation to ${donation.templeName}`}
              text={`🙏 I donated ₹${donation.amount.toLocaleString()} to ${donation.templeName}. Join me in supporting our temples!`}
              url={window.location.href}
              variant="outline"
              className="h-12 rounded-full"
            />
          </div>
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12 rounded-full">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6 print:hidden">
          For any queries regarding this donation, please contact the temple administration.
        </p>
      </main>
    </div>
  );
};

// Helper function to convert number to words
function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(-num);

  let words = '';

  if (Math.floor(num / 10000000) > 0) {
    words += numberToWords(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }

  if (Math.floor(num / 100000) > 0) {
    words += numberToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }

  if (num > 0) {
    if (num < 10) {
      words += ones[num];
    } else if (num < 20) {
      words += teens[num - 10];
    } else {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += ' ' + ones[num % 10];
      }
    }
  }

  return words.trim();
}

export default DonationReceipt;
