import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Clock, Bell, Calendar, Sparkles, Phone, Mail, Globe, ExternalLink, CreditCard, CalendarCheck, Palmtree, RefreshCw, ChevronDown, Users } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/ShareButton';
import TempleGallery from '@/components/TempleGallery';
import TempleHistory from '@/components/TempleHistory';
import TempleMusicPlayer from '@/components/TempleMusicPlayer';
import LiveDarshan from '@/components/LiveDarshan';
import TemplePatrons from '@/components/TemplePatrons';
import TempleReviews from '@/components/TempleReviews';
import { useState } from 'react';

const footerContent = (
  <footer className="mt-12 border-t border-border bg-card/50 py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground">Templo</p>
            <p className="text-xs text-muted-foreground">Divine Connections</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 Templo. Connecting devotees with divine spaces.
        </p>
      </div>
    </div>
  </footer>
);

const TempleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getTempleById, loading, toggleFollowTemple, isFollowing } = useTemple();
  const { t } = useLanguage();
  const [patronsOpen, setPatronsOpen] = useState(false);
  
  const temple = id ? getTempleById(id) : undefined;
  const following = id ? isFollowing(id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-6 h-8 w-32" />
          <Skeleton className="mb-8 aspect-[21/9] w-full rounded-lg" />
          <Skeleton className="mb-4 h-10 w-3/4" />
          <Skeleton className="mb-8 h-6 w-1/2" />
        </div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mb-4 text-6xl">🏛️</div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground">Temple Not Found</h1>
          <p className="mb-6 text-lg text-muted-foreground">The temple you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="default" size="lg" className="text-lg px-8">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('back')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getAnnouncementBadgeColor = (type: string) => {
    switch (type) {
      case 'festival':
        return 'bg-primary/10 text-primary';
      case 'event':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary/20 text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Link to="/" className="mb-4 sm:mb-6 inline-flex items-center text-base font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('back')}
        </Link>

        {/* Hero Image */}
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
            <Badge variant="secondary" className="mb-2 bg-card/90 text-sm backdrop-blur sm:mb-3 sm:text-base px-3 py-1">
              <Sparkles className="mr-1.5 h-4 w-4" />
              {temple.deity}
            </Badge>
            <h1 className="mb-2 font-serif text-2xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              {temple.name}
            </h1>
            <div className="flex items-center gap-2 text-base text-primary-foreground/90 sm:text-lg">
              <MapPin className="h-5 w-5" />
              <span>{temple.location}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions - Large Touch Targets */}
        <Card className="mb-6 border-border bg-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed flex-1">{temple.description}</p>
              <ShareButton
                title={temple.name}
                text={`Visit ${temple.name} on Divine Temple Platform 🙏`}
                url={window.location.href}
                variant="outline"
                size="icon"
                showLabel={false}
                className="h-12 w-12 shrink-0"
              />
            </div>
            
            {/* Main Actions Grid - Large Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <Link to={`/donate/${temple.id}`} className="contents">
                <Button variant="default" size="lg" className="h-16 flex-col gap-1.5 text-base font-medium">
                  <CreditCard className="h-6 w-6" />
                  <span>{t('donate')}</span>
                </Button>
              </Link>
              <Link to={`/book/${temple.id}`} className="contents">
                <Button variant="outline" size="lg" className="h-16 flex-col gap-1.5 text-base font-medium">
                  <CalendarCheck className="h-6 w-6" />
                  <span>{t('bookSlot')}</span>
                </Button>
              </Link>
              <Link to={`/pooja/${temple.id}`} className="contents">
                <Button variant="outline" size="lg" className="h-16 flex-col gap-1.5 text-base font-medium">
                  <Palmtree className="h-6 w-6" />
                  <span>{t('requestPooja')}</span>
                </Button>
              </Link>
              <Link to={`/recurring-donate/${temple.id}`} className="contents">
                <Button variant="outline" size="lg" className="h-16 flex-col gap-1.5 text-base font-medium">
                  <RefreshCw className="h-6 w-6" />
                  <span className="text-sm">{t('recurringDonation')}</span>
                </Button>
              </Link>
              <Button
                onClick={() => toggleFollowTemple(temple.id)}
                variant={following ? "default" : "outline"}
                size="lg"
                className={cn(
                  "h-16 flex-col gap-1.5 text-base font-medium col-span-2 sm:col-span-1",
                  following && "bg-primary text-primary-foreground"
                )}
              >
                <Heart className={cn("h-6 w-6", following && "fill-current")} />
                <span>{following ? t('following') : t('follow')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Simplified 2 Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pooja Timings */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border bg-accent/50 py-4 sm:py-6">
              <CardTitle className="flex items-center gap-3 font-serif text-xl sm:text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                {t('timings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {temple.poojaTimings.map((timing, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 p-4 sm:p-5 transition-colors hover:bg-accent/30"
                >
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-medium text-foreground">{timing.name}</h4>
                    {timing.description && (
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground">{timing.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="shrink-0 border-primary/30 bg-primary/5 text-primary text-sm sm:text-base px-3 py-1">
                    {timing.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border bg-accent/50 py-4 sm:py-6">
              <CardTitle className="flex items-center gap-3 font-serif text-xl sm:text-2xl">
                <Bell className="h-6 w-6 text-primary" />
                {t('announcements')}
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {temple.announcements.length === 0 ? (
                <div className="p-6 sm:p-8 text-center text-lg text-muted-foreground">
                  No announcements at this time
                </div>
              ) : (
                temple.announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 sm:p-5 transition-colors hover:bg-accent/30">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h4 className="text-base sm:text-lg font-medium text-foreground">{announcement.title}</h4>
                      <Badge className={cn("shrink-0 capitalize text-sm", getAnnouncementBadgeColor(announcement.type))}>
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm sm:text-base text-muted-foreground">{announcement.content}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          {temple.contact && (
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border bg-accent/50 py-4 sm:py-6">
                <CardTitle className="flex items-center gap-3 font-serif text-xl sm:text-2xl">
                  <Phone className="h-6 w-6 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {temple.contact.phone && (
                  <a 
                    href={`tel:${temple.contact.phone}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-lg font-medium">{temple.contact.phone}</p>
                    </div>
                  </a>
                )}
                {temple.contact.email && (
                  <a 
                    href={`mailto:${temple.contact.email}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-medium">{temple.contact.email}</p>
                    </div>
                  </a>
                )}
                {temple.contact.website && (
                  <a 
                    href={temple.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="text-lg font-medium flex items-center gap-2">
                        {temple.contact.website.replace('https://', '')}
                        <ExternalLink className="h-4 w-4" />
                      </p>
                    </div>
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* Location Map */}
          {temple.coordinates && (
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border bg-accent/50 py-4 sm:py-6">
                <CardTitle className="flex items-center gap-3 font-serif text-xl sm:text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                  <iframe
                    title={`${temple.name} location`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${temple.coordinates.lat},${temple.coordinates.lng}&zoom=15`}
                  />
                </div>
                <div className="mt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="w-full gap-2 text-base">
                      <ExternalLink className="h-5 w-5" />
                      Open in Google Maps
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gallery */}
          {temple.gallery && temple.gallery.length > 0 && (
            <TempleGallery images={temple.gallery} templeName={temple.name} templeId={temple.id} />
          )}

          {/* Temple History */}
          {temple.history && (
            <TempleHistory history={temple.history} templeName={temple.name} templeId={temple.id} />
          )}

          {/* Live Darshan */}
          <LiveDarshan 
            templeName={temple.name} 
            templeId={temple.id}
            isLive={false}
            scheduledTime="6:00 AM - 8:00 PM"
          />

          {/* Temple Music Player */}
          <TempleMusicPlayer templeName={temple.name} tracks={[]} />

          {/* Reviews & Ratings */}
          <TempleReviews templeId={temple.id} templeName={temple.name} />
        </div>

        {/* Our Patrons - Collapsible Section */}
        <div className="mt-6">
          <Collapsible open={patronsOpen} onOpenChange={setPatronsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full justify-between text-lg font-medium h-16 rounded-xl border-border bg-card hover:bg-accent/50"
              >
                <span className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Our Patrons
                </span>
                <ChevronDown className={cn(
                  "h-6 w-6 transition-transform duration-200",
                  patronsOpen && "rotate-180"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <TemplePatrons templeId={temple.id} templeName={temple.name} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>

      {footerContent}
    </div>
  );
};

export default TempleDetails;