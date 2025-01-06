import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import backIcon from '@shared/assets/images/common/back.svg';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  rightElement?: React.ReactNode;
}

const Header = ({ showBackButton = true, title, rightElement }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)} 
            className={styles.backButton}
          >
            <img src={backIcon} alt="뒤로가기" />
          </button>
        )}
        {title && <h1 className={styles.title}>{title}</h1>}
        {rightElement && (
          <div className={styles.rightElement}>
            {rightElement}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;