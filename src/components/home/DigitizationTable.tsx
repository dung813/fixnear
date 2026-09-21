import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  CalendarCheck, 
  Activity, 
  Star,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const DigitizationTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'customer' | 'technician'>('all');

  const rows = [
    {
      task: 'Tìm thợ sửa chữa',
      icon: Search,
      traditional: 'Hỏi người quen, đăng bài lên nhóm Facebook/Zalo rồi chờ đợi ai đó giới thiệu.',
      digital: 'Đăng nhu cầu hoặc tìm kiếm trực tiếp trên FixNear với danh bạ hàng trăm thợ chuyên môn.',
      benefit: 'Tiết kiệm 80% thời gian & công sức tìm kiếm, có thợ nhận việc ngay trong 15 phút.',
      category: 'customer'
    },
    {
      task: 'Tìm thợ gần vị trí',
      icon: MapPin,
      traditional: 'Khách hàng phải tự gọi từng thợ hỏi xem có nhận đến khu vực của mình không.',
      digital: 'Hệ thống tự động quét và lọc thợ theo bán kính khoảng cách (km) và quận/huyện chính xác.',
      benefit: 'Dễ dàng tìm được thợ ở ngay gần nhà, giảm chi phí đi lại và có mặt nhanh chóng.',
      category: 'customer'
    },
    {
      task: 'Kiểm tra uy tín & Tay nghề',
      icon: ShieldCheck,
      traditional: 'Chủ yếu tin theo lời truyền miệng hoặc cảm tính, dễ gặp thợ thiếu trách nhiệm.',
      digital: 'Hồ sơ xác minh CCCD, bằng cấp/chứng chỉ nghề, chấm điểm 4 tiêu chí và review thật.',
      benefit: 'Minh bạch 100% dữ liệu năng lực, an tâm tuyệt đối khi thợ đến thi công tại nhà.',
      category: 'customer'
    },
    {
      task: 'Mô tả sự cố & Bệnh lý',
      icon: FileText,
      traditional: 'Mô tả bằng lời qua điện thoại thường mơ hồ, thợ không hình dung được thiết bị.',
      digital: 'Form đăng việc có đầy đủ mô tả chi tiết, hình ảnh chụp trực quan và vị trí lắp đặt.',
      benefit: 'Thông tin sự cố rõ ràng, giúp thợ chuẩn bị sẵn linh kiện và dụng cụ thay thế phù hợp.',
      category: 'both'
    },
    {
      task: 'Hỏi giá & Thỏa thuận',
      icon: MessageSquare,
      traditional: 'Gọi nhiều nơi hỏi giá, dễ bị ép giá hoặc phát sinh thêm chi phí bất ngờ sau khi sửa.',
      digital: 'Nhận báo giá điện tử chi tiết (tiền công + linh kiện + bảo hành) qua hệ thống Chat.',
      benefit: 'Minh bạch chi phí từ đầu, không lo bị chặt chém, duyệt giá mới tiến hành làm.',
      category: 'both'
    },
    {
      task: 'Đặt lịch hẹn thi công',
      icon: CalendarCheck,
      traditional: 'Nhắn tin qua lại nhiều lần, dễ bị quên lịch hẹn hoặc thợ đến trễ không báo trước.',
      digital: 'Thao tác Booking chọn ngày và khung giờ chính xác, hệ thống đồng bộ lịch 2 bên.',
      benefit: 'Chủ động thời gian, hạn chế nhầm lẫn lịch, có thông báo nhắc nhở tự động.',
      category: 'both'
    },
    {
      task: 'Theo dõi tiến trình sửa chữa',
      icon: Activity,
      traditional: 'Khách hàng phải tự ghi nhớ hoặc liên tục gọi điện giục thợ cập nhật tiến độ.',
      digital: 'Đơn hàng cập nhật 4 trạng thái thời gian thực: Xác nhận → Khảo sát → Thi công → Hoàn thành.',
      benefit: 'Dễ dàng nắm bắt toàn bộ tiến độ, biết rõ lúc nào thợ đến và lúc nào nghiệm thu.',
      category: 'both'
    },
    {
      task: 'Đánh giá & Bảo hành',
      icon: Star,
      traditional: 'Đánh giá truyền miệng khó lưu vết, khi hỏng lại rất khó liên hệ thợ để bảo hành.',
      digital: 'Đánh giá số sao trực tiếp trên hệ thống; phiếu bảo hành điện tử lưu trong tài khoản.',
      benefit: 'Bảo vệ quyền lợi khách hàng với cam kết bảo hành 1-6 tháng và hỗ trợ xử lý khiếu nại.',
      category: 'both'
    },
  ];

  const filteredRows = rows.filter(r => {
    if (activeTab === 'customer') return r.category === 'customer' || r.category === 'both';
    if (activeTab === 'technician') return r.category === 'both';
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Chuyển Đổi Số Dịch Vụ Sửa Chữa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            FixNear Số Hóa Các Công Việc Thủ Công Như Thế Nào?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            FixNear không thay thế nghề sửa chữa của thợ, mà số hóa toàn bộ chuỗi quy trình hỗ trợ từ lúc phát sinh nhu cầu đến khi hoàn tất bảo hành.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả (8 Chuỗi)
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'customer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Góc nhìn Khách hàng
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-3.5 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider w-48 rounded-l-xl">
                Công việc
              </th>
              <th className="p-3.5 bg-rose-50/60 font-bold text-rose-700 uppercase tracking-wider w-1/3">
                Cách làm truyền thống
              </th>
              <th className="p-3.5 bg-blue-50/70 font-bold text-blue-700 uppercase tracking-wider w-1/3">
                FixNear số hóa
              </th>
              <th className="p-3.5 bg-emerald-50/70 font-bold text-emerald-800 uppercase tracking-wider rounded-r-xl">
                Lợi ích vượt trội
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredRows.map((row, idx) => {
              const Icon = row.icon;
              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{row.task}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 leading-relaxed bg-rose-50/20">
                    <span className="text-rose-600 font-semibold mr-1">✕</span>
                    {row.traditional}
                  </td>
                  <td className="p-3.5 text-slate-800 leading-relaxed bg-blue-50/20 font-medium">
                    <span className="text-blue-600 font-bold mr-1">✓</span>
                    {row.digital}
                  </td>
                  <td className="p-3.5 text-emerald-900 leading-relaxed bg-emerald-50/20 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                    {row.benefit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

