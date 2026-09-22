import { useAuth } from '../context/AuthContext';
import { useAuthModal } from '../context/AuthModalContext';

/**
 * Gate an action behind login. Guest users see the shared AuthGateModal
 * (optionally with a custom message) instead of the action running;
 * logged-in users run it immediately.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  return (action: () => void, message?: string) => {
    if (!isAuthenticated) {
      openAuthModal(message);
      return;
    }
    action();
  };
}
