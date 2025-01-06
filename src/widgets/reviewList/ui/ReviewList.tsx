import { ReviewItem } from "@/entities/review/ui";
import styles from "./ReviewList.module.scss";

const ReviewList = () => {
  return (
    <ul className={styles.reviewList}>
      <li className={styles.reviewList__item}>
        <ReviewItem />
      </li>
      <li className={styles.reviewList__item}>
        <ReviewItem />
      </li>
      <li className={styles.reviewList__item}>
        <ReviewItem />
      </li>
      <li className={styles.reviewList__item}>
        <ReviewItem />
      </li>
    </ul>
  );
};

export default ReviewList;
