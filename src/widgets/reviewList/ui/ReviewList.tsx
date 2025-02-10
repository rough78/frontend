import { useEffect, useRef, useState, useCallback } from "react";
import { ReviewItem } from "@/entities/review/ui";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import type { ShowReviewResponse, ShowReviewListRequest, ShowUserReviewRequest } from "@shared/api/reviews/types";
import styles from "./ReviewList.module.scss";
import { useUserApi } from "@shared/api/user/userApi";

interface ReviewListProps {
  type?: 'all' | 'my';
  params?: ShowReviewListRequest | ShowUserReviewRequest;
  onLoadMore?: (timestamp: string) => void;
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
    sort: "NEW",
    ...params as ShowReviewListRequest
  }) : undefined;
  
  const myReviewsQuery = type === 'my' ? useMyReviews({
    ...params as ShowUserReviewRequest
  }) : undefined;

  useEffect(() => {
    if (reviewListQuery?.data) {
      if (params.timestamp === new Date(3000, 0, 1).toISOString()) {
        // 필터 변경으로 인한 새로운 쿼리
        setReviews(reviewListQuery.data);
      } else {
        // 기존 리뷰에 추가
        setReviews(prev => [...prev, ...reviewListQuery.data]);
      }
      setHasMore(reviewListQuery.data.length === params.limit);
    }
  }, [reviewListQuery?.data]);

  const normalizeTimestamp = (timestamp: string) => {
    // 'Z' 제거
    const cleanTime = timestamp.endsWith('Z') ? timestamp.slice(0, -1) : timestamp;
    
    // 소수점 처리
    const [datePart, nanosPart = ''] = cleanTime.split('.');
    
    // 마이크로초 정규화 (6자리)
    const micros = nanosPart.padEnd(6, '0').slice(0, 6);  // 마이크로초 부분만 사용
    const microsInt = parseInt(micros) - 1;  // 1 마이크로초 감소
    const normalizedMicros = microsInt.toString().padStart(6, '0');
        
    return `${datePart}.${normalizedMicros}`;
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !isLoading) {
      const lastReview = reviews[reviews.length - 1];
      if (lastReview && onLoadMore) {
        console.log('Load more reviews:', lastReview.createdAt);
        /**
         * 백엔드 파트에서 타임스탬프보다 낮은 리뷰를 가져오도록 API를 수정해줘서 주석 처리
         */
        // onLoadMore(normalizeTimestamp(lastReview.createdAt));
        onLoadMore(lastReview.createdAt);
      }
    }
  }, [hasMore, isLoading, reviews]);

  useEffect(() => {
    setIsLoading(reviewListQuery?.isFetching || myReviewsQuery?.isFetching || false);
  }, [reviewListQuery?.isFetching, myReviewsQuery?.isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px', // 더 일찍 트리거되도록 증가
      threshold: 0.1 // 요소의 10%만 보여도 트리거
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
