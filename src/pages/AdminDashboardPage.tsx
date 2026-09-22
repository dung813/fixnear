import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { useNotification } from '../context/NotificationContext';
import { Technician, User, ServiceRequest, Booking, DisputeTicket, Review, WarrantyClaim } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { RatingStars } from '../components/common/RatingStars';
import { CategoryManager } from '../components/admin/CategoryManager';
import { KycReviewModal } from '../components/admin/KycReviewModal';
import { PayoutsTable } from '../components/admin/PayoutsTable';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  ShieldCheck,
  ClipboardList,
  DollarSign,
  CheckCircle2,
  Scale,
  Search,
  Lock,
  Unlock,
  IdCard,
  ShieldAlert,
  EyeOff,
  Eye
} from 'lucide-react';

type TabKey = 'overview' | 'users' | 'technicians' | 'categories' | 'bookings' | 'finance' | 'disputes';

const STATUS_LABEL: Record<Booking['status'], string> = {
  pending: 'Đặt lịch',
  accepted: 'Đề xuất thợ',
  en_route: 'Đang di chuyển',
  surveying: 'Kiểm tra & báo giá',
  in_progress: 'Sửa chữa',
  quote_pending: 'Chờ duyệt báo giá',
  payment_pending: 'Thanh toán',
  completed: 'Đánh giá & Bảo hành',
  reviewed: 'Đánh giá & Bảo hành',
  cancelled: 'Đã hủy',
};

const pathToTab = (pathname: string): TabKey => {
  if (pathname === '/admin/users') return 'users';
  if (pathname === '/admin/technicians') return 'technicians';
  if (pathname === '/admin/categories') return 'categories';
  if (pathname === '/admin/requests') return 'bookings';
  if (pathname === '/admin/revenue') return 'finance';
  if (pathname === '/admin/disputes') return 'disputes';
  return 'overview';
};

