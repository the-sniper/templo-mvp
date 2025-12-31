import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Gift, CalendarDays, Calendar, Settings, MapPin, ArrowRight, Clock, User, Mail, Phone, Loader2 } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useDonation } from '@/context/DonationContext';
import { useRecurringDonation } from '@/context/RecurringDonationContext';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { temples, followedTemples, toggleFollowTemple, loading } = useTemple();
  const { donations } = useDonation();
  const { recurringDonations } = useRecurringDonation();
  const { bookings } = useBooking();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [donationFilter, setDonationFilter] = useState<'all' | 'one-time' | 'recurring'>('all');
  
  // Profile form state
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const followedTempleDetails = temples.filter(t => followedTemples.includes(t.id));
  
  // Combined donations for display
  const allDonations = [
    ...donations.map(d => ({ ...d, type: 'one-time' as const })),
    ...recurringDonations.map(d => ({ 
      ...d, 
      type: 'recurring' as const,
      amount: d.amount,
      createdAt: d.startDate
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredDonations = donationFilter === 'all' 
    ? allDonations 
    : allDonations.filter(d => d.type === donationFilter);

  // Mock festivals data
  const upcomingFestivals = [
    { name: 'Pongal', date: new Date('2025-01-14'), temple: 'Meenakshi Amman Temple' },
    { name: 'Maha Shivaratri', date: new Date('2025-02-26'), temple: 'Kashi Vishwanath Temple' },
    { name: 'Holi', date: new Date('2025-03-14'), temple: 'All Temples' },
    { name: 'Ram Navami', date: new Date('2025-04-06'), temple: 'Siddhivinayak Temple' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {user ? `Welcome, ${user.name}` : 'My Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            Manage your temple connections, donations, and bookings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="temples" className="text-xs sm:text-sm py-2">My Temples</TabsTrigger>
            <TabsTrigger value="donations" className="text-xs sm:text-sm py-2">Donations</TabsTrigger>
            <TabsTrigger value="bookings" className="text-xs sm:text-sm py-2">Bookings</TabsTrigger>
            <TabsTrigger value="festivals" className="text-xs sm:text-sm py-2">Festivals</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm py-2">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-border/50"
                onClick={() => handleTabChange('temples')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{followedTemples.length}</p>
                      <p className="text-sm text-muted-foreground">Temples Following</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-border/50"
                onClick={() => handleTabChange('donations')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{allDonations.length}</p>
                      <p className="text-sm text-muted-foreground">Total Donations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-border/50"
                onClick={() => handleTabChange('bookings')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                      <CalendarDays className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                      <p className="text-sm text-muted-foreground">Bookings Made</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Link to="/temples">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-xs">Find Temples</span>
                    </Button>
                  </Link>
                  <Link to="/ancestral">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs">Ancestral Temple</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" onClick={() => handleTabChange('donations')}>
                    <Gift className="w-5 h-5" />
                    <span className="text-xs">View Donations</span>
                  </Button>
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" onClick={() => handleTabChange('festivals')}>
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs">Festivals</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Temples Tab */}
          <TabsContent value="temples" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Temples You Follow</CardTitle>
                <CardDescription>Manage your followed temples</CardDescription>
              </CardHeader>
              <CardContent>
                {followedTempleDetails.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">You haven't followed any temples yet</p>
                    <Link to="/temples">
                      <Button className="rounded-full">
                        Explore Temples
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {followedTempleDetails.map(temple => (
                      <Card key={temple.id} className="overflow-hidden border-border/50">
                        <div className="aspect-video relative">
                          <img 
                            src={temple.image} 
                            alt={temple.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground mb-1">{temple.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-3 h-3" />
                            {temple.location}
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/temple/${temple.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full rounded-full">
                                View
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleFollowTemple(temple.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              Unfollow
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Donation History</CardTitle>
                    <CardDescription>View all your donations</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={donationFilter === 'all' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setDonationFilter('all')}
                      className="rounded-full"
                    >
                      All
                    </Button>
                    <Button 
                      variant={donationFilter === 'one-time' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setDonationFilter('one-time')}
                      className="rounded-full"
                    >
                      One-time
                    </Button>
                    <Button 
                      variant={donationFilter === 'recurring' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setDonationFilter('recurring')}
                      className="rounded-full"
                    >
                      Recurring
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredDonations.length === 0 ? (
                  <div className="text-center py-8">
                    <Gift className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No donations found</p>
                    <Link to="/temples">
                      <Button className="rounded-full">
                        Make a Donation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDonations.map((donation, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{donation.templeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(donation.createdAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{donation.amount}</p>
                          <Badge variant={donation.type === 'recurring' ? 'secondary' : 'outline'} className="text-xs">
                            {donation.type === 'recurring' ? 'Recurring' : 'One-time'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>Manage your temple visit bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarDays className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Link to="/temples">
                      <Button className="rounded-full">
                        Book a Visit
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{booking.templeName}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {format(new Date(booking.date), 'MMM d, yyyy')} at {booking.timeSlot.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Upcoming Festivals</CardTitle>
                <CardDescription>Temple festivals and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingFestivals.map((festival, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{festival.name}</p>
                          <p className="text-sm text-muted-foreground">{festival.temple}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {format(festival.date, 'MMM d')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="firstName" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lastName" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={handleSaveProfile} className="rounded-full">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleLogout} className="rounded-full text-destructive hover:text-destructive">
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
