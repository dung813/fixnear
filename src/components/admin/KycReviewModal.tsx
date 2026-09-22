import React from 'react';
import { Technician } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { CheckCircle2, XCircle, IdCard } from 'lucide-react';

export interface KycReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  technician: Technician | null;
  onDecided?: () => void;
}

export const KycReviewModal: React.FC<KycReviewModalProps> = ({ isOpen, onClose, technician, onDecided }) => {
  const { success } = useNotification();

  if (!technician) return null;
  const docs = technician.kycDocuments;

  const handleApprove = () => {
    storageService.updateTechnician(technician.id, {
      isVerified: true,
      kycStatus: 'verified',
      badges: technician.badges.includes('verified') ? technician.badges : [...technician.badges, 'verified'],
    });
    success('Đã duyệt xác minh hồ sơ thợ!', `${technician.name} đã nhận huy hiệu "Đã xác minh".`);
    onClose();
    onDecided?.();
  };

  const handleReject = () => {
    storageService.updateTechnician(technician.id, {
      isVerified: false,
      kycStatus: 'unverified',
    });
    success('Đã từ chối hồ sơ xác minh.', 'Thợ cần nộp lại giấy tờ hợp lệ để xác minh lại.');
    onClose();
    onDecided?.();
  };

  const DocPreview: React.FC<{ label: string; url?: string }> = ({ label, url }) => (
    <div className="space-y-1.5">
      <span className="text-[11px] font-semibold text-slate-600">{label}</span>
      {url ? (
        <img src={url} alt={label} className="w-full aspect-video object-cover rounded-xl border border-slate-200" />
      ) : (
        <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-[11px]">
          Chưa tải lên
        </div>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xét duyệt hồ sơ xác minh (KYC)"
      description={`${technician.name} - ${technician.title}`}
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <Avatar src={technician.avatar} name={technician.name} size="md" />
          <div>
            <p className="font-bold text-slate-900">{technician.name}</p>
            <p className="text-[11px] text-slate-500">{technician.phone} • {technician.district}, {technician.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DocPreview label="CCCD mặt trước" url={docs?.idFrontUrl} />
          <DocPreview label="CCCD mặt sau" url={docs?.idBackUrl} />
          <DocPreview label="Chứng chỉ nghề" url={docs?.certificateUrl} />
        </div>

        {!docs?.idFrontUrl && !docs?.idBackUrl && !docs?.certificateUrl && (
          <p className="text-slate-400 italic flex items-center gap-1.5">
            <IdCard className="w-3.5 h-3.5" /> Thợ chưa nộp bất kỳ giấy tờ xác minh nào.
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            leftIcon={<XCircle className="w-4 h-4" />}
            onClick={handleReject}
          >
            Từ chối
          </Button>
          <Button leftIcon={<CheckCircle2 className="w-4 h-4" />} onClick={handleApprove} className="font-bold">
            Duyệt xác minh
          </Button>
        </div>
      </div>
    </Modal>
  );
};