export const AdminDashboardPage: React.FC = () => {
  const { success } = useNotification();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabKey>(pathToTab(location.pathname));
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [disputes, setDisputes] = useState<DisputeTicket[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  const [categories, setCategories] = useState(storageService.getCategories());

  // Users tab filters
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'customer' | 'technician' | 'admin'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'locked'>('all');

  // KYC review modal
  const [kycTech, setKycTech] = useState<Technician | null>(null);

  // Platform Settings State
  const [commissionRate, setCommissionRate] = useState('10');
  const [proMonthlyFee, setProMonthlyFee] = useState('99000');
  const [fairDistributionBoost, setFairDistributionBoost] = useState(true);

  const loadData = () => {
    setTechnicians(storageService.getTechnicians());
    setUsers(storageService.getUsers());
    setRequests(storageService.getRequests());
    setBookings(storageService.getBookings());
    setDisputes(storageService.getDisputes());
    setReviews(storageService.getReviews());
    setWarrantyClaims(storageService.getWarrantyClaims());
    setCategories(storageService.getCategories());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, []);

  useEffect(() => {
    setActiveTab(pathToTab(location.pathname));
  }, [location.pathname]);

  const handleToggleProTech = (techId: string, currentStatus: boolean) => {
    storageService.updateTechnician(techId, { isPro: !currentStatus });
    success('Đã cập nhật trạng thái FixNear Pro');
  };

  const handleToggleUserLock = (u: User) => {
    storageService.updateUser(u.id, { isLocked: !u.isLocked });
    success(u.isLocked ? 'Đã mở khóa tài khoản.' : 'Đã khóa tài khoản.');
  };

  const handleToggleReviewHidden = (rev: Review) => {
    storageService.updateReview(rev.id, { isHidden: !rev.isHidden });
    success(rev.isHidden ? 'Đã hiển thị lại đánh giá.' : 'Đã ẩn đánh giá vi phạm.');
  };

  const handleResolveDispute = (disputeId: string, resolution: 'resolved_refund' | 'resolved_dismissed') => {
    storageService.resolveDispute(
      disputeId,
      resolution,
      resolution === 'resolved_refund'
        ? 'Admin chấp thuận hoàn tiền từ quỹ bảo lãnh FixNear Escrow.'
        : 'Admin bác khiếu nại sau khi đối soát bằng chứng thi công.'
    );
    success(resolution === 'resolved_refund' ? 'Đã duyệt hoàn tiền cho khách!' : 'Đã giải quyết khiếu nại!');
  };

  const handleResolveWarranty = (claimId: string, status: 'scheduled' | 'resolved') => {
    storageService.updateWarrantyClaim(claimId, {
      status,
      adminNotes: status === 'scheduled' ? 'Đã điều thợ quay lại kiểm tra bảo hành.' : 'Đã xử lý xong yêu cầu bảo hành.',
    });
    success(status === 'scheduled' ? 'Đã lên lịch cho thợ quay lại bảo hành!' : 'Đã đóng yêu cầu bảo hành.');
  };

  // ---- Derived real KPI data from storage ----
  const completedBookings = bookings.filter(b => b.status === 'completed' || b.status === 'reviewed');
  const totalGMV = completedBookings.reduce((s, b) => s + (b.finalPrice || b.estimatedPrice), 0);
  const commissionRateNum = Number(commissionRate) || 10;
  const platformRevenue = Math.round(totalGMV * (commissionRateNum / 100));
  const customerCount = users.filter(u => u.role === 'customer').length;
  const activeTechCount = technicians.filter(t => t.isAvailable).length;
  const pendingKycCount = technicians.filter(t => !t.isVerified).length;

  // Weekly/monthly chart derived from real completed bookings, bucketed by month.
  const chartData = (() => {
    const buckets = new Map<string, { orders: number; gmv: number }>();
    completedBookings.forEach(b => {
      const d = new Date(b.completedAt || b.createdAt);
      const key = `T${d.getMonth() + 1}`;
      const cur = buckets.get(key) || { orders: 0, gmv: 0 };
      cur.orders += 1;
      cur.gmv += b.finalPrice || b.estimatedPrice;
      buckets.set(key, cur);
    });
    const arr = Array.from(buckets.entries()).map(([month, v]) => ({
      month,
      orders: v.orders,
      gmv: v.gmv,
      revenue: Math.round(v.gmv * (commissionRateNum / 100)),
    }));
    return arr.length > 0 ? arr : [{ month: 'Chưa có dữ liệu', orders: 0, gmv: 0, revenue: 0 }];
  })();

  const categoryDistributionData = (() => {
    const palette = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#64748B', '#EC4899', '#14B8A6'];
    const counts = new Map<string, number>();
    requests.forEach(r => counts.set(r.categoryName, (counts.get(r.categoryName) || 0) + 1));
    const arr = Array.from(counts.entries()).map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }));
    return arr.length > 0 ? arr : [{ name: 'Chưa có dữ liệu', value: 1, color: '#CBD5E1' }];
  })();

  const filteredUsers = users.filter(u => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userStatusFilter === 'active' && u.isLocked) return false;
    if (userStatusFilter === 'locked' && !u.isLocked) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
    }
    return true;
  });

  const activeDisputes = disputes.filter(d => d.status === 'open' || d.status === 'investigating');
  const activeWarrantyClaims = warrantyClaims.filter(w => w.status !== 'resolved');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Tổng quan & Thống kê' },
    { key: 'users', label: `Người dùng (${users.length})` },
    { key: 'technicians', label: `Hồ sơ Thợ & KYC (${pendingKycCount})` },
    { key: 'categories', label: 'Danh mục dịch vụ' },
    { key: 'bookings', label: `Đơn hàng (${bookings.length})` },
    { key: 'finance', label: 'Tài chính & Đối soát' },
    { key: 'disputes', label: `Khiếu nại (${activeDisputes.length + activeWarrantyClaims.length})` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            ★ Hệ Thống Quản Trị Trung Tâm
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            Bảng điều khiển Admin FixNear
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Giám sát vận hành thị trường, hồ sơ thợ, danh mục dịch vụ, tài chính và xử lý tranh chấp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="pro" size="md">
            Phiên bản: 1.3.0 (Admin Ops Center)
          </Badge>
        </div>
      </div>

      {/* Metrics Row - real KPI cards derived from storage */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Tổng yêu cầu"
          value={requests.length}
          subtitle="Tất cả yêu cầu sửa chữa"
          icon={<ClipboardList className="w-4 h-4 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Đơn hoàn thành"
          value={completedBookings.length}
          subtitle="Trên tổng số đơn"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Doanh thu hệ thống"
          value={formatCurrency(platformRevenue)}
          subtitle={`Phí nền tảng ${commissionRateNum}%`}
          icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Khách hàng"
          value={customerCount}
          subtitle="Tài khoản khách hàng"
          icon={<Users className="w-4 h-4 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Thợ đang hoạt động"
          value={`${activeTechCount}/${technicians.length}`}
          subtitle="Đang sẵn sàng nhận việc"
          icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">

          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`pb-3 whitespace-nowrap transition relative ${
                  activeTab === t.key
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW - ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">

              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Tăng trưởng Doanh thu & Giá trị giao dịch GMV theo tháng
                    </h3>
                    <p className="text-xs text-slate-500">Đơn vị: VNĐ - Tính từ dữ liệu đơn hoàn thành thực tế</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span> GMV Tổng
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Phí sàn FixNear
                    </span>
                  </div>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `${(v as number) / 1000000}M`} />
                      <Tooltip
                        formatter={(val: any) => formatCurrency(Number(val))}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', border: 'none' }}
                      />
                      <Area type="monotone" dataKey="gmv" stroke="#2563EB" fill="#DBEAFE" strokeWidth={2} name="GMV Tổng" />
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} name="Doanh thu sàn" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Tỷ trọng nhu cầu theo dịch vụ
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistributionData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={75}
                          label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Số lượng đơn hoàn thành theo tháng
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                        <YAxis stroke="#94A3B8" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', border: 'none' }}
                        />
                        <Bar dataKey="orders" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Số đơn hàng" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: USERS - search / filter / lock */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">
                  Quản lý Khách hàng & Thợ ({filteredUsers.length}/{users.length})
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                      placeholder="Tìm tên, email, SĐT..."
                      className="pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <select
                    value={userRoleFilter}
                    onChange={e => setUserRoleFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
                  >
                    <option value="all">Tất cả vai trò</option>
                    <option value="customer">Khách hàng</option>
                    <option value="technician">Thợ</option>
                    <option value="admin">Admin</option>
                  </select>
                  <select
                    value={userStatusFilter}
                    onChange={e => setUserStatusFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="locked">Bị khóa</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Người dùng</th>
                      <th className="py-3 px-3">Liên hệ</th>
                      <th className="py-3 px-3">Vai trò</th>
                      <th className="py-3 px-3">Ngày tham gia</th>
                      <th className="py-3 px-3">Trạng thái</th>
                      <th className="py-3 px-3 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredUsers.map((u: User) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <Avatar src={u.avatar} name={u.name} size="xs" />
                          {u.name}
                        </td>
                        <td className="py-3 px-3">
                          <div>{u.email}</div>
                          <div className="text-[11px] text-slate-400">{u.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-slate-100 text-slate-800">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">{formatDate(u.createdAt)}</td>
                        <td className="py-3 px-3">
                          <Badge variant={u.isLocked ? 'danger' : 'success'} size="sm">
                            {u.isLocked ? 'Bị khóa' : 'Đang hoạt động'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => handleToggleUserLock(u)}
                              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 ml-auto ${
                                u.isLocked
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              }`}
                            >
                              {u.isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                              {u.isLocked ? 'Mở khóa' : 'Khóa'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          Không tìm thấy người dùng phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICIANS & KYC */}
          {activeTab === 'technicians' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">
                  Hồ sơ đối tác thợ & Xác minh KYC ({technicians.length})
                </h3>
                {pendingKycCount > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    <ShieldAlert className="w-3.5 h-3.5" /> {pendingKycCount} hồ sơ chờ duyệt
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Thợ kỹ thuật</th>
                      <th className="py-3 px-3">Khu vực</th>
                      <th className="py-3 px-3">Đơn & Tỷ lệ</th>
                      <th className="py-3 px-3">Đánh giá</th>
                      <th className="py-3 px-3">Trạng thái KYC</th>
                      <th className="py-3 px-3">Gói Pro</th>
                      <th className="py-3 px-3 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {technicians.map((tech: Technician) => (
                      <tr key={tech.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={tech.avatar} name={tech.name} size="sm" />
                            <div>
                              <div className="font-bold text-slate-900">{tech.name}</div>
                              <span className="text-[11px] text-slate-500">{tech.title}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium">{tech.district}, {tech.city}</td>
                        <td className="py-3 px-3 font-semibold">{tech.completedJobs} đơn ({tech.completionRate || 98}%)</td>
                        <td className="py-3 px-3 font-bold text-amber-600">{tech.rating} ★</td>
                        <td className="py-3 px-3">
                          <Badge variant={tech.isVerified ? 'success' : 'warning'} size="sm">
                            {tech.isVerified ? 'Đã xác minh' : 'Chờ duyệt'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant={tech.isPro ? 'pro' : 'neutral'} size="sm">
                            {tech.isPro ? 'FixNear Pro' : 'Thường'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setKycTech(tech)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-semibold flex items-center gap-1"
                            >
                              <IdCard className="w-3 h-3" /> Xem KYC
                            </button>
                            <button
                              onClick={() => handleToggleProTech(tech.id, tech.isPro)}
                              className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[11px] font-semibold"
                            >
                              {tech.isPro ? 'Hủy Pro' : 'Cấp Pro'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORY MANAGEMENT */}
          {activeTab === 'categories' && (
            <CategoryManager categories={categories} onChange={loadData} />
          )}

          {/* TAB 5: BOOKINGS & REQUESTS - full status chain */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Toàn bộ đơn sửa chữa trên sàn ({bookings.length})
              </h3>
              <p className="text-[11px] text-slate-500 -mt-2">
                Chuỗi trạng thái chuẩn: Tạo yêu cầu → Đề xuất thợ → Đặt lịch → Kiểm tra &amp; báo giá → Sửa chữa → Thanh toán → Đánh giá &amp; Bảo hành
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Mã đơn</th>
                      <th className="py-3 px-3">Khách hàng</th>
                      <th className="py-3 px-3">Thợ nhận việc</th>
                      <th className="py-3 px-3">Dịch vụ</th>
                      <th className="py-3 px-3">Chi phí</th>
                      <th className="py-3 px-3">Thanh toán</th>
                      <th className="py-3 px-3">Trạng thái vận hành</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {bookings.map((b: Booking) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{b.id}</td>
                        <td className="py-3 px-3 font-bold">{b.customerName}</td>
                        <td className="py-3 px-3">{b.technicianName}</td>
                        <td className="py-3 px-3">{b.serviceName}</td>
                        <td className="py-3 px-3 font-extrabold text-blue-600">
                          {formatCurrency(b.quotation?.totalAmount || b.finalPrice || b.estimatedPrice)}
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant={b.paymentStatus === 'released' ? 'success' : b.paymentStatus === 'refunded' ? 'danger' : 'warning'} size="sm">
                            {b.paymentStatus === 'holding_escrow' ? 'Đang giữ Escrow'
                              : b.paymentStatus === 'released' ? 'Đã thanh toán'
                              : b.paymentStatus === 'refunded' ? 'Đã hoàn tiền'
                              : 'Tiền mặt'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant={b.status === 'cancelled' ? 'danger' : b.status === 'completed' || b.status === 'reviewed' ? 'primary' : 'info'} size="sm">
                            {b.status === 'cancelled' ? 'Đã hủy' : STATUS_LABEL[b.status]}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: FINANCE - commission config + payouts */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-6">
                <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                  Cấu hình phí nền tảng & gói hội viên
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <Input
                    label="Tỷ lệ hoa hồng trên mỗi đơn hoàn thành (%):"
                    type="number"
                    value={commissionRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommissionRate(e.target.value)}
                    helperText={`Hiện tại đang thu ${commissionRateNum}% trên giá trị đơn`}
                  />

                  <Input
                    label="Mức phí gói FixNear Pro (VNĐ / tháng):"
                    type="number"
                    value={proMonthlyFee}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProMonthlyFee(e.target.value)}
                    helperText="Mặc định: 99.000đ/tháng"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-xl space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fairDistributionBoost}
                      onChange={(e) => setFairDistributionBoost(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded accent-purple-600"
                    />
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-purple-600" />
                      Kích hoạt thuật toán cân bằng cơ hội cho thợ mới (Fair Distribution)
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    Tự động ưu tiên hiển thị 20% yêu cầu sửa chữa cho các thợ mới đăng ký có tay nghề tốt để đảm bảo mọi thợ đều nhận được việc làm đầu tiên.
                  </p>
                </div>

                <Button onClick={() => success('Đã lưu cấu hình hệ thống!')}>
                  Lưu cấu hình hệ thống
                </Button>
              </div>

              <PayoutsTable bookings={bookings} commissionRate={commissionRateNum} />
            </div>
          )}

          {/* TAB 7: DISPUTES, WARRANTY & REVIEWS MODERATION */}
          {activeTab === 'disputes' && (
            <div className="space-y-6">

              {/* Disputes */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-base text-slate-900">
                    Khiếu nại & Tranh chấp dịch vụ ({disputes.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bảo vệ quyền lợi khách hàng và uy tín của thợ qua cơ chế ký quỹ FixNear Escrow.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-3">Khách khiếu nại</th>
                        <th className="py-3 px-3">Thợ bị báo cáo</th>
                        <th className="py-3 px-3">Loại vấn đề</th>
                        <th className="py-3 px-3">Nội dung</th>
                        <th className="py-3 px-3">Số tiền đòi hoàn</th>
                        <th className="py-3 px-3">Trạng thái</th>
                        <th className="py-3 px-3 text-right">Xử lý</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {disputes.map((disp: DisputeTicket) => (
                        <tr key={disp.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3 font-bold text-slate-900">{disp.customerName}</td>
                          <td className="py-3 px-3 font-semibold">{disp.technicianName}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[11px]">
                              {disp.issueType === 'quality' ? 'Chất lượng kém' : disp.issueType === 'pricing' ? 'Giá không rõ ràng' : 'Hư hại tài sản'}
                            </span>
                          </td>
                          <td className="py-3 px-3 max-w-xs truncate">{disp.description}</td>
                          <td className="py-3 px-3 font-bold text-rose-600">{formatCurrency(disp.refundRequested)}</td>
                          <td className="py-3 px-3">
                            <Badge variant={disp.status === 'open' || disp.status === 'investigating' ? 'warning' : 'success'} size="sm">
                              {disp.status === 'open' ? 'Chờ xử lý' : disp.status === 'investigating' ? 'Đang điều tra' : 'Đã giải quyết'}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {disp.status !== 'resolved_refund' && disp.status !== 'resolved_dismissed' ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleResolveDispute(disp.id, 'resolved_refund')}
                                  className="px-2 py-1 bg-rose-600 text-white hover:bg-rose-700 rounded text-[10px] font-bold"
                                >
                                  Hoàn tiền
                                </button>
                                <button
                                  onClick={() => handleResolveDispute(disp.id, 'resolved_dismissed')}
                                  className="px-2 py-1 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded text-[10px] font-semibold"
                                >
                                  Bác bỏ
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400">Đã chốt kết quả</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {disputes.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-slate-400">Chưa có khiếu nại nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Warranty Claims */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                  Yêu cầu bảo hành hỏng lại ({warrantyClaims.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-3">Mã đơn gốc</th>
                        <th className="py-3 px-3">Thợ phụ trách</th>
                        <th className="py-3 px-3">Mô tả lỗi tái phát</th>
                        <th className="py-3 px-3">Ngày mong muốn</th>
                        <th className="py-3 px-3">Trạng thái</th>
                        <th className="py-3 px-3 text-right">Xử lý</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {warrantyClaims.map(claim => (
                        <tr key={claim.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{claim.bookingId}</td>
                          <td className="py-3 px-3 font-semibold">{claim.technicianName}</td>
                          <td className="py-3 px-3 max-w-xs truncate">{claim.description}</td>
                          <td className="py-3 px-3">{formatDate(claim.preferredDate)}</td>
                          <td className="py-3 px-3">
                            <Badge variant={claim.status === 'resolved' ? 'success' : claim.status === 'scheduled' ? 'info' : 'warning'} size="sm">
                              {claim.status === 'pending' ? 'Chờ xử lý' : claim.status === 'scheduled' ? 'Đã điều thợ' : 'Đã xử lý xong'}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {claim.status === 'pending' && (
                              <button
                                onClick={() => handleResolveWarranty(claim.id, 'scheduled')}
                                className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded text-[10px] font-bold"
                              >
                                Điều thợ bảo hành
                              </button>
                            )}
                            {claim.status === 'scheduled' && (
                              <button
                                onClick={() => handleResolveWarranty(claim.id, 'resolved')}
                                className="px-2 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded text-[10px] font-bold"
                              >
                                Đóng yêu cầu
                              </button>
                            )}
                            {claim.status === 'resolved' && <span className="text-[10px] text-slate-400">Hoàn tất</span>}
                          </td>
                        </tr>
                      ))}
                      {warrantyClaims.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-slate-400">Chưa có yêu cầu bảo hành nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Reviews moderation */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                  Quản lý đánh giá & nhận xét ({reviews.length})
                </h3>
                <div className="divide-y divide-slate-100">
                  {reviews.map(rev => (
                    <div key={rev.id} className={`py-3 flex items-start justify-between gap-3 ${rev.isHidden ? 'opacity-50' : ''}`}>
                      <div className="flex items-start gap-2.5 min-w-0">
                        <Avatar src={rev.customerAvatar} name={rev.customerName} size="sm" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                            <RatingStars rating={rev.rating} size="sm" showNumber={false} />
                            {rev.isHidden && (
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Đã ẩn</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rev.comment}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleReviewHidden(rev)}
                        className="shrink-0 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 bg-slate-100 text-slate-600 hover:bg-slate-200"
                      >
                        {rev.isHidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {rev.isHidden ? 'Hiện lại' : 'Ẩn'}
                      </button>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="py-6 text-center text-xs text-slate-400">Chưa có đánh giá nào.</p>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      <KycReviewModal
        isOpen={!!kycTech}
        onClose={() => setKycTech(null)}
        technician={kycTech}
        onDecided={loadData}
      />

    </div>
  );
};
