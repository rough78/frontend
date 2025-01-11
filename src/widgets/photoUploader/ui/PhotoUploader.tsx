import React from "react";
import { usePhotoUploaderStore } from "@shared/store/usePhotoUploaderStore";
import { PhotoThumbnail } from "./PhotoThumbnail";
import { UploadButton } from "./UploadButton";
import styles from "./PhotoUploader.module.scss";

export const PhotoUploader: React.FC = () => {
  const { images, config, addImages, removeImage, cleanup } =
    usePhotoUploaderStore();

  React.useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const handleFileSelect = async (files: FileList) => {
    const error = await addImages(Array.from(files));
    if (error) {
      alert(error);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("이미지를 삭제하시겠습니까?")) return;

    try {
      await removeImage(id);
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
