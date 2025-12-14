import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, LogOut, Menu, Home, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
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
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MobileNavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: React.ComponentType<{ className?: string }> }) => (
    <Link
      to={to}
      onClick={() => setMobileMenuOpen(false)}
      className="flex items-center gap-3 rounded-xl px-4 py-4 text-foreground transition-all hover:bg-primary/10 active:scale-[0.98]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-base font-medium">{children}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between sm:h-18">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 transition-all hover:opacity-90">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">Templo</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">{t('divineConnections')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              {t('temples')}
            </Link>
            <Link
              to="/ancestral"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              {t('ancestralTemple')}
            </Link>
            <Link
              to="/how-to"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              How To
            </Link>
            
            <div className="mx-2 h-6 w-px bg-border" />
            
            <Link
              to="/following"
              className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              <Heart className="h-4 w-4 fill-primary" />
              <span>{followedTemples.length} {t('followed')}</span>
            </Link>
            
            <LanguageSelector />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden lg:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl bg-card p-2 shadow-xl">
                  <DropdownMenuItem asChild className="rounded-lg px-3 py-2">
                    <Link to="/following" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      {t('myTemples')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg px-3 py-2">
                    <Link to="/ancestral" className="cursor-pointer">
                      <MapPin className="mr-2 h-4 w-4" />
                      {t('findAncestralTemple')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer rounded-lg px-3 py-2 text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/25">
                  {t('signIn')}
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/following"
              className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
            >
              <Heart className="h-4 w-4 fill-primary" />
              <span>{followedTemples.length}</span>
            </Link>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background p-0">
                <SheetHeader className="border-b border-border p-5">
                  <SheetTitle className="flex items-center gap-3 text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-lg font-bold">Templo</span>
                      <p className="text-xs font-normal text-muted-foreground">{t('divineConnections')}</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col gap-1 p-3">
                  <MobileNavLink to="/" icon={Home}>
                    {t('exploreTemples')}
                  </MobileNavLink>
                  <MobileNavLink to="/following" icon={Heart}>
                    {t('myTemples')}
                  </MobileNavLink>
                  <MobileNavLink to="/ancestral" icon={MapPin}>
                    {t('findAncestralTemple')}
                  </MobileNavLink>
                  <MobileNavLink to="/how-to" icon={HelpCircle}>
                    How To
                  </MobileNavLink>
                  
                  <div className="my-3 border-t border-border" />
                  
                  <div className="px-4 py-2">
                    <LanguageSelector />
                  </div>
                  
                  <div className="my-2 border-t border-border" />
                  
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 rounded-xl bg-accent/50 px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{user?.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="mt-2 flex items-center gap-3 rounded-xl px-4 py-4 text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">{t('signOut')}</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 px-3"
                    >
                      <Button className="w-full rounded-xl py-6 text-base shadow-lg shadow-primary/25">
                        {t('signIn')}
                      </Button>
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
