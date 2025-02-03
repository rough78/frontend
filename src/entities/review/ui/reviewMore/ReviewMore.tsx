import { useReviewApi } from "@shared/api/reviews/reviewApi";
import styles from "./ReviewMore.module.scss";
import Button from "@/shared/ui/button/ui/Button";

interface ReviewMoreProps {
  reviewId: number;
  onDelete?: () => void;
}

const ReviewMore = ({ reviewId, onDelete }: ReviewMoreProps) => {
  const { deleteReview } = useReviewApi();

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId, {
        onSuccess: () => {
          onDelete?.();
        },
        onError: (error) => {
          console.error("리뷰 삭제 실패:", error);
        }
      });
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.reviewMore}>
      <Button className={styles.reviewMore__btn} text="수정" altText="수정" />
      <Button
        className={`${styles.reviewMore__btn} ${styles["reviewMore__btn--delete"]}`}
        text="삭제"
        altText="삭제"
        onClick={handleDelete}
      />
    </div>
  );
};

export default ReviewMore;
