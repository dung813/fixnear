import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Wrench, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
        <Wrench className="w-10 h-10 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy trang</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Trang bạn đang truy cập có thể đã được di chuyển hoặc không tồn tại trên hệ thống FixNear.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button leftIcon={<Home className="w-4 h-4" />}>
            Về Trang chủ
          </Button>
        </Link>
        <Link to="/technicians">
          <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
            Tìm thợ gần bạn
          </Button>
        </Link>
      </div>
    </div>
  );
};

