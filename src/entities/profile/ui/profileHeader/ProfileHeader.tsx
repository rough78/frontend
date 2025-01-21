import { useEffect, useState } from "react";
import styles from "./ProfileHeader.module.scss";
import { ProfileHeaderProps } from "../../types";
import MyProfileImage from "@shared/assets/images/profile/profile.svg";
import { useUserApi } from "@shared/api/user/userApi";
import type { UserInfoResponse } from "@shared/api/user/types";

const ProfileHeader = ({ isScrolled }: ProfileHeaderProps) => {
  const { getUserInfo } = useUserApi();
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

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
          <p className={styles.profileHead__nickName}>{userInfo?.nickname || "별명을 설정해주세요"}</p>
          <p className={styles.profileHead__introduction}>
            {userInfo?.introduce || "자기소개를 입력해주세요"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
