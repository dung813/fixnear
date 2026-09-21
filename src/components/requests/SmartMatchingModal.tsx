import React from 'react';
import { ServiceRequest, Technician } from '../../types';
import { getRecommendedTechnicians } from '../../utils/matchingEngine';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles, ShieldCheck, CheckCircle2, MessageSquare, CalendarCheck, Zap } from 'lucide-react';

export interface SmartMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  allTechnicians: Technician[];
  onSelectTech: (tech: Technician) => void;
  onChatTech: (tech: Technician) => void;
}

export const SmartMatchingModal: React.FC<SmartMatchingModalProps> = ({
  isOpen,
  onClose,
  request,
  allTechnicians,
  onSelectTech,
  onChatTech,
}) => {
  if (!isOpen || !request) return null;

  const recommendations = getRecommendedTechnicians(request, allTechnicians, 3);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="FixNear AI Smart Matching — Đề Xuất Thợ Tối Ưu"
      description="Hệ thống tự động phân tích và đối chiếu yêu cầu sửa chữa với cơ sở dữ liệu thợ trong khu vực."
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        
        {/* Analysis Overview Card */}
        <div className="p-3.5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl space-y-1.5 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Phân tích yêu cầu tự động
            </span>
          </div>
          <h4 className="font-bold text-sm text-white line-clamp-1">{request.title}</h4>
          <p className="text-[11px] text-slate-300">
            Khu vực: <strong>{request.district}, {request.city}</strong> • Ngân sách: <strong>{formatCurrency(request.budget)}</strong>
          </p>
        </div>

        {/* Recommended Techs List */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
            Top 3 Thợ Kỹ Thuật Phù Hợp Nhất ({recommendations.length}):
          </h4>

          {recommendations.map(({ technician, score, reasons }, idx) => (
            <div
              key={technician.id}
              className={`p-4 rounded-2xl border transition relative overflow-hidden ${
                idx === 0
                  ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-sm">
                  PHÙ HỢP NHẤT
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Avatar src={technician.avatar} name={technician.name} size="md" isOnline={technician.isOnline} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900">{technician.name}</h5>
                      {technician.isVerified && <ShieldCheck className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">{technician.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingStars rating={technician.rating} reviewCount={technician.reviewCount} size="sm" />
                      <span className="text-[10px] text-slate-400">• {technician.completedJobs} đơn</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{score}% Độ Phù Hợp</span>
                  </div>
                  <span className="block text-[11px] font-black text-blue-600 mt-1">
                    Từ {formatCurrency(technician.basePrice)}
                  </span>
                </div>
              </div>

              {/* Reasons badges */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                {reasons.map((r, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" /> {r}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => {
                    onClose();
                    onChatTech(technician);
                  }}
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                >
                  Chat tư vấn
                </Button>
                <Button
                  size="sm"
                  className="text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onSelectTech(technician);
                  }}
                  leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                >
                  Đặt lịch ngay
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Modal>
  );
};

