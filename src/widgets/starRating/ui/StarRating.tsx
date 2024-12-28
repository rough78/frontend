import { useState } from 'react';
import { useRatingStore } from '../model/store';
import { StarIcon } from './StarIcon';
import styles from './StarRating.module.scss';

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
