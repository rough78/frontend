import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ICafeDescription } from '@shared/api/cafe/types';

interface ReviewDraft {
  id?: number;
  cafe: ICafeDescription | null;
  rating: number;
  visitDate: string;
  content?: string;
  imageIds: string[];
  tags: {
    menu: number[];
    interior: number[];
  };

}

interface ReviewDraftStore {
  draft: ReviewDraft;
  updateDraft: (updates: Partial<ReviewDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: ReviewDraft = {
  id: undefined,
  cafe: null,
  rating: 0,
  visitDate: '',
  content: '',
  imageIds: [],
  tags: {
    menu: [],
    interior: []
  },
};

export const useReviewDraftStore = create<ReviewDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      updateDraft: (updates) => 
        set((state) => ({
          draft: {
            ...state.draft,
            ...updates,
            tags: updates.tags || state.draft.tags || initialDraft.tags
          }
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'review-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
);