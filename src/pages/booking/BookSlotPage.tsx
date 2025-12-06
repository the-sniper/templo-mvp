import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTemple } from '@/context/TempleContext';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/hooks/use-toast';

const eventTypes = [
  { id: 'special-darshan', name: 'Special Darshan', description: 'Priority entry for darshan', price: 500 },
  { id: 'pooja', name: 'Archana / Pooja', description: 'Special pooja with priest', price: 251 },
  { id: 'abhishekam', name: 'Abhishekam', description: 'Sacred bathing ceremony', price: 1001 },
];

const timeSlots = [
  { time: '06:00 AM', available: true },
  { time: '07:00 AM', available: true },
  { time: '08:00 AM', available: false },
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: false },
  { time: '06:00 PM', available: true },
  { time: '07:00 PM', available: true },
];

const BookSlotPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTempleById } = useTemple();
  const { addBooking } = useBooking();
  const { toast } = useToast();
  
  const temple = getTempleById(id || '');
  
  const [selectedEvent, setSelectedEvent] = useState(eventTypes[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [devoteeCount, setDevoteeCount] = useState(1);
  const [devoteeNames, setDevoteeNames] = useState(['']);
  const [bookerName, setBookerName] = useState('');
  const [bookerPhone, setBookerPhone] = useState('');
  const [bookerEmail, setBookerEmail] = useState('');
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

  const selectedEventDetails = eventTypes.find(e => e.id === selectedEvent);
  const totalAmount = (selectedEventDetails?.price || 0) * devoteeCount;

  // Get next 7 days for date selection
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      });
    }
    return days;
  };

  const handleDevoteeCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(10, devoteeCount + delta));
    setDevoteeCount(newCount);
    
    // Adjust devotee names array
    if (newCount > devoteeNames.length) {
      setDevoteeNames([...devoteeNames, ...Array(newCount - devoteeNames.length).fill('')]);
    } else {
      setDevoteeNames(devoteeNames.slice(0, newCount));
    }
  };

  const handleDevoteeNameChange = (index: number, name: string) => {
    const updated = [...devoteeNames];
    updated[index] = name;
    setDevoteeNames(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot",
        variant: "destructive"
      });
      return;
    }

    if (!bookerName.trim() || !bookerPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your contact details",
        variant: "destructive"
      });
      return;
    }

    const filledNames = devoteeNames.filter(n => n.trim());
    if (filledNames.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please enter at least one devotee name",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate booking processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const booking = addBooking({
      templeId: temple.id,
      templeName: temple.name,
      eventType: selectedEvent as 'special-darshan' | 'pooja' | 'abhishekam',
      eventName: selectedEventDetails?.name || '',
      date: selectedDate,
      timeSlot: selectedSlot,
      devotees: devoteeCount,
      devoteeNames: filledNames,
      bookerName: bookerName.trim(),
      bookerPhone: bookerPhone.trim(),
      bookerEmail: bookerEmail.trim() || undefined,
    });
    
    setIsProcessing(false);
    navigate(`/booking/confirmation/${booking.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Book Slot</h1>
            <p className="text-sm text-muted-foreground">{temple.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Service</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedEvent} onValueChange={setSelectedEvent}>
                {eventTypes.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={event.id} id={event.id} />
                      <div>
                        <Label htmlFor={event.id} className="cursor-pointer font-medium">{event.name}</Label>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-primary">₹{event.price}</span>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {getNextDays().map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={selectedDate === day.value ? "default" : "outline"}
                    className="h-auto py-2 px-3 text-xs"
                    onClick={() => setSelectedDate(day.value)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slot Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Select Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    type="button"
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    className="h-10 text-xs"
                    onClick={() => slot.available && setSelectedSlot(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Grey slots are unavailable</p>
            </CardContent>
          </Card>

          {/* Devotee Count */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Number of Devotees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDevoteeCountChange(-1)}
                  disabled={devoteeCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{devoteeCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDevoteeCountChange(1)}
                  disabled={devoteeCount >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {devoteeNames.map((name, index) => (
                  <Input
                    key={index}
                    placeholder={`Devotee ${index + 1} name`}
                    value={name}
                    onChange={(e) => handleDevoteeNameChange(index, e.target.value)}
                    maxLength={100}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookerName">Your Name *</Label>
                <Input
                  id="bookerName"
                  placeholder="Enter your name"
                  value={bookerName}
                  onChange={(e) => setBookerName(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookerPhone">Phone Number *</Label>
                <Input
                  id="bookerPhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={bookerPhone}
                  onChange={(e) => setBookerPhone(e.target.value)}
                  required
                  maxLength={15}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookerEmail">Email (optional)</Label>
                <Input
                  id="bookerEmail"
                  type="email"
                  placeholder="Enter email for confirmation"
                  value={bookerEmail}
                  onChange={(e) => setBookerEmail(e.target.value)}
                  maxLength={255}
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary & Submit */}
          <Card className="bg-accent/30">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default BookSlotPage;
