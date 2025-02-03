import { useState } from "react";
import styles from "./ReviewContent.module.scss";
import chevronDown from "@shared/assets/images/chevron-down.svg";

interface ReviewContentProps {
  content: string;
}

const ReviewContent = ({ content }: ReviewContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const maxLength = 75;
  const displayedContent = isExpanded
    ? content
    : content.slice(0, maxLength) + (content.length > maxLength ? "..." : "");
  return (
    <div className={styles.reviewContent}>
      <p>{displayedContent}</p>
      {content.length > maxLength && (
        <button onClick={toggleExpand} className={styles.toggleButton}>
          {isExpanded ? "접기" : "더보기"}
          <img
            src={chevronDown}
            alt="content-toggle-button"
            className={isExpanded ? styles.imgRotated : styles.imgNormal}
          />
        </button>
      )}
    </div>
  );
};

export default ReviewContent;
