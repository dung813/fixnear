import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ServiceCategory } from '../types';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCategories(storageService.getCategories());
  }, []);

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.popularServices.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Danh mục dịch vụ FixNear
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">
          Tất cả dịch vụ sửa chữa tại nhà
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
          Mạng lưới thợ kỹ thuật đa lĩnh vực, có mặt sau 15–30 phút. Báo giá công khai trước khi sửa.
        </p>

        {/* Search input */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo loại dịch vụ (ví dụ: điều hòa, tủ lạnh, khóa...)"
            className="w-full bg-white text-slate-900 text-sm rounded-2xl pl-11 pr-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
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
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Popular Sub-services */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                  Các hạng mục phổ biến:
                </span>
                {cat.popularServices.map((sub: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Giá từ</span>
                <span className="text-sm font-extrabold text-blue-600">
                  {formatCurrency(cat.startingPrice)}
                </span>
              </div>

              <Link to={`/technicians?cat=${cat.slug}`}>
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Tìm thợ
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

