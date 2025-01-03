import styles from "./ReviewTagList.module.scss";
import ReviewTag from "../reviewTag/ReviewTag";
import { useState } from "react";

const ReviewTagList = () => {
  const TAGS = {
    menu: [
      { id: 1, content: "원두를 판매해요" },
      { id: 2, content: "커피가 맛있어요" },
      { id: 3, content: "매장에서 직접 로스팅을해요" },
    ],
    interior: [
      { id: 4, content: "작업하기 좋아요" },
      { id: 5, content: "공부하기 좋아요" },
      { id: 6, content: "분위기가 좋아요" },
    ],
  };
  const allTags = Object.values(TAGS).flat();
  const [showAll, setShowAll] = useState(false);

  const visibleTags = showAll ? allTags : allTags.slice(0, 2);

  return (
    <div className={styles.tagList}>
      {visibleTags.map((tag) => (
        <ReviewTag key={tag.id} content={tag.content} />
      ))}
      {!showAll && allTags.length > 3 && (
        <button className={styles.tagBtn} onClick={() => setShowAll(true)}>
          + {allTags.length - 2}
        </button>
      )}
    </div>
  );
};

export default ReviewTagList;
