import React, { useState } from 'react';
import { Booking, DisputeTicket } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';
import { AlertTriangle, ShieldCheck, Send } from 'lucide-react';

export interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { success, error } = useNotification();

  const [issueType, setIssueType] = useState<DisputeTicket['issueType']>('quality');
  const [description, setDescription] = useState('');
  const [refundAmount, setRefundAmount] = useState(booking?.estimatedPrice ? String(booking.estimatedPrice) : '150000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      error('Vui lòng mô tả chi tiết lý do khiếu nại.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newDispute: DisputeTicket = {
        id: `disp-${Date.now()}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        customerName: booking.customerName,
        technicianId: booking.technicianId,
        technicianName: booking.technicianName,
        issueType,
        description: description.trim(),
        refundRequested: Number(refundAmount) || 0,
        status: 'open',
        createdAt: new Date().toISOString(),
      };

      storageService.addDispute(newDispute);
      setIsSubmitting(false);
      success('Đã gửi yêu cầu khiếu nại thành công!', 'Bộ phận CSKH FixNear sẽ can thiệp và xử lý trong vòng 24 giờ.');
      if (onSuccess) onSuccess();
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Khiếu Nại Dịch Vụ & Yêu Cầu Hoàn Tiền"
      description={`Đơn sửa chữa: ${booking.serviceName} - Thợ: ${booking.technicianName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            FixNear cam kết bảo vệ 100% quyền lợi khách hàng. Nếu thợ làm không đạt yêu cầu, làm hỏng đồ hoặc vi phạm quy chế báo giá, sàn sẽ hỗ trợ hoàn tiền hoặc điều thợ khác đến bảo hành miễn phí.
          </p>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Loại vấn đề gặp phải *
          </label>
          <select
            value={issueType}
            onChange={(e: any) => setIssueType(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            <option value="quality">Chất lượng sửa chữa kém / Không khắc phục được lỗi</option>
            <option value="pricing">Thợ báo giá cao hơn thỏa thuận / Không minh bạch</option>
            <option value="punctuality">Thợ đến quá trễ hoặc tự ý hủy hẹn không báo</option>
            <option value="damage">Làm hư hại thêm thiết bị hoặc tài sản trong nhà</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mô tả chi tiết sự việc *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nêu rõ tình trạng hiện tại của thiết bị, thái độ của thợ, các chi phí thợ đã thu..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <Input
          label="Số tiền yêu cầu bồi hoàn / Trừ lại (VNĐ):"
          type="number"
          value={refundAmount}
          onChange={(e: any) => setRefundAmount(e.target.value)}
          helperText={`Tối đa giá trị đơn: ${formatCurrency(booking.finalPrice || booking.estimatedPrice)}`}
        />

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            size="sm"
            isLoading={isSubmitting}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Gửi khiếu nại lên Admin
          </Button>
        </div>

      </form>
    </Modal>
  );
};

