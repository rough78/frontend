// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Chips from "../chips/Chips";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./PhotoSwiper.module.scss";

import { Pagination } from "swiper/modules";
import { FC } from "react";

interface PhotoSwiperProps {
  showChips?: boolean;
}

const PhotoSwiper: FC<PhotoSwiperProps> = ({ showChips = true }) => {
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
      <SwiperSlide className={styles.swiperSlide}>
        {showChips && (
          <div className={styles.chipsWrap}>
            <Chips />
          </div>
        )}
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        {showChips && (
          <div className={styles.chipsWrap}>
            <Chips />
          </div>
        )}
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        {showChips && (
          <div className={styles.chipsWrap}>
            <Chips />
          </div>
        )}
      </SwiperSlide>
    </Swiper>
  );
};

export default PhotoSwiper;
