import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RatingStore {
  rating: number;
  setRating: (rating: number) => void;
}

export const useRatingStore = create<RatingStore>()(
  persist(
    (set) => ({
      rating: 0,
      setRating: (rating) => set({ rating }),
    }),
    {
      name: 'rating-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 