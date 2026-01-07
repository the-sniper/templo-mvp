import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Image as ImageIcon, Upload, Trash2, Eye, Calendar, FolderOpen,
  Grid3X3, LayoutList, Plus, X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  album: string;
  uploadedAt: string;
  uploadedBy: string;
}

const initialImages: GalleryImage[] = [
  { id: '1', url: '/temples/tirupati.jpg', title: 'Main Temple View', album: 'Temple', uploadedAt: '2024-01-10', uploadedBy: 'Admin' },
  { id: '2', url: '/temples/golden-temple.jpg', title: 'Evening Aarti', album: 'Daily Rituals', uploadedAt: '2024-01-12', uploadedBy: 'Head Priest' },
  { id: '3', url: '/temples/meenakshi.jpg', title: 'Festival Decorations', album: 'Festivals', uploadedAt: '2024-01-08', uploadedBy: 'Admin' },
  { id: '4', url: '/temples/kashi.jpg', title: 'Morning Darshan', album: 'Daily Rituals', uploadedAt: '2024-01-14', uploadedBy: 'Staff' },
  { id: '5', url: '/temples/jagannath.jpg', title: 'Annual Festival', album: 'Festivals', uploadedAt: '2024-01-05', uploadedBy: 'Admin' },
  { id: '6', url: '/temples/siddhivinayak.jpg', title: 'Temple Entrance', album: 'Temple', uploadedAt: '2024-01-11', uploadedBy: 'Admin' },
];

const AdminGallery = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [albums, setAlbums] = useState(['All', 'Temple', 'Daily Rituals', 'Festivals', 'Special Events']);
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Upload dialog state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadData, setUploadData] = useState({ title: '', album: 'Temple' });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Add album dialog state
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  const filteredImages = selectedAlbum === 'All' 
    ? images 
    : images.filter(img => img.album === selectedAlbum);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (!uploadData.title || uploadedFiles.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Please provide a title and select files to upload.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate upload
    const newImages: GalleryImage[] = uploadedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      title: uploadedFiles.length > 1 ? `${uploadData.title} (${index + 1})` : uploadData.title,
      album: uploadData.album,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
    }));

    setImages([...newImages, ...images]);
    setIsUploadOpen(false);
    setUploadData({ title: '', album: 'Temple' });
    setUploadedFiles([]);

    toast({
      title: 'Photos uploaded',
      description: `${uploadedFiles.length} photo(s) have been uploaded successfully.`,
    });
  };

  const handleAddAlbum = () => {
    if (!newAlbumName.trim()) {
      toast({
        title: 'Album name required',
        description: 'Please enter a name for the album.',
        variant: 'destructive',
      });
      return;
    }

    if (albums.includes(newAlbumName.trim())) {
      toast({
        title: 'Album exists',
        description: 'An album with this name already exists.',
        variant: 'destructive',
      });
      return;
    }

    setAlbums([...albums, newAlbumName.trim()]);
    setIsAddAlbumOpen(false);
    setNewAlbumName('');

    toast({
      title: 'Album created',
      description: `Album "${newAlbumName.trim()}" has been created.`,
    });
  };

  const handleDeleteImage = (imageId: string) => {
    setImages(images.filter(img => img.id !== imageId));
    toast({
      title: 'Photo deleted',
      description: 'The photo has been removed from the gallery.',
    });
  };

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
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Albums</p>
                <p className="text-xl font-bold text-foreground">{albums.length - 1}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddAlbumOpen} onOpenChange={setIsAddAlbumOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                New Album
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Album</DialogTitle>
                <DialogDescription>
                  Create a new album to organize your temple photos.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Album Name</Label>
                  <Input
                    placeholder="e.g., Annual Festival 2024"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsAddAlbumOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAlbum}>
                    Create Album
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Photos</DialogTitle>
                <DialogDescription>
                  Add new photos to your temple gallery.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Photo Title</Label>
                  <Input
                    placeholder="e.g., Morning Aarti"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Album</Label>
                  <Select 
                    value={uploadData.album} 
                    onValueChange={(v) => setUploadData({...uploadData, album: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {albums.filter(a => a !== 'All').map(album => (
                        <SelectItem key={album} value={album}>{album}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Photos</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to select photos or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB each
                      </p>
                    </label>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ImageIcon className="w-4 h-4" />
                          <span className="truncate flex-1">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} disabled={uploadedFiles.length === 0}>
                    Upload {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
                          <p className="text-primary-foreground text-sm font-medium truncate">{image.title}</p>
                          <p className="text-primary-foreground/70 text-xs">{image.album}</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-7 w-7">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.id);
                          }}
                        >
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteImage(image.id)}
                    >
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