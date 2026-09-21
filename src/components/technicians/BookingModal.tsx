import React, { useState } from 'react';
import { Technician, Booking, ServiceItem, PaymentMethod } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Avatar } from '../common/Avatar';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  technician: Technician | null;
  preSelectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  technician,
  preSelectedService,
}) => {
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || technician?.servicesOffered[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00 - 11:00');
  const [customerAddress, setCustomerAddress] = useState<string>(
    user?.address || 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội'
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    user?.phone || '0912 333 444'
  );
  const [customerName, setCustomerName] = useState<string>(
    user?.name || 'Hoàng Thùy Linh'
  );
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('escrow');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!technician) return null;

  const currentService = technician.servicesOffered.find(s => s.id === selectedServiceId) || technician.servicesOffered[0];
  const estimatedPrice = currentService ? currentService.price : technician.basePrice;

  const timeSlots = [
    '08:00 - 10:00 (Sáng sớm)',
    '10:00 - 12:00 (Trưa)',
    '14:00 - 16:00 (Đầu chiều)',
    '16:00 - 18:00 (Cuối chiều)',
    '19:00 - 21:00 (Buổi tối)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerAddress.trim() || !customerPhone.trim()) {
      error('Vui lòng điền đầy đủ địa chỉ và số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        customerId: user?.id || 'user-cust-1',
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        customerAddress: customerAddress.trim(),
        technicianId: technician.id,
        technicianName: technician.name,
        technicianAvatar: technician.avatar,
        technicianPhone: technician.phone,
        technicianTitle: technician.title,
        categoryId: technician.categories[0] || 'dien',
        serviceName: currentService?.name || 'Sửa chữa kiểm tra tận nhà',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        address: customerAddress.trim(),
        city: technician.city,
        district: technician.district,
        notes: notes.trim(),
        estimatedPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'escrow' ? 'holding_escrow' : 'cash_on_delivery',
        escrowAmount: paymentMethod === 'escrow' ? estimatedPrice : undefined,
        warrantyMonths: 6,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      storageService.addBooking(newBooking);
      setIsSubmitting(false);
      success(
        'Đặt lịch thành công!',
        paymentMethod === 'escrow' 
          ? 'Tiền cọc được FixNear Escrow tạm giữ an toàn. Thợ sẽ liên hệ bạn ngay.'
          : 'Thợ sẽ liên hệ xác nhận trong vòng 10-15 phút.'
      );
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đặt Lịch Hẹn Sửa Chữa Tại Nhà"
      description="Đặt hẹn nhanh chóng, được cam kết bảo hành và bảo hiểm an toàn bởi FixNear."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Selected Tech Card Preview */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <Avatar src={technician.avatar} name={technician.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900 truncate">{technician.name}</h4>
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            </div>
            <p className="text-slate-500 text-[11px] truncate">{technician.title}</p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>★ {technician.rating}</span>
              <span>• {technician.district} (~{technician.distanceKm} km)</span>
            </div>
          </div>
        </div>

        {/* Service Item Select */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Chọn hạng mục sửa chữa mong muốn:
          </label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {technician.servicesOffered.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} — {formatCurrency(service.price)} / {service.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Slot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              2. Ngày hẹn thợ đến:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Khung giờ mong muốn:
            </label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
            >
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address and Contact Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <Input
            label="4. Địa chỉ nhà chi tiết thợ cần đến *"
            value={customerAddress}
            onChange={(e: any) => setCustomerAddress(e.target.value)}
            placeholder="Số nhà, tên tòa nhà, số ngõ/đường..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Họ tên người nhận thợ *"
              value={customerName}
              onChange={(e: any) => setCustomerName(e.target.value)}
              required
            />

            <Input
              label="Số điện thoại liên hệ *"
              value={customerPhone}
              onChange={(e: any) => setCustomerPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Ghi chú thêm về sự cố (Nếu có):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: Cần mang thang nhôm, nhà ở tầng 3 không có thang máy..."
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Method Selector (Escrow vs Cash) */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <label className="block font-bold text-slate-700 uppercase tracking-wider">
            5. Phương thức thanh toán & Bảo vệ:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                paymentMethod === 'escrow'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'escrow'}
                onChange={() => setPaymentMethod('escrow')}
                className="mt-0.5"
              />
              <div>
                <div className="font-bold text-xs flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  Ký quỹ FixNear Escrow
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Tạm giữ tiền an toàn 100%. Tiền chỉ chuyển cho thợ sau khi bạn nghiệm thu hài lòng.
                </p>
              </div>
            </label>

            <label
              className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                paymentMethod === 'cash'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="mt-0.5"
              />
              <div>
                <div className="font-bold text-xs">Tiền mặt sau thi công</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Thanh toán trực tiếp cho thợ sau khi kiểm tra xong thiết bị.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Cost Summary Box */}
        <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 block">Chi phí tạm tính:</span>
            <span className="text-base font-black text-blue-700">
              {formatCurrency(estimatedPrice)}
            </span>
          </div>
          <div className="text-[11px] text-right text-slate-600">
            <span className="block font-semibold text-emerald-700">✓ Cam kết bảo hành 6 tháng</span>
            <span className="text-[10px] text-slate-400">Không thu phụ phí nếu chưa sửa</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            size="sm"
            isLoading={isSubmitting}
            className="font-bold px-6 shadow-brand"
          >
            Xác nhận đặt lịch hẹn
          </Button>
        </div>

      </form>
    </Modal>
  );
};

