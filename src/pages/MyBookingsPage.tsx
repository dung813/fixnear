import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { Booking } from '../types';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ReviewModal } from '../components/technicians/ReviewModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  CalendarCheck,
  Phone,
  MessageSquare,
  Star,
  Calendar,
  ChevronRight
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);

  const handleChat = (bk: Booking) => {
    const technician = storageService.getTechnicianById(bk.technicianId);
    if (!technician) return;
    const conv = storageService.getOrCreateConversation(
      user?.id || bk.customerId,
      user?.name || bk.customerName,
      user?.avatar || bk.customerAvatar,
      technician
    );
    navigate(`/chat?conv=${conv.id}`);
  };

  const loadBookings = () => {
    const all = storageService.getBookings();
    if (role === 'technician') {
      setBookings(all.filter((b: Booking) => b.technicianId === 'tech-1' || b.technicianId === user?.id));
    } else {
      setBookings(all.filter((b: Booking) => b.customerId === user?.id || b.customerId === 'user-cust-1'));
    }
  };

  useEffect(() => {
    loadBookings();
    window.addEventListener('fixnear_storage_update', loadBookings);
    return () => window.removeEventListener('fixnear_storage_update', loadBookings);
  }, [user, role]);

  const filtered = bookings.filter((b: Booking) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress';
    if (filterStatus === 'completed') return b.status === 'completed' || b.status === 'reviewed';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-blue-600" />
            Lịch hẹn sửa chữa của tôi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi tiến độ, thời gian thợ đến và quản lý các đơn đặt lịch
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { label: 'Tất cả đơn', val: 'all' },
            { label: 'Đang diễn ra', val: 'active' },
            { label: 'Đã hoàn thành', val: 'completed' },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setFilterStatus(f.val)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === f.val
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((bk: Booking) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={role === 'technician' ? bk.customerAvatar : bk.technicianAvatar}
                    name={role === 'technician' ? bk.customerName : bk.technicianName}
                    size="md"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {role === 'technician' ? bk.customerName : bk.technicianName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {role === 'technician' ? `SĐT: ${bk.customerPhone}` : bk.technicianTitle}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    bk.status === 'cancelled'
                      ? 'danger'
                      : bk.status === 'accepted' || bk.status === 'en_route' || bk.status === 'in_progress' || bk.status === 'surveying'
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
                    ? 'Chờ xác nhận'
                    : bk.status === 'accepted'
                    ? 'Đã chốt lịch'
                    : bk.status === 'en_route'
                    ? 'Thợ đang di chuyển'
                    : bk.status === 'surveying'
                    ? 'Thợ đang kiểm tra'
                    : bk.status === 'in_progress'
                    ? 'Đang thực hiện'
                    : bk.status === 'quote_pending'
                    ? 'Chờ duyệt báo giá'
                    : bk.status === 'payment_pending'
                    ? 'Chờ thanh toán'
                    : bk.status === 'completed'
                    ? 'Hoàn thành'
                    : bk.status === 'cancelled'
                    ? 'Đã hủy'
                    : 'Đã đánh giá'}
                </Badge>
              </div>

              {/* Service & Time Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block font-medium">Dịch vụ sửa:</span>
                  <span className="font-bold text-slate-900">{bk.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Thời gian:</span>
                  <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Địa điểm:</span>
                  <span className="truncate block">{bk.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Chi phí ước tính:</span>
                  <span className="text-sm font-extrabold text-blue-600">
                    {formatCurrency(bk.estimatedPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {role === 'customer' && bk.paymentMethod === 'escrow' && !bk.depositPaid && bk.status === 'pending' ? (
                    <Link
                      to={`/my-bookings/${bk.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-700 hover:bg-amber-100 transition"
                    >
                      Đặt cọc để xem SĐT thợ
                    </Link>
                  ) : (
                    <a
                      href={`tel:${role === 'technician' ? bk.customerPhone : bk.technicianPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      Gọi {role === 'technician' ? bk.customerPhone : bk.technicianPhone}
                    </a>
                  )}
                  {role === 'customer' ? (
                    <button
                      type="button"
                      onClick={() => handleChat(bk)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      Chat trực tiếp
                    </button>
                  ) : (
                    <Link
                      to="/chat"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      Chat trực tiếp
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {role === 'customer' && bk.status === 'completed' && (
                    <Button
                      size="sm"
                      onClick={() => setSelectedBookingForReview(bk)}
                      leftIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
                    >
                      Đánh giá thợ
                    </Button>
                  )}
                  {role === 'customer' && (
                    <Link
                      to={`/my-bookings/${bk.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      Theo dõi tiến độ <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">Không có lịch hẹn nào</h3>
          <p className="text-xs text-slate-500">Các cuộc hẹn sửa chữa được xác nhận sẽ xuất hiện tại đây.</p>
          <Link to="/technicians">
            <Button size="sm">Tìm thợ đặt lịch ngay</Button>
          </Link>
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={!!selectedBookingForReview}
        onClose={() => setSelectedBookingForReview(null)}
        booking={selectedBookingForReview}
        onSuccess={() => loadBookings()}
      />

    </div>
  );
};

