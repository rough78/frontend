import styles from "./ReviewerInfo.module.scss";
// 이미지 import 수정
import rateImage from "@shared/assets/images/rate.svg";
import profileImage from "@shared/assets/images/profile.svg";
import moreIcon from "@shared/assets/images/more.svg";

const ReviewerInfo = () => {
  return (
    <div className={styles.reviewerInfo}>
      <img
        className={styles.reviewerInfo__profilePicture}
        src={profileImage}
        alt="프로필"
      />
      <div className={styles.reviewerInfo__details}>
        <p className={styles.reviewerInfo__name}>코리스타</p>
        <div className={styles.reviewerInfo__meta}>
          <p className={styles.reviewerInfo__visitDate}>2024.12.17 방문</p>
          <p>・</p>
          <div className={styles.reviewerInfo__rating}>
            <ul className={styles.reviewerInfo__starList}>
              <li className={styles.reviewerInfo__star}>
                <img
                  src={rateImage}
                  alt="Star rating"
                />
              </li>
              <li className={styles.reviewerInfo__star}>
                <img
                  src={rateImage}
                  alt="Star rating"
                />
              </li>
              <li className={styles.reviewerInfo__star}>
                <img
                  src={rateImage}
                  alt="Star rating"
                />
              </li>
              <li className={styles.reviewerInfo__star}>
                <img
                  src={rateImage}
                  alt="Star rating"
                />
              </li>
              <li className={styles.reviewerInfo__star}>
                <img
                  src={rateImage}
                  alt="Star rating"
                />
              </li>
            </ul>
            <p className={styles.reviewerInfo__ratingValue}>5.0</p>
          </div>
        </div>
      </div>

      <img
        className={styles.reviewerInfo__moreIcon}
        src={moreIcon}
        alt="더보기 아이콘"
      />
    </div>
  );
};

export default ReviewerInfo;
