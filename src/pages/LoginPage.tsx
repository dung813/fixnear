import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UserRole } from '../types';
import { Wrench, Shield, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuth();
  const { success, error } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const ok = login(email);
      setIsLoading(false);
      if (ok) {
        success('Đăng nhập thành công!');
        navigate('/');
      } else {
        error('Email không tồn tại trong hệ thống demo. Vui lòng chọn tài khoản mẫu bên dưới.');
      }
    }, 500);
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAsRole(role);
    success(`Đã đăng nhập với vai trò ${role.toUpperCase()}`);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'technician') navigate('/technician/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FIX<span className="text-blue-600">NEAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">Đăng nhập tài khoản</h2>
          <p className="text-xs text-slate-500">
            Nền tảng kết nối thợ sửa chữa địa phương nhanh chóng
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Đăng nhập nhanh 1-Click (Dành cho Demo / Hội đồng):</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-semibold border border-blue-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600 group-hover:text-white" />
                <span>Khách hàng (Hoàng Thùy Linh)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('technician')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-600 hover:text-white text-slate-800 text-xs font-semibold border border-amber-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-600 group-hover:text-white" />
                <span>Thợ sửa chữa (Nguyễn Văn Minh - Điện lạnh)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-purple-600 hover:text-white text-slate-800 text-xs font-semibold border border-purple-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600 group-hover:text-white" />
                <span>Quản trị viên Admin (FixNear Team)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4"
        >
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hoặc nhập thông tin
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <Input
            label="Địa chỉ Email"
            type="email"
            placeholder="khachhang@fixnear.vn"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold shadow-brand"
          >
            Đăng nhập
          </Button>

          <div className="text-center pt-2 text-xs text-slate-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Đăng ký ngay
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

