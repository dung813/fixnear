import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { ServiceCategory, ServiceRequest } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { 
  Upload, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const PostRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('dien-lanh');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState(user?.address || 'Căn 1502 Discovery Complex, 302 Cầu Giấy');
  const [phone, setPhone] = useState(user?.phone || '0912 333 444');
  const [preferredTime, setPreferredTime] = useState('Hôm nay (Càng sớm càng tốt)');
  const [budget, setBudget] = useState<string>('300000');
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [createdRequestId, setCreatedRequestId] = useState<string>('');

  useEffect(() => {
    setCategories(storageService.getCategories());
  }, []);

  const districtOptions = city === 'Hà Nội'
    ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông', 'Bắc Từ Liêm']
    : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !address.trim() || !phone.trim()) {
      error('Vui lòng điền đầy đủ các trường thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const catObj = categories.find(c => c.slug === selectedCategorySlug);
      const newReqId = `req-${Date.now()}`;

      const newRequest: ServiceRequest = {
        id: newReqId,
        customerId: user?.id || 'user-cust-1',
        customerName: user?.name || 'Khách hàng FixNear',
        customerPhone: phone,
        customerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        categoryId: selectedCategorySlug,
        categoryName: catObj?.name || 'Sửa chữa tổng hợp',
        title: title.trim(),
        description: description.trim(),
        photos: photoPreviews,
        city,
        district,
        address: address.trim(),
        preferredTime,
        budget: Number(budget) || 0,
        status: 'open',
        offersCount: 0,
        createdAt: new Date().toISOString(),
      };

      storageService.addRequest(newRequest);
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
      setCreatedRequestId(newReqId);
      success('Đăng yêu cầu thành công!', 'FixNear đang kết nối các thợ phù hợp gần bạn.');
    }, 800);
  };

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const samplePhotos = [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80'
      ];
      const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
      setPhotoPreviews(prev => [...prev, randomPhoto]);
    }
  };

  if (isSuccessSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-scale-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Yêu cầu của bạn đã được đăng thành công!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            FixNear đang gửi thông báo tới các thợ uy tín tại khu vực <strong className="text-slate-900">{district}, {city}</strong>. Bạn sẽ nhận được báo giá và liên hệ trong ít phút.
          </p>
        </div>

        <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 max-w-md mx-auto text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Mã yêu cầu:</span>
            <span className="font-bold text-blue-700">{createdRequestId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tiêu đề:</span>
            <span className="font-bold text-slate-800 truncate max-w-[200px]">{title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Trạng thái:</span>
            <span className="font-bold text-emerald-600">● Đang tìm thợ gần</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button onClick={() => navigate('/customer/dashboard')}>
            Vào Bảng điều khiển theo dõi
          </Button>
          <Button variant="outline" onClick={() => navigate('/technicians')}>
            Chủ động tìm thợ trong danh bạ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Miễn phí đăng việc 100%
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Đăng yêu cầu sửa chữa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Mô tả sự cố bạn đang gặp phải, các thợ quanh khu vực của bạn sẽ gửi báo giá nhanh chóng.
        </p>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Loại dịch vụ bạn cần sửa chữa *
          </label>
          <select
            value={selectedCategorySlug}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>
                {c.name} — ({c.technicianCount} thợ sẵn sàng)
              </option>
            ))}
          </select>
        </div>

        <Input
          label="2. Tiêu đề ngắn gọn về sự cố *"
          placeholder="Ví dụ: Điều hòa Daikin phòng khách không mát chỉ phả gió nóng"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            3. Mô tả chi tiết vấn đề bạn đang gặp phải *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Mô tả cụ thể: Dấu hiệu hỏng, phát ra tiếng kêu thế nào, đã xảy ra bao lâu, tình trạng máy hiện tại..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            4. Hình ảnh hoặc video sự cố (Giúp thợ báo giá chính xác hơn)
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {photoPreviews.map((url, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200">
                <img src={url} alt="Minh họa" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreviews(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[10px]"
                >
                  ✕
                </button>
              </div>
            ))}

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 cursor-pointer text-slate-500 hover:text-blue-600 transition aspect-video">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium text-center">Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            5. Địa điểm sửa chữa *
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-slate-500 mb-1 block">Tỉnh / Thành phố:</span>
              <select
                value={city}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCity(e.target.value as any);
                  setDistrict(e.target.value === 'Hà Nội' ? 'Cầu Giấy' : 'Quận 1');
                }}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div>
              <span className="text-xs text-slate-500 mb-1 block">Quận / Huyện:</span>
              <select
                value={district}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              >
                {districtOptions.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            placeholder="Số nhà, tên tòa nhà, số ngõ/đường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <Input
            label="6. Thời gian mong muốn thợ đến:"
            placeholder="Ví dụ: Hôm nay 15:00, hoặc Tối sau 18h"
            value={preferredTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPreferredTime(e.target.value)}
            required
          />

          <Input
            label="7. Mức ngân sách dự kiến (VNĐ):"
            placeholder="300000"
            type="number"
            value={budget}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBudget(e.target.value)}
            helperText="Để trống nếu muốn thương lượng trực tiếp"
          />
        </div>

        <div className="pt-3 border-t border-slate-100">
          <Input
            label="Số điện thoại liên hệ nhận báo giá *"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            placeholder="09xx xxx xxx"
            required
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold shadow-brand"
          >
            Đăng yêu cầu ngay (Tìm thợ gần)
          </Button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Bằng việc gửi yêu cầu, bạn đồng ý với Quy chế hoạt động và Điều khoản bảo mật của FixNear.
          </p>
        </div>

      </form>

    </div>
  );
};

