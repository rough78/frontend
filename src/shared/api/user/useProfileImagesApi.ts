import { useCallback } from "react";
import { useApi } from "@shared/api/hooks/useApi";

const PROFILE_IMAGE_URL = "/api/images/profile";

export const useProfileImageApi = () => {
  const { get, post } = useApi();

  const getProfileImage = useCallback(
    async (userId: number): Promise<string | null> => {
      try {
        const response: Blob = await get(`${PROFILE_IMAGE_URL}/${userId}`, {
          responseType: "blob",
        });

        const imageUrl = URL.createObjectURL(response);

        return imageUrl;
      } catch (error) {
        console.error("프로필 이미지 불러오기 실패:", error);
        return null;
      }
    },
    [get]
  );

  const uploadProfileImage = useCallback(
    async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await post(PROFILE_IMAGE_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response;
      } catch (error) {
        console.error("프로필 이미지 업로드 실패:", error);
        throw error;
      }
    },
    [post]
  );

  return { getProfileImage, uploadProfileImage };
};
