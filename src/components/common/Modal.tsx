import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  // Rendered via a portal straight into document.body: a modal nested inside an
  // ancestor with backdrop-blur/transform/filter (e.g. the sticky Navbar header)
  // would otherwise get a new CSS containing block, breaking `fixed inset-0`
  // centering and clipping the dialog to that ancestor's box.
  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-2xl my-auto animate-scale-in',
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

        {/* Close button when there's no header to host it */}
        {!title && !description && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 rounded-lg p-1.5 bg-white/80 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};
