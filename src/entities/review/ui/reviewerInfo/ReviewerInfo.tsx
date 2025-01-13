import { useState, useRef, useEffect } from "react";
import styles from "./ReviewerInfo.module.scss";
import SimpleStarRating from "@/widgets/simpleStarRating/ui/SimpleStarRating";
import ReviewMore from "../reviewMore/ReviewMore";

const ReviewerInfo = () => {
  const [showReviewMore, setShowReviewMore] = useState<boolean>(false);
  const reviewMoreRef = useRef<HTMLDivElement | null>(null);

  const toggleReviewMore = () => {
    setShowReviewMore((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      reviewMoreRef.current &&
      !reviewMoreRef.current.contains(event.target as Node)
    ) {
      setShowReviewMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.reviewerInfo}>
      <img
        className={styles.reviewerInfo__profilePicture}
        src="src/shared/assets/images/profile.svg"
        alt="프로필"
      />
      <div className={styles.reviewerInfo__details}>
        <p className={styles.reviewerInfo__name}>코리스타</p>
        <div className={styles.reviewerInfo__meta}>
          <p className={styles.reviewerInfo__visitDate}>2024.12.17 방문</p>
          <p>・</p>
          <SimpleStarRating />
        </div>
      </div>

      <div ref={reviewMoreRef} className={styles.reviewerInfo__moreWrapper}>
        <img
          className={styles.reviewerInfo__moreIcon}
          src="src/shared/assets/images/more.svg"
          alt="더보기 아이콘"
          onClick={toggleReviewMore}
        />
        {showReviewMore && <ReviewMore />}
      </div>
    </div>
  );
};

export default ReviewerInfo;
