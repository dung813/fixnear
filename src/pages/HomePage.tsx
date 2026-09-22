import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ServiceCategory, Technician, ServiceRequest } from '../types';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useCity } from '../context/CityContext';
import { TechCard } from '../components/technicians/TechCard';
import { BookingModal } from '../components/technicians/BookingModal';
import { CompareModal } from '../components/technicians/CompareModal';
import { SmartMatchingModal } from '../components/requests/SmartMatchingModal';
import { DigitizationTable } from '../components/home/DigitizationTable';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { 
  Search, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Award,
  Zap,
  Lock,
  Scale
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [featuredTechs, setFeaturedTechs] = useState<Technician[]>([]);
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<Technician | null>(null);

  // Comparison state
  const [compareList, setCompareList] = useState<Technician[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Smart matching state
  const [matchingRequest, setMatchingRequest] = useState<ServiceRequest | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { city: selectedCity, setCity: setSelectedCity } = useCity();
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả quận');

  useEffect(() => {
    setCategories(storageService.getCategories());
    setFeaturedTechs(storageService.getTechnicians().slice(0, 6));
    setRecentRequests(storageService.getRequests().slice(0, 4));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('cat', selectedCategory);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedDistrict && selectedDistrict !== 'Tất cả quận') params.set('district', selectedDistrict);
    navigate(`/technicians?${params.toString()}`);
  };

  const handleCompareToggle = (tech: Technician) => {
    if (compareList.some(t => t.id === tech.id)) {
      setCompareList(prev => prev.filter(t => t.id !== tech.id));
    } else {
      if (compareList.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 thợ cùng lúc.');
        return;
      }
      setCompareList(prev => [...prev, tech]);
    }
  };

  const quickTags = [
    'Điều hòa không lạnh',
    'Chập điện nhảy aptomat',
    'Thông tắc bồn cầu',
    'Sửa máy giặt kêu to',
    'Cứu hộ khóa 24/7',
    'Vá xe máy lưu động',
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nền tảng kết nối thợ sửa chữa thông minh</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            FixNear – Sửa chữa tại nhà
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
              Nhanh chóng &amp; Uy tín
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kết nối thợ giỏi gần bạn chỉ trong 30 giây. Báo giá minh bạch, thanh toán
            an&nbsp;toàn và bảo hành chu đáo.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/technicians">
              <Button size="lg" className="shadow-lg shadow-blue-600/30 text-sm sm:text-base">
                Tìm thợ ngay
              </Button>
            </Link>
            <a href="#services">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm sm:text-base">
                Bảng giá tham khảo
              </Button>
            </a>
          </div>

          {/* Large Hero Interactive Search Bar */}
          <div className="pt-6 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white text-slate-900 rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-2"
            >
              <div className="flex-[1.5] flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Tôi cần sửa gì? (ví dụ: Điều hòa không mát...)"
                  className="w-full bg-transparent text-sm placeholder-slate-400 focus:outline-none font-medium"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Wrench className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  aria-label="Chọn dịch vụ"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">Tất cả dịch vụ</option>
                  {categories.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value as any)}
                  aria-label="Chọn thành phố"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>

              <Button type="submit" size="md" className="py-3 md:py-2.5 px-6 shrink-0 font-bold">
                Tìm thợ
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-300">
              <span className="text-slate-400">Tìm kiếm phổ biến:</span>
              {quickTags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate(`/technicians?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">450+</div>
              <div className="text-xs text-slate-400 mt-0.5">Thợ đã xác minh CCCD</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">15.000+</div>
              <div className="text-xs text-slate-400 mt-0.5">Đơn hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 / 5.0</div>
              <div className="text-xs text-slate-400 mt-0.5">Đánh giá hài lòng</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">&lt; 15 phút</div>
              <div className="text-xs text-slate-400 mt-0.5">Thời gian có mặt</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICE CATEGORIES GRID */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Danh mục sửa chữa
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bạn đang cần sửa chữa gì?
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hơn 11 nhóm dịch vụ chuyên sâu với mạng lưới thợ tay nghề chuẩn sẵn sàng hỗ trợ.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 group"
          >
            Xem tất cả dịch vụ
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/technicians?cat=${cat.slug}`}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <CategoryIcon name={cat.slug} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-400">
                  {cat.technicianCount} thợ gần
                </span>
                <span className="font-bold text-blue-600">
                  Từ {formatCurrency(cat.startingPrice)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. HOW FIXNEAR WORKS (6-STEP DIGITAL CHAIN) */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Quy trình tiện lợi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Chuỗi Nghiệp Vụ Số Hóa Trọn Vẹn
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Khách đăng nhu cầu → FixNear Matching → Báo giá điện tử → Đặt lịch → Ký quỹ Escrow → Đánh giá.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'Đăng nhu cầu',
                desc: 'Mô tả sự cố, tải ảnh/video và khung giờ mong muốn.',
                icon: Wrench,
              },
              {
                step: '02',
                title: 'AI Matching',
                desc: 'Hệ thống tự động chấm điểm & gợi ý 3 thợ tối ưu nhất.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'So sánh & Báo giá',
                desc: 'Đối chiếu hồ sơ 2-3 thợ và nhận báo giá điện tử minh bạch.',
                icon: Scale,
              },
              {
                step: '04',
                title: 'Đặt lịch & Ký quỹ',
                desc: 'Chốt lịch thi công và tạm giữ tiền an toàn qua FixNear Escrow.',
                icon: Lock,
              },
              {
                step: '05',
                title: 'Theo dõi 4 bước',
                desc: 'Giám sát: Xác nhận → Khảo sát → Thi công → Hoàn thành.',
                icon: Clock,
              },
              {
                step: '06',
                title: 'Đánh giá & Bảo hành',
                desc: 'Nghiệm thu, mở khóa tiền cho thợ và kích hoạt bảo hành 6 tháng.',
                icon: ShieldCheck,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card relative overflow-hidden group hover:border-blue-400 transition flex flex-col justify-between"
                >
                  <div className="font-black text-2xl text-blue-600/20 mb-2">
                    {item.step}
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIGITIZATION MATRIX SHOWCASE (Truyền Thống vs Số Hóa) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitizationTable />
      </section>

      {/* 5. FEATURED TECHNICIANS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Đội ngũ xuất sắc
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thợ nổi bật & Được đánh giá cao
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Đã qua xác minh CCCD, chứng chỉ hành nghề và đạt đánh giá từ 4.8 sao trở lên.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareModalOpen(true)}
                className="font-bold text-xs"
                leftIcon={<Scale className="w-3.5 h-3.5 text-blue-600" />}
              >
                So sánh ({compareList.length} thợ)
              </Button>
            )}
            <Link
              to="/technicians"
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 group"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTechs.map(tech => (
            <TechCard
              key={tech.id}
              technician={tech}
              onQuickBook={t => setSelectedTechForBooking(t)}
              onCompareToggle={handleCompareToggle}
              isComparing={compareList.some(t => t.id === tech.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. LIVE SERVICE REQUESTS FEED WITH SMART MATCHING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Live Feed & AI Smart Matching
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">
                Khách hàng đang tìm thợ sửa chữa trong khu vực
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Bấm "AI Matching" để xem danh sách thợ được thuật toán đề xuất phù hợp nhất.
              </p>
            </div>
            <Link to="/post-request">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shrink-0">
                + Đăng việc của bạn ngay
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {recentRequests.map(req => (
              <div
                key={req.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-medium">
                      {req.categoryName}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {req.district}, {req.city}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{req.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Ngân sách: <strong className="text-amber-400">{formatCurrency(req.budget)}</strong>
                  </span>
                  <button
                    onClick={() => setMatchingRequest(req)}
                    className="text-amber-300 hover:text-white font-bold transition flex items-center gap-1 text-xs bg-amber-500/20 px-2.5 py-1 rounded-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    AI Matching Thợ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up">
          <span className="text-xs font-semibold">
            Đã chọn <strong className="text-amber-400">{compareList.length}</strong> thợ để đối chiếu
          </span>
          <Button
            size="sm"
            onClick={() => setCompareModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            leftIcon={<Scale className="w-3.5 h-3.5" />}
          >
            So sánh ngay
          </Button>
          <button
            onClick={() => setCompareList([])}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedTechForBooking}
        onClose={() => setSelectedTechForBooking(null)}
        technician={selectedTechForBooking}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        technicians={compareList}
        onRemoveTech={id => setCompareList(prev => prev.filter(t => t.id !== id))}
        onBookTech={t => requireAuth(() => setSelectedTechForBooking(t))}
        onChatTech={t => requireAuth(() => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        })}
      />

      {/* Smart Matching Modal */}
      <SmartMatchingModal
        isOpen={!!matchingRequest}
        onClose={() => setMatchingRequest(null)}
        request={matchingRequest}
        allTechnicians={featuredTechs}
        onSelectTech={t => requireAuth(() => setSelectedTechForBooking(t))}
        onChatTech={t => requireAuth(() => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        })}
      />

    </div>
  );
};

