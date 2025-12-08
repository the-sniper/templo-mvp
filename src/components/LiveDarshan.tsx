import React, { useState } from 'react';
import { Video, VideoOff, Bell, BellOff, Users, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="h-5 w-5 text-primary" />
            {t('liveDarshan')}
          </CardTitle>
          {isLive && (
            <Badge variant="destructive" className="animate-pulse">
              ● LIVE
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLive ? (
          <>
            {/* Live Stream View */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
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
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {viewerCount.toLocaleString()} watching
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" onClick={startWatching}>
                    <Video className="h-5 w-5 mr-2" />
                    Watch Live Darshan
                  </Button>
                </div>
              )}
            </div>

            {/* Live Actions */}
            <div className="flex gap-2">
              <ShareButton
                title={`Live Darshan - ${templeName}`}
                text={`Watch live darshan from ${templeName} now!`}
                url={`${window.location.origin}/temple/${templeId}?live=true`}
                variant="outline"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={toggleNotifications}
                className="flex-1"
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
            <div className="aspect-video bg-accent/50 rounded-lg flex items-center justify-center mb-4">
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
            <Button
              variant={notificationsEnabled ? 'secondary' : 'default'}
              className="w-full"
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveDarshan;
