import styles from "./SimpleStarRating.module.scss";
import SimpleStarIcon from "./SimpleStarIcon";

interface SimpleStarRatingProps {
  rating: number;
}

const SimpleStarRating = ({ rating }: SimpleStarRatingProps) => {
  const imageSize = 12;
  return (
    <div className={styles.starRating}>
      <ul className={styles.starRating__list}>
        {[1, 2, 3, 4, 5].map((star) => (
          <SimpleStarIcon
            key={star}
            filled={star <= rating}
            size={imageSize}
          />
        ))}
      </ul>
      <p className={styles.ratingText}>{rating.toFixed(1)}</p>
    </div>
  );
};

export default SimpleStarRating;
