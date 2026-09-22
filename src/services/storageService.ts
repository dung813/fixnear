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
  EQuote,
  Address,
  Quotation,
  FinalPaymentMethod,
  WarrantyClaim
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
  INITIAL_DISPUTES,
  INITIAL_ADDRESSES
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
  ADDRESSES: 'fixnear_addresses',
  WARRANTY_CLAIMS: 'fixnear_warranty_claims',
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
  // Intentionally no default for CURRENT_USER: the app starts logged out
  // (Guest/Unauthenticated) until the visitor explicitly logs in or registers.
  if (!localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(INITIAL_CONVERSATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DISPUTES)) {
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(INITIAL_DISPUTES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADDRESSES)) {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(INITIAL_ADDRESSES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.WARRANTY_CLAIMS)) {
    localStorage.setItem(STORAGE_KEYS.WARRANTY_CLAIMS, JSON.stringify([]));
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
    const list = getItem<Technician[]>(STORAGE_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
    // Defensive normalization: data cached in localStorage before a schema change
    // (e.g. availableDates) may be missing newer fields and would otherwise crash consumers.
    return list.map(t => ({ ...t, availableDates: t.availableDates ?? [] }));
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

  // Quotation approval (phát sinh vật tư / chi phí trong quá trình sửa chữa)
  submitQuotation(bookingId: string, quotation: Omit<Quotation, 'status' | 'createdAt'>): void {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        status: 'quote_pending',
        quotation: { ...quotation, status: 'pending', createdAt: new Date().toISOString() },
        quotedAt: new Date().toISOString(),
      };
      setItem(STORAGE_KEYS.BOOKINGS, list);
    }
  },
  respondToQuotation(bookingId: string, approve: boolean, feedback?: string): void {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === bookingId);
    if (idx !== -1 && list[idx].quotation) {
      list[idx] = {
        ...list[idx],
        status: approve ? 'payment_pending' : 'quote_pending',
        quotation: {
          ...list[idx].quotation!,
          status: approve ? 'approved' : 'rejected',
          customerFeedback: feedback,
        },
      };
      setItem(STORAGE_KEYS.BOOKINGS, list);
    }
  },

  // Final payment via the mock payment gateway (Momo / VNPay / Bank Transfer / Card)
  completePayment(bookingId: string, method: FinalPaymentMethod): string {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === bookingId);
    const invoiceId = `INV-${Date.now()}`;
    if (idx !== -1) {
      const current = list[idx];
      const finalAmount = current.quotation?.totalAmount ?? current.estimatedPrice;
      list[idx] = {
        ...current,
        status: 'completed',
        finalPrice: finalAmount,
        finalPaymentMethod: method,
        paymentStatus: 'released',
        invoiceId,
        paidAt: new Date().toISOString(),
        completedAt: current.completedAt ?? new Date().toISOString(),
      };
      setItem(STORAGE_KEYS.BOOKINGS, list);
    }
    return invoiceId;
  },

  // Warranty Claims
  getWarrantyClaims(customerId?: string): WarrantyClaim[] {
    const list = getItem<WarrantyClaim[]>(STORAGE_KEYS.WARRANTY_CLAIMS, []);
    return customerId ? list.filter(w => w.customerId === customerId) : list;
  },
  addWarrantyClaim(claim: WarrantyClaim): void {
    const list = getItem<WarrantyClaim[]>(STORAGE_KEYS.WARRANTY_CLAIMS, []);
    list.unshift(claim);
    setItem(STORAGE_KEYS.WARRANTY_CLAIMS, list);
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
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },
  addUser(user: User): void {
    const list = this.getUsers();
    list.push(user);
    setItem(STORAGE_KEYS.USERS, list);
  },

  // Saved Addresses
  getAllAddresses(): Address[] {
    return getItem<Address[]>(STORAGE_KEYS.ADDRESSES, INITIAL_ADDRESSES);
  },
  getAddresses(userId: string): Address[] {
    return this.getAllAddresses().filter(a => a.userId === userId);
  },
  addAddress(addr: Address): void {
    const list = this.getAllAddresses();
    if (addr.isDefault) {
      list.forEach(a => { if (a.userId === addr.userId) a.isDefault = false; });
    }
    list.push(addr);
    setItem(STORAGE_KEYS.ADDRESSES, list);
  },
  updateAddress(id: string, updates: Partial<Address>): void {
    const list = this.getAllAddresses();
    const idx = list.findIndex(a => a.id === id);
    if (idx !== -1) {
      if (updates.isDefault) {
        list.forEach(a => { if (a.userId === list[idx].userId) a.isDefault = false; });
      }
      list[idx] = { ...list[idx], ...updates };
      setItem(STORAGE_KEYS.ADDRESSES, list);
    }
  },
  deleteAddress(id: string): void {
    const list = this.getAllAddresses().filter(a => a.id !== id);
    setItem(STORAGE_KEYS.ADDRESSES, list);
  },
  setDefaultAddress(userId: string, id: string): void {
    const list = this.getAllAddresses();
    list.forEach(a => { if (a.userId === userId) a.isDefault = a.id === id; });
    setItem(STORAGE_KEYS.ADDRESSES, list);
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
    localStorage.removeItem(STORAGE_KEYS.ADDRESSES);
    localStorage.removeItem(STORAGE_KEYS.WARRANTY_CLAIMS);
    initializeStorage();
    window.location.reload();
  }
};

