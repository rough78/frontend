import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useUserApi } from "@/shared/api/user/userApi";
import PhotoEdit from "@/entities/profile/ui/photoEdit/PhotoEdit";
import ProfileBtnWrap from "@/entities/profile/ui/profileBtnWrap/ProfileBtnWrap";
import ProfileForm from "@/entities/profile/ui/profileForm/ProfileForm";
import styles from "./styles/MyPageEdit.module.scss";
import {
  UserInfoResponse,
  IsExistNicknameResponse,
} from "@/shared/api/user/types";

const MyPageEdit = () => {
  const { getUserInfo, checkNicknameExistence } = useUserApi();
  const [userData, setUserData] = useState<UserInfoResponse>({
    nickname: "",
    introduce: "",
    email: "",
    isProfileImageExist: false,
  });
  const [nicknameError, setNicknameError] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await getUserInfo({
          onSuccess: (data: UserInfoResponse) => {
            console.log("사용자 정보 조회 성공:", data);
            setUserData(data);
          },
          onError: (err) => {
            console.error("사용자 정보 조회 중 오류 발생:", err);
          },
        });
      } catch (err) {
        console.error("사용자 정보 조회 처리 중 오류:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameChange = debounce(async (nickname: string) => {
    try {
      const response: IsExistNicknameResponse =
        await checkNicknameExistence(nickname);
      if (response.exist) {
        setNicknameError("중복된 닉네임입니다.");
        console.log("중복");
      } else {
        setNicknameError("");
        setUserData((prevData) => ({ ...prevData, nickname }));
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
    }
  }, 300);

  return (
    <div className={styles.MyPageEdit}>
      <PhotoEdit />
      <ProfileForm
        userData={userData}
        onNicknameChange={handleNicknameChange}
        nicknameError={nicknameError}
      />
      <ProfileBtnWrap />
    </div>
  );
};

export default MyPageEdit;
