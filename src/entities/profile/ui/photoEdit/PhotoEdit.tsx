import styles from "./PhotoEdit.module.scss";
import profile from "@shared/assets/images/profile/profile.svg";
import edit from "@shared/assets/images/profile/image-edit.svg";
import Button from "@/shared/ui/button/ui/Button";

const PhotoEdit = () => {
  return (
    <div className={styles.photoEditWrap}>
      <div className={styles.photoEditBox}>
        <img className={styles.photoEditBox__profile} src={profile} alt="" />

        <Button
          className={`imgBtn ${styles["photoEditBox__profile--edit"]}`}
          imgUrl={edit}
          altText="프로필 사진 선택"
        />
      </div>
    </div>
  );
};

export default PhotoEdit;
