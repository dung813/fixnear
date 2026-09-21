import React, { useState } from 'react';
import { Booking, Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { storageService } from '../../services/storageService';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { Star, ThumbsUp } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!booking) return null;

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
        createdAt: new Date().toISOString(),
      };

      storageService.addReview(newReview);
      setIsSubmitting(false);
      success('Cảm ơn bạn đã gửi đánh giá!', 'Đánh giá đã được đăng lên hồ sơ thợ.');
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

