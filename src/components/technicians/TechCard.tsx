import React from 'react';
import { Link } from 'react-router-dom';
import { Technician } from '../../types';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CalendarCheck, 
  Sparkles,
  ArrowRight,
  Scale
} from 'lucide-react';

export interface TechCardProps {
  technician: Technician;
  onQuickBook?: (tech: Technician) => void;
  onCompareToggle?: (tech: Technician) => void;
  isComparing?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
  technician,
  onQuickBook,
  onCompareToggle,
  isComparing = false,
}) => {
  return (
    <div className={`bg-white rounded-2xl border ${isComparing ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200/80'} p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group relative overflow-hidden`}>
      
      {/* Pro Ribbon */}
      {technician.isPro && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>PRO</span>
        </div>
      )}

      <div>
        {/* Top Profile Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <Avatar
            src={technician.avatar}
            name={technician.name}
            size="lg"
            isOnline={technician.isOnline}
          />

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                to={`/technicians/${technician.id}`}
                className="font-bold text-sm text-slate-900 hover:text-blue-600 transition truncate"
              >
                {technician.name}
              </Link>

              {technician.isVerified && (
                <span title="Đã xác thực CCCD & Bằng nghề" className="inline-flex">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
              {technician.title}
            </p>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <RatingStars rating={technician.rating} reviewCount={technician.reviewCount} size="sm" />
              <span className="text-[11px] font-semibold text-slate-500">
                • {technician.completedJobs} đơn ({technician.completionRate || 98}%)
              </span>
            </div>
          </div>
        </div>

        {/* Badges list */}
        <div className="flex flex-wrap gap-1 mb-3">
          {technician.isVerified && (
            <Badge variant="primary" size="sm" className="text-[10px]">
              ✓ CCCD
            </Badge>
          )}
          {technician.rating >= 4.9 && (
            <Badge variant="warning" size="sm" className="text-[10px]">
              Top Đánh Giá
            </Badge>
          )}
          {technician.responseTimeMinutes <= 10 && (
            <Badge variant="success" size="sm" className="text-[10px]">
              Phản hồi &lt; 10p
            </Badge>
          )}
        </div>

        {/* Location & Speed stats */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{technician.district} (~{technician.distanceKm} km)</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate text-emerald-700 font-medium">Đến sau {technician.responseTimeMinutes * 2}p</span>
          </div>
        </div>

        {/* Short Bio Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {technician.bio}
        </p>
      </div>

      {/* Bottom Price & Actions */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Chi phí từ</span>
            <span className="text-sm font-extrabold text-blue-600">
              {formatCurrency(technician.basePrice)}
            </span>
          </div>

          {onCompareToggle && (
            <button
              type="button"
              onClick={() => onCompareToggle(technician)}
              className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-1 rounded-lg transition ${
                isComparing
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3 h-3" />
              {isComparing ? 'Đã chọn so sánh' : 'So sánh'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/technicians/${technician.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold"
            >
              Xem hồ sơ
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={() => onQuickBook && onQuickBook(technician)}
            className="w-full text-xs font-bold"
            rightIcon={<CalendarCheck className="w-3.5 h-3.5" />}
          >
            Đặt lịch
          </Button>
        </div>
      </div>

    </div>
  );
};

