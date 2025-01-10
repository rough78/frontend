import React, { useRef } from "react";
import { PlusCircle } from "lucide-react";
import styles from "./UploadButton.module.scss";

interface UploadButtonProps {
  onFileSelect: (files: FileList) => void;
  disabled?: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelect,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploadContainer}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={styles.uploadButton}
        aria-label="이미지 업로드"
      >
        <PlusCircle className={styles.uploadIcon} />
      </button>
      <label htmlFor="photoUpload" className={styles.fileInput}>
        <input
          id="photoUpload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className={styles.fileInput}
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
          title="이미지 파일 선택"
        />
      </label>
    </div>
  );
};
