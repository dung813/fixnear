import React, { useState } from 'react';
import { ServiceCategory } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Pencil, Trash2, Layers, Power } from 'lucide-react';

export interface CategoryManagerProps {
  categories: ServiceCategory[];
  onChange: () => void;
}

interface CategoryFormState {
  id?: string;
  name: string;
  description: string;
  startingPrice: string;
  minPrice: string;
  maxPrice: string;
}

const emptyForm: CategoryFormState = {
  name: '',
  description: '',
  startingPrice: '100000',
  minPrice: '80000',
  maxPrice: '500000',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onChange }) => {
  const { success, error } = useNotification();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(emptyForm);

  const isEditing = !!form.id;

  const resetForm = () => {
    setForm(emptyForm);
    setFormOpen(false);
  };

  const handleEdit = (cat: ServiceCategory) => {
    setForm({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      startingPrice: String(cat.startingPrice),
      minPrice: String(cat.minPrice ?? cat.startingPrice),
      maxPrice: String(cat.maxPrice ?? cat.startingPrice * 4),
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      error('Vui lòng nhập tên danh mục');
      return;
    }

    if (isEditing && form.id) {
      storageService.updateCategory(form.id, {
        name: form.name.trim(),
        description: form.description.trim(),
        startingPrice: Number(form.startingPrice) || 0,
        minPrice: Number(form.minPrice) || 0,
        maxPrice: Number(form.maxPrice) || 0,
      });
      success('Đã cập nhật danh mục dịch vụ!');
    } else {
      const slug = slugify(form.name) || `cat-${Date.now()}`;
      storageService.addCategory({
        id: `cat-${Date.now()}`,
        slug,
        name: form.name.trim(),
        icon: 'Wrench',
        description: form.description.trim(),
        technicianCount: 0,
        startingPrice: Number(form.startingPrice) || 0,
        minPrice: Number(form.minPrice) || 0,
        maxPrice: Number(form.maxPrice) || 0,
        popularServices: [],
        bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
        isActive: true,
      });
      success('Đã thêm danh mục dịch vụ mới!');
    }
    resetForm();
    onChange();
  };

  const handleToggleActive = (cat: ServiceCategory) => {
    storageService.updateCategory(cat.id, { isActive: cat.isActive === false ? true : false });
    onChange();
  };

  const handleDelete = (cat: ServiceCategory) => {
    if (!window.confirm(`Xóa danh mục "${cat.name}"? Hành động này không thể hoàn tác.`)) return;
    storageService.deleteCategory(cat.id);
    success('Đã xóa danh mục dịch vụ.');
    onChange();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          Quản lý danh mục dịch vụ ({categories.length})
        </h3>
        {!formOpen && (
          <Button size="sm" onClick={() => setFormOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Thêm danh mục
          </Button>
        )}
      </div>

      {formOpen && (
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h4>
          <Input
            label="Tên danh mục *"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            placeholder="Ví dụ: Sửa đồ gỗ nội thất"
          />
          <Input
            label="Mô tả ngắn"
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Giá khởi điểm"
              type="number"
              value={form.startingPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, startingPrice: e.target.value })}
            />
            <Input
              label="Giá sàn tham khảo"
              type="number"
              value={form.minPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, minPrice: e.target.value })}
            />
            <Input
              label="Giá trần tham khảo"
              type="number"
              value={form.maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, maxPrice: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Button size="sm" onClick={handleSave}>
              {isEditing ? 'Lưu thay đổi' : 'Thêm danh mục'}
            </Button>
            <Button size="sm" variant="outline" onClick={resetForm}>
              Hủy
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-3">Danh mục</th>
              <th className="py-3 px-3">Số thợ</th>
              <th className="py-3 px-3">Khung giá tham khảo</th>
              <th className="py-3 px-3">Trạng thái</th>
              <th className="py-3 px-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900">{cat.name}</div>
                  <span className="text-[11px] text-slate-500">{cat.description}</span>
                </td>
                <td className="py-3 px-3 font-semibold">{cat.technicianCount}</td>
                <td className="py-3 px-3">
                  {formatCurrency(cat.minPrice ?? cat.startingPrice)} - {formatCurrency(cat.maxPrice ?? cat.startingPrice * 4)}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      cat.isActive === false ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {cat.isActive === false ? 'Đã tắt' : 'Đang hoạt động'}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleToggleActive(cat)}
                      title={cat.isActive === false ? 'Bật lại danh mục' : 'Tắt danh mục'}
                      className="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEdit(cat)}
                      title="Sửa"
                      className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      title="Xóa"
                      className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
