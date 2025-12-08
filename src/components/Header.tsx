import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, LogOut, Menu, X, Home, MapPin } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { followedTemples } = useTemple();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MobileNavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: React.ComponentType<{ className?: string }> }) => (
    <Link
      to={to}
      onClick={() => setMobileMenuOpen(false)}
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-accent"
    >
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
              <span className="text-lg sm:text-xl">🙏</span>
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-foreground sm:text-xl">Divine Temple</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Connect with the Divine</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Temples
            </Link>
            <Link
              to="/ancestral"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Find Ancestral Temple
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{followedTemples.length}</span>
            </div>
            
            <LanguageSelector />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card">
                  <DropdownMenuItem asChild>
                    <Link to="/ancestral" className="cursor-pointer">
                      Find Ancestral Temple
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center gap-1.5 rounded-full bg-accent/50 px-2.5 py-1 text-sm">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{followedTemples.length}</span>
            </div>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-card p-0">
                <SheetHeader className="border-b border-border p-4">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <span className="text-lg">🙏</span>
                    </div>
                    <span className="font-serif">Divine Temple</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col p-2">
                  <MobileNavLink to="/" icon={Home}>
                    Temples
                  </MobileNavLink>
                  <MobileNavLink to="/ancestral" icon={MapPin}>
                    Find Ancestral Temple
                  </MobileNavLink>
                  
                  <div className="my-2 border-t border-border" />
                  
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground">
                        <User className="h-5 w-5" />
                        <span>{user?.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-2 mt-2"
                    >
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
