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
