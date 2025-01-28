import { useEffect, useRef } from "react";

export const useBlocker = (blocker: () => void, enabled = true) => {
  const isModalOpen = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      if (!isModalOpen.current) {
        isModalOpen.current = true;
        blocker();
        // Keep user on current page
        window.history.forward();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      isModalOpen.current = false;
    };
  }, [blocker, enabled]);

  const setModalState = (open: boolean) => {
    isModalOpen.current = open;
  };

  return { setModalState };
};