import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';

export const OAuthRedirect = () => {
  const navigate = useNavigate();
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    const init = async () => {
      await checkAuthStatus();
      navigate('/');
    };
    init();
  }, [checkAuthStatus, navigate]);

  return <div>로그인 처리중...</div>;
}; 