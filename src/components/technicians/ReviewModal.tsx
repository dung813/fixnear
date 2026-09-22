import React, { useState } from 'react';
import { Booking, Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { storageService } from '../../services/storageService';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { Star, ThumbsUp, Upload } from 'lucide-react';

const SAMPLE_ACCEPTANCE_PHOTOS = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
];

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [overallRating, setOverallRating] = useState<number>(5);
  const [quality, setQuality] = useState<number>(5);
  const [attitude, setAttitude] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [pricing, setPricing] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!booking) return null;

  const handleUploadPhoto = () => {
    const photo = SAMPLE_ACCEPTANCE_PHOTOS[Math.floor(Math.random() * SAMPLE_ACCEPTANCE_PHOTOS.length)];
    setPhotos(prev => [...prev, photo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      error('Vui lòng viết vài lời nhận xét về dịch vụ');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const avg = Number(((quality + attitude + punctuality + pricing) / 4).toFixed(1));

      const newReview: Review = {
        id: `rev-${Date.now()}`,
        bookingId: booking.id,
        technicianId: booking.technicianId,
        customerId: user?.id || booking.customerId,
        customerName: user?.name || booking.customerName,
        customerAvatar: user?.avatar || booking.customerAvatar,
        rating: avg || overallRating,
        ratings: {
          quality,
          attitude,
          punctuality,
          pricing,
        },
        comment: comment.trim(),
        serviceName: booking.serviceName,
        photos: photos.length > 0 ? photos : undefined,
        createdAt: new Date().toISOString(),
      };

      storageService.addReview(newReview);
      setIsSubmitting(false);
      success('Cảm ơn bạn đã gửi đánh giá!', 'Đánh giá đã được đăng lên hồ sơ thợ.');
      setComment('');
      setPhotos([]);
      onClose();
      if (onSuccess) onSuccess();
    }, 500);
  };

  const criteria = [
    { label: 'Chất lượng sửa chữa', value: quality, set: setQuality },
    { label: 'Thái độ phục vụ', value: attitude, set: setAttitude },
    { label: 'Đúng hẹn & Tác phong', value: punctuality, set: setPunctuality },
    { label: 'Giá cả minh bạch', value: pricing, set: setPricing },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đánh giá chất lượng dịch vụ"
      description={`Gửi nhận xét cho thợ ${booking.technicianName} - Dịch vụ: ${booking.serviceName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 4 Criteria Ratings */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Tiêu chí chấm điểm (1 - 5 sao):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/70">
                <span className="text-xs font-medium text-slate-700">{c.label}</span>
                <RatingStars
                  rating={c.value}
                  size="sm"
                  interactive={true}
                  onRatingChange={c.set}
                  showNumber={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Nhận xét chi tiết của bạn:
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm thực tế của bạn về tay nghề, cách thợ báo giá, sự nhiệt tình..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        {/* Acceptance Photos Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Ảnh chụp kết quả nghiệm thu thực tế (nếu có):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-slate-200">
                <img src={p} alt={`Ảnh nghiệm thu ${i + 1}`} className="w-full h-full object-cover" />
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
              onClick={handleUploadPhoto}
              className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-2 text-slate-500 hover:text-blue-600 transition aspect-video"
            >
              <Upload className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium">Thêm ảnh</span>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Để sau
          </Button>
          <Button type="submit" isLoading={isSubmitting} leftIcon={<ThumbsUp className="w-4 h-4" />}>
            Gửi đánh giá
          </Button>
        </div>
      </form>
    </Modal>
  );
};

