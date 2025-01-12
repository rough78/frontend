import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import writeButtonIcon from "@shared/assets/images/write_button.svg";
import styles from "./FloatingButton.module.scss";

const FloatingButton = () => {
  const navigate = useNavigate();
  const { setReturnPath, setIsFromFooter } = useNavigationStore();

  const handleButtonClick = () => {
    setIsFromFooter(false);
    setReturnPath(location.pathname);
    navigate("/search");
  };

  return (
    <button
      className={styles.floatingButton}
      onClick={handleButtonClick}
      aria-label="카페 검색하기"
    >
      <img src={writeButtonIcon} alt="카페 검색" />
    </button>
  );
};

export default FloatingButton;
