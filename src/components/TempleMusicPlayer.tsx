import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
    url: '',
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

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Music className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">{t('templeMusic')}</h2>
      </div>
      
      <div className="rounded-2xl bg-accent/50 p-4 sm:p-6">
        {/* Now Playing */}
        <div className="bg-primary/5 rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Now Playing</p>
          <p className="font-medium text-foreground">
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
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{Math.floor(progress / 100 * 330 / 60)}:{String(Math.floor(progress / 100 * 330 % 60)).padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={prevTrack} className="h-12 w-12 rounded-full">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack} className="h-12 w-12 rounded-full">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="shrink-0">
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
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`w-full text-left p-3 rounded-xl transition-colors ${
                index === currentTrackIndex ? 'bg-primary/10 text-primary' : 'hover:bg-accent/70'
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
        <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-accent/30 rounded-xl text-center">
          <p className="font-medium text-foreground">🌅 Start your day with morning Suprabhatam</p>
          <p className="text-xs text-muted-foreground mt-1">Daily at 5:30 AM</p>
        </div>
      </div>
    </section>
  );
};

export default TempleMusicPlayer;