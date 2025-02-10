import { useEffect, useRef, useState, useCallback } from "react";
import { ReviewItem } from "@/entities/review/ui";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import type { ShowReviewResponse, ShowReviewListRequest, ShowUserReviewRequest } from "@shared/api/reviews/types";
import styles from "./ReviewList.module.scss";
import { useUserApi } from "@shared/api/user/userApi";

interface ReviewListProps {
  type?: 'all' | 'my';
  params?: ShowReviewListRequest | ShowUserReviewRequest;
  onLoadMore?: (timestamp: string, rating?: number) => void;
}

const ReviewList = ({ type = 'all', params = { limit: 10 }, onLoadMore }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ShowReviewResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const { useReviewList, useMyReviews } = useReviewApi();
  const { getUserInfo } = useUserApi();
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setCurrentUserId(userInfo.userId);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const reviewListQuery = type === 'all' ? useReviewList({
    ...{sort: "NEW"},
    ...(params as ShowReviewListRequest)
}) : undefined
  
  const myReviewsQuery = type === 'my' ? useMyReviews({
    ...params as ShowUserReviewRequest
  }) : undefined;

  useEffect(() => {
    const queryData = type === 'all' ? reviewListQuery?.data : myReviewsQuery?.data;
    if (queryData) {
      if (params.timestamp === new Date(3000, 0, 1).toISOString()) {
        setReviews(queryData);
      } else {
        setReviews(prev => [...prev, ...queryData]);
      }
      setHasMore(queryData.length === params.limit);
    }
  }, [reviewListQuery?.data, myReviewsQuery?.data]);

  const normalizeTimestamp = (timestamp: string) => {
    const cleanTime = timestamp.endsWith('Z') ? timestamp.slice(0, -1) : timestamp;
    const [datePart, nanosPart = ''] = cleanTime.split('.');
    const micros = nanosPart.padEnd(6, '0').slice(0, 6);
    const microsInt = parseInt(micros) - 1;
    const normalizedMicros = microsInt.toString().padStart(6, '0');
    return `${datePart}.${normalizedMicros}`;
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !isLoading) {
      const lastReview = reviews[reviews.length - 1];
      if (lastReview && onLoadMore) {
        // Only check for HIGH_RATING sort in 'all' type reviews
        if (type === 'all' && (params as ShowReviewListRequest).sort === "HIGH_RATING") {
          onLoadMore(lastReview.createdAt, lastReview.rating);
        } else {
          onLoadMore(lastReview.createdAt);
        }
      }
    }
  }, [hasMore, isLoading, reviews, onLoadMore, type, params]);

  useEffect(() => {
    setIsLoading(reviewListQuery?.isFetching || myReviewsQuery?.isFetching || false);
  }, [reviewListQuery?.isFetching, myReviewsQuery?.isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (reviewListQuery?.isError || myReviewsQuery?.isError) {
    return <div>리뷰를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className={styles.reviewListContainer}>
      <ul className={styles.reviewList}>
        {reviews.map(review => (
          <li key={review.reviewId} className={styles.reviewList__item}>
            <ReviewItem 
              review={review} 
              showChips={true}
              currentUserId={currentUserId} 
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div 
          ref={loadMoreTriggerRef}
          className={styles.loadMoreTrigger}
          style={{ height: '20px', margin: '20px 0' }}
        />
      )}
      
      {isLoading && (
        <div className={styles.loadingIndicator}>
          로딩 중...
        </div>
      )}
    </div>
  );
};

export default ReviewList;
