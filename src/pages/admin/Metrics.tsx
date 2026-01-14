import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Target, MessageCircle, Bell, CreditCard, RefreshCw, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPMFMetrics, clearEvents } from '@/utils/analytics';

const AdminMetrics = () => {
  const [metrics, setMetrics] = useState(getPMFMetrics());
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshMetrics = () => {
    setMetrics(getPMFMetrics());
    setLastRefresh(new Date());
  };

  useEffect(() => {
    refreshMetrics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    color = 'primary' 
  }: { 
    title: string; 
    value: string | number; 
    subtitle?: string;
    icon: any;
    color?: string;
  }) => (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-${color}/10`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">PMF Metrics</h1>
              <p className="text-sm text-muted-foreground">Phase 1 Tamil Nadu MVP</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={refreshMetrics} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Last Updated */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard 
            title="Total Users" 
            value={metrics.totalUsers}
            subtitle="Unique visitors"
            icon={Users}
          />
          <MetricCard 
            title="Flow Completion" 
            value={`${metrics.flowCompletionRate}%`}
            subtitle="Started → Saved temple"
            icon={Target}
          />
          <MetricCard 
            title="WhatsApp Share Rate" 
            value={`${metrics.whatsappShareRate}%`}
            subtitle="Of users who saved temple"
            icon={MessageCircle}
          />
          <MetricCard 
            title="Reminder Opt-in" 
            value={`${metrics.reminderOptInRate}%`}
            subtitle="Festival alerts enabled"
            icon={Bell}
          />
          <MetricCard 
            title="Donation Conversion" 
            value={`${metrics.donationConversionRate}%`}
            subtitle="Completed donations"
            icon={CreditCard}
          />
          <MetricCard 
            title="Donation Initiated" 
            value={`${metrics.donationInitiatedRate}%`}
            subtitle="Started checkout"
            icon={TrendingUp}
          />
        </div>

        {/* Funnel Visualization */}
        <Card className="border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Ancestral Start', value: metrics.funnel.start, color: 'bg-primary' },
                { label: 'Show Matches', value: metrics.funnel.showMatches, color: 'bg-primary/80' },
                { label: 'Save Temple', value: metrics.funnel.saveTemple, color: 'bg-primary/60' },
                { label: 'WhatsApp Share', value: metrics.funnel.whatsappShare, color: 'bg-primary/40' },
                { label: 'Donate', value: metrics.funnel.donate, color: 'bg-primary/20' },
              ].map((step, index) => {
                const maxValue = Math.max(metrics.funnel.start, 1);
                const width = Math.max((step.value / maxValue) * 100, 5);
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{step.label}</span>
                      <span className="font-medium text-foreground">{step.value}</span>
                    </div>
                    <div className="h-8 bg-muted rounded-lg overflow-hidden">
                      <div 
                        className={`h-full ${step.color} transition-all duration-500 rounded-lg flex items-center justify-end pr-2`}
                        style={{ width: `${width}%` }}
                      >
                        {width > 15 && (
                          <span className="text-xs font-medium text-primary-foreground">
                            {step.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* PMF Targets */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">PMF Validation Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'Flow Completion Rate', current: metrics.flowCompletionRate, target: 60, unit: '%' },
                { metric: 'WhatsApp Share Rate', current: metrics.whatsappShareRate, target: 40, unit: '%' },
                { metric: 'Reminder Opt-in Rate', current: metrics.reminderOptInRate, target: 30, unit: '%' },
                { metric: 'Donation Conversion', current: metrics.donationConversionRate, target: 10, unit: '%' },
              ].map((item, index) => {
                const achieved = item.current >= item.target;
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">{item.metric}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.current}{item.unit} / {item.target}{item.unit}
                      </span>
                      <Badge variant={achieved ? "default" : "secondary"} className="text-xs">
                        {achieved ? '✓ Achieved' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dev Tools */}
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground mb-3">Developer Tools</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                clearEvents();
                refreshMetrics();
              }}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              Clear All Analytics Data
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMetrics;
