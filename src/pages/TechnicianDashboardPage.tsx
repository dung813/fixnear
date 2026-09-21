import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { ServiceRequest, Booking, Review, Technician, EQuote } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
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
  Send,
  Zap,
  Lock,
  FileCheck
} from 'lucide-react';

export const TechnicianDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'radar' | 'schedule' | 'reviews' | 'pro'>('radar');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentTech, setCurrentTech] = useState<Technician | undefined>(undefined);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [laborCost, setLaborCost] = useState('150000');
  const [materialCost, setMaterialCost] = useState('100000');
  const [estimatedHours, setEstimatedHours] = useState('1.5 - 2 giờ');
  const [warrantyMonths, setWarrantyMonths] = useState('6');
  const [quoteNotes, setQuoteNotes] = useState('Bao gồm kiểm tra, vệ sinh sạch sẽ và thay thế linh kiện chính hãng.');

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
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  // Handle 4-Step Booking Status Updates by Technician
  const handleUpdateStatus = (bookingId: string, newStatus: Booking['status']) => {
    storageService.updateBookingStatus(bookingId, newStatus);
    const statusLabel = 
      newStatus === 'accepted' ? 'Đã nhận đơn' :
      newStatus === 'surveying' ? 'Đang khảo sát tại nhà' :
      newStatus === 'in_progress' ? 'Đang tiến hành thi công' : 'Đã hoàn thành bàn giao';
    success(`Cập nhật tiến độ: ${statusLabel}`);
    loadData();
  };

  const handleOpenQuoteModal = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setLaborCost(req.budget > 0 ? String(Math.floor(req.budget * 0.6)) : '150000');
    setMaterialCost(req.budget > 0 ? String(Math.floor(req.budget * 0.4)) : '100000');
    setQuoteModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !currentTech) return;

    const total = (Number(laborCost) || 0) + (Number(materialCost) || 0);

    const newQuote: EQuote = {
      id: `quote-${Date.now()}`,
      requestId: selectedRequest.id,
      technicianId: currentTech.id,
      technicianName: currentTech.name,
      technicianAvatar: currentTech.avatar,
      technicianRating: currentTech.rating,
      technicianPhone: currentTech.phone,
      laborCost: Number(laborCost) || 0,
      materialCost: Number(materialCost) || 0,
      totalAmount: total,
      estimatedHours,
      warrantyMonths: Number(warrantyMonths) || 6,
      notes: quoteNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    storageService.addQuoteToRequest(selectedRequest.id, newQuote);

    // Also send structured E-Quote in chat
    const conv = storageService.getOrCreateConversation(
      selectedRequest.customerId,
      selectedRequest.customerName,
      selectedRequest.customerAvatar,
      currentTech
    );

    storageService.sendMessage({
      id: `msg-${Date.now()}`,
      conversationId: conv.id,
      senderId: currentTech.id,
      senderName: currentTech.name,
      senderRole: 'technician',
      recipientId: selectedRequest.customerId,
      text: `[BÁO GIÁ ĐIỆN TỬ]: Tổng ${formatCurrency(total)} (Công: ${formatCurrency(Number(laborCost))} + Linh kiện: ${formatCurrency(Number(materialCost))}) - Bảo hành ${warrantyMonths} tháng. Lời nhắn: ${quoteNotes}`,
      isOffer: true,
      offerAmount: total,
      quoteDetails: {
        laborCost: Number(laborCost) || 0,
        materialCost: Number(materialCost) || 0,
        total,
        warranty: Number(warrantyMonths) || 6,
      },
      timestamp: new Date().toISOString(),
      isRead: false,
    });

    setQuoteModalOpen(false);
    success('Đã gửi báo giá điện tử thành công!', 'Khách hàng có thể bấm chấp nhận để khóa lịch thi công.');
    navigate(`/chat?conv=${conv.id}`);
  };

  // Metrics Calculations
  const newRequestsCount = requests.length;
  const inProgressCount = bookings.filter((b: Booking) => b.status === 'accepted' || b.status === 'surveying' || b.status === 'in_progress').length;
  const completedCount = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed').length;
  const totalRevenue = bookings
    .filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed')
    .reduce((sum: number, b: Booking) => sum + (b.finalPrice || b.estimatedPrice), 0) + 12500000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Tech Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar src={currentTech?.avatar || user?.avatar} name={currentTech?.name || 'Thợ đối tác'} size="xl" isOnline={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                ★ Đối tác FixNear Pro
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                ● Đang bật nhận việc
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Xin chào, {currentTech?.name || 'Nguyễn Văn Minh'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Chuyên môn: <strong className="text-white">{currentTech?.title}</strong> ({currentTech?.district}, {currentTech?.city})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/chat">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Tin nhắn & Báo giá ({bookings.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Yêu cầu mới (Radar)"
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
          value={currentTech?.completedJobs || completedCount}
          subtitle="Tất cả thời gian"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Tổng thu nhập"
          value={formatCurrency(totalRevenue)}
          subtitle="Đã quyết toán"
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Đánh giá sao"
          value={`${currentTech?.rating || 4.9} ★`}
          subtitle={`Từ ${currentTech?.reviewCount || reviews.length} lượt đánh giá`}
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
              onClick={() => setActiveTab('radar')}
              className={`pb-3 transition relative ${
                activeTab === 'radar'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Yêu cầu gần bạn (Radar Live) ({requests.length})
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-3 transition relative ${
                activeTab === 'schedule'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lịch thi công 4 bước ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition relative ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đánh giá từ khách ({reviews.length})
            </button>

            <button
              onClick={() => setActiveTab('pro')}
              className={`pb-3 transition relative ${
                activeTab === 'pro'
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Gói FixNear Pro ★
            </button>
          </div>

          {/* TAB 1: RADAR YÊU CẦU GẦN BẠN */}
          {activeTab === 'radar' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Yêu cầu sửa chữa mới quanh {currentTech?.district || 'khu vực của bạn'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bấm "Gửi Báo Giá Điện Tử" để tạo bảng phân rã chi phí gửi đến khách hàng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {requests.map((req: ServiceRequest) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:border-blue-400 transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                            {req.categoryName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {formatRelativeTime(req.createdAt)}
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

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> {req.district}, {req.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" /> Hẹn: {req.preferredTime}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleOpenQuoteModal(req)}
                        leftIcon={<FileCheck className="w-3.5 h-3.5" />}
                        className="font-bold text-xs"
                      >
                        Gửi Báo Giá Điện Tử
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LỊCH THI CÔNG VỚI QUY TRÌNH 4 BƯỚC */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                Quản lý tiến độ đơn sửa chữa (4 Bước)
              </h3>

              <div className="space-y-4">
                {bookings.map((bk: Booking) => (
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
                            bk.status === 'accepted' || bk.status === 'surveying' || bk.status === 'in_progress'
                              ? 'success'
                              : bk.status === 'completed' || bk.status === 'reviewed'
                              ? 'primary'
                              : 'warning'
                          }
                          size="md"
                          dot
                        >
                          {bk.status === 'pending'
                            ? 'Bước 1: Chờ bạn nhận đơn'
                            : bk.status === 'accepted'
                            ? 'Bước 2: Đã nhận (Sắp đến khảo sát)'
                            : bk.status === 'surveying'
                            ? 'Bước 3: Đang khảo sát tại nhà'
                            : bk.status === 'in_progress'
                            ? 'Bước 4: Đang tiến hành thi công'
                            : 'Đã hoàn thành bàn giao'}
                        </Badge>
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
                      <div>
                        <span className="text-slate-400 block">Địa chỉ nhà khách:</span>
                        <span>{bk.address}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Chi phí thỏa thuận:</span>
                        <span className="text-sm font-extrabold text-blue-600">
                          {formatCurrency(bk.finalPrice || bk.estimatedPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Sequential Progress Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${bk.customerPhone}`}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          Gọi khách
                        </a>
                        <Link
                          to="/chat"
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          Chat
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        {bk.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(bk.id, 'accepted')}
                          >
                            Xác nhận nhận đơn
                          </Button>
                        )}
                        {bk.status === 'accepted' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(bk.id, 'surveying')}
                          >
                            Bắt đầu đến khảo sát
                          </Button>
                        )}
                        {bk.status === 'surveying' && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleUpdateStatus(bk.id, 'in_progress')}
                          >
                            Bắt đầu thi công sửa chữa
                          </Button>
                        )}
                        {bk.status === 'in_progress' && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            onClick={() => handleUpdateStatus(bk.id, 'completed')}
                          >
                            Nghiệm thu & Bàn giao
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Đánh giá và phản hồi từ khách hàng ({reviews.length})
              </h3>

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
            </div>
          )}

          {/* TAB 4: FIXNEAR PRO */}
          {activeTab === 'pro' && (
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-200" />
                <h3 className="text-2xl font-extrabold">Gói Hội Viên FixNear Pro</h3>
              </div>

              <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
                Nâng cấp tài khoản để gia tăng uy tín và nhận ưu tiên hiển thị hàng đầu trong kết quả tìm kiếm thợ khu vực của bạn.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Ưu tiên hiển thị Top 1</h4>
                  <p className="text-amber-100 text-[11px]">Hồ sơ thợ luôn xuất hiện ở trang đầu khi khách tìm kiếm.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Huy hiệu Thợ Pro Vàng</h4>
                  <p className="text-amber-100 text-[11px]">Gia tăng 40% tỷ lệ khách hàng tin tưởng và bấm đặt lịch.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Nhận việc sớm hơn 5 phút</h4>
                  <p className="text-amber-100 text-[11px]">Thông báo việc gấp gửi đến thợ Pro trước các thợ thông thường.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Miễn phí chiết khấu hoa hồng</h4>
                  <p className="text-amber-100 text-[11px]">Chỉ 99.000đ/tháng trọn gói, không trừ thêm phần trăm đơn.</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-200 block">Mức phí trọn gói</span>
                  <span className="text-2xl font-black">99.000đ / tháng</span>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                  Gia hạn / Nâng cấp Pro
                </Button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Structured E-Quote Modal */}
      <Modal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        title="Lập Báo Giá Điện Tử Chi Tiết"
        description={`Khách hàng: ${selectedRequest?.customerName} — ${selectedRequest?.title}`}
        maxWidth="md"
      >
        <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="1. Tiền công thợ (VNĐ): *"
              type="number"
              value={laborCost}
              onChange={(e: any) => setLaborCost(e.target.value)}
              required
            />
            <Input
              label="2. Tiền linh kiện thay thế (VNĐ):"
              type="number"
              value={materialCost}
              onChange={(e: any) => setMaterialCost(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="3. Thời gian dự kiến hoàn thành:"
              value={estimatedHours}
              onChange={(e: any) => setEstimatedHours(e.target.value)}
              placeholder="1 - 2 giờ"
              required
            />
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                4. Thời hạn bảo hành:
              </label>
              <select
                value={warrantyMonths}
                onChange={(e) => setWarrantyMonths(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="1">1 Tháng</option>
                <option value="3">3 Tháng</option>
                <option value="6">6 Tháng (Khuyên dùng)</option>
                <option value="12">12 Tháng</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              5. Diễn giải chi tiết phương án xử lý:
            </label>
            <textarea
              rows={3}
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              required
            />
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between font-bold">
            <span className="text-slate-600">Tổng chi phí báo khách:</span>
            <span className="text-sm text-blue-700">
              {formatCurrency((Number(laborCost) || 0) + (Number(materialCost) || 0))}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setQuoteModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" size="sm" leftIcon={<Send className="w-4 h-4" />}>
              Gửi báo giá điện tử
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

