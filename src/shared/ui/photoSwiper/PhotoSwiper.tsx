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
}

const PhotoSwiper: FC<PhotoSwiperProps> = ({ imageIds, showChips = true }) => {
  const { getUrl } = useReviewImageApi();

  // If no imageIds, don't render anything
  if (!imageIds || imageIds.length === 0) {
    return null;
  }

  return (
    <Swiper
      className={styles.swiper as string}
      pagination={true}
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {imageIds.map((imageId) => (
        <SwiperSlide key={imageId} className={styles.swiperSlide}>
          <img 
            src={getUrl(imageId)}
            alt="Review"
            className={styles.image}
          />
          {showChips && (
            <div className={styles.chipsWrap}>
              <Chips />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PhotoSwiper;
