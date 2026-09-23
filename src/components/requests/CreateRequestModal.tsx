import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address, ServiceCategory, ServiceRequest } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MapPin, Upload, Video } from 'lucide-react';

export interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRequest?: ServiceRequest | null;
}

const PREFERRED_TIME_OPTIONS = [
  'Càng sớm càng tốt',
  'Hôm nay (buổi chiều)',
  'Hôm nay (buổi tối)',
  'Ngày mai (buổi sáng)',
  'Tùy chọn khác',
];

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
];

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose, editRequest }) => {
  const { user } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('dien-lanh');
  const [description, setDescription] = useState('');
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('new');
  const [newCity, setNewCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [newDistrict, setNewDistrict] = useState('Cầu Giấy');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [preferredTime, setPreferredTime] = useState(PREFERRED_TIME_OPTIONS[0]);
  const [customTime, setCustomTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const districtOptions = newCity === 'Hà Nội'
    ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông', 'Bắc Từ Liêm']
    : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];

  useEffect(() => {
    if (!isOpen) return;
    setCategories(storageService.getCategories());
    if (user) {
      const addrs = storageService.getAddresses(user.id);
      setSavedAddresses(addrs);
      const defaultAddr = addrs.find(a => a.isDefault) || addrs[0];
      setSelectedAddressId(defaultAddr ? defaultAddr.id : 'new');
    }

    if (editRequest) {
      setSelectedCategorySlug(editRequest.categoryId);
      setDescription(editRequest.description);
      setMediaPreviews(editRequest.photos);
      setSelectedAddressId('new');
      setNewCity(editRequest.city);
      setNewDistrict(editRequest.district);
      setNewAddressLine(editRequest.address);
      if (PREFERRED_TIME_OPTIONS.includes(editRequest.preferredTime)) {
        setPreferredTime(editRequest.preferredTime);
        setCustomTime('');
      } else {
        setPreferredTime('Tùy chọn khác');
        setCustomTime(editRequest.preferredTime);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user, editRequest]);

  const resetForm = () => {
    setDescription('');
    setMediaPreviews([]);
    setNewAddressLine('');
    setPreferredTime(PREFERRED_TIME_OPTIONS[0]);
    setCustomTime('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const randomMedia = SAMPLE_MEDIA[Math.floor(Math.random() * SAMPLE_MEDIA.length)];
      setMediaPreviews(prev => [...prev, randomMedia]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usingSavedAddress = selectedAddressId !== 'new';
    const chosenAddress = savedAddresses.find(a => a.id === selectedAddressId);

    if (!description.trim()) {
      error('Vui lòng mô tả chi tiết sự cố bạn đang gặp phải');
      return;
    }
    if (usingSavedAddress && !chosenAddress) {
      error('Địa chỉ đã chọn không hợp lệ');
      return;
    }
    if (!usingSavedAddress && !newAddressLine.trim()) {
      error('Vui lòng nhập địa chỉ sửa chữa');
      return;
    }
    const finalTime = preferredTime === 'Tùy chọn khác' ? customTime.trim() : preferredTime;
    if (!finalTime) {
      error('Vui lòng chọn thời gian mong muốn thợ đến');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const catObj = categories.find(c => c.slug === selectedCategorySlug);
      const resolvedCity = usingSavedAddress ? chosenAddress!.city : newCity;
      const resolvedDistrict = usingSavedAddress ? chosenAddress!.district : newDistrict;
      const resolvedAddress = usingSavedAddress ? chosenAddress!.address : newAddressLine.trim();

      if (editRequest) {
        storageService.updateRequest(editRequest.id, {
          categoryId: selectedCategorySlug,
          categoryName: catObj?.name || editRequest.categoryName,
          title: `${catObj?.name || 'Yêu cầu sửa chữa'}: ${description.trim().slice(0, 60)}`,
          description: description.trim(),
          photos: mediaPreviews,
          city: resolvedCity,
          district: resolvedDistrict,
          address: resolvedAddress,
          preferredTime: finalTime,
        });
        setIsSubmitting(false);
        success('Cập nhật yêu cầu thành công!', 'Các thợ đang xem yêu cầu sẽ thấy thông tin mới nhất.');
        handleClose();
        return;
      }

      const newRequest: ServiceRequest = {
        id: `req-${Date.now()}`,
        customerId: user?.id || 'user-cust-1',
        customerName: user?.name || 'Người dùng mới',
        customerPhone: user?.phone || '',
        customerAvatar: user?.avatar || '',
        categoryId: selectedCategorySlug,
        categoryName: catObj?.name || 'Sửa chữa tổng hợp',
        title: `${catObj?.name || 'Yêu cầu sửa chữa'}: ${description.trim().slice(0, 60)}`,
        description: description.trim(),
        photos: mediaPreviews,
        city: resolvedCity,
        district: resolvedDistrict,
        address: resolvedAddress,
        preferredTime: finalTime,
        budget: 0,
        status: 'open',
        offersCount: 0,
        createdAt: new Date().toISOString(),
      };

      storageService.addRequest(newRequest);
      setIsSubmitting(false);
      success('Đăng yêu cầu thành công!', 'FixNear đang kết nối các thợ phù hợp gần bạn.');
      handleClose();
      navigate('/customer/dashboard');
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editRequest ? 'Chỉnh sửa yêu cầu sửa chữa' : 'Đăng yêu cầu sửa chữa'}
      description={
        editRequest
          ? 'Cập nhật lại thông tin để thợ báo giá chính xác hơn.'
          : 'Mô tả sự cố, các thợ quanh khu vực của bạn sẽ gửi báo giá nhanh chóng.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Loại dịch vụ *
          </label>
          <select
            value={selectedCategorySlug}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            2. Mô tả chi tiết vấn đề *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Mô tả cụ thể sự cố, dấu hiệu hỏng, tình trạng hiện tại..."
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            3. Đính kèm hình ảnh / video (Nếu có)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
            {mediaPreviews.map((url, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-slate-200">
                <img src={url} alt="Minh họa" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setMediaPreviews(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[9px]"
                >
                  ✕
                </button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-2 cursor-pointer text-slate-500 hover:text-blue-600 transition aspect-video">
              <Upload className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium text-center">Thêm ảnh/video</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleSimulateUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Video className="w-3 h-3" /> Hỗ trợ ảnh và video ngắn giúp thợ báo giá chính xác hơn.
          </p>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="block font-bold text-slate-700 uppercase tracking-wider">
            4. Địa điểm sửa chữa *
          </label>

          {savedAddresses.length > 0 && (
            <div className="space-y-1.5">
              {savedAddresses.map(addr => (
                <label
                  key={addr.id}
                  className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                    selectedAddressId === addr.id
                      ? 'border-blue-600 bg-blue-50/70'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="addressChoice"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-0.5"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-slate-800">{addr.label}</span>
                    <p className="text-[11px] text-slate-500 truncate">{addr.address}, {addr.district}, {addr.city}</p>
                  </div>
                </label>
              ))}
              <label
                className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                  selectedAddressId === 'new'
                    ? 'border-blue-600 bg-blue-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="addressChoice"
                  checked={selectedAddressId === 'new'}
                  onChange={() => setSelectedAddressId('new')}
                />
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> Nhập địa chỉ khác
                </span>
              </label>
            </div>
          )}

          {selectedAddressId === 'new' && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-500 mb-1 block">Tỉnh / Thành phố:</span>
                  <select
                    value={newCity}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setNewCity(e.target.value as any);
                      setNewDistrict(e.target.value === 'Hà Nội' ? 'Cầu Giấy' : 'Quận 1');
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  </select>
                </div>
                <div>
                  <span className="text-slate-500 mb-1 block">Quận / Huyện:</span>
                  <select
                    value={newDistrict}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewDistrict(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
                  >
                    {districtOptions.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                placeholder="Số nhà, tên tòa nhà, số ngõ/đường..."
                value={newAddressLine}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddressLine(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100">
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            5. Thời gian mong muốn thợ đến *
          </label>
          <select
            value={preferredTime}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPreferredTime(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {PREFERRED_TIME_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {preferredTime === 'Tùy chọn khác' && (
            <div className="mt-2">
              <Input
                placeholder="Ví dụ: Thứ 7 tuần này, sau 18h..."
                value={customTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomTime(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="submit" size="sm" isLoading={isSubmitting} className="font-bold px-6 shadow-brand">
            {editRequest ? 'Lưu thay đổi' : 'Đăng yêu cầu ngay'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
