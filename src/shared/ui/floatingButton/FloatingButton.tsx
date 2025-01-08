import { useNavigate } from 'react-router-dom';
import writeButtonIcon from '@shared/assets/images/write_button.svg';
import styles from './FloatingButton.module.scss';

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      className={styles.floatingButton}
      onClick={() => navigate("/search", { 
        state: { from: "footer" },
        replace: true 
      })}
      aria-label="카페 검색하기"
    >
      <img src={writeButtonIcon} alt="카페 검색" />
    </button>
  );
};

export default FloatingButton;