import PhotoSwiper from "@shared/ui/photoSwiper/PhotoSwiper.tsx";
import CafeInfoItem from "./CafeInfoItem";
import styles from './CafeInfo.module.scss';

const CafeInfo = () => {
  return (
    <div>
      <div className={styles.photoSwiperOverride}>
        <PhotoSwiper showChips={false} />
      </div>
      <CafeInfoItem
        name="로우키"
        address="서울 성동구 연무장 3길 6 (성수동 2가)"
        instaLink="https://instagram.com/cafename"
        onBookmarkClick={() => console.log('Bookmark clicked')}
      />
    </div>
  );
};

export default CafeInfo;
