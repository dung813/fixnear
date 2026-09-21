import React from 'react';
import { Technician } from '../../types';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Zap, 
  DollarSign, 
  X,
  MessageSquare,
  CalendarCheck
} from 'lucide-react';

export interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  technicians: Technician[];
  onRemoveTech: (id: string) => void;
  onBookTech: (tech: Technician) => void;
  onChatTech: (tech: Technician) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  technicians,
  onRemoveTech,
  onBookTech,
  onChatTech,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="So Sánh Hồ Sơ Thợ Kỹ Thuật (Side-by-Side)"
      description="Đối chiếu kinh nghiệm, giá cả, đánh giá và tốc độ phản hồi để chọn người thợ phù hợp nhất."
      maxWidth="2xl"
    >
      {technicians.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          Chưa chọn thợ nào để so sánh. Vui lòng chọn 2-3 thợ trong danh bạ.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider w-40">
                  Tiêu chí so sánh
                </th>
                {technicians.map(tech => (
                  <th key={tech.id} className="p-3 bg-white text-center min-w-[200px] border-l border-slate-100 relative">
                    <button
                      onClick={() => onRemoveTech(tech.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-100 transition"
                      title="Bỏ so sánh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Avatar src={tech.avatar} name={tech.name} size="lg" isOnline={tech.isOnline} className="mx-auto mb-2" />
                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{tech.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{tech.title}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {/* Rating & Reviews */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Đánh giá sao</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <RatingStars rating={tech.rating} reviewCount={tech.reviewCount} size="sm" />
                  </td>
                ))}
              </tr>

              {/* Completed Jobs & Completion rate */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Đơn & Tỷ lệ hoàn thành</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-bold">
                    <span className="text-blue-600">{tech.completedJobs} đơn</span>
                    <span className="text-slate-400 font-normal"> ({tech.completionRate || 98}%)</span>
                  </td>
                ))}
              </tr>

              {/* Experience */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Kinh nghiệm</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-bold">
                    {tech.experienceYears} năm làm nghề
                  </td>
                ))}
              </tr>

              {/* Distance & Location */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Khoảng cách & Khu vực</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <span className="font-bold text-emerald-600 block">~{tech.distanceKm} km</span>
                    <span className="text-slate-500 text-[11px]">{tech.district}</span>
                  </td>
                ))}
              </tr>

              {/* Response Time */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Tốc độ phản hồi</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-semibold text-emerald-700">
                    ~{tech.responseTimeMinutes} phút
                  </td>
                ))}
              </tr>

              {/* Base Price */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Chi phí dịch vụ từ</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-black text-blue-600 text-sm">
                    {formatCurrency(tech.basePrice)}
                  </td>
                ))}
              </tr>

              {/* Badges & Trust */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Huy hiệu uy tín</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tech.isVerified && <Badge variant="primary" size="sm">✓ Xác thực CCCD</Badge>}
                      {tech.isPro && <Badge variant="pro" size="sm">★ Pro</Badge>}
                      {tech.rating >= 4.9 && <Badge variant="warning" size="sm">Top Đánh Giá</Badge>}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Certifications */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Chứng chỉ nghề</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 text-[11px] text-slate-600">
                    {tech.certifications && tech.certifications.length > 0 ? (
                      tech.certifications.map((c, i) => <div key={i}>• {c}</div>)
                    ) : (
                      <span>Đã qua thẩm định tay nghề</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Lựa chọn</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 space-y-1.5">
                    <Button
                      size="sm"
                      className="w-full font-bold text-xs"
                      onClick={() => {
                        onClose();
                        onBookTech(tech);
                      }}
                      leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                    >
                      Đặt lịch ngay
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => {
                        onClose();
                        onChatTech(tech);
                      }}
                      leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                    >
                      Chat trước
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};

