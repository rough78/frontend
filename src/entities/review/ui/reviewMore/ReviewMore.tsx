import styles from "./ReviewMore.module.scss";
import Button from "@/shared/ui/button/ui/Button";

const ReviewMore = () => {
  return (
    <div className={styles.reviewMore}>
      <Button className={styles.reviewMore__btn} text="수정" altText="수정" />
      <Button
        className={`${styles.reviewMore__btn} ${styles["reviewMore__btn--delete"]}`}
        text="삭제"
        altText="삭제"
      />
    </div>
  );
};

export default ReviewMore;
