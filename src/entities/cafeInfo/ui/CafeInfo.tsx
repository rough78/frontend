import PhotoSwiper from "@shared/ui/photoSwiper/PhotoSwiper.tsx";
import styles from './CafeInfo.module.scss';

const CafeInfo = () => {
  return (
    <div className={styles.photoSwiperOverride}>
      <PhotoSwiper showChips={false} />
    </div>
  );
};

export default CafeInfo;
