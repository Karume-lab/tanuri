import { useSessionStore } from "@/features/auth/store";

export const useSession = () => {
  const {
    isLoading,
    isAuthenticated,
    session,
    isOnboarded,
    setSession,
    clearSession,
    getSession,
    setIsOnBoarded,
  } = useSessionStore();

  return {
    isLoading,
    isAuthenticated,
    session,
    isOnboarded,
    setSession,
    clearSession,
    getSession,
    setIsOnBoarded,
  };
};
