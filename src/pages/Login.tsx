import Button from "@/components/button/Button";
import Logo from "@/components/logo/Logo";
import LogoWrap from "@/layout/logoWrap/LogoWrap";
import MainLayout from "@/layout/mainLayout/MainLayout";

const Login = () => {
  return (
    <div>
      <MainLayout>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <Button
          text="네이버로 시작하기"
          image="src/assets/images/social-icons/naver-logo.svg"
          altText="네이버 로그인"
        />
        <Button
          text="구글로 시작하기"
          image="src/assets/images/social-icons/google-logo.svg"
          altText="구글 로그인"
        />
        <Button
          text="페이스북으로 시작하기"
          image="src/assets/images/social-icons/facebook-logo.svg"
          altText="페이스북 로그인"
        />
      </MainLayout>
    </div>
  );
};

export default Login;
