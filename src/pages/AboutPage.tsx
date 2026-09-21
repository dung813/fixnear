import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Award, 
  Heart, 
  Users
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-300">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Câu chuyện khởi nghiệp FixNear
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Nền tảng kết nối dịch vụ sửa chữa địa phương đáng tin cậy
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          “Gặp vấn đề – Tìm thợ gần – Xử lý nhanh.” Chúng tôi xây dựng FixNear để giải quyết triệt để nỗi lo tìm thợ sửa chữa nhà cửa mỗi khi xảy ra sự cố đột xuất.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Sứ mệnh (Mission)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              “Giúp mọi gia đình, người thuê trọ và hộ kinh doanh tìm được đúng người thợ có tâm, có tay nghề để giải quyết nhanh chóng mọi vấn đề trục trặc xảy ra trong cuộc sống hàng ngày.”
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Tầm nhìn (Vision)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              “Trở thành nền tảng công nghệ số 1 tại Việt Nam trong lĩnh vực marketplace dịch vụ địa phương (Local Service Marketplace), chuẩn hóa quy trình báo giá và nâng cao đời sống cho đội ngũ thợ lành nghề.”
            </p>
          </div>

        </div>
      </section>

      {/* 5 Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Nguyên tắc hoạt động
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            5 Giá trị cốt lõi của FixNear
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Nhanh',
              desc: 'Thợ có mặt sau 15–30 phút tại nhà bạn khi phát sinh sự cố khẩn cấp.',
              icon: Zap,
              color: 'text-amber-500 bg-amber-50',
            },
            {
              title: 'Gần',
              desc: 'Tối ưu khoảng cách địa lý theo từng phường, quận quanh nơi bạn ở.',
              icon: MapPin,
              color: 'text-blue-500 bg-blue-50',
            },
            {
              title: 'Minh bạch',
              desc: 'Công khai bảng giá dịch vụ và chi phí linh kiện, không phí ẩn.',
              icon: Award,
              color: 'text-emerald-500 bg-emerald-50',
            },
            {
              title: 'Tin cậy',
              desc: '100% hồ sơ thợ được đối soát CCCD, chứng chỉ và đánh giá thực tế.',
              icon: ShieldCheck,
              color: 'text-indigo-500 bg-indigo-50',
            },
            {
              title: 'Thuận tiện',
              desc: 'Thao tác chỉ 1 chạm: Đăng việc, nhận báo giá, chat và đặt lịch hẹn.',
              icon: Users,
              color: 'text-rose-500 bg-rose-50',
            },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center space-y-2.5"
              >
                <div className={`w-10 h-10 rounded-xl ${val.color} flex items-center justify-center mx-auto`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{val.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Bạn muốn đồng hành cùng FixNear?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Dù bạn là khách hàng cần tìm thợ hay là người thợ muốn nâng cao thu nhập, FixNear luôn sẵn sàng phục vụ.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/technicians">
              <Button size="lg">Tìm thợ gần bạn ngay</Button>
            </Link>
            <Link to="/technician/register">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Đăng ký làm đối tác thợ
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

