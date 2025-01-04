import styles from "./SimpleStarRating.module.scss";
import SimpleStarIcon from "./SimpleStarIcon";

const SimpleStarRating = () => {
  const dummyRating = 3.0;
  const imageSize = 12;
  return (
    <div className={styles.starRating}>
      <ul className={styles.starRating__list}>
        {[1, 2, 3, 4, 5].map((star) => (
          <SimpleStarIcon
            key={star}
            filled={star <= dummyRating}
            size={imageSize}
          />
        ))}
      </ul>
      <p className={styles.ratingText}>{dummyRating.toFixed(1)}</p>
    </div>
  );
};

export default SimpleStarRating;
