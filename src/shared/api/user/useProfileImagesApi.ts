import { useCallback } from "react";
import { useApi } from "@shared/api/hooks/useApi";

const PROFILE_UPLOAD_URL = "http://localhost:8080/api/images/profile";

export const useProfileImageApi = () => {
  const { post } = useApi();

  const uploadProfileImage = useCallback(
    async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await post(PROFILE_UPLOAD_URL, formData, {
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

  return { uploadProfileImage };
};
