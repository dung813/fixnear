import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCity } from '../../context/CityContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { storageService } from '../../services/storageService';
import { Avatar } from '../common/Avatar';
import { CreateRequestModal } from '../requests/CreateRequestModal';
import {
  Wrench,
  Search,
  PlusCircle,
  Menu,
  X,
  MessageSquare,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  MapPin,
  ChevronDown,
  ShieldCheck,
  HelpCircle,
  Info
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [createRequestOpen, setCreateRequestOpen] = useState(false);
  const { city: selectedCity, setCity: setSelectedCity } = useCity();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handlePostRequestClick = () => {
    if (!isAuthenticated) {
      openAuthModal('Vui lòng đăng nhập tài khoản Khách hàng để đăng yêu cầu sửa chữa.');
      return;
    }
    setCreateRequestOpen(true);
  };

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'technician') return '/technician/dashboard';
    return '/customer/dashboard';
  };

  const hasBookings = user
    ? storageService.getBookings().some(b => b.customerId === user.id)
    : false;

  const myTechnician = user && role === 'technician'
    ? storageService.getTechnicians().find(t => t.userId === user.id || t.id === 'tech-1')
    : undefined;

  const myActiveBookings = myTechnician
    ? storageService.getBookings().filter(
        b => b.technicianId === myTechnician.id &&
          ['accepted', 'en_route', 'surveying', 'in_progress', 'quote_pending', 'payment_pending'].includes(b.status)
      )
    : [];
  const activeJobsCount = myActiveBookings.length;
  const primaryActiveBookingId = myActiveBookings[0]?.id;

  const isNewAccount = !!user && (Date.now() - new Date(user.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 7;

  const roleBadgeLabel = role === 'customer' && isNewAccount ? 'MỚI' : role.toUpperCase();

  const navLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Tìm thợ', path: '/technicians' },
    { label: 'Dịch vụ', path: '/services' },
    { label: 'Về FixNear', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand group-hover:bg-blue-700 transition">
                <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                  FIX<span className="text-blue-600">NEAR</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider">
                  TÌM THỢ GẦN BẠN
                </span>
              </div>
            </Link>

            {/* City selector dropdown */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 text-xs font-medium hover:bg-slate-200/80 transition cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value as any)}
                aria-label="Chọn thành phố"
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {role === 'admin' && isAuthenticated ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                Vào trang Quản trị
              </Link>
            ) : role === 'technician' && isAuthenticated ? (
              <Link
                to="/technician/schedule"
                state={primaryActiveBookingId ? { openBookingId: primaryActiveBookingId } : undefined}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
              >
                <CalendarCheck className="w-4 h-4" />
                Đơn đang thực hiện ({activeJobsCount})
              </Link>
            ) : (
              <button
                type="button"
                onClick={handlePostRequestClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-brand transition-all active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                Đăng yêu cầu sửa
              </button>
            )}

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition"
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" isOnline={true} />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{roleBadgeLabel}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-scale-in">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Tài khoản</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold uppercase">
                          {roleBadgeLabel}
                        </span>
                        {role === 'customer' && isNewAccount && (
                          <p className="text-[10px] text-emerald-600 font-medium mt-1">
                            Tài khoản vừa được tạo
                          </p>
                        )}
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600" />
                          Bảng điều khiển
                        </Link>
                        {hasBookings && (
                          <Link
                            to="/my-bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            <CalendarCheck className="w-4 h-4 text-emerald-600" />
                            Lịch hẹn của tôi
                          </Link>
                        )}
                        <Link
                          to="/chat"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                        >
                          <MessageSquare className="w-4 h-4 text-amber-600" />
                          Tin nhắn / Chat
                        </Link>
                        {role === 'customer' && (
                          <Link
                            to="/technician/register"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                            Đăng ký làm thợ
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-brand transition"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {role === 'admin' && isAuthenticated ? (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold"
              >
                Trang Quản trị
              </Link>
            ) : role === 'technician' && isAuthenticated ? (
              <Link
                to="/technician/schedule"
                state={primaryActiveBookingId ? { openBookingId: primaryActiveBookingId } : undefined}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold"
              >
                Đang thực hiện ({activeJobsCount})
              </Link>
            ) : (
              <button
                type="button"
                onClick={handlePostRequestClick}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
              >
                Đăng yêu cầu
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Khu vực tìm kiếm:</span>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value as any)}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border-none"
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

          <div className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Bảng điều khiển ({role})
                </Link>
                <Link
                  to="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  Lịch sửa chữa
                </Link>
                <Link
                  to="/chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  Tin nhắn
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <CreateRequestModal isOpen={createRequestOpen} onClose={() => setCreateRequestOpen(false)} />
    </header>
  );
};

