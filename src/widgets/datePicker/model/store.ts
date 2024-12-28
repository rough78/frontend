import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DateStore {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useDateStore = create<DateStore>()(
  persist(
    (set) => ({
      selectedDate: '',
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: 'date-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 