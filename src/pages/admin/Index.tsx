import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Users, Gift, CalendarDays, BarChart3, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminIndex = () => {
  const features = [
    {
      icon: Building2,
      title: 'Manage Your Temple',
      description: 'Update timings, photos, and temple information easily'
    },
    {
      icon: CalendarDays,
      title: 'Handle Bookings',
      description: 'Accept or manage darshan and pooja slot bookings'
    },
    {
      icon: Gift,
      title: 'Track Donations',
      description: 'View and reconcile all donations with detailed reports'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Insights on devotee engagement and temple activity'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground">Temple Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/admin/login">
              <Button variant="ghost" className="rounded-full">
                Sign In
              </Button>
            </Link>
            <Link to="/admin/register">
              <Button className="rounded-full bg-primary hover:bg-primary/90">
                Register Temple
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            For Temple Owners & Priests
          </Badge>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Bring Your Temple Online
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with devotees worldwide. Manage bookings, donations, and temple activities from one simple dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/admin/register">
              <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Register Your Temple
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 border-2 bg-background/80">
                Already Registered? Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Everything You Need to Manage Your Temple
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete platform designed for temple administrators and priests
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground text-sm">Temples Registered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">50,000+</p>
              <p className="text-muted-foreground text-sm">Devotees Connected</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">₹2Cr+</p>
              <p className="text-muted-foreground text-sm">Donations Processed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-muted-foreground text-sm">Bookings Managed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Digitize Your Temple?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of temples already connecting with devotees worldwide
          </p>
          <Link to="/admin/register">
            <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Temple Connect. For temple administrators and priests.
          </p>
          <Link to="/" className="text-sm text-primary hover:underline mt-2 inline-block">
            ← Back to Devotee Site
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AdminIndex;
