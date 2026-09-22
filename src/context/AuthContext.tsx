import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Technician } from '../types';
import { storageService, initializeStorage } from '../services/storageService';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  loginAsRole: (role: UserRole) => void;
  register: (user: Omit<User, 'id' | 'createdAt'>) => void;
  registerTechnician: (
    userData: Omit<User, 'id' | 'createdAt'>,
    techData: Omit<Technician, 'id' | 'userId'>
  ) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Starts as Guest/Unauthenticated (user = null) on every fresh browser
  // session; only an explicit login/register call (persisted afterwards)
  // restores a session on later reloads.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStorage();
    const storedUser = storageService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, password?: string): boolean => {
    const users = storageService.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found && !found.isLocked && (!found.password || found.password === password)) {
      setUser(found);
      storageService.setCurrentUser(found);
      return true;
    }
    return false;
  };

  const loginAsRole = (role: UserRole) => {
    const demoUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setUser(demoUser);
    storageService.setCurrentUser(demoUser);
  };

  const register = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    storageService.addUser(newUser);
    setUser(newUser);
    storageService.setCurrentUser(newUser);
  };

  const registerTechnician = (
    userData: Omit<User, 'id' | 'createdAt'>,
    techData: Omit<Technician, 'id' | 'userId'>
  ) => {
    const newUserId = `user-tech-${Date.now()}`;
    const newUser: User = {
      ...userData,
      id: newUserId,
      createdAt: new Date().toISOString(),
    };
    const newTech: Technician = {
      ...techData,
      id: `tech-${Date.now()}`,
      userId: newUserId,
    };
    storageService.addUser(newUser);
    storageService.addTechnician(newTech);
    setUser(newUser);
    storageService.setCurrentUser(newUser);
  };

  const logout = () => {
    setUser(null);
    storageService.setCurrentUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    storageService.setCurrentUser(updated);
  };

  const role: UserRole = user ? user.role : 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        loginAsRole,
        register,
        registerTechnician,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

