import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeedbackData {
  restaurantId: string;
  rating: number | null;
  comment: string;
  tags: string[];
  date: string;
}

interface FeedbackFormProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
  };
  onSubmit: (feedback: FeedbackData) => void;
}

export default function FeedbackForm({ restaurant, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  
  const availableTags = [
    'Great atmosphere', 'Delicious food', 'Friendly staff', 'Good value', 
    'Fast service', 'Clean venue', 'Nice ambiance', 'Authentic cuisine',
    'Great for groups', 'Accommodated dietary needs'
  ];
  
  const negativeTags = [
    'Too noisy', 'Slow service', 'Overpriced', 'Small portions', 
    'Poor food quality', 'Unfriendly staff', 'Cramped space', 'Limited menu'
  ];
  
  // Combine positive and negative tags based on rating
  const relevantTags = rating && rating > 3 ? availableTags : negativeTags;
  
  const handleRatingClick = (value: number) => {
    setRating(value);
  };
  
  const handleTagToggle = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedbackData = {
      restaurantId: restaurant.id,
      rating,
      comment: feedback,
      tags,
      date: new Date().toISOString(),
    };
    
    setSubmitted(true);
    onSubmit(feedbackData);
  };
  
  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#222222]/20 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-3">Thank You For Your Feedback!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your feedback helps us improve our recommendations for future dining experiences.
          </p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F8F0E5] dark:bg-[#222222]/50 rounded-lg p-6 text-left mb-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                <Image 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className={`w-5 h-5 ${star <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            {tags.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Your tags:</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-[#FF5A00]/10 text-[#FF5A00] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {feedback && (
              <div>
                <p className="text-sm font-medium mb-2">Your comment:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#333333] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  &quot;{feedback}&quot;
                </p>
              </div>
            )}
          </motion.div>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#FF5A00] text-white rounded-lg hover:bg-[#E65100] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#222222]/20 rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">How was your experience?</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your feedback helps improve our recommendations.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
              <Image 
                src={restaurant.image} 
                alt={restaurant.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">How would you rate your experience?</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="p-1 transition-transform hover:scale-110"
              >
                <svg 
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating || 0) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm mb-6">
            {rating === 1 && <p>Poor</p>}
            {rating === 2 && <p>Below Average</p>}
            {rating === 3 && <p>Average</p>}
            {rating === 4 && <p>Good</p>}
            {rating === 5 && <p>Excellent</p>}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Tags */}
          {rating !== null && (
            <div className="mb-6 animate-fade-in">
              <h3 className="text-base font-medium mb-3">What did you {rating > 3 ? 'like' : 'dislike'} about it?</h3>
              <div className="flex flex-wrap gap-2">
                {relevantTags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      tags.includes(tag)
                        ? 'bg-[#FF5A00] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional feedback */}
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium mb-2">
              Additional comments (optional)
            </label>
            <textarea
              id="feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us more about your experience..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF5A00] focus:border-[#FF5A00] bg-white dark:bg-[#333333] text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={rating === null}
              className={`px-6 py-3 rounded-lg font-medium 
                ${rating !== null
                  ? 'bg-[#FF5A00] text-white hover:bg-[#E65100]'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                } transition-colors`}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 