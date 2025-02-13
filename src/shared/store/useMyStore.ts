import { useRef } from "react";
import { useUserApi } from "@shared/api/user/userApi";
import { createMyStore, MyStore } from "./myStore";

export function useMyStore(): MyStore {
  const { getUserInfo } = useUserApi();
  const storeRef = useRef(createMyStore({ getUserInfo }));
  return storeRef.current();
}