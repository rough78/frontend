import { useState, useRef, useEffect } from "react";
import styles from "./ReviewerInfo.module.scss";
import SimpleStarRating from "@/widgets/simpleStarRating/ui/SimpleStarRating";
import ReviewMore from "../reviewMore/ReviewMore";
import profileIcon from "@shared/assets/images/profile.svg";
import moreIcon from "@shared/assets/images/more.svg";

interface ReviewerInfoProps {
  nickname: string;
  visitDate: string;
  rating: number;
  isProfileImageExist: boolean;
}

const ReviewerInfo = ({ 
  nickname, 
  visitDate, 
  rating, 
  isProfileImageExist 
}: ReviewerInfoProps) => {
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

  const formatVisitDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\./g, '.');
  };

  return (
    <div className={styles.reviewerInfo}>
      <img
        className={styles.reviewerInfo__profilePicture}
        src={isProfileImageExist ? `path/to/profile/${nickname}` : profileIcon}
        alt="프로필"
      />
      <div className={styles.reviewerInfo__details}>
        <p className={styles.reviewerInfo__name}>{nickname}</p>
        <div className={styles.reviewerInfo__meta}>
          <p className={styles.reviewerInfo__visitDate}>
            {formatVisitDate(visitDate)} 방문
          </p>
          <p>・</p>
          <SimpleStarRating rating={rating} />
        </div>
      </div>

      <div ref={reviewMoreRef} className={styles.reviewerInfo__moreWrapper}>
        <img
          className={styles.reviewerInfo__moreIcon}
          src={moreIcon}
          alt="더보기 아이콘"
          onClick={toggleReviewMore}
        />
        {showReviewMore && <ReviewMore />}
      </div>
    </div>
  );
};

export default ReviewerInfo;
