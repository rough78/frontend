import { useNavigate } from 'react-router-dom';
import { DraftList } from '@/widgets/draftList';
import { useReviewDraftStore } from '@/shared/store/useReviewDraftStore';
import { useDraftSelectionStore } from '@/shared/store/useDraftSelectionStore';
import styles from './styles/DraftReview.module.scss';

const DraftReview = () => {
  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();
  const { isSelectionMode } = useDraftSelectionStore();

  const handleDraftSelect = async (draftId: number) => {
    if (!isSelectionMode) {
      try {
        updateDraft({ id: draftId });
        navigate('/review/write');
      } catch (error) {
        console.error('초안 선택 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className={styles.draftReview}>
      <DraftList onSelect={handleDraftSelect} />
    </div>
  );
};

export default DraftReview;