import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import styles from "./Footer.module.scss";
import homeIcon from "@shared/assets/images/nav/home.svg";
import searchIcon from "@shared/assets/images/nav/search.svg";
import profileIcon from "@shared/assets/images/nav/profile.svg";

const Footer = () => {
  const navigate = useNavigate();
  const { setIsFromFooter } = useNavigationStore();

  const handleSearchClick = () => {
    setIsFromFooter(true);
    navigate("/search");
  };

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div onClick={() => navigate("/")} className={styles.navItem}>
          <button className={styles.navButton}>
            <img src={homeIcon} alt="홈" />
            <span>홈</span>
          </button>
        </div>
        <div className={styles.navItem}>
          <button
            onClick={handleSearchClick}
            className={styles.navButton}
          >
            <img src={searchIcon} alt="검색" />
            <span>검색</span>
          </button>
        </div>
        <div onClick={() => navigate("/mypage")} className={styles.navItem}>
          <button className={styles.navButton}>
            <img src={profileIcon} alt="프로필" />
            <span>프로필</span>
          </button>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
