import { useUserApi } from "@shared/api/user/userApi";
import { createMyStore, MyStore } from "./myStore";

// store 인스턴스를 모듈 레벨에서 한 번만 생성
let store: ReturnType<typeof createMyStore> | null = null;

export function useMyStore(): MyStore {
  const { getUserInfo } = useUserApi();
  
  if (!store) {
    store = createMyStore({ getUserInfo });
  }
  
  return store();
}
