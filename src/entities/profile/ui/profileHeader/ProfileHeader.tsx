import styles from "./ProfileHeader.module.scss";
import { ProfileHeaderProps } from "../../types";

const ProfileHeader = ({ isScrolled }: ProfileHeaderProps) => {
  return (
    <div
      className={`${styles.profileHead} ${
        isScrolled ? styles["profileHead--small"] : styles["profileHead--large"]
      }`}
    >
      <img
        className={styles.profileHead__profileImg}
        src="src/shared/assets/images/profile/profile.svg"
        alt="myProfileImage"
      />
      <div className={styles.profileHead__meta}>
        <p className={styles.profileHead__nickName}>카페탐방</p>
        <p className={styles.profileHead__introduction}>
          맛있는 커피를 찾아 다닙니다
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
