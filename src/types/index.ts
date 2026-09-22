export type UserRole = 'customer' | 'technician' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string; // demo-only mock credential, never used for real security
  role: UserRole;
  avatar: string;
  address?: string;
  district: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  address: string;
  district: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh';
  isDefault: boolean;
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
  availableDates: string[]; // ISO date strings (YYYY-MM-DD) the technician has open slots
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
  | 'pending'         // Chờ xác nhận
  | 'accepted'        // Đã xác nhận
  | 'surveying'       // Đang khảo sát tại nhà
  | 'in_progress'     // Đang thi công
  | 'quote_pending'   // Chờ khách duyệt báo giá phát sinh
  | 'payment_pending' // Đã duyệt báo giá, chờ thanh toán
  | 'completed'       // Đã hoàn thành (chờ đánh giá/nghiệm thu)
  | 'cancelled'       // Đã hủy
  | 'reviewed';       // Đã đánh giá

export type PaymentMethod = 'escrow' | 'cash';
export type PaymentStatus = 'holding_escrow' | 'released' | 'refunded' | 'cash_on_delivery';
export type FinalPaymentMethod = 'momo' | 'vnpay' | 'bank_transfer' | 'card';

export interface QuotationPart {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface QuotationExtraCharge {
  id: string;
  description: string;
  reason: string;
  amount: number;
  photos: string[];
}

export interface Quotation {
  laborCost: number;
  parts: QuotationPart[];
  extraCharges: QuotationExtraCharge[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  customerFeedback?: string;
  createdAt: string;
}

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
  quotation?: Quotation;
  finalPaymentMethod?: FinalPaymentMethod;
  invoiceId?: string;
  createdAt: string;
  surveyAt?: string;
  inProgressAt?: string;
  quotedAt?: string;
  paidAt?: string;
  completedAt?: string;
}

export interface WarrantyClaim {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  technicianName: string;
  description: string;
  photos: string[];
  preferredDate: string;
  status: 'pending' | 'scheduled' | 'resolved';
  createdAt: string;
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
  videoUrl?: string;
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

