import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { Booking } from '../types';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { QuotationModal } from '../components/orders/QuotationModal';
import { PaymentModal } from '../components/orders/PaymentModal';
import { ReviewModal } from '../components/technicians/ReviewModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  ChevronLeft,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Truck,
  ClipboardCheck,
  CalendarCheck,
  FileCheck,
  Wallet
} from 'lucide-react';

const STEPS = [
  { key: 'pending', label: 'Đã đặt lịch', icon: CalendarCheck, hint: 'Khách gửi yêu cầu' },
  { key: 'accepted', label: 'Thợ đã tiếp nhận', icon: CheckCircle2, hint: 'Thợ xác nhận lịch' },
  { key: 'surveying', label: 'Đang di chuyển', icon: Truck, hint: 'Thợ đang trên đường đến' },
  { key: 'in_progress', label: 'Đang kiểm tra & sửa chữa', icon: ClipboardCheck, hint: 'Thợ đang thi công tại nhà' },
  { key: 'completed', label: 'Hoàn thành & Nghiệm thu', icon: ShieldCheck, hint: 'Đã hoàn tất dịch vụ' },
] as const;

const getStepIndex = (status: Booking['status']): number => {
  switch (status) {
    case 'pending': return 0;
    case 'accepted': return 1;
    case 'surveying': return 2;
    case 'in_progress':
    case 'quote_pending':
    case 'payment_pending': return 3;
    case 'completed':
    case 'reviewed': return 4;
    case 'cancelled': return -1;
    default: return 0;
  }
};

const STATUS_LABELS: Record<Booking['status'], string> = {
  pending: 'Đã đặt lịch',
  accepted: 'Thợ đã tiếp nhận',
  surveying: 'Đang di chuyển',
  in_progress: 'Đang kiểm tra & sửa chữa',
  quote_pending: 'Chờ duyệt báo giá',
  payment_pending: 'Chờ thanh toán',
  completed: 'Hoàn thành & Nghiệm thu',
  reviewed: 'Hoàn thành & Nghiệm thu',
  cancelled: 'Đã hủy',
};

