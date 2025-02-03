import { create } from "zustand";

interface ProfileStore {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
}));
