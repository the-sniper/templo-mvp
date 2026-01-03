import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarDays, Search, Clock, Users, CheckCircle, XCircle, 
  Eye, Calendar, User, Phone
} from 'lucide-react';
import { Booking } from './types';
import { useToast } from '@/hooks/use-toast';

// Mock booking data
const mockBookings: Booking[] = [
  { id: '1', devoteName: 'Ramesh Kumar', devotePhone: '+91 98765 43210', type: 'darshan', date: '2024-01-16', timeSlot: '10:00 AM', numberOfPeople: 4, status: 'pending', createdAt: '2024-01-14' },
  { id: '2', devoteName: 'Priya Sharma', devotePhone: '+91 87654 32109', devoteEmail: 'priya@email.com', type: 'pooja', date: '2024-01-16', timeSlot: '11:30 AM', numberOfPeople: 2, status: 'confirmed', specialRequests: 'Satyanarayan Pooja', createdAt: '2024-01-13' },
  { id: '3', devoteName: 'Suresh Reddy', devotePhone: '+91 76543 21098', type: 'darshan', date: '2024-01-17', timeSlot: '09:00 AM', numberOfPeople: 6, status: 'pending', createdAt: '2024-01-14' },
  { id: '4', devoteName: 'Lakshmi Devi', devotePhone: '+91 65432 10987', type: 'special_darshan', date: '2024-01-17', timeSlot: '06:00 AM', numberOfPeople: 2, status: 'confirmed', specialRequests: 'VIP Darshan', createdAt: '2024-01-12' },
  { id: '5', devoteName: 'Venkat Rao', devotePhone: '+91 54321 09876', type: 'pooja', date: '2024-01-18', timeSlot: '07:00 AM', numberOfPeople: 5, status: 'pending', specialRequests: 'Abhishekam', createdAt: '2024-01-14' },
  { id: '6', devoteName: 'Meera Iyer', devotePhone: '+91 43210 98765', type: 'darshan', date: '2024-01-15', timeSlot: '04:00 PM', numberOfPeople: 3, status: 'completed', createdAt: '2024-01-10' },
  { id: '7', devoteName: 'Arun Kumar', devotePhone: '+91 32109 87654', type: 'darshan', date: '2024-01-14', timeSlot: '02:00 PM', numberOfPeople: 2, status: 'cancelled', createdAt: '2024-01-08' },
];

const AdminBookings = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    ));
    
    const statusMessages = {
      confirmed: 'Booking confirmed successfully',
      rejected: 'Booking rejected',
      completed: 'Booking marked as completed',
      cancelled: 'Booking cancelled'
    };
    
    toast({
      title: statusMessages[newStatus] || 'Status updated',
      description: `Booking #${bookingId} has been updated.`
    });
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled' || b.status === 'rejected');

  const filterBookings = (list: Booking[]) => {
    return list.filter(booking => {
      const matchesSearch = booking.devoteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            booking.devotePhone.includes(searchQuery);
      const matchesType = typeFilter === 'all' || booking.type === typeFilter;
      return matchesSearch && matchesType;
    });
  };

  const getTypeBadge = (type: Booking['type']) => {
    const typeConfig: Record<string, { label: string; className: string }> = {
      darshan: { label: 'Darshan', className: 'bg-primary/10 text-primary border-primary/20' },
      pooja: { label: 'Pooja', className: 'bg-secondary/30 text-secondary-foreground border-secondary/30' },
      special_darshan: { label: 'VIP Darshan', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' }
    };
    const config = typeConfig[type];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: Booking['status']) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
      confirmed: { label: 'Confirmed', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
      completed: { label: 'Completed', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
      rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
      cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground border-muted' }
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-semibold">{booking.devoteName.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-foreground">{booking.devoteName}</p>
              {getTypeBadge(booking.type)}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {booking.timeSlot}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {booking.numberOfPeople} people
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {booking.devotePhone}
              </span>
            </div>
            {booking.specialRequests && (
              <p className="text-sm text-primary mt-1">
                Request: {booking.specialRequests}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:ml-auto">
          {booking.status === 'pending' ? (
            <>
              <Button 
                size="sm" 
                className="gap-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleStatusChange(booking.id, 'confirmed')}
              >
                <CheckCircle className="w-4 h-4" />
                Confirm
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                className="gap-1"
                onClick={() => handleStatusChange(booking.id, 'rejected')}
              >
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            </>
          ) : (
            getStatusBadge(booking.status)
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Bookings" subtitle="Manage darshan and pooja slot bookings">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingBookings.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed Today</p>
                <p className="text-2xl font-bold text-foreground">{confirmedBookings.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Devotees</p>
                <p className="text-2xl font-bold text-foreground">
                  {bookings.reduce((sum, b) => sum + b.numberOfPeople, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="darshan">Darshan</SelectItem>
                <SelectItem value="pooja">Pooja</SelectItem>
                <SelectItem value="special_darshan">VIP Darshan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="pending" className="gap-2">
            Pending
            {pendingBookings.length > 0 && (
              <Badge className="ml-1 h-5 px-1.5 bg-orange-500 text-white">{pendingBookings.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pending Requests</CardTitle>
              <CardDescription>Bookings awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filterBookings(pendingBookings).length > 0 ? (
                filterBookings(pendingBookings).map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No pending bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmed">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Confirmed Bookings</CardTitle>
              <CardDescription>Upcoming confirmed bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filterBookings(confirmedBookings).length > 0 ? (
                filterBookings(confirmedBookings).map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No confirmed bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Booking History</CardTitle>
              <CardDescription>Past and cancelled bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filterBookings(completedBookings).length > 0 ? (
                filterBookings(completedBookings).map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No booking history</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminBookings;
