import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface Track {
  id: string;
  title: string;
  titleLocal?: string;
  artist: string;
  duration: string;
  url: string;
}

interface TempleMusicPlayerProps {
  templeName: string;
  tracks: Track[];
}

// Sample tracks (in production, these would come from admin uploads)
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Morning Suprabhatam',
    titleLocal: 'காலை சுப்ரபாதம்',
    artist: 'Temple Priests',
    duration: '5:30',
    url: '', // Placeholder - would be actual audio URL
  },
  {
    id: '2',
    title: 'Om Namah Shivaya',
    titleLocal: 'ஓம் நமசிவாய',
    artist: 'Temple Choir',
    duration: '4:15',
    url: '',
  },
  {
    id: '3',
    title: 'Evening Aarti',
    titleLocal: 'மாலை ஆரத்தி',
    artist: 'Temple Musicians',
    duration: '6:45',
    url: '',
  },
];

const TempleMusicPlayer: React.FC<TempleMusicPlayerProps> = ({ templeName, tracks = sampleTracks }) => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In production, this would control actual audio playback
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Simulate progress for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (tracks.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Music className="h-5 w-5 text-primary" />
          {t('templeMusic')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Now Playing */}
        <div className="bg-accent/50 rounded-lg p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Now Playing</p>
          <p className="font-medium">
            {language !== 'en' && currentTrack.titleLocal ? currentTrack.titleLocal : currentTrack.title}
          </p>
          <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="cursor-pointer"
            onValueChange={(value) => setProgress(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{Math.floor(progress / 100 * 330 / 60)}:{String(Math.floor(progress / 100 * 330 % 60)).padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={prevTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={(value) => {
              setVolume(value[0]);
              setIsMuted(false);
            }}
          />
        </div>

        {/* Track List */}
        <div className="mt-4 space-y-2">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                index === currentTrackIndex ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    {language !== 'en' && track.titleLocal ? track.titleLocal : track.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Morning Suprabhatam Banner */}
        <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-accent rounded-lg text-center">
          <p className="text-sm font-medium">🌅 Start your day with morning Suprabhatam</p>
          <p className="text-xs text-muted-foreground">Daily at 5:30 AM</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleMusicPlayer;
