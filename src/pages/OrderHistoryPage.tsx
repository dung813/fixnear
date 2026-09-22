import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { Booking } from '../types';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { WarrantyClaimModal } from '../components/orders/WarrantyClaimModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { History, ShieldCheck, ShieldAlert, Calendar } from 'lucide-react';

type WarrantyTab = 'all' | 'active' | 'expired';

const getWarrantyInfo = (bk: Booking): { daysLeft: number; isExpired: boolean; endDate: Date } => {
  const baseDate = bk.completedAt ? new Date(bk.completedAt) : new Date(bk.createdAt);
  const endDate = new Date(baseDate);
  endDate.setMonth(endDate.getMonth() + (bk.warrantyMonths || 0));
  const diffMs = endDate.getTime() - Date.now();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return { daysLeft, isExpired: daysLeft <= 0, endDate };
};

export const OrderHistoryPage: React.FC = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<WarrantyTab>('all');
  const [claimBooking, setClaimBooking] = useState<Booking | null>(null);

  const loadData = () => {
    const all = storageService.getBookings();
    const finished = all.filter(
      (b: Booking) =>
        (b.customerId === user?.id || b.customerId === 'user-cust-1') &&
        (b.status === 'completed' || b.status === 'reviewed')
    );
    setBookings(finished);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  const filtered = bookings.filter(bk => {
    if (activeTab === 'all') return true;
    const { isExpired } = getWarrantyInfo(bk);
    return activeTab === 'active' ? !isExpired : isExpired;
  });

  const tabs: { label: string; val: WarrantyTab }[] = [
    { label: 'Tất cả đơn', val: 'all' },
    { label: 'Đang bảo hành', val: 'active' },
    { label: 'Hết hạn bảo hành', val: 'expired' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <History className="w-6 h-6 text-blue-600" />
          Lịch sử sửa chữa & Bảo hành
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Theo dõi các đơn đã hoàn thành và trạng thái phiếu bảo hành điện tử
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold w-fit">
        {tabs.map(t => (
          <button
            key={t.val}
            onClick={() => setActiveTab(t.val)}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === t.val ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map(bk => {
            const { daysLeft, isExpired } = getWarrantyInfo(bk);
            return (
              <div
                key={bk.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Avatar src={bk.technicianAvatar} name={bk.technicianName} size="md" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{bk.technicianName}</h4>
                      <p className="text-xs text-slate-500">{bk.serviceName}</p>
                    </div>
                  </div>
                  <Badge variant={isExpired ? 'neutral' : 'success'} size="md" dot>
                    {isExpired ? (
                      <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Hết hạn bảo hành</span>
                    ) : (
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Còn {daysLeft} ngày bảo hành linh kiện</span>
                    )}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block font-medium">Mã đơn:</span>
                    <span className="font-bold text-slate-900">{bk.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Ngày sửa:</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {formatDate(bk.date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Số tiền:</span>
                    <span className="font-bold text-blue-600">{formatCurrency(bk.finalPrice || bk.estimatedPrice)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Bảo hành:</span>
                    <span className="font-bold text-slate-900">{bk.warrantyMonths} tháng</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    size="sm"
                    variant={isExpired ? 'outline' : 'primary'}
                    disabled={isExpired}
                    onClick={() => setClaimBooking(bk)}
                  >
                    Gửi yêu cầu bảo hành
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">Chưa có đơn hàng nào trong mục này</h3>
          <Link to="/technicians">
            <Button size="sm">Tìm thợ đặt lịch ngay</Button>
          </Link>
        </div>
      )}

      <WarrantyClaimModal
        isOpen={!!claimBooking}
        onClose={() => setClaimBooking(null)}
        booking={claimBooking}
      />
    </div>
  );
};
