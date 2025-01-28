import { useNavigate, useLocation } from "react-router-dom";
import { DraftList } from "@/widgets/draftList";
import { useReviewDraftStore } from "@/shared/store/useReviewDraftStore";
import { useDraftSelectionStore } from "@/shared/store/useDraftSelectionStore";
import { useReviewDraftApi } from "@shared/api/reviews/reviewDraftApi";
import styles from "./styles/DraftReview.module.scss";
import { useState, useEffect } from "react";
import { useQueryClient } from '@tanstack/react-query';

const DraftReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { updateDraft } = useReviewDraftStore();
  const { isSelectionMode } = useDraftSelectionStore();
  const { useDraftReview, useUserDraftReviews } = useReviewDraftApi();
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  
  // location.state에서 cafeId 추출
  const cafeId = location.state?.cafeId as number | undefined;

  const draftQuery = useDraftReview(selectedDraftId, {
    enabled: selectedDraftId !== null,
    staleTime: 0,
  });

  useEffect(() => {
    if (draftQuery.data) {
      const menuTags: number[] = [];
      const interiorTags: number[] = [];

      (draftQuery.data.tagIds ?? []).forEach((tagId) => {
        if (tagId <= 100) {
          menuTags.push(tagId);
        } else {
          interiorTags.push(tagId);
        }
      });

      const draftData = {
        id: draftQuery.data.draftReviewId,
        cafe: {
          id: draftQuery.data.cafeId,
          name: draftQuery.data.cafeName,
        },
        content: draftQuery.data.content,
        rating: draftQuery.data.rating,
        visitDate: draftQuery.data.visitDate,
        imageIds: draftQuery.data.imageIds?.map((id) => id.toString()),
        tags: {
          menu: menuTags,
          interior: interiorTags,
        },
      };

      updateDraft(draftData);

      // 스토어 업데이트가 완료된 후 네비게이션
      Promise.resolve().then(() => {
        navigate("/review/write", { state: { from: '/draft' } });
      });
    }
  }, [draftQuery.data]);

  const handleDraftSelect = async (draftId: number) => {
    if (!isSelectionMode) {
      setSelectedDraftId(draftId);
    }
  };

  return (
    <div className={styles.draftReview}>
      <div className={styles.draftGuide}>
        최대 100개까지, 90일이 지나면 자동으로 사라져요.
      </div>
      <DraftList onSelect={handleDraftSelect} cafeId={cafeId} />
    </div>
  );
};

export default DraftReview;
