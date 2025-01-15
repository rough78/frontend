import { useState } from 'react';
import { StarIcon } from './StarIcon';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= (hover || value)}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;
