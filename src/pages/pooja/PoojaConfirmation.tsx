import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PoojaConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we'd fetch the request from context
  // For now, we show a success message
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Request Submitted!
          </h1>
          <p className="text-muted-foreground">
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

        <div className="bg-accent/50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              The priest will review your request
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              You'll receive a confirmation call/SMS
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              Make dakshina payment at the temple after the pooja
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12">
              Back to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full h-12"
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
