import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Lock, ArrowLeft, Eye, EyeOff, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Demo accounts for different roles
const demoAccounts = [
  { email: 'owner@temple.com', password: '12345678', role: 'temple_owner', name: 'Temple Owner', label: 'Full Access' },
  { email: 'headpriest@temple.com', password: '12345678', role: 'head_priest', name: 'Head Priest', label: 'Bookings & Pooja' },
  { email: 'priest@temple.com', password: '12345678', role: 'priest', name: 'Priest', label: 'View Bookings' },
  { email: 'staff@temple.com', password: '12345678', role: 'staff', name: 'Temple Staff', label: 'Limited View' },
  { email: 'inventory@temple.com', password: '12345678', role: 'inventory_manager', name: 'Inventory Manager', label: 'Inventory Only' },
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check against demo accounts
    setTimeout(() => {
      const account = demoAccounts.find(
        acc => acc.email === formData.email && acc.password === formData.password
      );

      // Also accept legacy admin@temple.com
      const isLegacyAdmin = formData.email === 'admin@temple.com' && formData.password === '12345678';

      if (account || isLegacyAdmin) {
        const userData = account || demoAccounts[0]; // Default to owner for legacy
        localStorage.setItem('adminUser', JSON.stringify({
          id: `demo-${userData.role}`,
          email: userData.email,
          name: userData.name,
          phone: '+91 98765 43210',
          templeName: 'Demo Temple',
          templeId: 'demo-temple',
          role: userData.role,
          createdAt: new Date().toISOString(),
        }));
        toast({
          title: `Welcome, ${userData.name}!`,
          description: `Logged in as ${userData.label}`,
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Try one of the demo accounts below.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 800);
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
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
            <CardTitle className="font-serif text-2xl">Temple Admin Login</CardTitle>
            <CardDescription>
              Sign in to manage your temple
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@temple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/admin/register" className="text-primary hover:underline font-medium">
                  Register your temple
                </Link>
              </p>
            </div>

            {/* Demo accounts section */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Demo Accounts</p>
              </div>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => fillDemoCredentials(account.email, account.password)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {account.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{account.email}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                      {account.label}
                    </Badge>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Password for all: <code className="bg-muted px-1 rounded">12345678</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;