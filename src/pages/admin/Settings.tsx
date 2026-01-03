import { useEffect } from 'react';
import { Settings } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSettings = () => {
  useEffect(() => {
    document.title = 'Settings | Temple Admin';
  }, []);

  return (
    <AdminLayout title="Settings" subtitle="Admin preferences and configuration">
      <main>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Settings
            </CardTitle>
            <CardDescription>
              This page will include notification preferences, payout settings, and audit logs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Coming soon.</p>
          </CardContent>
        </Card>
      </main>
    </AdminLayout>
  );
};

export default AdminSettings;
