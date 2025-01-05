import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import homeIcon from '@shared/assets/images/nav/home.svg';
import searchIcon from '@shared/assets/images/nav/search.svg';
import profileIcon from '@shared/assets/images/nav/profile.svg';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <button onClick={() => navigate('/')} className={styles.navButton}>
          <img src={homeIcon} alt="홈" />
          <span>홈</span>
        </button>
        <button onClick={() => navigate('/search')} className={styles.navButton}>
          <img src={searchIcon} alt="검색" />
          <span>검색</span>
        </button>
        <button onClick={() => navigate('/mypage')} className={styles.navButton}>
          <img src={profileIcon} alt="프로필" />
          <span>프로필</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;