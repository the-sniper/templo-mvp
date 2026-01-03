import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Megaphone, Plus, Edit, Trash2, Calendar, Eye, EyeOff
} from 'lucide-react';
import { Announcement } from './types';
import { useToast } from '@/hooks/use-toast';

// Mock announcement data
const mockAnnouncements: Announcement[] = [
  { 
    id: '1', 
    title: 'Maha Shivaratri Celebrations', 
    content: 'Join us for the grand Maha Shivaratri celebrations with special abhishekam, bhajans throughout the night, and prasad distribution.', 
    type: 'festival', 
    startDate: '2024-03-08', 
    endDate: '2024-03-09', 
    isActive: true, 
    createdBy: 'Head Priest', 
    createdAt: '2024-01-10' 
  },
  { 
    id: '2', 
    title: 'Temple Renovation Update', 
    content: 'The gopuram renovation work is progressing well. Expected completion by end of February. Thank you for your generous donations.', 
    type: 'general', 
    startDate: '2024-01-15', 
    isActive: true, 
    createdBy: 'Temple Manager', 
    createdAt: '2024-01-15' 
  },
  { 
    id: '3', 
    title: 'Special Annadanam on Sundays', 
    content: 'Free prasadam will be distributed to all devotees every Sunday from 12:00 PM to 2:00 PM. All are welcome.', 
    type: 'event', 
    startDate: '2024-01-07', 
    isActive: true, 
    createdBy: 'Temple Owner', 
    createdAt: '2024-01-05' 
  },
  { 
    id: '4', 
    title: 'Temple Closed for Maintenance', 
    content: 'The temple will remain closed on January 20th for annual maintenance. We apologize for the inconvenience.', 
    type: 'urgent', 
    startDate: '2024-01-20', 
    endDate: '2024-01-20', 
    isActive: false, 
    createdBy: 'Temple Manager', 
    createdAt: '2024-01-12' 
  },
];

const AdminAnnouncements = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general' as Announcement['type'],
    startDate: '',
    endDate: '',
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'general',
      startDate: '',
      endDate: '',
      isActive: true
    });
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      startDate: announcement.startDate,
      endDate: announcement.endDate || '',
      isActive: announcement.isActive
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.startDate) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (editingAnnouncement) {
      setAnnouncements(prev => prev.map(a => 
        a.id === editingAnnouncement.id 
          ? { ...a, ...formData, endDate: formData.endDate || undefined }
          : a
      ));
      toast({
        title: 'Announcement updated',
        description: 'The announcement has been updated successfully.'
      });
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        endDate: formData.endDate || undefined,
        createdBy: 'Current User',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast({
        title: 'Announcement created',
        description: 'The announcement has been published.'
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({
      title: 'Announcement deleted',
      description: 'The announcement has been removed.'
    });
  };

  const toggleActive = (id: string) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  const getTypeBadge = (type: Announcement['type']) => {
    const typeConfig: Record<string, { label: string; className: string }> = {
      general: { label: 'General', className: 'bg-secondary/30 text-secondary-foreground' },
      festival: { label: 'Festival', className: 'bg-primary/10 text-primary' },
      event: { label: 'Event', className: 'bg-blue-500/10 text-blue-600' },
      urgent: { label: 'Urgent', className: 'bg-destructive/10 text-destructive' }
    };
    const config = typeConfig[type];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const activeAnnouncements = announcements.filter(a => a.isActive);
  const inactiveAnnouncements = announcements.filter(a => !a.isActive);

  return (
    <AdminLayout title="Announcements" subtitle="Create and manage temple announcements">
      {/* Stats and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Card className="border-border/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold text-foreground">{activeAnnouncements.length}</p>
              </div>
            </div>
          </Card>
          <Card className="border-border/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-xl font-bold text-foreground">{inactiveAnnouncements.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement ? 'Update the announcement details.' : 'Create a new announcement for devotees.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Announcement title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Announcement details..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: Announcement['type']) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label>Active immediately</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingAnnouncement ? 'Update' : 'Publish'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">All Announcements</CardTitle>
          <CardDescription>Manage your temple announcements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div 
                key={announcement.id}
                className={`p-4 rounded-lg border transition-colors ${
                  announcement.isActive 
                    ? 'bg-muted/30 border-border/50' 
                    : 'bg-muted/10 border-border/30 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                      {getTypeBadge(announcement.type)}
                      {!announcement.isActive && (
                        <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(announcement.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {announcement.endDate && ` - ${new Date(announcement.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                      </span>
                      <span>By {announcement.createdBy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() => toggleActive(announcement.id)}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(announcement)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No announcements yet</p>
              <p className="text-sm">Create your first announcement to keep devotees informed.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminAnnouncements;
