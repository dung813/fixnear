import React, { useState, useEffect } from 'react';
import { Booking, QuotationPart, QuotationExtraCharge } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Trash2, Upload, Send } from 'lucide-react';

export interface TechnicianQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
];

export const TechnicianQuotationModal: React.FC<TechnicianQuotationModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { success, error } = useNotification();

  const [laborCost, setLaborCost] = useState('150000');
  const [parts, setParts] = useState<QuotationPart[]>([]);
  const [extraCharges, setExtraCharges] = useState<QuotationExtraCharge[]>([]);
  const [completionPhotos, setCompletionPhotos] = useState<string[]>([]);
  const [warrantyMonths, setWarrantyMonths] = useState('6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default the labor cost to the booking's category starting price, so it
  // always reflects the current real-world price table instead of a stale flat guess.
  useEffect(() => {
    if (booking) {
      const category = storageService.getCategories().find(c => c.slug === booking.categoryId);
      setLaborCost(String(category?.startingPrice ?? 150000));
      setParts([]);
      setExtraCharges([]);
      setCompletionPhotos([]);
      setWarrantyMonths('6');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking?.id]);

  if (!booking) return null;

  const partsTotal = parts.reduce((s, p) => s + p.unitPrice * p.quantity, 0);
  const extraTotal = extraCharges.reduce((s, e) => s + e.amount, 0);
  const totalAmount = (Number(laborCost) || 0) + partsTotal + extraTotal;

  const addPart = () => {
    setParts(prev => [...prev, { id: `part-${Date.now()}`, name: '', unitPrice: 0, quantity: 1 }]);
  };
  const updatePart = (id: string, updates: Partial<QuotationPart>) => {
    setParts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };
  const removePart = (id: string) => setParts(prev => prev.filter(p => p.id !== id));

  const addExtraCharge = () => {
    setExtraCharges(prev => [
      ...prev,
      { id: `extra-${Date.now()}`, description: '', reason: '', amount: 0, photos: [] },
    ]);
  };
  const updateExtraCharge = (id: string, updates: Partial<QuotationExtraCharge>) => {
    setExtraCharges(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };
  const removeExtraCharge = (id: string) => setExtraCharges(prev => prev.filter(e => e.id !== id));
  const addExtraChargePhoto = (id: string) => {
    const photo = SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)];
    setExtraCharges(prev => prev.map(e => (e.id === id ? { ...e, photos: [...e.photos, photo] } : e)));
  };

  const addCompletionPhoto = () => {
    const photo = SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)];
    setCompletionPhotos(prev => [...prev, photo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laborCost || Number(laborCost) <= 0) {
      error('Vui lòng nhập tiền công thợ hợp lệ');
      return;
    }
    if (completionPhotos.length === 0) {
      error('Vui lòng tải lên ít nhất 1 ảnh kết quả sau khi sửa xong');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      storageService.submitQuotation(
        booking.id,
        {
          laborCost: Number(laborCost) || 0,
          parts,
          extraCharges,
          totalAmount,
        },
        {
          completionPhotos,
          warrantyMonths: Number(warrantyMonths) || booking.warrantyMonths,
        }
      );
      setIsSubmitting(false);
      success('Đã gửi báo giá & bàn giao!', 'Khách hàng sẽ nhận thông báo để duyệt báo giá và thanh toán.');
      onClose();
      onSuccess?.();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lập báo giá & Nghiệm thu bàn giao"
      description={`Đơn ${booking.id} - ${booking.customerName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="1. Tiền công thợ (VNĐ) *"
          type="number"
          value={laborCost}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLaborCost(e.target.value)}
          required
        />

        {/* Parts table */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              2. Vật tư / Linh kiện thay thế
            </label>
            <button type="button" onClick={addPart} className="text-blue-600 font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Thêm dòng
            </button>
          </div>
          <div className="space-y-2">
            {parts.map(part => (
              <div key={part.id} className="grid grid-cols-12 gap-1.5 items-center">
                <input
                  value={part.name}
                  onChange={e => updatePart(part.id, { name: e.target.value })}
                  placeholder="Tên vật tư"
                  className="col-span-6 rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="number"
                  value={part.unitPrice || ''}
                  onChange={e => updatePart(part.id, { unitPrice: Number(e.target.value) || 0 })}
                  placeholder="Đơn giá"
                  className="col-span-3 rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="number"
                  value={part.quantity || ''}
                  onChange={e => updatePart(part.id, { quantity: Number(e.target.value) || 1 })}
                  placeholder="SL"
                  className="col-span-2 rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <button type="button" onClick={() => removePart(part.id)} className="col-span-1 text-rose-500 flex justify-center">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {parts.length === 0 && (
              <p className="text-slate-400 italic">Chưa có vật tư nào — bấm "Thêm dòng" nếu có thay thế linh kiện.</p>
            )}
          </div>
        </div>

        {/* Extra charges */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-amber-700 uppercase tracking-wider">
              3. Chi phí phát sinh (nếu có)
            </label>
            <button type="button" onClick={addExtraCharge} className="text-blue-600 font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Thêm khoản
            </button>
          </div>
          <div className="space-y-2">
            {extraCharges.map(extra => (
              <div key={extra.id} className="p-3 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  <input
                    value={extra.description}
                    onChange={e => updateExtraCharge(extra.id, { description: e.target.value })}
                    placeholder="Tên khoản phát sinh"
                    className="sm:col-span-2 rounded-lg border border-amber-200 p-2 text-xs focus:border-blue-600 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={extra.amount || ''}
                    onChange={e => updateExtraCharge(extra.id, { amount: Number(e.target.value) || 0 })}
                    placeholder="Số tiền"
                    className="rounded-lg border border-amber-200 p-2 text-xs focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <textarea
                  value={extra.reason}
                  onChange={e => updateExtraCharge(extra.id, { reason: e.target.value })}
                  placeholder="Lý do phát sinh để khách hiểu rõ..."
                  rows={2}
                  className="w-full rounded-lg border border-amber-200 p-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  {extra.photos.map((p, i) => (
                    <img key={i} src={p} alt="Bằng chứng" className="w-12 h-12 rounded-lg object-cover border border-amber-200" />
                  ))}
                  <button
                    type="button"
                    onClick={() => addExtraChargePhoto(extra.id)}
                    className="text-[11px] font-semibold text-amber-700 flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> Ảnh chứng minh
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExtraCharge(extra.id)}
                    className="ml-auto text-rose-500 flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Trash2 className="w-3 h-3" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion photos + warranty */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <label className="block font-bold text-slate-700 uppercase tracking-wider">
            4. Ảnh kết quả sau khi sửa xong *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {completionPhotos.map((p, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-slate-200">
                <img src={p} alt={`Kết quả ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCompletionPhotos(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[9px]"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCompletionPhoto}
              className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-2 text-slate-500 hover:text-blue-600 transition aspect-video"
            >
              <Upload className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium">Thêm ảnh</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            5. Thời hạn bảo hành đề xuất
          </label>
          <select
            value={warrantyMonths}
            onChange={e => setWarrantyMonths(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            <option value="1">30 ngày (1 tháng)</option>
            <option value="3">3 tháng</option>
            <option value="6">6 tháng</option>
            <option value="12">12 tháng</option>
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
            Gửi báo giá & Nghiệm thu
          </Button>
        </div>
      </form>
    </Modal>
  );
};
