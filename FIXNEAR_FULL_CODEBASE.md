# TÀI LIỆU TOÀN BỘ MÃ NGUỒN DỰ ÁN FIXNEAR
> **Nền tảng:** FIXNEAR — Marketplace Dịch Vụ Sửa Chữa Địa Phương Thông Minh
> **Slogan:** "Gặp vấn đề – Tìm thợ gần – Xử lý nhanh."
> **Công nghệ:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, LocalStorage Reactive Database Engine, Netlify SPA.
> **Mục đích:** File tổng hợp toàn bộ cấu trúc và mã nguồn đầy đủ của 50+ files trong dự án để tiếp tục phát triển trên Claude.ai.

---

## 1. TỔNG QUAN HỆ THỐNG ĐÃ XÂY DỰNG
- **Người dùng & 3 Vai trò (Roles):** Khách hàng (Customer), Thợ kỹ thuật (Technician), Quản trị viên (Admin) kèm thanh chuyển đổi Demo 1-Click.
- **11 Nhóm Dịch Vụ:** Điện, Nước, Điện lạnh, Máy giặt, Tủ lạnh, Sửa khóa 24/7, Sửa xe máy lưu động, Đồ gia dụng, Lắp đặt thiết bị, Sơn sửa nhà, Dịch vụ khác.
- **AI Smart Matching:** Thuật toán `matchingEngine.ts` tính toán Match Score (98%, 95%) dựa trên 5 tiêu chí để gợi ý top 3 thợ phù hợp nhất cho mỗi yêu cầu sửa chữa.
- **So Sánh Thợ Song Song (Side-by-Side Comparison):** Chọn 2-3 thợ để đối chiếu giá, sao, tỷ lệ hoàn tất, kinh nghiệm, khoảng cách, tốc độ đến nơi, chứng chỉ.
- **Báo Giá Điện Tử Phân Rã (E-Quote):** Phân rã Tiền công thợ + Tiền linh kiện + Thời gian hoàn thành + Thời hạn bảo hành gửi trực tiếp qua Chat.
- **Ký Quỹ An Toàn FixNear Escrow:** Tạm giữ 100% tiền đơn hàng và chỉ giải ngân cho thợ sau khi khách nghiệm thu.
- **Tiến Trình 4 Bước Chuẩn Hóa:** Xác nhận $\rightarrow$ Khảo sát tại nhà $\rightarrow$ Thi công $\rightarrow$ Nghiệm thu & Bảo hành.
- **Khiếu Nại & Tranh Chấp (Dispute System):** Hỗ trợ khách khiếu nại, Admin can thiệp duyệt hoàn tiền từ quỹ Escrow.
- **Bảng Số Hóa 8 Chuỗi Công Việc Thủ Công:** So sánh trực quan Cách làm truyền thống vs FixNear số hóa vs Lợi ích mang lại.

---

## 2. DANH SÁCH TẤT CẢ CÁC FILE TRONG FILE NÀY:
- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `netlify.toml`
- `index.html`
- `public/_redirects`
- `src/index.css`
- `src/main.tsx`
- `src/App.tsx`
- `src/types/index.ts`
- `src/utils/formatters.ts`
- `src/utils/matchingEngine.ts`
- `src/data/mockData.ts`
- `src/services/storageService.ts`
- `src/context/AuthContext.tsx`
- `src/context/NotificationContext.tsx`
- `src/components/common/Avatar.tsx`
- `src/components/common/Badge.tsx`
- `src/components/common/Button.tsx`
- `src/components/common/CategoryIcon.tsx`
- `src/components/common/Input.tsx`
- `src/components/common/Modal.tsx`
- `src/components/common/RatingStars.tsx`
- `src/components/common/Select.tsx`
- `src/components/common/StatCard.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/DashboardSidebar.tsx`
- `src/components/layout/RoleDemoBar.tsx`
- `src/components/home/DigitizationTable.tsx`
- `src/components/requests/RequestCard.tsx`
- `src/components/requests/SmartMatchingModal.tsx`
- `src/components/technicians/TechCard.tsx`
- `src/components/technicians/BookingModal.tsx`
- `src/components/technicians/CompareModal.tsx`
- `src/components/technicians/DisputeModal.tsx`
- `src/components/technicians/ReviewModal.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/ServicesPage.tsx`
- `src/pages/FindTechniciansPage.tsx`
- `src/pages/TechnicianDetailPage.tsx`
- `src/pages/PostRequestPage.tsx`
- `src/pages/TechnicianRegisterPage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/CustomerDashboardPage.tsx`
- `src/pages/TechnicianDashboardPage.tsx`
- `src/pages/AdminDashboardPage.tsx`
- `src/pages/MyBookingsPage.tsx`
- `src/pages/ChatPage.tsx`
- `src/pages/ReviewsPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/FaqPage.tsx`
- `src/pages/NotFoundPage.tsx`

---

## 3. CHI TIẾT MÃ NGUỒN TỪNG FILE

### File: `package.json`

```json
{
  "name": "fixnear",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "recharts": "^2.15.0",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/node": "^22.10.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.6.3",
    "vite": "^6.0.1"
  }
}

```

---

### File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

---

### File: `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}

```

---

### File: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

```

---

### File: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // Primary
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        dark: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.03)',
        'brand': '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
      }
    },
  },
  plugins: [],
}

```

---

### File: `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

---

### File: `netlify.toml`

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"

