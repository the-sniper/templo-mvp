import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, Gift, Calendar, MapPin, ArrowRight, Bell, 
  Loader2, Sparkles, TreePine, Check, Share2, Clock,
  MessageCircle
} from 'lucide-react';
import { useAncestral } from '@/context/AncestralContext';
import { useDonation } from '@/context/DonationContext';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { trackEvent } from '@/utils/analytics';
import { useToast } from '@/hooks/use-toast';

// Mock upcoming festivals for Tamil Nadu temples
const upcomingFestivals = [
  { name: 'Thai Pongal', date: new Date('2025-01-14'), description: 'Harvest festival' },
  { name: 'Maha Shivaratri', date: new Date('2025-02-26'), description: 'Night of Shiva' },
  { name: 'Panguni Uthiram', date: new Date('2025-03-30'), description: 'Celestial wedding' },
];

const FamilyDashboard = () => {
  const navigate = useNavigate();
  const { savedAncestralTemples, selectedTemple } = useAncestral();
  const { donations } = useDonation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [reminderEnabled, setReminderEnabled] = useState(() => {
    return localStorage.getItem('festival_reminder_enabled') === 'true';
  });
  const [loading, setLoading] = useState(true);

  // Get the saved family temple
  const familyTemple = selectedTemple || savedAncestralTemples[0] || null;

  // Recent donations for this user
  const recentDonations = donations.slice(0, 3);

  useEffect(() => {
    trackEvent('page_view', { page: 'family_dashboard' });
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnableReminders = () => {
    trackEvent('reminder_opt_in', { templeName: familyTemple?.name });
    localStorage.setItem('festival_reminder_enabled', 'true');
    setReminderEnabled(true);
    
    // Open WhatsApp with pre-filled message
    const message = encodeURIComponent(
      `🔔 I want to receive festival reminders for ${familyTemple?.name || 'my Kuladeivam temple'} from Templo.`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
    
    toast({
      title: "Reminders Enabled",
      description: "You'll receive WhatsApp reminders for upcoming festivals.",
    });
  };

  const handleShareTemple = () => {
    if (!familyTemple) return;
    
    const message = encodeURIComponent(
      `🙏 My family's Kuladeivam temple is ${familyTemple.name}, ${familyTemple.location}. Find your ancestral temple at ${window.location.origin}/ancestral`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  // If no temple saved, show CTA to start ancestral flow
  if (!familyTemple) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Your Spiritual Home
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              My Family Temple
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with your ancestral roots
            </p>
          </div>

          {/* Empty State Card */}
          <Card className="p-8 text-center border-2 border-dashed border-primary/30 bg-primary/5">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <TreePine className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
              Find Your Kuladeivam
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Discover your family's ancestral temple and receive festival reminders, make offerings, and stay connected.
            </p>
            <Link to="/ancestral/start">
              <Button size="lg" className="rounded-full px-8 gap-2">
                <TreePine className="w-5 h-5" />
                Start Your Search
              </Button>
            </Link>
          </Card>

          {/* Trust Banner */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              🛕 UPI supported • 📄 Receipt provided • 💳 Direct to temple
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <Heart className="w-3 h-3 mr-1.5 fill-primary" />
            Your Kuladeivam
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
            My Family Temple
          </h1>
          <p className="text-muted-foreground">
            {user ? `Welcome back, ${user.name}` : 'Stay connected with your roots'}
          </p>
        </div>

        {/* Saved Temple Card */}
        <Card className="mb-6 overflow-hidden border-primary/20">
          <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 relative">
            {familyTemple.image && (
              <img 
                src={familyTemple.image} 
                alt={familyTemple.name}
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
          <CardContent className="p-6 -mt-8 relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {familyTemple.name}
                </h2>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  {familyTemple.location}
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Check className="w-3 h-3 mr-1" />
                Saved
              </Badge>
            </div>
            
            {familyTemple.primaryDeity && (
              <p className="text-sm text-primary mb-4">
                Primary Deity: {familyTemple.primaryDeity}
              </p>
            )}

            <div className="flex gap-3">
              <Link to={`/donate/${familyTemple.id}`} className="flex-1">
                <Button className="w-full rounded-full gap-2">
                  <Gift className="w-4 h-4" />
                  Donate Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={handleShareTemple}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Festivals */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Festivals
              </h3>
            </div>
            
            <div className="space-y-3 mb-4">
              {upcomingFestivals.slice(0, 3).map((festival, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{festival.name}</p>
                    <p className="text-xs text-muted-foreground">{festival.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">
                      {format(festival.date, 'MMM d')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(festival.date, 'yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {!reminderEnabled ? (
              <Button 
                onClick={handleEnableReminders}
                variant="outline" 
                className="w-full rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Bell className="w-4 h-4" />
                Remind Me on WhatsApp
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                WhatsApp reminders enabled
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              {/* Temple saved activity */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Temple Saved</p>
                  <p className="text-xs text-muted-foreground">{familyTemple.name}</p>
                </div>
              </div>

              {/* Reminder status */}
              {reminderEnabled && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Reminders Enabled</p>
                    <p className="text-xs text-muted-foreground">Festival notifications active</p>
                  </div>
                </div>
              )}

              {/* Recent donations */}
              {recentDonations.map((donation, index) => (
                <Link 
                  key={index} 
                  to={`/donation/receipt/${donation.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Donated ₹{donation.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(donation.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}

              {recentDonations.length === 0 && !reminderEnabled && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    No donations yet. Support your temple with an offering.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Link to="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full rounded-full">
              Full Dashboard
            </Button>
          </Link>
          <Link to="/ancestral" className="flex-1">
            <Button variant="outline" className="w-full rounded-full">
              Change Temple
            </Button>
          </Link>
        </div>

        {/* Trust Banner */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm text-foreground font-medium mb-1">
            100% Direct to Temple
          </p>
          <p className="text-xs text-muted-foreground">
            💳 UPI supported • 📄 Receipt provided • 🛕 Verified temples
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FamilyDashboard;
