import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ServiceCategory } from '../types';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Button } from '../components/common/Button';
import { CategoryPriceModal } from '../components/services/CategoryPriceModal';
import { formatCurrency } from '../utils/formatters';
import { Search, CheckCircle2, ArrowRight, Tag } from 'lucide-react';

type TabKey = 'all' | 'dien-nuoc' | 'dien-lanh' | 'gia-dung' | 'khoa-cuu-ho';

const TAB_GROUPS: { key: TabKey; label: string; slugs: string[] }[] = [
  { key: 'all', label: 'Tất cả', slugs: [] },
  { key: 'dien-nuoc', label: 'Điện - Nước', slugs: ['dien', 'nuoc'] },
  { key: 'dien-lanh', label: 'Điện lạnh', slugs: ['dien-lanh', 'tu-lanh', 'may-giat'] },
  { key: 'gia-dung', label: 'Gia dụng', slugs: ['do-gia-dung', 'lap-dat', 'nha-cua', 'khac'] },
  { key: 'khoa-cuu-ho', label: 'Khóa & Cứu hộ', slugs: ['khoa', 'xe-may'] },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [priceModalCategory, setPriceModalCategory] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    setCategories(storageService.getCategories());
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const activeGroup = TAB_GROUPS.find(g => g.key === activeTab) || TAB_GROUPS[0];

  const filteredCategories = categories
    .filter(c => c.isActive !== false)
    .filter(c => activeGroup.slugs.length === 0 || activeGroup.slugs.includes(c.slug))
    .filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.popularServices.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const goToTechnicians = (slug: string) => {
    navigate(`/technicians?category=${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Danh mục dịch vụ FixNear
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">
          Tất cả dịch vụ sửa chữa tại nhà
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
          Mạng lưới thợ kỹ thuật đa lĩnh vực, có mặt sau 15–30 phút.
          Báo giá công khai trước khi&nbsp;sửa.
        </p>

        {/* Search input + button */}
        <form onSubmit={handleSearchSubmit} className="mt-6 max-w-lg mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              placeholder="Tìm theo loại dịch vụ (ví dụ: điều hòa, tủ lạnh, khóa...)"
              className="w-full bg-white text-slate-900 text-sm rounded-2xl pl-11 pr-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <Button type="submit" size="lg" className="font-bold shadow-lg shrink-0">
            Tìm kiếm
          </Button>
        </form>
      </div>

      {/* Quick category tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {TAB_GROUPS.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300"
            >
              <div className="p-6">
                <button
                  type="button"
                  onClick={() => goToTechnicians(cat.slug)}
                  className="flex items-center gap-3 mb-4 text-left w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
                    <CategoryIcon name={cat.slug} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600">
                      {cat.technicianCount} thợ sẵn sàng
                    </span>
                  </div>
                </button>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Popular Sub-services */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                    Các hạng mục phổ biến:
                  </span>
                  {cat.popularServices.map((sub: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToTechnicians(cat.slug)}
                      className="flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600 transition text-left w-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 block">Giá từ</span>
                    <button
                      type="button"
                      onClick={() => setPriceModalCategory(cat)}
                      title="Xem chi tiết giá"
                      className="text-slate-400 hover:text-blue-600 transition"
                    >
                      <Tag className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-extrabold text-blue-600">
                    {formatCurrency(cat.startingPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPriceModalCategory(cat)}
                    className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition underline decoration-dotted"
                  >
                    Xem chi tiết giá
                  </button>
                  <Button
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => goToTechnicians(cat.slug)}
                  >
                    Tìm thợ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-card space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-slate-800">Không tìm thấy danh mục phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thử từ khóa khác hoặc chọn lại nhóm dịch vụ ở thanh tab phía trên.
          </p>
          <Link to="/post-request">
            <Button size="sm" variant="outline">Đăng yêu cầu tùy chỉnh</Button>
          </Link>
        </div>
      )}

      <CategoryPriceModal
        isOpen={!!priceModalCategory}
        onClose={() => setPriceModalCategory(null)}
        category={priceModalCategory}
        onFindTech={goToTechnicians}
      />

    </div>
  );
};
