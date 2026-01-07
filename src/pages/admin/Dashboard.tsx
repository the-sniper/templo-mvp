import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gift, CalendarDays, Users, TrendingUp, Clock, CheckCircle, XCircle, 
  Eye, IndianRupee, ChevronRight, ArrowUpRight, ArrowDownRight, 
  Megaphone, Flame
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

  const stats = {
    totalDonations: 245600,
    monthlyDonations: 32400,
    lastMonthDonations: 28900,
    pendingBookings: 12,
    confirmedBookings: 48,
    totalDevotees: 1250,
    newDevotees: 23,
    monthlyGrowth: 12
  };

  const donationGrowth = ((stats.monthlyDonations - stats.lastMonthDonations) / stats.lastMonthDonations * 100).toFixed(1);
  const isPositiveGrowth = stats.monthlyDonations > stats.lastMonthDonations;

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

  const quickActions = [
    { icon: CalendarDays, label: 'New Booking', path: '/admin/bookings', color: 'text-blue-600' },
    { icon: Megaphone, label: 'Announcement', path: '/admin/announcements', color: 'text-orange-600' },
    { icon: Gift, label: 'Record Donation', path: '/admin/donations', color: 'text-green-600' },
  ];

  if (!adminUser) {
    return null;
  }

  return (
    <AdminLayout 
      title={`Welcome back, ${adminUser.name?.split(' ')[0] || 'Admin'}`}
      subtitle={adminUser.templeName || 'Your Temple Dashboard'}
    >
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.path}>
            <Button variant="outline" className="gap-2 bg-background hover:bg-muted/50">
              <action.icon className={`w-4 h-4 ${action.color}`} />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Donations</p>
                <p className="text-2xl font-bold text-foreground flex items-center gap-0.5">
                  <IndianRupee className="w-5 h-5" />
                  {stats.totalDonations.toLocaleString()}
                </p>
                <div className={`mt-2 flex items-center gap-1 text-xs ${isPositiveGrowth ? 'text-green-600' : 'text-destructive'}`}>
                  {isPositiveGrowth ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {donationGrowth}% from last month
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Bookings</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
                <div className="mt-2">
                  <Progress value={75} className="h-1.5 w-24" />
                  <p className="text-xs text-muted-foreground mt-1">{stats.confirmedBookings} confirmed</p>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Devotees</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDevotees.toLocaleString()}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +{stats.newDevotees} this week
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold text-foreground flex items-center gap-0.5">
                  <IndianRupee className="w-5 h-5" />
                  {stats.monthlyDonations.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">From 89 donations</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
                <CardDescription>Manage darshan and pooja requests</CardDescription>
              </div>
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {booking.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{booking.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.type} • {booking.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary"
                    className={booking.status === 'confirmed' 
                      ? 'bg-green-500/10 text-green-600 border-0' 
                      : 'bg-orange-500/10 text-orange-600 border-0'
                    }
                  >
                    {booking.status}
                  </Badge>
                  {booking.status === 'pending' && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-green-600 hover:bg-green-500/10">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Donations</CardTitle>
                <CardDescription>Latest contributions from devotees</CardDescription>
              </div>
              <Link to="/admin/donations">
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentDonations.map((donation) => (
              <div 
                key={donation.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{donation.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {donation.type} • {donation.date}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-foreground flex items-center text-sm">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {donation.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
