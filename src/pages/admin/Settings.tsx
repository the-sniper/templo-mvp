import { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, Bell, Lock, CreditCard, Globe, Save, Shield,
  Mail, Smartphone, Moon, Sun, Copy, Check, QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const AdminSettings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailDonations: true,
    pushBookings: true,
    pushDonations: false,
    dailyDigest: true,
    weeklyReport: true,
  });

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2FA state
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState<'setup' | 'verify'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');
  const [copied, setCopied] = useState(false);

  // Initialize dark mode from document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = (enabled: boolean) => {
    setIsDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    toast({
      title: enabled ? 'Dark mode enabled' : 'Light mode enabled',
      description: 'Theme has been updated.',
    });
  };

  const handleSave = (section: string) => {
    toast({
      title: 'Settings saved',
      description: `${section} settings have been updated.`
    });
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify2FA = () => {
    // Simulate verification - in real app, verify against server
    if (verificationCode.length === 6) {
      setIs2FAEnabled(true);
      setIs2FADialogOpen(false);
      setTwoFAStep('setup');
      setVerificationCode('');
      toast({
        title: '2FA Enabled',
        description: 'Two-factor authentication has been enabled for your account.',
      });
    } else {
      toast({
        title: 'Invalid code',
        description: 'Please enter a valid 6-digit code.',
        variant: 'destructive',
      });
    }
  };

  const disable2FA = () => {
    setIs2FAEnabled(false);
    toast({
      title: '2FA Disabled',
      description: 'Two-factor authentication has been disabled.',
    });
  };

  return (
    <AdminLayout title="Settings" subtitle="Admin preferences and configuration">
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">New Booking Requests</p>
                      <p className="text-sm text-muted-foreground">Get notified when devotees book darshan or pooja</p>
                    </div>
                    <Switch 
                      checked={notifications.emailBookings}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailBookings: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Donation Received</p>
                      <p className="text-sm text-muted-foreground">Get notified for every donation</p>
                    </div>
                    <Switch 
                      checked={notifications.emailDonations}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailDonations: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Daily Digest</p>
                      <p className="text-sm text-muted-foreground">Summary of all activities every evening</p>
                    </div>
                    <Switch 
                      checked={notifications.dailyDigest}
                      onCheckedChange={(checked) => setNotifications({...notifications, dailyDigest: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Weekly Report</p>
                      <p className="text-sm text-muted-foreground">Comprehensive weekly analytics report</p>
                    </div>
                    <Switch 
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => setNotifications({...notifications, weeklyReport: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Push Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Booking Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant push for new bookings</p>
                    </div>
                    <Switch 
                      checked={notifications.pushBookings}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushBookings: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Donation Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant push for donations</p>
                    </div>
                    <Switch 
                      checked={notifications.pushDonations}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushDonations: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Notification')} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {is2FAEnabled ? '2FA is enabled' : 'Enable 2FA'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {is2FAEnabled 
                        ? 'Your account is protected with two-factor authentication' 
                        : 'Add an extra layer of security to your account'}
                    </p>
                  </div>
                  {is2FAEnabled ? (
                    <Button variant="outline" onClick={disable2FA}>Disable 2FA</Button>
                  ) : (
                    <Button variant="outline" onClick={() => setIs2FADialogOpen(true)}>Setup 2FA</Button>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Security')} className="gap-2">
                  <Save className="w-4 h-4" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and payout details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Razorpay</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account ID</p>
                    <p className="font-medium text-foreground">rzp_live_xxxx1234</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="text-primary font-medium">Active</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-4">Bank Account for Payouts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Holder Name</Label>
                    <Input placeholder="Temple Trust Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input placeholder="XXXX XXXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input placeholder="SBIN0001234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input placeholder="State Bank of India" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Payment')} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">General Preferences</CardTitle>
              <CardDescription>Customize your admin experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Switch 
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Language</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">English</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-4">Dashboard Widgets</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <p className="text-sm text-foreground">Show Quick Actions</p>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <p className="text-sm text-foreground">Show Recent Activity</p>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <p className="text-sm text-foreground">Show Analytics Summary</p>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Preference')} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 2FA Setup Dialog */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              {twoFAStep === 'setup' 
                ? 'Scan the QR code with your authenticator app or enter the secret key manually.'
                : 'Enter the 6-digit code from your authenticator app to verify.'}
            </DialogDescription>
          </DialogHeader>

          {twoFAStep === 'setup' ? (
            <div className="space-y-6">
              {/* QR Code placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">QR Code</p>
                  </div>
                </div>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Or enter this key manually:</Label>
                <div className="flex gap-2">
                  <Input 
                    value={secretKey} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={copySecretKey}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => setTwoFAStep('verify')}>
                Continue to Verification
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode}
                  onChange={setVerificationCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setTwoFAStep('setup')}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleVerify2FA}
                  disabled={verificationCode.length !== 6}
                >
                  Verify & Enable
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSettings;