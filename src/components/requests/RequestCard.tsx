import React from 'react';
import { ServiceRequest } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import { MapPin, Clock, DollarSign, MessageSquare, ChevronRight, Eye } from 'lucide-react';

export interface RequestCardProps {
  request: ServiceRequest;
  onOfferQuote?: (req: ServiceRequest) => void;
  showActions?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onOfferQuote,
  showActions = true,
}) => {
  const statusBadges = {
    open: { label: 'Đang tìm thợ', variant: 'success' as const },
    assigned: { label: 'Đã giao thợ', variant: 'info' as const },
    in_progress: { label: 'Đang sửa', variant: 'warning' as const },
    completed: { label: 'Hoàn thành', variant: 'primary' as const },
    cancelled: { label: 'Đã hủy', variant: 'danger' as const },
  };

  const currentBadge = statusBadges[request.status] || statusBadges.open;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header with category and status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="primary" size="sm">
            {request.categoryName}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {formatRelativeTime(request.createdAt)}
            </span>
            <Badge variant={currentBadge.variant} size="sm" dot>
              {currentBadge.label}
            </Badge>
          </div>
        </div>

        {/* Title & description */}
        <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition line-clamp-2 leading-snug">
          {request.title}
        </h4>
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {request.description}
        </p>

        {/* Request details info */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{request.district}, {request.city}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{request.preferredTime}</span>
          </div>
        </div>
      </div>

      {/* Footer budget & CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar src={request.customerAvatar} name={request.customerName} size="xs" />
          <span className="text-xs font-semibold text-slate-700 truncate max-w-[110px]">
            {request.customerName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Ngân sách dự kiến</span>
            <span className="text-xs font-extrabold text-blue-600">
              {request.budget > 0 ? formatCurrency(request.budget) : 'Thỏa thuận'}
            </span>
          </div>

          {showActions && onOfferQuote && request.status === 'open' && (
            <Button
              size="sm"
              onClick={() => onOfferQuote(request)}
              className="text-xs font-semibold"
            >
              Báo giá
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