```

---

### File: `index.html`

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FixNear – Tìm thợ sửa chữa gần bạn | Gặp vấn đề – Tìm thợ gần – Xử lý nhanh</title>
    <meta name="description" content="FixNear kết nối bạn với những người thợ sửa chữa phù hợp, đáng tin cậy và gần khu vực của bạn nhất tại Hà Nội & TP.HCM." />
    
    <!-- Open Graph / Meta -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="FixNear – Tìm thợ sửa chữa gần bạn" />
    <meta property="og:description" content="Nền tảng kết nối dịch vụ sửa chữa địa phương nhanh chóng, minh bạch và tin cậy." />
    <meta property="og:image" content="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

---

### File: `public/_redirects`

```text
/*    /index.html   200

```

---

### File: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-slate-50 text-slate-900 antialiased font-sans;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-in {
  animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom modern scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

```

---

### File: `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

---

### File: `src/App.tsx`

```tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { RoleDemoBar } from './components/layout/RoleDemoBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { FindTechniciansPage } from './pages/FindTechniciansPage';
import { TechnicianDetailPage } from './pages/TechnicianDetailPage';
import { PostRequestPage } from './pages/PostRequestPage';
import { TechnicianRegisterPage } from './pages/TechnicianRegisterPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { TechnicianDashboardPage } from './pages/TechnicianDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ChatPage } from './pages/ChatPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top component on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
            <ScrollToTop />
            <RoleDemoBar />
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/technicians" element={<FindTechniciansPage />} />
                <Route path="/technicians/:id" element={<TechnicianDetailPage />} />
                <Route path="/post-request" element={<PostRequestPage />} />
                <Route path="/technician/register" element={<TechnicianRegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
                <Route path="/customer/requests" element={<CustomerDashboardPage />} />
                <Route path="/technician/dashboard" element={<TechnicianDashboardPage />} />
                <Route path="/technician/radar" element={<TechnicianDashboardPage />} />
                <Route path="/technician/pro" element={<TechnicianDashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/*" element={<AdminDashboardPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

```

---

### File: `src/types/index.ts`

```typescript
export type UserRole = 'customer' | 'technician' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  address?: string;
  district: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
}

export type TechBadgeType = 'verified' | 'top_rated' | 'fast_response' | 'pro' | 'master';

export interface Technician {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  completionRate: number; // e.g. 98%
  experienceYears: number;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  district: string;
  address: string;
  distanceKm: number;
  basePrice: number;
  isOnline: boolean;
  isAvailable: boolean;
  isVerified: boolean;
  isPro: boolean;
  badges: TechBadgeType[];
  certifications: string[];
  bio: string;
  categories: string[]; // category slugs
  servicesOffered: ServiceItem[];
  workPhotos: string[];
  phone: string;
  email: string;
  responseTimeMinutes: number;
  joinedDate: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  technicianCount: number;
  startingPrice: number;
  popularServices: string[];
  bannerImage: string;
}

export type RequestStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface EQuote {
  id: string;
  requestId: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  technicianRating: number;
  technicianPhone: string;
  laborCost: number;
  materialCost: number;
  totalAmount: number;
  estimatedHours: string;
  warrantyMonths: number;
  notes: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  photos: string[];
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  district: string;
  address: string;
  preferredTime: string;
  budget: number;
  status: RequestStatus;
  offersCount: number;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  quotes?: EQuote[];
  createdAt: string;
}

export type BookingStatus = 
  | 'pending'      // Chờ xác nhận
  | 'accepted'     // Đã xác nhận
  | 'surveying'    // Đang khảo sát tại nhà
  | 'in_progress'  // Đang thi công
  | 'completed'    // Đã hoàn thành (chờ đánh giá/nghiệm thu)
  | 'cancelled'    // Đã hủy
  | 'reviewed';    // Đã đánh giá

export type PaymentMethod = 'escrow' | 'cash';
export type PaymentStatus = 'holding_escrow' | 'released' | 'refunded' | 'cash_on_delivery';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  customerAddress: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  technicianPhone: string;
  technicianTitle: string;
  categoryId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  address: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  district: string;
  notes: string;
  estimatedPrice: number;
  finalPrice?: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  escrowAmount?: number;
  warrantyMonths: number;
  status: BookingStatus;
  createdAt: string;
  surveyAt?: string;
  inProgressAt?: string;
  completedAt?: string;
}

export interface ReviewRatings {
  quality: number;      // Chất lượng
  attitude: number;     // Thái độ
  punctuality: number;  // Đúng giờ
  pricing: number;      // Giá cả minh bạch
}

export interface Review {
  id: string;
  bookingId: string;
  technicianId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  ratings: ReviewRatings;
  comment: string;
  serviceName: string;
  photos?: string[];
  createdAt: string;
  technicianReply?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'technician';
  recipientId: string;
  text: string;
  imageUrl?: string;
  isOffer?: boolean;
  offerAmount?: number;
  quoteDetails?: {
    laborCost: number;
    materialCost: number;
    total: number;
    warranty: number;
  };
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  technicianTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'request' | 'chat' | 'system' | 'review' | 'dispute';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DisputeTicket {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  technicianId: string;
  technicianName: string;
  issueType: 'quality' | 'pricing' | 'punctuality' | 'damage';
  description: string;
  refundRequested: number;
  status: 'open' | 'investigating' | 'resolved_refund' | 'resolved_dismissed';
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface MatchRecommendation {
  technician: Technician;
  score: number; // 0 - 100%
  reasons: string[];
}

```

---

### File: `src/utils/formatters.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
}

```

---

### File: `src/utils/matchingEngine.ts`

```typescript
import { Technician, ServiceRequest, MatchRecommendation } from '../types';

export function calculateMatchScore(req: ServiceRequest, tech: Technician): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Category relevance (Max 40 points)
  if (tech.categories.includes(req.categoryId)) {
    score += 40;
    reasons.push(`Chuyên sâu dịch vụ ${req.categoryName}`);
  } else {
    score += 10;
  }

  // 2. Location & Distance proximity (Max 25 points)
  if (tech.city === req.city) {
    score += 10;
    if (tech.district.toLowerCase() === req.district.toLowerCase()) {
      score += 15;
      reasons.push(`Cùng khu vực ${tech.district}`);
    } else {
      score += 5;
    }
  }

  // Distance penalty/bonus
  if (tech.distanceKm <= 2.0) {
    score += 5;
    reasons.push(`Rất gần bạn (~${tech.distanceKm} km)`);
  }

  // 3. Rating & Reviews (Max 15 points)
  if (tech.rating >= 4.9) {
    score += 15;
    reasons.push(`Đánh giá xuất sắc (${tech.rating}★)`);
  } else if (tech.rating >= 4.7) {
    score += 10;
  } else {
    score += 5;
  }

  // 4. Response Time & Availability (Max 10 points)
  if (tech.responseTimeMinutes <= 10) {
    score += 10;
    reasons.push(`Phản hồi cực nhanh (~${tech.responseTimeMinutes} phút)`);
  } else if (tech.responseTimeMinutes <= 20) {
    score += 5;
  }

  // 5. Completion Rate & Pro Badge (Max 10 points)
  if (tech.completionRate >= 95) {
    score += 5;
    reasons.push(`Tỷ lệ hoàn tất ${tech.completionRate}%`);
  }
  if (tech.isPro) {
    score += 5;
  }

  // Bound score between 60 and 99
  const finalScore = Math.min(99, Math.max(65, score));

  return {
    score: finalScore,
    reasons: reasons.slice(0, 3), // top 3 reasons
  };
}

export function getRecommendedTechnicians(req: ServiceRequest, allTechs: Technician[], limit: number = 3): MatchRecommendation[] {
  return allTechs
    .map(tech => {
      const { score, reasons } = calculateMatchScore(req, tech);
      return { technician: tech, score, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

```

---

### File: `src/data/mockData.ts`

```typescript
import { 
  ServiceCategory, 
  Technician, 
  ServiceRequest, 
  Booking, 
  Review, 
  User, 
  Conversation, 
  ChatMessage,
  DisputeTicket,
  EQuote
} from '../types';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-1',
    slug: 'dien',
    name: 'Sửa chữa Điện',
    icon: 'Zap',
    description: 'Xử lý chập điện, mất điện, lắp aptomat, đi dây điện âm tường, đèn chiếu sáng.',
    technicianCount: 48,
    startingPrice: 100000,
    popularServices: ['Khắc phục chập cháy điện', 'Lắp công tơ / Aptomat', 'Thay ổ cắm / Công tắc', 'Lắp quạt trần / Đèn chùm'],
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
  },
  {
    id: 'cat-2',
    slug: 'nuoc',
    name: 'Sửa chữa Nước',
    icon: 'Droplet',
    description: 'Sửa rò rỉ nước, thông tắc bồn cầu, thay vòi sen, lắp máy bơm, van nước.',
    technicianCount: 52,
    startingPrice: 120000,
    popularServices: ['Thông tắc cống / Bồn cầu', 'Sửa đường ống rò rỉ', 'Lắp đặt vòi sen / Lavabo', 'Sửa máy bơm nước'],
    bannerImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
  },
  {
    id: 'cat-3',
    slug: 'dien-lanh',
    name: 'Điện lạnh / Điều hòa',
    icon: 'Wind',
    description: 'Bảo dưỡng điều hòa, nạp gas, xử lý điều hòa chảy nước, không mát, kêu to.',
    technicianCount: 65,
    startingPrice: 150000,
    popularServices: ['Vệ sinh điều hòa (treo tường/âm trần)', 'Bơm nạp gas R22 / R410A / R32', 'Khắc phục máy chảy nước', 'Tháo lắp di dời điều hòa'],
    bannerImage: 'https://images.unsplash.com/photo-1614633833026-07204217f39c?w=800&q=80',
  },
  {
    id: 'cat-4',
    slug: 'may-giat',
    name: 'Sửa Máy giặt',
    icon: 'Disc',
    description: 'Sửa máy giặt không vắt, không cấp nước, kêu to, vệ sinh lồng giặt tại nhà.',
    technicianCount: 36,
    startingPrice: 150000,
    popularServices: ['Vệ sinh lồng giặt cửa ngang/đứng', 'Sửa lỗi máy không vắt/không xả', 'Thay gioăng / Dây curoa', 'Sửa bo mạch máy giặt'],
    bannerImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
  },
  {
    id: 'cat-5',
    slug: 'tu-lanh',
    name: 'Sửa Tủ lạnh',
    icon: 'Refrigerator',
    description: 'Khắc phục tủ không đông đá, không mát ngăn dưới, hỏng block, rò gas.',
    technicianCount: 29,
    startingPrice: 180000,
    popularServices: ['Nạp gas tủ lạnh', 'Sửa tủ đóng tuyết / Không lạnh', 'Thay Block / Quạt gió', 'Thay gioăng cửa tủ lạnh'],
    bannerImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
  },
  {
    id: 'cat-6',
    slug: 'khoa',
    name: 'Sửa & Mở Khóa',
    icon: 'KeyRound',
    description: 'Mở khóa cửa khẩn cấp, đánh chìa, sửa khóa vân tay, khóa xe máy, khóa két sắt.',
    technicianCount: 42,
    startingPrice: 100000,
    popularServices: ['Mở khóa cửa tại nhà 24/7', 'Đổi lõi khóa / Thay ổ khóa mới', 'Lắp đặt khóa cửa vân tay điện tử', 'Làm chìa khóa smartkey'],
    bannerImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
  },
  {
    id: 'cat-7',
    slug: 'xe-may',
    name: 'Sửa Xe máy lưu động',
    icon: 'Bike',
    description: 'Cứu hộ săm lốp tận nơi, kích bình ắc quy, sửa xe chết máy, thay nhớt lưu động.',
    technicianCount: 38,
    startingPrice: 80000,
    popularServices: ['Vá săm / Ép lốp xe tận nơi', 'Kích nổ / Thay ắc quy xe máy', 'Cứu hộ xe ngập nước / Chết máy', 'Bảo dưỡng / Thay dầu máy'],
    bannerImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
  },
  {
    id: 'cat-8',
    slug: 'do-gia-dung',
    name: 'Đồ gia dụng',
    icon: 'Tv',
    description: 'Sửa tivi, lò vi sóng, bếp từ, nồi cơm điện cao tần, máy lọc nước, robot hút bụi.',
    technicianCount: 31,
    startingPrice: 120000,
    popularServices: ['Sửa bếp từ / Bếp hồng ngoại', 'Sửa tivi mất nguồn / Kẻ màn hình', 'Sửa lò vi sóng / Nồi chiên', 'Thay lõi & bảo dưỡng máy lọc nước'],
    bannerImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80',
  },
  {
    id: 'cat-9',
    slug: 'lap-dat',
    name: 'Lắp đặt thiết bị',
    icon: 'Wrench',
    description: 'Khoan tường, treo tivi, lắp giá đỡ, lắp rèm cửa, treo tranh ảnh, bình nóng lạnh.',
    technicianCount: 45,
    startingPrice: 80000,
    popularServices: ['Lắp bình nóng lạnh', 'Khoan treo tivi / Giá kệ / Gương', 'Lắp rèm cửa / Giàn phơi thông minh', 'Lắp máy hút mùi / Bồn rửa bát'],
    bannerImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 'cat-10',
    slug: 'nha-cua',
    name: 'Sơn & Sửa nhà nhỏ',
    icon: 'Home',
    description: 'Sơn dặm vá tường, chống thấm trần/ban công, sửa sàn gỗ, ốp lát gạch cục bộ.',
    technicianCount: 26,
    startingPrice: 200000,
    popularServices: ['Sơn bả dặm vá tường ẩm mốc', 'Xử lý chống thấm nhà vệ sinh', 'Sửa chữa cửa nhôm kính / Gỗ', 'Lát gạch cục bộ / Thay bản lề'],
    bannerImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  },
  {
    id: 'cat-11',
    slug: 'khac',
    name: 'Dịch vụ khác',
    icon: 'MoreHorizontal',
    description: 'Dọn dẹp vệ sinh theo giờ, diệt côn trùng, chuyển đồ đạc gia đình cục bộ.',
    technicianCount: 22,
    startingPrice: 100000,
    popularServices: ['Vệ sinh nhà cửa theo giờ', 'Phun diệt mối mọt / Côn trùng', 'Kê dọn di chuyển đồ nặng'],
    bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  },
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    userId: 'user-tech-1',
    name: 'Nguyễn Văn Minh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    title: 'Chuyên gia Điện lạnh & Điều hòa',
    rating: 4.9,
    reviewCount: 142,
    completedJobs: 186,
    completionRate: 99,
    experienceYears: 8,
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    address: 'Số 45 Trần Thái Tông, Cầu Giấy, Hà Nội',
    distanceKm: 1.2,
    basePrice: 150000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    badges: ['verified', 'top_rated', 'fast_response', 'pro'],
    certifications: ['Chứng chỉ kỹ thuật viên Daikin Pro', 'Chứng chỉ An toàn điện Cấp 4'],
    bio: 'Hơn 8 năm kinh nghiệm sửa chữa, bảo dưỡng điều hòa gia đình và cơ quan. Bắt bệnh chuẩn xác, cam kết báo đúng giá linh kiện chính hãng, bảo hành sau sửa chữa lên tới 6 tháng.',
    categories: ['dien-lanh', 'may-giat', 'tu-lanh'],
    servicesOffered: [
      { id: 's1', name: 'Vệ sinh bảo dưỡng điều hòa treo tường (9000-12000 BTU)', price: 150000, unit: 'máy' },
      { id: 's2', name: 'Nạp gas bổ sung R32/R410A', price: 250000, unit: 'lần' },
      { id: 's3', name: 'Khắc phục điều hòa chảy nước trong phòng', price: 180000, unit: 'máy' },
      { id: 's4', name: 'Tháo lắp di chuyển điều hòa nguyên bộ', price: 400000, unit: 'bộ' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
      'https://images.unsplash.com/photo-1614633833026-07204217f39c?w=600&q=80',
    ],
    phone: '0988 123 456',
    email: 'minh.dienlanh@fixnear.vn',
    responseTimeMinutes: 10,
    joinedDate: '2023-03-15',
  },
  {
    id: 'tech-2',
    userId: 'user-tech-2',
    name: 'Trần Đình Hùng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    title: 'Thợ Điện Dân Dụng & Công Nghiệp',
    rating: 4.85,
    reviewCount: 98,
    completedJobs: 135,
    completionRate: 97,
    experienceYears: 6,
    city: 'Hà Nội',
    district: 'Thanh Xuân',
    address: 'Số 112 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    distanceKm: 2.4,
    basePrice: 120000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    badges: ['verified', 'top_rated', 'pro'],
    certifications: ['Kỹ sư Điện Bách Khoa Hà Nội', 'Chứng chỉ Lắp đặt Aptomat Schneider'],
    bio: 'Kỹ sư điện tốt nghiệp ĐH Bách Khoa, nhận xử lý sự cố chập điện khẩn cấp, đi dây điện âm tường, lắp đặt bảng điện an toàn, lắp quạt trần, đèn trang trí.',
    categories: ['dien', 'lap-dat'],
    servicesOffered: [
      { id: 's5', name: 'Tìm và xử lý chập nổ điện cục bộ', price: 200000, unit: 'lần' },
      { id: 's6', name: 'Thay thế ổ cắm, công tắc, bóng đèn', price: 80000, unit: 'vị trí' },
      { id: 's7', name: 'Lắp đặt quạt trần Panasonic/KDK', price: 250000, unit: 'chiếc' },
      { id: 's8', name: 'Lắp đặt tủ điện Aptomat chống giật', price: 300000, unit: 'tủ' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    ],
    phone: '0977 456 789',
    email: 'hung.thodien@fixnear.vn',
    responseTimeMinutes: 15,
    joinedDate: '2023-05-20',
  },
  {
    id: 'tech-3',
    userId: 'user-tech-3',
    name: 'Lê Văn Tuấn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    title: 'Thợ Nước & Thông Tắc Chuyên Nghiệp',
    rating: 4.95,
    reviewCount: 165,
    completedJobs: 220,
    completionRate: 99,
    experienceYears: 10,
    city: 'Hà Nội',
    district: 'Đống Đa',
    address: 'Số 78 Thái Hà, Đống Đa, Hà Nội',
    distanceKm: 3.1,
    basePrice: 150000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    badges: ['verified', 'top_rated', 'fast_response', 'master'],
    certifications: ['Chứng chỉ Thợ Lành nghề Cấp thoát nước'],
    bio: 'Chuyên gia hệ thống cấp thoát nước nhà phố, chung cư. Có đầy đủ máy lò xo thông tắc hiện đại, máy dò tìm rò rỉ nước âm tường không đục phá.',
    categories: ['nuoc', 'lap-dat'],
    servicesOffered: [
      { id: 's9', name: 'Thông tắc bồn cầu, chậu rửa bát bằng máy lò xo', price: 250000, unit: 'lần' },
      { id: 's10', name: 'Sửa đường ống nước bục vỡ, rò rỉ âm tường', price: 350000, unit: 'điểm' },
      { id: 's11', name: 'Thay bộ xả bồn cầu / Vòi sen tắm nóng lạnh', price: 150000, unit: 'bộ' },
      { id: 's12', name: 'Sửa chữa và thay rơ le máy bơm nước tăng áp', price: 200000, unit: 'máy' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
    ],
    phone: '0912 345 678',
    email: 'tuan.thonuoc@fixnear.vn',
    responseTimeMinutes: 12,
    joinedDate: '2023-01-10',
  },
  {
    id: 'tech-4',
    userId: 'user-tech-4',
    name: 'Phạm Đức Hoàng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    title: 'Thợ Khóa Cấp Tốc 24/7',
    rating: 4.88,
    reviewCount: 82,
    completedJobs: 110,
    completionRate: 98,
    experienceYears: 7,
    city: 'Hà Nội',
    district: 'Nam Từ Liêm',
    address: 'Số 18 Lê Đức Thọ, Nam Từ Liêm, Hà Nội',
    distanceKm: 0.8,
    basePrice: 100000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: false,
    badges: ['verified', 'fast_response'],
    certifications: ['Chứng chỉ Thợ Khóa Khẩn cấp 24/7'],
    bio: 'Cứu hộ mở khóa khẩn cấp có mặt sau 15 phút. Mở khóa tay gạt, khóa tròn, khóa điện tử, smartkey xe máy, làm chìa khóa dự phòng tại chỗ nhanh gọn.',
    categories: ['khoa'],
    servicesOffered: [
      { id: 's13', name: 'Mở khóa cửa nhà bấm / gạt kẹt chìa', price: 150000, unit: 'lần' },
      { id: 's14', name: 'Mở khóa smartkey xe máy / Cốp xe', price: 200000, unit: 'lần' },
      { id: 's15', name: 'Lắp đặt khóa cửa thông minh vân tay', price: 400000, unit: 'bộ' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80',
    ],
    phone: '0936 999 888',
    email: 'hoang.khoa@fixnear.vn',
    responseTimeMinutes: 8,
    joinedDate: '2023-08-01',
  },
  {
    id: 'tech-5',
    userId: 'user-tech-5',
    name: 'Vũ Quốc Bảo',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    title: 'Sửa Máy Giặt & Tủ Lạnh Inverter',
    rating: 4.92,
    reviewCount: 115,
    completedJobs: 154,
    completionRate: 98,
    experienceYears: 9,
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: 'Số 89 Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
    distanceKm: 1.5,
    basePrice: 180000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    badges: ['verified', 'top_rated', 'pro'],
    certifications: ['Chứng chỉ Chuyên gia Electrolux & Toshiba Inverter'],
    bio: 'Chuyên trị các dòng máy giặt lồng ngang Electrolux, LG, Samsung, Toshiba và tủ lạnh Side-by-Side cao cấp. Kiểm tra báo lỗi đúng chuẩn nhà sản xuất.',
    categories: ['may-giat', 'tu-lanh', 'dien-lanh'],
    servicesOffered: [
      { id: 's16', name: 'Vệ sinh tháo lồng giặt cửa ngang khử khuẩn', price: 350000, unit: 'máy' },
      { id: 's17', name: 'Sửa lỗi máy giặt báo mã lỗi IE, OE, LE', price: 250000, unit: 'lần' },
      { id: 's18', name: 'Sửa tủ lạnh không đông đá, hỏng sensor', price: 300000, unit: 'lần' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
    ],
    phone: '0903 111 222',
    email: 'bao.inverter@fixnear.vn',
    responseTimeMinutes: 15,
    joinedDate: '2023-04-12',
  },
  {
    id: 'tech-6',
    userId: 'user-tech-6',
    name: 'Đặng Thanh Tùng',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    title: 'Cứu Hộ & Sửa Xe Máy Lưu Động',
    rating: 4.79,
    reviewCount: 74,
    completedJobs: 95,
    completionRate: 96,
    experienceYears: 5,
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    address: 'Số 234 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM',
    distanceKm: 2.1,
    basePrice: 80000,
    isOnline: true,
    isAvailable: true,
    isVerified: true,
    isPro: false,
    badges: ['verified', 'fast_response'],
    certifications: ['Chứng chỉ Kỹ thuật viên Honda'],
    bio: 'Cứu hộ xe máy tận nhà, trên đường. Vá xe không săm, thay săm xe ga, kích bình ắc quy, sửa xe ngập nước chết máy.',
    categories: ['xe-may'],
    servicesOffered: [
      { id: 's19', name: 'Vá ép săm lốp xe ga / xe số tận nơi', price: 80000, unit: 'miếng' },
      { id: 's20', name: 'Kích nổ / Thay bình ắc quy GS chính hãng', price: 350000, unit: 'bình' },
      { id: 's21', name: 'Sửa xe chết máy do ngập nước / Bugi', price: 150000, unit: 'lần' },
    ],
    workPhotos: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
    ],
    phone: '0909 333 444',
    email: 'tung.xemay@fixnear.vn',
    responseTimeMinutes: 10,
    joinedDate: '2023-07-19',
  }
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-1',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    customerPhone: '0912 333 444',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    categoryId: 'dien-lanh',
    categoryName: 'Điện lạnh / Điều hòa',
    title: 'Điều hòa Panasonic phòng khách không lạnh chỉ phả gió nóng',
    description: 'Điều hòa nhà mình bật 18 độ vẫn không thấy mát, chỉ ra gió như quạt, cục nóng ngoài ban công có chạy nhưng ngắt liên tục. Cần thợ kiểm tra nạp gas hoặc kiểm tra tụ trong chiều nay.',
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80'
    ],
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    address: 'Chung cư Discovery Complex, 302 Cầu Giấy',
    preferredTime: 'Hôm nay, 14:00 - 16:00',
    budget: 350000,
    status: 'open',
    offersCount: 3,
    quotes: [
      {
        id: 'quote-1',
        requestId: 'req-1',
        technicianId: 'tech-1',
        technicianName: 'Nguyễn Văn Minh',
        technicianAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
        technicianRating: 4.9,
        technicianPhone: '0988 123 456',
        laborCost: 150000,
        materialCost: 150000,
        totalAmount: 300000,
        estimatedHours: '1 - 1.5 giờ',
        warrantyMonths: 6,
        notes: 'Bao gồm vệ sinh dàn nóng lạnh + nạp bổ sung gas R32 chuẩn chính hãng',
        createdAt: '2026-08-26T09:00:00Z',
        status: 'pending'
      }
    ],
    createdAt: '2026-08-26T08:30:00Z',
  },
  {
    id: 'req-2',
    customerId: 'user-cust-2',
    customerName: 'Phạm Minh Trí',
    customerPhone: '0934 555 666',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    categoryId: 'dien',
    categoryName: 'Sửa chữa Điện',
    title: 'Chập điện nhảy Aptomat tổng tầng 2 không gạt lên được',
    description: 'Sáng nay đang cắm ấm siêu tốc thì bị nổ tách một cái rồi sập aptomat tổng tầng 2. Gạt lên là tự nhảy lại ngay. Cần thợ có thiết bị đo điện đến xử lý gấp.',
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
    ],
    city: 'Hà Nội',
    district: 'Thanh Xuân',
    address: 'Số 48 Ngõ 165 Khuất Duy Tiến',
    preferredTime: 'Càng sớm càng tốt (Buổi sáng)',
    budget: 250000,
    status: 'open',
    offersCount: 4,
    createdAt: '2026-08-26T07:45:00Z',
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    customerPhone: '0912 333 444',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    customerAddress: 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội',
    technicianId: 'tech-1',
    technicianName: 'Nguyễn Văn Minh',
    technicianAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    technicianPhone: '0988 123 456',
    technicianTitle: 'Chuyên gia Điện lạnh & Điều hòa',
    categoryId: 'dien-lanh',
    serviceName: 'Vệ sinh bảo dưỡng điều hòa treo tường (9000-12000 BTU)',
    date: '2026-08-20',
    timeSlot: '14:00 - 15:30',
    address: 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    notes: 'Điều hòa phòng ngủ chính hơi có mùi ẩm và chảy nước góc trái',
    estimatedPrice: 150000,
    finalPrice: 150000,
    paymentMethod: 'escrow',
    paymentStatus: 'released',
    escrowAmount: 150000,
    warrantyMonths: 6,
    status: 'reviewed',
    createdAt: '2026-08-19T10:00:00Z',
    completedAt: '2026-08-20T15:30:00Z',
  },
  {
    id: 'bk-2',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    customerPhone: '0912 333 444',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    customerAddress: 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội',
    technicianId: 'tech-1',
    technicianName: 'Nguyễn Văn Minh',
    technicianAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    technicianPhone: '0988 123 456',
    technicianTitle: 'Chuyên gia Điện lạnh & Điều hòa',
    categoryId: 'dien-lanh',
    serviceName: 'Nạp gas bổ sung R32/R410A',
    date: '2026-08-27',
    timeSlot: '09:00 - 10:30',
    address: 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    notes: 'Điều hòa phòng khách thiếu gas cần nạp bổ sung',
    estimatedPrice: 250000,
    paymentMethod: 'escrow',
    paymentStatus: 'holding_escrow',
    escrowAmount: 250000,
    warrantyMonths: 3,
    status: 'in_progress',
    createdAt: '2026-08-26T08:00:00Z',
  }
];

export const INITIAL_DISPUTES: DisputeTicket[] = [
  {
    id: 'disp-1',
    bookingId: 'bk-historical-99',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    technicianId: 'tech-6',
    technicianName: 'Đặng Thanh Tùng',
    issueType: 'quality',
    description: 'Vá xe máy nhưng đi được 2 ngày lại xì hơi ở đúng mép cũ.',
    refundRequested: 80000,
    status: 'investigating',
    adminNotes: 'Đang liên hệ thợ để bảo hành vá lại miễn phí cho khách.',
    createdAt: '2026-08-24T10:00:00Z',
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-cust-1',
    name: 'Hoàng Thùy Linh',
    email: 'khachhang@fixnear.vn',
    phone: '0912 333 444',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    address: 'Căn 1502 Discovery Complex, 302 Cầu Giấy',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-tech-1',
    name: 'Nguyễn Văn Minh',
    email: 'tho@fixnear.vn',
    phone: '0988 123 456',
    role: 'technician',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    address: 'Số 45 Trần Thái Tông, Cầu Giấy',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    createdAt: '2023-03-15T00:00:00Z',
  },
  {
    id: 'user-admin-1',
    name: 'Quản Trị Viên FixNear',
    email: 'admin@fixnear.vn',
    phone: '0909 999 888',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    address: 'Tầng 12 Keangnam Landmark 72',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    createdAt: '2023-01-01T00:00:00Z',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'bk-1',
    technicianId: 'tech-1',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    ratings: {
      quality: 5,
      attitude: 5,
      punctuality: 5,
      pricing: 5,
    },
    comment: 'Anh Minh đến đúng hẹn, vệ sinh điều hòa rất sạch sẽ, có bạt hứng nước cẩn thận không làm ướt sàn gỗ. Máy sau khi bảo dưỡng chạy êm ru và mát lạnh ngay lập tức. Sẽ tiếp tục ủng hộ!',
    serviceName: 'Vệ sinh bảo dưỡng điều hòa treo tường',
    createdAt: '2026-08-20T14:30:00Z',
    technicianReply: 'Cảm ơn chị Linh đã tin tưởng dịch vụ. Nếu máy có vấn đề gì chị cứ gọi em theo số hotline trên phiếu bảo hành nhé!'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    customerId: 'user-cust-1',
    customerName: 'Hoàng Thùy Linh',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    technicianId: 'tech-1',
    technicianName: 'Nguyễn Văn Minh',
    technicianAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    technicianTitle: 'Chuyên gia Điện lạnh & Điều hòa',
    lastMessage: 'Dạ em gửi chị báo giá điện tử trọn gói 300.000đ đã bao gồm bảo hành 6 tháng nhé ạ!',
    lastMessageTime: '2026-08-26T09:15:00Z',
    unreadCount: 1,
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-cust-1',
    senderName: 'Hoàng Thùy Linh',
    senderRole: 'customer',
    recipientId: 'tech-1',
    text: 'Chào anh Minh, điều hòa nhà em dạo này bật lâu mát và chảy ít nước ở mép trong, anh có nhận làm chiều nay không ạ?',
    timestamp: '2026-08-26T08:50:00Z',
    isRead: true,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'tech-1',
    senderName: 'Nguyễn Văn Minh',
    senderRole: 'technician',
    recipientId: 'user-cust-1',
    text: 'Chào chị Linh! Em gửi chị báo giá điện tử trọn gói xử lý máng nước và bảo dưỡng nạp gas bổ sung nhé.',
    isOffer: true,
    offerAmount: 300000,
    quoteDetails: {
      laborCost: 150000,
      materialCost: 150000,
      total: 300000,
      warranty: 6
    },
    timestamp: '2026-08-26T08:58:00Z',
    isRead: true,
  }
];

```

---

### File: `src/services/storageService.ts`

```typescript
import { 
  Technician, 
  ServiceRequest, 
  Booking, 
  Review, 
  User, 
  Conversation, 
  ChatMessage, 
  ServiceCategory, 
  DisputeTicket,
  EQuote 
} from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_TECHNICIANS, 
  INITIAL_REQUESTS, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS, 
  DEMO_USERS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES,
  INITIAL_DISPUTES 
} from '../data/mockData';

const STORAGE_KEYS = {
  CATEGORIES: 'fixnear_categories',
  TECHNICIANS: 'fixnear_technicians',
  REQUESTS: 'fixnear_requests',
  BOOKINGS: 'fixnear_bookings',
  REVIEWS: 'fixnear_reviews',
  USERS: 'fixnear_users',
  CURRENT_USER: 'fixnear_current_user',
  CONVERSATIONS: 'fixnear_conversations',
  MESSAGES: 'fixnear_messages',
  DISPUTES: 'fixnear_disputes',
};

// Initialize DB with seed data if not present
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TECHNICIANS)) {
    localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(INITIAL_TECHNICIANS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(INITIAL_CONVERSATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DISPUTES)) {
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(INITIAL_DISPUTES));
  }
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('fixnear_storage_update', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const storageService = {
  // Categories
  getCategories(): ServiceCategory[] {
    return getItem<ServiceCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  // Technicians
  getTechnicians(): Technician[] {
    return getItem<Technician[]>(STORAGE_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
  },
  getTechnicianById(id: string): Technician | undefined {
    return this.getTechnicians().find(t => t.id === id);
  },
  addTechnician(tech: Technician): void {
    const list = this.getTechnicians();
    list.unshift(tech);
    setItem(STORAGE_KEYS.TECHNICIANS, list);
  },
  updateTechnician(id: string, updates: Partial<Technician>): void {
    const list = this.getTechnicians();
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setItem(STORAGE_KEYS.TECHNICIANS, list);
    }
  },

  // Service Requests & E-Quotes
  getRequests(): ServiceRequest[] {
    return getItem<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  },
  getRequestById(id: string): ServiceRequest | undefined {
    return this.getRequests().find(r => r.id === id);
  },
  addRequest(request: ServiceRequest): void {
    const list = this.getRequests();
    list.unshift(request);
    setItem(STORAGE_KEYS.REQUESTS, list);
  },
  updateRequest(id: string, updates: Partial<ServiceRequest>): void {
    const list = this.getRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setItem(STORAGE_KEYS.REQUESTS, list);
    }
  },
  addQuoteToRequest(requestId: string, quote: EQuote): void {
    const list = this.getRequests();
    const req = list.find(r => r.id === requestId);
    if (req) {
      if (!req.quotes) req.quotes = [];
      req.quotes.push(quote);
      req.offersCount = req.quotes.length;
      setItem(STORAGE_KEYS.REQUESTS, list);
    }
  },

  // Bookings & 4-Step Progress Tracking
  getBookings(): Booking[] {
    return getItem<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },
  getBookingById(id: string): Booking | undefined {
    return this.getBookings().find(b => b.id === id);
  },
  addBooking(booking: Booking): void {
    const list = this.getBookings();
    list.unshift(booking);
    setItem(STORAGE_KEYS.BOOKINGS, list);
  },
  updateBookingStatus(id: string, status: Booking['status'], extra?: { finalPrice?: number; paymentStatus?: Booking['paymentStatus'] }): void {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      const now = new Date().toISOString();
      const current = list[idx];
      
      list[idx] = {
        ...current,
        status,
        ...(extra?.finalPrice ? { finalPrice: extra.finalPrice } : {}),
        ...(extra?.paymentStatus ? { paymentStatus: extra.paymentStatus } : {}),
        ...(status === 'surveying' && !current.surveyAt ? { surveyAt: now } : {}),
        ...(status === 'in_progress' && !current.inProgressAt ? { inProgressAt: now } : {}),
        ...(status === 'completed' && !current.completedAt ? { completedAt: now, paymentStatus: current.paymentMethod === 'escrow' ? 'released' : 'cash_on_delivery' } : {}),
      };
      setItem(STORAGE_KEYS.BOOKINGS, list);
    }
  },

  // Reviews
  getReviews(): Review[] {
    return getItem<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  getReviewsByTechnicianId(technicianId: string): Review[] {
    return this.getReviews().filter(r => r.technicianId === technicianId);
  },
  addReview(review: Review): void {
    const list = this.getReviews();
    list.unshift(review);
    setItem(STORAGE_KEYS.REVIEWS, list);

    const techReviews = list.filter(r => r.technicianId === review.technicianId);
    const avgRating = techReviews.reduce((sum, r) => sum + r.rating, 0) / techReviews.length;
    this.updateTechnician(review.technicianId, {
      rating: Number(avgRating.toFixed(2)),
      reviewCount: techReviews.length
    });

    this.updateBookingStatus(review.bookingId, 'reviewed');
  },

  // Disputes & Support Resolution
  getDisputes(): DisputeTicket[] {
    return getItem<DisputeTicket[]>(STORAGE_KEYS.DISPUTES, INITIAL_DISPUTES);
  },
  addDispute(dispute: DisputeTicket): void {
    const list = this.getDisputes();
    list.unshift(dispute);
    setItem(STORAGE_KEYS.DISPUTES, list);
  },
  resolveDispute(id: string, resolution: 'resolved_refund' | 'resolved_dismissed', adminNotes: string): void {
    const list = this.getDisputes();
    const idx = list.findIndex(d => d.id === id);
    if (idx !== -1) {
      list[idx].status = resolution;
      list[idx].adminNotes = adminNotes;
      list[idx].resolvedAt = new Date().toISOString();
      setItem(STORAGE_KEYS.DISPUTES, list);

      if (resolution === 'resolved_refund') {
        const bk = this.getBookingById(list[idx].bookingId);
        if (bk) {
          this.updateBookingStatus(bk.id, 'cancelled', { paymentStatus: 'refunded' });
        }
      }
    }
  },

  // Users & Auth
  getUsers(): User[] {
    return getItem<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
  },
  getCurrentUser(): User | null {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]);
  },
  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },
  addUser(user: User): void {
    const list = this.getUsers();
    list.push(user);
    setItem(STORAGE_KEYS.USERS, list);
  },

  // Chat Conversations & Messages
  getConversations(): Conversation[] {
    return getItem<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  },
  getMessages(conversationId: string): ChatMessage[] {
    const all = getItem<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    return all.filter(m => m.conversationId === conversationId);
  },
  sendMessage(message: ChatMessage): void {
    const msgs = getItem<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    msgs.push(message);
    setItem(STORAGE_KEYS.MESSAGES, msgs);

    const convs = this.getConversations();
    const idx = convs.findIndex(c => c.id === message.conversationId);
    if (idx !== -1) {
      convs[idx].lastMessage = message.text;
      convs[idx].lastMessageTime = message.timestamp;
      setItem(STORAGE_KEYS.CONVERSATIONS, convs);
    }
  },
  getOrCreateConversation(customerId: string, customerName: string, customerAvatar: string, technician: Technician): Conversation {
    const convs = this.getConversations();
    let conv = convs.find(c => c.customerId === customerId && c.technicianId === technician.id);
    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        customerId,
        customerName,
        customerAvatar,
        technicianId: technician.id,
        technicianName: technician.name,
        technicianAvatar: technician.avatar,
        technicianTitle: technician.title,
        lastMessage: 'Cuộc trò chuyện mới bắt đầu',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
      };
      convs.unshift(conv);
      setItem(STORAGE_KEYS.CONVERSATIONS, convs);
    }
    return conv;
  },

  // Reset to initial mock dataset
  resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TECHNICIANS);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.DISPUTES);
    initializeStorage();
    window.location.reload();
  }
};

```

---

### File: `src/context/AuthContext.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storageService, initializeStorage } from '../services/storageService';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  loginAsRole: (role: UserRole) => void;
  register: (user: Omit<User, 'id' | 'createdAt'>) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStorage();
    const storedUser = storageService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, role?: UserRole): boolean => {
    const users = storageService.getUsers();
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found && role) {
      // Find matching demo user by role
      found = DEMO_USERS.find(u => u.role === role);
    }
    if (found) {
      setUser(found);
      storageService.setCurrentUser(found);
      return true;
    }
    return false;
  };

  const loginAsRole = (role: UserRole) => {
    const demoUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setUser(demoUser);
    storageService.setCurrentUser(demoUser);
  };

  const register = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    storageService.addUser(newUser);
    setUser(newUser);
    storageService.setCurrentUser(newUser);
  };

  const logout = () => {
    setUser(null);
    storageService.setCurrentUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    storageService.setCurrentUser(updated);
  };

  const role: UserRole = user ? user.role : 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        loginAsRole,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

```

---

### File: `src/context/NotificationContext.tsx`

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface ToastNotification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContextType {
  showToast: (title: string, message?: string, type?: NotificationType, duration?: number) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: NotificationType = 'success', duration: number = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastNotification = { id, type, title, message, duration };

      setToasts(prev => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = (title: string, message?: string) => showToast(title, message, 'success');
  const error = (title: string, message?: string) => showToast(title, message, 'error');
  const info = (title: string, message?: string) => showToast(title, message, 'info');

  return (
    <NotificationContext.Provider value={{ showToast, success, error, info }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          const bgMap = {
            success: 'bg-emerald-600 text-white',
            error: 'bg-rose-600 text-white',
            info: 'bg-blue-600 text-white',
            warning: 'bg-amber-600 text-white',
          };
          const IconMap = {
            success: CheckCircle2,
            error: AlertCircle,
            info: Info,
            warning: AlertCircle,
          };
          const Icon = IconMap[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl transition-all transform translate-y-0 duration-300 animate-slide-up ${bgMap[toast.type]}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm leading-snug">{toast.title}</h4>
                {toast.message && <p className="text-xs text-white/90 mt-1 leading-relaxed">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/80 hover:text-white p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

```

---

### File: `src/components/common/Avatar.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isOnline?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isOnline,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const initials = name
    .split(' ')
    .slice(-2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const sizes = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold',
    '2xl': 'w-24 h-24 text-2xl font-bold',
  };

  const badgeSizes = {
    xs: 'w-2 h-2 bottom-0 right-0',
    sm: 'w-2.5 h-2.5 bottom-0 right-0',
    md: 'w-3 h-3 bottom-0 right-0',
    lg: 'w-4 h-4 bottom-0.5 right-0.5 ring-2',
    xl: 'w-5 h-5 bottom-1 right-1 ring-2',
    '2xl': 'w-6 h-6 bottom-1 right-1 ring-3',
  };

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className={cn('rounded-full object-cover shadow-inner', sizes[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm select-none',
            sizes[size]
          )}
        >
          {initials || 'U'}
        </div>
      )}

      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute rounded-full ring-white',
            isOnline ? 'bg-emerald-500 ring-2' : 'bg-slate-400 ring-2',
            badgeSizes[size]
          )}
          title={isOnline ? 'Đang online' : 'Ngoại tuyến'}
        />
      )}
    </div>
  );
};

```

---

### File: `src/components/common/Badge.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'pro';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  dot = false,
}) => {
  const variants = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    pro: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold border-amber-600 shadow-sm',
  };

  const dotColors = {
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    neutral: 'bg-slate-400',
    pro: 'bg-white',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-md gap-1.5',
    md: 'text-xs px-2.5 py-1 font-medium rounded-lg gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border select-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};

```

---

### File: `src/components/common/Button.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-brand focus:ring-blue-500',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm focus:ring-slate-700',
    outline: 'border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

```

---

### File: `src/components/common/CategoryIcon.tsx`

```tsx
import React from 'react';
import { 
  Zap, 
  Droplet, 
  Wind, 
  Disc, 
  Refrigerator, 
  KeyRound, 
  Bike, 
  Tv, 
  Wrench, 
  Home, 
  MoreHorizontal,
  LucideProps 
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  switch (name.toLowerCase()) {
    case 'zap':
    case 'dien':
      return <Zap {...props} />;
    case 'droplet':
    case 'nuoc':
      return <Droplet {...props} />;
    case 'wind':
    case 'dien-lanh':
      return <Wind {...props} />;
    case 'disc':
    case 'may-giat':
      return <Disc {...props} />;
    case 'refrigerator':
    case 'tu-lanh':
      return <Refrigerator {...props} />;
    case 'keyround':
    case 'khoa':
      return <KeyRound {...props} />;
    case 'bike':
    case 'xe-may':
      return <Bike {...props} />;
    case 'tv':
    case 'do-gia-dung':
      return <Tv {...props} />;
    case 'wrench':
    case 'lap-dat':
      return <Wrench {...props} />;
    case 'home':
    case 'nha-cua':
      return <Home {...props} />;
    default:
      return <MoreHorizontal {...props} />;
  }
};

```

---

### File: `src/components/common/Input.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors',
              'focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

```

---

### File: `src/components/common/Modal.tsx`

```tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/formatters';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className={cn(
            'relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full my-8 animate-scale-in',
            maxWidths[maxWidth]
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          {(title || description) && (
            <div className="flex items-start justify-between border-b border-slate-100 p-5 pb-4">
              <div>
                {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
                {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/common/RatingStars.tsx`

```tsx
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/formatters';

export interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  showNumber = true,
  reviewCount,
  className,
  interactive = false,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  const currentVal = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const starValue = idx + 1;
          const isFilled = currentVal >= starValue;
          const isHalf = !isFilled && currentVal >= starValue - 0.5;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                'focus:outline-none transition-transform',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              )}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-200 fill-slate-100'
                )}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className={cn('text-slate-800', textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

```

---

### File: `src/components/common/Select.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-sm">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'block w-full appearance-none rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 transition-colors',
              'focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

```

---

### File: `src/components/common/StatCard.tsx`

```tsx
import React from 'react';
import { cn } from '../../utils/formatters';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  iconBgColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-200',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={cn('p-2.5 rounded-xl flex items-center justify-center', iconBgColor)}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        {(subtitle || change) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {change && (
              <span
                className={cn(
                  'font-semibold px-1.5 py-0.5 rounded',
                  isPositive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-rose-700 bg-rose-50'
                )}
              >
                {change}
              </span>
            )}
            {subtitle && <span className="text-slate-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

```

---

### File: `src/components/layout/Navbar.tsx`

```tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { 
  Wrench, 
  Search, 
  PlusCircle, 
  Menu, 
  X, 
  MessageSquare, 
  CalendarCheck, 
  LayoutDashboard, 
  LogOut, 
  MapPin, 
  ChevronDown, 
  ShieldCheck, 
  HelpCircle,
  Info
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'technician') return '/technician/dashboard';
    return '/customer/dashboard';
  };

  const navLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Tìm thợ', path: '/technicians' },
    { label: 'Dịch vụ', path: '/services' },
    { label: 'Về FixNear', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand group-hover:bg-blue-700 transition">
                <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                  FIX<span className="text-blue-600">NEAR</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider">
                  TÌM THỢ GẦN BẠN
                </span>
              </div>
            </Link>

            {/* City selector dropdown */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 text-xs font-medium hover:bg-slate-200/80 transition cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value as any)}
                aria-label="Chọn thành phố"
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/post-request"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-brand transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              Đăng yêu cầu sửa
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition"
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" isOnline={true} />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-scale-in">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Tài khoản</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold uppercase">
                          {role}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600" />
                          Bảng điều khiển
                        </Link>
                        <Link
                          to="/my-bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                        >
                          <CalendarCheck className="w-4 h-4 text-emerald-600" />
                          Lịch hẹn của tôi
                        </Link>
                        <Link
                          to="/chat"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                        >
                          <MessageSquare className="w-4 h-4 text-amber-600" />
                          Tin nhắn / Chat
                        </Link>
                        {role === 'customer' && (
                          <Link
                            to="/technician/register"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                            Đăng ký làm thợ
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/technician/register"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-300 hover:border-slate-400 bg-white transition"
                >
                  Trở thành thợ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/post-request"
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Đăng yêu cầu
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Khu vực tìm kiếm:</span>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value as any)}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border-none"
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

          <div className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Bảng điều khiển ({role})
                </Link>
                <Link
                  to="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  Lịch sửa chữa
                </Link>
                <Link
                  to="/chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  Tin nhắn
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/technician/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold"
                >
                  Làm đối tác
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

