import { create } from "zustand";

interface NavigationStore {
  returnPath: string | null;
  isFromFooter: boolean;
  setReturnPath: (path: string | null) => void;
  setIsFromFooter: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  returnPath: null,
  isFromFooter: false,
  setReturnPath: (path) => set({ returnPath: path }),
  setIsFromFooter: (value) => set({ isFromFooter: value }),
}));
