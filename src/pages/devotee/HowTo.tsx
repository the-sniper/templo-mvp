import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Heart, CreditCard, CalendarCheck, Palmtree, RefreshCw, 
  Play, Music, Image, Users, Star, MapPin, HelpCircle, User, Globe, Share2, 
  BookOpen, Calendar, History, MessageCircle, ChevronRight, CheckCircle2,
  Sparkles, ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const HowTo = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const quickStartSteps = [
    {
      number: '01',
      title: 'Find a Temple',
      description: 'Search by name, location, or deity. Use filters to find exactly what you seek.',
      icon: Search,
      action: { label: 'Browse Temples', link: '/temples' }
    },
    {
      number: '02',
      title: 'Follow & Connect',
      description: 'Follow temples to receive updates about festivals, events, and announcements.',
      icon: Heart,
      action: { label: 'View Dashboard', link: '/dashboard' }
    },
    {
      number: '03',
      title: 'Support & Participate',
      description: 'Make donations, book darshan slots, or request pooja services remotely.',
      icon: Sparkles,
      action: { label: 'Get Started', link: '/temples' }
    }
  ];

  const categories = [
    { 
      id: 'getting-started', 
      title: 'Getting Started', 
      icon: Sparkles,
      description: 'Begin your journey'
    },
    { 
      id: 'discovery', 
      title: 'Discover', 
      icon: Search,
      description: 'Find temples'
    },
    { 
      id: 'transactions', 
      title: 'Donate & Book', 
      icon: CreditCard,
      description: 'Support temples'
    },
    { 
      id: 'explore', 
      title: 'Experience', 
      icon: Play,
      description: 'Live darshan & more'
    },
    { 
      id: 'community', 
      title: 'Community', 
      icon: Users,
      description: 'Stay connected'
    },
    { 
      id: 'account', 
      title: 'Your Profile', 
      icon: User,
      description: 'Manage account'
    }
  ];

  const features: Record<string, Array<{
    id: string;
    icon: any;
    title: string;
    description: string;
    steps: Array<{ action: string; detail: string }>;
    tip?: string;
  }>> = {
    'getting-started': [
      {
        id: 'first-visit',
        icon: MapPin,
        title: 'Your First Temple Visit',
        description: 'Complete walkthrough from finding a temple to making your first offering.',
        steps: [
          { action: 'Go to Temples page', detail: 'Click "Temples" in the header navigation' },
          { action: 'Search or browse', detail: 'Use search bar or scroll through featured temples' },
          { action: 'Open temple page', detail: 'Click on any temple card to view details' },
          { action: 'Follow the temple', detail: 'Click the heart icon to add to your favorites' },
          { action: 'Make an offering', detail: 'Use Donate, Book Slot, or Request Pooja buttons' }
        ],
        tip: 'Enable location access to see temples nearest to you!'
      }
    ],
    'discovery': [
      {
        id: 'search-temples',
        icon: Search,
        title: 'Search & Filter Temples',
        description: 'Find temples across India using powerful search and filter options.',
        steps: [
          { action: 'Visit Temples page', detail: 'Navigate to the main temples directory' },
          { action: 'Use search bar', detail: 'Type temple name, deity, or city' },
          { action: 'Apply filters', detail: 'Click filter icon to narrow by deity, state, or city' },
          { action: 'Sort results', detail: 'Choose between nearby, popular, or alphabetical' }
        ],
        tip: 'Try searching for your family deity to find related temples'
      },
      {
        id: 'follow-temples',
        icon: Heart,
        title: 'Follow Your Favorite Temples',
        description: 'Stay connected with temples that matter to you.',
        steps: [
          { action: 'Open any temple', detail: 'Click on a temple card from search results' },
          { action: 'Click Follow button', detail: 'Find the heart icon in the action bar' },
          { action: 'Access in Dashboard', detail: 'All followed temples appear in your dashboard' }
        ]
      },
      {
        id: 'festivals',
        icon: Calendar,
        title: 'Track Festivals & Events',
        description: 'Never miss important celebrations at your followed temples.',
        steps: [
          { action: 'Go to Dashboard', detail: 'Click your profile or Dashboard link' },
          { action: 'Open Festivals tab', detail: 'Find the festivals section' },
          { action: 'Switch views', detail: 'Toggle between calendar and list view' }
        ],
        tip: 'Calendar view helps you plan temple visits around festival dates'
      },
      {
        id: 'ancestral',
        icon: History,
        title: 'Find Your Ancestral Temple',
        description: 'Discover temples connected to your family lineage and native place.',
        steps: [
          { action: 'Click Ancestral Temple', detail: 'Find it in the header navigation menu' },
          { action: 'Enter family details', detail: 'Provide village, district, and surname' },
          { action: 'View matches', detail: 'See temples associated with your lineage' },
          { action: 'Add if not found', detail: 'Help us by adding your ancestral temple' }
        ]
      }
    ],
    'transactions': [
      {
        id: 'donate',
        icon: CreditCard,
        title: 'Make a Donation',
        description: 'Support temples with secure online donations and receive instant receipts.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to any temple you wish to support' },
          { action: 'Click Donate', detail: 'Find the Donate button in action bar' },
          { action: 'Choose amount', detail: 'Select preset or enter custom amount' },
          { action: 'Add dedication', detail: 'Optional: Add a message or occasion' },
          { action: 'Complete payment', detail: 'Pay securely and receive digital receipt' }
        ],
        tip: 'All donations are tax-deductible under Section 80G'
      },
      {
        id: 'recurring',
        icon: RefreshCw,
        title: 'Set Up Recurring Donations',
        description: 'Automate your regular offerings with scheduled donations.',
        steps: [
          { action: 'Open temple page', detail: 'Go to your preferred temple' },
          { action: 'Find recurring option', detail: 'Look for the repeat/recurring button' },
          { action: 'Select frequency', detail: 'Choose daily, weekly, or monthly' },
          { action: 'Set amount', detail: 'Enter your preferred donation amount' },
          { action: 'Activate', detail: 'Confirm to start automatic donations' }
        ],
        tip: 'Manage or cancel recurring donations anytime from your Dashboard'
      },
      {
        id: 'book-darshan',
        icon: CalendarCheck,
        title: 'Book Special Darshan Slot',
        description: 'Reserve your spot for VIP darshan and skip the regular queue.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to the temple' },
          { action: 'Click Book Slot', detail: 'Find the booking option' },
          { action: 'Select date & time', detail: 'Choose from available slots' },
          { action: 'Enter visitor count', detail: 'Add number of people' },
          { action: 'Confirm booking', detail: 'Save your e-pass for temple entry' }
        ]
      },
      {
        id: 'request-pooja',
        icon: Palmtree,
        title: 'Request Pooja Services',
        description: 'Have priests perform traditional poojas on your behalf from anywhere.',
        steps: [
          { action: 'Open temple page', detail: 'Select your preferred temple' },
          { action: 'Click Request Pooja', detail: 'Access the pooja services' },
          { action: 'Browse poojas', detail: 'View available services and prices' },
          { action: 'Select priest', detail: 'Choose based on language preference' },
          { action: 'Book & pay', detail: 'Add occasion details and complete booking' }
        ],
        tip: 'Some temples offer live video of your pooja being performed'
      }
    ],
    'explore': [
      {
        id: 'live-darshan',
        icon: Play,
        title: 'Watch Live Darshan',
        description: 'Experience divine darshan through live streaming from temples.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to the temple' },
          { action: 'Go to Explore tab', detail: 'Click on Explore section' },
          { action: 'Find Live Darshan', detail: 'Look for the live video section' },
          { action: 'Watch live', detail: 'View when streaming is active' }
        ],
        tip: 'Peak times are during morning and evening aarti'
      },
      {
        id: 'temple-music',
        icon: Music,
        title: 'Listen to Temple Music',
        description: 'Enjoy sacred chants, bhajans, and devotional music.',
        steps: [
          { action: 'Open temple page', detail: 'Go to any temple' },
          { action: 'Find music player', detail: 'Located in the Explore tab' },
          { action: 'Browse tracks', detail: 'Select from available devotional songs' },
          { action: 'Play in background', detail: 'Music continues while you browse' }
        ]
      },
      {
        id: 'gallery',
        icon: Image,
        title: 'View Temple Gallery',
        description: 'Browse beautiful photos of temples, festivals, and daily rituals.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to a temple' },
          { action: 'Access Gallery', detail: 'Find it in the Explore tab' },
          { action: 'Browse photos', detail: 'Click any image for fullscreen view' },
          { action: 'Share favorites', detail: 'Use share button on any photo' }
        ]
      },
      {
        id: 'history',
        icon: BookOpen,
        title: 'Learn Temple History',
        description: 'Discover origins, legends, and architectural significance.',
        steps: [
          { action: 'Open temple page', detail: 'Go to the temple' },
          { action: 'Find History section', detail: 'Located in Explore tab' },
          { action: 'Read stories', detail: 'Learn about temple origins and miracles' }
        ]
      }
    ],
    'community': [
      {
        id: 'updates',
        icon: MessageCircle,
        title: 'Temple Announcements',
        description: 'Get official updates and news directly from temple authorities.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to any temple' },
          { action: 'Go to Updates tab', detail: 'Find the announcements section' },
          { action: 'View latest news', detail: 'See timing changes, events, and more' }
        ]
      },
      {
        id: 'patrons',
        icon: Users,
        title: 'View Temple Patrons',
        description: 'See the community of devotees supporting each temple.',
        steps: [
          { action: 'Open temple page', detail: 'Go to the temple' },
          { action: 'Click Patrons tab', detail: 'View supporter leaderboard' },
          { action: 'Filter by period', detail: 'See daily, weekly, or monthly top donors' },
          { action: 'Filter by region', detail: 'View All, NRI, or India-based patrons' }
        ]
      },
      {
        id: 'share',
        icon: Share2,
        title: 'Share with Family & Friends',
        description: 'Spread blessings by sharing temples and receipts.',
        steps: [
          { action: 'Find share button', detail: 'Available on temple pages and receipts' },
          { action: 'Click to share', detail: 'Opens sharing options' },
          { action: 'Choose method', detail: 'WhatsApp, copy link, or other apps' }
        ],
        tip: 'Great for sharing with family abroad who want to stay connected'
      }
    ],
    'account': [
      {
        id: 'dashboard',
        icon: User,
        title: 'Your Personal Dashboard',
        description: 'Central hub for all your temple activities and history.',
        steps: [
          { action: 'Click Dashboard', detail: 'Find it in header navigation' },
          { action: 'View Overview', detail: 'See summary of all activities' },
          { action: 'Access tabs', detail: 'My Temples, Donations, Bookings' },
          { action: 'Check receipts', detail: 'Find all your donation receipts' }
        ]
      },
      {
        id: 'language',
        icon: Globe,
        title: 'Change Language',
        description: 'Use Templo in your preferred regional language.',
        steps: [
          { action: 'Find language icon', detail: 'Located in the header' },
          { action: 'Click to open', detail: 'See available languages' },
          { action: 'Select language', detail: 'Choose from English, Tamil, Hindi, Telugu, Kannada, Malayalam' }
        ],
        tip: 'Your preference is saved automatically for future visits'
      },
      {
        id: 'location',
        icon: MapPin,
        title: 'Temple Location & Directions',
        description: 'Get directions and contact information for any temple.',
        steps: [
          { action: 'Open temple page', detail: 'Navigate to the temple' },
          { action: 'Go to Info tab', detail: 'Find location section' },
          { action: 'View map', detail: 'Interactive map with temple location' },
          { action: 'Get directions', detail: 'Click "Open in Google Maps"' }
        ]
      }
    ]
  };

  const currentFeatures = features[activeCategory] || [];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>{t('back')}</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <HelpCircle className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            How to Use Templo
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to connecting with temples digitally
          </p>
        </div>

        {/* Quick Start - 3 Step Journey */}
        <section className="mb-10 sm:mb-14">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground text-center mb-6 sm:mb-8">
            Start in 3 Simple Steps
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {quickStartSteps.map((step, index) => (
              <div 
                key={step.number}
                className="relative p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 left-5 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  Step {step.number}
                </div>
                
                {/* Arrow connector (hidden on mobile, shown on md+) */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-primary/50" />
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-3 mb-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <Link to={step.action.link}>
                  <Button variant="outline" size="sm" className="gap-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {step.action.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Category Navigation */}
        <section className="mb-6 sm:mb-8">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground text-center mb-4 sm:mb-6">
            Explore All Features
          </h2>
          
          {/* Scrollable category tabs */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap transition-all shrink-0",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                <category.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Features List */}
        <section className="mb-10 sm:mb-14">
          <div className="space-y-4">
            {currentFeatures.map((feature) => (
              <div
                key={feature.id}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden transition-all hover:border-primary/30"
              >
                {/* Feature Header - Clickable */}
                <button
                  onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                  className="w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {feature.description}
                    </p>
                  </div>
                  
                  <ChevronRight 
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform",
                      expandedFeature === feature.id && "rotate-90"
                    )} 
                  />
                </button>
                
                {/* Expanded Steps */}
                {expandedFeature === feature.id && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-border/30">
                    <div className="space-y-3 sm:space-y-4">
                      {feature.steps.map((step, stepIndex) => (
                        <div 
                          key={stepIndex} 
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          {/* Step number circle with connecting line */}
                          <div className="relative flex flex-col items-center">
                            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shrink-0">
                              {stepIndex + 1}
                            </div>
                            {stepIndex < feature.steps.length - 1 && (
                              <div className="w-0.5 h-8 sm:h-10 bg-primary/20 mt-1" />
                            )}
                          </div>
                          
                          {/* Step content */}
                          <div className="pt-0.5 pb-2 flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-medium text-foreground">
                              {step.action}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Tip box */}
                    {feature.tip && (
                      <div className="mt-4 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-foreground">
                            <span className="font-medium">Pro tip:</span> {feature.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Explore thousands of temples, make offerings, and stay connected to your faith from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/temples">
              <Button size="lg" className="gap-2 rounded-full w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Explore Temples
              </Button>
            </Link>
            <Link to="/ancestral-intro">
              <Button variant="outline" size="lg" className="gap-2 rounded-full w-full sm:w-auto">
                <History className="h-5 w-5" />
                Find Ancestral Temple
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowTo;