const FINAL_PAYMENT_LABELS: Record<NonNullable<Booking['finalPaymentMethod']>, string> = {
  momo: 'Ví MoMo',
  vnpay: 'VNPay',
  bank_transfer: 'Chuyển khoản ngân hàng',
  card: 'Thẻ tín dụng/ghi nợ',
};

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success } = useNotification();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [quotationOpen, setQuotationOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [hasAutoOpenedReview, setHasAutoOpenedReview] = useState(false);

  const loadBooking = () => {
    if (id) setBooking(storageService.getBookingById(id) ?? null);
  };

  useEffect(() => {
    loadBooking();
    window.addEventListener('fixnear_storage_update', loadBooking);
    return () => window.removeEventListener('fixnear_storage_update', loadBooking);
  }, [id]);

  // Auto-prompt for a review the first time this order shows up as completed
  useEffect(() => {
    if (!booking || hasAutoOpenedReview) return;
    if (booking.status !== 'completed') return;
    const alreadyReviewed = storageService.getReviews().some(r => r.bookingId === booking.id);
    if (!alreadyReviewed) {
      setReviewOpen(true);
    }
    setHasAutoOpenedReview(true);
  }, [booking, hasAutoOpenedReview]);

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy đơn hàng</h2>
        <p className="text-sm text-slate-500">Đơn hàng này có thể đã bị hủy hoặc không tồn tại.</p>
        <Link to="/my-bookings">
          <Button>Quay lại danh sách đơn hàng</Button>
        </Link>
      </div>
    );
  }

  const stepIndex = getStepIndex(booking.status);
  const isCancelled = booking.status === 'cancelled';

  const handleCancel = () => {
    if (!window.confirm('Bạn có chắc muốn hủy đơn hàng này không?')) return;
    storageService.updateBookingStatus(booking.id, 'cancelled');
    success('Đã hủy đơn hàng thành công.');
  };

  const handleChat = () => {
    const technician = storageService.getTechnicianById(booking.technicianId);
    if (!technician) return;
    const conv = storageService.getOrCreateConversation(
      user?.id || booking.customerId,
      user?.name || booking.customerName,
      user?.avatar || booking.customerAvatar,
      technician
    );
    navigate(`/chat?conv=${conv.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        to="/my-bookings"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
      >
        <ChevronLeft className="w-4 h-4" /> Quay lại danh sách đơn hàng
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Mã đơn hàng</span>
            <h1 className="text-lg font-extrabold text-slate-900">{booking.id}</h1>
          </div>
          <Badge
            variant={
              isCancelled
                ? 'danger'
                : booking.status === 'quote_pending'
                ? 'warning'
                : booking.status === 'payment_pending'
                ? 'info'
                : stepIndex >= 4
                ? 'primary'
                : stepIndex >= 1
                ? 'success'
                : 'warning'
            }
            size="md"
            dot
          >
            {STATUS_LABELS[booking.status]}
          </Badge>
        </div>
        <p className="text-xs text-slate-500">{booking.serviceName}</p>
      </div>

      {/* Progress Stepper */}
      {!isCancelled && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <div key={step.key} className="flex-1 flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400">{step.hint}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`hidden sm:block flex-1 h-0.5 mt-[-20px] ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {booking.status === 'surveying' && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-xs text-blue-800 font-semibold">
              <Truck className="w-4 h-4" />
              Thợ dự kiến có mặt sau khoảng 15-20 phút nữa.
            </div>
          )}

          {booking.status === 'quote_pending' && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                <FileCheck className="w-4 h-4 shrink-0" />
                Thợ đã gửi báo giá chi tiết, vui lòng xem và duyệt để tiếp tục sửa chữa.
              </div>
              <Button size="sm" onClick={() => setQuotationOpen(true)} className="font-bold shrink-0">
                Xem báo giá
              </Button>
            </div>
          )}

          {booking.status === 'payment_pending' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-blue-800 font-semibold">
                <Wallet className="w-4 h-4 shrink-0" />
                Báo giá đã được duyệt, vui lòng thanh toán để hoàn tất đơn hàng.
              </div>
              <Button size="sm" onClick={() => setPaymentOpen(true)} className="font-bold shrink-0">
                Thanh toán ngay
              </Button>
            </div>
          )}
        </div>
      )}

      {isCancelled && (
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex items-center gap-3 text-rose-700 text-sm font-semibold">
          <AlertTriangle className="w-5 h-5" />
          Đơn hàng này đã bị hủy.
        </div>
      )}

      {/* Technician Info */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <h3 className="font-bold text-sm text-slate-900">Thợ phụ trách</h3>
        <div className="flex items-center gap-3">
          <Avatar src={booking.technicianAvatar} name={booking.technicianName} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900">{booking.technicianName}</h4>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-slate-500">{booking.technicianTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <a
            href={`tel:${booking.technicianPhone}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            Gọi ngay: {booking.technicianPhone}
          </a>
          <button
            type="button"
            onClick={handleChat}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Nhắn tin trao đổi
          </button>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <h3 className="font-bold text-sm text-slate-900">Chi tiết đơn hàng</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium mb-0.5">Thời gian hẹn</span>
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(booking.date)} ({booking.timeSlot})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-0.5">Địa chỉ sửa chữa</span>
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {booking.address}
            </span>
          </div>
          {booking.notes && (
            <div className="sm:col-span-2">
              <span className="text-slate-400 block font-medium mb-0.5">Ghi chú sự cố</span>
              <span className="text-slate-700">{booking.notes}</span>
            </div>
          )}
          <div>
            <span className="text-slate-400 block font-medium mb-0.5">Chi phí</span>
            <span className="text-sm font-extrabold text-blue-600">
              {formatCurrency(booking.finalPrice || booking.quotation?.totalAmount || booking.estimatedPrice)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-0.5">Thanh toán</span>
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              {booking.finalPaymentMethod ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Đã thanh toán qua {FINAL_PAYMENT_LABELS[booking.finalPaymentMethod]}
                </>
              ) : (
                <>
                  {booking.paymentMethod === 'escrow' && <Lock className="w-3.5 h-3.5 text-blue-600" />}
                  {booking.paymentMethod === 'escrow'
                    ? (booking.paymentStatus === 'released' ? 'Đã thanh toán Escrow' : 'Ký quỹ Escrow (đang tạm giữ)')
                    : 'Tiền mặt sau khi hoàn thành'}
                </>
              )}
            </span>
          </div>
          {booking.invoiceId && (
            <div>
              <span className="text-slate-400 block font-medium mb-0.5">Mã hóa đơn điện tử</span>
              <span className="font-bold text-slate-900">{booking.invoiceId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {!isCancelled && booking.status === 'pending' && (
          <Button
            variant="outline"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            leftIcon={<AlertTriangle className="w-4 h-4" />}
            onClick={handleCancel}
          >
            Hủy đơn
          </Button>
        )}
        {(booking.status === 'completed' || booking.status === 'reviewed') &&
          !storageService.getReviews().some(r => r.bookingId === booking.id) && (
            <Button onClick={() => setReviewOpen(true)} className="font-bold">
              Đánh giá dịch vụ
            </Button>
        )}
      </div>

      {/* Quotation Approval Modal */}
      <QuotationModal
        isOpen={quotationOpen}
        onClose={() => setQuotationOpen(false)}
        booking={booking}
        onApproved={() => setPaymentOpen(true)}
      />

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        booking={booking}
      />

      {/* Review Modal (auto-opens once when order completes) */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        booking={booking}
      />
    </div>
  );
};
