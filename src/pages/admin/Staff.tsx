import { useEffect } from 'react';
import { Users } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminStaff = () => {
  useEffect(() => {
    document.title = 'Staff | Temple Admin';
  }, []);

  return (
    <AdminLayout title="Staff" subtitle="Manage temple staff accounts and roles">
      <main>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Staff & Roles
            </CardTitle>
            <CardDescription>
              This page will let owners add staff members and assign roles like priest, manager, or inventory manager.
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

export default AdminStaff;
