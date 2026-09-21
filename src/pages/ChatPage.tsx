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

