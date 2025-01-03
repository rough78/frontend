import styles from "./ReviewTag.module.scss";
import { ReviewTagProps } from "../../types";

const ReviewTag = ({ content }: ReviewTagProps) => {
  return (
    <div className={`tag ${styles.tag}`}>
      <img src="/src/shared/assets/images/small-star.svg" alt="tag-icon" />{" "}
      <p>{content}</p>
    </div>
  );
};

export default ReviewTag;
