import { useState } from "react";
import styles from "./ProfilForm.module.scss";
import Input from "@/shared/ui/baseInput/Input";
import LabelWrap from "@/shared/ui/baseLabel/LabelWrap";

interface ProfileInputSectionProps {
  label: string;
  placeholder: string;
  maxLength: number;
  showRight: boolean;
  showInput: boolean;
  showSocialAccount: boolean;
  socialAccount?: string;
}

const ProfileInputSection = ({
  label,
  placeholder,
  maxLength,
  showRight,
  showInput,
  showSocialAccount,
  socialAccount,
}: ProfileInputSectionProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length <= maxLength) {
      setInputValue(value);
    }
  };

  return (
    <div className={styles.profileForm__item}>
      <LabelWrap
        label={label}
        showRight={showRight}
        currentLength={inputValue.length}
        maxLength={maxLength}
        showSocialAccount={showSocialAccount}
        socialAccount={socialAccount}
      />
      {showInput && (
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ProfileInputSection;
