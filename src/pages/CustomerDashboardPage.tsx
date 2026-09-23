import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { storageService } from '../services/storageService';
import { ServiceRequest, Booking, Review, Technician } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { ReviewModal } from '../components/technicians/ReviewModal';
import { DisputeModal } from '../components/technicians/DisputeModal';
import { SmartMatchingModal } from '../components/requests/SmartMatchingModal';
import { CreateRequestModal } from '../components/requests/CreateRequestModal';
import { QuotationModal } from '../components/orders/QuotationModal';
import { AddressBook } from '../components/account/AddressBook';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import {
  ClipboardList,
  CalendarCheck,
  CheckCircle2,
  Star,
  PlusCircle,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Lock,
  AlertTriangle,
  Sparkles,
  Pencil,
  XCircle,
  History,
  FileCheck
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();

  const [activeTab, setActiveTab] = useState<'requests' | 'bookings' | 'history' | 'profile'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allTechs, setAllTechs] = useState<Technician[]>([]);

  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [selectedBookingForDispute, setSelectedBookingForDispute] = useState<Booking | null>(null);
  const [matchingRequest, setMatchingRequest] = useState<ServiceRequest | null>(null);
  const [createRequestOpen, setCreateRequestOpen] = useState(false);
  const [editRequestTarget, setEditRequestTarget] = useState<ServiceRequest | null>(null);
  const [cancelRequestTarget, setCancelRequestTarget] = useState<ServiceRequest | null>(null);
  const [quotationBooking, setQuotationBooking] = useState<Booking | null>(null);

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const loadData = () => {
    const allRequests = storageService.getRequests();
    const allBookings = storageService.getBookings();
    const allReviews = storageService.getReviews();
    setAllTechs(storageService.getTechnicians());

    setRequests(allRequests.filter((r: ServiceRequest) => r.customerId === user?.id || r.customerId === 'user-cust-1'));
    setBookings(allBookings.filter((b: Booking) => b.customerId === user?.id || b.customerId === 'user-cust-1'));
    setReviews(allReviews.filter((r: Review) => r.customerId === user?.id || r.customerId === 'user-cust-1'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  const isNewAccount = !!user && (Date.now() - new Date(user.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 7;

  const activeRequestsCount = requests.filter((r: ServiceRequest) => r.status === 'open' || r.status === 'assigned').length;
  const pendingBookingsCount = bookings.filter((b: Booking) => b.status === 'pending' || b.status === 'accepted' || b.status === 'surveying' || b.status === 'in_progress').length;
  const completedBookingsCount = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed').length;

  const activeBookings = bookings.filter((b: Booking) => b.status !== 'completed' && b.status !== 'reviewed');
  const historyBookings = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed');

  const handleConfirmCancelRequest = () => {
    if (!cancelRequestTarget) return;
    storageService.updateRequest(cancelRequestTarget.id, { status: 'cancelled' });
    setCancelRequestTarget(null);
    loadData();
  };

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    alert('Cập nhật thông tin thành công!');
  };

  const getStepProgress = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'accepted': return 2;
      case 'en_route':
      case 'surveying': return 3;
      case 'in_progress':
      case 'quote_pending':
      case 'payment_pending': return 4;
      case 'completed':
      case 'reviewed': return 5;
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar src={user?.avatar} name={user?.name || 'Khách hàng'} size="xl" isOnline={true} />
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${isNewAccount ? 'text-emerald-300' : 'text-blue-300'}`}>
              {isNewAccount ? 'Tài khoản vừa được tạo' : 'Khách hàng thân thiết'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Xin chào, {user?.name || 'Người dùng mới'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Khu vực hoạt động: <strong className="text-white">{user?.district}, {user?.city}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            onClick={() => requireAuth(() => setCreateRequestOpen(true))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30 text-xs sm:text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Đăng yêu cầu sửa mới
          </Button>
          <Link to="/technicians">
            <Button variant="secondary" size="md" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm">
              Tìm thợ quanh đây
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Yêu cầu đang xử lý"
          value={activeRequestsCount}
          subtitle="Đang chờ thợ báo giá"
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Lịch hẹn sắp tới"
          value={pendingBookingsCount}
          subtitle="Đã xác nhận & đang sửa"
          icon={<CalendarCheck className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Đơn đã hoàn thành"
          value={completedBookingsCount}
          subtitle="Dịch vụ đã hoàn tất"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Đánh giá đã viết"
          value={reviews.length}
          subtitle="Góp ý chất lượng thợ"
          icon={<Star className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-3 transition relative ${
                activeTab === 'requests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Yêu cầu đã đăng ({requests.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 transition relative ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lịch sửa chữa ({activeBookings.length})
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 transition relative ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lịch sử & Bảo hành ({historyBookings.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 transition relative ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thông tin tài khoản
            </button>
          </div>

          {/* TAB 1: YÊU CẦU ĐÃ ĐĂNG */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Các yêu cầu sửa chữa đang hoạt động
                </h3>
                <button
                  type="button"
                  onClick={() => requireAuth(() => setCreateRequestOpen(true))}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  + Đăng việc mới
                </button>
              </div>

              {requests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {requests.map((req: ServiceRequest) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                              {req.categoryName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Đăng {formatRelativeTime(req.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-slate-900">{req.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{req.description}</p>
                        </div>

                        <Badge
                          variant={
                            req.status === 'cancelled' ? 'danger' :
                            req.status === 'open' ? 'success' :
                            req.status === 'completed' ? 'primary' : 'warning'
                          }
                          size="md"
                          dot
                        >
                          {req.status === 'cancelled' ? 'Đã hủy' : req.status === 'open' ? 'Đang tìm thợ' : req.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                        </Badge>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {req.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {req.preferredTime}
                          </span>
                        </div>

                        <Link to="/chat">
                          <Button size="sm" variant="outline" className="text-xs">
                            Xem tin nhắn báo giá ({req.offersCount || 2})
                          </Button>
                        </Link>
                      </div>

                      {req.status === 'open' && (
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => setMatchingRequest(req)}
                            className="font-bold text-xs"
                            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                          >
                            Xem danh sách thợ đề xuất (3 thợ)
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            leftIcon={<Pencil className="w-3.5 h-3.5" />}
                            onClick={() => setEditRequestTarget(req)}
                          >
                            Chỉnh sửa yêu cầu
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                            leftIcon={<XCircle className="w-3.5 h-3.5" />}
                            onClick={() => setCancelRequestTarget(req)}
                          >
                            Hủy đơn
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
                  <p>Bạn chưa đăng yêu cầu sửa chữa nào.</p>
                  <Button size="sm" onClick={() => requireAuth(() => setCreateRequestOpen(true))}>
                    Đăng yêu cầu đầu tiên ngay
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LỊCH SỬA CHỮA VỚI 4-STEP PROGRESS TRACKER */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Lịch hẹn & Theo dõi tiến trình 4 bước
                </h3>
              </div>

              {activeBookings.length > 0 ? (
                <div className="space-y-5">
                  {activeBookings.map((bk: Booking) => {
                    const stepNum = getStepProgress(bk.status);

                    return (
                      <div
                        key={bk.id}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <Avatar src={bk.technicianAvatar} name={bk.technicianName} size="md" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-sm text-slate-900">{bk.technicianName}</h4>
                                <ShieldCheck className="w-4 h-4 text-blue-600" />
                              </div>
                              <p className="text-xs text-slate-500">{bk.technicianTitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {bk.paymentMethod === 'escrow' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                                <Lock className="w-3 h-3 text-blue-600" />
                                {bk.paymentStatus === 'released' ? 'Đã thanh toán Escrow' : 'Ký quỹ Escrow (Đang tạm giữ)'}
                              </span>
                            )}
                            <Badge
                              variant={
                                bk.status === 'cancelled'
                                  ? 'danger'
                                  : bk.status === 'in_progress' || bk.status === 'en_route' || bk.status === 'surveying' || bk.status === 'accepted'
                                  ? 'success'
                                  : bk.status === 'quote_pending'
                                  ? 'warning'
                                  : bk.status === 'payment_pending'
                                  ? 'info'
                                  : bk.status === 'completed'
                                  ? 'info'
                                  : bk.status === 'reviewed'
                                  ? 'primary'
                                  : 'warning'
                              }
                              size="md"
                              dot
                            >
                              {bk.status === 'pending'
                                ? '1. Chờ xác nhận'
                                : bk.status === 'accepted'
                                ? '2. Đã xác nhận'
                                : bk.status === 'en_route'
                                ? '3. Thợ đang di chuyển'
                                : bk.status === 'surveying'
                                ? '3. Đang khảo sát'
                                : bk.status === 'in_progress'
                                ? '4. Đang thi công'
                                : bk.status === 'quote_pending'
                                ? 'Thợ đã gửi báo giá - Cần bạn duyệt'
                                : bk.status === 'payment_pending'
                                ? 'Chờ thanh toán'
                                : bk.status === 'completed'
                                ? '5. Hoàn thành (Chờ nghiệm thu)'
                                : bk.status === 'cancelled'
                                ? 'Đã hủy'
                                : 'Đã nghiệm thu & Đánh giá'}
                            </Badge>
                          </div>
                        </div>

                        {/* Visual 4-Step Progress Bar */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                            {[
                              { step: 1, label: 'Xác nhận đơn' },
                              { step: 2, label: 'Khảo sát tại nhà' },
                              { step: 3, label: 'Đang thi công' },
                              { step: 4, label: 'Nghiệm thu' },
                            ].map((s) => {
                              const isCurrent = (stepNum === s.step + 1) || (s.step === 4 && stepNum >= 5);
                              const isDone = stepNum > s.step + 1 || (s.step === 4 && stepNum >= 5);
                              return (
                                <div key={s.step} className="space-y-1">
                                  <div className={`h-1.5 rounded-full transition-all ${
                                    isDone || isCurrent ? 'bg-blue-600' : 'bg-slate-200'
                                  }`} />
                                  <span className={isDone || isCurrent ? 'text-blue-700 font-bold' : 'text-slate-400'}>
                                    {s.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                          <div>
                            <span className="text-slate-400 block font-medium">Hạng mục sửa:</span>
                            <span className="font-bold text-slate-900">{bk.serviceName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Thời gian hẹn:</span>
                            <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Địa chỉ làm việc:</span>
                            <span>{bk.address}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Chi phí:</span>
                            <span className="text-sm font-extrabold text-blue-600">
                              {formatCurrency(bk.finalPrice || bk.estimatedPrice)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${bk.technicianPhone}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              Gọi: {bk.technicianPhone}
                            </a>
                            <Link
                              to="/chat"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                              Chat với thợ
                            </Link>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBookingForDispute(bk)}
                              className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                              leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
                            >
                              Khiếu nại / Hoàn tiền
                            </Button>

                            {bk.status === 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => setSelectedBookingForReview(bk)}
                                leftIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
                              >
                                Nghiệm thu & Viết đánh giá
                              </Button>
                            )}
                            {bk.status === 'quote_pending' ? (
                              <Button
                                size="sm"
                                className="text-xs font-bold"
                                leftIcon={<FileCheck className="w-3.5 h-3.5" />}
                                onClick={() => setQuotationBooking(bk)}
                              >
                                Xem báo giá
                              </Button>
                            ) : (
                              <Link to={`/my-bookings/${bk.id}`}>
                                <Button size="sm" variant="outline" className="text-xs">
                                  {bk.status === 'payment_pending' ? 'Thanh toán ngay' : 'Theo dõi tiến độ'}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                  Chưa có lịch hẹn nào. Hãy tìm thợ và bấm Đặt lịch!
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LỊCH SỬ & BẢO HÀNH */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-600" />
                  Đơn đã hoàn thành & Phiếu bảo hành
                </h3>
                <Link to="/order-history" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                  Xem chi tiết & Gửi bảo hành
                </Link>
              </div>

              {historyBookings.length > 0 ? (
                <div className="space-y-4">
                  {historyBookings.map((bk: Booking) => (
                    <div key={bk.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <Avatar src={bk.technicianAvatar} name={bk.technicianName} size="md" />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{bk.technicianName}</h4>
                            <p className="text-xs text-slate-500">{bk.serviceName}</p>
                          </div>
                        </div>
                        <Badge variant="primary" size="md" dot>
                          Đã hoàn thành
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                        <div>
                          <span className="text-slate-400 block font-medium">Ngày sửa:</span>
                          <span className="font-bold text-slate-900">{formatDate(bk.date)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Số tiền:</span>
                          <span className="font-bold text-blue-600">{formatCurrency(bk.finalPrice || bk.estimatedPrice)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Bảo hành:</span>
                          <span className="font-bold text-slate-900">{bk.warrantyMonths} tháng</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex justify-end">
                        <Link to="/order-history">
                          <Button size="sm" variant="outline" className="text-xs">
                            Xem phiếu bảo hành
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                  Chưa có đơn hoàn thành nào.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                  Cập nhật thông tin cá nhân
                </h3>

                <div className="flex items-center gap-4">
                  <Avatar src={user?.avatar} name={user?.name || 'Người dùng'} size="xl" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-slate-500">{user?.email}</p>
                    <button
                      type="button"
                      onClick={() => {
                        updateProfile({
                          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=2563eb&color=fff&bold=true&_=${Date.now()}`,
                        });
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 mt-1"
                    >
                      Đổi ảnh đại diện
                    </button>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 max-w-lg pt-2">
                  <Input
                    label="Họ và tên"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Số điện thoại"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    required
                  />
                  <Input
                    label="Địa chỉ mặc định"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                  />
                  <Button type="submit">Lưu thông tin</Button>
                </form>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                  Danh sách địa chỉ đã lưu
                </h3>
                <AddressBook />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Create / Edit Request Modal */}
      <CreateRequestModal
        isOpen={createRequestOpen || !!editRequestTarget}
        onClose={() => {
          setCreateRequestOpen(false);
          setEditRequestTarget(null);
        }}
        editRequest={editRequestTarget}
      />

      {/* Cancel Request Confirmation */}
      <Modal
        isOpen={!!cancelRequestTarget}
        onClose={() => setCancelRequestTarget(null)}
        title="Hủy yêu cầu sửa chữa"
        description="Bạn có chắc chắn muốn hủy yêu cầu này? Các thợ đang xem sẽ không thể báo giá nữa."
        maxWidth="sm"
      >
        {cancelRequestTarget && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-sm text-slate-900">{cancelRequestTarget.title}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setCancelRequestTarget(null)}>
                Đóng
              </Button>
              <Button
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                onClick={handleConfirmCancelRequest}
              >
                Xác nhận hủy đơn
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Quotation Approval & Deposit Modal */}
      <QuotationModal
        isOpen={!!quotationBooking}
        onClose={() => setQuotationBooking(null)}
        booking={quotationBooking}
        onApproved={() => loadData()}
        onRejected={() => loadData()}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={!!selectedBookingForReview}
        onClose={() => setSelectedBookingForReview(null)}
        booking={selectedBookingForReview}
        onSuccess={() => loadData()}
      />

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={!!selectedBookingForDispute}
        onClose={() => setSelectedBookingForDispute(null)}
        booking={selectedBookingForDispute}
        onSuccess={() => loadData()}
      />

      {/* Smart Matching Modal */}
      <SmartMatchingModal
        isOpen={!!matchingRequest}
        onClose={() => setMatchingRequest(null)}
        request={matchingRequest}
        allTechnicians={allTechs}
        onSelectTech={t => navigate(`/technicians/${t.id}`)}
        onChatTech={t => requireAuth(() => {
          const conv = storageService.getOrCreateConversation(user?.id || 'user-cust-1', user?.name || 'Người dùng mới', '', t);
          navigate(`/chat?conv=${conv.id}`);
        })}
      />

    </div>
  );
};

