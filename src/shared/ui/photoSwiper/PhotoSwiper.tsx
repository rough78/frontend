// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./PhotoSwiper.module.scss";

import { Pagination } from "swiper/modules";
import { FC } from "react";

interface PhotoSwiperProps {
  // 필요한 props가 있다면 여기에 추가하세요
}

const PhotoSwiper: FC<PhotoSwiperProps> = () => {
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
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" alt="random" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" alt="random" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" alt="random" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" alt="random" />
      </SwiperSlide>
    </Swiper>
  );
};

export default PhotoSwiper;
