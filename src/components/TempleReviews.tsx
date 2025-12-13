import { useState } from 'react';
import { Star, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface TempleReviewsProps {
  templeId: string;
  templeName: string;
}

// Demo reviews data
const demoReviews: Review[] = [
  {
    id: '1',
    userName: 'Ramesh K.',
    rating: 5,
    comment: 'A truly divine experience. The temple is well-maintained and the priests are very helpful. Highly recommend visiting during early morning hours for a peaceful darshan.',
    date: '2024-11-15',
    helpful: 24,
  },
  {
    id: '2',
    userName: 'Priya S.',
    rating: 4,
    comment: 'Beautiful temple with rich history. The architecture is stunning. Only suggestion would be to improve the queue management during peak hours.',
    date: '2024-11-10',
    helpful: 12,
  },
  {
    id: '3',
    userName: 'Venkat R.',
    rating: 5,
    comment: 'Visited with family during Brahmotsavam. The arrangements were excellent. The prasadam was delicious. Will definitely visit again.',
    date: '2024-10-28',
    helpful: 18,
  },
];

const TempleReviews = ({ templeId, templeName }: TempleReviewsProps) => {
  const { t } = useLanguage();
  const [reviews] = useState<Review[]>(demoReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleSubmitReview = () => {
    // In production, this would save to database
    setShowReviewForm(false);
    setNewRating(0);
    setNewComment('');
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={cn(
              "transition-colors",
              interactive && "cursor-pointer hover:scale-110"
            )}
            onClick={() => interactive && setNewRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          >
            <Star
              className={cn(
                "h-5 w-5",
                (interactive ? (hoverRating || newRating) >= star : rating >= star)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">{t('reviews')}</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {t('writeReview')}
        </Button>
      </div>
      
      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl bg-accent/50">
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mt-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {totalReviews} {t('reviewsCount')}
          </p>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = (count / totalReviews) * 100;
            return (
              <div key={rating} className="flex items-center gap-2 mb-1.5">
                <span className="text-xs w-3 text-muted-foreground">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write Review Form */}
      {showReviewForm && (
        <div className="mb-6 p-5 rounded-2xl border-2 border-dashed border-primary/30 bg-accent/30">
          <h4 className="font-medium mb-3">{t('shareYourExperience')}</h4>
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">{t('yourRating')}</label>
            {renderStars(newRating, true)}
          </div>
          <Textarea
            placeholder={t('writeYourReview')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4 min-h-24 rounded-xl"
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleSubmitReview}
              disabled={newRating === 0 || !newComment.trim()}
              className="rounded-full"
            >
              {t('submitReview')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewForm(false)}
              className="rounded-full"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-5 rounded-2xl bg-accent/50 transition-all hover:bg-accent/70">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground hover:text-primary rounded-full">
                <ThumbsUp className="h-4 w-4" />
                <span>{t('helpful')} ({review.helpful})</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleReviews;