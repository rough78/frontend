import { StarRating } from "@widgets/starRating";
import { DatePicker } from "@widgets/datePicker";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { useEffect } from "react";
import { Tag } from "@shared/ui/tag";
import CafeListItem from "@entities/cafeListItem/CafeListItem";
import { InputWrapper } from "@shared/ui/input/Input";
import { Textarea } from "@shared/ui/textarea";
import styles from "./styles/WriteReview.module.scss";

const TAGS = {
  menu: [
    { id: 1, content: "원두를 판매해요" },
    { id: 2, content: "커피가 맛있어요" },
    { id: 3, content: "디저트를 판매해요" },
    { id: 4, content: "핸드드립 커피가 있어요" },
    { id: 5, content: "매장에서 직접 로스팅 해요" },
    { id: 6, content: "시그니처 메뉴가 있어요" },
    { id: 7, content: "케이크가 맛있어요" },
    { id: 8, content: "브런치 메뉴가 있어요" },
    { id: 9, content: "커피 향이 좋아요" },
    { id: 10, content: "메뉴가 다양해요" }
  ],
  interior: [
    { id: 1, content: "작업하기 좋아요" },
    { id: 2, content: "공부하기 좋아요" },
    { id: 3, content: "분위기가 좋아요" },
    { id: 4, content: "야외석이 있어요" },
    { id: 5, content: "매장이 넓어요" },
    { id: 6, content: "룸이 있어요" },
    { id: 7, content: "창가 자리가 많아요" },
    { id: 8, content: "인스타 감성이에요" },
    { id: 9, content: "식물이 많아요" },
    { id: 10, content: "채광이 좋아요" },
    { id: 11, content: "조용해요" },
    { id: 12, content: "음악이 좋아요" }
  ]
};

const WriteReview = () => {
  const { draft, updateDraft, clearDraft } = useReviewDraftStore();

  useEffect(() => {
    if (!localStorage.getItem("review-draft")) {
      clearDraft();
      return;
    }

    if (!draft.cafe) {
      clearDraft();
    }
  }, [clearDraft]);

  const handleDateChange = (date: string) => {
    updateDraft({ visitDate: date });
  };

  const handleRatingChange = (rating: number) => {
    updateDraft({ rating });
  };

  const handleTagClick = (category: "menu" | "interior", tagId: number) => {
    const currentTags = draft.tags?.[category] || [];
    const updatedTags = currentTags.includes(tagId)
      ? currentTags.filter((id) => id !== tagId)
      : [...currentTags, tagId];

    updateDraft({
      tags: {
        ...draft.tags,
        [category]: updatedTags,
      },
    });
  };

  if (!draft.cafe) {
    return (
      <div>
        <p>카페를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="selected-cafe">
        <CafeListItem {...draft.cafe} onSelect={() => {}} />
      </div>
      <InputWrapper label="언제 방문했나요?" className={styles.visitDateLabel}>
        <DatePicker value={draft.visitDate} onChange={handleDateChange} />
      </InputWrapper>
      <InputWrapper
        label={`${draft.cafe.name} 어땠나요?`}
        className={styles.visitDateLabel}
      >
        <StarRating value={draft.rating} onChange={handleRatingChange} />
      </InputWrapper>
      <InputWrapper
        label="구체적으로 알려주세요."
        className={styles.visitDateLabel}
      >
        <div className={styles.tagContainer}>
          <div className={styles.tagSection}>
            <h3>메뉴</h3>
            <div className={styles.tags}>
              {TAGS.menu.map((tag) => (
                <Tag
                  key={tag.id}
                  content={tag.content}
                  isActive={draft.tags?.menu?.includes(tag.id) || false}
                  onClick={() => handleTagClick("menu", tag.id)}
                />
              ))}
            </div>
          </div>
          <div className={styles.tagSection}>
            <h3>인테리어</h3>
            <div className={styles.tags}>
              {TAGS.interior.map((tag) => (
                <Tag
                  key={tag.id}
                  content={tag.content}
                  isActive={draft.tags?.interior?.includes(tag.id) || false}
                  onClick={() => handleTagClick("interior", tag.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </InputWrapper>
      <InputWrapper
        label={
          <div className={styles.reviewLabelContainer}>
            <span>상세 리뷰</span>
            <span className={styles.charCount}>
              {draft.content?.length || 0} / 200자
            </span>
          </div>
        }
        className={styles.visitDateLabel}
      >
        <Textarea
          value={draft.content || ""}
          onChange={(value: string) => updateDraft({ content: value })}
          placeholder="예. 드립커피는 과일의 향이 섞여 있어 향긋하고 상큼했습니다."
          maxLength={200}
          className={styles.reviewTextarea}
        />
      </InputWrapper>
      
      <div className={styles.buttonOverlay} />
      <button 
        className={styles.submitButton}
        onClick={() => {/* TODO: 리뷰 제출 로직 */}}
        disabled={!draft.visitDate || !draft.rating}
      >
        작성 완료
      </button>
    </div>
  );
};

export default WriteReview;
