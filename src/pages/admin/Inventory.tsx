import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package, Plus, Search, AlertTriangle, CheckCircle, 
  Edit, Trash2, TrendingDown
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Camphor', category: 'Pooja Items', quantity: 50, unit: 'packets', minStock: 20, lastUpdated: '2024-01-14' },
  { id: '2', name: 'Ghee', category: 'Pooja Items', quantity: 15, unit: 'liters', minStock: 10, lastUpdated: '2024-01-13' },
  { id: '3', name: 'Flowers (Marigold)', category: 'Decorations', quantity: 5, unit: 'kg', minStock: 10, lastUpdated: '2024-01-15' },
  { id: '4', name: 'Incense Sticks', category: 'Pooja Items', quantity: 100, unit: 'boxes', minStock: 30, lastUpdated: '2024-01-12' },
  { id: '5', name: 'Oil Lamps', category: 'Equipment', quantity: 25, unit: 'pieces', minStock: 15, lastUpdated: '2024-01-10' },
  { id: '6', name: 'Coconuts', category: 'Prasad', quantity: 8, unit: 'pieces', minStock: 20, lastUpdated: '2024-01-15' },
  { id: '7', name: 'Rice', category: 'Prasad', quantity: 100, unit: 'kg', minStock: 50, lastUpdated: '2024-01-11' },
  { id: '8', name: 'Turmeric Powder', category: 'Pooja Items', quantity: 30, unit: 'packets', minStock: 15, lastUpdated: '2024-01-14' },
];

const categories = ['All', 'Pooja Items', 'Decorations', 'Prasad', 'Equipment'];

const AdminInventory = () => {
  const { toast } = useToast();
  const [inventory] = useState<InventoryItem[]>(mockInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.quantity < item.minStock);
  const totalItems = inventory.length;

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity < item.minStock) {
      return { label: 'Low Stock', className: 'bg-destructive/10 text-destructive border-0' };
    }
    if (item.quantity < item.minStock * 1.5) {
      return { label: 'Medium', className: 'bg-orange-500/10 text-orange-600 border-0' };
    }
    return { label: 'In Stock', className: 'bg-green-500/10 text-green-600 border-0' };
  };

  return (
    <AdminLayout title="Inventory" subtitle="Track temple supplies and stock">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{totalItems}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-destructive">{lowStockItems.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">{categories.length - 1}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-secondary/50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Low Stock Alert</p>
                <p className="text-sm text-muted-foreground">
                  {lowStockItems.map(item => item.name).join(', ')} are running low on stock.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters & Actions */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? '' : 'bg-background'}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shrink-0">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Inventory Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Item Name</Label>
                    <Input placeholder="e.g., Camphor" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input placeholder="e.g., packets" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                      toast({ title: 'Item added', description: 'Inventory updated successfully.' });
                      setIsDialogOpen(false);
                    }}>Add Item</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Inventory Items</CardTitle>
          <CardDescription>
            Showing {filteredInventory.length} items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredInventory.map(item => {
              const status = getStockStatus(item);
              return (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.quantity < item.minStock ? 'bg-destructive/10' : 'bg-primary/10'
                    }`}>
                      <Package className={`w-5 h-5 ${
                        item.quantity < item.minStock ? 'text-destructive' : 'text-primary'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <Badge variant="secondary" className={status.className}>
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className={`text-lg font-semibold ${
                        item.quantity < item.minStock ? 'text-destructive' : 'text-foreground'
                      }`}>
                        {item.quantity} <span className="text-sm font-normal text-muted-foreground">{item.unit}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No items found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminInventory;