```

---

### File: `src/components/layout/Footer.tsx`

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                FIX<span className="text-blue-500">NEAR</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 font-medium italic">
              “Gặp vấn đề – Tìm thợ gần – Xử lý nhanh.”
            </p>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Nền tảng công nghệ kết nối trực tiếp khách hàng có nhu cầu sửa chữa tại nhà với mạng lưới thợ tay nghề cao, đã qua xác minh danh tính và năng lực tại Việt Nam.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Hotline hỗ trợ: 1900 6868 (8:00 - 21:00)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>contact@fixnear.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Về FixNear */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">FixNear</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/technicians" className="hover:text-white transition">Danh bạ thợ</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Tất cả dịch vụ</Link>
              </li>
              <li>
                <Link to="/post-request" className="hover:text-white transition">Đăng việc tìm thợ</Link>
              </li>
              <li>
                <a href="#business-model" className="hover:text-white transition">Mô hình kinh doanh</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ phổ biến */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch vụ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/technicians?cat=dien-lanh" className="hover:text-white transition">Sửa Điện lạnh / Điều hòa</Link>
              </li>
              <li>
                <Link to="/technicians?cat=dien" className="hover:text-white transition">Sửa chữa Điện dân dụng</Link>
              </li>
              <li>
                <Link to="/technicians?cat=nuoc" className="hover:text-white transition">Thông tắc & Sửa Nước</Link>
              </li>
              <li>
                <Link to="/technicians?cat=may-giat" className="hover:text-white transition">Sửa Máy giặt & Tủ lạnh</Link>
              </li>
              <li>
                <Link to="/technicians?cat=khoa" className="hover:text-white transition">Sửa khóa 24/7</Link>
              </li>
              <li>
                <Link to="/technicians?cat=xe-may" className="hover:text-white transition">Cứu hộ Xe máy</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Đối tác & Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Đối tác & Hỗ trợ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/technician/register" className="text-blue-400 font-semibold hover:text-blue-300 transition">
                  Trở thành đối tác thợ
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">Câu hỏi thường gặp (FAQ)</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Quy chế hoạt động</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Chính sách bảo hành & an toàn</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Bảo mật thông tin</Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-[11px] text-emerald-400 border border-slate-700">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Thợ được xác minh ID</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FIXNEAR Platform. Dự án Khởi nghiệp Đổi mới Sáng tạo Phát triển Web.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Phát triển với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> tại Việt Nam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

```

---

### File: `src/components/layout/DashboardSidebar.tsx`

```tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  ClipboardList, 
  MessageSquare, 
  Star, 
  UserCheck, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Settings, 
  SlidersHorizontal 
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const { user, role } = useAuth();

  const customerLinks = [
    { label: 'Tổng quan', path: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'Yêu cầu của tôi', path: '/customer/requests', icon: ClipboardList },
    { label: 'Lịch hẹn sửa chữa', path: '/my-bookings', icon: CalendarCheck },
    { label: 'Tin nhắn / Chat', path: '/chat', icon: MessageSquare },
    { label: 'Đánh giá & Review', path: '/reviews', icon: Star },
  ];

  const technicianLinks = [
    { label: 'Tổng quan công việc', path: '/technician/dashboard', icon: LayoutDashboard },
    { label: 'Yêu cầu gần bạn (Radar)', path: '/technician/radar', icon: ClipboardList },
    { label: 'Lịch hẹn khách đặt', path: '/my-bookings', icon: CalendarCheck },
    { label: 'Tin nhắn khách hàng', path: '/chat', icon: MessageSquare },
    { label: 'Hồ sơ thợ & Dịch vụ', path: `/technicians/${user?.id === 'user-tech-1' ? 'tech-1' : 'tech-1'}`, icon: UserCheck },
    { label: 'Gói FixNear Pro', path: '/technician/pro', icon: Sparkles },
  ];

  const adminLinks = [
    { label: 'Tổng quan Platform', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Quản lý Người dùng', path: '/admin/users', icon: Users },
    { label: 'Quản lý Thợ sửa chữa', path: '/admin/technicians', icon: ShieldCheck },
    { label: 'Yêu cầu & Đơn hàng', path: '/admin/requests', icon: ClipboardList },
    { label: 'Doanh thu & Báo cáo', path: '/admin/revenue', icon: TrendingUp },
    { label: 'Danh mục dịch vụ', path: '/admin/categories', icon: Layers },
  ];

  const currentLinks = role === 'admin' ? adminLinks : role === 'technician' ? technicianLinks : customerLinks;

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User preview header */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <Avatar src={user?.avatar} name={user?.name || 'FixNear'} size="md" isOnline={true} />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name}</h4>
            <p className="text-[11px] text-slate-500 truncate">{user?.phone}</p>
            <span className="inline-block text-[10px] uppercase font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded mt-1">
              {role === 'customer' ? 'Khách hàng' : role === 'technician' ? 'Thợ đối tác' : 'Quản trị viên'}
            </span>
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="space-y-1">
          {currentLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Pro Banner in sidebar for tech or support for cust */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        {role === 'technician' ? (
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white text-xs">
            <div className="flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              FixNear Pro
            </div>
            <p className="text-[11px] text-amber-100 mt-1 leading-snug">
              Nhận gấp 3 lần đơn hàng và huy hiệu vàng uy tín.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900">
            <p className="font-bold text-blue-800">Cần hỗ trợ?</p>
            <p className="text-[11px] text-blue-600 mt-0.5">Hotline CSKH: 1900 6868</p>
          </div>
        )}
      </div>
    </aside>
  );
};

```

---

### File: `src/components/layout/RoleDemoBar.tsx`

```tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { storageService } from '../../services/storageService';
import { UserCheck, Wrench, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleDemoBar: React.FC = () => {
  const { role, user, loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitchRole = (newRole: UserRole) => {
    loginAsRole(newRole);
    if (newRole === 'customer') navigate('/customer/dashboard');
    else if (newRole === 'technician') navigate('/technician/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ dữ liệu demo về trạng thái ban đầu?')) {
      storageService.resetToDefault();
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 py-1.5 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Bảng điều khiển Demo (Dành cho Giảng viên & Hội đồng):
          </span>
          <span className="hidden sm:inline text-slate-400">
            Đang đăng nhập: <strong className="text-white">{user?.name}</strong> ({role})
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleSwitchRole('customer')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'customer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Khách hàng
          </button>

          <button
            onClick={() => handleSwitchRole('technician')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'technician'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Wrench className="w-3 h-3" />
            Thợ sửa chữa
          </button>

          <button
            onClick={() => handleSwitchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
              role === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3 h-3" />
            Quản trị viên
          </button>

          <button
            onClick={handleResetData}
            title="Khôi phục lại dữ liệu mẫu ban đầu"
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-md flex items-center gap-1 ml-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Đặt lại Mock Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/home/DigitizationTable.tsx`

```tsx
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

```

---

### File: `src/components/requests/RequestCard.tsx`

```tsx
import React from 'react';
import { ServiceRequest } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import { MapPin, Clock, DollarSign, MessageSquare, ChevronRight, Eye } from 'lucide-react';

export interface RequestCardProps {
  request: ServiceRequest;
  onOfferQuote?: (req: ServiceRequest) => void;
  showActions?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onOfferQuote,
  showActions = true,
}) => {
  const statusBadges = {
    open: { label: 'Đang tìm thợ', variant: 'success' as const },
    assigned: { label: 'Đã giao thợ', variant: 'info' as const },
    in_progress: { label: 'Đang sửa', variant: 'warning' as const },
    completed: { label: 'Hoàn thành', variant: 'primary' as const },
    cancelled: { label: 'Đã hủy', variant: 'danger' as const },
  };

  const currentBadge = statusBadges[request.status] || statusBadges.open;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header with category and status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="primary" size="sm">
            {request.categoryName}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {formatRelativeTime(request.createdAt)}
            </span>
            <Badge variant={currentBadge.variant} size="sm" dot>
              {currentBadge.label}
            </Badge>
          </div>
        </div>

        {/* Title & description */}
        <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition line-clamp-2 leading-snug">
          {request.title}
        </h4>
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {request.description}
        </p>

        {/* Request details info */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{request.district}, {request.city}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{request.preferredTime}</span>
          </div>
        </div>
      </div>

      {/* Footer budget & CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar src={request.customerAvatar} name={request.customerName} size="xs" />
          <span className="text-xs font-semibold text-slate-700 truncate max-w-[110px]">
            {request.customerName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Ngân sách dự kiến</span>
            <span className="text-xs font-extrabold text-blue-600">
              {request.budget > 0 ? formatCurrency(request.budget) : 'Thỏa thuận'}
            </span>
          </div>

          {showActions && onOfferQuote && request.status === 'open' && (
            <Button
              size="sm"
              onClick={() => onOfferQuote(request)}
              className="text-xs font-semibold"
            >
              Báo giá
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/requests/SmartMatchingModal.tsx`

