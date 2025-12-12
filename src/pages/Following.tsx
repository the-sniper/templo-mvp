import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, ArrowLeft, Bell, Sparkles, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { useTemple } from '@/context/TempleContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Following = () => {
  const { temples, followedTemples, toggleFollowTemple } = useTemple();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('temples');

  const followedTemplesList = useMemo(() => {
    return temples.filter(temple => followedTemples.includes(temple.id));
  }, [temples, followedTemples]);

  // Get all festivals from followed temples
  const upcomingFestivals = useMemo(() => {
    const festivals: Array<{
      id: string;
      title: string;
      date: string;
      templeName: string;
      templeId: string;
      type: string;
      content: string;
    }> = [];

    followedTemplesList.forEach(temple => {
      temple.announcements
        .filter(a => a.type === 'festival' || a.type === 'event')
        .forEach(announcement => {
          festivals.push({
            id: announcement.id,
            title: announcement.title,
            date: announcement.date,
            templeName: temple.name,
            templeId: temple.id,
            type: announcement.type,
            content: announcement.content,
          });
        });
    });

    // Sort by date
    return festivals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [followedTemplesList]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/" className="mb-6 inline-flex items-center text-base font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('back')}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                {t('myTemples')}
              </h1>
              <p className="text-muted-foreground">
                {followedTemplesList.length} {t('templesFollowed')}
              </p>
            </div>
          </div>
        </div>

        {followedTemplesList.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">{t('noFollowedTemples')}</h3>
              <p className="text-muted-foreground mb-6">{t('startFollowingTemples')}</p>
              <Link to="/">
                <Button size="lg" className="rounded-xl">
                  {t('exploreTemples')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 h-12 w-full rounded-xl bg-muted p-1 grid grid-cols-2">
              <TabsTrigger value="temples" className="rounded-lg text-base data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Heart className="h-4 w-4 mr-2" />
                {t('temples')} ({followedTemplesList.length})
              </TabsTrigger>
              <TabsTrigger value="festivals" className="rounded-lg text-base data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {t('festivals')} ({upcomingFestivals.length})
              </TabsTrigger>
            </TabsList>

            {/* Followed Temples List */}
            <TabsContent value="temples" className="mt-0">
              <div className="space-y-3">
                {followedTemplesList.map((temple) => (
                  <Card key={temple.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4">
                        <Link to={`/temple/${temple.id}`} className="shrink-0">
                          <img
                            src={temple.image}
                            alt={temple.name}
                            className="h-24 w-24 sm:h-28 sm:w-28 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </Link>
                        <div className="flex-1 py-3 pr-3">
                          <Link to={`/temple/${temple.id}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                              {temple.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="line-clamp-1">{temple.city}, {temple.state}</span>
                          </div>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {temple.deity}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2 pr-3">
                          <Link to={`/temple/${temple.id}`}>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full text-destructive hover:bg-destructive/10"
                            onClick={() => toggleFollowTemple(temple.id)}
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upcoming Festivals Calendar */}
            <TabsContent value="festivals" className="mt-0">
              {upcomingFestivals.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-bold">{t('noUpcomingFestivals')}</h3>
                    <p className="text-muted-foreground">{t('checkBackLater')}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {upcomingFestivals.map((festival, index) => (
                    <Card key={`${festival.id}-${index}`} className="overflow-hidden transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-lg font-bold leading-none">
                              {new Date(festival.date).getDate()}
                            </span>
                            <span className="text-xs uppercase">
                              {new Date(festival.date).toLocaleDateString('en', { month: 'short' })}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-foreground line-clamp-1">
                                {festival.title}
                              </h3>
                              <Badge 
                                variant={festival.type === 'festival' ? 'default' : 'secondary'}
                                className="shrink-0 text-xs capitalize"
                              >
                                {festival.type}
                              </Badge>
                            </div>
                            <Link 
                              to={`/temple/${festival.templeId}`}
                              className="text-sm text-primary hover:underline mt-1 inline-block"
                            >
                              {festival.templeName}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {festival.content}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(festival.date)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card/50 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Following;
