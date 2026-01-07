import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, Plus, Search, Mail, Phone, Shield, 
  MoreHorizontal, Edit, Trash2, UserCheck
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedAt: string;
  isActive: boolean;
}

const mockStaff: StaffMember[] = [
  { id: '1', name: 'Pandit Sharma', email: 'sharma@temple.com', phone: '+91 98765 43210', role: 'head_priest', joinedAt: '2020-03-15', isActive: true },
  { id: '2', name: 'Ravi Kumar', email: 'ravi@temple.com', phone: '+91 87654 32109', role: 'priest', joinedAt: '2021-06-20', isActive: true },
  { id: '3', name: 'Sita Devi', email: 'sita@temple.com', phone: '+91 76543 21098', role: 'manager', joinedAt: '2022-01-10', isActive: true },
  { id: '4', name: 'Mohan Lal', email: 'mohan@temple.com', phone: '+91 65432 10987', role: 'staff', joinedAt: '2022-08-05', isActive: true },
  { id: '5', name: 'Geetha R', email: 'geetha@temple.com', phone: '+91 54321 09876', role: 'inventory_manager', joinedAt: '2023-02-14', isActive: false },
];

const roleLabels: Record<string, { label: string; color: string }> = {
  temple_owner: { label: 'Temple Owner', color: 'bg-primary/10 text-primary' },
  head_priest: { label: 'Head Priest', color: 'bg-orange-500/10 text-orange-600' },
  priest: { label: 'Priest', color: 'bg-blue-500/10 text-blue-600' },
  manager: { label: 'Manager', color: 'bg-green-500/10 text-green-600' },
  staff: { label: 'Staff', color: 'bg-secondary/50 text-secondary-foreground' },
  inventory_manager: { label: 'Inventory Manager', color: 'bg-purple-500/10 text-purple-600' },
};

const AdminStaff = () => {
  const { toast } = useToast();
  const [staff] = useState<StaffMember[]>(mockStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeStaff = staff.filter(s => s.isActive).length;

  return (
    <AdminLayout title="Staff" subtitle="Manage temple staff accounts and roles">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-foreground">{staff.length}</p>
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
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">{activeStaff}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <p className="text-2xl font-bold text-foreground">{Object.keys(roleLabels).length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Actions */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Staff Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@temple.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priest">Priest</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                      toast({ title: 'Staff added', description: 'New staff member has been added.' });
                      setIsDialogOpen(false);
                    }}>Add Staff</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Staff Directory</CardTitle>
          <CardDescription>
            Showing {filteredStaff.length} staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStaff.map(member => {
              const roleInfo = roleLabels[member.role] || roleLabels.staff;
              return (
                <div 
                  key={member.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg transition-colors ${
                    member.isActive ? 'bg-muted/30 hover:bg-muted/50' : 'bg-muted/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{member.name}</p>
                        <Badge variant="secondary" className={`${roleInfo.color} border-0 text-xs`}>
                          {roleInfo.label}
                        </Badge>
                        {!member.isActive && (
                          <Badge variant="outline" className="text-muted-foreground text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      Joined {new Date(member.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Shield className="w-4 h-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No staff members found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminStaff;
