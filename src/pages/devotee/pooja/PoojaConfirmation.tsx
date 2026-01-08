import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ShareButton from '@/components/ShareButton';

const PoojaConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we'd fetch the request from context
  // For now, we show a success message
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
            Request Submitted!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Your pooja request has been sent to the priest for review.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Request ID</span>
              <span className="font-mono text-sm font-medium text-foreground">{id?.toUpperCase()}</span>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-accent text-accent-foreground">
                  Pending Confirmation
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent/50 rounded-2xl p-4 sm:p-5 mb-6">
          <h3 className="font-medium text-foreground mb-3">What happens next?</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">1</span>
              <span>The priest will review your request</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">2</span>
              <span>You'll receive a confirmation call/SMS</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">3</span>
              <span>Make dakshina payment at the temple after the pooja</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <ShareButton
            title="Pooja Request"
            text="🙏 I've requested a special pooja. Seek blessings for your family too!"
            url={window.location.href}
            variant="outline"
            className="w-full h-12 rounded-full"
          />
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12 rounded-full">
              Back to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-full"
            onClick={() => navigate(-2)}
          >
            View Temple Details
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PoojaConfirmation;
