import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users, MapPin, Home, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBooking } from '@/context/BookingContext';

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings } = useBooking();
  
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 font-serif text-xl font-semibold text-foreground">Booking not found</h2>
          <p className="text-muted-foreground text-sm mb-4">The booking you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="rounded-full px-6">Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(booking.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-lg">
        {/* Success Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Your slot has been successfully reserved</p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Event Info */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">{booking.templeName}</p>
              <h2 className="text-xl font-bold text-primary">{booking.eventName}</h2>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-accent/50 rounded-lg p-4 text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground text-sm">{formattedDate}</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4 text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold text-foreground">{booking.timeSlot}</p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Devotee Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Devotees ({booking.devotees})</p>
                  <p className="font-medium text-foreground">{booking.devoteeNames.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Temple</p>
                  <p className="font-medium text-foreground">{booking.templeName}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Booking Reference */}
            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono font-semibold text-foreground">{booking.bookingId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booked On</span>
                <span className="text-foreground">{bookingDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-semibold capitalize">{booking.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Instructions */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-foreground mb-2">Important Instructions</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Please arrive 15 minutes before your slot time</li>
              <li>Carry a copy of this confirmation (digital or printed)</li>
              <li>Dress code: Traditional attire preferred</li>
              <li>Mobile phones may need to be deposited at the counter</li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 rounded-full">
            <Download className="h-4 w-4 mr-2" />
            Download Booking Pass
          </Button>
          <Link to="/" className="block">
            <Button variant="default" className="w-full h-12 rounded-full">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;
