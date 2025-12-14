import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Award, Globe, Heart, Crown, Star, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Patron {
  id: string;
  name: string;
  isAnonymous: boolean;
  region: string;
  badge: 'diamond' | 'gold' | 'silver' | 'bronze';
  message?: string;
  totalDonations: number;
  isNRI: boolean;
  displayAmount: boolean;
}

interface TemplePatronsProps {
  templeId: string;
  templeName: string;
}

// Sample patron data - in production, this would come from context/API
const samplePatrons: Patron[] = [
  { id: '1', name: 'Rajan Family', isAnonymous: false, region: 'UK', badge: 'diamond', message: 'In memory of our beloved parents', totalDonations: 50000, isNRI: true, displayAmount: false },
  { id: '2', name: 'Priya Sharma', isAnonymous: false, region: 'Dubai', badge: 'gold', message: 'For family peace and prosperity', totalDonations: 25000, isNRI: true, displayAmount: true },
  { id: '3', name: 'Anonymous Devotee', isAnonymous: true, region: 'Chennai', badge: 'gold', totalDonations: 20000, isNRI: false, displayAmount: false },
  { id: '4', name: 'Venkatesh K.', isAnonymous: false, region: 'USA', badge: 'silver', message: 'Blessings for our children', totalDonations: 15000, isNRI: true, displayAmount: true },
  { id: '5', name: 'Lakshmi Narayanan', isAnonymous: false, region: 'Singapore', badge: 'silver', totalDonations: 12000, isNRI: true, displayAmount: false },
  { id: '6', name: 'Kumar Trust', isAnonymous: false, region: 'Mumbai', badge: 'bronze', message: 'Annual seva contribution', totalDonations: 10000, isNRI: false, displayAmount: true },
  { id: '7', name: 'Sundar R.', isAnonymous: false, region: 'Bangalore', badge: 'bronze', totalDonations: 8000, isNRI: false, displayAmount: false },
  { id: '8', name: 'A Well-wisher', isAnonymous: true, region: 'London', badge: 'bronze', message: 'In loving memory of Amma', totalDonations: 7500, isNRI: true, displayAmount: false },
];

const badgeConfig = {
  diamond: { icon: Gem, label: 'Diamond Patron', color: 'bg-primary/10 text-primary border-primary/30' },
  gold: { icon: Crown, label: 'Gold Patron', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30' },
  silver: { icon: Star, label: 'Silver Patron', color: 'bg-slate-400/10 text-slate-500 border-slate-400/30' },
  bronze: { icon: Award, label: 'Bronze Patron', color: 'bg-orange-600/10 text-orange-600 border-orange-600/30' },
};

const TemplePatrons = ({ templeId, templeName }: TemplePatronsProps) => {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [regionFilter, setRegionFilter] = useState<'all' | 'nri' | 'india'>('all');

  const filteredPatrons = samplePatrons.filter(patron => {
    if (regionFilter === 'nri') return patron.isNRI;
    if (regionFilter === 'india') return !patron.isNRI;
    return true;
  });

  const topPatrons = filteredPatrons.slice(0, 5);
  const allPatrons = filteredPatrons;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Our Patrons</h2>
          <p className="text-sm text-muted-foreground">With blessings to our devoted supporters</p>
        </div>
      </div>
      
      <div className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6">
        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 rounded-xl bg-muted/30">
            <TabsTrigger value="leaderboard" className="rounded-lg">Top Supporters</TabsTrigger>
            <TabsTrigger value="all" className="rounded-lg">All Patrons</TabsTrigger>
          </TabsList>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
              {(['daily', 'weekly', 'monthly'] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={timeFilter === filter ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeFilter(filter)}
                  className="text-xs capitalize rounded-lg"
                >
                  {filter}
                </Button>
              ))}
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
              <Button
                variant={regionFilter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRegionFilter('all')}
                className="text-xs rounded-lg"
              >
                All
              </Button>
              <Button
                variant={regionFilter === 'nri' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRegionFilter('nri')}
                className="text-xs rounded-lg"
              >
                <Globe className="h-3 w-3 mr-1" />
                NRI
              </Button>
              <Button
                variant={regionFilter === 'india' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRegionFilter('india')}
                className="text-xs rounded-lg"
              >
                India
              </Button>
            </div>
          </div>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-0">
            <div className="space-y-3">
              {topPatrons.map((patron, index) => {
                const BadgeIcon = badgeConfig[patron.badge].icon;
                return (
                  <div
                    key={patron.id}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl transition-colors",
                      index === 0 && "bg-primary/10",
                      index !== 0 && "bg-card/80 hover:bg-card"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm shrink-0",
                      index === 0 && "bg-primary text-primary-foreground",
                      index === 1 && "bg-amber-500 text-white",
                      index === 2 && "bg-orange-500 text-white",
                      index > 2 && "bg-muted text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">
                          {patron.isAnonymous ? 'Anonymous Devotee' : patron.name}
                        </span>
                        <Badge variant="outline" className={cn("text-xs rounded-full", badgeConfig[patron.badge].color)}>
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {badgeConfig[patron.badge].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {patron.region}
                        </span>
                        {patron.displayAmount && (
                          <span className="text-xs text-primary font-medium">
                            ₹{patron.totalDonations.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {patron.message && (
                        <p className="text-sm text-muted-foreground mt-2 italic flex items-start gap-1">
                          <Heart className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                          "{patron.message}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {topPatrons.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No patrons found for the selected filters
                </div>
              )}
            </div>
          </TabsContent>

          {/* All Patrons Tab */}
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-3 sm:grid-cols-2">
              {allPatrons.map((patron) => {
                const BadgeIcon = badgeConfig[patron.badge].icon;
                return (
                  <div
                    key={patron.id}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/80 hover:bg-card transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <BadgeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground text-sm">
                          {patron.isAnonymous ? 'Anonymous Devotee' : patron.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {patron.region}
                        </span>
                        <Badge variant="outline" className={cn("text-xs py-0 rounded-full", badgeConfig[patron.badge].color)}>
                          {badgeConfig[patron.badge].label.split(' ')[0]}
                        </Badge>
                      </div>
                      {patron.message && (
                        <p className="text-xs text-muted-foreground mt-1 italic line-clamp-1">
                          "{patron.message}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {allPatrons.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No patrons found for the selected filters
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplePatrons;