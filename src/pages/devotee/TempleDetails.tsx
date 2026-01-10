import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Clock, Bell, Calendar, Phone, Mail, Globe, ExternalLink, CreditCard, CalendarCheck, Palmtree, RefreshCw, ChevronDown, Users, Play, MessageCircle, Sparkles } from 'lucide-react';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/ShareButton';
import TempleGallery from '@/components/TempleGallery';
import TempleHistory from '@/components/TempleHistory';
import TempleMusicPlayer from '@/components/TempleMusicPlayer';
import LiveDarshan from '@/components/LiveDarshan';
import TemplePatrons from '@/components/TemplePatrons';
import TempleChannel from '@/components/TempleChannel';
import { useState } from 'react';

const TempleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getTempleById, loading, toggleFollowTemple, isFollowing } = useTemple();
  const { t } = useLanguage();
  const [patronsOpen, setPatronsOpen] = useState(false);
  
  const temple = id ? getTempleById(id) : undefined;
  const following = id ? isFollowing(id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-6 h-8 w-32" />
          <Skeleton className="mb-8 aspect-[21/9] w-full rounded-2xl" />
          <Skeleton className="mb-4 h-10 w-3/4" />
          <Skeleton className="mb-8 h-6 w-1/2" />
        </div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
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

  // Mock gallery images
  const galleryImages: Array<{ id: string; url: string; caption: string; category: 'architecture' | 'daily_darshan' | 'event' | 'festival'; date: string }> = [
    { id: '1', url: temple.image, caption: 'Main Temple View', category: 'architecture', date: '2024-01-15' },
    { id: '2', url: temple.image, caption: 'Festival Celebration', category: 'festival', date: '2024-01-10' },
    { id: '3', url: temple.image, caption: 'Morning Darshan', category: 'daily_darshan', date: '2024-01-08' },
    { id: '4', url: temple.image, caption: 'Temple Architecture', category: 'architecture', date: '2024-01-05' },
    { id: '5', url: temple.image, caption: 'Evening Aarti', category: 'daily_darshan', date: '2024-01-03' },
    { id: '6', url: temple.image, caption: 'Gopuram Detail', category: 'architecture', date: '2024-01-01' },
  ];

  // Mock temple history
  const templeHistory = {
    originStory: `${temple.name} has a rich history dating back several centuries. According to legend, this sacred site was established by divine intervention.`,
    deitySignificance: `The presiding deity ${temple.deity} is believed to bestow blessings upon devotees who visit with sincere devotion.`,
    famousMiracles: ['Answered prayers of childless couples', 'Miraculous healings reported by devotees'],
    pastKumbabishekams: [{ year: 2020, description: 'Grand renovation and consecration ceremony' }],
    famousPoojas: ['Abhishekam', 'Archana', 'Homam'],
    architecturalSignificance: 'The temple showcases traditional Dravidian architecture with intricate carvings and towering gopurams.'
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <img
            src={temple.image}
            alt={temple.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Back Button - Floating */}
          <Link 
            to="/" 
            className="absolute top-4 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground transition-all hover:bg-background hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          {/* Share Button - Floating */}
          <div className="absolute top-4 right-4 z-10">
            <ShareButton
              title={temple.name}
              text={`Visit ${temple.name} on Templo 🙏`}
              url={window.location.href}
              variant="outline"
              size="icon"
              showLabel={false}
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:bg-background"
            />
          </div>
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="container mx-auto">
              <Badge className="mb-3 bg-primary/90 text-primary-foreground text-sm px-3 py-1.5 backdrop-blur-sm">
                <Sparkles className="mr-1.5 h-4 w-4" />
                {temple.deity}
              </Badge>
              <h1 className="mb-2 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                {temple.name}
              </h1>
              <div className="flex items-center gap-2 text-base text-muted-foreground sm:text-lg">
                <MapPin className="h-5 w-5" />
                <span>{temple.location}, {temple.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <Button
                onClick={() => toggleFollowTemple(temple.id)}
                variant={following ? "default" : "outline"}
                size="lg"
                className={cn(
                  "gap-2 rounded-full shrink-0",
                  following && "bg-primary text-primary-foreground"
                )}
              >
                <Heart className={cn("h-5 w-5", following && "fill-current")} />
                <span>{following ? t('following') : t('follow')}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section className="container mx-auto px-4 py-8">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {temple.description}
          </p>
        </section>

        {/* Main Content Tabs */}
        <div className="container mx-auto px-4 pb-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-auto p-1 rounded-2xl bg-card mb-6">
              <TabsTrigger value="info" className="rounded-xl py-3 text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Clock className="h-4 w-4 mr-2 hidden sm:inline" />
                Info
              </TabsTrigger>
              <TabsTrigger value="explore" className="rounded-xl py-3 text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Play className="h-4 w-4 mr-2 hidden sm:inline" />
                Explore
              </TabsTrigger>
              <TabsTrigger value="updates" className="rounded-xl py-3 text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <MessageCircle className="h-4 w-4 mr-2 hidden sm:inline" />
                Updates
              </TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info" className="mt-0 space-y-8">
              {/* Timings Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">{t('timings')}</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {temple.poojaTimings.map((timing, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/50 transition-all hover:border-primary/30"
                    >
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-medium text-foreground">{timing.name}</h4>
                        {timing.description && (
                          <p className="mt-1 text-sm text-muted-foreground">{timing.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="shrink-0 border-primary/30 bg-primary/5 text-primary font-semibold px-3 py-1.5">
                        {timing.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* Announcements Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">{t('announcements')}</h2>
                </div>
              {temple.announcements.length === 0 ? (
                  <div className="p-8 text-center text-lg text-muted-foreground rounded-2xl bg-card border border-border/50">
                    No announcements at this time
                  </div>
                ) : (
                  <div className="space-y-3">
                    {temple.announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 sm:p-5 rounded-2xl bg-card border border-border/50 transition-all hover:border-primary/30">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h4 className="text-base sm:text-lg font-medium text-foreground">{announcement.title}</h4>
                          <Badge className={cn("shrink-0 capitalize text-sm rounded-full px-3", getAnnouncementBadgeColor(announcement.type))}>
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
                    ))}
                  </div>
                )}
              </section>

              {/* Contact & Location Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Contact Information */}
                {temple.contact && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Contact</h2>
                    </div>
                    <div className="space-y-3">
                      {temple.contact.phone && (
                        <a 
                          href={`tel:${temple.contact.phone}`}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 text-foreground hover:border-primary/30 transition-all group"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Phone className="h-5 w-5 text-primary" />
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
                        className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 text-foreground hover:border-primary/30 transition-all group"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Mail className="h-5 w-5 text-primary" />
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
                          className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 text-foreground hover:border-primary/30 transition-all group"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Globe className="h-5 w-5 text-primary" />
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
                    </div>
                  </section>
                )}

                {/* Location Map */}
                {temple.coordinates && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Location</h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-card border border-border/50">
                      <div className="aspect-video">
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
                      <div className="p-4">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="lg" className="w-full gap-2 rounded-full">
                            <ExternalLink className="h-5 w-5" />
                            Open in Google Maps
                          </Button>
                        </a>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </TabsContent>

            {/* Explore Tab */}
            <TabsContent value="explore" className="mt-0 space-y-8">
              {/* Live Darshan */}
              <LiveDarshan templeId={temple.id} templeName={temple.name} />

              {/* Temple Music Player */}
              <TempleMusicPlayer templeName={temple.name} tracks={[]} />

              {/* Photo Gallery */}
              <TempleGallery images={galleryImages} templeName={temple.name} templeId={temple.id} />

              {/* Temple History */}
              <TempleHistory history={templeHistory} templeName={temple.name} templeId={temple.id} />
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="mt-0">
              <TempleChannel templeId={temple.id} templeName={temple.name} />
            </TabsContent>

            {/* Patrons Tab */}
            <TabsContent value="patrons" className="mt-0">
              <TemplePatrons templeId={temple.id} templeName={temple.name} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TempleDetails;
