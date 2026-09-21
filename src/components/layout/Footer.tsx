import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                FIX<span className="text-blue-500">NEAR</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 font-medium italic">
              “Gặp vấn đề – Tìm thợ gần – Xử lý nhanh.”
            </p>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Nền tảng công nghệ kết nối trực tiếp khách hàng có nhu cầu sửa chữa tại nhà với mạng lưới thợ tay nghề cao, đã qua xác minh danh tính và năng lực tại Việt Nam.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Hotline hỗ trợ: 0912 345 678 (8:00 - 21:00)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>contact@fixnear.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Về FixNear */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">FixNear</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/technicians" className="hover:text-white transition">Danh bạ thợ</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Tất cả dịch vụ</Link>
              </li>
              <li>
                <Link to="/post-request" className="hover:text-white transition">Đăng việc tìm thợ</Link>
              </li>
              <li>
                <a href="#business-model" className="hover:text-white transition">Mô hình kinh doanh</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ phổ biến */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch vụ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/technicians?cat=dien-lanh" className="hover:text-white transition">Sửa Điện lạnh / Điều hòa</Link>
              </li>
              <li>
                <Link to="/technicians?cat=dien" className="hover:text-white transition">Sửa chữa Điện dân dụng</Link>
              </li>
              <li>
                <Link to="/technicians?cat=nuoc" className="hover:text-white transition">Thông tắc & Sửa Nước</Link>
              </li>
              <li>
                <Link to="/technicians?cat=may-giat" className="hover:text-white transition">Sửa Máy giặt & Tủ lạnh</Link>
              </li>
              <li>
                <Link to="/technicians?cat=khoa" className="hover:text-white transition">Sửa khóa 24/7</Link>
              </li>
              <li>
                <Link to="/technicians?cat=xe-may" className="hover:text-white transition">Cứu hộ Xe máy</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Đối tác & Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Đối tác & Hỗ trợ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/technician/register" className="text-blue-400 font-semibold hover:text-blue-300 transition">
                  Trở thành đối tác thợ
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">Câu hỏi thường gặp (FAQ)</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Quy chế hoạt động</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Chính sách bảo hành & an toàn</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Bảo mật thông tin</Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-[11px] text-emerald-400 border border-slate-700">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Thợ được xác minh ID</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FIXNEAR Platform. Dự án Khởi nghiệp Đổi mới Sáng tạo Phát triển Web.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Phát triển với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> tại Việt Nam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

