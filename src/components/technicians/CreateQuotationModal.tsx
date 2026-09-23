import React, { useEffect, useState } from 'react';
import { Booking, QuotationPart } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Trash2, Send } from 'lucide-react';

export interface CreateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

const WARRANTY_OPTIONS = [
  { value: '1', label: '30 ngày (1 tháng)' },
  { value: '3', label: '3 tháng' },
  { value: '6', label: '6 tháng' },
  { value: '12', label: '12 tháng' },
];

// The "báo giá thực tế" a technician sends right after surveying, BEFORE starting
// repair work: labor + parts + warranty, sent to the customer for approval. This
// is distinct from the end-of-job handover quotation (TechnicianQuotationModal),
// which also collects completion photos and settles final payment.
export const CreateQuotationModal: React.FC<CreateQuotationModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { success, error } = useNotification();
  const [laborCost, setLaborCost] = useState('0');
  const [parts, setParts] = useState<QuotationPart[]>([]);
  const [warrantyMonths, setWarrantyMonths] = useState('6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && booking) {
      const category = storageService.getCategories().find(c => c.slug === booking.categoryId);
      setLaborCost(String(category?.startingPrice ?? booking.estimatedPrice ?? 0));
      setParts([]);
      setWarrantyMonths(String(booking.warrantyMonths || 6));
    }
  }, [isOpen, booking?.id]);

  if (!booking) return null;

  const partsTotal = parts.reduce((s, p) => s + p.unitPrice, 0);
  const totalAmount = (Number(laborCost) || 0) + partsTotal;

  const addPart = () => {
    setParts(prev => [...prev, { id: `part-${Date.now()}`, name: '', unitPrice: 0, quantity: 1 }]);
  };
  const updatePart = (id: string, updates: Partial<QuotationPart>) => {
    setParts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };
  const removePart = (id: string) => setParts(prev => prev.filter(p => p.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laborCost || Number(laborCost) <= 0) {
      error('Vui lòng nhập tiền công sửa chữa hợp lệ');
      return;
    }
    if (parts.some(p => !p.name.trim() || p.unitPrice <= 0)) {
      error('Vui lòng nhập đầy đủ tên và giá tiền cho từng linh kiện');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      storageService.submitQuotation(
        booking.id,
        {
          laborCost: Number(laborCost) || 0,
          parts,
          extraCharges: [],
          totalAmount,
        },
        { warrantyMonths: Number(warrantyMonths), approvalTarget: 'in_progress' }
      );
      setIsSubmitting(false);
      success('Đã gửi báo giá cho khách!', 'Đơn chuyển sang trạng thái "Chờ duyệt báo giá".');
      onClose();
      onSuccess?.();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo báo giá thực tế"
      description={`Đơn ${booking.id} - ${booking.serviceName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="1. Tiền công sửa chữa (VNĐ) *"
          type="number"
          value={laborCost}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLaborCost(e.target.value)}
          required
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              2. Linh kiện / Vật tư thay thế
            </label>
            <button type="button" onClick={addPart} className="text-blue-600 font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Thêm linh kiện
            </button>
          </div>
          <div className="space-y-2">
            {parts.map(part => (
              <div key={part.id} className="grid grid-cols-12 gap-1.5 items-center">
                <input
                  value={part.name}
                  onChange={e => updatePart(part.id, { name: e.target.value })}
                  placeholder="Tên linh kiện"
                  className="col-span-7 rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="number"
                  value={part.unitPrice || ''}
                  onChange={e => updatePart(part.id, { unitPrice: Number(e.target.value) || 0 })}
                  placeholder="Giá tiền"
                  className="col-span-4 rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <button type="button" onClick={() => removePart(part.id)} className="col-span-1 text-rose-500 flex justify-center">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {parts.length === 0 && (
              <p className="text-slate-400 italic">Chưa có linh kiện nào — bấm "Thêm linh kiện" nếu có thay thế vật tư.</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            3. Thời gian bảo hành cam kết
          </label>
          <select
            value={warrantyMonths}
            onChange={e => setWarrantyMonths(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            {WARRANTY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between font-bold">
          <span className="text-slate-600">Tổng tiền báo khách:</span>
          <span className="text-sm text-blue-700">{formatCurrency(totalAmount)}</span>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" size="sm" isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />}>
            Gửi báo giá cho khách duyệt
          </Button>
        </div>
      </form>
    </Modal>
  );
};
