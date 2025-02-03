import { useRef } from "react";
import { useReviewImageApi } from "@shared/api/images";
import { createPhotoUploaderStore, PhotoUploaderStore } from "./photoUploaderStore";

export function usePhotoUploaderStore(): PhotoUploaderStore {
  const { upload, remove, getUrl } = useReviewImageApi();
  const storeRef = useRef(
    createPhotoUploaderStore({ upload, remove, getUrl })
  );
  return storeRef.current();
}
