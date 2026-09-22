import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { Avatar } from '../common/Avatar';
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  MessageSquare,
  Star,
  UserCheck,
  Sparkles,
  Users,
  ShieldCheck,
  Layers,
  TrendingUp,
  Settings,
  SlidersHorizontal,
  History
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const { user, role } = useAuth();

  const hasBookings = !!user && storageService.getBookings().some(b => b.customerId === user.id);
  const hasReviews = !!user && storageService.getReviews().some(r => r.customerId === user.id);
  const hasCompletedOrders = !!user && storageService.getBookings().some(
    b => b.customerId === user.id && (b.status === 'completed' || b.status === 'reviewed')
  );
  const isNewAccount = !!user && (Date.now() - new Date(user.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 7;

  const customerLinks = [
    { label: 'Tổng quan', path: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'Yêu cầu của tôi', path: '/customer/requests', icon: ClipboardList },
    ...(hasBookings ? [{ label: 'Lịch hẹn sửa chữa', path: '/my-bookings', icon: CalendarCheck }] : []),
    ...(hasCompletedOrders ? [{ label: 'Lịch sử & Bảo hành', path: '/order-history', icon: History }] : []),
    { label: 'Tin nhắn / Chat', path: '/chat', icon: MessageSquare },
    ...(hasReviews ? [{ label: 'Đánh giá & Review', path: '/reviews', icon: Star }] : []),
  ];

  const technicianLinks = [
    { label: 'Tổng quan công việc', path: '/technician/dashboard', icon: LayoutDashboard },
    { label: 'Yêu cầu gần bạn (Radar)', path: '/technician/radar', icon: ClipboardList },
    { label: 'Lịch hẹn khách đặt', path: '/my-bookings', icon: CalendarCheck },
    { label: 'Tin nhắn khách hàng', path: '/chat', icon: MessageSquare },
    { label: 'Hồ sơ thợ & Dịch vụ', path: `/technicians/${user?.id === 'user-tech-1' ? 'tech-1' : 'tech-1'}`, icon: UserCheck },
    { label: 'Gói FixNear Pro', path: '/technician/pro', icon: Sparkles },
  ];

  const adminLinks = [
    { label: 'Tổng quan Platform', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Quản lý Người dùng', path: '/admin/users', icon: Users },
    { label: 'Quản lý Thợ sửa chữa', path: '/admin/technicians', icon: ShieldCheck },
    { label: 'Yêu cầu & Đơn hàng', path: '/admin/requests', icon: ClipboardList },
    { label: 'Doanh thu & Báo cáo', path: '/admin/revenue', icon: TrendingUp },
    { label: 'Danh mục dịch vụ', path: '/admin/categories', icon: Layers },
  ];

  const currentLinks = role === 'admin' ? adminLinks : role === 'technician' ? technicianLinks : customerLinks;

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User preview header */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <Avatar src={user?.avatar} name={user?.name || 'FixNear'} size="md" isOnline={true} />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name}</h4>
            <p className="text-[11px] text-slate-500 truncate">{user?.phone}</p>
            <span className="inline-block text-[10px] uppercase font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded mt-1">
              {role === 'customer' && isNewAccount
                ? 'MỚI'
                : role === 'customer'
                ? 'Khách hàng'
                : role === 'technician'
                ? 'Thợ đối tác'
                : 'Quản trị viên'}
            </span>
            {role === 'customer' && isNewAccount && (
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                Tài khoản vừa được tạo
              </p>
            )}
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="space-y-1">
          {currentLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Pro Banner in sidebar for tech or support for cust */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        {role === 'technician' ? (
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white text-xs">
            <div className="flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              FixNear Pro
            </div>
            <p className="text-[11px] text-amber-100 mt-1 leading-snug">
              Nhận gấp 3 lần đơn hàng và huy hiệu vàng uy tín.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900">
            <p className="font-bold text-blue-800">Cần hỗ trợ?</p>
            <p className="text-[11px] text-blue-600 mt-0.5">Hotline CSKH: 1900 6868</p>
          </div>
        )}
      </div>
    </aside>
  );
};

