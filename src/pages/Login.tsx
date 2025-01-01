import Button from "@shared/ui/button/Button";
import Logo from "@shared/ui/logo/Logo";
import LogoWrap from "@app/layout/logoWrap/LogoWrap";
import MainLayout from "@app/layout/mainLayout/MainLayout";
import naverLogo from "@shared/assets/images/social-icons/naver-logo.svg";
import googleLogo from "@shared/assets/images/social-icons/google-logo.svg";
import facebookLogo from "@shared/assets/images/social-icons/facebook-logo.svg";
import { useAuthStore } from '@app/auth/useAuthStore';

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (provider: string) => {
    try {
      await login(provider);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <MainLayout>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <Button
        text="네이버로 시작하기"
        image={naverLogo}
        altText="네이버 로그인"
        onClick={() => handleLogin('naver')}
      />
      <Button
        text="구글로 시작하기"
        image={googleLogo}
        altText="구글 로그인"
        onClick={() => handleLogin('google')}
      />
      <Button
        text="페이스북으로 시작하기"
        image={facebookLogo}
        altText="페이스북 로그인"
        onClick={() => handleLogin('facebook')}
      />
    </MainLayout>
  );
};

export default Login;
