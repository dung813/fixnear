import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Wrench, Home, ArrowLeft, ArrowRight, CheckCircle2, Camera } from 'lucide-react';

type RegisterRole = 'customer' | 'technician';

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
];

const SPECIALTIES = [
  { slug: 'dien', label: 'Điện dân dụng' },
  { slug: 'nuoc', label: 'Cấp thoát nước' },
  { slug: 'dien-lanh', label: 'Điện lạnh / Điều hòa' },
  { slug: 'may-giat', label: 'Sửa máy giặt' },
  { slug: 'tu-lanh', label: 'Sửa tủ lạnh' },
  { slug: 'khoa', label: 'Sửa khóa 24/7' },
  { slug: 'xe-may', label: 'Sửa xe máy lưu động' },
  { slug: 'do-gia-dung', label: 'Đồ gia dụng' },
  { slug: 'lap-dat', label: 'Lắp đặt thiết bị' },
  { slug: 'nha-cua', label: 'Sơn & Sửa nhà' },
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, registerTechnician } = useAuth();
  const { success, error } = useNotification();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);

  // Shared fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');

  // Customer-only field
  const [address, setAddress] = useState('');

  // Technician-only fields
  const [specialty, setSpecialty] = useState(SPECIALTIES[0].slug);
  const [experienceYears, setExperienceYears] = useState('3');
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);

  const handlePickPortrait = () => {
    setPortraitUrl(SAMPLE_AVATARS[Math.floor(Math.random() * SAMPLE_AVATARS.length)]);
  };

  const [isLoading, setIsLoading] = useState(false);

  const districtOptions = city === 'Hà Nội'
    ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông']
    : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7'];

  const handleContinue = () => {
    if (!selectedRole) {
      error('Vui lòng chọn một loại tài khoản để tiếp tục');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (selectedRole === 'technician') {
        const specialtyLabel = SPECIALTIES.find(s => s.slug === specialty)?.label || 'Sửa chữa tổng hợp';
        registerTechnician(
          {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password: password.trim(),
            role: 'technician',
            avatar: portraitUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            city,
            district,
          },
          {
            name: name.trim(),
            avatar: portraitUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            title: `Thợ ${specialtyLabel}`,
            rating: 5.0,
            reviewCount: 0,
            completedJobs: 0,
            completionRate: 100,
            experienceYears: Number(experienceYears) || 1,
            city,
            district,
            address: `${district}, ${city}`,
            distanceKm: 1.0,
            basePrice: 120000,
            isOnline: true,
            isAvailable: true,
            isVerified: false,
            isPro: false,
            badges: [],
            certifications: [],
            bio: `Thợ chuyên ${specialtyLabel.toLowerCase()}, sẵn sàng nhận việc tại khu vực ${district}.`,
            categories: [specialty],
            servicesOffered: [
              { id: 's-init-1', name: 'Kiểm tra và xử lý sự cố cơ bản', price: 120000, unit: 'lần' },
            ],
            workPhotos: [],
            phone: phone.trim(),
            email: email.trim(),
            responseTimeMinutes: 20,
            joinedDate: new Date().toISOString().split('T')[0],
            availableDates: Array.from({ length: 7 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i);
              return d.toISOString().split('T')[0];
            }),
          }
        );
        setIsLoading(false);
        success('Đăng ký đối tác thành công!', 'Chào mừng bạn gia nhập mạng lưới thợ FixNear.');
        navigate('/technician/dashboard');
      } else {
        register({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
          city,
          district,
          address: address.trim(),
        });
        setIsLoading(false);
        success('Đăng ký tài khoản thành công!');
        navigate('/customer/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className={`w-full space-y-6 ${step === 1 ? 'max-w-2xl' : 'max-w-md'}`}>

        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FIX<span className="text-blue-600">NEAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            {step === 1 ? 'Tạo tài khoản FixNear' : selectedRole === 'technician' ? 'Đăng ký tài khoản Thợ sửa chữa' : 'Đăng ký tài khoản Khách hàng'}
          </h2>
          <p className="text-xs text-slate-500">
            {step === 1
              ? 'Bạn muốn sử dụng FixNear với vai trò nào?'
              : 'Điền thông tin bên dưới để hoàn tất đăng ký'}
          </p>
        </div>

        {/* STEP 1: Role Picker */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`text-left p-6 rounded-3xl border-2 bg-white shadow-card transition-all ${
                  selectedRole === 'customer'
                    ? 'border-blue-600 ring-4 ring-blue-100 shadow-brand'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-card-hover'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  selectedRole === 'customer' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Tôi là Khách hàng</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Tìm kiếm và đặt lịch thợ sửa chữa nhanh chóng tại nhà
                </p>
                {selectedRole === 'customer' && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-3">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã chọn
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('technician')}
                className={`text-left p-6 rounded-3xl border-2 bg-white shadow-card transition-all ${
                  selectedRole === 'technician'
                    ? 'border-amber-500 ring-4 ring-amber-100 shadow-brand'
                    : 'border-slate-200 hover:border-amber-300 hover:shadow-card-hover'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  selectedRole === 'technician' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600'
                }`}>
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Tôi là Thợ sửa chữa</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Nhận việc, tăng thu nhập và kết nối với hàng ngàn khách hàng gần bạn
                </p>
                {selectedRole === 'technician' && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-3">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã chọn
                  </div>
                )}
              </button>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={handleContinue}
              disabled={!selectedRole}
              className="w-full font-bold shadow-brand"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Tiếp tục
            </Button>

            <div className="text-center text-xs text-slate-500">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
                Đăng nhập
              </Link>
            </div>
          </div>
        )}

        {/* STEP 2: Details form */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4"
          >
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại chọn vai trò
            </button>

            <Input
              label="Họ và tên của bạn *"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email *"
                type="email"
                placeholder="ban@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Số điện thoại *"
                placeholder="09xx xxx xxx"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                required
              />
            </div>

            <Input
              label="Mật khẩu *"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />

            {selectedRole === 'customer' ? (
              <Input
                label="Địa chỉ mặc định"
                placeholder="Số nhà, tòa chung cư, tên đường..."
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              />
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ảnh chân dung</label>
                  <div className="flex items-center gap-3">
                    {portraitUrl ? (
                      <img src={portraitUrl} alt="Ảnh chân dung" className="w-14 h-14 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                        <Camera className="w-5 h-5" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handlePickPortrait}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <Camera className="w-3.5 h-3.5" /> {portraitUrl ? 'Đổi ảnh' : 'Tải ảnh lên'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Chuyên môn chính *</label>
                  <select
                    value={specialty}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSpecialty(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                  >
                    {SPECIALTIES.map(s => (
                      <option key={s.slug} value={s.slug}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Khu vực hoạt động (Thành phố):</label>
                    <select
                      value={city}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCity(e.target.value as any);
                        setDistrict(e.target.value === 'Hà Nội' ? 'Cầu Giấy' : 'Quận 1');
                      }}
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
                      {districtOptions.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  label="Số năm kinh nghiệm *"
                  type="number"
                  min={0}
                  value={experienceYears}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceYears(e.target.value)}
                  placeholder="3"
                  required
                />
              </>
            )}

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold shadow-brand"
            >
              {selectedRole === 'technician' ? 'Đăng ký làm thợ FixNear' : 'Đăng ký tài khoản'}
            </Button>

            <div className="text-center pt-1 text-xs text-slate-500">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
                Đăng nhập
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
