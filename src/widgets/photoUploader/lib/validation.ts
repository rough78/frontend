import { PhotoUploaderConfig } from "../types";

export const validateFile = (
  file: File,
  config: PhotoUploaderConfig
): string | null => {
  if (!config.allowedTypes.includes(file.type)) {
    return "지원하지 않는 파일 형식입니다.";
  }
  if (file.size > config.maxSize) {
    return `파일 크기는 ${config.maxSize / 1024 / 1024}MB 이하여야 합니다.`;
  }
  return null;
};
