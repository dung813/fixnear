import React, { useState } from 'react';
import { Booking } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Upload } from 'lucide-react';

export interface WarrantyClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
];

export const WarrantyClaimModal: React.FC<WarrantyClaimModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleUpload = () => {
    const media = SAMPLE_MEDIA[Math.floor(Math.random() * SAMPLE_MEDIA.length)];
    setPhotos(prev => [...prev, media]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      error('Vui lòng mô tả lỗi tái phát của bạn');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      storageService.addWarrantyClaim({
        id: `wc-${Date.now()}`,
        bookingId: booking.id,
        customerId: user?.id || booking.customerId,
        technicianId: booking.technicianId,
        technicianName: booking.technicianName,
        description: description.trim(),
        photos,
        preferredDate,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      success('Đã gửi yêu cầu bảo hành!', 'FixNear sẽ liên hệ sắp xếp thợ quay lại kiểm tra miễn phí.');
      setDescription('');
      setPhotos([]);
      onClose();
      onSuccess?.();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gửi yêu cầu bảo hành"
      description={`Đơn ${booking.id} - ${booking.serviceName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mô tả lỗi tái phát *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Mô tả cụ thể hiện tượng lỗi lặp lại, thời điểm phát hiện..."
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Đính kèm hình ảnh / video (nếu có)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-slate-200">
                <img src={p} alt={`Minh họa ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[9px]"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleUpload}
              className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-2 text-slate-500 hover:text-blue-600 transition aspect-video"
            >
              <Upload className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium">Thêm ảnh/video</span>
            </button>
          </div>
        </div>

        <Input
          label="Ngày mong muốn thợ quay lại kiểm tra"
          type="date"
          value={preferredDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPreferredDate(e.target.value)}
          required
        />

        <p className="text-[10px] text-emerald-600 font-medium">
          ✓ Kiểm tra lại hoàn toàn miễn phí trong thời hạn bảo hành.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" isLoading={isSubmitting} className="font-bold">
            Gửi yêu cầu bảo hành
          </Button>
        </div>
      </form>
    </Modal>
  );
};
