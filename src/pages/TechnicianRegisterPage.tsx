import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { Technician, User } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export const TechnicianRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useNotification();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Thợ Điện Lạnh & Điều Hòa');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [basePrice, setBasePrice] = useState('150000');
  const [bio, setBio] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['dien-lanh']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoriesList = [
    { slug: 'dien-lanh', label: 'Điện lạnh / Điều hòa' },
    { slug: 'dien', label: 'Điện dân dụng' },
    { slug: 'nuoc', label: 'Cấp thoát nước' },
    { slug: 'may-giat', label: 'Sửa máy giặt' },
    { slug: 'tu-lanh', label: 'Sửa tủ lạnh' },
    { slug: 'khoa', label: 'Sửa khóa 24/7' },
    { slug: 'xe-may', label: 'Sửa xe máy lưu động' },
    { slug: 'do-gia-dung', label: 'Đồ gia dụng & Bếp từ' },
    { slug: 'lap-dat', label: 'Lắp đặt thiết bị' },
    { slug: 'nha-cua', label: 'Sơn & Sửa nhà' },
  ];

  const handleToggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(prev => prev.filter(s => s !== slug));
    } else {
      setSelectedCategories(prev => [...prev, slug]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTechId = `tech-${Date.now()}`;
      const newUserId = `user-tech-${Date.now()}`;

      const newUser: User = {
        id: newUserId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: 'technician',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        address: address.trim(),
        district,
        city,
        createdAt: new Date().toISOString(),
      };

      const newTech: Technician = {
        id: newTechId,
        userId: newUserId,
        name: name.trim(),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        title: title.trim() || 'Thợ kỹ thuật sửa chữa',
        rating: 5.0,
        reviewCount: 0,
        completedJobs: 0,
        completionRate: 100,
        experienceYears: Number(experienceYears) || 3,
        city,
        district,
        address: address.trim(),
        distanceKm: 1.0,
        basePrice: Number(basePrice) || 120000,
        isOnline: true,
        isAvailable: true,
        isVerified: true,
        isPro: true,
        badges: ['verified', 'pro'],
        certifications: ['Chứng chỉ Thẩm định Tay nghề FixNear'],
        bio: bio.trim() || 'Thợ kỹ thuật chuyên nghiệp, nhiệt tình, có trách nhiệm và uy tín cao.',
        categories: selectedCategories.length > 0 ? selectedCategories : ['dien'],
        servicesOffered: [
          { id: 's-init-1', name: 'Kiểm tra và xử lý sự cố cơ bản', price: Number(basePrice) || 150000, unit: 'lần' },
          { id: 's-init-2', name: 'Bảo dưỡng định kỳ', price: 200000, unit: 'máy' },
        ],
        workPhotos: [
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
        ],
        phone: phone.trim(),
        email: email.trim(),
        responseTimeMinutes: 10,
        joinedDate: new Date().toISOString().split('T')[0],
      };

      storageService.addUser(newUser);
      storageService.addTechnician(newTech);
      storageService.setCurrentUser(newUser);

      setIsSubmitting(false);
      success('Đăng ký đối tác thành công!', 'Chào mừng bạn gia nhập mạng lưới FixNear.');
      navigate('/technician/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Dành cho thợ & nhà cung cấp dịch vụ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Trở thành Đối tác Thợ FixNear
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          “Biến kỹ năng và tay nghề của bạn thành nguồn thu nhập ổn định với hàng ngàn khách hàng trong khu vực.”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thu nhập tăng 30-50%</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Chủ động nhận việc gần nhà</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Miễn phí 1 tháng gói Pro</span>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-card space-y-6"
      >
        <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
          Thông tin đối tác đăng ký
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Họ và tên thợ / Tên đội thợ *"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />

          <Input
            label="Số điện thoại liên hệ *"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email đăng nhập *"
            type="email"
            placeholder="tho.nguyenvana@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Tiêu đề chuyên môn chính *"
            placeholder="Ví dụ: Chuyên Gia Điện Lạnh & Điều Hòa Inverter"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Categories Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Chọn các lĩnh vực bạn có tay nghề nhận việc:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {categoriesList.map(cat => {
              const isSelected = selectedCategories.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleToggleCategory(cat.slug)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tỉnh / Thành phố:</label>
            <select
              value={city}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quận / Huyện:</label>
            <select
              value={district}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              {(city === 'Hà Nội'
                ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông']
                : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận']
              ).map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Số năm kinh nghiệm:"
            type="number"
            value={experienceYears}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceYears(e.target.value)}
            placeholder="5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Địa chỉ thường trú / Cửa hàng:"
            placeholder="Số nhà, đường, phường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
          />

          <Input
            label="Giá dịch vụ cơ bản tham khảo (VNĐ):"
            placeholder="150000"
            type="number"
            value={basePrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBasePrice(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Giới thiệu kinh nghiệm và cam kết tay nghề:
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            placeholder="Kinh nghiệm sửa các dòng máy nào, cam kết bảo hành, chứng chỉ nghề đã có..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold shadow-brand"
          >
            Đăng ký làm thợ FixNear ngay
          </Button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Hồ sơ thợ sẽ được kích hoạt ngay trong chế độ trải nghiệm và nhận việc lập tức.
          </p>
        </div>
      </form>

    </div>
  );
};

