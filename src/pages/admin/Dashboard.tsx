import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gift, CalendarDays, Users, TrendingUp, Clock, CheckCircle, XCircle, 
  Eye, IndianRupee, ChevronRight
} from 'lucide-react';
import { AdminUser } from './types';
import { loadAdminUser } from './utils/adminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const user = loadAdminUser();
    if (user) {
      setAdminUser(user);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

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
    <AdminLayout 
      title={`Welcome back, ${adminUser.name}`}
      subtitle={adminUser.templeName || 'Your Temple'}
    >
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
                <CalendarDays className="w-6 h-6 text-primary" />
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
                <Link to="/admin/bookings">
                  <Button variant="outline" size="sm" className="gap-2">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
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
                <Link to="/admin/donations">
                  <Button variant="outline" size="sm" className="gap-2">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
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
    </AdminLayout>
  );
};

export default AdminDashboard;
