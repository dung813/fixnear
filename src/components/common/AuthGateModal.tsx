import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Button } from './Button';
import { useAuthModal } from '../../context/AuthModalContext';
import { UserCircle } from 'lucide-react';

// Single shared "please log in" gate, opened via useAuthModal()/useRequireAuth()
// from anywhere in the app instead of each guarded action rolling its own modal.
export const AuthGateModal: React.FC = () => {
  const { isOpen, message, closeAuthModal } = useAuthModal();
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={closeAuthModal} maxWidth="sm">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <UserCircle className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Yêu cầu đăng nhập</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              closeAuthModal();
              navigate('/register');
            }}
          >
            Đăng ký
          </Button>
          <Button
            className="flex-1 font-bold"
            onClick={() => {
              closeAuthModal();
              navigate('/login');
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </Modal>
  );
};
