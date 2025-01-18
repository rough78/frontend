import { useCallback, useMemo } from "react";
import { useApi } from "@shared/api/hooks/useApi";
import { API_URL } from '../base';
import type { ImageApiResponse, ImageUploadResponse, ImageDeleteResponse } from "./types";

const BASE_URL = `${API_URL}/api/images/review`;

export const useReviewImageApi = () => {
  const { post, remove } = useApi<ImageApiResponse>();

  const upload = useCallback(async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await post<ImageUploadResponse>(
        `${BASE_URL}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.imageId;
    } catch (error) {
      throw new Error('Failed to upload image: ' + error);
    }
  }, [post]);

  const removeImage = useCallback(async (imageId: string): Promise<void> => {
    await remove<ImageDeleteResponse>(`${BASE_URL}/${imageId}`);
  }, [remove]);

  const getUrl = useCallback((imageId: string): string => {
    return `${BASE_URL}/${imageId}`;
  }, []);

  return useMemo(() => ({
    upload,
    remove: removeImage, 
    getUrl
  }), [upload, removeImage, getUrl]);
};
