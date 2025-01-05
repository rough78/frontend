import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import backIcon from '@shared/assets/images/common/back.svg';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header = ({ showBackButton = true, title }: HeaderProps) => {
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
      </div>
    </header>
  );
};

export default Header;