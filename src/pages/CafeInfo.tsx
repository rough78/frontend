import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import PhotoSwiper from "@shared/ui/photoSwiper/PhotoSwiper.tsx";
import CafeInfoItem from "@entities/cafeInfo/ui/CafeInfoItem";
import { StarRating } from "@widgets/starRating";
import { useCafeApi } from "@shared/api/cafe/cafe";
import type { ICafeDescription } from "@shared/api/cafe/types";
import styles from "./styles/CafeInfo.module.scss";
import NoReview from "@shared/assets/images/review/no-review.svg";

const CafeInfo = () => {
  const { id } = useParams();
  const { getCafe } = useCafeApi();
  const [cafeInfo, setCafeInfo] = useState<ICafeDescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const dependencies = useRef({ id, getCafe });
  dependencies.current = { id, getCafe };

  const fetchCafeInfo = useCallback(async () => {
    const { id, getCafe } = dependencies.current;
    
    if (!id) {
      setError(new Error("카페 ID가 없습니다."));
      setIsLoading(false);
      return; 
    }

    try {
      const data = await getCafe(id);
      setCafeInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("카페 정보를 불러오는데 실패했습니다."));
    } finally {
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchCafeInfo();
  }, [fetchCafeInfo]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !cafeInfo) {
    return <div>카페 정보를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      <div className={styles.photoSwiperOverride}>
        <PhotoSwiper showChips={false} />
      </div>
      <CafeInfoItem
        name={cafeInfo.name}
        address={cafeInfo.address}
        instaLink={cafeInfo.link}
        onBookmarkClick={() => console.log("Bookmark clicked")}
      />
      <div className={styles.divider} />
      <div className={styles.ratingWrapper}>
        <div className={styles.ratingHeader}>
          <label className={styles.ratingLabel}>리뷰</label>
          <span className={styles.reviewCount}>(0개)</span>
        </div>
        <div className={styles.ratingScoreContainer}>
          <div className={styles.ratingScore}>
            <StarRating 
              value={cafeInfo.avgStar || 0}
              showRatingText={true}
              size={36}
              starsContainerClassName={styles.starRatingStars}
              ratingTextClassName={styles.ratingText}
            />
          </div>
        </div>
      </div>
      <div className={styles.noRatingContainer}>
        <img src={NoReview} alt="No Review" />
        <div className={styles.noRatingText}>
          <p className={styles.noRatingText__main}>아직 작성된 리뷰가 없어요</p>
          <p className={styles.noRatingText__sub}>이 카페의 첫 리뷰를 작성해 볼까요?</p>
        </div>
        <button className={styles.writeReviewButton}>
          작성하러 가기
        </button>
      </div>
    </div>
  );
};

export default CafeInfo;
