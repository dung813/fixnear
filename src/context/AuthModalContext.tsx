import React, { createContext, useContext, useState } from 'react';

interface AuthModalContextValue {
  isOpen: boolean;
  message: string;
  openAuthModal: (message?: string) => void;
  closeAuthModal: () => void;
}

const DEFAULT_MESSAGE = 'Vui lòng đăng nhập tài khoản Khách hàng để tiếp tục sử dụng tính năng này.';

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const openAuthModal = (msg?: string) => {
    setMessage(msg || DEFAULT_MESSAGE);
    setIsOpen(true);
  };
  const closeAuthModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, message, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
}
