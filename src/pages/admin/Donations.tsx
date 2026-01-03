import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Gift, Search, Filter, Download, IndianRupee, TrendingUp, 
  Eye, CheckCircle, RefreshCw, Calendar
} from 'lucide-react';
import { Donation } from './types';

// Mock donation data
const mockDonations: Donation[] = [
  { id: '1', donorName: 'Anonymous', amount: 5001, type: 'general', date: '2024-01-15', paymentMethod: 'upi', transactionId: 'TXN001', status: 'completed', isRecurring: false, isAnonymous: true },
  { id: '2', donorName: 'Venkat Rao', donorPhone: '+91 98765 43210', amount: 11000, type: 'renovation', date: '2024-01-14', paymentMethod: 'card', transactionId: 'TXN002', status: 'completed', isRecurring: false, isAnonymous: false },
  { id: '3', donorName: 'Meera Iyer', donorEmail: 'meera@email.com', amount: 2100, type: 'annadanam', date: '2024-01-14', paymentMethod: 'netbanking', transactionId: 'TXN003', status: 'completed', isRecurring: true, isAnonymous: false },
  { id: '4', donorName: 'Arun Kumar', donorPhone: '+91 87654 32109', amount: 501, type: 'general', date: '2024-01-13', paymentMethod: 'upi', transactionId: 'TXN004', status: 'completed', isRecurring: false, isAnonymous: false },
  { id: '5', donorName: 'Lakshmi Devi', amount: 1100, type: 'festival', date: '2024-01-12', paymentMethod: 'cash', status: 'pending', isRecurring: false, isAnonymous: false },
  { id: '6', donorName: 'Suresh Reddy', donorEmail: 'suresh@email.com', amount: 5100, type: 'general', date: '2024-01-11', paymentMethod: 'upi', transactionId: 'TXN006', status: 'completed', isRecurring: true, isAnonymous: false },
];

const AdminDonations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [donations] = useState<Donation[]>(mockDonations);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          donation.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || donation.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);
  const completedAmount = filteredDonations.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0);
  const pendingCount = filteredDonations.filter(d => d.status === 'pending').length;
  const recurringCount = filteredDonations.filter(d => d.isRecurring).length;

  const getStatusBadge = (status: Donation['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Refunded</Badge>;
    }
  };

  const getTypeBadge = (type: Donation['type']) => {
    const typeLabels: Record<string, string> = {
      general: 'General',
      renovation: 'Renovation',
      annadanam: 'Annadanam',
      festival: 'Festival',
      other: 'Other'
    };
    return <Badge variant="outline">{typeLabels[type]}</Badge>;
  };

  return (
    <AdminLayout title="Donations" subtitle="Track and reconcile all temple donations">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" />
                  {totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" />
                  {completedAmount.toLocaleString()}
                </p>
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
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recurring</p>
                <p className="text-2xl font-bold text-foreground">{recurringCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by donor name or transaction ID..."
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
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="renovation">Renovation</SelectItem>
                <SelectItem value="annadanam">Annadanam</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Donation Records</CardTitle>
          <CardDescription>
            Showing {filteredDonations.length} of {donations.length} donations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(donation.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {donation.donorName}
                          {donation.isRecurring && (
                            <RefreshCw className="w-3 h-3 inline ml-1 text-primary" />
                          )}
                        </p>
                        {donation.donorPhone && (
                          <p className="text-xs text-muted-foreground">{donation.donorPhone}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(donation.type)}</TableCell>
                    <TableCell>
                      <span className="font-semibold flex items-center gap-0.5">
                        <IndianRupee className="w-3 h-3" />
                        {donation.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground capitalize">
                      {donation.paymentMethod}
                    </TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDonations;
