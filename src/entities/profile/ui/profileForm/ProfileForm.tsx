import styles from "./ProfilForm.module.scss";
import ProfileInputSection from "./ProfileInputSection";
import { UserInfoResponse } from "@/shared/api/user/types";

interface ProfileFormProps {
  userData: UserInfoResponse;
  onNicknameChange: (nickname: string) => void;
  nicknameError: string;
}

const ProfileForm = ({
  userData,
  onNicknameChange,
  nicknameError,
}: ProfileFormProps) => {
  return (
    <div className={styles.profileForm}>
      <ProfileInputSection
        label="연결된 소셜 계정"
        placeholder=""
        maxLength={0}
        showRight={false}
        showInput={false}
        showSocialAccount={true}
        socialAccount={userData.email}
      />
      <ProfileInputSection
        label="닉네임"
        placeholder="닉네임"
        required={true}
        maxLength={20}
        showInput={true}
        showRight={true}
        showSocialAccount={false}
        value={userData.nickname}
        onChange={onNicknameChange}
        errorMessage={nicknameError}
      />
      <ProfileInputSection
        label="소개"
        placeholder="소개말을 적어주세요."
        maxLength={50}
        showRight={true}
        showSocialAccount={false}
        showTextarea={true}
        value={userData.introduce || ""}
      />
    </div>
  );
};

export default ProfileForm;
