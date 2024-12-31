import { useState } from "react";
import styles from "./ReviewContent.module.scss";

const reviewContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const content =
    "조용하고 아늑한 분위기의 카페입니다. 커피는 향이 풍부하고 맛이 뛰어나며, 특히 카푸치노가 좋았습니다. 직원들도 친절하고 서비스가 신속해 기분 좋게 방문할 수 있었습니다.";
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
            src="/src/shared/assets/images/chevron-down.svg"
            alt="content-toggle-button"
            className={isExpanded ? styles.imgRotated : styles.imgNormal}
          />
        </button>
      )}
    </div>
  );
};

export default reviewContent;
