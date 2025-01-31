import { debounce } from "lodash";
import { useEffect } from "react";
import { useUserApi } from "@/shared/api/user/userApi";
import { useUserStore } from "@/shared/store/useUserStore";
import PhotoEdit from "@/entities/profile/ui/photoEdit/PhotoEdit";
import ProfileBtnWrap from "@/entities/profile/ui/profileBtnWrap/ProfileBtnWrap";
import ProfileForm from "@/entities/profile/ui/profileForm/ProfileForm";
import styles from "./styles/MyPageEdit.module.scss";

const MyPageEdit = () => {
  const { getUserInfo, checkNicknameExistence } = useUserApi();
  const { setUserData, setNicknameError } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await getUserInfo({
          onSuccess: (data) => {
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
  }, [setUserData]);

  const handleNicknameChange = debounce(async (nickname: string) => {
    try {
      const response = await checkNicknameExistence(nickname);
      if (response.exist) {
        setNicknameError("중복된 닉네임입니다.");
        console.log("중복");
      } else {
        setNicknameError("");
        setUserData((prev) => ({ ...prev, nickname }));
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
    }
  }, 300);

  return (
    <div className={styles.MyPageEdit}>
      <PhotoEdit />
      <ProfileForm onNicknameChange={handleNicknameChange} />
      <ProfileBtnWrap />
    </div>
  );
};

export default MyPageEdit;
