import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Clock, Bell, Calendar, Sparkles, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const TempleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getTempleById, loading, toggleFollowTemple, isFollowing } = useTemple();
  
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
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
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
          <p className="mb-6 text-muted-foreground">The temple you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Temples
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
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all temples
        </Link>

        {/* Hero Image */}
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge variant="secondary" className="mb-3 bg-card/90 backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" />
              {temple.deity}
            </Badge>
            <h1 className="mb-2 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              {temple.name}
            </h1>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="h-4 w-4" />
              <span>{temple.location}</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
          <p className="max-w-2xl text-muted-foreground">{temple.description}</p>
          <Button
            onClick={() => toggleFollowTemple(temple.id)}
            variant={following ? "default" : "outline"}
            size="lg"
            className={cn(
              "gap-2",
              following && "bg-primary text-primary-foreground"
            )}
          >
            <Heart className={cn("h-5 w-5", following && "fill-current")} />
            {following ? 'Following' : 'Follow Temple'}
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pooja Timings */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border bg-accent/50">
              <CardTitle className="flex items-center gap-2 font-serif text-xl">
                <Clock className="h-5 w-5 text-primary" />
                Pooja Timings
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {temple.poojaTimings.map((timing, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 p-4 transition-colors hover:bg-accent/30"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{timing.name}</h4>
                    {timing.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{timing.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="shrink-0 border-primary/30 bg-primary/5 text-primary">
                    {timing.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border bg-accent/50">
              <CardTitle className="flex items-center gap-2 font-serif text-xl">
                <Bell className="h-5 w-5 text-primary" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {temple.announcements.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No announcements at this time
                </div>
              ) : (
                temple.announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 transition-colors hover:bg-accent/30">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{announcement.title}</h4>
                      <Badge className={cn("shrink-0 capitalize", getAnnouncementBadgeColor(announcement.type))}>
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{announcement.content}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
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
              <CardHeader className="border-b border-border bg-accent/50">
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {temple.contact.phone && (
                  <a 
                    href={`tel:${temple.contact.phone}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{temple.contact.phone}</p>
                    </div>
                  </a>
                )}
                {temple.contact.email && (
                  <a 
                    href={`mailto:${temple.contact.email}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{temple.contact.email}</p>
                    </div>
                  </a>
                )}
                {temple.contact.website && (
                  <a 
                    href={temple.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <p className="font-medium flex items-center gap-1">
                        {temple.contact.website.replace('https://', '')}
                        <ExternalLink className="h-3 w-3" />
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
              <CardHeader className="border-b border-border bg-accent/50">
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
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
                <div className="mt-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open in Google Maps
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Divine Temple Platform. Connecting devotees with sacred spaces.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TempleDetails;
