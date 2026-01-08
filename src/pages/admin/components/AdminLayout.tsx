import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Building2, BarChart3, Gift, CalendarDays, Users, Settings, LogOut,
  Bell, Menu, Megaphone, Image, Package, ChevronLeft, ChevronRight,
  User, HelpCircle
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      permission: null
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
      permission: null
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

  const visibleNavItems = navItems.filter(item => {
    if (!adminUser) return false;
    if (!item.permission) {
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
  const userInitials = adminUser.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';

  return (
    <div className="min-h-screen bg-muted/30 flex overflow-x-hidden">
      {/* Sidebar */}
      <aside 
        className={`${sidebarCollapsed ? 'w-16' : 'w-60'} bg-card border-r border-border/50 transition-all duration-300 fixed h-full z-40 flex flex-col`}
      >
        {/* Logo Area */}
        <div className={`h-16 border-b border-border/50 flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'}`}>
          {!sidebarCollapsed && (
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Temple Admin</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {visibleNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={index} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start gap-2'}`}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-60'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-2 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-foreground">{adminUser.name}</p>
                      <p className="text-xs text-muted-foreground">{roleLabel}</p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{adminUser.name}</p>
                    <p className="text-xs text-muted-foreground font-normal">{adminUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Temple Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
