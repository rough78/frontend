// src/shared/store/createMyStore.ts
import { create } from "zustand";
import type { UserInfoResponse } from "@shared/api/user/types";

export interface MyStore {
  userInfo: UserInfoResponse | null;
  isLoading: boolean;
  error: Error | null;
  fetchUserInfo: () => Promise<void>;
  setUserInfo: (info: UserInfoResponse) => void;
  reset: () => void;
  getUser: () => Promise<UserInfoResponse | null>;
}

interface MyStoreApi {
  getUserInfo: () => Promise<UserInfoResponse>;
}

export function createMyStore({ getUserInfo }: MyStoreApi) {
  return create<MyStore>((set, get) => ({
    userInfo: null,
    isLoading: false,
    error: null,

    fetchUserInfo: async () => {
      try {
        set({ isLoading: true, error: null });
        const info = await getUserInfo();
        set({ userInfo: info, isLoading: false });
      } catch (error) {
        set({ 
          error: error instanceof Error ? error : new Error('Failed to fetch user info'), 
          isLoading: false 
        });
      }
    },

    getUser: async () => {
      const state = get();
      if (state.userInfo) {
        return state.userInfo;
      }
      if (!state.isLoading) {
        await state.fetchUserInfo();
      }
      return get().userInfo;
    },

    setUserInfo: (info) => {
      set({ userInfo: info });
    },

    reset: () => {
      set({ userInfo: null, error: null, isLoading: false });
    }
  }));
}