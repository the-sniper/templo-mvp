import { useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminGallery = () => {
  useEffect(() => {
    document.title = 'Gallery | Temple Admin';
  }, []);

  return (
    <AdminLayout title="Gallery" subtitle="Manage temple photos and albums">
      <main>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Temple Gallery
            </CardTitle>
            <CardDescription>
              This page will let you upload daily darshan photos and festival albums (with moderation).
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

export default AdminGallery;
