import React, { useEffect, useState } from 'react';
import { Address } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MapPin, Plus, Star, Trash2 } from 'lucide-react';

export const AddressBook: React.FC = () => {
  const { user } = useAuth();
  const { success } = useNotification();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [addressLine, setAddressLine] = useState('');

  const districtOptions = city === 'Hà Nội'
    ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông', 'Bắc Từ Liêm']
    : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];

  const loadAddresses = () => {
    if (user) setAddresses(storageService.getAddresses(user.id));
  };

  useEffect(() => {
    loadAddresses();
    window.addEventListener('fixnear_storage_update', loadAddresses);
    return () => window.removeEventListener('fixnear_storage_update', loadAddresses);
  }, [user]);

  const resetForm = () => {
    setLabel('');
    setAddressLine('');
    setCity('Hà Nội');
    setDistrict('Cầu Giấy');
    setIsAdding(false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !label.trim() || !addressLine.trim()) return;

    storageService.addAddress({
      id: `addr-${Date.now()}`,
      userId: user.id,
      label: label.trim(),
      address: addressLine.trim(),
      district,
      city,
      isDefault: addresses.length === 0,
    });
    success('Đã thêm địa chỉ mới');
    resetForm();
  };

  const handleDelete = (id: string) => {
    storageService.deleteAddress(id);
    success('Đã xóa địa chỉ');
  };

  const handleSetDefault = (id: string) => {
    if (!user) return;
    storageService.setDefaultAddress(user.id, id);
  };

  return (
    <div className="space-y-3">
      {addresses.length > 0 ? (
        <div className="space-y-2">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {addr.address}, {addr.district}, {addr.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 px-2 py-1"
                  >
                    Đặt mặc định
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 p-4 text-center bg-slate-50 rounded-xl border border-slate-100">
          Bạn chưa lưu địa chỉ nào. Thêm địa chỉ để đặt lịch nhanh hơn.
        </p>
      )}

      {isAdding ? (
        <form onSubmit={handleAdd} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <Input
            label="Tên gợi nhớ (VD: Nhà riêng, Công ty)"
            value={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-slate-500 mb-1 block">Tỉnh / Thành phố:</span>
              <select
                value={city}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCity(e.target.value as any);
                  setDistrict(e.target.value === 'Hà Nội' ? 'Cầu Giấy' : 'Quận 1');
                }}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>
            <div>
              <span className="text-xs text-slate-500 mb-1 block">Quận / Huyện:</span>
              <select
                value={district}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              >
                {districtOptions.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="Số nhà, tên đường..."
            value={addressLine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressLine(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <Button type="submit" size="sm">Lưu địa chỉ</Button>
            <Button type="button" size="sm" variant="outline" onClick={resetForm}>Hủy</Button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-3.5 h-3.5" /> Thêm địa chỉ mới
        </button>
      )}
    </div>
  );
};
