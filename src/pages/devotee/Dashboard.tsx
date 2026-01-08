import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TempleCard from '@/components/TempleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Gift, CalendarDays, Calendar, MapPin, ArrowRight, Clock, User, Mail, Phone, Loader2, Sparkles, TreePine } from 'lucide-react';
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
  const [phone, setPhone] = useState('');

  const followedTempleDetails = temples.filter(t => followedTemples.includes(t.id));
  
  // Combined donations for display
  const allDonations = [
    ...donations.map(d => ({ ...d, type: 'one-time' as const })),
    ...recurringDonations.map(d => ({ 
      ...d, 
      type: 'recurring' as const,
      amount: d.amount,
      createdAt: d.createdAt
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
      
      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-10">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1.5" />
            Your Spiritual Journey
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {user ? `Namaste, ${user.name}` : 'My Dashboard'}
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your temple connections, donations, and bookings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="inline-flex h-auto p-1.5 bg-muted/50 rounded-full">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="temples" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">My Temples</TabsTrigger>
            <TabsTrigger value="donations" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Donations</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Bookings</TabsTrigger>
            <TabsTrigger value="festivals" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Festivals</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div 
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => handleTabChange('temples')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{followedTemples.length}</p>
                <p className="text-muted-foreground">Temples Following</p>
              </div>

              <div 
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-secondary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => handleTabChange('donations')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gift className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-secondary-foreground/50 group-hover:text-secondary-foreground group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{allDonations.length}</p>
                <p className="text-muted-foreground">Total Donations</p>
              </div>

              <div 
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-accent/50 to-accent/20 border border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => handleTabChange('bookings')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CalendarDays className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent-foreground/50 group-hover:text-accent-foreground group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{bookings.length}</p>
                <p className="text-muted-foreground">Bookings Made</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link to="/temples" className="group">
                  <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Find Temples</span>
                  </div>
                </Link>
                <Link to="/ancestral" className="group">
                  <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <TreePine className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Ancestral Temple</span>
                  </div>
                </Link>
                <button onClick={() => handleTabChange('donations')} className="group">
                  <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center w-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">View Donations</span>
                  </div>
                </button>
                <button onClick={() => handleTabChange('festivals')} className="group">
                  <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center w-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Festivals</span>
                  </div>
                </button>
              </div>
            </div>
          </TabsContent>

          {/* My Temples Tab */}
          <TabsContent value="temples" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">Temples You Follow</h2>
                <p className="text-muted-foreground text-sm mt-1">Stay connected with your favorite temples</p>
              </div>
              <Link to="/temples">
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <MapPin className="w-4 h-4" />
                  Find More
                </Button>
              </Link>
            </div>
            
            {followedTempleDetails.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No temples followed yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Explore temples and follow the ones that resonate with your faith
                </p>
                <Link to="/temples">
                  <Button className="rounded-full gap-2">
                    Explore Temples
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {followedTempleDetails.map(temple => (
                  <TempleCard key={temple.id} temple={temple} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">Donation History</h2>
                <p className="text-muted-foreground text-sm mt-1">Track all your contributions</p>
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
            
            {filteredDonations.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No donations found</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Support your favorite temples with a donation
                </p>
                <Link to="/temples">
                  <Button className="rounded-full gap-2">
                    Make a Donation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-border transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
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
                      <p className="font-semibold text-foreground text-lg">₹{donation.amount}</p>
                      <Badge variant={donation.type === 'recurring' ? 'secondary' : 'outline'} className="text-xs">
                        {donation.type === 'recurring' ? 'Recurring' : 'One-time'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">Your Bookings</h2>
                <p className="text-muted-foreground text-sm mt-1">Manage your temple visit schedules</p>
              </div>
            </div>
            
            {bookings.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Book a darshan slot at your favorite temple
                </p>
                <Link to="/temples">
                  <Button className="rounded-full gap-2">
                    Book a Visit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-border transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/50 flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{booking.templeName}</p>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {format(new Date(booking.date), 'MMM d, yyyy')} at {booking.timeSlot}
                        </div>
                      </div>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="capitalize">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Upcoming Festivals</h2>
              <p className="text-muted-foreground text-sm mt-1">Temple festivals and important dates</p>
            </div>
            
            <div className="space-y-3">
              {upcomingFestivals.map((festival, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-border transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{festival.name}</p>
                      <p className="text-sm text-muted-foreground">{festival.temple}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {format(festival.date, 'MMM d')}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Profile Settings</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your account and spiritual profile</p>
            </div>
            
            {/* Personal Information */}
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
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
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
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
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
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
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Profile - correlates with admin devotee data */}
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Spiritual Profile</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="gotra" className="text-sm font-medium">Gotra</Label>
                    <Input 
                      id="gotra" 
                      placeholder="e.g., Bharadwaja, Kashyapa"
                    />
                    <p className="text-xs text-muted-foreground">Your family lineage (for rituals)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nakshatra" className="text-sm font-medium">Nakshatra (Birth Star)</Label>
                    <Input 
                      id="nakshatra" 
                      placeholder="e.g., Rohini, Ashwini"
                    />
                    <p className="text-xs text-muted-foreground">Your birth star (for poojas)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="rashi" className="text-sm font-medium">Rashi (Moon Sign)</Label>
                    <Input 
                      id="rashi" 
                      placeholder="e.g., Mesha, Vrishabha"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nativePlace" className="text-sm font-medium">Native Place</Label>
                    <Input 
                      id="nativePlace" 
                      placeholder="e.g., Chennai, Tamil Nadu"
                    />
                    <p className="text-xs text-muted-foreground">Helps connect with ancestral temples</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={handleSaveProfile} className="rounded-full gap-2">
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleLogout} className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10">
                Logout
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
