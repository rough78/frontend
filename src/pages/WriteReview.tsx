import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import { StarRating } from "@widgets/starRating";
import { DatePicker } from "@widgets/datePicker";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { usePhotoUploaderStore } from "@shared/store/usePhotoUploaderStore";
import { useEffect } from "react";
import { Tag } from "@shared/ui/tag";
import CafeListItem from "@entities/cafeListItem/CafeListItem";
import { InputWrapper } from "@shared/ui/input/Input";
import { Textarea } from "@shared/ui/textarea";
import styles from "./styles/WriteReview.module.scss";
import { useReviewApi } from "@shared/api/reviews/reviewApi";
import { ReviewRequest, ReviewResponse } from "@shared/api/reviews/types";
import { PhotoUploader } from "@widgets/photoUploader";
import { useCafeApi } from "@/shared/api/cafe/cafe";
import { TAGS } from "@shared/constants/tags";

const WriteReview = () => {
  const navigate = useNavigate();
  const returnPath = useNavigationStore((state) => state.returnPath);
  const { draft, updateDraft, clearDraft } = useReviewDraftStore();
  const { images, config } = usePhotoUploaderStore();
  const { createReview, isLoading } = useReviewApi();
  const { checkCafeExists, saveCafe } = useCafeApi();

  useEffect(() => {
    // draft를 카페정보 제외 무조건 초기화(임시) draft를 서버에 저장하기로 결정함
    if (localStorage.getItem("review-draft")) {
      clearDraft(["cafe"]);
      return;
    }

    if (!draft.cafe) {
      clearDraft();
    }
  }, [clearDraft]);

  const handleSubmit = async () => {
    try {
      if (!(await validateCafeExists())) {
        const saveResponse = await saveCafe({
          title: draft.cafe!.name,
          category: draft.cafe!.category,
          mapx: draft.cafe!.mapx,
          mapy: draft.cafe!.mapy,
          address: draft.cafe!.address,
          roadAddress: draft.cafe!.roadAddress,
          link: draft.cafe!.link,
        });

        if (saveResponse.cafeId) {
          draft.cafe!.id = saveResponse.cafeId;
        } else {
          console.error("카페 저장 실패");
          return;
        }
      }

      const request = createReviewRequest();
      await submitReview(request);
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
    }
  };

  const validateCafeExists = async () => {
    const { exist } = await checkCafeExists({
      name: draft.cafe!.name,
      mapx: draft.cafe!.mapx,
      mapy: draft.cafe!.mapy,
    });

    if (!exist) {
      console.error("카페가 존재하지 않습니다");
      return false;
    }
    return true;
  };

  const createReviewRequest = (): ReviewRequest => ({
    cafeId: draft.cafe!.id,
    rating: draft.rating,
    visitDate: draft.visitDate,
    content: draft.content || "",
    imageIds: draft.imageIds || [],
    tags: {
      menu: draft.tags.menu.map((tagId) => ({ id: tagId })),
      interior: draft.tags.interior.map((tagId) => ({ id: tagId })),
    },
  });

  const submitReview = async (request: ReviewRequest) => {
    await createReview(request, {
      onSuccess: (response: ReviewResponse) => {
        clearDraft();
        navigate(returnPath || "/", { replace: true });
        console.log("리뷰 작성 성공:", response);
      },
      onError: (error) => {
        console.error("리뷰 작성 실패:", error);
      },
    });
  };

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

  const isValidForm = () => {
    return draft.rating > 0 && draft.visitDate && draft.content?.trim();
  };

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
        <StarRating
          value={draft.rating}
          onChange={handleRatingChange}
          starsContainerClassName={styles.starRatingStars}
        />
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
                  content={tag.description}
                  defaultIcon={tag.defaultIcon}
                  activeIcon={tag.activeIcon}
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
                  content={tag.description}
                  defaultIcon={tag.defaultIcon}
                  activeIcon={tag.activeIcon}
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

      <InputWrapper
        label={
          <div className={styles.reviewLabelContainer}>
            <span>사진 첨부</span>
            <span className={styles.photoCount}>
              {images.length} / {config.maxCount}장
            </span>
          </div>
        }
        className={styles.visitDateLabel}
      >
        <PhotoUploader
          initialImageIds={draft.imageIds}
          onImageUploaded={(imageId: string) => {
            updateDraft({
              imageIds: [...(draft.imageIds || []), imageId],
            });
          }}
          onImageRemoved={(imageId: string) => {
            updateDraft({
              imageIds: draft.imageIds?.filter((id) => id !== imageId) || [],
            });
          }}
        />
      </InputWrapper>

      <div className={styles.buttonOverlay} />
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!isValidForm() || isLoading}
      >
        {isLoading ? "작성 중..." : "작성 완료"}
      </button>
    </div>
  );
};

export default WriteReview;
