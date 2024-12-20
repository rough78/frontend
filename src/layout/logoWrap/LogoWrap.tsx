import { ReactNode } from "react";
import styles from "./LogoWrap.module.scss";

interface LogoWrapProps {
  children: ReactNode;
}

const LogoWrap: React.FC<LogoWrapProps> = ({ children }) => {
  return <div className={styles.logoWrap}>{children}</div>;
};

export default LogoWrap;
