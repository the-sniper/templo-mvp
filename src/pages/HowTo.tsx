import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Heart, CreditCard, CalendarCheck, Palmtree, RefreshCw, Play, Music, Image, Users, Star, MapPin, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const HowTo = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: 'Discover Temples',
      description: 'Browse and search temples across India. Use filters to find temples by deity, city, or state. Enable location to see nearby temples sorted by distance.',
      steps: ['Visit the home page', 'Use the search bar to find temples by name', 'Click filters to narrow by deity, city, or state', 'Tap "Nearby" to find temples near you']
    },
    {
      icon: Heart,
      title: 'Follow Temples',
      description: 'Follow your favorite temples to stay updated with their announcements, festivals, and events.',
      steps: ['Open any temple page', 'Click the "Follow" button', 'View all followed temples in the Following page', 'Access festivals calendar for all followed temples']
    },
    {
      icon: CreditCard,
      title: 'Make Donations',
      description: 'Support temples with secure online donations. Get digital receipts for all your contributions.',
      steps: ['Open a temple page', 'Click "Donate" in the action bar', 'Select a preset amount or enter custom amount', 'Add optional dedication message', 'Complete payment securely']
    },
    {
      icon: RefreshCw,
      title: 'Recurring Donations',
      description: 'Set up automatic daily, weekly, or monthly donations to temples you support regularly.',
      steps: ['Open a temple page', 'Click the recurring donation button', 'Choose frequency: daily, weekly, or monthly', 'Select or enter amount', 'Pause or cancel anytime']
    },
    {
      icon: CalendarCheck,
      title: 'Book Special Darshan',
      description: 'Reserve slots for special darshan and skip the queue during your temple visit.',
      steps: ['Open a temple page', 'Click "Book Slot" in the action bar', 'Select your preferred date and time', 'Enter visitor details', 'Confirm your booking']
    },
    {
      icon: Palmtree,
      title: 'Request Pooja Services',
      description: 'Request traditional poojas performed by temple priests on your behalf, even from far away.',
      steps: ['Open a temple page', 'Click "Request Pooja"', 'Choose from available pooja services', 'Select a priest and date', 'Add occasion details and complete booking']
    },
    {
      icon: Play,
      title: 'Live Darshan',
      description: 'Experience divine darshan from anywhere with live streaming from temples.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Click on Live Darshan section', 'Watch live when streaming is active']
    },
    {
      icon: Music,
      title: 'Temple Music',
      description: 'Listen to sacred chants, bhajans, and temple music for a spiritual experience.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Use the music player to play sacred tracks', 'Supports background playback']
    },
    {
      icon: Image,
      title: 'Temple Gallery',
      description: 'View beautiful photos of temples, festivals, and daily darshan moments.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Browse through the photo gallery', 'Click any photo to view larger']
    },
    {
      icon: Star,
      title: 'Reviews & Ratings',
      description: 'Read and share temple visit experiences with the community.',
      steps: ['Open a temple page', 'Go to "Reviews" tab', 'Read community reviews', 'Click "Write a Review" to share your experience']
    },
    {
      icon: Users,
      title: 'Temple Patrons',
      description: 'View the generous donors who support temples (with their permission).',
      steps: ['Open a temple page', 'Go to "Patrons" tab', 'View top donors by time period', 'Filter by region (India/NRI)']
    },
    {
      icon: MapPin,
      title: 'Temple Location',
      description: 'Find directions and navigate to temples easily.',
      steps: ['Open a temple page', 'Go to "Info" tab', 'View the map location', 'Click "Open in Google Maps" for directions']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-lg">{t('back')}</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How to Use Templo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete guide to all features available on Templo. Learn how to discover temples, make donations, book darshan, and connect with your spiritual journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  {feature.title}
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">How to:</p>
                <ol className="space-y-1.5">
                  {feature.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border/50 text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Begin your spiritual journey by exploring temples near you or searching for your favorite temple.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2 rounded-full text-lg px-8">
              <Search className="h-5 w-5" />
              Explore Temples
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Templo. Connecting Devotees with Temples.</p>
        </div>
      </footer>
    </div>
  );
};

export default HowTo;
