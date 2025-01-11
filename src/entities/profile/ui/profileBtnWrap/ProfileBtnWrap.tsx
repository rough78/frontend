import Button from "@/shared/ui/button/ui/Button";
import styles from "./ProfileBtnWrap.module.scss";

const ProfileBtnWrap = () => {
  return (
    <div className={styles.profileBtnWrap}>
      <Button
        className={styles["profileBtn--logout"]}
        text="로그아웃"
        altText="로그아웃"
      />
      <Button
        className={styles["profileBtn--delete"]}
        text="회원탈퇴"
        altText="회원탈퇴"
      />
    </div>
  );
};

export default ProfileBtnWrap;
