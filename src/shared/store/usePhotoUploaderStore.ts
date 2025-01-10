import { create } from "zustand";
import { UploadedImage, PhotoUploaderConfig } from "@widgets/photoUploader/types";
import { DEFAULT_CONFIG } from "@widgets/photoUploader/lib/constants";
import { validateFile } from "@widgets/photoUploader/lib/validation";

interface PhotoUploaderStore {
  images: UploadedImage[];
  config: PhotoUploaderConfig;
  addImages: (files: File[]) => Promise<string | null>;
  removeImage: (id: string) => Promise<void>;
  setConfig: (config: Partial<PhotoUploaderConfig>) => void;
  cleanup: () => void;
}

export const usePhotoUploaderStore = create<PhotoUploaderStore>((set, get) => ({
  images: [],
  config: DEFAULT_CONFIG,

  addImages: async (files) => {
    const { images, config } = get();

    if (images.length + files.length > config.maxCount) {
      return `최대 ${config.maxCount}장까지만 업로드 가능합니다.`;
    }

    for (const file of files) {
      const error = validateFile(file, config);
      if (error) return error;
    }

    const newImages = await Promise.all(
      files.map(async (file) => ({
        id: `${file.name}_${Date.now()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }))
    );

    set({ images: [...images, ...newImages] });
    return null;
  },

  removeImage: async (id) => {
    const { images } = get();
    const imageToRemove = images.find((img) => img.id === id);

    if (!imageToRemove) return;

    // 브라우저 메모리에서 URL 객체 해제
    if (imageToRemove.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    // 실제 업로드된 이미지가 있다면 서버에서도 제거 요청
    if (imageToRemove.uploadedUrl) {
      try {
        const response = await fetch(`/api/images/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete image from server");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
      }
    }

    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    }));
  },

  setConfig: (newConfig) => {
    set((state) => ({
      config: { ...state.config, ...newConfig },
    }));
  },

  cleanup: () => {
    const { images } = get();
    // 컴포넌트 언마운트 시 모든 blob URL 해제
    images.forEach((image) => {
      if (image.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(image.previewUrl);
      }
    });
    set({ images: [] });
  },
}));
