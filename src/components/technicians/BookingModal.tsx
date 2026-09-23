import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Technician, Booking, ServiceItem, PaymentMethod, Address } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Avatar } from '../common/Avatar';
import { DepositModal } from '../orders/DepositModal';
import { formatCurrency } from '../../utils/formatters';
import {
  ShieldCheck,
  Clock,
  MapPin,
  Lock,
  AlertTriangle,
  Zap,
  CalendarClock,
  Upload,
  Video,
  ChevronLeft,
} from 'lucide-react';

const DEPOSIT_AMOUNT = 50000;

// The 6 fixed real-world appointment slots offered every day.
const FIXED_SLOTS = [
  '08:00 - 09:30',
  '09:30 - 11:00',
  '11:00 - 12:30',
  '14:00 - 15:30',
  '15:30 - 17:00',
  '17:30 - 19:00',
];

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
];

type BookingMode = 'urgent' | 'scheduled';

// "Cần thợ gấp" ETA: closer technicians arrive sooner, clamped to the 15-30' window.
const computeUrgentEta = (distanceKm: number): number =>
  Math.min(30, Math.max(15, Math.round(15 + distanceKm * 4)));

const buildDayOptions = (): { dateISO: string; label: string }[] => {
  const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateISO = d.toISOString().split('T')[0];
    const label = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : `${WEEKDAYS[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
    return { dateISO, label };
  });
};

const parseSlotStart = (slot: string): { h: number; m: number } => {
  const [start] = slot.split(' - ');
  const [h, m] = start.split(':').map(Number);
  return { h, m };
};

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
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingMode, setBookingMode] = useState<BookingMode | null>(null);
  const dayOptions = buildDayOptions();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || technician?.servicesOffered[0]?.id || ''
  );
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('new');
  const [customerAddress, setCustomerAddress] = useState<string>(
    user?.address || 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội'
  );
  const [directionNote, setDirectionNote] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.phone || '0912 333 444');
  const [customerName, setCustomerName] = useState<string>(user?.name || 'Hoàng Thu Trang');
  const [notes, setNotes] = useState<string>('');
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('escrow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slotConflict, setSlotConflict] = useState(false);
  const [suggestedTechs, setSuggestedTechs] = useState<Technician[]>([]);
  const [depositBooking, setDepositBooking] = useState<Booking | null>(null);

  // Reset the whole wizard each time it's opened for a (possibly new) technician.
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setBookingMode(null);
    setSelectedDayIdx(0);
    setSelectedTimeSlot('');
    setSlotConflict(false);
    setSuggestedTechs([]);
    setMediaPreviews([]);
  }, [isOpen, technician?.id]);

  useEffect(() => {
    setSlotConflict(false);
    setSuggestedTechs([]);
  }, [selectedDayIdx, selectedTimeSlot, technician?.id]);

  useEffect(() => {
    if (!isOpen || !user) return;
    const addrs = storageService.getAddresses(user.id);
    setSavedAddresses(addrs);
    const defaultAddr = addrs.find(a => a.isDefault) || addrs[0];
    if (defaultAddr) {
      setSelectedAddressId(defaultAddr.id);
      setCustomerAddress(defaultAddr.address);
    } else {
      setSelectedAddressId('new');
    }
  }, [isOpen, user]);

  if (!technician) return null;

  const currentService = technician.servicesOffered.find(s => s.id === selectedServiceId) || technician.servicesOffered[0];
  const estimatedPrice = currentService ? currentService.price : technician.basePrice;
  const urgentEta = computeUrgentEta(technician.distanceKm);

  const selectedDay = dayOptions[selectedDayIdx];
  const isToday = selectedDayIdx === 0;
  const now = new Date();

  const getSlotState = (slot: string): { disabled: boolean; label?: string } => {
    if (storageService.hasSlotConflict(technician.id, selectedDay.dateISO, slot)) {
      return { disabled: true, label: 'Đã kín lịch' };
    }
    if (isToday) {
      const { h, m } = parseSlotStart(slot);
      const slotStart = new Date();
      slotStart.setHours(h, m, 0, 0);
      if (slotStart.getTime() <= now.getTime()) {
        return { disabled: true, label: 'Đang bận' };
      }
    }
    return { disabled: false };
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const randomMedia = SAMPLE_MEDIA[Math.floor(Math.random() * SAMPLE_MEDIA.length)];
      setMediaPreviews(prev => [...prev, randomMedia]);
    }
  };

  const goToStep2 = () => {
    if (!bookingMode) {
      error('Vui lòng chọn hình thức đặt hẹn');
      return;
    }
    setStep(2);
  };

  const goToStep3 = () => {
    if (bookingMode === 'scheduled' && !selectedTimeSlot) {
      error('Vui lòng chọn một khung giờ còn trống');
      return;
    }
    setStep(3);
  };

  const finalTimeSlot = bookingMode === 'urgent' ? `Khẩn cấp - có mặt sau ~${urgentEta} phút` : selectedTimeSlot;
  const finalDate = bookingMode === 'urgent' ? dayOptions[0].dateISO : selectedDay.dateISO;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerAddress.trim() || !customerPhone.trim()) {
      error('Vui lòng điền đầy đủ địa chỉ và số điện thoại liên hệ');
      return;
    }

    // Double-booking guard (scheduled mode only — urgent requests bypass the fixed slot grid).
    if (bookingMode === 'scheduled' && storageService.hasSlotConflict(technician.id, finalDate, finalTimeSlot)) {
      const alternatives = storageService.getTechnicians().filter(
        t => t.id !== technician.id &&
          t.city === technician.city &&
          t.categories.some(c => technician.categories.includes(c)) &&
          !storageService.hasSlotConflict(t.id, finalDate, finalTimeSlot)
      ).slice(0, 3);
      setSuggestedTechs(alternatives);
      setSlotConflict(true);
      return;
    }

    setIsSubmitting(true);

    const finalAddress = directionNote.trim()
      ? `${customerAddress.trim()} (Chỉ đường: ${directionNote.trim()})`
      : customerAddress.trim();
    const finalNotes = notes.trim();

    setTimeout(() => {
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        customerId: user?.id || 'user-cust-1',
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        customerAddress: finalAddress,
        technicianId: technician.id,
        technicianName: technician.name,
        technicianAvatar: technician.avatar,
        technicianPhone: technician.phone,
        technicianTitle: technician.title,
        categoryId: technician.categories[0] || 'dien',
        serviceName: currentService?.name || 'Sửa chữa kiểm tra tận nhà',
        date: finalDate,
        timeSlot: finalTimeSlot,
        address: finalAddress,
        city: technician.city,
        district: technician.district,
        notes: finalNotes,
        photos: mediaPreviews,
        estimatedPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'escrow' ? 'holding_escrow' : 'cash_on_delivery',
        escrowAmount: paymentMethod === 'escrow' ? estimatedPrice : undefined,
        warrantyMonths: 6,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...(paymentMethod === 'escrow'
          ? {
              depositAmount: DEPOSIT_AMOUNT,
              depositPaid: false,
              holdExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
            }
          : {
              depositPaid: true,
              techResponseDeadline: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            }),
      };

      storageService.addBooking(newBooking);
      setIsSubmitting(false);

      if (paymentMethod === 'escrow') {
        // Hold the slot and require the QR deposit before the booking is finalized.
        setDepositBooking(newBooking);
      } else {
        success(
          `Đặt lịch thành công! Thợ ${technician.name} đã nhận lịch hẹn của bạn.`,
          'Thợ sẽ liên hệ xác nhận trong vòng 10-15 phút.'
        );
        onClose();
        navigate(`/my-bookings/${newBooking.id}`);
      }
    }, 600);
  };

  const StepDot: React.FC<{ n: 1 | 2 | 3; label: string }> = ({ n, label }) => (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
          step === n ? 'bg-blue-600 text-white' : step > n ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
        }`}
      >
        {n}
      </div>
      <span className={`text-[11px] font-semibold ${step >= n ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đặt Lịch Sửa Chữa Thông Minh"
      description="Chọn hình thức, khung giờ thực tế và đặt cọc giữ lịch chỉ trong vài bước."
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
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

        {/* Step indicator */}
        <div className="flex items-center justify-between px-1">
          <StepDot n={1} label="Hình thức" />
          <div className="flex-1 h-px bg-slate-200 mx-2" />
          <StepDot n={2} label="Thời gian" />
          <div className="flex-1 h-px bg-slate-200 mx-2" />
          <StepDot n={3} label="Thông tin" />
        </div>

        {/* STEP 1: Booking mode */}
        {step === 1 && (
          <div className="space-y-3">
            <label className="block font-bold text-slate-700 uppercase tracking-wider">
              Chọn hình thức đặt hẹn
            </label>
            <button
              type="button"
              onClick={() => setBookingMode('urgent')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition ${
                bookingMode === 'urgent' ? 'border-blue-600 bg-blue-50/70' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Cần thợ gấp (Có mặt sau 15-30 phút)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Dựa trên khoảng cách hiện tại (~{technician.distanceKm}km), thợ dự kiến có mặt sau khoảng{' '}
                  <strong className="text-amber-600">{urgentEta} phút</strong>.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setBookingMode('scheduled')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition ${
                bookingMode === 'scheduled' ? 'border-blue-600 bg-blue-50/70' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <CalendarClock className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Đặt lịch theo khung giờ</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Chọn ngày (hôm nay, ngày mai hoặc trong tuần) và một khung giờ cố định còn trống.
                </p>
              </div>
            </button>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 pt-1">
                Chọn hạng mục sửa chữa mong muốn
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

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Hủy
              </Button>
              <Button type="button" size="sm" className="font-bold px-6" onClick={goToStep2}>
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Real-time slots */}
        {step === 2 && (
          <div className="space-y-3">
            {bookingMode === 'urgent' ? (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3">
                <Zap className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-amber-800">Thợ sẽ có mặt sau khoảng {urgentEta} phút</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Yêu cầu khẩn cấp được ưu tiên gửi ngay đến {technician.name} sau khi bạn đặt cọc giữ chỗ.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <label className="block font-bold text-slate-700 uppercase tracking-wider">Chọn ngày</label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {dayOptions.map((d, idx) => (
                    <button
                      key={d.dateISO}
                      type="button"
                      onClick={() => {
                        setSelectedDayIdx(idx);
                        setSelectedTimeSlot('');
                      }}
                      className={`px-3 py-2 rounded-xl text-[11px] font-bold shrink-0 transition ${
                        selectedDayIdx === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                <label className="block font-bold text-slate-700 uppercase tracking-wider pt-1">
                  Chọn khung giờ còn trống
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FIXED_SLOTS.map(slot => {
                    const { disabled, label } = getSlotState(slot);
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          disabled
                            ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                            : isSelected
                            ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="block font-semibold">{slot}</span>
                        {disabled && <span className="block text-[10px] mt-0.5">{label}</span>}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" leftIcon={<ChevronLeft className="w-3.5 h-3.5" />} onClick={() => setStep(1)}>
                Quay lại
              </Button>
              <Button type="button" size="sm" className="font-bold px-6" onClick={goToStep3}>
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Issue details, address & payment */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Địa chỉ thợ cần đến *
              </label>

              {savedAddresses.length > 0 && (
                <div className="space-y-1.5">
                  {savedAddresses.map(addr => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                        selectedAddressId === addr.id
                          ? 'border-blue-600 bg-blue-50/70'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="bookingAddressChoice"
                        checked={selectedAddressId === addr.id}
                        onChange={() => {
                          setSelectedAddressId(addr.id);
                          setCustomerAddress(addr.address);
                        }}
                        className="mt-0.5"
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800">{addr.label}</span>
                        <p className="text-[11px] text-slate-500 truncate">{addr.address}, {addr.district}, {addr.city}</p>
                      </div>
                    </label>
                  ))}
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                      selectedAddressId === 'new'
                        ? 'border-blue-600 bg-blue-50/70'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bookingAddressChoice"
                      checked={selectedAddressId === 'new'}
                      onChange={() => {
                        setSelectedAddressId('new');
                        setCustomerAddress('');
                      }}
                    />
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Nhập địa chỉ khác
                    </span>
                  </label>
                </div>
              )}

              {(selectedAddressId === 'new' || savedAddresses.length === 0) && (
                <Input
                  value={customerAddress}
                  onChange={(e: any) => setCustomerAddress(e.target.value)}
                  placeholder="Số nhà, tên tòa nhà, số ngõ/đường, quận/huyện tại Hà Nội..."
                  required
                />
              )}

              <Input
                label="Ghi chú chỉ đường (nếu có)"
                value={directionNote}
                onChange={(e: any) => setDirectionNote(e.target.value)}
                placeholder="Ví dụ: Vào ngõ 12, nhà màu vàng cuối ngõ bên tay phải..."
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
                  Mô tả ngắn lỗi thiết bị (Nếu có):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ví dụ: Điều hòa chạy nhưng không mát, có tiếng kêu lạ..."
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ảnh / Video hiện trường (Nếu có)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {mediaPreviews.map((url, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-slate-200">
                      <img src={url} alt="Minh họa" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setMediaPreviews(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[9px]"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-2 cursor-pointer text-slate-500 hover:text-blue-600 transition aspect-video">
                    <Upload className="w-4 h-4 mb-0.5" />
                    <span className="text-[10px] font-medium text-center">Thêm ảnh/video</span>
                    <input type="file" accept="image/*,video/*" onChange={handleSimulateUpload} className="hidden" />
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                  <Video className="w-3 h-3" /> Giúp thợ chuẩn bị đúng dụng cụ và báo giá chính xác hơn.
                </p>
              </div>
            </div>

            {/* Payment Method Selector (Escrow vs Cash) */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Phương thức thanh toán & Bảo vệ
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
                      Đặt cọc giữ lịch qua QR
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Cọc {formatCurrency(DEPOSIT_AMOUNT)}, giữ chỗ 10 phút. Hoàn 100% nếu thợ hủy hoặc không nhận.
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

            {/* Booking summary */}
            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Hình thức:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  {bookingMode === 'urgent' ? <Zap className="w-3.5 h-3.5 text-amber-500" /> : <Clock className="w-3.5 h-3.5 text-blue-600" />}
                  {bookingMode === 'urgent' ? `Khẩn cấp - có mặt sau ~${urgentEta} phút` : `${dayOptions[selectedDayIdx].label} - ${selectedTimeSlot}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Chi phí tạm tính:</span>
                <span className="text-base font-black text-blue-700">{formatCurrency(estimatedPrice)}</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold">✓ Cam kết bảo hành 6 tháng — không thu phụ phí nếu chưa sửa</p>
            </div>

            {/* Slot Conflict Warning */}
            {slotConflict && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2.5">
                <p className="flex items-center gap-1.5 font-bold text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Khung giờ này vừa có người đặt
                </p>
                <p className="text-slate-600">
                  Vui lòng quay lại chọn khung giờ khác, hoặc đặt lịch với một trong các thợ lân cận đang rảnh dưới đây:
                </p>
                {suggestedTechs.length > 0 && (
                  <div className="grid grid-cols-1 gap-1.5">
                    {suggestedTechs.map(t => (
                      <div key={t.id} className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar src={t.avatar} name={t.name} size="sm" />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{t.name}</p>
                            <p className="text-[10px] text-slate-500">★ {t.rating} • ~{t.distanceKm}km</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            navigate(`/technicians/${t.id}`);
                          }}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0"
                        >
                          Xem hồ sơ
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" leftIcon={<ChevronLeft className="w-3.5 h-3.5" />} onClick={() => setStep(2)}>
                Quay lại
              </Button>
              <Button type="submit" size="sm" isLoading={isSubmitting} className="font-bold px-6 shadow-brand">
                Xác nhận đặt lịch hẹn
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* QR Deposit + 10-Minute Hold Countdown */}
      <DepositModal
        isOpen={!!depositBooking}
        booking={depositBooking}
        successTitle="Đặt lịch và đặt cọc thành công!"
        successMessage={`Thợ ${technician.name} đã nhận lịch hẹn của bạn.`}
        onConfirmed={() => {
          const confirmedId = depositBooking?.id;
          setDepositBooking(null);
          onClose();
          if (confirmedId) navigate(`/my-bookings/${confirmedId}`);
        }}
        onExpired={() => {
          setDepositBooking(null);
          onClose();
        }}
      />
    </Modal>
  );
};
