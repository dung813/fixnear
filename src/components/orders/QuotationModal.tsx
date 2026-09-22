import React, { useState } from 'react';
import { Booking } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { AlertTriangle, CheckCircle2, ImageIcon, Wrench } from 'lucide-react';

export interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onApproved?: () => void;
  onRejected?: () => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  booking,
  onApproved,
  onRejected,
}) => {
  const { success, error } = useNotification();
  const [isRejecting, setIsRejecting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking || !booking.quotation) return null;
  const q = booking.quotation;

  const partsTotal = q.parts.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);
  const extraTotal = q.extraCharges.reduce((sum, e) => sum + e.amount, 0);

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      storageService.respondToQuotation(booking.id, true);
      setIsSubmitting(false);
      success('Đã duyệt báo giá!', 'Đơn hàng chuyển sang bước thanh toán.');
      onClose();
      onApproved?.();
    }, 500);
  };

  const handleReject = () => {
    if (!feedback.trim()) {
      error('Vui lòng nhập lý do để thợ giải trình lại báo giá');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      storageService.respondToQuotation(booking.id, false, feedback.trim());
      setIsSubmitting(false);
      success('Đã gửi yêu cầu giải trình', 'Thợ sẽ liên hệ giải thích và gửi lại báo giá mới.');
      onClose();
      onRejected?.();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Báo giá chi tiết chờ duyệt"
      description={`Đơn ${booking.id} - ${booking.serviceName}`}
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Labor cost */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-blue-600" /> Tiền công cơ bản
          </span>
          <span className="font-bold text-slate-900">{formatCurrency(q.laborCost)}</span>
        </div>

        {/* Parts table */}
        {q.parts.length > 0 && (
          <div>
            <p className="font-bold text-slate-700 uppercase tracking-wider mb-2">Vật tư / Linh kiện thay thế</p>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="text-left p-2.5 font-semibold">Tên vật tư</th>
                    <th className="text-right p-2.5 font-semibold">Đơn giá</th>
                    <th className="text-right p-2.5 font-semibold">SL</th>
                    <th className="text-right p-2.5 font-semibold">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {q.parts.map(part => (
                    <tr key={part.id}>
                      <td className="p-2.5 text-slate-800">{part.name}</td>
                      <td className="p-2.5 text-right text-slate-600">{formatCurrency(part.unitPrice)}</td>
                      <td className="p-2.5 text-right text-slate-600">{part.quantity}</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">
                        {formatCurrency(part.unitPrice * part.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Extra charges */}
        {q.extraCharges.length > 0 && (
          <div>
            <p className="font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Khoản phát sinh thực tế
            </p>
            <div className="space-y-2">
              {q.extraCharges.map(extra => (
                <div key={extra.id} className="p-3 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900">{extra.description}</span>
                    <span className="font-extrabold text-amber-700 shrink-0">{formatCurrency(extra.amount)}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{extra.reason}</p>
                  {extra.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {extra.photos.map((photo, i) => (
                        <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-amber-200 shrink-0">
                          <img src={photo} alt={`Bằng chứng phát sinh ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {q.parts.length === 0 && q.extraCharges.length === 0 && (
          <p className="text-slate-400 flex items-center gap-1.5 italic">
            <ImageIcon className="w-3.5 h-3.5" /> Không có vật tư hoặc chi phí phát sinh nào khác.
          </p>
        )}

        {/* Total */}
        <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
          <span className="text-slate-600 font-semibold">Tổng tiền thanh toán cuối cùng</span>
          <span className="text-lg font-black text-blue-700">{formatCurrency(q.totalAmount || (q.laborCost + partsTotal + extraTotal))}</span>
        </div>

        {/* Reject feedback form */}
        {isRejecting ? (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block font-bold text-slate-700 uppercase tracking-wider">
              Lý do từ chối / Yêu cầu giải trình *
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Ví dụ: Chi phí vật tư phát sinh quá cao so với thị trường, cần thợ giải thích rõ hơn..."
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsRejecting(false)}>
                Quay lại
              </Button>
              <Button
                type="button"
                size="sm"
                variant="danger"
                isLoading={isSubmitting}
                onClick={handleReject}
              >
                Gửi yêu cầu giải trình
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsRejecting(true)}>
              Từ chối / Yêu cầu giải trình
            </Button>
            <Button
              type="button"
              isLoading={isSubmitting}
              onClick={handleApprove}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              className="font-bold"
            >
              Đồng ý báo giá
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
