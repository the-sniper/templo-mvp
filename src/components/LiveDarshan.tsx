import React, { useState } from 'react';
import { Video, VideoOff, Bell, BellOff, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import ShareButton from './ShareButton';

interface LiveDarshanProps {
  templeName: string;
  templeId: string;
  isLive?: boolean;
  viewerCount?: number;
  scheduledTime?: string;
}

const LiveDarshan: React.FC<LiveDarshanProps> = ({
  templeName,
  templeId,
  isLive = false,
  viewerCount = 0,
  scheduledTime,
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isWatching, setIsWatching] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? 'Notifications Disabled' : 'Notifications Enabled',
      description: notificationsEnabled
        ? 'You will no longer receive live darshan alerts'
        : 'You will be notified when live darshan starts',
    });
  };

  const startWatching = () => {
    setIsWatching(true);
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Video className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">{t('liveDarshan')}</h2>
        {isLive && (
          <Badge variant="destructive" className="animate-pulse rounded-full">
            ● LIVE
          </Badge>
        )}
      </div>
      
      <div className="rounded-2xl bg-muted/30 overflow-hidden">
        {isLive ? (
          <>
            {/* Live Stream View */}
            <div className="relative aspect-video bg-foreground/5">
              {isWatching ? (
                <>
                  {/* Placeholder for actual video stream */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="text-center">
                      <Video className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                      <p className="text-foreground font-medium">Live Darshan Stream</p>
                      <p className="text-sm text-muted-foreground">{templeName}</p>
                    </div>
                  </div>
                  {/* Viewer count overlay */}
                  <div className="absolute top-3 right-3 bg-foreground/60 text-background px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    {viewerCount.toLocaleString()} watching
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" onClick={startWatching} className="rounded-full gap-2">
                    <Video className="h-5 w-5" />
                    Watch Live Darshan
                  </Button>
                </div>
              )}
            </div>

            {/* Live Actions */}
            <div className="flex gap-2 p-4">
              <ShareButton
                title={`Live Darshan - ${templeName}`}
                text={`Watch live darshan from ${templeName} now!`}
                url={`${window.location.origin}/temple/${templeId}?live=true`}
                variant="outline"
                className="flex-1 rounded-full"
              />
              <Button
                variant="outline"
                onClick={toggleNotifications}
                className="flex-1 rounded-full"
              >
                {notificationsEnabled ? (
                  <BellOff className="h-4 w-4 mr-2" />
                ) : (
                  <Bell className="h-4 w-4 mr-2" />
                )}
                {notificationsEnabled ? 'Mute' : 'Notify'}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Offline State */}
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <VideoOff className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium text-foreground">Live Darshan Offline</p>
                {scheduledTime ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    Next scheduled: {scheduledTime}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    Check back during temple hours
                  </p>
                )}
              </div>
            </div>

            {/* Notification Toggle */}
            <div className="p-4 pt-0">
              <Button
                variant={notificationsEnabled ? 'secondary' : 'default'}
                className="w-full rounded-full"
                onClick={toggleNotifications}
              >
                {notificationsEnabled ? (
                  <>
                    <BellOff className="h-4 w-4 mr-2" />
                    Notifications Enabled
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    Notify When Live
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                Get notified when live darshan starts
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LiveDarshan;