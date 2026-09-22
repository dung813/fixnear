import React, { useMemo } from 'react';
import { Booking } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Wallet } from 'lucide-react';

export interface PayoutsTableProps {
  bookings: Booking[];
  commissionRate: number; // percentage, e.g. 10 for 10%
}

interface TechnicianPayoutRow {
  technicianId: string;
  technicianName: string;
  ordersCount: number;
  grossRevenue: number;
  platformFee: number;
  netPayout: number;
  lastPayoutDate: string;
}

export const PayoutsTable: React.FC<PayoutsTableProps> = ({ bookings, commissionRate }) => {
  const rows = useMemo<TechnicianPayoutRow[]>(() => {
    const completed = bookings.filter(b => b.status === 'completed' || b.status === 'reviewed');
    const map = new Map<string, TechnicianPayoutRow>();

    completed.forEach(b => {
      const gross = b.finalPrice || b.estimatedPrice;
      const existing = map.get(b.technicianId);
      const bookingDate = b.completedAt || b.createdAt;
      if (existing) {
        existing.ordersCount += 1;
        existing.grossRevenue += gross;
        if (bookingDate > existing.lastPayoutDate) existing.lastPayoutDate = bookingDate;
      } else {
        map.set(b.technicianId, {
          technicianId: b.technicianId,
          technicianName: b.technicianName,
          ordersCount: 1,
          grossRevenue: gross,
          platformFee: 0,
          netPayout: 0,
          lastPayoutDate: bookingDate,
        });
      }
    });

    return Array.from(map.values())
      .map(row => {
        const fee = Math.round(row.grossRevenue * (commissionRate / 100));
        return { ...row, platformFee: fee, netPayout: row.grossRevenue - fee };
      })
      .sort((a, b) => b.grossRevenue - a.grossRevenue);
  }, [bookings, commissionRate]);

  const totalGross = rows.reduce((s, r) => s + r.grossRevenue, 0);
  const totalFee = rows.reduce((s, r) => s + r.platformFee, 0);
  const totalPayout = rows.reduce((s, r) => s + r.netPayout, 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-600" />
          Đối soát chi trả cho thợ (Payouts)
        </h3>
        <span className="text-[11px] text-slate-500">Áp dụng phí nền tảng {commissionRate}%</span>
      </div>

      {rows.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Thợ</th>
                  <th className="py-3 px-3">Số đơn</th>
                  <th className="py-3 px-3">Doanh thu gộp</th>
                  <th className="py-3 px-3">Phí nền tảng</th>
                  <th className="py-3 px-3">Thực trả thợ</th>
                  <th className="py-3 px-3">Cập nhật gần nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {rows.map(row => (
                  <tr key={row.technicianId} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-bold text-slate-900">{row.technicianName}</td>
                    <td className="py-3 px-3">{row.ordersCount}</td>
                    <td className="py-3 px-3 font-semibold">{formatCurrency(row.grossRevenue)}</td>
                    <td className="py-3 px-3 text-rose-600">- {formatCurrency(row.platformFee)}</td>
                    <td className="py-3 px-3 font-extrabold text-emerald-600">{formatCurrency(row.netPayout)}</td>
                    <td className="py-3 px-3 text-slate-500">{formatDate(row.lastPayoutDate)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 font-bold text-slate-900">
                  <td className="py-3 px-3">Tổng cộng</td>
                  <td className="py-3 px-3">{rows.reduce((s, r) => s + r.ordersCount, 0)}</td>
                  <td className="py-3 px-3">{formatCurrency(totalGross)}</td>
                  <td className="py-3 px-3 text-rose-600">{formatCurrency(totalFee)}</td>
                  <td className="py-3 px-3 text-emerald-700">{formatCurrency(totalPayout)}</td>
                  <td className="py-3 px-3" />
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <p className="text-xs text-slate-400 italic">Chưa có đơn hoàn thành nào để đối soát.</p>
      )}
    </div>
  );
};
