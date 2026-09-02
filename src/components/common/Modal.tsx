import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Playful Sticker Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl p-6 sm:p-8 border-2 border-dark shadow-pop-lg z-10 animate-bounce-in my-8`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b-2 border-dark/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary border-2 border-dark" />
            <h2 className="text-xl font-heading font-black tracking-tight text-dark">{title}</h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream border-2 border-dark text-dark hover:bg-rose-100 flex items-center justify-center shadow-pop-active active:shadow-none transition-all"
            aria-label="Close modal"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
};
