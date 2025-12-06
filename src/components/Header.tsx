import { Link } from 'react-router-dom';
import { Heart, User, LogOut } from 'lucide-react';
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

const Header = () => {
  const { followedTemples } = useTemple();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-xl">🙏</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">Divine Temple</h1>
              <p className="text-xs text-muted-foreground">Connect with the Divine</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="hidden text-sm font-medium text-foreground transition-colors hover:text-primary sm:block"
            >
              Temples
            </Link>
            <Link
              to="/ancestral"
              className="hidden text-sm font-medium text-foreground transition-colors hover:text-primary sm:block"
            >
              Find Ancestral Temple
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{followedTemples.length}</span>
            </div>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
