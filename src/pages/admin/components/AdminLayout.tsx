import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, BarChart3, Gift, CalendarDays, Users, Settings, LogOut,
  Bell, Menu, X, Megaphone, Image, Package, ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminUser, rolePermissions, hasPermission } from '../types';
import { loadAdminUser } from '../utils/adminAuth';
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = loadAdminUser();
    if (user) {
      setAdminUser(user);
    } else {
      navigate('/admin/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/admin');
  };

  const navItems = [
    { 
      icon: BarChart3, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      permission: null // Always visible
    },
    { 
      icon: CalendarDays, 
      label: 'Bookings', 
      path: '/admin/bookings',
      permission: { module: 'bookings' as const, action: 'view' }
    },
    { 
      icon: Gift, 
      label: 'Donations', 
      path: '/admin/donations',
      permission: { module: 'donations' as const, action: 'view' }
    },
    { 
      icon: Users, 
      label: 'Devotees', 
      path: '/admin/devotees',
      permission: { module: 'devotees' as const, action: 'view' }
    },
    { 
      icon: Megaphone, 
      label: 'Announcements', 
      path: '/admin/announcements',
      permission: { module: 'announcements' as const, action: 'view' }
    },
    { 
      icon: Image, 
      label: 'Gallery', 
      path: '/admin/gallery',
      permission: { module: 'gallery' as const, action: 'view' }
    },
    { 
      icon: Building2, 
      label: 'Temple Profile', 
      path: '/admin/profile',
      permission: { module: 'templeProfile' as const, action: 'view' }
    },
    { 
      icon: Package, 
      label: 'Inventory', 
      path: '/admin/inventory',
      permission: null // Special permission for inventory_manager
    },
    { 
      icon: Users, 
      label: 'Staff', 
      path: '/admin/staff',
      permission: { module: 'staff' as const, action: 'view' }
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/admin/settings',
      permission: { module: 'settings' as const, action: 'view' }
    },
  ];

  // Filter nav items based on user role permissions
  const visibleNavItems = navItems.filter(item => {
    if (!adminUser) return false;
    if (!item.permission) {
      // Special cases
      if (item.label === 'Inventory') {
        const role = (adminUser.role as unknown as string) || '';
        return role === 'inventory_manager' || role === 'temple_owner' || role === 'manager' || role === 'admin';
      }
      return true;
    }
    return hasPermission(adminUser.role, item.permission.module, item.permission.action);
  });

  if (!adminUser) {
    return null;
  }

  const roleLabel = rolePermissions[(adminUser.role as unknown as any)]?.label || rolePermissions.temple_owner.label;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border/50 transition-all duration-300 fixed h-full z-40`}>
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <span className="font-serif font-bold text-foreground">Temple Admin</span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="p-2 space-y-1">
          {visibleNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={index} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{adminUser.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
