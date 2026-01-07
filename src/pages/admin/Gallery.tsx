import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Image as ImageIcon, Upload, Trash2, Eye, Calendar, FolderOpen,
  Grid3X3, LayoutList, Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  album: string;
  uploadedAt: string;
  uploadedBy: string;
}

const mockImages: GalleryImage[] = [
  { id: '1', url: '/temples/tirupati.jpg', title: 'Main Temple View', album: 'Temple', uploadedAt: '2024-01-10', uploadedBy: 'Admin' },
  { id: '2', url: '/temples/golden-temple.jpg', title: 'Evening Aarti', album: 'Daily Rituals', uploadedAt: '2024-01-12', uploadedBy: 'Head Priest' },
  { id: '3', url: '/temples/meenakshi.jpg', title: 'Festival Decorations', album: 'Festivals', uploadedAt: '2024-01-08', uploadedBy: 'Admin' },
  { id: '4', url: '/temples/kashi.jpg', title: 'Morning Darshan', album: 'Daily Rituals', uploadedAt: '2024-01-14', uploadedBy: 'Staff' },
  { id: '5', url: '/temples/jagannath.jpg', title: 'Annual Festival', album: 'Festivals', uploadedAt: '2024-01-05', uploadedBy: 'Admin' },
  { id: '6', url: '/temples/siddhivinayak.jpg', title: 'Temple Entrance', album: 'Temple', uploadedAt: '2024-01-11', uploadedBy: 'Admin' },
];

const albums = ['All', 'Temple', 'Daily Rituals', 'Festivals', 'Special Events'];

const AdminGallery = () => {
  const [images] = useState<GalleryImage[]>(mockImages);
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedAlbum === 'All' 
    ? images 
    : images.filter(img => img.album === selectedAlbum);

  return (
    <AdminLayout title="Gallery" subtitle="Manage temple photos and albums">
      {/* Stats & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Card className="border-border/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Photos</p>
                <p className="text-xl font-bold text-foreground">{images.length}</p>
              </div>
            </div>
          </Card>
          <Card className="border-border/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Albums</p>
                <p className="text-xl font-bold text-foreground">{albums.length - 1}</p>
              </div>
            </div>
          </Card>
        </div>

        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Photos
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {albums.map(album => (
                <Button
                  key={album}
                  variant={selectedAlbum === album ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAlbum(album)}
                  className={selectedAlbum === album ? '' : 'bg-background'}
                >
                  {album}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid/List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Photos</CardTitle>
          <CardDescription>
            Showing {filteredImages.length} photos {selectedAlbum !== 'All' && `in ${selectedAlbum}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map(image => (
                <Dialog key={image.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => e.currentTarget.src = '/placeholder.svg'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-medium truncate">{image.title}</p>
                          <p className="text-white/70 text-xs">{image.album}</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-7 w-7">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-7 w-7 text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{image.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-contain"
                        onError={(e) => e.currentTarget.src = '/placeholder.svg'}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FolderOpen className="w-4 h-4" />
                          {image.album}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(image.uploadedAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      <span>Uploaded by {image.uploadedBy}</span>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map(image => (
                <div 
                  key={image.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                      onError={(e) => e.currentTarget.src = '/placeholder.svg'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{image.title}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <Badge variant="secondary" className="text-xs">{image.album}</Badge>
                      <span>{new Date(image.uploadedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No photos in this album</p>
              <p className="text-sm">Upload photos to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminGallery;
