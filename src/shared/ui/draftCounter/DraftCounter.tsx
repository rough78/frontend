import { useNavigate } from "react-router-dom";
import { useReviewDraftApi } from "@shared/api/reviews/reviewDraftApi";
import styles from "@app/layout/header/Header.module.scss";

const DraftCounter = () => {
  const navigate = useNavigate();
  const { useUserDraftReviews } = useReviewDraftApi();
  const draftListQuery = useUserDraftReviews();
  
  if (draftListQuery.isLoading || draftListQuery.isError) {
    return null;
  }

  const count = draftListQuery.data?.length ?? 0;
  
  return (
    <span 
      className={styles.completeButton}
      onClick={() => navigate("/draft")}
      style={{ cursor: "pointer" }}
    >
      작성중 {count}
    </span>
  );
};

export default DraftCounter;