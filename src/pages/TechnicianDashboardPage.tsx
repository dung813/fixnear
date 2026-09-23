import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { ServiceRequest, Booking, Review, Technician, ServiceCategory } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { AvailabilityToggle, WeeklyAvailabilityGrid } from '../components/technicians/AvailabilityPanel';
import { ServicesPricingEditor } from '../components/technicians/ServicesPricingEditor';
import { KycVerificationPanel } from '../components/technicians/KycVerificationPanel';
import { EarningsPanel } from '../components/technicians/EarningsPanel';
import { TechnicianQuotationModal } from '../components/technicians/TechnicianQuotationModal';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import { Modal } from '../components/common/Modal';
import {
  CalendarCheck,
  CheckCircle2,
  DollarSign,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  Phone,
  Sparkles,
  Zap,
  Lock,
  FileCheck,
  Truck,
  ClipboardCheck,
  X,
  Wallet,
  Wrench,
  ShieldCheck,
  Eye,
  Navigation,
  Search
} from 'lucide-react';

type TabKey = 'radar' | 'schedule' | 'services' | 'earnings' | 'reviews' | 'profile';
type ScheduleFilter = 'today' | 'tomorrow' | 'upcoming' | 'all';

// Small ticking badge showing time left before an unaccepted booking auto-reassigns.
const ResponseCountdown: React.FC<{ deadline: string }> = ({ deadline }) => {
  const [secondsLeft, setSecondsLeft] = useState(() => Math.max(0, Math.round((new Date(deadline).getTime() - Date.now()) / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(Math.max(0, Math.round((new Date(deadline).getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${secondsLeft <= 60 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-700'}`}>
      Tự động chuyển thợ khác sau: {m}:{s.toString().padStart(2, '0')}
    </span>
  );
};

const pathToTab = (pathname: string): TabKey => {
  if (pathname === '/technician/schedule') return 'schedule';
  if (pathname === '/technician/services') return 'services';
  if (pathname === '/technician/earnings') return 'earnings';
  if (pathname === '/technician/reviews') return 'reviews';
  if (pathname === '/technician/pro') return 'profile';
  return 'radar';
};

const TAB_TO_PATH: Record<TabKey, string> = {
  radar: '/technician/radar',
  schedule: '/technician/schedule',
  services: '/technician/services',
  earnings: '/technician/earnings',
  reviews: '/technician/reviews',
  profile: '/technician/pro',
};

export const TechnicianDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabKey>(pathToTab(location.pathname));
  const [scheduleFilter, setScheduleFilter] = useState<ScheduleFilter>('all');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [currentTech, setCurrentTech] = useState<Technician | undefined>(undefined);
  const [rejectedRequestIds, setRejectedRequestIds] = useState<string[]>([]);

  const [quotationBooking, setQuotationBooking] = useState<Booking | null>(null);
  const [confirmAcceptRequest, setConfirmAcceptRequest] = useState<ServiceRequest | null>(null);
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [surchargeAmount, setSurchargeAmount] = useState('');
  const [surchargeReason, setSurchargeReason] = useState('');

  useEffect(() => {
    setActiveTab(pathToTab(location.pathname));
  }, [location.pathname]);

  // Deep-link support: the Navbar's "Đơn đang thực hiện" button passes the
  // relevant booking id so it opens straight into that order's progress screen.
  useEffect(() => {
    const openBookingId = (location.state as { openBookingId?: string } | null)?.openBookingId;
    if (openBookingId && bookings.length > 0) {
      const target = bookings.find(b => b.id === openBookingId);
      if (target) {
        setSurchargeAmount('');
        setSurchargeReason('');
        setDetailBooking(target);
      }
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, bookings]);

  const loadData = () => {
    const allTechs = storageService.getTechnicians();
    const myTech = allTechs.find((t: Technician) => t.userId === user?.id || t.id === 'tech-1') || allTechs[0];
    setCurrentTech(myTech);

    const allReqs = storageService.getRequests();
    setRequests(allReqs.filter((r: ServiceRequest) => r.status === 'open'));

    const allBks = storageService.getBookings();
    setBookings(allBks.filter((b: Booking) => b.technicianId === myTech?.id || b.technicianId === 'tech-1'));

    if (myTech) {
      setReviews(storageService.getReviewsByTechnicianId(myTech.id));
    }

    setCategories(storageService.getCategories());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  // A short, stable pseudo-distance so the job feed can show "~X km" without a real geo backend.
  const getMockDistance = (id: string): string => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 97;
    return (1 + (hash % 12) / 2).toFixed(1);
  };

  const handleAcceptRequest = (req: ServiceRequest) => {
    setConfirmAcceptRequest(req);
  };

  const confirmAcceptJob = () => {
    if (!currentTech || !confirmAcceptRequest) return;
    const req = confirmAcceptRequest;

    storageService.updateRequest(req.id, {
      status: 'assigned',
      assignedTechnicianId: currentTech.id,
      assignedTechnicianName: currentTech.name,
    });

    storageService.addBooking({
      id: `bk-${Date.now()}`,
      customerId: req.customerId,
      customerName: req.customerName,
      customerPhone: req.customerPhone,
      customerAvatar: req.customerAvatar,
      customerAddress: `${req.address}, ${req.district}, ${req.city}`,
      technicianId: currentTech.id,
      technicianName: currentTech.name,
      technicianAvatar: currentTech.avatar,
      technicianPhone: currentTech.phone,
      technicianTitle: currentTech.title,
      categoryId: req.categoryId,
      serviceName: req.title,
      date: new Date().toISOString().slice(0, 10),
      timeSlot: req.preferredTime,
      address: req.address,
      city: req.city,
      district: req.district,
      notes: req.description,
      estimatedPrice: req.budget > 0 ? req.budget : currentTech.basePrice,
      paymentMethod: 'escrow',
      paymentStatus: 'holding_escrow',
      escrowAmount: req.budget > 0 ? req.budget : currentTech.basePrice,
      warrantyMonths: 6,
      status: 'accepted',
      createdAt: new Date().toISOString(),
    });

    success('Đã nhận việc!', 'Đơn hàng đã được chuyển sang mục "Lịch làm việc".');
    setConfirmAcceptRequest(null);
    navigate('/technician/schedule');
  };

  const handleRejectRequest = (reqId: string) => {
    setRejectedRequestIds(prev => [...prev, reqId]);
  };

  const handleChatWithCustomer = (bk: Booking) => {
    if (!currentTech) return;
    const conv = storageService.getOrCreateConversation(bk.customerId, bk.customerName, bk.customerAvatar, currentTech);
    navigate(`/chat?conv=${conv.id}`);
  };

  const openBookingDetail = (bk: Booking) => {
    setSurchargeAmount('');
    setSurchargeReason('');
    setDetailBooking(bk);
  };

  // Keep the open detail screen in sync with live status updates from `loadData`.
  useEffect(() => {
    if (!detailBooking) return;
    const fresh = bookings.find(b => b.id === detailBooking.id);
    if (fresh) setDetailBooking(fresh);
  }, [bookings]);

  const handleSubmitSurcharge = (bk: Booking) => {
    const amount = Number(surchargeAmount) || 0;
    if (amount <= 0 || !surchargeReason.trim()) {
      return;
    }
    storageService.addSurcharge(bk.id, {
      description: surchargeReason,
      reason: surchargeReason,
      amount,
    });
    success('Đã ghi nhận chi phí phát sinh!', 'Khoản này sẽ được cộng vào báo giá gửi khách khi nghiệm thu.');
    setSurchargeAmount('');
    setSurchargeReason('');
    loadData();
  };

  // Live-status button chain: pending -> accepted -> en_route -> surveying -> in_progress -> (quotation) -> quote_pending
  const handleUpdateStatus = (bookingId: string, newStatus: Booking['status']) => {
    storageService.updateBookingStatus(bookingId, newStatus);
    const statusLabel =
      newStatus === 'accepted' ? 'Đã nhận đơn' :
      newStatus === 'en_route' ? 'Đang di chuyển đến nơi' :
      newStatus === 'surveying' ? 'Đã đến nơi - Đang kiểm tra' :
      newStatus === 'in_progress' ? 'Đang tiến hành sửa chữa' : 'Đã cập nhật';
    success(`Cập nhật tiến độ: ${statusLabel}`);
  };

  // Pick another technician in the same category/city with no conflicting slot,
  // used both for an explicit decline and for the 5-minute auto-reassign timeout.
  const findNextTechnicianFor = (bk: Booking): Technician | undefined => {
    return storageService.getTechnicians().find(
      t => t.id !== bk.technicianId &&
        t.city === bk.city &&
        t.categories.includes(bk.categoryId) &&
        !storageService.hasSlotConflict(t.id, bk.date, bk.timeSlot)
    );
  };

  const handleDeclineBooking = (bk: Booking) => {
    const nextTech = findNextTechnicianFor(bk);
    if (nextTech) {
      storageService.reassignTechnician(bk.id, nextTech);
      success('Đã từ chối nhận đơn', `Yêu cầu được tự động chuyển sang thợ ${nextTech.name}.`);
    } else {
      storageService.updateBookingStatus(bk.id, 'cancelled');
      success('Đã từ chối nhận đơn', 'Hiện chưa tìm được thợ thay thế phù hợp, đơn đã được hủy.');
    }
    loadData();
  };

  const handleTechnicianCancelAccepted = (bk: Booking) => {
    storageService.technicianCancelAccepted(bk.id);
    const nextTech = findNextTechnicianFor(bk);
    if (nextTech) {
      storageService.reassignTechnician(bk.id, nextTech);
    }
    success(
      'Đã hủy nhận việc',
      'Khách đã được hoàn 100% tiền cọc. Đơn được ưu tiên đẩy cho thợ khác. Lưu ý: điểm uy tín của bạn đã bị trừ do hủy việc sau khi nhận.'
    );
    loadData();
  };

  // Auto-reassign any booking this tech hasn't accepted within 5 minutes of deposit.
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      bookings
        .filter(b => b.status === 'pending' && b.techResponseDeadline && new Date(b.techResponseDeadline).getTime() <= now)
        .forEach(b => {
          const nextTech = findNextTechnicianFor(b);
          if (nextTech) {
            storageService.reassignTechnician(b.id, nextTech);
          } else {
            storageService.updateBookingStatus(b.id, 'cancelled');
          }
        });
    }, 15000);
    return () => clearInterval(interval);
  }, [bookings]);

  const visibleRequests = requests.filter(r => !rejectedRequestIds.includes(r.id));

  const scheduleFiltered = bookings.filter(bk => {
    if (scheduleFilter === 'all') return true;
    const bkDate = new Date(bk.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    bkDate.setHours(0, 0, 0, 0);
    if (scheduleFilter === 'today') return bkDate.getTime() === today.getTime();
    if (scheduleFilter === 'tomorrow') return bkDate.getTime() === tomorrow.getTime();
    if (scheduleFilter === 'upcoming') return bkDate.getTime() > tomorrow.getTime();
    return true;
  });

  // Metrics Calculations
  const newRequestsCount = visibleRequests.length;
  const inProgressCount = bookings.filter((b: Booking) =>
    ['accepted', 'en_route', 'surveying', 'in_progress', 'quote_pending', 'payment_pending'].includes(b.status)
  ).length;
  const completedCount = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed').length;
  const totalRevenue = bookings
    .filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed')
    .reduce((sum: number, b: Booking) => sum + (b.finalPrice || b.estimatedPrice), 0);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'radar', label: `Yêu cầu mới (${visibleRequests.length})` },
    { key: 'schedule', label: `Lịch làm việc (${bookings.length})` },
    { key: 'services', label: 'Dịch vụ & Bảng giá' },
    { key: 'earnings', label: 'Thu nhập' },
    { key: 'reviews', label: `Đánh giá (${reviews.length})` },
    { key: 'profile', label: 'Hồ sơ & Xác minh' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Top Tech Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar src={currentTech?.avatar || user?.avatar} name={currentTech?.name || 'Thợ đối tác'} size="xl" isOnline={true} />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {currentTech?.isVerified && (
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Đã xác minh
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Xin chào, {currentTech?.name || 'Nguyễn Văn Minh'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Chuyên môn: <strong className="text-white">{currentTech?.title}</strong> ({currentTech?.district}, {currentTech?.city})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {currentTech && <AvailabilityToggle technician={currentTech} onChange={loadData} />}
          <Link to="/chat">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Tin nhắn khách hàng
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Yêu cầu mới"
          value={newRequestsCount}
          subtitle="Cần thợ quanh khu vực"
          icon={<Zap className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Đơn đang xử lý"
          value={inProgressCount}
          subtitle="Đang thực hiện"
          icon={<CalendarCheck className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Đơn hoàn thành"
          value={currentTech?.completedJobs ?? completedCount}
          subtitle="Tất cả thời gian"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Tổng thu nhập"
          value={formatCurrency(currentTech?.totalEarnings ?? totalRevenue)}
          subtitle="Đã quyết toán"
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Đánh giá sao"
          value={`${currentTech?.rating ?? 5.0} ★`}
          subtitle={`Từ ${currentTech?.reviewCount ?? reviews.length} lượt đánh giá`}
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

          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => navigate(TAB_TO_PATH[t.key])}
                className={`pb-3 shrink-0 transition relative ${
                  activeTab === t.key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: JOB FEED / RADAR */}
          {activeTab === 'radar' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Yêu cầu sửa chữa mới quanh {currentTech?.district || 'khu vực của bạn'}
                </h3>
                <p className="text-xs text-slate-500">
                  Bấm "Nhận việc" để liên hệ ngay với khách, hoặc "Từ chối" nếu không phù hợp.
                </p>
              </div>

              {visibleRequests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {visibleRequests.map((req: ServiceRequest) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:border-blue-400 transition space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                              {req.categoryName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {formatRelativeTime(req.createdAt)}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> ~{getMockDistance(req.id)} km
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-slate-900">{req.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{req.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block font-medium">Ngân sách dự kiến</span>
                          <span className="text-base font-extrabold text-blue-600">
                            {req.budget > 0 ? formatCurrency(req.budget) : 'Thương lượng'}
                          </span>
                        </div>
                      </div>

                      {req.photos.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto">
                          {req.photos.map((photo, i) => (
                            <img
                              key={i}
                              src={photo}
                              alt={`Ảnh khách gửi ${i + 1}`}
                              className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600" /> {req.district}, {req.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" /> Hẹn: {req.preferredTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRejectRequest(req.id)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" /> Từ chối
                          </button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(req)}
                            leftIcon={<FileCheck className="w-3.5 h-3.5" />}
                            className="font-bold text-xs"
                          >
                            Nhận việc
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
                  Hiện không có yêu cầu mới nào quanh khu vực của bạn.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCHEDULE / LIVE STATUS */}
          {activeTab === 'schedule' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Quản lý lịch hẹn & tiến độ công việc
                </h3>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {[
                    { label: 'Tất cả', val: 'all' as const },
                    { label: 'Hôm nay', val: 'today' as const },
                    { label: 'Ngày mai', val: 'tomorrow' as const },
                    { label: 'Đã lên lịch', val: 'upcoming' as const },
                  ].map(f => (
                    <button
                      key={f.val}
                      onClick={() => setScheduleFilter(f.val)}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        scheduleFilter === f.val ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {currentTech && <WeeklyAvailabilityGrid technician={currentTech} onChange={loadData} />}

              <div className="space-y-4">
                {scheduleFiltered.map((bk: Booking) => (
                  <div
                    key={bk.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Avatar src={bk.customerAvatar} name={bk.customerName} size="md" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{bk.customerName}</h4>
                          <p className="text-xs text-slate-500">SĐT: {bk.customerPhone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {bk.paymentMethod === 'escrow' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                            <Lock className="w-3 h-3 text-blue-600" /> Ký quỹ Escrow ({formatCurrency(bk.estimatedPrice)})
                          </span>
                        )}
                        <Badge
                          variant={
                            bk.status === 'cancelled' ? 'danger' :
                            ['accepted', 'en_route', 'surveying', 'in_progress'].includes(bk.status) ? 'success' :
                            bk.status === 'quote_pending' ? 'warning' :
                            bk.status === 'payment_pending' ? 'info' :
                            bk.status === 'completed' || bk.status === 'reviewed' ? 'primary' : 'warning'
                          }
                          size="md"
                          dot
                        >
                          {bk.status === 'pending' ? 'Chờ bạn nhận đơn'
                            : bk.status === 'accepted' ? 'Đã nhận - Chuẩn bị lên đường'
                            : bk.status === 'en_route' ? 'Đang di chuyển đến nơi'
                            : bk.status === 'surveying' ? 'Đã đến nơi - Đang kiểm tra'
                            : bk.status === 'in_progress' ? 'Đang sửa chữa'
                            : bk.status === 'quote_pending' ? 'Chờ khách duyệt báo giá'
                            : bk.status === 'payment_pending' ? 'Chờ khách thanh toán'
                            : bk.status === 'cancelled' ? 'Đã hủy'
                            : 'Đã hoàn thành'}
                        </Badge>
                        {bk.status === 'pending' && bk.techResponseDeadline && (
                          <ResponseCountdown deadline={bk.techResponseDeadline} />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-400 block">Dịch vụ:</span>
                        <span className="font-bold text-slate-900">{bk.serviceName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Ngày hẹn & Khung giờ:</span>
                        <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block">Địa chỉ nhà khách:</span>
                        <span>{bk.address}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Chi phí thỏa thuận:</span>
                        <span className="text-sm font-extrabold text-blue-600">
                          {formatCurrency(bk.quotation?.totalAmount || bk.finalPrice || bk.estimatedPrice)}
                        </span>
                      </div>
                    </div>

                    {bk.status === 'quote_pending' && (
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 font-semibold flex items-center gap-2">
                        <FileCheck className="w-4 h-4" /> Đang chờ khách hàng duyệt báo giá đã gửi.
                      </div>
                    )}
                    {bk.status === 'payment_pending' && (
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 font-semibold flex items-center gap-2">
                        <Wallet className="w-4 h-4" /> Báo giá đã được duyệt - Đang chờ khách thanh toán.
                      </div>
                    )}

                    {/* Live-Status Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${bk.customerPhone}`}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          Gọi khách
                        </a>
                        <button
                          type="button"
                          onClick={() => handleChatWithCustomer(bk)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          Chat
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {['accepted', 'en_route', 'surveying', 'in_progress'].includes(bk.status) && (
                          <button
                            type="button"
                            onClick={() => openBookingDetail(bk)}
                            className="px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-50 transition inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Xem chi tiết đơn
                          </button>
                        )}
                        {bk.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleDeclineBooking(bk)}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                            >
                              Từ chối
                            </button>
                            <Button size="sm" onClick={() => handleUpdateStatus(bk.id, 'accepted')}>
                              Xác nhận nhận đơn
                            </Button>
                          </>
                        )}
                        {bk.status === 'accepted' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleTechnicianCancelAccepted(bk)}
                              className="px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                            >
                              Hủy nhận việc
                            </button>
                            <Button
                              size="sm"
                              variant="outline"
                              leftIcon={<Truck className="w-3.5 h-3.5" />}
                              onClick={() => handleUpdateStatus(bk.id, 'en_route')}
                            >
                              Bắt đầu di chuyển
                            </Button>
                          </>
                        )}
                        {bk.status === 'en_route' && (
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<MapPin className="w-3.5 h-3.5" />}
                            onClick={() => handleUpdateStatus(bk.id, 'surveying')}
                          >
                            Đã đến nơi - Kiểm tra
                          </Button>
                        )}
                        {bk.status === 'surveying' && (
                          <Button
                            size="sm"
                            variant="success"
                            leftIcon={<Wrench className="w-3.5 h-3.5" />}
                            onClick={() => handleUpdateStatus(bk.id, 'in_progress')}
                          >
                            Bắt đầu sửa chữa
                          </Button>
                        )}
                        {bk.status === 'in_progress' && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            leftIcon={<ClipboardCheck className="w-3.5 h-3.5" />}
                            onClick={() => setQuotationBooking(bk)}
                          >
                            Lập báo giá & Nghiệm thu
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {scheduleFiltered.length === 0 && (
                  <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
                    Không có lịch hẹn nào trong mục này.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES & PRICING */}
          {activeTab === 'services' && currentTech && (
            <ServicesPricingEditor technician={currentTech} categories={categories} onSaved={loadData} />
          )}

          {/* TAB 4: EARNINGS */}
          {activeTab === 'earnings' && <EarningsPanel bookings={bookings} />}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Đánh giá và phản hồi từ khách hàng ({reviews.length})
              </h3>

              {reviews.length > 0 ? (
                <div className="space-y-4 divide-y divide-slate-100">
                  {reviews.map((rev: Review) => (
                    <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <Avatar src={rev.customerAvatar} name={rev.customerName} size="sm" />
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">{rev.customerName}</h5>
                            <p className="text-[10px] text-slate-400">{formatDate(rev.createdAt)}</p>
                          </div>
                        </div>
                        <RatingStars rating={rev.rating} size="sm" />
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Chưa có đánh giá nào.</p>
              )}
            </div>
          )}

          {/* TAB 6: PROFILE & KYC */}
          {activeTab === 'profile' && currentTech && (
            <div className="space-y-5">
              <KycVerificationPanel technician={currentTech} onChange={loadData} />

              <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <h3 className="text-lg font-extrabold">Gói Hội Viên FixNear Pro</h3>
                </div>
                <p className="text-xs text-amber-100 max-w-xl leading-relaxed">
                  Nâng cấp để ưu tiên hiển thị Top 1, nhận huy hiệu Pro và nhận việc sớm hơn 5 phút.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-amber-200 block">Mức phí trọn gói</span>
                    <span className="text-xl font-black">99.000đ / tháng</span>
                  </div>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                    Gia hạn / Nâng cấp Pro
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Combined Quotation Builder + Handover Modal */}
      <TechnicianQuotationModal
        isOpen={!!quotationBooking}
        onClose={() => setQuotationBooking(null)}
        booking={quotationBooking}
        onSuccess={loadData}
      />

      {/* Accept-Job Confirmation Modal */}
      <Modal
        isOpen={!!confirmAcceptRequest}
        onClose={() => setConfirmAcceptRequest(null)}
        title="Xác nhận nhận việc"
        description="Đơn hàng sẽ được chuyển vào mục Lịch làm việc / Đơn đang xử lý."
        maxWidth="sm"
      >
        {confirmAcceptRequest && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <p className="font-bold text-sm text-slate-900">{confirmAcceptRequest.title}</p>
              <p className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {confirmAcceptRequest.district}, {confirmAcceptRequest.city}
              </p>
              <p className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Hẹn: {confirmAcceptRequest.preferredTime}
              </p>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Bạn có chắc chắn muốn nhận đơn này? Hãy sắp xếp có mặt đúng khung giờ đã hẹn với khách.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setConfirmAcceptRequest(null)}>
                Hủy
              </Button>
              <Button size="sm" className="font-bold" leftIcon={<FileCheck className="w-3.5 h-3.5" />} onClick={confirmAcceptJob}>
                Xác nhận nhận việc
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* In-Progress Order Detail Screen */}
      <Modal
        isOpen={!!detailBooking}
        onClose={() => setDetailBooking(null)}
        title="Chi tiết đơn đang xử lý"
        description={detailBooking ? `${detailBooking.id} - ${detailBooking.customerName}` : undefined}
        maxWidth="lg"
      >
        {detailBooking && (
          <div className="space-y-5 text-xs">
            {/* 4-stage live status tracker */}
            <div className="flex items-center justify-between">
              {[
                { key: 'en_route', label: 'Đang di chuyển' },
                { key: 'surveying', label: 'Đã đến' },
                { key: 'in_progress', label: 'Đang kiểm tra' },
                { key: 'completed', label: 'Hoàn thành' },
              ].map((step, idx, arr) => {
                const order = ['accepted', 'en_route', 'surveying', 'in_progress', 'completed'];
                const currentIdx = order.indexOf(detailBooking.status === 'quote_pending' || detailBooking.status === 'payment_pending' || detailBooking.status === 'reviewed' ? 'completed' : detailBooking.status);
                const stepIdx = order.indexOf(step.key);
                const isDone = currentIdx > stepIdx || detailBooking.status === 'completed' || detailBooking.status === 'reviewed';
                const isActive = order[currentIdx] === step.key;
                return (
                  <React.Fragment key={step.key}>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] text-center font-semibold ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && <div className="h-0.5 flex-1 bg-slate-200 -mt-4" />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex justify-center">
              {detailBooking.status === 'accepted' && (
                <Button size="sm" leftIcon={<Navigation className="w-3.5 h-3.5" />} onClick={() => handleUpdateStatus(detailBooking.id, 'en_route')}>
                  Bắt đầu di chuyển
                </Button>
              )}
              {detailBooking.status === 'en_route' && (
                <Button size="sm" leftIcon={<MapPin className="w-3.5 h-3.5" />} onClick={() => handleUpdateStatus(detailBooking.id, 'surveying')}>
                  Đã đến nơi
                </Button>
              )}
              {detailBooking.status === 'surveying' && (
                <Button size="sm" variant="success" leftIcon={<Search className="w-3.5 h-3.5" />} onClick={() => handleUpdateStatus(detailBooking.id, 'in_progress')}>
                  Bắt đầu kiểm tra / sửa chữa
                </Button>
              )}
              {detailBooking.status === 'in_progress' && (
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  leftIcon={<ClipboardCheck className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setQuotationBooking(detailBooking);
                    setDetailBooking(null);
                  }}
                >
                  Hoàn thành & Lập báo giá
                </Button>
              )}
              {['quote_pending', 'payment_pending', 'completed', 'reviewed'].includes(detailBooking.status) && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành công đoạn sửa chữa
                </span>
              )}
            </div>

            {/* Order info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Dịch vụ:</span>
                <span className="font-bold text-slate-900">{detailBooking.serviceName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Khung giờ:</span>
                <span className="font-bold text-slate-900">{formatDate(detailBooking.date)} ({detailBooking.timeSlot})</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block">Địa chỉ:</span>
                <span>{detailBooking.address}</span>
              </div>
            </div>

            {/* Phát sinh pricing form */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block font-bold text-amber-700 uppercase tracking-wider">
                Ghi nhận chi phí phát sinh (nếu có)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <input
                  value={surchargeReason}
                  onChange={e => setSurchargeReason(e.target.value)}
                  placeholder="Lý do phát sinh (VD: thay tụ điện mới)"
                  className="sm:col-span-2 rounded-lg border border-amber-200 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="number"
                  value={surchargeAmount}
                  onChange={e => setSurchargeAmount(e.target.value)}
                  placeholder="Số tiền"
                  className="rounded-lg border border-amber-200 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>
              <Button size="sm" variant="outline" onClick={() => handleSubmitSurcharge(detailBooking)}>
                Thêm khoản phát sinh
              </Button>

              {detailBooking.quotation?.extraCharges && detailBooking.quotation.extraCharges.length > 0 && (
                <div className="divide-y divide-amber-100 border border-amber-100 rounded-xl overflow-hidden mt-2">
                  {detailBooking.quotation.extraCharges.map(ec => (
                    <div key={ec.id} className="flex items-center justify-between p-2.5 bg-amber-50">
                      <span className="text-slate-700">{ec.description}</span>
                      <span className="font-bold text-amber-700">{formatCurrency(ec.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <a
                href={`tel:${detailBooking.customerPhone}`}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Gọi khách
              </a>
              <button
                type="button"
                onClick={() => handleChatWithCustomer(detailBooking)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Nhắn tin ngay với khách
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
