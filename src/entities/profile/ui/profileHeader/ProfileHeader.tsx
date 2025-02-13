import { useEffect } from "react";
import styles from "./ProfileHeader.module.scss";
import { ProfileHeaderProps } from "../../types";
import MyProfileImage from "@shared/assets/images/profile/profile.svg";
import { useProfileStore } from "@shared/store/useProfileStore";
import { useProfileImageApi } from "@shared/api/user/useProfileImagesApi";
import { useMyStore } from "@shared/store/useMyStore";

const ProfileHeader = ({ isScrolled }: ProfileHeaderProps) => {
  const { getUser, userInfo } = useMyStore();
  const { getProfileImage } = useProfileImageApi();
  const { profileImageUrl, setProfileImageUrl } = useProfileStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await getUser();
        if (userInfo?.userId) {
          const newImageUrl = await getProfileImage(userInfo.userId);
          if (newImageUrl) {
            setProfileImageUrl(newImageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`${styles.profileHead} ${isScrolled ? styles["profileHead--shrink"] : ""}`}>
      <div className={styles.profileHead__inner}>
        <img
          className={styles.profileHead__profileImg}
          src={profileImageUrl || MyProfileImage}
          alt="myProfileImage"
        />
        <div className={styles.profileHead__meta}>
          <p className={styles.profileHead__nickName}>
            {userInfo?.nickname || "별명을 설정해주세요"}
          </p>
          <p className={styles.profileHead__introduction}>
            {userInfo?.introduce || "자기소개를 입력해주세요"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
