import { useState, useEffect } from 'react';
import styles from "./DraftListItem.module.scss";
import { formatDate } from '@shared/utils/formatDate';
import type { ReviewDraft } from '@shared/store/useReviewDraftStore';
import { useDraftSelectionStore } from '@shared/store/useDraftSelectionStore';

interface DraftListItemProps {
  draft: ReviewDraft;
  onSelect: () => void;
  createdAt: string;
}

const DraftListItem = ({
  draft,
  onSelect,
  createdAt,
}: DraftListItemProps) => {
  const [showCheckbox, setShowCheckbox] = useState(false);
  const { isSelectionMode, selectedDrafts, toggleDraftSelection } = useDraftSelectionStore();

  useEffect(() => {
    setShowCheckbox(isSelectionMode);
  }, [isSelectionMode]);

  const handleClick = (e: React.MouseEvent) => {
    if (showCheckbox) {
      e.preventDefault();
      toggleDraftSelection(draft.id!);
    } else {
      onSelect();
    }
  };

  return (
    <li className={styles.draftItem}>
      <a onClick={handleClick} className={styles.draftItem__link}>
        <div className={styles.draftItem__info}>
          <p className={styles.draftItem__name}>{draft.cafe?.name}</p>
          <p className={styles.draftItem__date}>
            {formatDate(createdAt, 'YYYY.MM.DD')} 작성 시작
          </p>
        </div>
        {showCheckbox && (
          <div className={styles.draftItem__checkbox}>
            <input
              type="checkbox"
              aria-label={`Select ${draft.cafe?.name} draft`}
              checked={selectedDrafts.includes(draft.id!)}
              onChange={() => toggleDraftSelection(draft.id!)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </a>
    </li>
  );
};

export default DraftListItem;