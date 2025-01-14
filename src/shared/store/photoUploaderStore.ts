import { create } from "zustand";
import {
  UploadedImage,
  PhotoUploaderConfig,
} from "@widgets/photoUploader/types";
import { DEFAULT_CONFIG } from "@widgets/photoUploader/lib/constants";
import { validateFile } from "@widgets/photoUploader/lib/validation";
import { resizeImage } from "@widgets/photoUploader/lib/imageProcessing";

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
  loadInitialImages: (imageIds: string[]) => void;
}

export function createPhotoUploaderStore({
  upload,
  remove,
  getUrl,
}: {
  upload: (file: File) => Promise<string>;
  remove: (imageId: string) => Promise<void>;
  getUrl: (imageId: string) => Promise<string>;
}) {
  return create<PhotoUploaderStore>((set, get) => ({
    images: [],
    config: DEFAULT_CONFIG,

    addImages: async (files: File[]): Promise<AddImagesResult> => {
      const { images, config } = get();

      // 파일 수 체크
      if (images.length + files.length > config.maxCount) {
        return {
          error: `최대 ${config.maxCount}장까지만 업로드 가능합니다.`,
          newImages: [],
        };
      }

      // 파일 Validation & 리사이징
      try {
        const processedFiles = await Promise.all(
          files.map(async (file) => {
            const error = validateFile(file, config);
            if (error) throw new Error(error);

            // 이미지 리사이징 및 압축
            const resized = await resizeImage(
              file,
              config.maxDimension,
              config.quality
            );
            return new File([resized], file.name, {
              type: "image/jpeg",
            });
          })
        );

        // 업로드 처리
        const newImages = await Promise.all(
          processedFiles.map(async (file) => {
            const imageId = await upload(file);
            const uploadedUrl = await getUrl(imageId);
            return {
              id: imageId,
              file,
              previewUrl: URL.createObjectURL(file),
              uploadedUrl,
            };
          })
        );

        set({ images: [...images, ...newImages] });
        return { error: null, newImages };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "업로드 실패",
          newImages: [],
        };
      }
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

    loadInitialImages: async (imageIds: string[]) => {
      const initialImages = await Promise.all(
        imageIds.map(async (id) => ({
          id,
          previewUrl: await getUrl(id),
          uploadedUrl: await getUrl(id),
          file: null as any,
        }))
      );
      set({ images: initialImages });
    },
  }));
}
