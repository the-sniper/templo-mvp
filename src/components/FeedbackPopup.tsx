import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
}

const FeedbackPopup = ({ isOpen, onClose }: FeedbackPopupProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'feature', label: 'Feature Request' },
    { id: 'bug', label: 'Bug Report' },
    { id: 'improvement', label: 'Improvement' },
    { id: 'other', label: 'Other' },
  ];

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Please share your thoughts",
        description: "We'd love to hear what's on your mind.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Store feedback in localStorage for now (ready for Supabase later)
    const feedbackData = {
      id: Date.now().toString(),
      rating,
      category,
      feedback,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('templo_feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('templo_feedback', JSON.stringify(existingFeedback));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    toast({
      title: "Thank you for your feedback! 🙏",
      description: "Your input helps us serve the devotee community better.",
    });
    
    // Reset form
    setRating(0);
    setFeedback('');
    setCategory('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Help Us Improve
          </DialogTitle>
          <DialogDescription>
            Your feedback helps us create a better experience for all devotees.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">How is your experience so far?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
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

          {/* Feedback Text */}
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

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full rounded-full gap-2"
          >
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook for random feedback popup trigger
export const useFeedbackTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has dismissed recently (within 24 hours)
    const lastDismissed = localStorage.getItem('templo_feedback_dismissed');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) {
        return;
      }
    }

    // Random trigger between 30-90 seconds after page load
    const randomDelay = Math.floor(Math.random() * 60000) + 30000; // 30-90 seconds
    
    const timer = setTimeout(() => {
      // 20% chance to show popup
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
