import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { useNotification } from '../context/NotificationContext';
import { Technician, User, ServiceRequest, Booking, DisputeTicket } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
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
  TrendingUp, 
  DollarSign, 
  CheckCircle2,
  AlertTriangle,
  Scale
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { success } = useNotification();

  const [activeTab, setActiveTab] = useState<'overview' | 'technicians' | 'disputes' | 'users' | 'bookings' | 'settings'>('overview');
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [disputes, setDisputes] = useState<DisputeTicket[]>([]);

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
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, []);

  const handleToggleVerifyTech = (techId: string, currentStatus: boolean) => {
    storageService.updateTechnician(techId, { isVerified: !currentStatus });
    success('Đã cập nhật trạng thái xác minh thợ');
    loadData();
  };

  const handleToggleProTech = (techId: string, currentStatus: boolean) => {
    storageService.updateTechnician(techId, { isPro: !currentStatus });
    success('Đã cập nhật trạng thái FixNear Pro');
    loadData();
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
    loadData();
  };

  const revenueChartData = [
    { month: 'T3', gmv: 18500000, revenue: 1850000, orders: 65 },
    { month: 'T4', gmv: 24200000, revenue: 2420000, orders: 84 },
    { month: 'T5', gmv: 31000000, revenue: 3100000, orders: 110 },
    { month: 'T6', gmv: 42500000, revenue: 4250000, orders: 152 },
    { month: 'T7', gmv: 58000000, revenue: 5800000, orders: 198 },
    { month: 'T8', gmv: 74500000, revenue: 7450000, orders: 245 },
  ];

  const categoryDistributionData = [
    { name: 'Điện lạnh', value: 35, color: '#2563EB' },
    { name: 'Sửa Điện', value: 22, color: '#F59E0B' },
    { name: 'Sửa Nước', value: 18, color: '#10B981' },
    { name: 'Sửa Khóa', value: 12, color: '#8B5CF6' },
    { name: 'Khác', value: 13, color: '#64748B' },
  ];

  const totalGMV = 248700000;
  const platformRevenue = 24870000;

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
            Giám sát vận hành thị trường, giải quyết tranh chấp, mạng lưới thợ và chỉ số phân bổ đơn công bằng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="pro" size="md">
            Phiên bản: 1.2.0 (Smart Matching & Escrow)
          </Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Tổng GMV giao dịch"
          value={formatCurrency(totalGMV)}
          change="+28%"
          isPositive={true}
          icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Doanh thu nền tảng"
          value={formatCurrency(platformRevenue)}
          change="+22%"
          isPositive={true}
          icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Tổng người dùng"
          value={users.length + 1250}
          change="+15%"
          isPositive={true}
          icon={<Users className="w-4 h-4 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Thợ trong mạng lưới"
          value={technicians.length}
          subtitle="100% KYC"
          icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Tranh chấp / Khiếu nại"
          value={disputes.filter(d => d.status === 'open' || d.status === 'investigating').length}
          subtitle="Cần xử lý"
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          iconBgColor="bg-rose-50"
        />
        <StatCard
          title="Tỷ lệ hoàn thành"
          value="98.2%"
          subtitle="Độ hài lòng cao"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Biểu đồ & Thống kê
            </button>

            <button
              onClick={() => setActiveTab('technicians')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'technicians'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Quản lý Thợ ({technicians.length})
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'disputes'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Khiếu nại & Tranh chấp ({disputes.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'users'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Người dùng ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'bookings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đơn hàng & Yêu cầu ({bookings.length + requests.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Cài đặt phí & Phân bổ
            </button>
          </div>

          {/* TAB 1: BIỂU ĐỒ & THỐNG KÊ (RECHARTS) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Tăng trưởng Doanh thu & Giá trị giao dịch GMV (6 tháng gần nhất)
                    </h3>
                    <p className="text-xs text-slate-500">Đơn vị: VNĐ</p>
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
                    <AreaChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `${v / 1000000}M`} />
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
                    Số lượng đơn đặt lịch theo tháng
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueChartData}>
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

          {/* TAB 2: QUẢN LÝ THỢ */}
          {activeTab === 'technicians' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">
                  Danh sách đối tác thợ ({technicians.length})
                </h3>
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
                              onClick={() => handleToggleVerifyTech(tech.id, tech.isVerified)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-semibold"
                            >
                              {tech.isVerified ? 'Bỏ duyệt' : 'Duyệt KYC'}
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

          {/* TAB 3: DISPUTES & TRANH CHẤP */}
          {activeTab === 'disputes' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Xử lý khiếu nại & Tranh chấp dịch vụ ({disputes.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bảo vệ quyền lợi khách hàng và uy tín của thợ qua cơ chế ký quỹ FixNear Escrow.
                  </p>
                </div>
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
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: NGƯỜI DÙNG */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Quản lý tài khoản hệ thống ({users.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Người dùng</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Số điện thoại</th>
                      <th className="py-3 px-3">Vai trò (Role)</th>
                      <th className="py-3 px-3">Ngày tham gia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {users.map((u: User) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <Avatar src={u.avatar} name={u.name} size="xs" />
                          {u.name}
                        </td>
                        <td className="py-3 px-3">{u.email}</td>
                        <td className="py-3 px-3">{u.phone}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-slate-100 text-slate-800">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">{formatDate(u.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS & REQUESTS */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Toàn bộ đơn đặt lịch trên sàn ({bookings.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Khách hàng</th>
                      <th className="py-3 px-3">Thợ nhận việc</th>
                      <th className="py-3 px-3">Dịch vụ</th>
                      <th className="py-3 px-3">Ngày hẹn</th>
                      <th className="py-3 px-3">Chi phí</th>
                      <th className="py-3 px-3">Tiến độ 4 bước</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {bookings.map((b: Booking) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold">{b.customerName}</td>
                        <td className="py-3 px-3">{b.technicianName}</td>
                        <td className="py-3 px-3">{b.serviceName}</td>
                        <td className="py-3 px-3">{formatDate(b.date)}</td>
                        <td className="py-3 px-3 font-extrabold text-blue-600">{formatCurrency(b.estimatedPrice)}</td>
                        <td className="py-3 px-3">
                          <Badge variant="primary" size="sm">
                            {b.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CÀI ĐẶT PHÍ & PHÂN BỔ CÔNG BẰNG */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-6">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Cấu hình tham số sàn & Thuật toán phân bổ đơn hàng công bằng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <Input
                  label="Tỷ lệ hoa hồng trên mỗi đơn hoàn thành (%):"
                  type="number"
                  value={commissionRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommissionRate(e.target.value)}
                  helperText="Hiện tại đang thu 10% trên giá trị đơn"
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
          )}

        </div>

      </div>

    </div>
  );
};

