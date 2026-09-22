import React, { useState } from 'react';
import { Booking, FinalPaymentMethod } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ShieldCheck, CheckCircle2, Wallet, Landmark, CreditCard, Download } from 'lucide-react';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onPaid?: () => void;
}

const METHODS: { id: FinalPaymentMethod; label: string; icon: React.ReactNode; hint: string }[] = [
  { id: 'momo', label: 'Ví MoMo', icon: <Wallet className="w-4 h-4 text-pink-600" />, hint: 'Quét mã hoặc mở app MoMo' },
  { id: 'vnpay', label: 'VNPay', icon: <Wallet className="w-4 h-4 text-blue-600" />, hint: 'Liên kết qua cổng VNPay' },
  { id: 'bank_transfer', label: 'Chuyển khoản ngân hàng', icon: <Landmark className="w-4 h-4 text-emerald-600" />, hint: 'Quét mã VietQR' },
  { id: 'card', label: 'Thẻ tín dụng/ghi nợ', icon: <CreditCard className="w-4 h-4 text-indigo-600" />, hint: 'Visa / Mastercard' },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, booking, onPaid }) => {
  const { success } = useNotification();
  const [method, setMethod] = useState<FinalPaymentMethod>('bank_transfer');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoice, setInvoice] = useState<{ id: string; amount: number; method: FinalPaymentMethod } | null>(null);

  if (!booking) return null;

  const amount = booking.quotation?.totalAmount ?? booking.estimatedPrice;

  const vietQrUrl = `https://img.vietqr.io/image/970422-113366668888-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    `FIXNEAR ${booking.id}`
  )}&accountName=${encodeURIComponent('CONG TY FIXNEAR')}`;

  const handleClose = () => {
    setInvoice(null);
    onClose();
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const invoiceId = storageService.completePayment(booking.id, method);
      setIsProcessing(false);
      setInvoice({ id: invoiceId, amount, method });
      success('Thanh toán thành công!', 'Đơn hàng đã chuyển sang trạng thái Đã hoàn thành.');
      onPaid?.();
    }, 1500);
  };

  if (invoice) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} maxWidth="md">
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Thanh toán thành công!</h3>
            <p className="text-xs text-slate-500 mt-1">Cảm ơn bạn đã sử dụng dịch vụ của FixNear.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Hóa đơn điện tử:</span>
              <span className="font-bold text-slate-900">{invoice.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mã đơn hàng:</span>
              <span className="font-bold text-slate-900">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Phương thức:</span>
              <span className="font-bold text-slate-900">{METHODS.find(m => m.id === invoice.method)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ngày thanh toán:</span>
              <span className="font-bold text-slate-900">{formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 mt-1.5">
              <span className="text-slate-500">Tổng thanh toán:</span>
              <span className="font-extrabold text-blue-700 text-sm">{formatCurrency(invoice.amount)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />} onClick={() => window.print()}>
              Tải hóa đơn
            </Button>
            <Button onClick={handleClose}>Đóng</Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Thanh toán an toàn"
      description={`Đơn hàng ${booking.id} - ${booking.serviceName}`}
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Summary */}
        <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 block">Tổng chi phí cần thanh toán</span>
            <span className="text-lg font-black text-blue-700">{formatCurrency(amount)}</span>
          </div>
          <div className="text-right text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Cam kết hoàn tiền nếu không hài lòng
          </div>
        </div>

        {/* Method selection */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Chọn phương thức thanh toán
          </label>
          <div className="grid grid-cols-2 gap-2">
            {METHODS.map(m => (
              <label
                key={m.id}
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                  method === m.id ? 'border-blue-600 bg-blue-50/70' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentGatewayMethod"
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="mt-0.5"
                />
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5">{m.icon} {m.label}</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{m.hint}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Method-specific panel */}
        {method === 'bank_transfer' && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <img src={vietQrUrl} alt="Mã VietQR thanh toán" className="w-36 h-36 rounded-xl border border-slate-200 bg-white object-contain" />
            <div className="text-[11px] text-slate-600 space-y-1">
              <p><span className="text-slate-400">Ngân hàng:</span> <strong className="text-slate-900">MB Bank</strong></p>
              <p><span className="text-slate-400">Số tài khoản:</span> <strong className="text-slate-900">113366668888</strong></p>
              <p><span className="text-slate-400">Chủ tài khoản:</span> <strong className="text-slate-900">CONG TY FIXNEAR</strong></p>
              <p><span className="text-slate-400">Số tiền:</span> <strong className="text-blue-700">{formatCurrency(amount)}</strong></p>
              <p><span className="text-slate-400">Nội dung:</span> <strong className="text-slate-900">FIXNEAR {booking.id}</strong></p>
              <p className="text-slate-400 italic pt-1">Quét mã QR bằng app ngân hàng bất kỳ, số tiền & nội dung đã được điền sẵn.</p>
            </div>
          </div>
        )}

        {(method === 'momo' || method === 'vnpay') && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
            <div className="w-32 h-32 mx-auto bg-white rounded-xl border border-slate-200 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-[11px] text-slate-500">
              Quét mã QR bằng app {method === 'momo' ? 'MoMo' : 'VNPay'} để thanh toán {formatCurrency(amount)}.
            </p>
          </div>
        )}

        {method === 'card' && (
          <div className="space-y-2">
            <Input
              label="Số thẻ"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input label="Ngày hết hạn" placeholder="MM/YY" />
              <Input label="CVV" placeholder="123" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="button" isLoading={isProcessing} onClick={handleConfirmPayment} className="font-bold px-6 shadow-brand">
            Xác nhận thanh toán
          </Button>
        </div>
      </div>
    </Modal>
  );
};
