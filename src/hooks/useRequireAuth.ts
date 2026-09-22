import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

/**
 * Gate an action behind login. Guest users get redirected to /login with a
 * toast instead of the action running; logged-in users run it immediately.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { info } = useNotification();

  return (action: () => void) => {
    if (!isAuthenticated) {
      info('Vui lòng đăng nhập để tiếp tục', 'Bạn cần đăng nhập tài khoản để sử dụng tính năng này.');
      navigate('/login');
      return;
    }
    action();
  };
}
