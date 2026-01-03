import { useEffect } from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDevotees = () => {
  useEffect(() => {
    document.title = 'Devotees | Temple Admin';
  }, []);

  return (
    <AdminLayout title="Devotees" subtitle="Devotees connected to your temple">
      <main>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Devotee Directory
            </CardTitle>
            <CardDescription>
              This page will list devotees who follow your temple and their activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Coming soon — next we’ll add search, filters, and messaging preferences.
            </p>
            <Link to="/admin/announcements">
              <Button variant="outline" className="rounded-full">Go to Announcements</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </AdminLayout>
  );
};

export default AdminDevotees;
