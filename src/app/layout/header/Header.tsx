import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import backIcon from "@shared/assets/images/common/back.svg";

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  count?: number;  // 추가
  rightElement?: React.ReactNode;
  bgColor?: string;
}

const Header = ({
  showBackButton = true,
  title,
  count,  // 추가
  rightElement,
  bgColor = "#fff",
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header} style={{ backgroundColor: bgColor }}>
      <div className={styles.headerContent}>
        {showBackButton && (
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <img src={backIcon} alt="뒤로가기" />
          </button>
        )}
        {title && (
          <div className={styles.titleContainer}>  
            <h1 className={styles.title}>{title}</h1>
            {count !== undefined && <span className={styles.count}>{count}</span>}
          </div>
        )}
        {rightElement && (
          <div className={styles.rightElement}>{rightElement}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
