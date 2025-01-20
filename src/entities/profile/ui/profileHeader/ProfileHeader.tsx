import styles from "./ProfileHeader.module.scss";
import { ProfileHeaderProps } from "../../types";
import MyProfileImage from "@shared/assets/images/profile/profile.svg";

const ProfileHeader = ({ isScrolled }: ProfileHeaderProps) => {
  return (
    <div
      className={`${styles.profileHead} ${
        isScrolled ? styles["profileHead--shrink"] : ""
      }`}
    >
      <div className={styles.profileHead__inner}>
        <img
          className={styles.profileHead__profileImg}
          src={MyProfileImage}
          alt="myProfileImage"
        />
        <div className={styles.profileHead__meta}>
          <p className={styles.profileHead__nickName}>카페탐방</p>
          <p className={styles.profileHead__introduction}>
            맛있는 커피를 찾아 다닙니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
