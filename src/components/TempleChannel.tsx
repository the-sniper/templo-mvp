import { useState } from 'react';
import { MessageCircle, Image, Calendar, Bell, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  // Mock channel posts
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
      announcement: 'bg-primary/10 text-primary',
      photo: 'bg-accent text-accent-foreground',
      event: 'bg-secondary text-secondary-foreground',
      update: 'bg-muted text-muted-foreground',
    };
    return styles[type];
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Temple Updates</h2>
          <p className="text-sm text-muted-foreground">Official announcements from {templeName}</p>
        </div>
      </div>

      {/* Channel Container - WhatsApp-like */}
      <Card className="border border-border/50 overflow-hidden">
        {/* Channel Header */}
        <CardHeader className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-semibold">{templeName} Official</CardTitle>
              <p className="text-sm text-muted-foreground">Temple Administrator</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Bell className="h-3 w-3" />
              Channel
            </Badge>
          </div>
        </CardHeader>

        {/* Messages Container */}
        <CardContent className="p-0 max-h-[500px] overflow-y-auto bg-accent/20">
          <div className="p-4 space-y-4">
            {posts.length === 0 ? (
              <div className="py-12 text-center">
                <MessageCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No updates yet</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col max-w-[85%] ml-auto"
                >
                  <div className="bg-card rounded-2xl rounded-tr-sm p-4 shadow-sm border border-border/50">
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn("gap-1 text-xs capitalize", getTypeBadge(post.type))}>
                        {getTypeIcon(post.type)}
                        {post.type}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                    
                    {/* Image if present */}
                    {post.image && (
                      <div className="mt-3 rounded-xl overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Timestamp */}
                    <p className="text-xs text-muted-foreground mt-2 text-right">
                      {formatTime(post.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>

        {/* Footer Note */}
        <div className="bg-muted/50 p-3 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">
            Only temple administrators can post in this channel
          </p>
        </div>
      </Card>
    </section>
  );
};

export default TempleChannel;
