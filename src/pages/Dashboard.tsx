import { useState, useMemo } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { 
  Heart, Calendar, MapPin, User, Receipt, Settings, LogOut, 
  Sparkles, ChevronRight, Home, Menu, X, CreditCard
} from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useAuth } from '@/context/AuthContext';
import { useDonation } from '@/context/DonationContext';
import { useBooking } from '@/context/BookingContext';
import { useRecurringDonation } from '@/context/RecurringDonationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type TabType = 'overview' | 'temples' | 'donations' | 'bookings' | 'festivals';

const Dashboard = () => {
  const location = useLocation();
  const { temples, followedTemples, toggleFollowTemple } = useTemple();
  const { user, isAuthenticated, logout } = useAuth();
  const { donations } = useDonation();
  const { bookings } = useBooking();
  const { recurringDonations } = useRecurringDonation();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
  ];

  const NavItem = ({ item, mobile = false }: { item: typeof navItems[0]; mobile?: boolean }) => (
    <button
      onClick={() => {
        setActiveTab(item.id);
        if (mobile) setSidebarOpen(false);
      }}
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
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Templo</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout} 
              className="gap-2 text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

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
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold text-primary">{followedTemples.length}</p>
                  <p className="text-xs text-muted-foreground">Temples</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold text-primary">{donations.length}</p>
                  <p className="text-xs text-muted-foreground">Donations</p>
                </div>
              </div>
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}!</h1>
                <p className="text-muted-foreground">Manage your temples, donations, and bookings</p>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border border-border/50">
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
                <Card className="border border-border/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Receipt className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{donations.length}</p>
                      <p className="text-sm text-muted-foreground">Donations Made</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-border/50">
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
                <Card className="border border-border/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{recurringDonations.length}</p>
                      <p className="text-sm text-muted-foreground">Recurring</p>
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
                        onClick={() => setActiveTab('temples')}
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
                        onClick={() => setActiveTab('festivals')}
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
                    <Link to="/">
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

          {/* Donations Tab */}
          {activeTab === 'donations' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Donations</h1>
                <p className="text-muted-foreground">Your donation history and receipts</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* One-time Donations */}
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-primary" />
                      One-time Donations
                    </CardTitle>
                    <CardDescription>{donations.length} donations made</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {donations.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No donations yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Temple</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Receipt</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {donations.slice(0, 5).map(donation => (
                              <TableRow key={donation.id}>
                                <TableCell className="font-medium">{donation.templeName}</TableCell>
                                <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                                <TableCell>{formatDate(donation.createdAt)}</TableCell>
                                <TableCell>
                                  <Link to={`/donate/receipt/${donation.id}`} className="text-primary hover:underline">
                                    View
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recurring Donations */}
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Recurring Donations
                    </CardTitle>
                    <CardDescription>{recurringDonations.length} active subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recurringDonations.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No recurring donations</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Temple</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Frequency</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recurringDonations.slice(0, 5).map(donation => (
                              <TableRow key={donation.id}>
                                <TableCell className="font-medium">{donation.templeName}</TableCell>
                                <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                                <TableCell className="capitalize">{donation.frequency}</TableCell>
                                <TableCell>
                                  <Badge variant={donation.status === 'active' ? 'default' : 'secondary'}>
                                    {donation.status}
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
                      <Link to="/" className="mt-2 inline-block text-primary hover:underline">
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

          {/* Festivals Tab */}
          {activeTab === 'festivals' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Upcoming Festivals</h1>
                <p className="text-muted-foreground">Festivals at your followed temples</p>
              </div>

              {upcomingFestivals.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No upcoming festivals</h3>
                    <p className="text-muted-foreground">Follow more temples to see their festivals</p>
                  </CardContent>
                </Card>
              ) : (
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
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;