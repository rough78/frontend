import { useEffect, useState } from "react";
import { ReviewItem } from "@/entities/review/ui";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import type { ShowReviewResponse, ShowReviewListRequest, ShowUserReviewRequest } from "@shared/api/reviews/types";
import styles from "./ReviewList.module.scss";

interface ReviewListProps {
  type?: 'all' | 'my';
  params?: ShowReviewListRequest | ShowUserReviewRequest;
}

const ReviewList = ({ type = 'all', params = { limit: 10 } }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ShowReviewResponse[]>([]);
  const { getReviewList, getMyReviews } = useReviewApi();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = type === 'all' 
          ? await getReviewList({
              sort: "NEW",
              ...params as ShowReviewListRequest
            })
          : await getMyReviews({
              ...params as ShowUserReviewRequest
            });
        setReviews(response);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [type, params, getReviewList, getMyReviews]);

  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li key={review.reviewId} className={styles.reviewList__item}>
          <ReviewItem review={review} showChips={true} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
