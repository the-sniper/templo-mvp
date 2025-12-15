import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, User, Receipt, Calendar, Heart, Settings, Mail, Phone, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useDonation } from '@/context/DonationContext';
import { useBooking } from '@/context/BookingContext';
import { useRecurringDonation } from '@/context/RecurringDonationContext';
import { useTemple } from '@/context/TempleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MyAccount = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { donations } = useDonation();
  const { bookings } = useBooking();
  const { recurringDonations } = useRecurringDonation();
  const { followedTemples, temples } = useTemple();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formatDate = (dateValue: string | Date) => {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateValue: string | Date) => {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFollowedTempleDetails = () => {
    return temples.filter(temple => followedTemples.includes(temple.id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <Card className="border border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
                  <div className="mt-2 flex flex-col gap-1 text-muted-foreground sm:flex-row sm:gap-4">
                    <span className="flex items-center justify-center gap-1 sm:justify-start">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Badge variant="secondary">
                      <Heart className="mr-1 h-3 w-3" />
                      {followedTemples.length} Temples Following
                    </Badge>
                    <Badge variant="secondary">
                      <Receipt className="mr-1 h-3 w-3" />
                      {donations.length} Donations
                    </Badge>
                    <Badge variant="secondary">
                      <Calendar className="mr-1 h-3 w-3" />
                      {bookings.length} Bookings
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-2 bg-muted/50 p-1">
            <TabsTrigger value="donations" className="text-xs sm:text-sm">
              Donations
            </TabsTrigger>
            <TabsTrigger value="recurring" className="text-xs sm:text-sm">
              Recurring
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-xs sm:text-sm">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="following" className="text-xs sm:text-sm">
              Following
            </TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Donation History
                </CardTitle>
                <CardDescription>All your one-time donations and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                {donations.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Receipt className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No donations yet</p>
                    <Link to="/" className="mt-2 inline-block text-primary hover:underline">
                      Explore temples to make a donation
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Temple</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Receipt</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.templeName}</TableCell>
                            <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                            <TableCell>{formatDate(donation.createdAt)}</TableCell>
                            <TableCell>
                              <Link
                                to={`/donate/receipt/${donation.id}`}
                                className="text-primary hover:underline"
                              >
                                {donation.receiptNumber}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={donation.status === 'completed' ? 'default' : 'secondary'}
                              >
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
          </TabsContent>

          {/* Recurring Donations Tab */}
          <TabsContent value="recurring">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Recurring Donations
                </CardTitle>
                <CardDescription>Your active recurring donation subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {recurringDonations.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Receipt className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No recurring donations</p>
                    <Link to="/" className="mt-2 inline-block text-primary hover:underline">
                      Set up a recurring donation
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Temple</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Next Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recurringDonations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.templeName}</TableCell>
                            <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                            <TableCell className="capitalize">{donation.frequency}</TableCell>
                            <TableCell>{formatDate(donation.nextDonationDate)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={donation.status === 'active' ? 'default' : 'secondary'}
                              >
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
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Booking History
                </CardTitle>
                <CardDescription>Your temple slot bookings and darshan reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No bookings yet</p>
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
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.templeName}</TableCell>
                            <TableCell>{booking.eventName}</TableCell>
                            <TableCell>{formatDate(booking.date)}</TableCell>
                            <TableCell>{booking.timeSlot}</TableCell>
                            <TableCell>{booking.devotees}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  booking.status === 'confirmed'
                                    ? 'default'
                                    : booking.status === 'cancelled'
                                    ? 'destructive'
                                    : 'secondary'
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
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Followed Temples
                </CardTitle>
                <CardDescription>Temples you are following for updates</CardDescription>
              </CardHeader>
              <CardContent>
                {followedTemples.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Heart className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>Not following any temples</p>
                    <Link to="/" className="mt-2 inline-block text-primary hover:underline">
                      Explore temples to follow
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {getFollowedTempleDetails().map((temple) => (
                      <Link
                        key={temple.id}
                        to={`/temple/${temple.id}`}
                        className="group rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img
                            src={temple.image}
                            alt={temple.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary">
                          {temple.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {temple.location}, {temple.state}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyAccount;