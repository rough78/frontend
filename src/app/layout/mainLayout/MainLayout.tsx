import styles from './MainLayout.module.scss';
import { ReactNode } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  rightElement?: React.ReactNode;
}

const MainLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true, 
  showBackButton = true,
  headerTitle = '',
  rightElement
}: MainLayoutProps) => {
  return (
    <div>
      {showHeader && (
        <Header 
          title={headerTitle}
          showBackButton={showBackButton}
          rightElement={rightElement}
        />
      )}
      <main className={`${styles.mainContent} ${showHeader ? styles.withHeader : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;