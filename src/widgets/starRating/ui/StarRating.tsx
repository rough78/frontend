import { useState } from 'react';
import clsx from 'clsx';
import { StarIcon } from './StarIcon';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  showRatingText?: boolean;
  size?: number;
  rootClassName?: string;
  starsContainerClassName?: string;
}

export const StarRating = ({
  value,
  onChange,
  showRatingText = false,
  size = 36,
  rootClassName,
  starsContainerClassName
}: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const isInteractive = !!onChange;

  return (
    <div className={clsx(styles.container, rootClassName)}>
      <div className={clsx(styles.stars, starsContainerClassName)}>
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
