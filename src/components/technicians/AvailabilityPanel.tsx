import React from 'react';
import { Technician } from '../../types';
import { storageService } from '../../services/storageService';
import { CalendarClock } from 'lucide-react';

export interface AvailabilityToggleProps {
  technician: Technician;
  onChange?: () => void;
}

/** Compact on/off switch meant for the dashboard header banner. */
export const AvailabilityToggle: React.FC<AvailabilityToggleProps> = ({ technician, onChange }) => {
  const handleToggle = () => {
    storageService.updateTechnician(technician.id, { isAvailable: !technician.isAvailable });
    onChange?.();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
        technician.isAvailable
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30'
          : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${technician.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
      {technician.isAvailable ? 'Đang sẵn sàng nhận việc' : 'Đang tạm ngừng nhận việc'}
    </button>
  );
};

const DAYS = [
  { key: 'T2', label: 'Thứ 2' },
  { key: 'T3', label: 'Thứ 3' },
  { key: 'T4', label: 'Thứ 4' },
  { key: 'T5', label: 'Thứ 5' },
  { key: 'T6', label: 'Thứ 6' },
  { key: 'T7', label: 'Thứ 7' },
  { key: 'CN', label: 'CN' },
];

const SLOTS = [
  { key: 'sang', label: 'Sáng' },
  { key: 'chieu', label: 'Chiều' },
  { key: 'toi', label: 'Tối' },
];

export interface WeeklyAvailabilityGridProps {
  technician: Technician;
  onChange?: () => void;
}

/** Full weekly recurring-slot grid meant for the "Lịch làm việc" tab. */
export const WeeklyAvailabilityGrid: React.FC<WeeklyAvailabilityGridProps> = ({ technician, onChange }) => {
  const slots = technician.weeklySlots ?? [];

  const toggleSlot = (slotId: string) => {
    const next = slots.includes(slotId) ? slots.filter(s => s !== slotId) : [...slots, slotId];
    storageService.updateTechnician(technician.id, { weeklySlots: next });
    onChange?.();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3">
      <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-blue-600" />
        Khung giờ rảnh trong tuần
      </h3>
      <p className="text-[11px] text-slate-500">
        Chọn các khung giờ bạn thường rảnh để khách hàng và hệ thống ưu tiên gợi ý đúng lịch.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="text-left text-[11px] text-slate-400 font-medium">Khung giờ</th>
              {DAYS.map(d => (
                <th key={d.key} className="text-[11px] text-slate-500 font-semibold">{d.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map(slot => (
              <tr key={slot.key}>
                <td className="text-left text-[11px] font-semibold text-slate-600">{slot.label}</td>
                {DAYS.map(day => {
                  const slotId = `${day.key}-${slot.key}`;
                  const isActive = slots.includes(slotId);
                  return (
                    <td key={slotId}>
                      <button
                        type="button"
                        onClick={() => toggleSlot(slotId)}
                        className={`w-9 h-8 rounded-lg border text-[10px] font-bold transition ${
                          isActive
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isActive ? '✓' : ''}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
