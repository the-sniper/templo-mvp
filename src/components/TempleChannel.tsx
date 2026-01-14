import { useState } from 'react';
import { MessageCircle, Image, Calendar, Bell, Share2, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/ShareButton';

interface ChannelPost {
  id: string;
  content: string;
  image?: string;
  timestamp: Date;
  type: 'announcement' | 'update' | 'photo' | 'event';
}

interface TempleChannelProps {
  templeId: string;
  templeName: string;
}

const TempleChannel = ({ templeId, templeName }: TempleChannelProps) => {
  // Mock channel posts - In production, this would come from admin-posted updates
  const [posts] = useState<ChannelPost[]>([
    {
      id: '1',
      content: '🙏 Good morning devotees! Today\'s Suprabhatam will begin at 5:30 AM. Special abhishekam at 6:00 AM.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'announcement',
    },
    {
      id: '2',
      content: 'Beautiful morning darshan moments from today 🌸',
      image: '/placeholder.svg',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: 'photo',
    },
    {
      id: '3',
      content: '📅 Reminder: Special Navaratri celebrations starting next week. Register for special pooja slots.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: 'event',
    },
    {
      id: '4',
      content: 'Temple timings update: Due to festival preparations, evening darshan will close at 8:30 PM instead of 9:00 PM this week.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'update',
    },
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const getTypeIcon = (type: ChannelPost['type']) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-3.5 w-3.5" />;
      case 'photo':
        return <Image className="h-3.5 w-3.5" />;
      case 'event':
        return <Calendar className="h-3.5 w-3.5" />;
      default:
        return <MessageCircle className="h-3.5 w-3.5" />;
    }
  };

  const getTypeBadge = (type: ChannelPost['type']) => {
    const styles = {
      announcement: 'bg-primary/10 text-primary border-primary/20',
      photo: 'bg-accent text-accent-foreground border-accent',
      event: 'bg-secondary text-secondary-foreground border-secondary',
      update: 'bg-muted text-muted-foreground border-border',
    };
    return styles[type];
  };

  const getTypeLabel = (type: ChannelPost['type']) => {
    const labels = {
      announcement: 'Announcement',
      photo: 'Photo Update',
      event: 'Upcoming Event',
      update: 'Temple Update',
    };
    return labels[type];
  };

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Temple Updates</h2>
            <p className="text-sm text-muted-foreground">Official announcements from {templeName}</p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1.5 border-primary/30">
          <Bell className="h-3.5 w-3.5" />
          {posts.length} Updates
        </Badge>
      </div>

      {/* Posts Feed - Full Width Cards */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="border border-border/50">
            <CardContent className="py-12 text-center">
              <MessageCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No updates yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Check back soon for temple announcements</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card 
              key={post.id} 
              className="border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <CardContent className="p-0">
                {/* Post Header with Type Badge */}
                <div className="flex items-center justify-between gap-3 p-4 pb-0">
                  <Badge 
                    variant="outline" 
                    className={cn("gap-1.5 text-xs font-medium capitalize", getTypeBadge(post.type))}
                  >
                    {getTypeIcon(post.type)}
                    {getTypeLabel(post.type)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(post.timestamp)}
                  </span>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>
                </div>
                
                {/* Image if present */}
                {post.image && (
                  <div className="px-4 pb-4">
                    <div className="rounded-xl overflow-hidden bg-muted">
                      <img 
                        src={post.image} 
                        alt="Temple update" 
                        className="w-full h-56 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground hover:text-primary rounded-full">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">Helpful</span>
                    </Button>
                  </div>
                  <ShareButton
                    title={`${templeName} - ${getTypeLabel(post.type)}`}
                    text={post.content}
                    url={window.location.href}
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-muted-foreground hover:text-primary rounded-full"
                    showLabel={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Enable Notifications CTA */}
      <Card className="mt-6 border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="py-6 text-center">
          <Bell className="mx-auto mb-3 h-8 w-8 text-primary/70" />
          <h3 className="font-medium text-foreground mb-1">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get notified when {templeName} posts new updates
          </p>
          <Button variant="default" size="sm" className="rounded-full gap-2">
            <Bell className="h-4 w-4" />
            Enable Notifications
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default TempleChannel;