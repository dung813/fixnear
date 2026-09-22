import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Technician, Review, ServiceItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { Avatar } from '../components/common/Avatar';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { BookingModal } from '../components/technicians/BookingModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  MessageSquare,
  Phone,
  Sparkles,
  Award,
  Image as ImageIcon,
  ChevronLeft,
  TrendingUp,
  Timer,
  Briefcase
} from 'lucide-react';

export const TechnicianDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const requireAuth = useRequireAuth();

  const [technician, setTechnician] = useState<Technician | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const found = storageService.getTechnicianById(id);
      if (found) {
        setTechnician(found);
        setReviews(storageService.getReviewsByTechnicianId(id).filter(r => !r.isHidden));
      }
    }
  }, [id]);

  if (!technician) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy thông tin thợ</h2>
        <p className="text-slate-500 text-sm">Hồ sơ này có thể đã thay đổi hoặc không tồn tại.</p>
        <Link to="/technicians">
          <Button>Quay lại danh bạ thợ</Button>
        </Link>
      </div>
    );
  }

  const handleStartChat = () => {
    const custId = user?.id || 'user-cust-1';
    const custName = user?.name || 'Khách hàng FixNear';
    const custAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80';
    const conv = storageService.getOrCreateConversation(custId, custName, custAvatar, technician);
    navigate(`/chat?conv=${conv.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <Link
          to="/technicians"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại danh sách thợ
        </Link>
      </div>

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar
              src={technician.avatar}
              name={technician.name}
              size="2xl"
              isOnline={technician.isOnline}
            />
            {technician.isPro && (
              <span className="absolute bottom-0 right-0 bg-amber-500 text-white p-1 rounded-full shadow-md" title="Đối tác FixNear Pro">
                <Sparkles className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {technician.name}
              </h1>
              {technician.isVerified && (
                <Badge variant="primary" size="md" className="gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Đã xác minh CCCD
                </Badge>
              )}
              {technician.isPro && (
                <Badge variant="pro" size="md">
                  ★ FixNear Pro
                </Badge>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-600">
              {technician.title}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={technician.rating} size="md" reviewCount={technician.reviewCount} />
              </div>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">
                {technician.completedJobs} đơn hoàn thành
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">
                {technician.experienceYears} năm kinh nghiệm
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{technician.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 font-semibold">Phản hồi ~{technician.responseTimeMinutes} phút</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Box */}
        <div className="w-full md:w-64 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Chi phí dịch vụ từ</span>
            <span className="text-xl font-extrabold text-blue-600">
              {formatCurrency(technician.basePrice)}
            </span>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full font-bold shadow-md shadow-blue-600/20"
              onClick={() => requireAuth(() => setBookingModalOpen(true))}
            >
              Đặt lịch hẹn ngay
            </Button>
            <Button
              variant="outline"
              className="w-full font-semibold"
              leftIcon={<MessageSquare className="w-4 h-4 text-blue-600" />}
              onClick={() => requireAuth(handleStartChat)}
            >
              Chat tư vấn
            </Button>
          </div>

          <div className="text-[10px] text-slate-500 text-center space-y-0.5 pt-1">
            <p>✓ Không phát sinh chi phí ẩn</p>
            <p>✓ Miễn phí hủy trước giờ hẹn</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Details + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: About / Bio */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Giới thiệu & Cam kết chất lượng
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {technician.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bảo hành dịch vụ từ 3 – 6 tháng</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Linh kiện thay thế chính hãng 100%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Có mặt đúng giờ hẹn đã xác nhận</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dọn dẹp sạch sẽ sau khi thi công</span>
              </div>
            </div>
          </div>

          {/* Section 1b: Activity Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card text-center space-y-1">
              <Briefcase className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="text-lg sm:text-xl font-extrabold text-slate-900">{technician.completedJobs}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Đơn hoàn thành</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card text-center space-y-1">
              <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="text-lg sm:text-xl font-extrabold text-slate-900">{technician.completionRate}%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Tỷ lệ hoàn thành</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card text-center space-y-1">
              <Timer className="w-5 h-5 text-amber-600 mx-auto" />
              <div className="text-lg sm:text-xl font-extrabold text-slate-900">~{technician.responseTimeMinutes}p</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Phản hồi trung bình</div>
            </div>
          </div>

          {/* Section 2: Service Catalog & Pricing Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Bảng giá dịch vụ cung cấp
              </h3>
              <span className="text-xs text-slate-400 font-medium">Đơn vị: VNĐ</span>
            </div>

            <div className="divide-y divide-slate-100">
              {technician.servicesOffered.map((service: ServiceItem) => (
                <div
                  key={service.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 p-2 rounded-xl transition"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{service.name}</h4>
                    <span className="text-xs text-slate-500">
                      Đơn vị tính: {service.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-sm font-extrabold text-blue-600">
                      {formatCurrency(service.price)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => requireAuth(() => setBookingModalOpen(true))}
                      className="text-xs"
                    >
                      Chọn
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Work Photos Gallery */}
          {technician.workPhotos && technician.workPhotos.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Hình ảnh thi công thực tế
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {technician.workPhotos.map((photo: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video bg-slate-100 shadow-inner group">
                    <img
                      src={photo}
                      alt={`Công trình ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Reviews & Rating Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Đánh giá từ khách hàng ({reviews.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  100% đánh giá từ khách hàng đã hoàn thành đơn trên FixNear
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">{technician.rating}</span>
                <RatingStars rating={technician.rating} size="sm" showNumber={false} />
              </div>
            </div>

            {/* Reviews List */}
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

                  <div className="inline-block text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                    Dịch vụ: {rev.serviceName}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Review Photos (real acceptance photos) */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {rev.photos.map((photo: string, i: number) => (
                        <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                          <img src={photo} alt={`Ảnh nghiệm thu ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technician Reply */}
                  {rev.technicianReply && (
                    <div className="ml-6 p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-blue-900 block text-[11px]">
                        Phản hồi từ thợ {technician.name}:
                      </span>
                      <p>{rev.technicianReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
            <h4 className="font-bold text-sm text-slate-900">
              Cam kết từ FixNear
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Xác thực danh tính</strong>
                  <span>Đã đối soát CCCD và lý lịch nghề nghiệp.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Bảo hiểm dịch vụ</strong>
                  <span>Hỗ trợ đền bù thiệt hại sự cố lên đến 5.000.000đ.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 text-center space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Bạn cần tư vấn thêm?
            </h4>
            <p className="text-xs text-slate-500">
              Gọi tổng đài hỗ trợ hoặc chat trực tiếp với đội ngũ FixNear.
            </p>
            <div className="pt-2">
              <a
                href="tel:19006868"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Phone className="w-4 h-4" /> 1900 6868 (Miễn cước)
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        technician={technician}
      />

    </div>
  );
};

