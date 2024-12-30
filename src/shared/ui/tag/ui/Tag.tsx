import styles from './Tag.module.scss';
import type { TagProps } from '../types/types';

export const Tag = ({ content, icon, isActive, onClick }: TagProps) => {
  return (
    <button 
      className={`${styles.tag} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      type="button"
    >
      {icon && (
        <img 
          src={icon} 
          alt="태그 아이콘" 
          className={styles.icon}
        />
      )}
      <span className={styles.content}>{content}</span>
    </button>
  );
};

export default Tag; 