import { useRef } from "react";
import { useImageApi } from "@shared/api/images";
import { createPhotoUploaderStore, PhotoUploaderStore } from "./photoUploaderStore";

export function usePhotoUploaderStore(): PhotoUploaderStore {
  const { upload, remove, getUrl } = useImageApi();
  const storeRef = useRef(
    createPhotoUploaderStore({ upload, remove, getUrl })
  );
  return storeRef.current();
}
