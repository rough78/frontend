import CafeInfoItem from "@entities/cafeInfo/ui/CafeInfo";
import { StarRating } from "@widgets/starRating";
import styles from "./styles/CafeInfo.module.scss";
import NoReview from "@shared/assets/images/review/no-review.svg";

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
        <img src={NoReview} alt="No Review" />
        <div className={styles.noRatingText}>
          <p className={styles.noRatingText__main}>아직 작성된 리뷰가 없어요</p>
          <p className={styles.noRatingText__sub}>이 카페의 첫 리뷰를 작성해 볼까요?</p>
        </div>
        <button className={styles.writeReviewButton}>
          작성하러 가기
        </button>
      </div>
    </div>
  );
};

export default CafeInfo;
