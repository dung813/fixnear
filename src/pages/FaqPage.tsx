import React, { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'FixNear hoạt động như thế nào?',
      a: 'FixNear là nền tảng kết nối trực tiếp khách hàng đang gặp sự cố nhà cửa (điện, nước, điều hòa, khóa, máy giặt...) với thợ kỹ thuật gần nhất. Bạn có thể đăng yêu cầu sửa chữa hoặc duyệt danh bạ để đặt lịch hẹn thợ theo khung giờ mong muốn.',
    },
    {
      q: 'Làm thế nào để tôi biết thợ sửa chữa là uy tín và có tay nghề?',
      a: 'Mọi thợ trên FixNear đều phải trải qua quy trình xác minh CCCD, kiểm tra hồ sơ tay nghề và chứng chỉ nghề nghiệp. Ngoài ra, bạn có thể xem điểm đánh giá 4 tiêu chí (Chất lượng, Thái độ, Đúng giờ, Giá cả) cùng các nhận xét từ khách hàng trước đó.',
    },
    {
      q: 'Chi phí sửa chữa được tính như thế nào? Có phát sinh không?',
      a: 'Bảng giá dịch vụ cơ bản được công khai trên hồ sơ thợ. Khi thợ đến khảo sát, thợ sẽ kiểm tra sự cố, giải thích nguyên nhân và báo giá trọn gói (bao gồm tiền công + linh kiện nếu cần). Chỉ khi bạn đồng ý thì thợ mới bắt đầu sửa.',
    },
    {
      q: 'Sau khi sửa chữa, dịch vụ có được bảo hành không?',
      a: 'Có. Tất cả các dịch vụ sửa chữa qua FixNear đều được bảo hành từ 1 đến 6 tháng tùy từng hạng mục. Nếu sự cố tái phát trong thời gian bảo hành, thợ sẽ đến khắc phục miễn phí.',
    },
    {
      q: 'Làm sao để đăng ký trở thành đối tác thợ trên FixNear?',
      a: 'Bạn chỉ cần nhấn vào nút "Trở thành thợ" trên menu, điền các thông tin cá nhân, chuyên môn, khu vực hoạt động và tải ảnh CMND/CCCD. Đội ngũ FixNear sẽ duyệt hồ sơ để bạn có thể nhận đơn ngay trong ngày.',
    },
    {
      q: 'Tôi có bị mất phí khi đăng yêu cầu sửa chữa không?',
      a: 'Hoàn toàn KHÔNG. Việc đăng yêu cầu tìm thợ và nhận báo giá trên FixNear là 100% miễn phí đối với khách hàng.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Trung tâm trợ giúp
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Câu hỏi thường gặp (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Giải đáp các thắc mắc phổ biến về quy trình đặt lịch, báo giá và chính sách bảo hành của FixNear.
        </p>
      </div>

      {/* Accordion */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fade-in bg-slate-50 p-4 rounded-xl">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Box */}
      <div className="bg-blue-50 rounded-3xl p-6 sm:p-8 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-base text-blue-900">
            Bạn vẫn còn câu hỏi khác?
          </h3>
          <p className="text-xs text-blue-700 mt-0.5">
            Đội ngũ hỗ trợ khách hàng của FixNear luôn trực tuyến 24/7.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:19006868"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" /> 1900 6868
          </a>
          <Link to="/chat">
            <Button variant="outline" size="sm" className="bg-white text-xs font-bold">
              Chat hỗ trợ
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

