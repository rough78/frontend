export interface UploadedImage {
  id: string;
  file?: File;
  previewUrl: string;
  uploadedUrl?: string;
}

export interface PhotoUploaderConfig {
  maxCount: number;
  maxSize: number;
  maxDimension: number;
  quality: number;
  allowedTypes: string[];
}
