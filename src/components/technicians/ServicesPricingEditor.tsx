import React, { useState } from 'react';
import { ServiceCategory, ServiceItem, Technician } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Trash2, Wrench, Save } from 'lucide-react';

export interface ServicesPricingEditorProps {
  technician: Technician;
  categories: ServiceCategory[];
  onSaved?: () => void;
}

export const ServicesPricingEditor: React.FC<ServicesPricingEditorProps> = ({
  technician,
  categories,
  onSaved,
}) => {
  const { success } = useNotification();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(technician.categories);
  const [services, setServices] = useState<ServiceItem[]>(technician.servicesOffered);
  const [isSaving, setIsSaving] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const addService = () => {
    setServices(prev => [...prev, { id: `svc-${Date.now()}`, name: '', price: 0, unit: 'lần' }]);
  };
  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };
  const removeService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      storageService.updateTechnician(technician.id, {
        categories: selectedCategories.length > 0 ? selectedCategories : technician.categories,
        servicesOffered: services.filter(s => s.name.trim()),
      });
      setIsSaving(false);
      success('Đã lưu cấu hình dịch vụ & bảng giá!');
      onSaved?.();
    }, 400);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-600" />
          Lĩnh vực nhận sửa chữa
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {categories.map(cat => {
            const isSelected = selectedCategories.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => toggleCategory(cat.slug)}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Bảng giá dịch vụ tham khảo</h3>
          <button type="button" onClick={addService} className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Thêm dịch vụ
          </button>
        </div>

        <div className="space-y-2">
          {services.map(svc => (
            <div key={svc.id} className="grid grid-cols-12 gap-1.5 items-center text-xs">
              <input
                value={svc.name}
                onChange={e => updateService(svc.id, { name: e.target.value })}
                placeholder="Tên dịch vụ (VD: Vệ sinh điều hòa treo tường)"
                className="col-span-6 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              />
              <input
                type="number"
                value={svc.price || ''}
                onChange={e => updateService(svc.id, { price: Number(e.target.value) || 0 })}
                placeholder="Giá (VNĐ)"
                className="col-span-3 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              />
              <input
                value={svc.unit}
                onChange={e => updateService(svc.id, { unit: e.target.value })}
                placeholder="Đơn vị"
                className="col-span-2 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              />
              <button type="button" onClick={() => removeService(svc.id)} className="col-span-1 text-rose-500 flex justify-center">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-xs text-slate-400 italic">Chưa có dịch vụ nào — bấm "Thêm dịch vụ" để bắt đầu.</p>
          )}
        </div>

        {services.length > 0 && (
          <p className="text-[11px] text-slate-400">
            Giá thấp nhất hiện tại: {formatCurrency(Math.min(...services.filter(s => s.price > 0).map(s => s.price), technician.basePrice))}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />} className="font-bold">
          Lưu cấu hình
        </Button>
      </div>
    </div>
  );
};
