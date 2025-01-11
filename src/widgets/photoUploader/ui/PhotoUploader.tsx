import React, { useEffect } from "react";
import { usePhotoUploaderStore } from "@shared/store/usePhotoUploaderStore";
import { PhotoThumbnail } from "./PhotoThumbnail";
import { UploadButton } from "./UploadButton";
import styles from "./PhotoUploader.module.scss";

interface PhotoUploaderProps {
  onImageUploaded?: (imageId: string) => void;
  onImageRemoved?: (imageId: string) => void;
  initialImageIds?: string[];
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onImageUploaded,
  onImageRemoved,
  initialImageIds = [],
}) => {
  const { images, config, addImages, removeImage, cleanup, loadInitialImages } =
    usePhotoUploaderStore();

  useEffect(() => {
    if (initialImageIds.length > 0) {
      loadInitialImages(initialImageIds);
    }
  }, [initialImageIds, loadInitialImages]);

  // 컴포넌트 언마운트 시 cleanup
  React.useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const handleFileSelect = async (files: FileList) => {
    const { error, newImages } = await addImages(Array.from(files));

    if (error) {
      alert(error);
    } else {
      // 새로 추가된 이미지를 기준으로 콜백 호출
      // 필요하다면 여러 장을 업로드했을 때 여러 장을 모두 콜백으로 보낼 수도 있음
      for (const image of newImages) {
        onImageUploaded?.(image.id);
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("이미지를 삭제하시겠습니까?")) return;

    try {
      await removeImage(id);
      onImageRemoved?.(id);
    } catch (error) {
      alert("이미지 삭제에 실패했습니다.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageGrid}>
        {images.length < config.maxCount && (
          <UploadButton
            onFileSelect={handleFileSelect}
            hasImages={images.length > 0}
          />
        )}
        {images.map((image) => (
          <PhotoThumbnail
            key={image.id}
            image={image}
            onDelete={handleDeleteImage}
          />
        ))}
      </div>

      {/* <p className={styles.guideText}>
        * JPG, PNG 파일만 업로드 가능합니다. (최대{" "}
        {config.maxSize / 1024 / 1024}MB)
      </p> */}
    </div>
  );
};
