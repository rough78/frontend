import { useNavigate } from 'react-router-dom';
import { useReviewDraftStore } from '@shared/store/useReviewDraftStore';
import type { ICafeDescription } from '@shared/api/cafe/types';
import styles from "./CafeListItem.module.scss";
import defaultProfile from "@shared/assets/images/cafe/profile.svg";

type CafeListItemProps = ICafeDescription;

const CafeListItem = ({
  name,
  address,
  profileImg,
  ...cafeInfo
}: CafeListItemProps) => {
  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();

  const handleClick = () => {
    updateDraft({ 
      cafe: { 
        name, 
        address, 
        profileImg, 
        ...cafeInfo 
      } 
    });
    navigate('/review/write');
  };

  return (
    <li className={styles.cafeItem}>
      <a onClick={handleClick} className={styles.cafeItem__link}>
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
