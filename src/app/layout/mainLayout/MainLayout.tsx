import styles from "./MainLayout.module.scss";
import { ReactNode } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import FloatingButton from "@shared/ui/floatingButton/FloatingButton";

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showBackButton?: boolean;
  showWriteButton?: boolean;
  headerTitle?: string;
  rightElement?: React.ReactNode;
}

const MainLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  showBackButton = true,
  showWriteButton = true,
  headerTitle = "",
  rightElement
}: MainLayoutProps) => {
  return (
    <div className={styles.mainLayout}>
      {showHeader && (
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          rightElement={rightElement}
        />
      )}
      <main className={`${styles.mainContent} ${showHeader ? styles.withHeader : ''}`}>
        {children}
        {showWriteButton && <FloatingButton />}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
