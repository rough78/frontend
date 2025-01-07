import type { ICafeDescription } from '@shared/api/cafe/types';
import styles from "./CafeListItem.module.scss";
import defaultProfile from "@shared/assets/images/cafe/profile.svg";

interface CafeListItemProps extends ICafeDescription {
  onSelect: () => void;
}

const CafeListItem = ({
  name,
  address,
  profileImg,
  onSelect,
}: CafeListItemProps) => {
  return (
    <li className={styles.cafeItem}>
      <a onClick={onSelect} className={styles.cafeItem__link}>
        <div className={styles.cafeItem__imageWrapper}>
          <img
            src={profileImg || defaultProfile}
            alt={`${name} profile`}
            className={styles.cafeItem__image}
          />
        </div>
        <div className={styles.cafeItem__info}>
          <p className={styles.cafeItem__name}>{name}</p>
          <p className={styles.cafeItem__address}>{address}</p>
        </div>
      </a>
    </li>
  );
};

export default CafeListItem;
