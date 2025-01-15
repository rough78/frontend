import styles from './StarRatingCafeInfo.module.scss';
import { StarIcon } from '@widgets/starRating/ui/StarIcon';

interface StarRatingCafeInfoProps {
  value: number;
}

const StarRatingCafeInfo = ({ value }: StarRatingCafeInfoProps) => {
  return (
    <div className={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => {
        const percentage = Math.max(0, Math.min(1, value - (star - 1)));
        return (
          <div key={star} className={styles.star}>
            <StarIcon
              filled={percentage >= 0.5}
              onClick={() => {}}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingCafeInfo;
