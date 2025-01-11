import styles from "./ProfilForm.module.scss";
import ProfileInputSection from "./ProfileInputSection";

const ProfileForm = () => {
  return (
    <div className={styles.profileForm}>
      <ProfileInputSection
        label="연결된 소셜 계정"
        placeholder=""
        maxLength={0}
        showRight={false}
        showInput={false}
        showSocialAccount={true}
        socialAccount="luna7252@google.com"
      />
      <ProfileInputSection
        label="닉네임"
        placeholder="닉네임"
        maxLength={10}
        showInput={true}
        showRight={true}
        showSocialAccount={false}
      />
      <ProfileInputSection
        label="소개"
        placeholder="소개말을 적어주세요."
        maxLength={20}
        showInput={true}
        showRight={true}
        showSocialAccount={false}
      />
    </div>
  );
};

export default ProfileForm;
