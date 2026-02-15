'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Toast as ToastType } from '@/hooks/useToast';

interface ToastProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const toastStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-gray-900',
  info: 'bg-blue-500 text-white',
};

const toastIcons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
};

/**
 * Toast notification container component
 * Displays animated toast notifications in the bottom-right corner
 */
export default function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              ${toastStyles[toast.type]}
              px-4 py-3 rounded-lg shadow-lg
              flex items-center gap-3
              min-w-[300px] max-w-[400px]
              pointer-events-auto
              cursor-pointer
              hover:shadow-xl hover:scale-105
            `}
            onClick={() => onDismiss(toast.id)}
            role="alert"
          >
            <span className="text-2xl flex-shrink-0">
              {toastIcons[toast.type]}
            </span>
            <p className="flex-1 text-sm font-medium">
              {toast.message}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss(toast.id);
              }}
              className="flex-shrink-0 hover:opacity-70"
              aria-label="Dismiss notification"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
