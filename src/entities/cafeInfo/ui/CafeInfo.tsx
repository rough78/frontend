import PhotoSwiper from "@shared/ui/photoSwiper/PhotoSwiper.tsx";
import { StarRatingCafeInfo } from "@widgets/starRatingCafeInfo";
import CafeInfoItem from "./CafeInfoItem";
import styles from "./CafeInfo.module.scss";
import { StarIcon } from "@widgets/starRating/ui/StarIcon";

const CafeInfo = () => {
  return (
    <div>
      <div className={styles.photoSwiperOverride}>
        <PhotoSwiper showChips={false} />
      </div>
      <CafeInfoItem
        name="로우키"
        address="서울 성동구 연무장 3길 6 (성수동 2가)"
        instaLink="https://instagram.com/cafename"
        onBookmarkClick={() => console.log("Bookmark clicked")}
      />
      <div className={styles.divider} />
      <div className={styles.ratingWrapper}>
        <div className={styles.ratingHeader}>
          <label className={styles.ratingLabel}>리뷰</label>
          <span className={styles.reviewCount}>(0개)</span>
        </div>
        <div className={styles.ratingScoreContainer}>
          <div className={styles.ratingScore}>
            <StarRatingCafeInfo value={5} />
            <span className={styles.score}>5.0</span>
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
