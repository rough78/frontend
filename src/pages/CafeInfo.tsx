import CafeInfoItem from "@entities/cafeInfo/ui/CafeInfo";
import { StarRating } from "@widgets/starRating";
import { StarIcon } from "@widgets/starRating/ui/StarIcon";
import styles from "./styles/CafeInfo.module.scss";

const CafeInfo = () => {
  return (
    <div>
      <CafeInfoItem />
      <div className={styles.divider} />
      <div className={styles.ratingWrapper}>
        <div className={styles.ratingHeader}>
          <label className={styles.ratingLabel}>리뷰</label>
          <span className={styles.reviewCount}>(0개)</span>
        </div>
        <div className={styles.ratingScoreContainer}>
          <div className={styles.ratingScore}>
            <StarRating 
              value={5}
              showRatingText={true}
              size={36}
              starsContainerClassName={styles.starRatingStars}
              ratingTextClassName={styles.ratingText}
            />
          </div>
        </div>
      </div>
      <div className={styles.noRatingContainer}>
        <StarIcon
          filled={false}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      </div>
    </div>
  );
};

export default CafeInfo;
