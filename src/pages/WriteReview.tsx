import { useNavigate } from "react-router-dom";
import { StarRating } from "@widgets/starRating";
import { DatePicker } from "@widgets/datePicker";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { useEffect } from "react";
import CafeListItem from "@entities/cafeListItem/CafeListItem";
import { InputWrapper } from "@shared/ui/input/Input";
import styles from "./WriteReview.module.scss";

const WriteReview = () => {
  const navigate = useNavigate();
  const { draft, updateDraft, clearDraft } = useReviewDraftStore();

  useEffect(() => {
    if (!localStorage.getItem('review-draft')) {
      clearDraft();
      return;
    }
    
    if (!draft.cafe) {
      clearDraft();
    }
  }, []);

  const handleDateChange = (date: string) => {
    updateDraft({ visitDate: date });
  };

  const handleRatingChange = (rating: number) => {
    updateDraft({ rating });
  };

  return (
    <div>
      <h1>리뷰 작성</h1>
      {draft.cafe && (
        <>
          <div className="selected-cafe">
            <CafeListItem {...draft.cafe} />
          </div>
          <InputWrapper 
            label="언제 방문했나요?" 
            className={styles.visitDateLabel}
          >
            <DatePicker 
              value={draft.visitDate}
              onChange={handleDateChange}
            />
          </InputWrapper>
          <InputWrapper 
            label={`${draft.cafe.name} 어땠나요?`}
            className={styles.visitDateLabel}
          >
            <StarRating 
              value={draft.rating}
              onChange={handleRatingChange}
            />
          </InputWrapper>
        </>
      )}
      <div>
        <a href="#" onClick={() => navigate(-1)}>
          이전 화면으로
        </a>
      </div>
    </div>
  );
};

export default WriteReview;
