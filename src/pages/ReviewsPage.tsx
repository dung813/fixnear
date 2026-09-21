import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Review } from '../types';
import { Avatar } from '../components/common/Avatar';
import { RatingStars } from '../components/common/RatingStars';
import { formatDate } from '../utils/formatters';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [starFilter, setStarFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setReviews(storageService.getReviews());
  }, []);

  const filtered = reviews.filter((r: Review) => {
    if (starFilter > 0 && Math.floor(r.rating) !== starFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.customerName.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Minh bạch & Đáng tin cậy
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Đánh giá từ khách hàng thực tế
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          100% nhận xét từ khách hàng sau khi thợ hoàn thành đơn sửa chữa tại nhà qua FixNear.
        </p>

        {/* Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: 'Tất cả đánh giá', val: 0 },
            { label: '5 Sao ★★★★★', val: 5 },
            { label: '4 Sao ★★★★', val: 4 },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setStarFilter(f.val)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                starFilter === f.val
                  ? 'bg-amber-500 text-slate-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rev: Review) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar src={rev.customerAvatar} name={rev.customerName} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{rev.customerName}</h4>
                    <p className="text-[11px] text-slate-400">{formatDate(rev.createdAt)}</p>
                  </div>
                </div>
                <RatingStars rating={rev.rating} size="sm" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                Dịch vụ: {rev.serviceName}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                "{rev.comment}"
              </p>
            </div>

            {/* Criteria mini badges */}
            {rev.ratings && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div>Chất lượng: <strong className="text-slate-800">{rev.ratings.quality}★</strong></div>
                <div>Thái độ: <strong className="text-slate-800">{rev.ratings.attitude}★</strong></div>
                <div>Đúng giờ: <strong className="text-slate-800">{rev.ratings.punctuality}★</strong></div>
                <div>Giá cả: <strong className="text-slate-800">{rev.ratings.pricing}★</strong></div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

