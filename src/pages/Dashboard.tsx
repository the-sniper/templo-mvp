import { useState, useMemo, useEffect } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, Calendar, MapPin, User, Receipt, LogOut, 
  Sparkles, ChevronRight, Menu, CreditCard, 
  Filter, List, CalendarDays, Eye, Settings, Save
} from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useAuth } from '@/context/AuthContext';
import { useDonation } from '@/context/DonationContext';
import { useBooking } from '@/context/BookingContext';
import { useRecurringDonation } from '@/context/RecurringDonationContext';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type TabType = 'overview' | 'temples' | 'donations' | 'bookings' | 'festivals' | 'settings';
type DonationFilter = 'all' | 'one-time' | 'recurring';
type FestivalView = 'list' | 'calendar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { temples, followedTemples, toggleFollowTemple } = useTemple();
  const { user, isAuthenticated, logout } = useAuth();
  const { donations } = useDonation();
  const { bookings } = useBooking();
  const { recurringDonations } = useRecurringDonation();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Get initial tab from URL or default to overview
  const tabFromUrl = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl || 'overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [donationFilter, setDonationFilter] = useState<DonationFilter>('all');
  const [festivalView, setFestivalView] = useState<FestivalView>('list');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
  });

  // Update tab when URL changes
  useEffect(() => {
    if (tabFromUrl && ['overview', 'temples', 'donations', 'bookings', 'festivals', 'settings'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`/dashboard?tab=${tab}`, { replace: true });
    setSidebarOpen(false);
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const followedTemplesList = useMemo(() => {
    return temples.filter(temple => followedTemples.includes(temple.id));
  }, [temples, followedTemples]);

  const upcomingFestivals = useMemo(() => {
    const festivals: Array<{
      id: string;
      title: string;
      date: string;
      templeName: string;
      templeId: string;
      type: string;
      content: string;
    }> = [];

    followedTemplesList.forEach(temple => {
      temple.announcements
        .filter(a => a.type === 'festival' || a.type === 'event')
        .forEach(announcement => {
          festivals.push({
            id: announcement.id,
            title: announcement.title,
            date: announcement.date,
            templeName: temple.name,
            templeId: temple.id,
            type: announcement.type,
            content: announcement.content,
          });
        });
    });

    return festivals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [followedTemplesList]);

  // Combined donations list
  const allDonations = useMemo(() => {
    const oneTime = donations.map(d => ({
      ...d,
      donationType: 'one-time' as const,
      frequency: null,
    }));
    
    const recurring = recurringDonations.map(d => ({
      id: d.id,
      templeId: d.templeId,
      templeName: d.templeName,
      amount: d.amount,
      donorName: d.donorName,
      donorPhone: d.donorPhone,
      donorEmail: d.donorEmail,
      createdAt: d.createdAt,
      receiptNumber: d.id,
      transactionId: d.id,
      status: d.status,
      donationType: 'recurring' as const,
      frequency: d.frequency,
    }));

    let combined = [...oneTime, ...recurring];
    
    if (donationFilter === 'one-time') {
      combined = oneTime;
    } else if (donationFilter === 'recurring') {
      combined = recurring;
    }

    return combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [donations, recurringDonations, donationFilter]);

  // Get festivals for selected date in calendar
  const festivalsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return upcomingFestivals.filter(f => {
      const festivalDate = new Date(f.date);
      return festivalDate.toDateString() === selectedDate.toDateString();
    });
  }, [upcomingFestivals, selectedDate]);

  // Get all dates that have festivals
  const festivalDates = useMemo(() => {
    return upcomingFestivals.map(f => new Date(f.date));
  }, [upcomingFestivals]);

  const formatDate = (dateValue: string | Date) => {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const navItems = [
    { id: 'overview' as TabType, label: 'Overview', icon: User },
    { id: 'temples' as TabType, label: 'My Temples', icon: Heart },
    { id: 'donations' as TabType, label: 'Donations', icon: Receipt },
    { id: 'bookings' as TabType, label: 'Bookings', icon: Calendar },
    { id: 'festivals' as TabType, label: 'Festivals', icon: Sparkles },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  const NavItem = ({ item, mobile = false }: { item: typeof navItems[0]; mobile?: boolean }) => (
    <button
      onClick={() => handleTabChange(item.id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        activeTab === item.id
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
            {/* User Info */}
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{user?.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-3">
              {navItems.map(item => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>

            {/* Stats */}
            <div className="border-t border-border p-4">
              <div className="grid grid-cols-2 gap-2 text-center">
                <button 
                  onClick={() => handleTabChange('temples')}
                  className="rounded-lg bg-accent/50 p-2 hover:bg-accent transition-colors"
                >
                  <p className="text-lg font-bold text-primary">{followedTemples.length}</p>
                  <p className="text-xs text-muted-foreground">Temples</p>
                </button>
                <button 
                  onClick={() => handleTabChange('donations')}
                  className="rounded-lg bg-accent/50 p-2 hover:bg-accent transition-colors"
                >
                  <p className="text-lg font-bold text-primary">{allDonations.length}</p>
                  <p className="text-xs text-muted-foreground">Donations</p>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="border-t border-border p-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-border bg-card transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* User Info */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{user?.name}</p>
                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 p-3">
            {navItems.map(item => (
              <NavItem key={item.id} item={item} mobile />
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Mobile Header Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-2 lg:hidden">
          <div className="flex justify-around">
            {navItems.slice(0, 5).map(item => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-2 transition-colors",
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}!</h1>
                <p className="text-muted-foreground">Manage your temples, donations, and bookings</p>
              </div>

              {/* Quick Stats - Clickable */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card 
                  className="border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleTabChange('temples')}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{followedTemples.length}</p>
                      <p className="text-sm text-muted-foreground">Temples Following</p>
                    </div>
                  </CardContent>
                </Card>
                <Card 
                  className="border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleTabChange('donations')}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Receipt className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{donations.length}</p>
                      <p className="text-sm text-muted-foreground">One-time Donations</p>
                    </div>
                  </CardContent>
                </Card>
                <Card 
                  className="border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleTabChange('donations')}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{recurringDonations.length}</p>
                      <p className="text-sm text-muted-foreground">Recurring Donations</p>
                    </div>
                  </CardContent>
                </Card>
                <Card 
                  className="border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleTabChange('bookings')}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                      <p className="text-sm text-muted-foreground">Bookings</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Temples */}
                <Card className="border border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Followed Temples</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleTabChange('temples')}
                        className="text-primary"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {followedTemplesList.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No temples followed yet</p>
                    ) : (
                      <div className="space-y-3">
                        {followedTemplesList.slice(0, 3).map(temple => (
                          <Link 
                            key={temple.id} 
                            to={`/temple/${temple.id}`}
                            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
                          >
                            <img
                              src={temple.image}
                              alt={temple.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-foreground">{temple.name}</p>
                              <p className="truncate text-sm text-muted-foreground">{temple.city}, {temple.state}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Upcoming Festivals */}
                <Card className="border border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Upcoming Festivals</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleTabChange('festivals')}
                        className="text-primary"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {upcomingFestivals.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No upcoming festivals</p>
                    ) : (
                      <div className="space-y-3">
                        {upcomingFestivals.slice(0, 3).map((festival, idx) => (
                          <div key={`${festival.id}-${idx}`} className="flex items-center gap-3 rounded-lg p-2">
                            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <span className="text-sm font-bold">{new Date(festival.date).getDate()}</span>
                              <span className="text-xs uppercase">{new Date(festival.date).toLocaleDateString('en', { month: 'short' })}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-foreground">{festival.title}</p>
                              <p className="truncate text-sm text-muted-foreground">{festival.templeName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* My Temples Tab */}
          {activeTab === 'temples' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Temples</h1>
                <p className="text-muted-foreground">{followedTemplesList.length} temples following</p>
              </div>

              {followedTemplesList.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No temples followed</h3>
                    <p className="text-muted-foreground mb-4">Start following temples to see them here</p>
                    <Link to="/temples">
                      <Button>Explore Temples</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {followedTemplesList.map(temple => (
                    <Card key={temple.id} className="overflow-hidden transition-all hover:shadow-md">
                      <Link to={`/temple/${temple.id}`}>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={temple.image}
                            alt={temple.name}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/temple/${temple.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                            {temple.name}
                          </h3>
                        </Link>
                        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="line-clamp-1">{temple.city}, {temple.state}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            <Sparkles className="mr-1 h-3 w-3" />
                            {temple.deity}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => toggleFollowTemple(temple.id)}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Donations Tab - Combined List */}
          {activeTab === 'donations' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Donations</h1>
                  <p className="text-muted-foreground">Your donation history and receipts</p>
                </div>
                
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={donationFilter} onValueChange={(v) => setDonationFilter(v as DonationFilter)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Donations</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    Donation History
                  </CardTitle>
                  <CardDescription>
                    {allDonations.length} donation{allDonations.length !== 1 ? 's' : ''} 
                    {donationFilter !== 'all' && ` (${donationFilter})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {allDonations.length === 0 ? (
                    <div className="py-8 text-center">
                      <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No donations yet</p>
                      <Link to="/temples" className="mt-2 inline-block text-primary hover:underline">
                        Explore temples to donate
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Temple</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Receipt</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allDonations.map(donation => (
                            <TableRow key={`${donation.donationType}-${donation.id}`}>
                              <TableCell className="font-medium">{donation.templeName}</TableCell>
                              <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant={donation.donationType === 'recurring' ? 'default' : 'secondary'}>
                                  {donation.donationType === 'recurring' ? (
                                    <span className="capitalize">{donation.frequency}</span>
                                  ) : (
                                    'One-time'
                                  )}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(donation.createdAt)}</TableCell>
                              <TableCell>
                                <Badge variant={donation.status === 'completed' || donation.status === 'active' ? 'default' : 'secondary'}>
                                  {donation.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {donation.donationType === 'one-time' ? (
                                  <Link 
                                    to={`/donation/receipt/${donation.id}`} 
                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Link>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
                <p className="text-muted-foreground">Your darshan and event bookings</p>
              </div>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Booking History
                  </CardTitle>
                  <CardDescription>{bookings.length} total bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="py-8 text-center">
                      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No bookings yet</p>
                      <Link to="/temples" className="mt-2 inline-block text-primary hover:underline">
                        Book a darshan slot
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Temple</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Devotees</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">{booking.templeName}</TableCell>
                              <TableCell>{booking.eventName}</TableCell>
                              <TableCell>{formatDate(booking.date)}</TableCell>
                              <TableCell>{booking.timeSlot}</TableCell>
                              <TableCell>{booking.devotees}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    booking.status === 'confirmed' ? 'default' :
                                    booking.status === 'cancelled' ? 'destructive' : 'secondary'
                                  }
                                >
                                  {booking.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Festivals Tab - Calendar & List View */}
          {activeTab === 'festivals' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Upcoming Festivals</h1>
                  <p className="text-muted-foreground">Festivals at your followed temples</p>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-1 rounded-lg bg-accent p-1">
                  <Button
                    variant={festivalView === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFestivalView('list')}
                    className="gap-2"
                  >
                    <List className="h-4 w-4" />
                    List
                  </Button>
                  <Button
                    variant={festivalView === 'calendar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFestivalView('calendar')}
                    className="gap-2"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Calendar
                  </Button>
                </div>
              </div>

              {upcomingFestivals.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No upcoming festivals</h3>
                    <p className="text-muted-foreground">Follow more temples to see their festivals</p>
                  </CardContent>
                </Card>
              ) : festivalView === 'list' ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingFestivals.map((festival, idx) => (
                    <Card key={`${festival.id}-${idx}`} className="overflow-hidden transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-lg font-bold leading-none">
                              {new Date(festival.date).getDate()}
                            </span>
                            <span className="text-xs uppercase">
                              {new Date(festival.date).toLocaleDateString('en', { month: 'short' })}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground line-clamp-1">{festival.title}</h3>
                            <Link 
                              to={`/temple/${festival.templeId}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {festival.templeName}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {festival.content}
                            </p>
                            <Badge 
                              variant={festival.type === 'festival' ? 'default' : 'secondary'}
                              className="mt-2 text-xs capitalize"
                            >
                              {festival.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Calendar */}
                  <Card className="border border-border/50">
                    <CardContent className="p-4">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md"
                        modifiers={{
                          festival: festivalDates,
                        }}
                        modifiersClassNames={{
                          festival: "bg-primary/20 text-primary font-bold",
                        }}
                      />
                    </CardContent>
                  </Card>

                  {/* Events on Selected Date */}
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {selectedDate ? formatDate(selectedDate) : 'Select a date'}
                      </CardTitle>
                      <CardDescription>
                        {festivalsOnSelectedDate.length} event{festivalsOnSelectedDate.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {festivalsOnSelectedDate.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No festivals on this date
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {festivalsOnSelectedDate.map((festival, idx) => (
                            <div 
                              key={`${festival.id}-${idx}`} 
                              className="rounded-lg border border-border p-4"
                            >
                              <h4 className="font-semibold text-foreground">{festival.title}</h4>
                              <Link 
                                to={`/temple/${festival.templeId}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {festival.templeName}
                              </Link>
                              <p className="mt-2 text-sm text-muted-foreground">{festival.content}</p>
                              <Badge 
                                variant={festival.type === 'festival' ? 'default' : 'secondary'}
                                className="mt-2 text-xs capitalize"
                              >
                                {festival.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab - Profile */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile and preferences</p>
              </div>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-5 w-5" />
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
