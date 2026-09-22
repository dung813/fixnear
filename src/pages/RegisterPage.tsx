import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Wrench } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
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
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FIX<span className="text-blue-600">NEAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">Tạo tài khoản khách hàng</h2>
          <p className="text-xs text-slate-500">
            Tìm thợ gần nhà, theo dõi tiến độ sửa chữa và bảo hành dịch vụ
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4"
        >
          <Input
            label="Họ và tên của bạn *"
            placeholder="Hoàng Thùy Linh"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />

          <Input
            label="Địa chỉ Email *"
            type="email"
            placeholder="linh.hoang@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Số điện thoại liên hệ *"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thành phố:</label>
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
                  : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7']
                ).map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Địa chỉ nhà chi tiết:"
            placeholder="Số nhà, tòa chung cư, tên đường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold shadow-brand"
          >
            Đăng ký tài khoản
          </Button>

          <div className="text-center pt-2 text-xs text-slate-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Đăng nhập
            </Link>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/technician/register"
              className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 py-1.5 px-3 rounded-lg inline-block transition"
            >
              Bạn là thợ sửa chữa? Đăng ký đối tác tại đây
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

