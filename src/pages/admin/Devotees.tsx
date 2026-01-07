import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, Search, Mail, Phone, Calendar, MapPin, Filter, 
  MoreHorizontal, Heart, Gift
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Devotee {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedAt: string;
  totalDonations: number;
  bookingsCount: number;
  isFollowing: boolean;
}

const mockDevotees: Devotee[] = [
  { id: '1', name: 'Ramesh Kumar', email: 'ramesh@email.com', phone: '+91 98765 43210', location: 'Chennai', joinedAt: '2023-06-15', totalDonations: 15000, bookingsCount: 8, isFollowing: true },
  { id: '2', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', location: 'Mumbai', joinedAt: '2023-08-20', totalDonations: 8500, bookingsCount: 5, isFollowing: true },
  { id: '3', name: 'Venkat Rao', email: 'venkat@email.com', phone: '+91 76543 21098', location: 'Hyderabad', joinedAt: '2023-09-10', totalDonations: 25000, bookingsCount: 12, isFollowing: true },
  { id: '4', name: 'Lakshmi Devi', email: 'lakshmi@email.com', phone: '+91 65432 10987', location: 'Bangalore', joinedAt: '2023-11-05', totalDonations: 5000, bookingsCount: 3, isFollowing: false },
  { id: '5', name: 'Suresh Reddy', email: 'suresh@email.com', phone: '+91 54321 09876', location: 'Delhi', joinedAt: '2024-01-02', totalDonations: 2000, bookingsCount: 1, isFollowing: true },
  { id: '6', name: 'Meera Iyer', email: 'meera@email.com', phone: '+91 43210 98765', location: 'Coimbatore', joinedAt: '2023-07-22', totalDonations: 12000, bookingsCount: 6, isFollowing: true },
];

const AdminDevotees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [devotees] = useState<Devotee[]>(mockDevotees);

  const filteredDevotees = devotees.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFollowers = devotees.filter(d => d.isFollowing).length;
  const totalDonationsSum = devotees.reduce((sum, d) => sum + d.totalDonations, 0);

  return (
    <AdminLayout title="Devotees" subtitle="Devotees connected to your temple">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Devotees</p>
                <p className="text-2xl font-bold text-foreground">{devotees.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Followers</p>
                <p className="text-2xl font-bold text-foreground">{totalFollowers}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contributed</p>
                <p className="text-2xl font-bold text-foreground">₹{totalDonationsSum.toLocaleString()}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search devotees by name, email, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Devotees List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Devotee Directory</CardTitle>
          <CardDescription>
            Showing {filteredDevotees.length} of {devotees.length} devotees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDevotees.map(devotee => (
              <div 
                key={devotee.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {devotee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{devotee.name}</p>
                      {devotee.isFollowing && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          Following
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {devotee.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {devotee.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">₹{devotee.totalDonations.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Donated</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{devotee.bookingsCount}</p>
                    <p className="text-xs text-muted-foreground">Bookings</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>View Donations</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDevotees;
