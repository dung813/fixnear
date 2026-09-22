import React from 'react';
import { ServiceCategory } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, Tag } from 'lucide-react';

export interface CategoryPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ServiceCategory | null;
  onFindTech: (slug: string) => void;
}

export const CategoryPriceModal: React.FC<CategoryPriceModalProps> = ({
  isOpen,
  onClose,
  category,
  onFindTech,
}) => {
  if (!category) return null;

  const minRef = category.minPrice ?? category.startingPrice;
  const maxRef = category.maxPrice ?? category.startingPrice * 4;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bảng giá tham khảo - ${category.name}`}
      description="Giá thực tế có thể thay đổi tùy tình trạng thiết bị, được thợ báo chi tiết trước khi sửa."
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
          <span className="font-semibold text-slate-600 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600" /> Khung giá tham khảo chung
          </span>
          <span className="font-extrabold text-blue-700 text-sm">
            {formatCurrency(minRef)} - {formatCurrency(maxRef)}
          </span>
        </div>

        <div>
          <p className="font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bảng giá theo hạng mục phổ biến
          </p>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {category.popularServices.map((service, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-3 bg-white">
                <span className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {service}
                </span>
                <span className="font-bold text-slate-900 shrink-0">
                  {formatCurrency(category.startingPrice + i * 30000)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          * Bảng giá mang tính tham khảo. Thợ sẽ khảo sát thực tế và gửi báo giá điện tử chi tiết (tiền công, vật tư,
          chi phí phát sinh nếu có) để bạn duyệt trước khi tiến hành sửa chữa.
        </p>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button
            className="font-bold"
            onClick={() => {
              onClose();
              onFindTech(category.slug);
            }}
          >
            Tìm thợ ngay
          </Button>
        </div>
      </div>
    </Modal>
  );
};
