import { useState } from 'react';
import StarEmpty from '@shared/assets/images/star-rating/star.svg';
import StarFilled from '@shared/assets/images/star-rating/star-filled.svg';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import styles from './StarRating.module.scss';

interface RatingStore {
  rating: number;
  setRating: (rating: number) => void;
}

const useRatingStore = create<RatingStore>()(
  persist(
    (set) => ({
      rating: 0,
      setRating: (rating) => set({ rating }),
    }),
    {
      name: 'rating-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }: StarIconProps) => (
  <img 
    src={filled ? StarFilled : StarEmpty}
    alt="star"
    className={styles.star}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

const StarRating = () => {
  const { rating, setRating } = useRatingStore();
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= (hover || rating)}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;
