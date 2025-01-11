import { create } from "zustand";
import { UploadedImage, PhotoUploaderConfig } from "@widgets/photoUploader/types";
import { DEFAULT_CONFIG } from "@widgets/photoUploader/lib/constants";
import { validateFile } from "@widgets/photoUploader/lib/validation";

interface AddImagesResult {
  error: string | null;
  newImages: UploadedImage[];
}

export interface PhotoUploaderStore {
  images: UploadedImage[];
  config: PhotoUploaderConfig;
  addImages: (files: File[]) => Promise<AddImagesResult>;
  removeImage: (id: string) => Promise<void>;
  setConfig: (config: Partial<PhotoUploaderConfig>) => void;
  cleanup: () => void;
}

export function createPhotoUploaderStore({
  upload,
  remove,
  getUrl,
}: {
  upload: (file: File) => Promise<string>;
  remove: (imageId: string) => Promise<void>;
  getUrl: (imageId: string) => string;
}) {
  return create<PhotoUploaderStore>((set, get) => ({
    images: [],
    config: DEFAULT_CONFIG,

    addImages: async (files: File[]): Promise<AddImagesResult> => {
      const { images, config } = get();

      // 1) 파일 수 체크
      if (images.length + files.length > config.maxCount) {
        return {
          error: `최대 ${config.maxCount}장까지만 업로드 가능합니다.`,
          newImages: [],
        };
      }

      // 2) 파일 Validation
      for (const file of files) {
        const error = validateFile(file, config);
        if (error) return { error, newImages: [] };
      }

      // 3) 실제 업로드
      const newImages = await Promise.all(
        files.map(async (file) => {
          const imageId = await upload(file);
          return {
            id: imageId,
            file,
            previewUrl: URL.createObjectURL(file),
            uploadedUrl: getUrl(imageId),
          };
        })
      );

      // 4) zustand 상태 업데이트
      set({ images: [...images, ...newImages] });

      // 5) 새로 생성된 이미지 정보(들)을 함께 반환
      return { error: null, newImages };
    },

    removeImage: async (id) => {
      const { images } = get();
      const imageToRemove = images.find((img) => img.id === id);
      if (!imageToRemove) return;

      if (imageToRemove.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      await remove(id);

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
      images.forEach((image) => {
        if (image.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
      set({ images: [] });
    },
  }));
}
