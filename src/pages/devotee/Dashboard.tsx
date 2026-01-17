import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { useAncestral } from '@/context/AncestralContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { temples, followedTemples, toggleFollowTemple, loading } = useTemple();
  const { donations } = useDonation();
  const { recurringDonations } = useRecurringDonation();
  const { bookings } = useBooking();
  const { user, logout } = useAuth();
  const { savedAncestralTemples, selectedTemple } = useAncestral();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [donationFilter, setDonationFilter] = useState<'all' | 'one-time' | 'recurring'>('all');
  
  // Profile form state
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  const followedTempleDetails = temples.filter(t => followedTemples.includes(t.id));
  const familyTemple = selectedTemple || savedAncestralTemples[0] || null;
  
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
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <TabsList className="inline-flex h-auto p-1.5 bg-muted/50 rounded-full w-max min-w-full sm:min-w-0">
              <TabsTrigger value="overview" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="family" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap">Family Temple</TabsTrigger>
              <TabsTrigger value="temples" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap">My Temples</TabsTrigger>
              <TabsTrigger value="festivals" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap">Festivals</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap">Settings</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Family Temple Card */}
              {familyTemple && (
                <div 
                  className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  onClick={() => handleTabChange('family')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TreePine className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1 line-clamp-1">{familyTemple.name}</p>
                  <p className="text-muted-foreground text-sm">Family Temple</p>
                </div>
              )}

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
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-accent/50 to-accent/20 border border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => handleTabChange('festivals')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent-foreground/50 group-hover:text-accent-foreground group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{upcomingFestivals.length}</p>
                <p className="text-muted-foreground">Upcoming Festivals</p>
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
                <Link to="/family-dashboard" className="group">
                  <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Family Dashboard</span>
                  </div>
                </Link>
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

          {/* Family Temple Tab */}
          <TabsContent value="family" className="space-y-6">
            {familyTemple ? (
              <div className="max-w-2xl mx-auto">
                <Card className="overflow-hidden border-primary/20">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 relative">
                    {familyTemple.image && (
                      <img 
                        src={familyTemple.image} 
                        alt={familyTemple.name}
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <CardContent className="p-6 -mt-12 relative">
                    <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                      ✓ Your Kuladeivam
                    </Badge>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      {familyTemple.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      {familyTemple.location}
                    </div>
                    {familyTemple.primaryDeity && (
                      <p className="text-primary mb-6">Primary Deity: {familyTemple.primaryDeity}</p>
                    )}
                    <div className="flex gap-3">
                      <Link to={`/donate/${familyTemple.id}`} className="flex-1">
                        <Button className="w-full rounded-full gap-2">
                          <Gift className="w-4 h-4" />
                          Donate Now
                        </Button>
                      </Link>
                      <Link to="/family-dashboard">
                        <Button variant="outline" className="rounded-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No family temple saved</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Find and save your ancestral Kuladeivam temple
                </p>
                <Link to="/ancestral/start">
                  <Button className="rounded-full gap-2">
                    Find Your Kuladeivam
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
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

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Upcoming Festivals</h2>
              <p className="text-muted-foreground text-sm mt-1">Don't miss important celebrations</p>
            </div>

            <div className="space-y-3">
              {upcomingFestivals.map((festival, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{festival.name}</p>
                      <p className="text-sm text-muted-foreground">{festival.temple}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{format(festival.date, 'MMM d')}</p>
                    <p className="text-xs text-muted-foreground">{format(festival.date, 'yyyy')}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Profile Settings</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your account details</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSaveProfile} className="rounded-full">
                    Save Changes
                  </Button>
                  {user && (
                    <Button variant="outline" onClick={handleLogout} className="rounded-full text-destructive hover:text-destructive">
                      Sign Out
                    </Button>
                  )}
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
