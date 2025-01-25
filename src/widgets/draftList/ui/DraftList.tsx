import DraftListItem from "@entities/draftListItem/DraftListItem";
import { useReviewDraftApi } from "@/shared/api/reviews/reviewDraftApi";
import styles from "./DraftList.module.scss";

interface DraftListProps {
  cafeId?: number;
  onSelect: (draftId: number) => void;
}

const DraftList = ({ cafeId, onSelect }: DraftListProps) => {
  const { useUserDraftReviews } = useReviewDraftApi();
  const draftListQuery = useUserDraftReviews(cafeId);

  if (draftListQuery.isError) {
    return <div>초안을 불러오는데 실패했습니다.</div>;
  }

  if (draftListQuery.isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <ul className={styles.draftList}>
      {draftListQuery.data?.map(draft => (
        <DraftListItem
          key={draft.draftReviewId}
          draft={{
            id: draft.draftReviewId,
            cafe: {
              id: draft.cafeId,
              name: draft.cafeName
            }
          }}
          createdAt={draft.modifiedAt}
          onSelect={() => onSelect(draft.draftReviewId)}
        />
      ))}
    </ul>
  );
};

export default DraftList;