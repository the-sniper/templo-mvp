import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'feedback' | 'review';
  templeName?: string;
  templeId?: string;
}

const FeedbackPopup = ({ isOpen, onClose, defaultTab = 'feedback', templeName, templeId }: FeedbackPopupProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Feedback state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review state
  const [reviewRating, setReviewRating] = useState(0);
  const [hoveredReviewRating, setHoveredReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [visitedTemple, setVisitedTemple] = useState('');

  useEffect(() => {
    setActiveTab(defaultTab);
    if (templeName) {
      setVisitedTemple(templeName);
    }
  }, [defaultTab, templeName]);

  const categories = [
    { id: 'feature', label: 'Feature Request' },
    { id: 'bug', label: 'Bug Report' },
    { id: 'improvement', label: 'Improvement' },
    { id: 'other', label: 'Other' },
  ];

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Please share your thoughts",
        description: "We'd love to hear what's on your mind.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const feedbackData = {
      id: Date.now().toString(),
      type: 'feedback',
      rating,
      category,
      feedback,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('templo_feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('templo_feedback', JSON.stringify(existingFeedback));

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    toast({
      title: "Thank you for your feedback! 🙏",
      description: "Your input helps us serve the devotee community better.",
    });
    
    setRating(0);
    setFeedback('');
    setCategory('');
    onClose();
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || reviewRating === 0) {
      toast({
        title: "Please complete your review",
        description: "Add a rating and share your temple experience.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const reviewData = {
      id: Date.now().toString(),
      type: 'temple_review',
      templeId: templeId || 'general',
      templeName: visitedTemple || templeName || 'Unknown Temple',
      rating: reviewRating,
      review: reviewText,
      timestamp: new Date().toISOString(),
    };
    
    const existingReviews = JSON.parse(localStorage.getItem('templo_reviews') || '[]');
    existingReviews.push(reviewData);
    localStorage.setItem('templo_reviews', JSON.stringify(existingReviews));

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    toast({
      title: "Thank you for your review! 🙏",
      description: "Your experience helps other devotees discover sacred temples.",
    });
    
    setReviewRating(0);
    setReviewText('');
    setVisitedTemple('');
    onClose();
  };

  const renderStars = (currentRating: number, hovered: number, setRating: (r: number) => void, setHovered: (r: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              star <= (hovered || currentRating)
                ? 'fill-primary text-primary'
                : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Share Your Experience
          </DialogTitle>
          <DialogDescription>
            Your input helps us improve and helps devotees discover temples.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'feedback' | 'review')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="feedback" className="gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              App Feedback
            </TabsTrigger>
            <TabsTrigger value="review" className="gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Temple Review
            </TabsTrigger>
          </TabsList>

          {/* App Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">How is your experience so far?</Label>
              {renderStars(rating, hoveredRating, setRating, setHoveredRating)}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">What type of feedback?</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                      category === cat.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium">
                Share your thoughts
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you love, what could be better, or any ideas you have..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button 
              onClick={handleSubmitFeedback} 
              disabled={isSubmitting}
              className="w-full rounded-full gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
              <Send className="w-4 h-4" />
            </Button>
          </TabsContent>

          {/* Temple Review Tab */}
          <TabsContent value="review" className="space-y-4 mt-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
              <p>Share your experience visiting temples. Reviews from devoted users help other devotees discover sacred places.</p>
            </div>

            {!templeName && (
              <div className="space-y-2">
                <Label htmlFor="templeName" className="text-sm font-medium">
                  Which temple did you visit?
                </Label>
                <input
                  id="templeName"
                  type="text"
                  placeholder="e.g., Sri Venkateswara Temple, Tirupati"
                  value={visitedTemple}
                  onChange={(e) => setVisitedTemple(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Your rating</Label>
              {renderStars(reviewRating, hoveredReviewRating, setReviewRating, setHoveredReviewRating)}
            </div>

            <div className="space-y-2">
              <Label htmlFor="review" className="text-sm font-medium">
                Share your temple experience
              </Label>
              <Textarea
                id="review"
                placeholder="How was your darshan? What made it special? Any tips for other devotees?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button 
              onClick={handleSubmitReview} 
              disabled={isSubmitting}
              className="w-full rounded-full gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
              <Send className="w-4 h-4" />
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Hook for random feedback popup trigger
export const useFeedbackTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastDismissed = localStorage.getItem('templo_feedback_dismissed');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) {
        return;
      }
    }

    const randomDelay = Math.floor(Math.random() * 60000) + 30000;
    
    const timer = setTimeout(() => {
      if (Math.random() < 0.2) {
        setIsOpen(true);
      }
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  const openFeedback = () => setIsOpen(true);
  
  const closeFeedback = () => {
    setIsOpen(false);
    localStorage.setItem('templo_feedback_dismissed', Date.now().toString());
  };

  return { isOpen, openFeedback, closeFeedback };
};

export default FeedbackPopup;