import styles from "./Tag.module.scss";
import type { TagProps } from "../types/types";

const Tag = ({ content, defaultIcon, activeIcon, isActive, onClick }: TagProps) => {
  const iconPath = isActive ? activeIcon : defaultIcon;
  const iconSrc = new URL(`/src/shared/assets/images/tag-icon/${iconPath}`, import.meta.url).href;

  return (
    <button
      className={`tag ${styles.tag} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      type="button"
    >
      <img
        src={iconSrc}
        alt="태그 아이콘"
        className={styles.icon}
      />
      <span className={styles.content}>{content}</span>
    </button>
  );
};

export default Tag;
