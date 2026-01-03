import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, Users, Gift, CalendarDays, BarChart3, Settings, LogOut, 
  Bell, TrendingUp, Clock, CheckCircle, XCircle, Eye, IndianRupee,
  Menu, X, ChevronRight, Megaphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  email: string;
  name: string;
  templeName?: string;
  role: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('adminUser');
    if (stored) {
      setAdminUser(JSON.parse(stored));
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/admin');
  };

  // Mock dashboard data
  const stats = {
    totalDonations: 245600,
    monthlyDonations: 32400,
    pendingBookings: 12,
    confirmedBookings: 48,
    totalDevotees: 1250,
    newDevotees: 23
  };

  const recentBookings = [
    { id: 1, name: 'Ramesh Kumar', type: 'Darshan', date: '2024-01-15', time: '10:00 AM', status: 'pending' },
    { id: 2, name: 'Priya Sharma', type: 'Pooja', date: '2024-01-15', time: '11:30 AM', status: 'confirmed' },
    { id: 3, name: 'Suresh Reddy', type: 'Darshan', date: '2024-01-16', time: '09:00 AM', status: 'pending' },
    { id: 4, name: 'Lakshmi Devi', type: 'Special Pooja', date: '2024-01-16', time: '06:00 AM', status: 'confirmed' },
  ];

  const recentDonations = [
    { id: 1, name: 'Anonymous', amount: 5001, type: 'General', date: '2024-01-15' },
    { id: 2, name: 'Venkat Rao', amount: 11000, type: 'Temple Renovation', date: '2024-01-14' },
    { id: 3, name: 'Meera Iyer', amount: 2100, type: 'Annadanam', date: '2024-01-14' },
    { id: 4, name: 'Arun Kumar', amount: 501, type: 'General', date: '2024-01-13' },
  ];

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border/50 transition-all duration-300 fixed h-full z-40`}>
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <span className="font-serif font-bold text-foreground">Temple Admin</span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="p-2 space-y-1">
          {[
            { icon: BarChart3, label: 'Dashboard', active: true },
            { icon: CalendarDays, label: 'Bookings' },
            { icon: Gift, label: 'Donations' },
            { icon: Users, label: 'Devotees' },
            { icon: Megaphone, label: 'Announcements' },
            { icon: Building2, label: 'Temple Profile' },
            { icon: Settings, label: 'Settings' },
          ].map((item, index) => (
            <Button
              key={index}
              variant={item.active ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome back, {adminUser.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {adminUser.templeName || 'Your Temple'} • {adminUser.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Donations</p>
                    <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {stats.totalDonations.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {stats.confirmedBookings} confirmed today
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Devotees</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalDevotees.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +{stats.newDevotees} new this week
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {stats.monthlyDonations.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  From 89 donations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="bookings" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              <TabsTrigger value="donations">Recent Donations</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Booking Requests</CardTitle>
                      <CardDescription>Manage darshan and pooja bookings</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">
                              {booking.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{booking.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.type} • {booking.date} at {booking.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className={booking.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}
                          >
                            {booking.status}
                          </Badge>
                          {booking.status === 'pending' && (
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-500/10">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donations">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Recent Donations</CardTitle>
                      <CardDescription>Track and manage temple donations</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDonations.map((donation) => (
                      <div 
                        key={donation.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{donation.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {donation.type} • {donation.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground flex items-center">
                            <IndianRupee className="w-4 h-4" />
                            {donation.amount.toLocaleString()}
                          </span>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
