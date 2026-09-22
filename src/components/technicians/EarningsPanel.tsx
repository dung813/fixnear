import React from 'react';
import { Booking } from '../../types';
import { StatCard } from '../common/StatCard';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Wallet, TrendingUp, Percent, Banknote } from 'lucide-react';

export interface EarningsPanelProps {
  bookings: Booking[];
}

const PLATFORM_FEE_RATE = 0.1; // 10% platform fee on completed jobs

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const EarningsPanel: React.FC<EarningsPanelProps> = ({ bookings }) => {
  const completed = bookings.filter(b => b.status === 'completed' || b.status === 'reviewed');
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const getAmount = (b: Booking) => b.finalPrice || b.estimatedPrice;
  const getDate = (b: Booking) => new Date(b.completedAt || b.createdAt);

  const todayTotal = completed.filter(b => isSameDay(getDate(b), now)).reduce((s, b) => s + getAmount(b), 0);
  const weekTotal = completed.filter(b => getDate(b) >= startOfWeek).reduce((s, b) => s + getAmount(b), 0);
  const monthTotal = completed.filter(b => getDate(b) >= startOfMonth).reduce((s, b) => s + getAmount(b), 0);
  const grandTotal = completed.reduce((s, b) => s + getAmount(b), 0);
  const platformFee = Math.round(grandTotal * PLATFORM_FEE_RATE);
  const netEarnings = grandTotal - platformFee;

  // Last 7 days revenue for a simple CSS bar chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    const total = completed.filter(b => isSameDay(getDate(b), d)).reduce((s, b) => s + getAmount(b), 0);
    return { date: d, total };
  });
  const maxDay = Math.max(...last7Days.map(d => d.total), 1);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Hôm nay"
          value={formatCurrency(todayTotal)}
          subtitle="Doanh thu hôm nay"
          icon={<Wallet className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Tuần này"
          value={formatCurrency(weekTotal)}
          subtitle="Từ đầu tuần"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Tháng này"
          value={formatCurrency(monthTotal)}
          subtitle="Từ đầu tháng"
          icon={<Banknote className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Đơn đã hoàn tất"
          value={completed.length}
          subtitle="Tổng cộng"
          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
      </div>

      {/* Simple 7-day revenue bar chart (no chart library available) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <h3 className="font-bold text-sm text-slate-900">Doanh thu 7 ngày gần nhất</h3>
        <div className="flex items-end justify-between gap-2 h-32 pt-4">
          {last7Days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-slate-400">{d.total > 0 ? formatCurrency(d.total) : ''}</span>
              <div
                className="w-full max-w-8 bg-blue-500 rounded-t-md transition-all"
                style={{ height: `${Math.max((d.total / maxDay) * 100, d.total > 0 ? 6 : 2)}%` }}
              />
              <span className="text-[10px] font-semibold text-slate-500">
                {d.date.toLocaleDateString('vi-VN', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform fee breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Percent className="w-4 h-4 text-blue-600" />
          Chi tiết phí dịch vụ nền tảng
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Tổng doanh thu (tất cả đơn hoàn thành):</span>
            <span className="font-bold text-slate-900">{formatCurrency(grandTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phí nền tảng FixNear ({(PLATFORM_FEE_RATE * 100).toFixed(0)}%):</span>
            <span className="font-bold text-rose-600">- {formatCurrency(platformFee)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <span className="font-semibold text-slate-700">Thực nhận:</span>
            <span className="font-extrabold text-emerald-600 text-sm">{formatCurrency(netEarnings)}</span>
          </div>
        </div>
      </div>

      {/* Recent completed jobs list */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <h3 className="font-bold text-sm text-slate-900">Lịch sử thanh toán gần đây</h3>
        {completed.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {completed.slice(0, 8).map(b => (
              <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800">{b.serviceName}</p>
                  <p className="text-[10px] text-slate-400">{formatDate(b.completedAt || b.createdAt)} • {b.customerName}</p>
                </div>
                <span className="font-bold text-emerald-600">+{formatCurrency(getAmount(b))}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Chưa có đơn hoàn thành nào.</p>
        )}
      </div>
    </div>
  );
};
