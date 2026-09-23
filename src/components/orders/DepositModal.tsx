import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface DepositModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onConfirmed: () => void;
  onExpired: () => void;
}

const HOLD_SECONDS = 10 * 60;

const formatCountdown = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// Mandatory QR deposit step shown right after a booking is created: the slot is
// only locked in — and the technician's phone revealed — once this is confirmed.
// If the 10-minute hold expires unpaid, the booking is auto-cancelled and the
// slot is released back for other customers.
export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, booking, onConfirmed, onExpired }) => {
  const { success, info } = useNotification();
  const [secondsLeft, setSecondsLeft] = useState(HOLD_SECONDS);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isOpen || !booking) return;
    const deadline = booking.holdExpiresAt ? new Date(booking.holdExpiresAt).getTime() : Date.now() + HOLD_SECONDS * 1000;
    setSecondsLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)));

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        storageService.expireUnpaidHold(booking.id);
        info('Hết thời gian giữ chỗ', 'Đơn đã tự động hủy do không hoàn tất đặt cọc trong 10 phút.');
        onExpired();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, booking?.id]);

  if (!booking) return null;

  const depositAmount = booking.depositAmount ?? 50000;
  const qrUrl = `https://img.vietqr.io/image/970422-113366668888-compact2.png?amount=${depositAmount}&addInfo=${encodeURIComponent(
    `FIXNEAR COC ${booking.id}`
  )}&accountName=${encodeURIComponent('CONG TY FIXNEAR')}`;

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      storageService.confirmDeposit(booking.id);
      setIsConfirming(false);
      success('Đặt cọc thành công!', 'Đơn đã được chốt lịch. Số điện thoại của thợ đã hiển thị.');
      onConfirmed();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} maxWidth="md">
      <div className="space-y-4 text-xs text-center">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Đặt cọc giữ lịch</h3>
          <p className="text-slate-500 mt-1">
            Quét mã QR để cọc <strong className="text-blue-700">{formatCurrency(depositAmount)}</strong>, giữ chỗ với thợ trong vòng
          </p>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold ${
          secondsLeft <= 60 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-700'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          Còn lại: {formatCountdown(secondsLeft)}
        </div>

        <img src={qrUrl} alt="Mã QR đặt cọc" className="w-40 h-40 mx-auto rounded-xl border border-slate-200 bg-white object-contain" />

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left space-y-1">
          <p><span className="text-slate-400">Số tiền cọc:</span> <strong className="text-blue-700">{formatCurrency(depositAmount)}</strong></p>
          <p><span className="text-slate-400">Nội dung CK:</span> <strong className="text-slate-900">FIXNEAR COC {booking.id}</strong></p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> Tiền cọc được hoàn 100% nếu thợ hủy hoặc không nhận việc.
        </div>

        <Button
          onClick={handleConfirm}
          isLoading={isConfirming}
          className="w-full font-bold"
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
        >
          Tôi đã thanh toán cọc
        </Button>
      </div>
    </Modal>
  );
};
