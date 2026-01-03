import { useEffect } from 'react';
import { Package } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminInventory = () => {
  useEffect(() => {
    document.title = 'Inventory | Temple Admin';
  }, []);

  return (
    <AdminLayout title="Inventory" subtitle="Track temple supplies and stock">
      <main>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Inventory Management
            </CardTitle>
            <CardDescription>
              This page will track items like prasad supplies, lamps, flowers, and puja materials.
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

export default AdminInventory;
