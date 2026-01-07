import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, Search, Mail, Phone, Calendar, MapPin, Filter, 
  MoreHorizontal, Heart, Gift, X, ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const locations = ['All Locations', 'Chennai', 'Mumbai', 'Hyderabad', 'Bangalore', 'Delhi', 'Coimbatore'];
const donationRanges = [
  { label: 'All Donations', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: Infinity },
];

const AdminDevotees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [devotees] = useState<Devotee[]>(mockDevotees);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDonationRange, setSelectedDonationRange] = useState(donationRanges[0]);
  const [followingFilter, setFollowingFilter] = useState<'all' | 'following' | 'not-following'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDevotees = devotees.filter(d => {
    // Search filter
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation = selectedLocation === 'All Locations' || d.location === selectedLocation;

    // Donation range filter
    const matchesDonation = d.totalDonations >= selectedDonationRange.min && 
      d.totalDonations < selectedDonationRange.max;

    // Following filter
    const matchesFollowing = followingFilter === 'all' || 
      (followingFilter === 'following' && d.isFollowing) ||
      (followingFilter === 'not-following' && !d.isFollowing);

    return matchesSearch && matchesLocation && matchesDonation && matchesFollowing;
  });

  const activeFiltersCount = [
    selectedLocation !== 'All Locations',
    selectedDonationRange.label !== 'All Donations',
    followingFilter !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedLocation('All Locations');
    setSelectedDonationRange(donationRanges[0]);
    setFollowingFilter('all');
  };

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
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary" />
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
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
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
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-foreground">Filters</h4>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Donation Amount</Label>
                    <Select 
                      value={selectedDonationRange.label} 
                      onValueChange={(val) => {
                        const range = donationRanges.find(r => r.label === val);
                        if (range) setSelectedDonationRange(range);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {donationRanges.map(range => (
                          <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Following Status</Label>
                    <Select value={followingFilter} onValueChange={(v) => setFollowingFilter(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Devotees</SelectItem>
                        <SelectItem value="following">Following</SelectItem>
                        <SelectItem value="not-following">Not Following</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Active filters display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedLocation !== 'All Locations' && (
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedLocation}
                  <X 
                    className="w-3 h-3 cursor-pointer ml-1" 
                    onClick={() => setSelectedLocation('All Locations')}
                  />
                </Badge>
              )}
              {selectedDonationRange.label !== 'All Donations' && (
                <Badge variant="secondary" className="gap-1">
                  <Gift className="w-3 h-3" />
                  {selectedDonationRange.label}
                  <X 
                    className="w-3 h-3 cursor-pointer ml-1" 
                    onClick={() => setSelectedDonationRange(donationRanges[0])}
                  />
                </Badge>
              )}
              {followingFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  <Heart className="w-3 h-3" />
                  {followingFilter === 'following' ? 'Following' : 'Not Following'}
                  <X 
                    className="w-3 h-3 cursor-pointer ml-1" 
                    onClick={() => setFollowingFilter('all')}
                  />
                </Badge>
              )}
            </div>
          )}
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

            {filteredDevotees.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No devotees found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDevotees;