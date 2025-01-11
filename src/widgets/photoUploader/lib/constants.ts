import { PhotoUploaderConfig } from "../types";

export const DEFAULT_CONFIG: PhotoUploaderConfig = {
  maxCount: 3,
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
};
