import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Heart, CreditCard, CalendarCheck, Palmtree, RefreshCw, Play, Music, Image, Users, Star, MapPin, HelpCircle, User, Globe, Share2, BookOpen, Calendar, History, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const HowTo = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: 'Discover Temples',
      description: 'Browse and search temples across India. Use filters to find temples by deity, city, or state. Enable location to see nearby temples sorted by distance.',
      steps: ['Visit the Temples page', 'Use the search bar to find temples by name', 'Click filters to narrow by deity, city, or state', 'Tap "Nearby" to find temples near you'],
      category: 'discovery'
    },
    {
      icon: Heart,
      title: 'Follow Temples',
      description: 'Follow your favorite temples to stay updated with their announcements, festivals, and events.',
      steps: ['Open any temple page', 'Click the "Follow" button in the action bar', 'View all followed temples in your Dashboard', 'Unfollow anytime by clicking the button again'],
      category: 'discovery'
    },
    {
      icon: Calendar,
      title: 'Festivals Calendar',
      description: 'View upcoming festivals across all temples you follow in calendar or list view. Never miss important celebrations.',
      steps: ['Go to your Dashboard', 'Click on the "Festivals" tab', 'Toggle between Calendar and List view', 'See all upcoming festivals from your followed temples'],
      category: 'discovery'
    },
    {
      icon: History,
      title: 'Find Ancestral Temple',
      description: 'Discover your family\'s ancestral temple based on your lineage, community, and native place.',
      steps: ['Click "Ancestral Temple" in the header menu', 'Enter your family details and native place', 'View matched temples from our database', 'Add your ancestral temple if not found'],
      category: 'discovery'
    },
    {
      icon: CreditCard,
      title: 'Make Donations',
      description: 'Support temples with secure online donations. Get digital receipts for all your contributions.',
      steps: ['Open a temple page', 'Click "Donate" in the action bar', 'Select a preset amount or enter custom amount', 'Add optional dedication message', 'Complete payment and receive receipt'],
      category: 'transactions'
    },
    {
      icon: RefreshCw,
      title: 'Recurring Donations',
      description: 'Set up automatic daily, weekly, or monthly donations to temples you support regularly.',
      steps: ['Open a temple page', 'Click the recurring donation button', 'Choose frequency: daily, weekly, or monthly', 'Select or enter amount', 'Pause or cancel anytime from your Dashboard'],
      category: 'transactions'
    },
    {
      icon: CalendarCheck,
      title: 'Book Special Darshan',
      description: 'Reserve slots for special darshan and skip the queue during your temple visit.',
      steps: ['Open a temple page', 'Click "Book Slot" in the action bar', 'Select your preferred date and time slot', 'Enter number of visitors and details', 'Confirm booking and save your pass'],
      category: 'transactions'
    },
    {
      icon: Palmtree,
      title: 'Request Pooja Services',
      description: 'Request traditional poojas performed by temple priests on your behalf, even from far away.',
      steps: ['Open a temple page', 'Click "Request Pooja"', 'Browse available pooja services', 'Select a priest based on language preference', 'Choose date, add occasion details, and book'],
      category: 'transactions'
    },
    {
      icon: Play,
      title: 'Live Darshan',
      description: 'Experience divine darshan from anywhere with live streaming from temples.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Find the Live Darshan section', 'Watch live when streaming is active', 'Enable notifications for live alerts'],
      category: 'explore'
    },
    {
      icon: Music,
      title: 'Temple Music',
      description: 'Listen to sacred chants, bhajans, and temple music for a spiritual experience.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Use the music player to browse tracks', 'Play morning Suprabhatam and devotional songs', 'Music plays in background while browsing'],
      category: 'explore'
    },
    {
      icon: Image,
      title: 'Temple Gallery',
      description: 'View beautiful photos of temples, festivals, and daily darshan moments.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Browse through the photo gallery', 'Click any photo to view in full screen', 'Navigate between photos and share favorites'],
      category: 'explore'
    },
    {
      icon: BookOpen,
      title: 'Temple History',
      description: 'Learn about temple origins, deity significance, famous miracles, and architectural heritage.',
      steps: ['Open a temple page', 'Go to "Explore" tab', 'Expand History & Significance section', 'Read origin stories and deity details', 'Learn about past Kumbabishekams and rituals'],
      category: 'explore'
    },
    {
      icon: MessageCircle,
      title: 'Temple Updates',
      description: 'Get official announcements and updates directly from temple priests through the temple channel.',
      steps: ['Open a temple page', 'Go to "Updates" tab', 'View latest announcements from temple', 'Stay informed about timings, events, and more', 'Get notified when new updates are posted'],
      category: 'community'
    },
    {
      icon: Users,
      title: 'Temple Patrons',
      description: 'View the generous donors who support temples (with their permission).',
      steps: ['Open a temple page', 'Go to "Patrons" tab', 'View top supporters leaderboard', 'Filter by time period (daily/weekly/monthly)', 'Filter by region (All/NRI/India)'],
      category: 'community'
    },
    {
      icon: Share2,
      title: 'Share with Others',
      description: 'Share temple pages, donation receipts, and photos with family and friends via WhatsApp and more.',
      steps: ['Find the share button on any page', 'Click to open sharing options', 'Choose WhatsApp, copy link, or other apps', 'Share temples with family abroad', 'Spread blessings with loved ones'],
      category: 'community'
    },
    {
      icon: MapPin,
      title: 'Temple Location & Contact',
      description: 'Find directions, contact information, and navigate to temples easily.',
      steps: ['Open a temple page', 'Go to "Info" tab', 'View the interactive map', 'Click "Open in Google Maps" for navigation', 'Find phone, email, and website details'],
      category: 'info'
    },
    {
      icon: User,
      title: 'Your Dashboard',
      description: 'Access all your temple activities in one place - followed temples, donations, bookings, and settings.',
      steps: ['Click your profile icon or "Dashboard" in header', 'View overview of all activities', 'Access My Temples, Donations, Bookings tabs', 'Manage your profile in Settings', 'Track all your donation receipts'],
      category: 'account'
    },
    {
      icon: Globe,
      title: 'Change Language',
      description: 'Use Templo in your preferred language - English, Tamil, Hindi, Telugu, Kannada, or Malayalam.',
      steps: ['Look for language selector in header', 'Click to see available languages', 'Select your preferred language', 'All content will update instantly', 'Your preference is saved for next visit'],
      category: 'account'
    }
  ];

  const categories = [
    { id: 'discovery', title: 'Discover & Follow', description: 'Find and follow temples' },
    { id: 'transactions', title: 'Donations & Bookings', description: 'Support temples and book services' },
    { id: 'explore', title: 'Explore Temple', description: 'Live darshan, music, gallery & history' },
    { id: 'community', title: 'Community & Updates', description: 'Temple updates, patrons & sharing' },
    { id: 'info', title: 'Information', description: 'Location & contact details' },
    { id: 'account', title: 'Your Account', description: 'Dashboard & language settings' }
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

        {/* Features by Category */}
        {categories.map((category) => (
          <section key={category.id} className="mb-12">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features
                .filter((f) => f.category === category.id)
                .map((feature, index) => (
                  <div
                    key={index}
                    className="p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
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
          </section>
        ))}

        {/* Quick Start Section */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-card border border-border/50 text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Begin your spiritual journey by exploring temples near you or searching for your favorite temple.
          </p>
          <Link to="/temples">
            <Button size="lg" className="gap-2 rounded-full text-lg px-8">
              <Search className="h-5 w-5" />
              Explore Temples
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HowTo;
