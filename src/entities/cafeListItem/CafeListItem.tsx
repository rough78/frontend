import styles from "./CafeListItem.module.scss";
import defaultProfile from "@shared/assets/images/cafe/profile.svg";

const CafeListItem = ({
  name,
  address,
  profileImg,
}: {
  name: string;
  address: string;
  profileImg: string;
}) => (
  <li className={styles.cafeItem}>
    <a href="#" className={styles.cafeItem__link}>
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

export default CafeListItem;
