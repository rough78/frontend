import { useState } from 'react';
import { StarIcon } from './StarIcon';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  showRatingText?: boolean;
  size?: number;
  className?: string;
  starsClassName?: string;
}

export const StarRating = ({
  value,
  onChange,
  showRatingText = false,
  size = 36,
  className,
  starsClassName
}: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const isInteractive = !!onChange;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.stars} ${starsClassName}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= (hover || value)}
            size={size}
            onClick={isInteractive ? () => onChange(star) : undefined}
            onMouseEnter={isInteractive ? () => setHover(star) : undefined}
            onMouseLeave={isInteractive ? () => setHover(0) : undefined}
          />
        ))}
      </div>
      {showRatingText && (
        <p className={styles.ratingText}>{value.toFixed(1)}</p>
      )}
    </div>
  );
};
