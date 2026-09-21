import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Technician, ServiceCategory } from '../types';
import { TechCard } from '../components/technicians/TechCard';
import { BookingModal } from '../components/technicians/BookingModal';
import { CompareModal } from '../components/technicians/CompareModal';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  ArrowUpDown,
  Scale
} from 'lucide-react';

export const FindTechniciansPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<Technician | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compare state
  const [compareList, setCompareList] = useState<Technician[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Filter States initialized from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'Tất cả');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'Tất cả');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('ratingDesc');

  useEffect(() => {
    setTechnicians(storageService.getTechnicians());
    setCategories(storageService.getCategories());
  }, []);

  // Update query state if URL params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    const city = searchParams.get('city');
    const dist = searchParams.get('district');
    if (q !== null) setQuery(q);
    if (cat !== null) setSelectedCategory(cat);
    if (city !== null) setSelectedCity(city);
    if (dist !== null) setSelectedDistrict(dist);
  }, [searchParams]);

  // District options based on city
  const districtOptions = useMemo(() => {
    if (selectedCity === 'Hà Nội') {
      return ['Tất cả', 'Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông'];
    }
    if (selectedCity === 'TP. Hồ Chí Minh') {
      return ['Tất cả', 'Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];
    }
    return ['Tất cả'];
  }, [selectedCity]);

  // Filtered & Sorted Technicians
  const filteredTechs = useMemo(() => {
    return technicians
      .filter((t: Technician) => {
        // Query search
        if (query) {
          const q = query.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchBio = t.bio.toLowerCase().includes(q);
          const matchServices = t.servicesOffered.some(s => s.name.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchBio && !matchServices) return false;
        }

        // Category
        if (selectedCategory && !t.categories.includes(selectedCategory)) {
          return false;
        }

        // City
        if (selectedCity !== 'Tất cả' && t.city !== selectedCity) {
          return false;
        }

        // District
        if (selectedDistrict !== 'Tất cả' && t.district !== selectedDistrict) {
          return false;
        }

        // Distance
        if (t.distanceKm > maxDistance) {
          return false;
        }

        // Rating
        if (minRating > 0 && t.rating < minRating) {
          return false;
        }

        // Price
        if (t.basePrice > maxPrice) {
          return false;
        }

        // Only Available / Online
        if (onlyAvailable && !t.isAvailable) {
          return false;
        }

        // Only Verified
        if (onlyVerified && !t.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a: Technician, b: Technician) => {
        if (sortBy === 'distanceAsc') return a.distanceKm - b.distanceKm;
        if (sortBy === 'ratingDesc') return b.rating - a.rating;
        if (sortBy === 'jobsDesc') return b.completedJobs - a.completedJobs;
        if (sortBy === 'priceAsc') return a.basePrice - b.basePrice;
        return 0;
      });
  }, [
    technicians,
    query,
    selectedCategory,
    selectedCity,
    selectedDistrict,
    maxDistance,
    minRating,
    maxPrice,
    onlyAvailable,
    onlyVerified,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedCity('Tất cả');
    setSelectedDistrict('Tất cả');
    setMaxDistance(10);
    setMinRating(0);
    setMaxPrice(500000);
    setOnlyAvailable(false);
    setOnlyVerified(false);
    setSortBy('ratingDesc');
    setSearchParams({});
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tìm & So sánh thợ sửa chữa gần bạn
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tìm thấy <strong className="text-blue-600 font-bold">{filteredTechs.length}</strong> thợ phù hợp theo tiêu chí
          </p>
        </div>

        {/* Quick search & Mobile filter toggle */}
        <div className="w-full md:w-auto flex items-center gap-2">
          {compareList.length > 0 && (
            <Button
              size="sm"
              onClick={() => setCompareModalOpen(true)}
              className="font-bold text-xs bg-indigo-600 hover:bg-indigo-700"
              leftIcon={<Scale className="w-3.5 h-3.5" />}
            >
              So sánh ({compareList.length})
            </Button>
          )}

          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Tên thợ, chuyên môn, sự cố..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filter + Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Filters */}
        <aside
          className={`md:block md:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-6 shrink-0 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Bộ lọc nâng cao
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Đặt lại
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Loại dịch vụ
            </label>
            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* City & District Filter */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Thành phố
              </label>
              <select
                value={selectedCity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedCity(e.target.value);
                  setSelectedDistrict('Tất cả');
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="Tất cả">Tất cả tỉnh thành</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quận / Huyện
              </label>
              <select
                value={selectedDistrict}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                {districtOptions.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">Khoảng cách tối đa</span>
              <span className="text-blue-600">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={maxDistance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 km</span>
              <span>15 km</span>
            </div>
          </div>

          {/* Rating filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Đánh giá tối thiểu
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Tất cả', val: 0 },
                { label: '4.5 ★', val: 4.5 },
                { label: '4.8 ★', val: 4.8 },
                { label: '5.0 ★', val: 4.9 },
              ].map(r => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setMinRating(r.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    minRating === r.val
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">Giá khởi điểm từ</span>
              <span className="text-blue-600">{formatCurrency(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={80000}
              max={500000}
              step={20000}
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Checkbox Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-medium text-slate-700">
                Đang sẵn sàng nhận việc
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-medium text-slate-700">
                Chỉ thợ đã xác minh danh tính
              </span>
            </label>
          </div>
        </aside>

        {/* Results Column */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Sorting Bar */}
          <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-card flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Sắp xếp kết quả theo:
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ratingDesc">Đánh giá cao nhất</option>
                <option value="distanceAsc">Gần bạn nhất</option>
                <option value="jobsDesc">Nhiều đơn hoàn thành nhất</option>
                <option value="priceAsc">Giá khởi điểm thấp nhất</option>
              </select>
            </div>
          </div>

          {/* Technicians List Grid */}
          {filteredTechs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTechs.map((tech: Technician) => (
                <TechCard
                  key={tech.id}
                  technician={tech}
                  onQuickBook={t => setSelectedTechForBooking(t)}
                  onCompareToggle={handleCompareToggle}
                  isComparing={compareList.some(t => t.id === tech.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-card space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-800">
                Không tìm thấy thợ phù hợp
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy thử mở rộng bán kính khoảng cách hoặc bỏ bớt các tiêu chí lọc để tìm được nhiều thợ hơn.
              </p>
              <Button size="sm" variant="outline" onClick={handleResetFilters}>
                Đặt lại bộ lọc
              </Button>
            </div>
          )}

        </div>

      </div>

      {/* Floating Compare Toolbar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up">
          <span className="text-xs font-semibold">
            Đã chọn <strong className="text-amber-400">{compareList.length}</strong> thợ để so sánh
          </span>
          <Button
            size="sm"
            onClick={() => setCompareModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            leftIcon={<Scale className="w-3.5 h-3.5" />}
          >
            Bật bảng so sánh
          </Button>
          <button
            onClick={() => setCompareList([])}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Bỏ chọn
          </button>
        </div>
      )}

      {/* Quick Booking Modal */}
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
        onBookTech={t => setSelectedTechForBooking(t)}
        onChatTech={t => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        }}
      />

    </div>
  );
};

