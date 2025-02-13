import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  return create<MyStore>()(
    persist(
      (set, get) => ({
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
            console.log('user info already exists');
            return state.userInfo;
          }
          if (!state.isLoading) {
            console.log('fetching user info');
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
      }),
      {
        name: 'my-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ 
          userInfo: state.userInfo 
        })
      }
    )
  );
}
