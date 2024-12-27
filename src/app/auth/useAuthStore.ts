import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  checkAuthStatus: () => void
}

// storage 이벤트 리스너를 전역으로 한 번만 설정
const setupStorageListener = (set: (state: Partial<AuthStore>) => void) => {
  const handleStorage = () => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    set({ isAuthenticated: isAuth });
  };
  
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
};

export const useAuthStore = create<AuthStore>((set) => {
  setupStorageListener(set);

  return {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    login: () => {
      localStorage.setItem('isAuthenticated', 'true');
      set({ isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('isAuthenticated');
      set({ isAuthenticated: false });
    },
    checkAuthStatus: () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      set({ isAuthenticated: isAuth });
    }
  }
})
