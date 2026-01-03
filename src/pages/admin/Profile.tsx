import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, MapPin, Clock, Phone, Mail, Globe, Camera, Save, Plus, Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TempleProfile {
  name: string;
  deity: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  image: string;
}

interface Timing {
  id: string;
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

const AdminProfile = () => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<TempleProfile>({
    name: 'Sri Venkateswara Temple',
    deity: 'Lord Venkateswara',
    description: 'One of the most famous temples in South India, known for its divine architecture and spiritual significance.',
    address: '123 Temple Street, Hill Road',
    city: 'Tirumala',
    state: 'Andhra Pradesh',
    pincode: '517504',
    phone: '+91 877 2277777',
    email: 'info@tirupati.org',
    website: 'www.tirumala.org',
    image: '/temples/tirupati.jpg'
  });

  const [timings, setTimings] = useState<Timing[]>([
    { id: '1', day: 'Monday', openTime: '05:00', closeTime: '21:00', isOpen: true },
    { id: '2', day: 'Tuesday', openTime: '05:00', closeTime: '21:00', isOpen: true },
    { id: '3', day: 'Wednesday', openTime: '05:00', closeTime: '21:00', isOpen: true },
    { id: '4', day: 'Thursday', openTime: '05:00', closeTime: '21:00', isOpen: true },
    { id: '5', day: 'Friday', openTime: '05:00', closeTime: '21:00', isOpen: true },
    { id: '6', day: 'Saturday', openTime: '04:30', closeTime: '22:00', isOpen: true },
    { id: '7', day: 'Sunday', openTime: '04:30', closeTime: '22:00', isOpen: true },
  ]);

  const [poojaTimings, setPoojaTimings] = useState([
    { id: '1', name: 'Suprabhatam', time: '03:00 AM', description: 'Wake-up prayer for the deity' },
    { id: '2', name: 'Thomala Seva', time: '03:30 AM', description: 'Decoration with flowers' },
    { id: '3', name: 'Archana', time: '06:00 AM', description: 'Chanting of divine names' },
    { id: '4', name: 'Abhishekam', time: '07:00 AM', description: 'Sacred bath ritual' },
    { id: '5', name: 'Sahasra Deepa Alankaram', time: '07:00 PM', description: 'Decoration with thousand lamps' },
    { id: '6', name: 'Ekanta Seva', time: '09:00 PM', description: 'Night prayer' },
  ]);

  const handleProfileSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Temple profile has been saved successfully.'
    });
  };

  const handleTimingSave = () => {
    toast({
      title: 'Timings updated',
      description: 'Temple timings have been saved successfully.'
    });
  };

  const handleTimingChange = (id: string, field: keyof Timing, value: string | boolean) => {
    setTimings(prev => prev.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const addPoojaTime = () => {
    const newPooja = {
      id: Date.now().toString(),
      name: '',
      time: '',
      description: ''
    };
    setPoojaTimings([...poojaTimings, newPooja]);
  };

  const removePoojaTime = (id: string) => {
    setPoojaTimings(prev => prev.filter(p => p.id !== id));
  };

  const handlePoojaChange = (id: string, field: string, value: string) => {
    setPoojaTimings(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <AdminLayout title="Temple Profile" subtitle="Manage your temple information">
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="timings">Temple Timings</TabsTrigger>
          <TabsTrigger value="pooja">Pooja Schedule</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Temple Image */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Temple Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-muted mb-4">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Camera className="w-4 h-4" />
                  Change Image
                </Button>
              </CardContent>
            </Card>

            {/* Basic Details */}
            <Card className="border-border/50 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Basic Details</CardTitle>
                <CardDescription>Update your temple's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Temple Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deity">Main Deity</Label>
                    <Input
                      id="deity"
                      value={profile.deity}
                      onChange={(e) => setProfile({ ...profile, deity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={profile.pincode}
                      onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleProfileSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Temple Timings Tab */}
        <TabsContent value="timings">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Temple Opening Hours</CardTitle>
              <CardDescription>Set the daily opening and closing times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timings.map(timing => (
                  <div 
                    key={timing.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="w-28 font-medium text-foreground">{timing.day}</div>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={timing.openTime}
                          onChange={(e) => handleTimingChange(timing.id, 'openTime', e.target.value)}
                          className="w-28"
                          disabled={!timing.isOpen}
                        />
                      </div>
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={timing.closeTime}
                        onChange={(e) => handleTimingChange(timing.id, 'closeTime', e.target.value)}
                        className="w-28"
                        disabled={!timing.isOpen}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={timing.isOpen}
                        onChange={(e) => handleTimingChange(timing.id, 'isOpen', e.target.checked)}
                        className="rounded"
                      />
                      <Label className="text-sm">Open</Label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-6">
                <Button onClick={handleTimingSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Timings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pooja Schedule Tab */}
        <TabsContent value="pooja">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Daily Pooja Schedule</CardTitle>
                  <CardDescription>Manage the daily pooja timings</CardDescription>
                </div>
                <Button onClick={addPoojaTime} variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Pooja
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {poojaTimings.map(pooja => (
                  <div 
                    key={pooja.id}
                    className="flex flex-col sm:flex-row gap-4 p-3 rounded-lg bg-muted/30"
                  >
                    <Input
                      placeholder="Pooja name"
                      value={pooja.name}
                      onChange={(e) => handlePoojaChange(pooja.id, 'name', e.target.value)}
                      className="sm:w-48"
                    />
                    <Input
                      placeholder="Time (e.g., 06:00 AM)"
                      value={pooja.time}
                      onChange={(e) => handlePoojaChange(pooja.id, 'time', e.target.value)}
                      className="sm:w-32"
                    />
                    <Input
                      placeholder="Description"
                      value={pooja.description}
                      onChange={(e) => handlePoojaChange(pooja.id, 'description', e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => removePoojaTime(pooja.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-6">
                <Button onClick={handleTimingSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminProfile;
