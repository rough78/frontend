import PhotoEdit from "@/entities/profile/ui/photoEdit/PhotoEdit";
import ProfileBtnWrap from "@/entities/profile/ui/profileBtnWrap/ProfileBtnWrap";
import ProfileForm from "@/entities/profile/ui/profileForm/ProfileForm";
import styles from "./styles/MyPageEdit.module.scss";

const MyPageEdit = () => {
  return (
    <div className={styles.MyPageEdit}>
      <PhotoEdit />
      <ProfileForm />
      <ProfileBtnWrap />
    </div>
  );
};

export default MyPageEdit;