```tsx
import React from 'react';
import { ServiceRequest, Technician } from '../../types';
import { getRecommendedTechnicians } from '../../utils/matchingEngine';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles, ShieldCheck, CheckCircle2, MessageSquare, CalendarCheck, Zap } from 'lucide-react';

export interface SmartMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  allTechnicians: Technician[];
  onSelectTech: (tech: Technician) => void;
  onChatTech: (tech: Technician) => void;
}

export const SmartMatchingModal: React.FC<SmartMatchingModalProps> = ({
  isOpen,
  onClose,
  request,
  allTechnicians,
  onSelectTech,
  onChatTech,
}) => {
  if (!isOpen || !request) return null;

  const recommendations = getRecommendedTechnicians(request, allTechnicians, 3);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="FixNear AI Smart Matching — Đề Xuất Thợ Tối Ưu"
      description="Hệ thống tự động phân tích và đối chiếu yêu cầu sửa chữa với cơ sở dữ liệu thợ trong khu vực."
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        
        {/* Analysis Overview Card */}
        <div className="p-3.5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl space-y-1.5 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Phân tích yêu cầu tự động
            </span>
          </div>
          <h4 className="font-bold text-sm text-white line-clamp-1">{request.title}</h4>
          <p className="text-[11px] text-slate-300">
            Khu vực: <strong>{request.district}, {request.city}</strong> • Ngân sách: <strong>{formatCurrency(request.budget)}</strong>
          </p>
        </div>

        {/* Recommended Techs List */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
            Top 3 Thợ Kỹ Thuật Phù Hợp Nhất ({recommendations.length}):
          </h4>

          {recommendations.map(({ technician, score, reasons }, idx) => (
            <div
              key={technician.id}
              className={`p-4 rounded-2xl border transition relative overflow-hidden ${
                idx === 0
                  ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-sm">
                  PHÙ HỢP NHẤT
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Avatar src={technician.avatar} name={technician.name} size="md" isOnline={technician.isOnline} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900">{technician.name}</h5>
                      {technician.isVerified && <ShieldCheck className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">{technician.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingStars rating={technician.rating} reviewCount={technician.reviewCount} size="sm" />
                      <span className="text-[10px] text-slate-400">• {technician.completedJobs} đơn</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{score}% Độ Phù Hợp</span>
                  </div>
                  <span className="block text-[11px] font-black text-blue-600 mt-1">
                    Từ {formatCurrency(technician.basePrice)}
                  </span>
                </div>
              </div>

              {/* Reasons badges */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                {reasons.map((r, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" /> {r}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => {
                    onClose();
                    onChatTech(technician);
                  }}
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                >
                  Chat tư vấn
                </Button>
                <Button
                  size="sm"
                  className="text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onSelectTech(technician);
                  }}
                  leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                >
                  Đặt lịch ngay
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Modal>
  );
};

