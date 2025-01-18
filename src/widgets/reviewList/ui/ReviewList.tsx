import { useEffect, useState } from "react";
import { ReviewItem } from "@/entities/review/ui";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import type { ShowReviewResponse } from "@shared/api/reviews/types";
import styles from "./ReviewList.module.scss";

const ReviewList = () => {
  const [reviews, setReviews] = useState<ShowReviewResponse[]>([]);
  const { getReviewList } = useReviewApi();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewList({
          sort: "NEW",
          limit: 10
        });
        setReviews(response);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

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
