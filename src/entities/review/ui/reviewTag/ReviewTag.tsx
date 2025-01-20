import styles from "./ReviewTag.module.scss";
import { ReviewTagProps } from "../../types";
import { TagMapper } from "@shared/lib/tagMapper";
import smallStarIcon from "@shared/assets/images/small-star.svg";

interface ExtendedReviewTagProps extends ReviewTagProps {
  id: number;
}

const ReviewTag = ({ content, id }: ExtendedReviewTagProps) => {
  const getTagIcon = () => {
    let icon = TagMapper.getTagIcon("menu", id, true);
    if (!icon) {
      icon = TagMapper.getTagIcon("interior", id, true);
    }
    return icon 
      ? new URL(`/src/shared/assets/images/tag-icon/${icon}`, import.meta.url).href
      : smallStarIcon;
  };

  return (
    <div className={`tag ${styles.tag}`}>
      <img src={getTagIcon()} alt="tag-icon" className={styles.icon} />
      <p>{content}</p>
    </div>
  );
};

export default ReviewTag;
