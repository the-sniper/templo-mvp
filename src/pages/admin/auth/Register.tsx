import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Mail, Lock, User, Phone, MapPin, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    templeName: '',
    adminName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    state: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration - replace with actual auth
    setTimeout(() => {
      localStorage.setItem('adminUser', JSON.stringify({ 
        email: formData.email, 
        name: formData.adminName,
        templeName: formData.templeName,
        role: formData.role
      }));
      toast({
        title: 'Registration successful!',
        description: 'Your temple has been registered. Welcome aboard!',
      });
      navigate('/admin/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Back Link */}
        <Link 
          to="/admin" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Home
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">Register Your Temple</CardTitle>
            <CardDescription>
              Create an admin account to manage your temple
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Temple Name */}
              <div className="space-y-2">
                <Label htmlFor="templeName">Temple Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="templeName"
                    type="text"
                    placeholder="Sri Venkateswara Temple"
                    value={formData.templeName}
                    onChange={(e) => setFormData({ ...formData, templeName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Admin Name */}
              <div className="space-y-2">
                <Label htmlFor="adminName">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="adminName"
                    type="text"
                    placeholder="Full name"
                    value={formData.adminName}
                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temple_owner">Temple Owner / Trustee</SelectItem>
                    <SelectItem value="head_priest">Head Priest</SelectItem>
                    <SelectItem value="priest">Priest</SelectItem>
                    <SelectItem value="manager">Temple Manager</SelectItem>
                    <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                    <SelectItem value="staff">Temple Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@temple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="rounded border-border"
                />
                <Label htmlFor="showPassword" className="text-sm text-muted-foreground cursor-pointer">
                  Show passwords
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Register Temple'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already registered?{' '}
                <Link to="/admin/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegister;
