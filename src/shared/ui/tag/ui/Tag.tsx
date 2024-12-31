import StarEmpty from '@shared/assets/images/star-rating/star.svg';
import StarFilled from '@shared/assets/images/star-rating/star-filled.svg';
import styles from './Tag.module.scss';
import type { TagProps } from '../types/types';

const Tag = ({ content, icon, isActive, onClick }: TagProps) => {
  const defaultIcon = isActive ? StarFilled : StarEmpty;
  
  return (
    <button 
      className={`${styles.tag} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      type="button"
    >
      <img 
        src={icon || defaultIcon}
        alt="태그 아이콘" 
        className={styles.icon}
      />
      <span className={styles.content}>{content}</span>
    </button>
  );
};

export default Tag;