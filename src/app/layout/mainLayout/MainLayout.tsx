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
}

const MainLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true, 
  showBackButton = true,
  headerTitle = '' 
}: MainLayoutProps) => {
  return (
    <div>
      {showHeader && (
        <Header 
          title={headerTitle}
          showBackButton={showBackButton} 
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