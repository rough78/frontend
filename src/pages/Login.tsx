import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/ui/Button";
import Logo from "@shared/ui/logo/Logo";
import LogoWrap from "@app/layout/logoWrap/LogoWrap";
import MainLayout from "@app/layout/mainLayout/MainLayout";
import naverLogo from "@shared/assets/images/social-icons/naver-logo.svg";
import googleLogo from "@shared/assets/images/social-icons/google-logo.svg";
import facebookLogo from "@shared/assets/images/social-icons/facebook-logo.svg";
import { useAuthStore } from "@app/auth/useAuthStore";
import axios from "axios";
import styles from "@/shared/ui/button/ui/Button.module.scss";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      await login();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <MainLayout>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <Button
          className={`${styles.loginBtn} ${styles.naverBtn}`}
          text="네이버로 시작하기"
          imgUrl={naverLogo}
          altText="네이버 로그인"
          onClick={handleLogin}
        />
        <Button
          className={`${styles.loginBtn} ${styles.googleBtn}`}
          text="구글로 시작하기"
          imgUrl={googleLogo}
          altText="구글 로그인"
          onClick={handleLogin}
        />
        <Button
          className={`${styles.loginBtn} ${styles.faceBtn}`}
          text="페이스북으로 시작하기"
          imgUrl={facebookLogo}
          altText="페이스북 로그인"
          onClick={handleLogin}
        />
      </MainLayout>
    </div>
  );
};

export default Login;
