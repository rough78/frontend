import { create } from "zustand";
import { UploadedImage, PhotoUploaderConfig } from "@widgets/photoUploader/types";
import { DEFAULT_CONFIG } from "@widgets/photoUploader/lib/constants";
import { validateFile } from "@widgets/photoUploader/lib/validation";

export interface PhotoUploaderStore {
  images: UploadedImage[];
  config: PhotoUploaderConfig;
  addImages: (files: File[]) => Promise<string | null>;
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
      set({ images: [...images, ...newImages] });
      return null;
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
