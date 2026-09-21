import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { storageService } from '../../services/storageService';
import { UserCheck, Wrench, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleDemoBar: React.FC = () => {
  const { role, user, loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitchRole = (newRole: UserRole) => {
    loginAsRole(newRole);
    if (newRole === 'customer') navigate('/customer/dashboard');
    else if (newRole === 'technician') navigate('/technician/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ dữ liệu demo về trạng thái ban đầu?')) {
      storageService.resetToDefault();
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 py-1.5 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Bảng điều khiển Demo (Dành cho Giảng viên & Hội đồng):
          </span>
          <span className="hidden sm:inline text-slate-400">
            Đang đăng nhập: <strong className="text-white">{user?.name}</strong> ({role})
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleSwitchRole('customer')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'customer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Khách hàng
          </button>

          <button
            onClick={() => handleSwitchRole('technician')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'technician'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Wrench className="w-3 h-3" />
            Thợ sửa chữa
          </button>

          <button
            onClick={() => handleSwitchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3 h-3" />
            Quản trị viên
          </button>

          <button
            onClick={handleResetData}
            title="Khôi phục lại dữ liệu mẫu ban đầu"
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-md flex items-center gap-1 ml-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Đặt lại Mock Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

