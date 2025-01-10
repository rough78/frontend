import React from "react";
import { TrashIcon } from "lucide-react";
import { UploadedImage } from "../types";
import styles from "./PhotoThumbnail.module.scss";

interface PhotoThumbnailProps {
  image: UploadedImage;
  onDelete: (id: string) => void;
}

export const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  image,
  onDelete,
}) => {
  return (
    <div className={styles.thumbnailContainer}>
      <img
        src={image.previewUrl}
        alt="업로드된 이미지"
        className={styles.image}
      />
      <button
        onClick={() => onDelete(image.id)}
        className={styles.deleteButton}
        aria-label="이미지 삭제"
      >
        <TrashIcon />
      </button>
    </div>
  );
};
