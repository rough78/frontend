export interface ImageUploadResponse {
  imageId: string;
}

export interface ImageDeleteResponse {
  success: boolean;
}

export type ImageApiResponse = ImageUploadResponse | ImageDeleteResponse;
