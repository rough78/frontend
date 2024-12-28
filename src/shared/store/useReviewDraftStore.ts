import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ICafeDescription } from '@shared/api/cafe/types';

interface ReviewDraft {
  cafe: ICafeDescription | null;
  rating: number;
  visitDate: string;
  content?: string;
}

interface ReviewDraftStore {
  draft: ReviewDraft;
  updateDraft: (updates: Partial<ReviewDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: ReviewDraft = {
  cafe: null,
  rating: 0,
  visitDate: '',
  content: '',
};

export const useReviewDraftStore = create<ReviewDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      updateDraft: (updates) => 
        set((state) => ({
          draft: { ...state.draft, ...updates }
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'review-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 