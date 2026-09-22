import React, { useState } from 'react';
import { Technician } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../common/Button';
import { ShieldCheck, ShieldAlert, Upload, IdCard, Award } from 'lucide-react';

export interface KycVerificationPanelProps {
  technician: Technician;
  onChange?: () => void;
}

const SAMPLE_DOC = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80';

export const KycVerificationPanel: React.FC<KycVerificationPanelProps> = ({ technician, onChange }) => {
  const { success } = useNotification();

  const [idFrontUrl, setIdFrontUrl] = useState(technician.kycDocuments?.idFrontUrl);
  const [idBackUrl, setIdBackUrl] = useState(technician.kycDocuments?.idBackUrl);
  const [certificateUrl, setCertificateUrl] = useState(technician.kycDocuments?.certificateUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kycStatus = technician.kycStatus ?? (technician.isVerified ? 'verified' : 'unverified');
  const canSubmit = !!idFrontUrl && !!idBackUrl && !!certificateUrl && kycStatus !== 'verified';

  const handleSubmitVerification = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    storageService.updateTechnician(technician.id, {
      kycStatus: 'pending',
      kycDocuments: { idFrontUrl, idBackUrl, certificateUrl },
    });
    onChange?.();

    // Mock KYC review: auto-approve shortly after submission for demo purposes.
    setTimeout(() => {
      storageService.updateTechnician(technician.id, {
        kycStatus: 'verified',
        isVerified: true,
        badges: technician.badges.includes('verified') ? technician.badges : [...technician.badges, 'verified'],
      });
      setIsSubmitting(false);
      success('Xác minh thành công!', 'Hồ sơ của bạn đã có huy hiệu "Đã xác minh" trên sàn FixNear.');
      onChange?.();
    }, 1800);
  };

  const DocSlot: React.FC<{ label: string; value?: string; onUpload: () => void }> = ({ label, value, onUpload }) => (
    <div className="space-y-1.5">
      <span className="text-[11px] font-semibold text-slate-600">{label}</span>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onUpload}
            className="absolute bottom-1 right-1 text-[10px] font-semibold bg-white/90 px-2 py-1 rounded-lg"
          >
            Đổi ảnh
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition"
        >
          <Upload className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium">Tải ảnh lên</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <IdCard className="w-4 h-4 text-blue-600" />
          Xác minh tài khoản (KYC)
        </h3>
        {kycStatus === 'verified' ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Đã xác minh
          </span>
        ) : kycStatus === 'pending' ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" /> Đang xác minh...
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" /> Chưa xác minh
          </span>
        )}
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Tải lên CCCD/CMND 2 mặt và chứng chỉ nghề (nếu có) để nhận huy hiệu <strong>"Đã xác minh"</strong>, tăng độ tin cậy khi khách hàng tìm thợ.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <DocSlot label="CCCD mặt trước" value={idFrontUrl} onUpload={() => setIdFrontUrl(SAMPLE_DOC)} />
        <DocSlot label="CCCD mặt sau" value={idBackUrl} onUpload={() => setIdBackUrl(SAMPLE_DOC)} />
        <DocSlot label="Chứng chỉ nghề" value={certificateUrl} onUpload={() => setCertificateUrl(SAMPLE_DOC)} />
      </div>

      <div className="flex justify-end pt-2 border-t border-slate-100">
        <Button
          onClick={handleSubmitVerification}
          disabled={!canSubmit}
          isLoading={isSubmitting}
          leftIcon={<Award className="w-4 h-4" />}
          className="font-bold"
        >
          {kycStatus === 'verified' ? 'Đã xác minh' : 'Gửi yêu cầu xác minh'}
        </Button>
      </div>
    </div>
  );
};