```

---

### File: `src/components/technicians/TechCard.tsx`

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Technician } from '../../types';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CalendarCheck, 
  Sparkles,
  ArrowRight,
  Scale
} from 'lucide-react';

export interface TechCardProps {
  technician: Technician;
  onQuickBook?: (tech: Technician) => void;
  onCompareToggle?: (tech: Technician) => void;
  isComparing?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
  technician,
  onQuickBook,
  onCompareToggle,
  isComparing = false,
}) => {
  return (
    <div className={`bg-white rounded-2xl border ${isComparing ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200/80'} p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group relative overflow-hidden`}>
      
      {/* Pro Ribbon */}
      {technician.isPro && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>PRO</span>
        </div>
      )}

      <div>
        {/* Top Profile Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <Avatar
            src={technician.avatar}
            name={technician.name}
            size="lg"
            isOnline={technician.isOnline}
          />

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                to={`/technicians/${technician.id}`}
                className="font-bold text-sm text-slate-900 hover:text-blue-600 transition truncate"
              >
                {technician.name}
              </Link>

              {technician.isVerified && (
                <span title="Đã xác thực CCCD & Bằng nghề" className="inline-flex">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
              {technician.title}
            </p>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <RatingStars rating={technician.rating} reviewCount={technician.reviewCount} size="sm" />
              <span className="text-[11px] font-semibold text-slate-500">
                • {technician.completedJobs} đơn ({technician.completionRate || 98}%)
              </span>
            </div>
          </div>
        </div>

        {/* Badges list */}
        <div className="flex flex-wrap gap-1 mb-3">
          {technician.isVerified && (
            <Badge variant="primary" size="sm" className="text-[10px]">
              ✓ CCCD
            </Badge>
          )}
          {technician.rating >= 4.9 && (
            <Badge variant="warning" size="sm" className="text-[10px]">
              Top Đánh Giá
            </Badge>
          )}
          {technician.responseTimeMinutes <= 10 && (
            <Badge variant="success" size="sm" className="text-[10px]">
              Phản hồi &lt; 10p
            </Badge>
          )}
        </div>

        {/* Location & Speed stats */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{technician.district} (~{technician.distanceKm} km)</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate text-emerald-700 font-medium">Đến sau {technician.responseTimeMinutes * 2}p</span>
          </div>
        </div>

        {/* Short Bio Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {technician.bio}
        </p>
      </div>

      {/* Bottom Price & Actions */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Chi phí từ</span>
            <span className="text-sm font-extrabold text-blue-600">
              {formatCurrency(technician.basePrice)}
            </span>
          </div>

          {onCompareToggle && (
            <button
              type="button"
              onClick={() => onCompareToggle(technician)}
              className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-1 rounded-lg transition ${
                isComparing
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3 h-3" />
              {isComparing ? 'Đã chọn so sánh' : 'So sánh'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/technicians/${technician.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold"
            >
              Xem hồ sơ
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={() => onQuickBook && onQuickBook(technician)}
            className="w-full text-xs font-bold"
            rightIcon={<CalendarCheck className="w-3.5 h-3.5" />}
          >
            Đặt lịch
          </Button>
        </div>
      </div>

    </div>
  );
};

```

---

### File: `src/components/technicians/BookingModal.tsx`

```tsx
import React, { useState } from 'react';
import { Technician, Booking, ServiceItem, PaymentMethod } from '../../types';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Avatar } from '../common/Avatar';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  technician: Technician | null;
  preSelectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  technician,
  preSelectedService,
}) => {
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || technician?.servicesOffered[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00 - 11:00');
  const [customerAddress, setCustomerAddress] = useState<string>(
    user?.address || 'Căn 1502 Discovery Complex, 302 Cầu Giấy, Hà Nội'
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    user?.phone || '0912 333 444'
  );
  const [customerName, setCustomerName] = useState<string>(
    user?.name || 'Hoàng Thùy Linh'
  );
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('escrow');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!technician) return null;

  const currentService = technician.servicesOffered.find(s => s.id === selectedServiceId) || technician.servicesOffered[0];
  const estimatedPrice = currentService ? currentService.price : technician.basePrice;

  const timeSlots = [
    '08:00 - 10:00 (Sáng sớm)',
    '10:00 - 12:00 (Trưa)',
    '14:00 - 16:00 (Đầu chiều)',
    '16:00 - 18:00 (Cuối chiều)',
    '19:00 - 21:00 (Buổi tối)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerAddress.trim() || !customerPhone.trim()) {
      error('Vui lòng điền đầy đủ địa chỉ và số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        customerId: user?.id || 'user-cust-1',
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        customerAddress: customerAddress.trim(),
        technicianId: technician.id,
        technicianName: technician.name,
        technicianAvatar: technician.avatar,
        technicianPhone: technician.phone,
        technicianTitle: technician.title,
        categoryId: technician.categories[0] || 'dien',
        serviceName: currentService?.name || 'Sửa chữa kiểm tra tận nhà',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        address: customerAddress.trim(),
        city: technician.city,
        district: technician.district,
        notes: notes.trim(),
        estimatedPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'escrow' ? 'holding_escrow' : 'cash_on_delivery',
        escrowAmount: paymentMethod === 'escrow' ? estimatedPrice : undefined,
        warrantyMonths: 6,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      storageService.addBooking(newBooking);
      setIsSubmitting(false);
      success(
        'Đặt lịch thành công!',
        paymentMethod === 'escrow' 
          ? 'Tiền cọc được FixNear Escrow tạm giữ an toàn. Thợ sẽ liên hệ bạn ngay.'
          : 'Thợ sẽ liên hệ xác nhận trong vòng 10-15 phút.'
      );
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đặt Lịch Hẹn Sửa Chữa Tại Nhà"
      description="Đặt hẹn nhanh chóng, được cam kết bảo hành và bảo hiểm an toàn bởi FixNear."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Selected Tech Card Preview */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <Avatar src={technician.avatar} name={technician.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900 truncate">{technician.name}</h4>
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            </div>
            <p className="text-slate-500 text-[11px] truncate">{technician.title}</p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>★ {technician.rating}</span>
              <span>• {technician.district} (~{technician.distanceKm} km)</span>
            </div>
          </div>
        </div>

        {/* Service Item Select */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Chọn hạng mục sửa chữa mong muốn:
          </label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {technician.servicesOffered.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} — {formatCurrency(service.price)} / {service.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Slot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              2. Ngày hẹn thợ đến:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Khung giờ mong muốn:
            </label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
            >
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address and Contact Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <Input
            label="4. Địa chỉ nhà chi tiết thợ cần đến *"
            value={customerAddress}
            onChange={(e: any) => setCustomerAddress(e.target.value)}
            placeholder="Số nhà, tên tòa nhà, số ngõ/đường..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Họ tên người nhận thợ *"
              value={customerName}
              onChange={(e: any) => setCustomerName(e.target.value)}
              required
            />

            <Input
              label="Số điện thoại liên hệ *"
              value={customerPhone}
              onChange={(e: any) => setCustomerPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Ghi chú thêm về sự cố (Nếu có):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: Cần mang thang nhôm, nhà ở tầng 3 không có thang máy..."
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Method Selector (Escrow vs Cash) */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <label className="block font-bold text-slate-700 uppercase tracking-wider">
            5. Phương thức thanh toán & Bảo vệ:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                paymentMethod === 'escrow'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'escrow'}
                onChange={() => setPaymentMethod('escrow')}
                className="mt-0.5"
              />
              <div>
                <div className="font-bold text-xs flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  Ký quỹ FixNear Escrow
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Tạm giữ tiền an toàn 100%. Tiền chỉ chuyển cho thợ sau khi bạn nghiệm thu hài lòng.
                </p>
              </div>
            </label>

            <label
              className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                paymentMethod === 'cash'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="mt-0.5"
              />
              <div>
                <div className="font-bold text-xs">Tiền mặt sau thi công</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Thanh toán trực tiếp cho thợ sau khi kiểm tra xong thiết bị.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Cost Summary Box */}
        <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 block">Chi phí tạm tính:</span>
            <span className="text-base font-black text-blue-700">
              {formatCurrency(estimatedPrice)}
            </span>
          </div>
          <div className="text-[11px] text-right text-slate-600">
            <span className="block font-semibold text-emerald-700">✓ Cam kết bảo hành 6 tháng</span>
            <span className="text-[10px] text-slate-400">Không thu phụ phí nếu chưa sửa</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            size="sm"
            isLoading={isSubmitting}
            className="font-bold px-6 shadow-brand"
          >
            Xác nhận đặt lịch hẹn
          </Button>
        </div>

      </form>
    </Modal>
  );
};

```

---

### File: `src/components/technicians/CompareModal.tsx`

```tsx
import React from 'react';
import { Technician } from '../../types';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Zap, 
  DollarSign, 
  X,
  MessageSquare,
  CalendarCheck
} from 'lucide-react';

export interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  technicians: Technician[];
  onRemoveTech: (id: string) => void;
  onBookTech: (tech: Technician) => void;
  onChatTech: (tech: Technician) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  technicians,
  onRemoveTech,
  onBookTech,
  onChatTech,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="So Sánh Hồ Sơ Thợ Kỹ Thuật (Side-by-Side)"
      description="Đối chiếu kinh nghiệm, giá cả, đánh giá và tốc độ phản hồi để chọn người thợ phù hợp nhất."
      maxWidth="2xl"
    >
      {technicians.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          Chưa chọn thợ nào để so sánh. Vui lòng chọn 2-3 thợ trong danh bạ.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider w-40">
                  Tiêu chí so sánh
                </th>
                {technicians.map(tech => (
                  <th key={tech.id} className="p-3 bg-white text-center min-w-[200px] border-l border-slate-100 relative">
                    <button
                      onClick={() => onRemoveTech(tech.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-100 transition"
                      title="Bỏ so sánh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Avatar src={tech.avatar} name={tech.name} size="lg" isOnline={tech.isOnline} className="mx-auto mb-2" />
                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{tech.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{tech.title}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {/* Rating & Reviews */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Đánh giá sao</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <RatingStars rating={tech.rating} reviewCount={tech.reviewCount} size="sm" />
                  </td>
                ))}
              </tr>

              {/* Completed Jobs & Completion rate */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Đơn & Tỷ lệ hoàn thành</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-bold">
                    <span className="text-blue-600">{tech.completedJobs} đơn</span>
                    <span className="text-slate-400 font-normal"> ({tech.completionRate || 98}%)</span>
                  </td>
                ))}
              </tr>

              {/* Experience */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Kinh nghiệm</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-bold">
                    {tech.experienceYears} năm làm nghề
                  </td>
                ))}
              </tr>

              {/* Distance & Location */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Khoảng cách & Khu vực</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <span className="font-bold text-emerald-600 block">~{tech.distanceKm} km</span>
                    <span className="text-slate-500 text-[11px]">{tech.district}</span>
                  </td>
                ))}
              </tr>

              {/* Response Time */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Tốc độ phản hồi</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-semibold text-emerald-700">
                    ~{tech.responseTimeMinutes} phút
                  </td>
                ))}
              </tr>

              {/* Base Price */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Chi phí dịch vụ từ</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 font-black text-blue-600 text-sm">
                    {formatCurrency(tech.basePrice)}
                  </td>
                ))}
              </tr>

              {/* Badges & Trust */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Huy hiệu uy tín</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tech.isVerified && <Badge variant="primary" size="sm">✓ Xác thực CCCD</Badge>}
                      {tech.isPro && <Badge variant="pro" size="sm">★ Pro</Badge>}
                      {tech.rating >= 4.9 && <Badge variant="warning" size="sm">Top Đánh Giá</Badge>}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Certifications */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Chứng chỉ nghề</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 text-[11px] text-slate-600">
                    {tech.certifications && tech.certifications.length > 0 ? (
                      tech.certifications.map((c, i) => <div key={i}>• {c}</div>)
                    ) : (
                      <span>Đã qua thẩm định tay nghề</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-3 bg-slate-50 font-semibold text-slate-600">Lựa chọn</td>
                {technicians.map(tech => (
                  <td key={tech.id} className="p-3 text-center border-l border-slate-100 space-y-1.5">
                    <Button
                      size="sm"
                      className="w-full font-bold text-xs"
                      onClick={() => {
                        onClose();
                        onBookTech(tech);
                      }}
                      leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                    >
                      Đặt lịch ngay
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => {
                        onClose();
                        onChatTech(tech);
                      }}
                      leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                    >
                      Chat trước
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};

```

---

### File: `src/components/technicians/DisputeModal.tsx`

```tsx
import React, { useState } from 'react';
import { Booking, DisputeTicket } from '../../types';
import { storageService } from '../../services/storageService';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatters';
import { AlertTriangle, ShieldCheck, Send } from 'lucide-react';

export interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { success, error } = useNotification();

  const [issueType, setIssueType] = useState<DisputeTicket['issueType']>('quality');
  const [description, setDescription] = useState('');
  const [refundAmount, setRefundAmount] = useState(booking?.estimatedPrice ? String(booking.estimatedPrice) : '150000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      error('Vui lòng mô tả chi tiết lý do khiếu nại.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newDispute: DisputeTicket = {
        id: `disp-${Date.now()}`,
        bookingId: booking.id,
        customerId: booking.customerId,
        customerName: booking.customerName,
        technicianId: booking.technicianId,
        technicianName: booking.technicianName,
        issueType,
        description: description.trim(),
        refundRequested: Number(refundAmount) || 0,
        status: 'open',
        createdAt: new Date().toISOString(),
      };

      storageService.addDispute(newDispute);
      setIsSubmitting(false);
      success('Đã gửi yêu cầu khiếu nại thành công!', 'Bộ phận CSKH FixNear sẽ can thiệp và xử lý trong vòng 24 giờ.');
      if (onSuccess) onSuccess();
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Khiếu Nại Dịch Vụ & Yêu Cầu Hoàn Tiền"
      description={`Đơn sửa chữa: ${booking.serviceName} - Thợ: ${booking.technicianName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            FixNear cam kết bảo vệ 100% quyền lợi khách hàng. Nếu thợ làm không đạt yêu cầu, làm hỏng đồ hoặc vi phạm quy chế báo giá, sàn sẽ hỗ trợ hoàn tiền hoặc điều thợ khác đến bảo hành miễn phí.
          </p>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Loại vấn đề gặp phải *
          </label>
          <select
            value={issueType}
            onChange={(e: any) => setIssueType(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            <option value="quality">Chất lượng sửa chữa kém / Không khắc phục được lỗi</option>
            <option value="pricing">Thợ báo giá cao hơn thỏa thuận / Không minh bạch</option>
            <option value="punctuality">Thợ đến quá trễ hoặc tự ý hủy hẹn không báo</option>
            <option value="damage">Làm hư hại thêm thiết bị hoặc tài sản trong nhà</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mô tả chi tiết sự việc *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nêu rõ tình trạng hiện tại của thiết bị, thái độ của thợ, các chi phí thợ đã thu..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <Input
          label="Số tiền yêu cầu bồi hoàn / Trừ lại (VNĐ):"
          type="number"
          value={refundAmount}
          onChange={(e: any) => setRefundAmount(e.target.value)}
          helperText={`Tối đa giá trị đơn: ${formatCurrency(booking.finalPrice || booking.estimatedPrice)}`}
        />

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            size="sm"
            isLoading={isSubmitting}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Gửi khiếu nại lên Admin
          </Button>
        </div>

      </form>
    </Modal>
  );
};

```

---

### File: `src/components/technicians/ReviewModal.tsx`

```tsx
import React, { useState } from 'react';
import { Booking, Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { storageService } from '../../services/storageService';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { Star, ThumbsUp } from 'lucide-react';

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSuccess?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [overallRating, setOverallRating] = useState<number>(5);
  const [quality, setQuality] = useState<number>(5);
  const [attitude, setAttitude] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [pricing, setPricing] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      error('Vui lòng viết vài lời nhận xét về dịch vụ');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const avg = Number(((quality + attitude + punctuality + pricing) / 4).toFixed(1));

      const newReview: Review = {
        id: `rev-${Date.now()}`,
        bookingId: booking.id,
        technicianId: booking.technicianId,
        customerId: user?.id || booking.customerId,
        customerName: user?.name || booking.customerName,
        customerAvatar: user?.avatar || booking.customerAvatar,
        rating: avg || overallRating,
        ratings: {
          quality,
          attitude,
          punctuality,
          pricing,
        },
        comment: comment.trim(),
        serviceName: booking.serviceName,
        createdAt: new Date().toISOString(),
      };

      storageService.addReview(newReview);
      setIsSubmitting(false);
      success('Cảm ơn bạn đã gửi đánh giá!', 'Đánh giá đã được đăng lên hồ sơ thợ.');
      onClose();
      if (onSuccess) onSuccess();
    }, 500);
  };

  const criteria = [
    { label: 'Chất lượng sửa chữa', value: quality, set: setQuality },
    { label: 'Thái độ phục vụ', value: attitude, set: setAttitude },
    { label: 'Đúng hẹn & Tác phong', value: punctuality, set: setPunctuality },
    { label: 'Giá cả minh bạch', value: pricing, set: setPricing },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đánh giá chất lượng dịch vụ"
      description={`Gửi nhận xét cho thợ ${booking.technicianName} - Dịch vụ: ${booking.serviceName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 4 Criteria Ratings */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Tiêu chí chấm điểm (1 - 5 sao):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/70">
                <span className="text-xs font-medium text-slate-700">{c.label}</span>
                <RatingStars
                  rating={c.value}
                  size="sm"
                  interactive={true}
                  onRatingChange={c.set}
                  showNumber={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Nhận xét chi tiết của bạn:
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm thực tế của bạn về tay nghề, cách thợ báo giá, sự nhiệt tình..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Để sau
          </Button>
          <Button type="submit" isLoading={isSubmitting} leftIcon={<ThumbsUp className="w-4 h-4" />}>
            Gửi đánh giá
          </Button>
        </div>
      </form>
    </Modal>
  );
};

```

---

### File: `src/pages/HomePage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ServiceCategory, Technician, ServiceRequest } from '../types';
import { TechCard } from '../components/technicians/TechCard';
import { BookingModal } from '../components/technicians/BookingModal';
import { CompareModal } from '../components/technicians/CompareModal';
import { SmartMatchingModal } from '../components/requests/SmartMatchingModal';
import { DigitizationTable } from '../components/home/DigitizationTable';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { 
  Search, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Award,
  Zap,
  Lock,
  Scale
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [featuredTechs, setFeaturedTechs] = useState<Technician[]>([]);
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<Technician | null>(null);

  // Comparison state
  const [compareList, setCompareList] = useState<Technician[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Smart matching state
  const [matchingRequest, setMatchingRequest] = useState<ServiceRequest | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả quận');

  useEffect(() => {
    setCategories(storageService.getCategories());
    setFeaturedTechs(storageService.getTechnicians().slice(0, 6));
    setRecentRequests(storageService.getRequests().slice(0, 4));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('cat', selectedCategory);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedDistrict && selectedDistrict !== 'Tất cả quận') params.set('district', selectedDistrict);
    navigate(`/technicians?${params.toString()}`);
  };

  const handleCompareToggle = (tech: Technician) => {
    if (compareList.some(t => t.id === tech.id)) {
      setCompareList(prev => prev.filter(t => t.id !== tech.id));
    } else {
      if (compareList.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 thợ cùng lúc.');
        return;
      }
      setCompareList(prev => [...prev, tech]);
    }
  };

  const quickTags = [
    'Điều hòa không lạnh',
    'Chập điện nhảy aptomat',
    'Thông tắc bồn cầu',
    'Sửa máy giặt kêu to',
    'Cứu hộ khóa 24/7',
    'Vá xe máy lưu động',
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nền tảng số hóa dịch vụ sửa chữa địa phương thông minh</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Gặp vấn đề? <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
              Tìm thợ gần bạn – Xử lý nhanh.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            FixNear số hóa toàn bộ chuỗi: Đăng yêu cầu → AI Matching → Báo giá điện tử → Đặt lịch → Ký quỹ an toàn Escrow → Nghiệm thu & Bảo hành.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/technicians">
              <Button size="lg" className="shadow-lg shadow-blue-600/30 text-sm sm:text-base">
                Tìm & So sánh thợ ngay
              </Button>
            </Link>
            <Link to="/post-request">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm sm:text-base">
                Đăng yêu cầu sửa chữa
              </Button>
            </Link>
          </div>

          {/* Large Hero Interactive Search Bar */}
          <div className="pt-6 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white text-slate-900 rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-2"
            >
              <div className="flex-[1.5] flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Tôi cần sửa gì? (ví dụ: Điều hòa không mát...)"
                  className="w-full bg-transparent text-sm placeholder-slate-400 focus:outline-none font-medium"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Wrench className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  aria-label="Chọn dịch vụ"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">Tất cả dịch vụ</option>
                  {categories.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
                  aria-label="Chọn thành phố"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>

              <Button type="submit" size="md" className="py-3 md:py-2.5 px-6 shrink-0 font-bold">
                Tìm thợ
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-300">
              <span className="text-slate-400">Tìm kiếm phổ biến:</span>
              {quickTags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate(`/technicians?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">450+</div>
              <div className="text-xs text-slate-400 mt-0.5">Thợ đã xác minh CCCD</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">15.000+</div>
              <div className="text-xs text-slate-400 mt-0.5">Đơn hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 / 5.0</div>
              <div className="text-xs text-slate-400 mt-0.5">Đánh giá hài lòng</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">&lt; 15 phút</div>
              <div className="text-xs text-slate-400 mt-0.5">Thời gian có mặt</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Danh mục sửa chữa
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bạn đang cần sửa chữa gì?
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hơn 11 nhóm dịch vụ chuyên sâu với mạng lưới thợ tay nghề chuẩn sẵn sàng hỗ trợ.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 group"
          >
            Xem tất cả dịch vụ
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/technicians?cat=${cat.slug}`}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <CategoryIcon name={cat.slug} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-400">
                  {cat.technicianCount} thợ gần
                </span>
                <span className="font-bold text-blue-600">
                  Từ {formatCurrency(cat.startingPrice)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. HOW FIXNEAR WORKS (6-STEP DIGITAL CHAIN) */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Quy trình tiện lợi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Chuỗi Nghiệp Vụ Số Hóa Trọn Vẹn
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Khách đăng nhu cầu → FixNear Matching → Báo giá điện tử → Đặt lịch → Ký quỹ Escrow → Đánh giá.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'Đăng nhu cầu',
                desc: 'Mô tả sự cố, tải ảnh/video và khung giờ mong muốn.',
                icon: Wrench,
              },
              {
                step: '02',
                title: 'AI Matching',
                desc: 'Hệ thống tự động chấm điểm & gợi ý 3 thợ tối ưu nhất.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'So sánh & Báo giá',
                desc: 'Đối chiếu hồ sơ 2-3 thợ và nhận báo giá điện tử minh bạch.',
                icon: Scale,
              },
              {
                step: '04',
                title: 'Đặt lịch & Ký quỹ',
                desc: 'Chốt lịch thi công và tạm giữ tiền an toàn qua FixNear Escrow.',
                icon: Lock,
              },
              {
                step: '05',
                title: 'Theo dõi 4 bước',
                desc: 'Giám sát: Xác nhận → Khảo sát → Thi công → Hoàn thành.',
                icon: Clock,
              },
              {
                step: '06',
                title: 'Đánh giá & Bảo hành',
                desc: 'Nghiệm thu, mở khóa tiền cho thợ và kích hoạt bảo hành 6 tháng.',
                icon: ShieldCheck,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card relative overflow-hidden group hover:border-blue-400 transition flex flex-col justify-between"
                >
                  <div className="font-black text-2xl text-blue-600/20 mb-2">
                    {item.step}
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIGITIZATION MATRIX SHOWCASE (Truyền Thống vs Số Hóa) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitizationTable />
      </section>

      {/* 5. FEATURED TECHNICIANS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Đội ngũ xuất sắc
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thợ nổi bật & Được đánh giá cao
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Đã qua xác minh CCCD, chứng chỉ hành nghề và đạt đánh giá từ 4.8 sao trở lên.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareModalOpen(true)}
                className="font-bold text-xs"
                leftIcon={<Scale className="w-3.5 h-3.5 text-blue-600" />}
              >
                So sánh ({compareList.length} thợ)
              </Button>
            )}
            <Link
              to="/technicians"
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 group"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTechs.map(tech => (
            <TechCard
              key={tech.id}
              technician={tech}
              onQuickBook={t => setSelectedTechForBooking(t)}
              onCompareToggle={handleCompareToggle}
              isComparing={compareList.some(t => t.id === tech.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. LIVE SERVICE REQUESTS FEED WITH SMART MATCHING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Live Feed & AI Smart Matching
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">
                Khách hàng đang tìm thợ sửa chữa trong khu vực
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Bấm "AI Matching" để xem danh sách thợ được thuật toán đề xuất phù hợp nhất.
              </p>
            </div>
            <Link to="/post-request">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shrink-0">
                + Đăng việc của bạn ngay
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {recentRequests.map(req => (
              <div
                key={req.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-medium">
                      {req.categoryName}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {req.district}, {req.city}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{req.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Ngân sách: <strong className="text-amber-400">{formatCurrency(req.budget)}</strong>
                  </span>
                  <button
                    onClick={() => setMatchingRequest(req)}
                    className="text-amber-300 hover:text-white font-bold transition flex items-center gap-1 text-xs bg-amber-500/20 px-2.5 py-1 rounded-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    AI Matching Thợ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up">
          <span className="text-xs font-semibold">
            Đã chọn <strong className="text-amber-400">{compareList.length}</strong> thợ để đối chiếu
          </span>
          <Button
            size="sm"
            onClick={() => setCompareModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            leftIcon={<Scale className="w-3.5 h-3.5" />}
          >
            So sánh ngay
          </Button>
          <button
            onClick={() => setCompareList([])}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedTechForBooking}
        onClose={() => setSelectedTechForBooking(null)}
        technician={selectedTechForBooking}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        technicians={compareList}
        onRemoveTech={id => setCompareList(prev => prev.filter(t => t.id !== id))}
        onBookTech={t => setSelectedTechForBooking(t)}
        onChatTech={t => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        }}
      />

      {/* Smart Matching Modal */}
      <SmartMatchingModal
        isOpen={!!matchingRequest}
        onClose={() => setMatchingRequest(null)}
        request={matchingRequest}
        allTechnicians={featuredTechs}
        onSelectTech={t => setSelectedTechForBooking(t)}
        onChatTech={t => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        }}
      />

    </div>
  );
};

```

---

### File: `src/pages/ServicesPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ServiceCategory } from '../types';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCategories(storageService.getCategories());
  }, []);

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.popularServices.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Danh mục dịch vụ FixNear
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">
          Tất cả dịch vụ sửa chữa tại nhà
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
          Mạng lưới thợ kỹ thuật đa lĩnh vực, có mặt sau 15–30 phút. Báo giá công khai trước khi sửa.
        </p>

        {/* Search input */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo loại dịch vụ (ví dụ: điều hòa, tủ lạnh, khóa...)"
            className="w-full bg-white text-slate-900 text-sm rounded-2xl pl-11 pr-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <CategoryIcon name={cat.slug} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600">
                    {cat.technicianCount} thợ sẵn sàng
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Popular Sub-services */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                  Các hạng mục phổ biến:
                </span>
                {cat.popularServices.map((sub: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Giá từ</span>
                <span className="text-sm font-extrabold text-blue-600">
                  {formatCurrency(cat.startingPrice)}
                </span>
              </div>

              <Link to={`/technicians?cat=${cat.slug}`}>
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Tìm thợ
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

```

---

### File: `src/pages/FindTechniciansPage.tsx`

```tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Technician, ServiceCategory } from '../types';
import { TechCard } from '../components/technicians/TechCard';
import { BookingModal } from '../components/technicians/BookingModal';
import { CompareModal } from '../components/technicians/CompareModal';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  ArrowUpDown,
  Scale
} from 'lucide-react';

export const FindTechniciansPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<Technician | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compare state
  const [compareList, setCompareList] = useState<Technician[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Filter States initialized from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'Tất cả');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'Tất cả');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('ratingDesc');

  useEffect(() => {
    setTechnicians(storageService.getTechnicians());
    setCategories(storageService.getCategories());
  }, []);

  // Update query state if URL params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    const city = searchParams.get('city');
    const dist = searchParams.get('district');
    if (q !== null) setQuery(q);
    if (cat !== null) setSelectedCategory(cat);
    if (city !== null) setSelectedCity(city);
    if (dist !== null) setSelectedDistrict(dist);
  }, [searchParams]);

  // District options based on city
  const districtOptions = useMemo(() => {
    if (selectedCity === 'Hà Nội') {
      return ['Tất cả', 'Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông'];
    }
    if (selectedCity === 'TP. Hồ Chí Minh') {
      return ['Tất cả', 'Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];
    }
    return ['Tất cả'];
  }, [selectedCity]);

  // Filtered & Sorted Technicians
  const filteredTechs = useMemo(() => {
    return technicians
      .filter((t: Technician) => {
        // Query search
        if (query) {
          const q = query.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchBio = t.bio.toLowerCase().includes(q);
          const matchServices = t.servicesOffered.some(s => s.name.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchBio && !matchServices) return false;
        }

        // Category
        if (selectedCategory && !t.categories.includes(selectedCategory)) {
          return false;
        }

        // City
        if (selectedCity !== 'Tất cả' && t.city !== selectedCity) {
          return false;
        }

        // District
        if (selectedDistrict !== 'Tất cả' && t.district !== selectedDistrict) {
          return false;
        }

        // Distance
        if (t.distanceKm > maxDistance) {
          return false;
        }

        // Rating
        if (minRating > 0 && t.rating < minRating) {
          return false;
        }

        // Price
        if (t.basePrice > maxPrice) {
          return false;
        }

        // Only Available / Online
        if (onlyAvailable && !t.isAvailable) {
          return false;
        }

        // Only Verified
        if (onlyVerified && !t.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a: Technician, b: Technician) => {
        if (sortBy === 'distanceAsc') return a.distanceKm - b.distanceKm;
        if (sortBy === 'ratingDesc') return b.rating - a.rating;
        if (sortBy === 'jobsDesc') return b.completedJobs - a.completedJobs;
        if (sortBy === 'priceAsc') return a.basePrice - b.basePrice;
        return 0;
      });
  }, [
    technicians,
    query,
    selectedCategory,
    selectedCity,
    selectedDistrict,
    maxDistance,
    minRating,
    maxPrice,
    onlyAvailable,
    onlyVerified,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedCity('Tất cả');
    setSelectedDistrict('Tất cả');
    setMaxDistance(10);
    setMinRating(0);
    setMaxPrice(500000);
    setOnlyAvailable(false);
    setOnlyVerified(false);
    setSortBy('ratingDesc');
    setSearchParams({});
  };

  const handleCompareToggle = (tech: Technician) => {
    if (compareList.some(t => t.id === tech.id)) {
      setCompareList(prev => prev.filter(t => t.id !== tech.id));
    } else {
      if (compareList.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 thợ cùng lúc.');
        return;
      }
      setCompareList(prev => [...prev, tech]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tìm & So sánh thợ sửa chữa gần bạn
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tìm thấy <strong className="text-blue-600 font-bold">{filteredTechs.length}</strong> thợ phù hợp theo tiêu chí
          </p>
        </div>

        {/* Quick search & Mobile filter toggle */}
        <div className="w-full md:w-auto flex items-center gap-2">
          {compareList.length > 0 && (
            <Button
              size="sm"
              onClick={() => setCompareModalOpen(true)}
              className="font-bold text-xs bg-indigo-600 hover:bg-indigo-700"
              leftIcon={<Scale className="w-3.5 h-3.5" />}
            >
              So sánh ({compareList.length})
            </Button>
          )}

          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Tên thợ, chuyên môn, sự cố..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filter + Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Filters */}
        <aside
          className={`md:block md:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-6 shrink-0 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Bộ lọc nâng cao
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Đặt lại
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Loại dịch vụ
            </label>
            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* City & District Filter */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Thành phố
              </label>
              <select
                value={selectedCity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedCity(e.target.value);
                  setSelectedDistrict('Tất cả');
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="Tất cả">Tất cả tỉnh thành</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quận / Huyện
              </label>
              <select
                value={selectedDistrict}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                {districtOptions.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">Khoảng cách tối đa</span>
              <span className="text-blue-600">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={maxDistance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 km</span>
              <span>15 km</span>
            </div>
          </div>

          {/* Rating filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Đánh giá tối thiểu
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Tất cả', val: 0 },
                { label: '4.5 ★', val: 4.5 },
                { label: '4.8 ★', val: 4.8 },
                { label: '5.0 ★', val: 4.9 },
              ].map(r => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setMinRating(r.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    minRating === r.val
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">Giá khởi điểm từ</span>
              <span className="text-blue-600">{formatCurrency(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={80000}
              max={500000}
              step={20000}
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Checkbox Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-medium text-slate-700">
                Đang sẵn sàng nhận việc
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-medium text-slate-700">
                Chỉ thợ đã xác minh danh tính
              </span>
            </label>
          </div>
        </aside>

        {/* Results Column */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Sorting Bar */}
          <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-card flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Sắp xếp kết quả theo:
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ratingDesc">Đánh giá cao nhất</option>
                <option value="distanceAsc">Gần bạn nhất</option>
                <option value="jobsDesc">Nhiều đơn hoàn thành nhất</option>
                <option value="priceAsc">Giá khởi điểm thấp nhất</option>
              </select>
            </div>
          </div>

          {/* Technicians List Grid */}
          {filteredTechs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTechs.map((tech: Technician) => (
                <TechCard
                  key={tech.id}
                  technician={tech}
                  onQuickBook={t => setSelectedTechForBooking(t)}
                  onCompareToggle={handleCompareToggle}
                  isComparing={compareList.some(t => t.id === tech.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-card space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-800">
                Không tìm thấy thợ phù hợp
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy thử mở rộng bán kính khoảng cách hoặc bỏ bớt các tiêu chí lọc để tìm được nhiều thợ hơn.
              </p>
              <Button size="sm" variant="outline" onClick={handleResetFilters}>
                Đặt lại bộ lọc
              </Button>
            </div>
          )}

        </div>

      </div>

      {/* Floating Compare Toolbar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up">
          <span className="text-xs font-semibold">
            Đã chọn <strong className="text-amber-400">{compareList.length}</strong> thợ để so sánh
          </span>
          <Button
            size="sm"
            onClick={() => setCompareModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            leftIcon={<Scale className="w-3.5 h-3.5" />}
          >
            Bật bảng so sánh
          </Button>
          <button
            onClick={() => setCompareList([])}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Bỏ chọn
          </button>
        </div>
      )}

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={!!selectedTechForBooking}
        onClose={() => setSelectedTechForBooking(null)}
        technician={selectedTechForBooking}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        technicians={compareList}
        onRemoveTech={id => setCompareList(prev => prev.filter(t => t.id !== id))}
        onBookTech={t => setSelectedTechForBooking(t)}
        onChatTech={t => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        }}
      />

    </div>
  );
};

```

---

### File: `src/pages/TechnicianDetailPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Technician, Review, ServiceItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { BookingModal } from '../components/technicians/BookingModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Award, 
  Image as ImageIcon,
  ChevronLeft
} from 'lucide-react';

export const TechnicianDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [technician, setTechnician] = useState<Technician | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const found = storageService.getTechnicianById(id);
      if (found) {
        setTechnician(found);
        setReviews(storageService.getReviewsByTechnicianId(id));
      }
    }
  }, [id]);

  if (!technician) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy thông tin thợ</h2>
        <p className="text-slate-500 text-sm">Hồ sơ này có thể đã thay đổi hoặc không tồn tại.</p>
        <Link to="/technicians">
          <Button>Quay lại danh bạ thợ</Button>
        </Link>
      </div>
    );
  }

  const handleStartChat = () => {
    const custId = user?.id || 'user-cust-1';
    const custName = user?.name || 'Khách hàng FixNear';
    const custAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80';
    const conv = storageService.getOrCreateConversation(custId, custName, custAvatar, technician);
    navigate(`/chat?conv=${conv.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <Link
          to="/technicians"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại danh sách thợ
        </Link>
      </div>

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar
              src={technician.avatar}
              name={technician.name}
              size="2xl"
              isOnline={technician.isOnline}
            />
            {technician.isPro && (
              <span className="absolute bottom-0 right-0 bg-amber-500 text-white p-1 rounded-full shadow-md" title="Đối tác FixNear Pro">
                <Sparkles className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {technician.name}
              </h1>
              {technician.isVerified && (
                <Badge variant="primary" size="md" className="gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Đã xác minh CCCD
                </Badge>
              )}
              {technician.isPro && (
                <Badge variant="pro" size="md">
                  ★ FixNear Pro
                </Badge>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-600">
              {technician.title}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={technician.rating} size="md" reviewCount={technician.reviewCount} />
              </div>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">
                {technician.completedJobs} đơn hoàn thành
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">
                {technician.experienceYears} năm kinh nghiệm
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{technician.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 font-semibold">Phản hồi ~{technician.responseTimeMinutes} phút</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Box */}
        <div className="w-full md:w-64 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Chi phí dịch vụ từ</span>
            <span className="text-xl font-extrabold text-blue-600">
              {formatCurrency(technician.basePrice)}
            </span>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full font-bold shadow-md shadow-blue-600/20"
              onClick={() => setBookingModalOpen(true)}
            >
              Đặt lịch hẹn ngay
            </Button>
            <Button
              variant="outline"
              className="w-full font-semibold"
              leftIcon={<MessageSquare className="w-4 h-4 text-blue-600" />}
              onClick={handleStartChat}
            >
              Chat tư vấn
            </Button>
          </div>

          <div className="text-[10px] text-slate-500 text-center space-y-0.5 pt-1">
            <p>✓ Không phát sinh chi phí ẩn</p>
            <p>✓ Miễn phí hủy trước giờ hẹn</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Details + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: About / Bio */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Giới thiệu & Cam kết chất lượng
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {technician.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bảo hành dịch vụ từ 3 – 6 tháng</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Linh kiện thay thế chính hãng 100%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Có mặt đúng giờ hẹn đã xác nhận</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dọn dẹp sạch sẽ sau khi thi công</span>
              </div>
            </div>
          </div>

          {/* Section 2: Service Catalog & Pricing Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Bảng giá dịch vụ cung cấp
              </h3>
              <span className="text-xs text-slate-400 font-medium">Đơn vị: VNĐ</span>
            </div>

            <div className="divide-y divide-slate-100">
              {technician.servicesOffered.map((service: ServiceItem) => (
                <div
                  key={service.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 p-2 rounded-xl transition"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{service.name}</h4>
                    <span className="text-xs text-slate-500">
                      Đơn vị tính: {service.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-sm font-extrabold text-blue-600">
                      {formatCurrency(service.price)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setBookingModalOpen(true)}
                      className="text-xs"
                    >
                      Chọn
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Work Photos Gallery */}
          {technician.workPhotos && technician.workPhotos.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Hình ảnh thi công thực tế
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {technician.workPhotos.map((photo: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video bg-slate-100 shadow-inner group">
                    <img
                      src={photo}
                      alt={`Công trình ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Reviews & Rating Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Đánh giá từ khách hàng ({reviews.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  100% đánh giá từ khách hàng đã hoàn thành đơn trên FixNear
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">{technician.rating}</span>
                <RatingStars rating={technician.rating} size="sm" showNumber={false} />
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 divide-y divide-slate-100">
              {reviews.map((rev: Review) => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={rev.customerAvatar} name={rev.customerName} size="sm" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">{rev.customerName}</h5>
                        <p className="text-[10px] text-slate-400">{formatDate(rev.createdAt)}</p>
                      </div>
                    </div>

                    <RatingStars rating={rev.rating} size="sm" />
                  </div>

                  <div className="inline-block text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                    Dịch vụ: {rev.serviceName}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Technician Reply */}
                  {rev.technicianReply && (
                    <div className="ml-6 p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-blue-900 block text-[11px]">
                        Phản hồi từ thợ {technician.name}:
                      </span>
                      <p>{rev.technicianReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
            <h4 className="font-bold text-sm text-slate-900">
              Cam kết từ FixNear
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Xác thực danh tính</strong>
                  <span>Đã đối soát CCCD và lý lịch nghề nghiệp.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Bảo hiểm dịch vụ</strong>
                  <span>Hỗ trợ đền bù thiệt hại sự cố lên đến 5.000.000đ.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 text-center space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Bạn cần tư vấn thêm?
            </h4>
            <p className="text-xs text-slate-500">
              Gọi tổng đài hỗ trợ hoặc chat trực tiếp với đội ngũ FixNear.
            </p>
            <div className="pt-2">
              <a
                href="tel:19006868"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Phone className="w-4 h-4" /> 1900 6868 (Miễn cước)
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        technician={technician}
      />

    </div>
  );
};

```

---

### File: `src/pages/PostRequestPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { ServiceCategory, ServiceRequest } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { 
  Upload, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const PostRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('dien-lanh');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState(user?.address || 'Căn 1502 Discovery Complex, 302 Cầu Giấy');
  const [phone, setPhone] = useState(user?.phone || '0912 333 444');
  const [preferredTime, setPreferredTime] = useState('Hôm nay (Càng sớm càng tốt)');
  const [budget, setBudget] = useState<string>('300000');
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [createdRequestId, setCreatedRequestId] = useState<string>('');

  useEffect(() => {
    setCategories(storageService.getCategories());
  }, []);

  const districtOptions = city === 'Hà Nội'
    ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông', 'Bắc Từ Liêm']
    : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận', 'Thủ Đức'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !address.trim() || !phone.trim()) {
      error('Vui lòng điền đầy đủ các trường thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const catObj = categories.find(c => c.slug === selectedCategorySlug);
      const newReqId = `req-${Date.now()}`;

      const newRequest: ServiceRequest = {
        id: newReqId,
        customerId: user?.id || 'user-cust-1',
        customerName: user?.name || 'Khách hàng FixNear',
        customerPhone: phone,
        customerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        categoryId: selectedCategorySlug,
        categoryName: catObj?.name || 'Sửa chữa tổng hợp',
        title: title.trim(),
        description: description.trim(),
        photos: photoPreviews,
        city,
        district,
        address: address.trim(),
        preferredTime,
        budget: Number(budget) || 0,
        status: 'open',
        offersCount: 0,
        createdAt: new Date().toISOString(),
      };

      storageService.addRequest(newRequest);
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
      setCreatedRequestId(newReqId);
      success('Đăng yêu cầu thành công!', 'FixNear đang kết nối các thợ phù hợp gần bạn.');
    }, 800);
  };

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const samplePhotos = [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80'
      ];
      const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
      setPhotoPreviews(prev => [...prev, randomPhoto]);
    }
  };

  if (isSuccessSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-scale-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Yêu cầu của bạn đã được đăng thành công!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            FixNear đang gửi thông báo tới các thợ uy tín tại khu vực <strong className="text-slate-900">{district}, {city}</strong>. Bạn sẽ nhận được báo giá và liên hệ trong ít phút.
          </p>
        </div>

        <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 max-w-md mx-auto text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Mã yêu cầu:</span>
            <span className="font-bold text-blue-700">{createdRequestId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tiêu đề:</span>
            <span className="font-bold text-slate-800 truncate max-w-[200px]">{title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Trạng thái:</span>
            <span className="font-bold text-emerald-600">● Đang tìm thợ gần</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button onClick={() => navigate('/customer/dashboard')}>
            Vào Bảng điều khiển theo dõi
          </Button>
          <Button variant="outline" onClick={() => navigate('/technicians')}>
            Chủ động tìm thợ trong danh bạ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Miễn phí đăng việc 100%
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Đăng yêu cầu sửa chữa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Mô tả sự cố bạn đang gặp phải, các thợ quanh khu vực của bạn sẽ gửi báo giá nhanh chóng.
        </p>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Loại dịch vụ bạn cần sửa chữa *
          </label>
          <select
            value={selectedCategorySlug}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>
                {c.name} — ({c.technicianCount} thợ sẵn sàng)
              </option>
            ))}
          </select>
        </div>

        <Input
          label="2. Tiêu đề ngắn gọn về sự cố *"
          placeholder="Ví dụ: Điều hòa Daikin phòng khách không mát chỉ phả gió nóng"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            3. Mô tả chi tiết vấn đề bạn đang gặp phải *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Mô tả cụ thể: Dấu hiệu hỏng, phát ra tiếng kêu thế nào, đã xảy ra bao lâu, tình trạng máy hiện tại..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            4. Hình ảnh hoặc video sự cố (Giúp thợ báo giá chính xác hơn)
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {photoPreviews.map((url, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200">
                <img src={url} alt="Minh họa" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreviews(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-[10px]"
                >
                  ✕
                </button>
              </div>
            ))}

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 cursor-pointer text-slate-500 hover:text-blue-600 transition aspect-video">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium text-center">Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            5. Địa điểm sửa chữa *
          </label>
          
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
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            placeholder="Số nhà, tên tòa nhà, số ngõ/đường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <Input
            label="6. Thời gian mong muốn thợ đến:"
            placeholder="Ví dụ: Hôm nay 15:00, hoặc Tối sau 18h"
            value={preferredTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPreferredTime(e.target.value)}
            required
          />

          <Input
            label="7. Mức ngân sách dự kiến (VNĐ):"
            placeholder="300000"
            type="number"
            value={budget}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBudget(e.target.value)}
            helperText="Để trống nếu muốn thương lượng trực tiếp"
          />
        </div>

        <div className="pt-3 border-t border-slate-100">
          <Input
            label="Số điện thoại liên hệ nhận báo giá *"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            placeholder="09xx xxx xxx"
            required
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold shadow-brand"
          >
            Đăng yêu cầu ngay (Tìm thợ gần)
          </Button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Bằng việc gửi yêu cầu, bạn đồng ý với Quy chế hoạt động và Điều khoản bảo mật của FixNear.
          </p>
        </div>

      </form>

    </div>
  );
};

```

---

### File: `src/pages/TechnicianRegisterPage.tsx`

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { Technician, User } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export const TechnicianRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useNotification();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Thợ Điện Lạnh & Điều Hòa');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [basePrice, setBasePrice] = useState('150000');
  const [bio, setBio] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['dien-lanh']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoriesList = [
    { slug: 'dien-lanh', label: 'Điện lạnh / Điều hòa' },
    { slug: 'dien', label: 'Điện dân dụng' },
    { slug: 'nuoc', label: 'Cấp thoát nước' },
    { slug: 'may-giat', label: 'Sửa máy giặt' },
    { slug: 'tu-lanh', label: 'Sửa tủ lạnh' },
    { slug: 'khoa', label: 'Sửa khóa 24/7' },
    { slug: 'xe-may', label: 'Sửa xe máy lưu động' },
    { slug: 'do-gia-dung', label: 'Đồ gia dụng & Bếp từ' },
    { slug: 'lap-dat', label: 'Lắp đặt thiết bị' },
    { slug: 'nha-cua', label: 'Sơn & Sửa nhà' },
  ];

  const handleToggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(prev => prev.filter(s => s !== slug));
    } else {
      setSelectedCategories(prev => [...prev, slug]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTechId = `tech-${Date.now()}`;
      const newUserId = `user-tech-${Date.now()}`;

      const newUser: User = {
        id: newUserId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: 'technician',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        address: address.trim(),
        district,
        city,
        createdAt: new Date().toISOString(),
      };

      const newTech: Technician = {
        id: newTechId,
        userId: newUserId,
        name: name.trim(),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        title: title.trim() || 'Thợ kỹ thuật sửa chữa',
        rating: 5.0,
        reviewCount: 0,
        completedJobs: 0,
        completionRate: 100,
        experienceYears: Number(experienceYears) || 3,
        city,
        district,
        address: address.trim(),
        distanceKm: 1.0,
        basePrice: Number(basePrice) || 120000,
        isOnline: true,
        isAvailable: true,
        isVerified: true,
        isPro: true,
        badges: ['verified', 'pro'],
        certifications: ['Chứng chỉ Thẩm định Tay nghề FixNear'],
        bio: bio.trim() || 'Thợ kỹ thuật chuyên nghiệp, nhiệt tình, có trách nhiệm và uy tín cao.',
        categories: selectedCategories.length > 0 ? selectedCategories : ['dien'],
        servicesOffered: [
          { id: 's-init-1', name: 'Kiểm tra và xử lý sự cố cơ bản', price: Number(basePrice) || 150000, unit: 'lần' },
          { id: 's-init-2', name: 'Bảo dưỡng định kỳ', price: 200000, unit: 'máy' },
        ],
        workPhotos: [
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
        ],
        phone: phone.trim(),
        email: email.trim(),
        responseTimeMinutes: 10,
        joinedDate: new Date().toISOString().split('T')[0],
      };

      storageService.addUser(newUser);
      storageService.addTechnician(newTech);
      storageService.setCurrentUser(newUser);

      setIsSubmitting(false);
      success('Đăng ký đối tác thành công!', 'Chào mừng bạn gia nhập mạng lưới FixNear.');
      navigate('/technician/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Dành cho thợ & nhà cung cấp dịch vụ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Trở thành Đối tác Thợ FixNear
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          “Biến kỹ năng và tay nghề của bạn thành nguồn thu nhập ổn định với hàng ngàn khách hàng trong khu vực.”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thu nhập tăng 30-50%</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Chủ động nhận việc gần nhà</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Miễn phí 1 tháng gói Pro</span>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-card space-y-6"
      >
        <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
          Thông tin đối tác đăng ký
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Họ và tên thợ / Tên đội thợ *"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />

          <Input
            label="Số điện thoại liên hệ *"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email đăng nhập *"
            type="email"
            placeholder="tho.nguyenvana@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Tiêu đề chuyên môn chính *"
            placeholder="Ví dụ: Chuyên Gia Điện Lạnh & Điều Hòa Inverter"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Categories Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Chọn các lĩnh vực bạn có tay nghề nhận việc:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {categoriesList.map(cat => {
              const isSelected = selectedCategories.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleToggleCategory(cat.slug)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tỉnh / Thành phố:</label>
            <select
              value={city}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quận / Huyện:</label>
            <select
              value={district}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              {(city === 'Hà Nội'
                ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông']
                : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7', 'Phú Nhuận']
              ).map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Số năm kinh nghiệm:"
            type="number"
            value={experienceYears}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceYears(e.target.value)}
            placeholder="5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Địa chỉ thường trú / Cửa hàng:"
            placeholder="Số nhà, đường, phường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
          />

          <Input
            label="Giá dịch vụ cơ bản tham khảo (VNĐ):"
            placeholder="150000"
            type="number"
            value={basePrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBasePrice(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Giới thiệu kinh nghiệm và cam kết tay nghề:
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            placeholder="Kinh nghiệm sửa các dòng máy nào, cam kết bảo hành, chứng chỉ nghề đã có..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold shadow-brand"
          >
            Đăng ký làm thợ FixNear ngay
          </Button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Hồ sơ thợ sẽ được kích hoạt ngay trong chế độ trải nghiệm và nhận việc lập tức.
          </p>
        </div>
      </form>

    </div>
  );
};

```

---

### File: `src/pages/LoginPage.tsx`

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UserRole } from '../types';
import { Wrench, Shield, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuth();
  const { success, error } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const ok = login(email);
      setIsLoading(false);
      if (ok) {
        success('Đăng nhập thành công!');
        navigate('/');
      } else {
        error('Email không tồn tại trong hệ thống demo. Vui lòng chọn tài khoản mẫu bên dưới.');
      }
    }, 500);
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAsRole(role);
    success(`Đã đăng nhập với vai trò ${role.toUpperCase()}`);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'technician') navigate('/technician/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FIX<span className="text-blue-600">NEAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">Đăng nhập tài khoản</h2>
          <p className="text-xs text-slate-500">
            Nền tảng kết nối thợ sửa chữa địa phương nhanh chóng
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Đăng nhập nhanh 1-Click (Dành cho Demo / Hội đồng):</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-semibold border border-blue-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600 group-hover:text-white" />
                <span>Khách hàng (Hoàng Thùy Linh)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('technician')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-600 hover:text-white text-slate-800 text-xs font-semibold border border-amber-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-600 group-hover:text-white" />
                <span>Thợ sửa chữa (Nguyễn Văn Minh - Điện lạnh)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-purple-600 hover:text-white text-slate-800 text-xs font-semibold border border-purple-100 shadow-sm transition group"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600 group-hover:text-white" />
                <span>Quản trị viên Admin (FixNear Team)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4"
        >
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hoặc nhập thông tin
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <Input
            label="Địa chỉ Email"
            type="email"
            placeholder="khachhang@fixnear.vn"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold shadow-brand"
          >
            Đăng nhập
          </Button>

          <div className="text-center pt-2 text-xs text-slate-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Đăng ký ngay
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

```

---

### File: `src/pages/RegisterPage.tsx`

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Wrench } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'Hà Nội' | 'TP. Hồ Chí Minh'>('Hà Nội');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        city,
        district,
        address: address.trim(),
      });
      setIsLoading(false);
      success('Đăng ký tài khoản thành công!');
      navigate('/customer/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-brand">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FIX<span className="text-blue-600">NEAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">Tạo tài khoản khách hàng</h2>
          <p className="text-xs text-slate-500">
            Tìm thợ gần nhà, theo dõi tiến độ sửa chữa và bảo hành dịch vụ
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4"
        >
          <Input
            label="Họ và tên của bạn *"
            placeholder="Hoàng Thùy Linh"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />

          <Input
            label="Địa chỉ Email *"
            type="email"
            placeholder="linh.hoang@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Số điện thoại liên hệ *"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thành phố:</label>
              <select
                value={city}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quận / Huyện:</label>
              <select
                value={district}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                {(city === 'Hà Nội'
                  ? ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình', 'Hà Đông']
                  : ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Quận 7']
                ).map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Địa chỉ nhà chi tiết:"
            placeholder="Số nhà, tòa chung cư, tên đường..."
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold shadow-brand"
          >
            Đăng ký tài khoản
          </Button>

          <div className="text-center pt-2 text-xs text-slate-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Đăng nhập
            </Link>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/technician/register"
              className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 py-1.5 px-3 rounded-lg inline-block transition"
            >
              Bạn là thợ sửa chữa? Đăng ký đối tác tại đây
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

```

---

### File: `src/pages/CustomerDashboardPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { ServiceRequest, Booking, Review, Technician } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { ReviewModal } from '../components/technicians/ReviewModal';
import { DisputeModal } from '../components/technicians/DisputeModal';
import { SmartMatchingModal } from '../components/requests/SmartMatchingModal';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import { 
  ClipboardList, 
  CalendarCheck, 
  CheckCircle2, 
  Star, 
  PlusCircle, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Phone, 
  ShieldCheck,
  Lock,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'requests' | 'bookings' | 'history' | 'profile'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allTechs, setAllTechs] = useState<Technician[]>([]);
  
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [selectedBookingForDispute, setSelectedBookingForDispute] = useState<Booking | null>(null);
  const [matchingRequest, setMatchingRequest] = useState<ServiceRequest | null>(null);

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const loadData = () => {
    const allRequests = storageService.getRequests();
    const allBookings = storageService.getBookings();
    const allReviews = storageService.getReviews();
    setAllTechs(storageService.getTechnicians());

    setRequests(allRequests.filter((r: ServiceRequest) => r.customerId === user?.id || r.customerId === 'user-cust-1'));
    setBookings(allBookings.filter((b: Booking) => b.customerId === user?.id || b.customerId === 'user-cust-1'));
    setReviews(allReviews.filter((r: Review) => r.customerId === user?.id || r.customerId === 'user-cust-1'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  const activeRequestsCount = requests.filter((r: ServiceRequest) => r.status === 'open' || r.status === 'assigned').length;
  const pendingBookingsCount = bookings.filter((b: Booking) => b.status === 'pending' || b.status === 'accepted' || b.status === 'surveying' || b.status === 'in_progress').length;
  const completedBookingsCount = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed').length;

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    alert('Cập nhật thông tin thành công!');
  };

  const getStepProgress = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'accepted': return 2;
      case 'surveying': return 3;
      case 'in_progress': return 4;
      case 'completed':
      case 'reviewed': return 5;
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar src={user?.avatar} name={user?.name || 'Khách hàng'} size="xl" isOnline={true} />
          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Khách hàng thân thiết
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Xin chào, {user?.name || 'Hoàng Thùy Linh'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Khu vực hoạt động: <strong className="text-white">{user?.district}, {user?.city}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/post-request">
            <Button size="md" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30 text-xs sm:text-sm">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Đăng yêu cầu sửa mới
            </Button>
          </Link>
          <Link to="/technicians">
            <Button variant="secondary" size="md" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm">
              Tìm thợ quanh đây
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Yêu cầu đang xử lý"
          value={activeRequestsCount}
          subtitle="Đang chờ thợ báo giá"
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Lịch hẹn sắp tới"
          value={pendingBookingsCount}
          subtitle="Đã xác nhận & đang sửa"
          icon={<CalendarCheck className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Đơn đã hoàn thành"
          value={completedBookingsCount}
          subtitle="Dịch vụ đã hoàn tất"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Đánh giá đã viết"
          value={reviews.length}
          subtitle="Góp ý chất lượng thợ"
          icon={<Star className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-3 transition relative ${
                activeTab === 'requests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Yêu cầu đã đăng ({requests.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 transition relative ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lịch sửa chữa ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 transition relative ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thông tin tài khoản
            </button>
          </div>

          {/* TAB 1: YÊU CẦU ĐÃ ĐĂNG */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Các yêu cầu sửa chữa đang hoạt động
                </h3>
                <Link to="/post-request" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                  + Đăng việc mới
                </Link>
              </div>

              {requests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {requests.map((req: ServiceRequest) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                              {req.categoryName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Đăng {formatRelativeTime(req.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-slate-900">{req.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{req.description}</p>
                        </div>

                        <Badge
                          variant={req.status === 'open' ? 'success' : req.status === 'completed' ? 'primary' : 'warning'}
                          size="md"
                          dot
                        >
                          {req.status === 'open' ? 'Đang tìm thợ' : req.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                        </Badge>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {req.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {req.preferredTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setMatchingRequest(req)}
                            className="bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-bold text-xs"
                            leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                          >
                            AI Matching Thợ
                          </Button>
                          <Link to="/chat">
                            <Button size="sm" variant="outline" className="text-xs">
                              Xem tin nhắn báo giá ({req.offersCount || 2})
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
                  <p>Bạn chưa đăng yêu cầu sửa chữa nào.</p>
                  <Link to="/post-request">
                    <Button size="sm">Đăng yêu cầu đầu tiên ngay</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LỊCH SỬA CHỮA VỚI 4-STEP PROGRESS TRACKER */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Lịch hẹn & Theo dõi tiến trình 4 bước
                </h3>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-5">
                  {bookings.map((bk: Booking) => {
                    const stepNum = getStepProgress(bk.status);

                    return (
                      <div
                        key={bk.id}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <Avatar src={bk.technicianAvatar} name={bk.technicianName} size="md" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-sm text-slate-900">{bk.technicianName}</h4>
                                <ShieldCheck className="w-4 h-4 text-blue-600" />
                              </div>
                              <p className="text-xs text-slate-500">{bk.technicianTitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {bk.paymentMethod === 'escrow' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                                <Lock className="w-3 h-3 text-blue-600" />
                                {bk.paymentStatus === 'released' ? 'Đã thanh toán Escrow' : 'Ký quỹ Escrow (Đang tạm giữ)'}
                              </span>
                            )}
                            <Badge
                              variant={
                                bk.status === 'in_progress' || bk.status === 'surveying' || bk.status === 'accepted'
                                  ? 'success'
                                  : bk.status === 'completed'
                                  ? 'info'
                                  : bk.status === 'reviewed'
                                  ? 'primary'
                                  : 'warning'
                              }
                              size="md"
                              dot
                            >
                              {bk.status === 'pending'
                                ? '1. Chờ xác nhận'
                                : bk.status === 'accepted'
                                ? '2. Đã xác nhận'
                                : bk.status === 'surveying'
                                ? '3. Đang khảo sát'
                                : bk.status === 'in_progress'
                                ? '4. Đang thi công'
                                : bk.status === 'completed'
                                ? '5. Hoàn thành (Chờ nghiệm thu)'
                                : 'Đã nghiệm thu & Đánh giá'}
                            </Badge>
                          </div>
                        </div>

                        {/* Visual 4-Step Progress Bar */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                            {[
                              { step: 1, label: 'Xác nhận đơn' },
                              { step: 2, label: 'Khảo sát tại nhà' },
                              { step: 3, label: 'Đang thi công' },
                              { step: 4, label: 'Nghiệm thu' },
                            ].map((s) => {
                              const isCurrent = (stepNum === s.step + 1) || (s.step === 4 && stepNum >= 5);
                              const isDone = stepNum > s.step + 1 || (s.step === 4 && stepNum >= 5);
                              return (
                                <div key={s.step} className="space-y-1">
                                  <div className={`h-1.5 rounded-full transition-all ${
                                    isDone || isCurrent ? 'bg-blue-600' : 'bg-slate-200'
                                  }`} />
                                  <span className={isDone || isCurrent ? 'text-blue-700 font-bold' : 'text-slate-400'}>
                                    {s.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                          <div>
                            <span className="text-slate-400 block font-medium">Hạng mục sửa:</span>
                            <span className="font-bold text-slate-900">{bk.serviceName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Thời gian hẹn:</span>
                            <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Địa chỉ làm việc:</span>
                            <span>{bk.address}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-medium">Chi phí:</span>
                            <span className="text-sm font-extrabold text-blue-600">
                              {formatCurrency(bk.finalPrice || bk.estimatedPrice)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${bk.technicianPhone}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              Gọi: {bk.technicianPhone}
                            </a>
                            <Link
                              to="/chat"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                              Chat với thợ
                            </Link>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBookingForDispute(bk)}
                              className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                              leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
                            >
                              Khiếu nại / Hoàn tiền
                            </Button>

                            {bk.status === 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => setSelectedBookingForReview(bk)}
                                leftIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
                              >
                                Nghiệm thu & Viết đánh giá
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                  Chưa có lịch hẹn nào. Hãy tìm thợ và bấm Đặt lịch!
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Cập nhật thông tin cá nhân
              </h3>

              <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 max-w-lg">
                <Input
                  label="Họ và tên"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Số điện thoại"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Địa chỉ mặc định"
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                />
                <Button type="submit">Lưu thông tin</Button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={!!selectedBookingForReview}
        onClose={() => setSelectedBookingForReview(null)}
        booking={selectedBookingForReview}
        onSuccess={() => loadData()}
      />

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={!!selectedBookingForDispute}
        onClose={() => setSelectedBookingForDispute(null)}
        booking={selectedBookingForDispute}
        onSuccess={() => loadData()}
      />

      {/* Smart Matching Modal */}
      <SmartMatchingModal
        isOpen={!!matchingRequest}
        onClose={() => setMatchingRequest(null)}
        request={matchingRequest}
        allTechnicians={allTechs}
        onSelectTech={t => navigate(`/technicians/${t.id}`)}
        onChatTech={t => {
          const conv = storageService.getOrCreateConversation('user-cust-1', 'Hoàng Thùy Linh', '', t);
          navigate(`/chat?conv=${conv.id}`);
        }}
      />

    </div>
  );
};

```

---

### File: `src/pages/TechnicianDashboardPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { storageService } from '../services/storageService';
import { ServiceRequest, Booking, Review, Technician, EQuote } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import { 
  CalendarCheck, 
  CheckCircle2, 
  DollarSign, 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Send,
  Zap,
  Lock,
  FileCheck
} from 'lucide-react';

export const TechnicianDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'radar' | 'schedule' | 'reviews' | 'pro'>('radar');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentTech, setCurrentTech] = useState<Technician | undefined>(undefined);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [laborCost, setLaborCost] = useState('150000');
  const [materialCost, setMaterialCost] = useState('100000');
  const [estimatedHours, setEstimatedHours] = useState('1.5 - 2 giờ');
  const [warrantyMonths, setWarrantyMonths] = useState('6');
  const [quoteNotes, setQuoteNotes] = useState('Bao gồm kiểm tra, vệ sinh sạch sẽ và thay thế linh kiện chính hãng.');

  const loadData = () => {
    const allTechs = storageService.getTechnicians();
    const myTech = allTechs.find((t: Technician) => t.userId === user?.id || t.id === 'tech-1') || allTechs[0];
    setCurrentTech(myTech);

    const allReqs = storageService.getRequests();
    setRequests(allReqs.filter((r: ServiceRequest) => r.status === 'open'));

    const allBks = storageService.getBookings();
    setBookings(allBks.filter((b: Booking) => b.technicianId === myTech?.id || b.technicianId === 'tech-1'));

    if (myTech) {
      setReviews(storageService.getReviewsByTechnicianId(myTech.id));
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, [user]);

  // Handle 4-Step Booking Status Updates by Technician
  const handleUpdateStatus = (bookingId: string, newStatus: Booking['status']) => {
    storageService.updateBookingStatus(bookingId, newStatus);
    const statusLabel = 
      newStatus === 'accepted' ? 'Đã nhận đơn' :
      newStatus === 'surveying' ? 'Đang khảo sát tại nhà' :
      newStatus === 'in_progress' ? 'Đang tiến hành thi công' : 'Đã hoàn thành bàn giao';
    success(`Cập nhật tiến độ: ${statusLabel}`);
    loadData();
  };

  const handleOpenQuoteModal = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setLaborCost(req.budget > 0 ? String(Math.floor(req.budget * 0.6)) : '150000');
    setMaterialCost(req.budget > 0 ? String(Math.floor(req.budget * 0.4)) : '100000');
    setQuoteModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !currentTech) return;

    const total = (Number(laborCost) || 0) + (Number(materialCost) || 0);

    const newQuote: EQuote = {
      id: `quote-${Date.now()}`,
      requestId: selectedRequest.id,
      technicianId: currentTech.id,
      technicianName: currentTech.name,
      technicianAvatar: currentTech.avatar,
      technicianRating: currentTech.rating,
      technicianPhone: currentTech.phone,
      laborCost: Number(laborCost) || 0,
      materialCost: Number(materialCost) || 0,
      totalAmount: total,
      estimatedHours,
      warrantyMonths: Number(warrantyMonths) || 6,
      notes: quoteNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    storageService.addQuoteToRequest(selectedRequest.id, newQuote);

    // Also send structured E-Quote in chat
    const conv = storageService.getOrCreateConversation(
      selectedRequest.customerId,
      selectedRequest.customerName,
      selectedRequest.customerAvatar,
      currentTech
    );

    storageService.sendMessage({
      id: `msg-${Date.now()}`,
      conversationId: conv.id,
      senderId: currentTech.id,
      senderName: currentTech.name,
      senderRole: 'technician',
      recipientId: selectedRequest.customerId,
      text: `[BÁO GIÁ ĐIỆN TỬ]: Tổng ${formatCurrency(total)} (Công: ${formatCurrency(Number(laborCost))} + Linh kiện: ${formatCurrency(Number(materialCost))}) - Bảo hành ${warrantyMonths} tháng. Lời nhắn: ${quoteNotes}`,
      isOffer: true,
      offerAmount: total,
      quoteDetails: {
        laborCost: Number(laborCost) || 0,
        materialCost: Number(materialCost) || 0,
        total,
        warranty: Number(warrantyMonths) || 6,
      },
      timestamp: new Date().toISOString(),
      isRead: false,
    });

    setQuoteModalOpen(false);
    success('Đã gửi báo giá điện tử thành công!', 'Khách hàng có thể bấm chấp nhận để khóa lịch thi công.');
    navigate(`/chat?conv=${conv.id}`);
  };

  // Metrics Calculations
  const newRequestsCount = requests.length;
  const inProgressCount = bookings.filter((b: Booking) => b.status === 'accepted' || b.status === 'surveying' || b.status === 'in_progress').length;
  const completedCount = bookings.filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed').length;
  const totalRevenue = bookings
    .filter((b: Booking) => b.status === 'completed' || b.status === 'reviewed')
    .reduce((sum: number, b: Booking) => sum + (b.finalPrice || b.estimatedPrice), 0) + 12500000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Tech Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar src={currentTech?.avatar || user?.avatar} name={currentTech?.name || 'Thợ đối tác'} size="xl" isOnline={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                ★ Đối tác FixNear Pro
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                ● Đang bật nhận việc
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Xin chào, {currentTech?.name || 'Nguyễn Văn Minh'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Chuyên môn: <strong className="text-white">{currentTech?.title}</strong> ({currentTech?.district}, {currentTech?.city})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/chat">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Tin nhắn & Báo giá ({bookings.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Yêu cầu mới (Radar)"
          value={newRequestsCount}
          subtitle="Cần thợ quanh khu vực"
          icon={<Zap className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Đơn đang xử lý"
          value={inProgressCount}
          subtitle="Đang thực hiện"
          icon={<CalendarCheck className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Đơn hoàn thành"
          value={currentTech?.completedJobs || completedCount}
          subtitle="Tất cả thời gian"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Tổng thu nhập"
          value={formatCurrency(totalRevenue)}
          subtitle="Đã quyết toán"
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Đánh giá sao"
          value={`${currentTech?.rating || 4.9} ★`}
          subtitle={`Từ ${currentTech?.reviewCount || reviews.length} lượt đánh giá`}
          icon={<Star className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('radar')}
              className={`pb-3 transition relative ${
                activeTab === 'radar'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Yêu cầu gần bạn (Radar Live) ({requests.length})
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-3 transition relative ${
                activeTab === 'schedule'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lịch thi công 4 bước ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition relative ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đánh giá từ khách ({reviews.length})
            </button>

            <button
              onClick={() => setActiveTab('pro')}
              className={`pb-3 transition relative ${
                activeTab === 'pro'
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Gói FixNear Pro ★
            </button>
          </div>

          {/* TAB 1: RADAR YÊU CẦU GẦN BẠN */}
          {activeTab === 'radar' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Yêu cầu sửa chữa mới quanh {currentTech?.district || 'khu vực của bạn'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bấm "Gửi Báo Giá Điện Tử" để tạo bảng phân rã chi phí gửi đến khách hàng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {requests.map((req: ServiceRequest) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:border-blue-400 transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                            {req.categoryName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {formatRelativeTime(req.createdAt)}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900">{req.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{req.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block font-medium">Ngân sách dự kiến</span>
                        <span className="text-base font-extrabold text-blue-600">
                          {req.budget > 0 ? formatCurrency(req.budget) : 'Thương lượng'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> {req.district}, {req.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" /> Hẹn: {req.preferredTime}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleOpenQuoteModal(req)}
                        leftIcon={<FileCheck className="w-3.5 h-3.5" />}
                        className="font-bold text-xs"
                      >
                        Gửi Báo Giá Điện Tử
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LỊCH THI CÔNG VỚI QUY TRÌNH 4 BƯỚC */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                Quản lý tiến độ đơn sửa chữa (4 Bước)
              </h3>

              <div className="space-y-4">
                {bookings.map((bk: Booking) => (
                  <div
                    key={bk.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Avatar src={bk.customerAvatar} name={bk.customerName} size="md" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{bk.customerName}</h4>
                          <p className="text-xs text-slate-500">SĐT: {bk.customerPhone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {bk.paymentMethod === 'escrow' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                            <Lock className="w-3 h-3 text-blue-600" /> Ký quỹ Escrow ({formatCurrency(bk.estimatedPrice)})
                          </span>
                        )}
                        <Badge
                          variant={
                            bk.status === 'accepted' || bk.status === 'surveying' || bk.status === 'in_progress'
                              ? 'success'
                              : bk.status === 'completed' || bk.status === 'reviewed'
                              ? 'primary'
                              : 'warning'
                          }
                          size="md"
                          dot
                        >
                          {bk.status === 'pending'
                            ? 'Bước 1: Chờ bạn nhận đơn'
                            : bk.status === 'accepted'
                            ? 'Bước 2: Đã nhận (Sắp đến khảo sát)'
                            : bk.status === 'surveying'
                            ? 'Bước 3: Đang khảo sát tại nhà'
                            : bk.status === 'in_progress'
                            ? 'Bước 4: Đang tiến hành thi công'
                            : 'Đã hoàn thành bàn giao'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-400 block">Dịch vụ:</span>
                        <span className="font-bold text-slate-900">{bk.serviceName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Ngày hẹn & Khung giờ:</span>
                        <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Địa chỉ nhà khách:</span>
                        <span>{bk.address}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Chi phí thỏa thuận:</span>
                        <span className="text-sm font-extrabold text-blue-600">
                          {formatCurrency(bk.finalPrice || bk.estimatedPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Sequential Progress Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${bk.customerPhone}`}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          Gọi khách
                        </a>
                        <Link
                          to="/chat"
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          Chat
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        {bk.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(bk.id, 'accepted')}
                          >
                            Xác nhận nhận đơn
                          </Button>
                        )}
                        {bk.status === 'accepted' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(bk.id, 'surveying')}
                          >
                            Bắt đầu đến khảo sát
                          </Button>
                        )}
                        {bk.status === 'surveying' && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleUpdateStatus(bk.id, 'in_progress')}
                          >
                            Bắt đầu thi công sửa chữa
                          </Button>
                        )}
                        {bk.status === 'in_progress' && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            onClick={() => handleUpdateStatus(bk.id, 'completed')}
                          >
                            Nghiệm thu & Bàn giao
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Đánh giá và phản hồi từ khách hàng ({reviews.length})
              </h3>

              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.map((rev: Review) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={rev.customerAvatar} name={rev.customerName} size="sm" />
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{rev.customerName}</h5>
                          <p className="text-[10px] text-slate-400">{formatDate(rev.createdAt)}</p>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} size="sm" />
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FIXNEAR PRO */}
          {activeTab === 'pro' && (
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-200" />
                <h3 className="text-2xl font-extrabold">Gói Hội Viên FixNear Pro</h3>
              </div>

              <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
                Nâng cấp tài khoản để gia tăng uy tín và nhận ưu tiên hiển thị hàng đầu trong kết quả tìm kiếm thợ khu vực của bạn.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Ưu tiên hiển thị Top 1</h4>
                  <p className="text-amber-100 text-[11px]">Hồ sơ thợ luôn xuất hiện ở trang đầu khi khách tìm kiếm.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Huy hiệu Thợ Pro Vàng</h4>
                  <p className="text-amber-100 text-[11px]">Gia tăng 40% tỷ lệ khách hàng tin tưởng và bấm đặt lịch.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Nhận việc sớm hơn 5 phút</h4>
                  <p className="text-amber-100 text-[11px]">Thông báo việc gấp gửi đến thợ Pro trước các thợ thông thường.</p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="font-bold text-white mb-1">✓ Miễn phí chiết khấu hoa hồng</h4>
                  <p className="text-amber-100 text-[11px]">Chỉ 99.000đ/tháng trọn gói, không trừ thêm phần trăm đơn.</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-200 block">Mức phí trọn gói</span>
                  <span className="text-2xl font-black">99.000đ / tháng</span>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                  Gia hạn / Nâng cấp Pro
                </Button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Structured E-Quote Modal */}
      <Modal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        title="Lập Báo Giá Điện Tử Chi Tiết"
        description={`Khách hàng: ${selectedRequest?.customerName} — ${selectedRequest?.title}`}
        maxWidth="md"
      >
        <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="1. Tiền công thợ (VNĐ): *"
              type="number"
              value={laborCost}
              onChange={(e: any) => setLaborCost(e.target.value)}
              required
            />
            <Input
              label="2. Tiền linh kiện thay thế (VNĐ):"
              type="number"
              value={materialCost}
              onChange={(e: any) => setMaterialCost(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="3. Thời gian dự kiến hoàn thành:"
              value={estimatedHours}
              onChange={(e: any) => setEstimatedHours(e.target.value)}
              placeholder="1 - 2 giờ"
              required
            />
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                4. Thời hạn bảo hành:
              </label>
              <select
                value={warrantyMonths}
                onChange={(e) => setWarrantyMonths(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="1">1 Tháng</option>
                <option value="3">3 Tháng</option>
                <option value="6">6 Tháng (Khuyên dùng)</option>
                <option value="12">12 Tháng</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              5. Diễn giải chi tiết phương án xử lý:
            </label>
            <textarea
              rows={3}
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              required
            />
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between font-bold">
            <span className="text-slate-600">Tổng chi phí báo khách:</span>
            <span className="text-sm text-blue-700">
              {formatCurrency((Number(laborCost) || 0) + (Number(materialCost) || 0))}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setQuoteModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" size="sm" leftIcon={<Send className="w-4 h-4" />}>
              Gửi báo giá điện tử
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

```

---

### File: `src/pages/AdminDashboardPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { useNotification } from '../context/NotificationContext';
import { Technician, User, ServiceRequest, Booking, DisputeTicket } from '../types';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';
import { StatCard } from '../components/common/StatCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  ShieldCheck, 
  ClipboardList, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2,
  AlertTriangle,
  Scale
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { success } = useNotification();

  const [activeTab, setActiveTab] = useState<'overview' | 'technicians' | 'disputes' | 'users' | 'bookings' | 'settings'>('overview');
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [disputes, setDisputes] = useState<DisputeTicket[]>([]);

  // Platform Settings State
  const [commissionRate, setCommissionRate] = useState('10');
  const [proMonthlyFee, setProMonthlyFee] = useState('99000');
  const [fairDistributionBoost, setFairDistributionBoost] = useState(true);

  const loadData = () => {
    setTechnicians(storageService.getTechnicians());
    setUsers(storageService.getUsers());
    setRequests(storageService.getRequests());
    setBookings(storageService.getBookings());
    setDisputes(storageService.getDisputes());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, []);

  const handleToggleVerifyTech = (techId: string, currentStatus: boolean) => {
    storageService.updateTechnician(techId, { isVerified: !currentStatus });
    success('Đã cập nhật trạng thái xác minh thợ');
    loadData();
  };

  const handleToggleProTech = (techId: string, currentStatus: boolean) => {
    storageService.updateTechnician(techId, { isPro: !currentStatus });
    success('Đã cập nhật trạng thái FixNear Pro');
    loadData();
  };

  const handleResolveDispute = (disputeId: string, resolution: 'resolved_refund' | 'resolved_dismissed') => {
    storageService.resolveDispute(
      disputeId,
      resolution,
      resolution === 'resolved_refund' 
        ? 'Admin chấp thuận hoàn tiền từ quỹ bảo lãnh FixNear Escrow.' 
        : 'Admin bác khiếu nại sau khi đối soát bằng chứng thi công.'
    );
    success(resolution === 'resolved_refund' ? 'Đã duyệt hoàn tiền cho khách!' : 'Đã giải quyết khiếu nại!');
    loadData();
  };

  const revenueChartData = [
    { month: 'T3', gmv: 18500000, revenue: 1850000, orders: 65 },
    { month: 'T4', gmv: 24200000, revenue: 2420000, orders: 84 },
    { month: 'T5', gmv: 31000000, revenue: 3100000, orders: 110 },
    { month: 'T6', gmv: 42500000, revenue: 4250000, orders: 152 },
    { month: 'T7', gmv: 58000000, revenue: 5800000, orders: 198 },
    { month: 'T8', gmv: 74500000, revenue: 7450000, orders: 245 },
  ];

  const categoryDistributionData = [
    { name: 'Điện lạnh', value: 35, color: '#2563EB' },
    { name: 'Sửa Điện', value: 22, color: '#F59E0B' },
    { name: 'Sửa Nước', value: 18, color: '#10B981' },
    { name: 'Sửa Khóa', value: 12, color: '#8B5CF6' },
    { name: 'Khác', value: 13, color: '#64748B' },
  ];

  const totalGMV = 248700000;
  const platformRevenue = 24870000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            ★ Hệ Thống Quản Trị Trung Tâm
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            Bảng điều khiển Admin FixNear
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Giám sát vận hành thị trường, giải quyết tranh chấp, mạng lưới thợ và chỉ số phân bổ đơn công bằng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="pro" size="md">
            Phiên bản: 1.2.0 (Smart Matching & Escrow)
          </Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Tổng GMV giao dịch"
          value={formatCurrency(totalGMV)}
          change="+28%"
          isPositive={true}
          icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Doanh thu nền tảng"
          value={formatCurrency(platformRevenue)}
          change="+22%"
          isPositive={true}
          icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Tổng người dùng"
          value={users.length + 1250}
          change="+15%"
          isPositive={true}
          icon={<Users className="w-4 h-4 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Thợ trong mạng lưới"
          value={technicians.length}
          subtitle="100% KYC"
          icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Tranh chấp / Khiếu nại"
          value={disputes.filter(d => d.status === 'open' || d.status === 'investigating').length}
          subtitle="Cần xử lý"
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          iconBgColor="bg-rose-50"
        />
        <StatCard
          title="Tỷ lệ hoàn thành"
          value="98.2%"
          subtitle="Độ hài lòng cao"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Biểu đồ & Thống kê
            </button>

            <button
              onClick={() => setActiveTab('technicians')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'technicians'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Quản lý Thợ ({technicians.length})
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'disputes'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Khiếu nại & Tranh chấp ({disputes.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'users'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Người dùng ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'bookings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đơn hàng & Yêu cầu ({bookings.length + requests.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 whitespace-nowrap transition relative ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Cài đặt phí & Phân bổ
            </button>
          </div>

          {/* TAB 1: BIỂU ĐỒ & THỐNG KÊ (RECHARTS) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Tăng trưởng Doanh thu & Giá trị giao dịch GMV (6 tháng gần nhất)
                    </h3>
                    <p className="text-xs text-slate-500">Đơn vị: VNĐ</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span> GMV Tổng
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Phí sàn FixNear
                    </span>
                  </div>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `${v / 1000000}M`} />
                      <Tooltip
                        formatter={(val: any) => formatCurrency(Number(val))}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', border: 'none' }}
                      />
                      <Area type="monotone" dataKey="gmv" stroke="#2563EB" fill="#DBEAFE" strokeWidth={2} name="GMV Tổng" />
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} name="Doanh thu sàn" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Tỷ trọng nhu cầu theo dịch vụ
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistributionData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={75}
                          label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Số lượng đơn đặt lịch theo tháng
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                        <YAxis stroke="#94A3B8" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', border: 'none' }}
                        />
                        <Bar dataKey="orders" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Số đơn hàng" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: QUẢN LÝ THỢ */}
          {activeTab === 'technicians' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">
                  Danh sách đối tác thợ ({technicians.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Thợ kỹ thuật</th>
                      <th className="py-3 px-3">Khu vực</th>
                      <th className="py-3 px-3">Đơn & Tỷ lệ</th>
                      <th className="py-3 px-3">Đánh giá</th>
                      <th className="py-3 px-3">Trạng thái KYC</th>
                      <th className="py-3 px-3">Gói Pro</th>
                      <th className="py-3 px-3 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {technicians.map((tech: Technician) => (
                      <tr key={tech.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={tech.avatar} name={tech.name} size="sm" />
                            <div>
                              <div className="font-bold text-slate-900">{tech.name}</div>
                              <span className="text-[11px] text-slate-500">{tech.title}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium">{tech.district}, {tech.city}</td>
                        <td className="py-3 px-3 font-semibold">{tech.completedJobs} đơn ({tech.completionRate || 98}%)</td>
                        <td className="py-3 px-3 font-bold text-amber-600">{tech.rating} ★</td>
                        <td className="py-3 px-3">
                          <Badge variant={tech.isVerified ? 'success' : 'warning'} size="sm">
                            {tech.isVerified ? 'Đã xác minh' : 'Chờ duyệt'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant={tech.isPro ? 'pro' : 'neutral'} size="sm">
                            {tech.isPro ? 'FixNear Pro' : 'Thường'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleVerifyTech(tech.id, tech.isVerified)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-semibold"
                            >
                              {tech.isVerified ? 'Bỏ duyệt' : 'Duyệt KYC'}
                            </button>
                            <button
                              onClick={() => handleToggleProTech(tech.id, tech.isPro)}
                              className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[11px] font-semibold"
                            >
                              {tech.isPro ? 'Hủy Pro' : 'Cấp Pro'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DISPUTES & TRANH CHẤP */}
          {activeTab === 'disputes' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Xử lý khiếu nại & Tranh chấp dịch vụ ({disputes.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bảo vệ quyền lợi khách hàng và uy tín của thợ qua cơ chế ký quỹ FixNear Escrow.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Khách khiếu nại</th>
                      <th className="py-3 px-3">Thợ bị báo cáo</th>
                      <th className="py-3 px-3">Loại vấn đề</th>
                      <th className="py-3 px-3">Nội dung</th>
                      <th className="py-3 px-3">Số tiền đòi hoàn</th>
                      <th className="py-3 px-3">Trạng thái</th>
                      <th className="py-3 px-3 text-right">Xử lý</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {disputes.map((disp: DisputeTicket) => (
                      <tr key={disp.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold text-slate-900">{disp.customerName}</td>
                        <td className="py-3 px-3 font-semibold">{disp.technicianName}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[11px]">
                            {disp.issueType === 'quality' ? 'Chất lượng kém' : disp.issueType === 'pricing' ? 'Giá không rõ ràng' : 'Hư hại tài sản'}
                          </span>
                        </td>
                        <td className="py-3 px-3 max-w-xs truncate">{disp.description}</td>
                        <td className="py-3 px-3 font-bold text-rose-600">{formatCurrency(disp.refundRequested)}</td>
                        <td className="py-3 px-3">
                          <Badge variant={disp.status === 'open' || disp.status === 'investigating' ? 'warning' : 'success'} size="sm">
                            {disp.status === 'open' ? 'Chờ xử lý' : disp.status === 'investigating' ? 'Đang điều tra' : 'Đã giải quyết'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {disp.status !== 'resolved_refund' && disp.status !== 'resolved_dismissed' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleResolveDispute(disp.id, 'resolved_refund')}
                                className="px-2 py-1 bg-rose-600 text-white hover:bg-rose-700 rounded text-[10px] font-bold"
                              >
                                Hoàn tiền
                              </button>
                              <button
                                onClick={() => handleResolveDispute(disp.id, 'resolved_dismissed')}
                                className="px-2 py-1 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded text-[10px] font-semibold"
                              >
                                Bác bỏ
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400">Đã chốt kết quả</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: NGƯỜI DÙNG */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Quản lý tài khoản hệ thống ({users.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Người dùng</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Số điện thoại</th>
                      <th className="py-3 px-3">Vai trò (Role)</th>
                      <th className="py-3 px-3">Ngày tham gia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {users.map((u: User) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <Avatar src={u.avatar} name={u.name} size="xs" />
                          {u.name}
                        </td>
                        <td className="py-3 px-3">{u.email}</td>
                        <td className="py-3 px-3">{u.phone}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-slate-100 text-slate-800">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">{formatDate(u.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS & REQUESTS */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Toàn bộ đơn đặt lịch trên sàn ({bookings.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Khách hàng</th>
                      <th className="py-3 px-3">Thợ nhận việc</th>
                      <th className="py-3 px-3">Dịch vụ</th>
                      <th className="py-3 px-3">Ngày hẹn</th>
                      <th className="py-3 px-3">Chi phí</th>
                      <th className="py-3 px-3">Tiến độ 4 bước</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {bookings.map((b: Booking) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold">{b.customerName}</td>
                        <td className="py-3 px-3">{b.technicianName}</td>
                        <td className="py-3 px-3">{b.serviceName}</td>
                        <td className="py-3 px-3">{formatDate(b.date)}</td>
                        <td className="py-3 px-3 font-extrabold text-blue-600">{formatCurrency(b.estimatedPrice)}</td>
                        <td className="py-3 px-3">
                          <Badge variant="primary" size="sm">
                            {b.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CÀI ĐẶT PHÍ & PHÂN BỔ CÔNG BẰNG */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-6">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Cấu hình tham số sàn & Thuật toán phân bổ đơn hàng công bằng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <Input
                  label="Tỷ lệ hoa hồng trên mỗi đơn hoàn thành (%):"
                  type="number"
                  value={commissionRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommissionRate(e.target.value)}
                  helperText="Hiện tại đang thu 10% trên giá trị đơn"
                />

                <Input
                  label="Mức phí gói FixNear Pro (VNĐ / tháng):"
                  type="number"
                  value={proMonthlyFee}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProMonthlyFee(e.target.value)}
                  helperText="Mặc định: 99.000đ/tháng"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-xl space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fairDistributionBoost}
                    onChange={(e) => setFairDistributionBoost(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded accent-purple-600"
                  />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-purple-600" />
                    Kích hoạt thuật toán cân bằng cơ hội cho thợ mới (Fair Distribution)
                  </span>
                </label>
                <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                  Tự động ưu tiên hiển thị 20% yêu cầu sửa chữa cho các thợ mới đăng ký có tay nghề tốt để đảm bảo mọi thợ đều nhận được việc làm đầu tiên.
                </p>
              </div>

              <Button onClick={() => success('Đã lưu cấu hình hệ thống!')}>
                Lưu cấu hình hệ thống
              </Button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

```

---

### File: `src/pages/MyBookingsPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { Booking } from '../types';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ReviewModal } from '../components/technicians/ReviewModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  CalendarCheck, 
  Phone, 
  MessageSquare, 
  Star, 
  Calendar
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { user, role } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);

  const loadBookings = () => {
    const all = storageService.getBookings();
    if (role === 'technician') {
      setBookings(all.filter((b: Booking) => b.technicianId === 'tech-1' || b.technicianId === user?.id));
    } else {
      setBookings(all.filter((b: Booking) => b.customerId === user?.id || b.customerId === 'user-cust-1'));
    }
  };

  useEffect(() => {
    loadBookings();
    window.addEventListener('fixnear_storage_update', loadBookings);
    return () => window.removeEventListener('fixnear_storage_update', loadBookings);
  }, [user, role]);

  const filtered = bookings.filter((b: Booking) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress';
    if (filterStatus === 'completed') return b.status === 'completed' || b.status === 'reviewed';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-blue-600" />
            Lịch hẹn sửa chữa của tôi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi tiến độ, thời gian thợ đến và quản lý các đơn đặt lịch
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { label: 'Tất cả đơn', val: 'all' },
            { label: 'Đang diễn ra', val: 'active' },
            { label: 'Đã hoàn thành', val: 'completed' },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setFilterStatus(f.val)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === f.val
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((bk: Booking) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={role === 'technician' ? bk.customerAvatar : bk.technicianAvatar}
                    name={role === 'technician' ? bk.customerName : bk.technicianName}
                    size="md"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {role === 'technician' ? bk.customerName : bk.technicianName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {role === 'technician' ? `SĐT: ${bk.customerPhone}` : bk.technicianTitle}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    bk.status === 'accepted' || bk.status === 'in_progress'
                      ? 'success'
                      : bk.status === 'completed'
                      ? 'info'
                      : bk.status === 'reviewed'
                      ? 'primary'
                      : 'warning'
                  }
                  size="md"
                  dot
                >
                  {bk.status === 'pending'
                    ? 'Chờ xác nhận'
                    : bk.status === 'accepted'
                    ? 'Đã chốt lịch'
                    : bk.status === 'in_progress'
                    ? 'Đang thực hiện'
                    : bk.status === 'completed'
                    ? 'Hoàn thành'
                    : 'Đã đánh giá'}
                </Badge>
              </div>

              {/* Service & Time Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block font-medium">Dịch vụ sửa:</span>
                  <span className="font-bold text-slate-900">{bk.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Thời gian:</span>
                  <span className="font-bold text-slate-900">{formatDate(bk.date)} ({bk.timeSlot})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Địa điểm:</span>
                  <span className="truncate block">{bk.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Chi phí ước tính:</span>
                  <span className="text-sm font-extrabold text-blue-600">
                    {formatCurrency(bk.estimatedPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${role === 'technician' ? bk.customerPhone : bk.technicianPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Gọi {role === 'technician' ? bk.customerPhone : bk.technicianPhone}
                  </a>
                  <Link
                    to="/chat"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    Chat trực tiếp
                  </Link>
                </div>

                {role === 'customer' && bk.status === 'completed' && (
                  <Button
                    size="sm"
                    onClick={() => setSelectedBookingForReview(bk)}
                    leftIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
                  >
                    Đánh giá thợ
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">Không có lịch hẹn nào</h3>
          <p className="text-xs text-slate-500">Các cuộc hẹn sửa chữa được xác nhận sẽ xuất hiện tại đây.</p>
          <Link to="/technicians">
            <Button size="sm">Tìm thợ đặt lịch ngay</Button>
          </Link>
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={!!selectedBookingForReview}
        onClose={() => setSelectedBookingForReview(null)}
        booking={selectedBookingForReview}
        onSuccess={() => loadBookings()}
      />

    </div>
  );
};

```

---

### File: `src/pages/ChatPage.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { Conversation, ChatMessage } from '../types';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { formatDateTime, formatRelativeTime } from '../utils/formatters';
import { 
  Send, 
  Image as ImageIcon, 
  Phone, 
  Search, 
  CheckCheck, 
  ShieldCheck
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { user, role } = useAuth();
  const [searchParams] = useSearchParams();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadData = () => {
    const convs = storageService.getConversations();
    setConversations(convs);

    const paramConvId = searchParams.get('conv');
    if (paramConvId && convs.some(c => c.id === paramConvId)) {
      setSelectedConvId(paramConvId);
    } else if (convs.length > 0 && !selectedConvId) {
      setSelectedConvId(convs[0].id);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('fixnear_storage_update', loadData);
    return () => window.removeEventListener('fixnear_storage_update', loadData);
  }, []);

  useEffect(() => {
    if (selectedConvId) {
      setMessages(storageService.getMessages(selectedConvId));
      scrollToBottom();
    }
  }, [selectedConvId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const currentConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !currentConv) return;

    const senderRole = role === 'technician' ? 'technician' : 'customer';
    const senderName = user?.name || (role === 'technician' ? currentConv.technicianName : currentConv.customerName);
    const senderId = user?.id || (role === 'technician' ? currentConv.technicianId : currentConv.customerId);
    const recipientId = role === 'technician' ? currentConv.customerId : currentConv.technicianId;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: currentConv.id,
      senderId,
      senderName,
      senderRole,
      recipientId,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    storageService.sendMessage(newMsg);
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    scrollToBottom();

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const isReplyFromTech = senderRole === 'customer';
      const autoReplyText = isReplyFromTech
        ? 'Dạ em nhận được thông tin rồi ạ, em đang chuẩn bị dụng cụ để qua điểm hẹn đúng giờ nhé anh/chị!'
        : 'Cảm ơn anh! Em đã ghi nhận lịch hẹn ạ.';

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId: currentConv.id,
        senderId: recipientId,
        senderName: isReplyFromTech ? currentConv.technicianName : currentConv.customerName,
        senderRole: isReplyFromTech ? 'technician' : 'customer',
        recipientId: senderId,
        text: autoReplyText,
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      storageService.sendMessage(replyMsg);
      setMessages(prev => [...prev, replyMsg]);
      scrollToBottom();
    }, 1600);
  };

  const handleSendSampleImage = () => {
    if (!currentConv) return;
    const sampleImg = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: currentConv.id,
      senderId: user?.id || 'user-cust-1',
      senderName: user?.name || 'Khách hàng',
      senderRole: role === 'technician' ? 'technician' : 'customer',
      recipientId: role === 'technician' ? currentConv.customerId : currentConv.technicianId,
      text: 'Ảnh chụp vị trí máy gặp sự cố:',
      imageUrl: sampleImg,
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    storageService.sendMessage(newMsg);
    setMessages(prev => [...prev, newMsg]);
    scrollToBottom();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden h-[78vh] flex flex-col md:flex-row">
        
        {/* Left Panel: Conversations Sidebar */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Tin nhắn</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm cuộc trò chuyện..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => {
              const isActive = conv.id === selectedConvId;
              const otherName = role === 'technician' ? conv.customerName : conv.technicianName;
              const otherAvatar = role === 'technician' ? conv.customerAvatar : conv.technicianAvatar;
              const otherTitle = role === 'technician' ? 'Khách hàng' : conv.technicianTitle;

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition ${
                    isActive ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <Avatar src={otherAvatar} name={otherName} size="md" isOnline={true} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{otherName}</h4>
                      <span className="text-[10px] text-slate-400">
                        {formatRelativeTime(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{otherTitle}</p>
                    <p className="text-xs text-slate-600 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Chat Messages Window */}
        {currentConv ? (
          <div className="flex-1 flex flex-col h-full bg-slate-50/50">
            
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar
                  src={role === 'technician' ? currentConv.customerAvatar : currentConv.technicianAvatar}
                  name={role === 'technician' ? currentConv.customerName : currentConv.technicianName}
                  size="md"
                  isOnline={true}
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {role === 'technician' ? currentConv.customerName : currentConv.technicianName}
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium">● Đang hoạt động</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Phone className="w-3.5 h-3.5 text-emerald-600" />}
                  onClick={() => alert('Đang kết nối cuộc gọi thoại miễn phí qua FixNear...')}
                >
                  Gọi thoại
                </Button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center my-2">
                <span className="text-[11px] bg-slate-200/70 text-slate-600 px-3 py-1 rounded-full font-medium">
                  Cuộc trò chuyện được bảo mật bởi FixNear
                </span>
              </div>

              {messages.map(msg => {
                const isMe = (role === 'technician' && msg.senderRole === 'technician') ||
                             (role === 'customer' && msg.senderRole === 'customer') ||
                             (msg.senderId === user?.id);

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm shadow-sm space-y-2 ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                      }`}
                    >
                      {msg.imageUrl && (
                        <img
                          src={msg.imageUrl}
                          alt="Ảnh đính kèm"
                          className="rounded-xl max-h-48 object-cover w-full mb-2"
                        />
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                      <span>{msg.timestamp ? formatDateTime(msg.timestamp) : 'Vừa xong'}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 italic bg-white p-2.5 rounded-xl max-w-xs border border-slate-200 animate-pulse">
                  <span>Đối phương đang nhập tin nhắn...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleSendSampleImage}
                title="Gửi ảnh mẫu sự cố"
                className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn trao đổi với thợ..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
              />

              <Button type="submit" size="md" className="shrink-0 font-bold px-4">
                <Send className="w-4 h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Gửi</span>
              </Button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Chọn cuộc trò chuyện để bắt đầu nhắn tin
          </div>
        )}

      </div>

    </div>
  );
};

```

---

### File: `src/pages/ReviewsPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Review } from '../types';
import { Avatar } from '../components/common/Avatar';
import { RatingStars } from '../components/common/RatingStars';
import { formatDate } from '../utils/formatters';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [starFilter, setStarFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setReviews(storageService.getReviews());
  }, []);

  const filtered = reviews.filter((r: Review) => {
    if (starFilter > 0 && Math.floor(r.rating) !== starFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.customerName.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Minh bạch & Đáng tin cậy
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Đánh giá từ khách hàng thực tế
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          100% nhận xét từ khách hàng sau khi thợ hoàn thành đơn sửa chữa tại nhà qua FixNear.
        </p>

        {/* Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: 'Tất cả đánh giá', val: 0 },
            { label: '5 Sao ★★★★★', val: 5 },
            { label: '4 Sao ★★★★', val: 4 },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setStarFilter(f.val)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                starFilter === f.val
                  ? 'bg-amber-500 text-slate-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rev: Review) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar src={rev.customerAvatar} name={rev.customerName} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{rev.customerName}</h4>
                    <p className="text-[11px] text-slate-400">{formatDate(rev.createdAt)}</p>
                  </div>
                </div>
                <RatingStars rating={rev.rating} size="sm" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                Dịch vụ: {rev.serviceName}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                "{rev.comment}"
              </p>
            </div>

            {/* Criteria mini badges */}
            {rev.ratings && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div>Chất lượng: <strong className="text-slate-800">{rev.ratings.quality}★</strong></div>
                <div>Thái độ: <strong className="text-slate-800">{rev.ratings.attitude}★</strong></div>
                <div>Đúng giờ: <strong className="text-slate-800">{rev.ratings.punctuality}★</strong></div>
                <div>Giá cả: <strong className="text-slate-800">{rev.ratings.pricing}★</strong></div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

```

---

### File: `src/pages/AboutPage.tsx`

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Award, 
  Heart, 
  Users
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-300">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Câu chuyện khởi nghiệp FixNear
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Nền tảng kết nối dịch vụ sửa chữa địa phương đáng tin cậy
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          “Gặp vấn đề – Tìm thợ gần – Xử lý nhanh.” Chúng tôi xây dựng FixNear để giải quyết triệt để nỗi lo tìm thợ sửa chữa nhà cửa mỗi khi xảy ra sự cố đột xuất.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Sứ mệnh (Mission)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              “Giúp mọi gia đình, người thuê trọ và hộ kinh doanh tìm được đúng người thợ có tâm, có tay nghề để giải quyết nhanh chóng mọi vấn đề trục trặc xảy ra trong cuộc sống hàng ngày.”
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Tầm nhìn (Vision)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              “Trở thành nền tảng công nghệ số 1 tại Việt Nam trong lĩnh vực marketplace dịch vụ địa phương (Local Service Marketplace), chuẩn hóa quy trình báo giá và nâng cao đời sống cho đội ngũ thợ lành nghề.”
            </p>
          </div>

        </div>
      </section>

      {/* 5 Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Nguyên tắc hoạt động
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            5 Giá trị cốt lõi của FixNear
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Nhanh',
              desc: 'Thợ có mặt sau 15–30 phút tại nhà bạn khi phát sinh sự cố khẩn cấp.',
              icon: Zap,
              color: 'text-amber-500 bg-amber-50',
            },
            {
              title: 'Gần',
              desc: 'Tối ưu khoảng cách địa lý theo từng phường, quận quanh nơi bạn ở.',
              icon: MapPin,
              color: 'text-blue-500 bg-blue-50',
            },
            {
              title: 'Minh bạch',
              desc: 'Công khai bảng giá dịch vụ và chi phí linh kiện, không phí ẩn.',
              icon: Award,
              color: 'text-emerald-500 bg-emerald-50',
            },
            {
              title: 'Tin cậy',
              desc: '100% hồ sơ thợ được đối soát CCCD, chứng chỉ và đánh giá thực tế.',
              icon: ShieldCheck,
              color: 'text-indigo-500 bg-indigo-50',
            },
            {
              title: 'Thuận tiện',
              desc: 'Thao tác chỉ 1 chạm: Đăng việc, nhận báo giá, chat và đặt lịch hẹn.',
              icon: Users,
              color: 'text-rose-500 bg-rose-50',
            },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center space-y-2.5"
              >
                <div className={`w-10 h-10 rounded-xl ${val.color} flex items-center justify-center mx-auto`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{val.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Bạn muốn đồng hành cùng FixNear?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Dù bạn là khách hàng cần tìm thợ hay là người thợ muốn nâng cao thu nhập, FixNear luôn sẵn sàng phục vụ.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/technicians">
              <Button size="lg">Tìm thợ gần bạn ngay</Button>
            </Link>
            <Link to="/technician/register">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Đăng ký làm đối tác thợ
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

```

---

### File: `src/pages/FaqPage.tsx`

```tsx
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

```

---

### File: `src/pages/NotFoundPage.tsx`

```tsx
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

```

---

