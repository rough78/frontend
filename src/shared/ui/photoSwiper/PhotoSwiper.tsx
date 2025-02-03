import { Swiper, SwiperSlide } from "swiper/react";
import Chips from "../chips/Chips";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./PhotoSwiper.module.scss";
import { Pagination } from "swiper/modules";
import { FC } from "react";
import { useReviewImageApi } from "@shared/api/images";

interface PhotoSwiperProps {
  imageIds: string[];
  showChips?: boolean;
  cafeName?: string; // 카페 이름 prop 추가
}

const PhotoSwiper: FC<PhotoSwiperProps> = ({ 
  imageIds, 
  showChips = true,
  cafeName = "" // 기본값 추가
}) => {
  const { getUrl } = useReviewImageApi();

  // imageIds가 없고 cafeName과 showChips가 있는 경우에도 Chips 렌더링
  if ((!imageIds || imageIds.length === 0) && showChips && cafeName) {
    return (
      <div className={styles.chipsOnly}>
        <Chips cafeName={cafeName} />
      </div>
    );
  }

  // 이미지와 Chips가 모두 없는 경우 렌더링하지 않음
  if (!imageIds || imageIds.length === 0) {
    return null;
  }

  return (
    <Swiper
      className={styles.swiper}
      pagination={true}
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
    >
      {imageIds.map((imageId) => (
        <SwiperSlide key={imageId} className={styles.swiperSlide}>
          <img 
            src={getUrl(imageId)}
            alt="Review"
            className={styles.image}
          />
          {showChips && cafeName && (
            <div className={styles.chipsWrap}>
              <Chips cafeName={cafeName} />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PhotoSwiper;
