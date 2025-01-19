import { useEffect, useState } from "react";
import { ReviewItem } from "@/entities/review/ui";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import type { ShowReviewResponse } from "@shared/api/reviews/types";
import styles from "./ReviewList.module.scss";

const ReviewList = () => {
  const [reviews, setReviews] = useState<ShowReviewResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCafeReviews } = useReviewApi();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getCafeReviews(1, {
          page: 1,
          size: 10,
          sort: "latest"
        });
        setReviews(response || []); // Ensure it's always an array
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={styles.reviewList}>
      {reviews && reviews.length > 0 ? (
        reviews.map(review => (
          <li key={review.reviewId} className={styles.reviewList__item}>
            <ReviewItem review={review} />
          </li>
        ))
      ) : (
        <li>No reviews found</li>
      )}
    </ul>
  );
};

export default ReviewList;
