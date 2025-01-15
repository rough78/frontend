import type { ICafeDescription } from "@shared/api/cafe/types";
import styles from "./CafeInfoItem.module.scss";
import bookmarkIcon from "@shared/assets/images/cafe/bookmark.svg";

type CafeInfoItemProps = Pick<
  ICafeDescription,
  "name" | "address" | "instaLink"
> & {
  onBookmarkClick: () => void;
};

const CafeInfoItem = ({
  name,
  address,
  instaLink,
  onBookmarkClick,
}: CafeInfoItemProps) => {
  return (
    <div className={styles.cafeInfoItem}>
      <div className={styles.cafeInfoItem__content}>
        <div className={styles.cafeInfoItem__info}>
          <h2 className={styles.cafeInfoItem__name}>{name}</h2>
          <p className={styles.cafeInfoItem__address}>{address}</p>
          {instaLink && (
            <a
              href={instaLink}
              className={styles.cafeInfoItem__instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
        </div>
        <button
          className={styles.cafeInfoItem__bookmark}
          onClick={onBookmarkClick}
          aria-label="bookmark"
        >
          <img src={bookmarkIcon} alt="Bookmark" width={20} height={23} />
        </button>
      </div>
    </div>
  );
};

export default CafeInfoItem;
