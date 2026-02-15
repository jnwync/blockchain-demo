'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ValidationIndicatorProps {
  isValid: boolean;
  blockCount: number;
}

/**
 * ValidationIndicator Component
 * 
 * Large, prominent display showing chain validity status.
 * Updates automatically when chain changes.
 * 
 * Requirements:
 * - Green background with checkmark when valid
 * - Red background with X when invalid
 * - Clear, easy-to-read status
 * Enhanced: Smooth animations, dark mode support
 */
export default function ValidationIndicator({ isValid, blockCount }: ValidationIndicatorProps) {
  return (
    <motion.div
      className={`
        rounded-lg p-6 shadow-lg border-2 transition-all duration-500
        ${isValid 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600' 
          : 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600'
        }
      `}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        boxShadow: isValid 
          ? '0 10px 15px -3px rgba(34, 197, 94, 0.1)'
          : '0 10px 15px -3px rgba(239, 68, 68, 0.1)'
      }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      aria-label={isValid ? 'Blockchain is valid' : 'Blockchain is invalid'}
    >
      <div className="flex items-center justify-between">
        {/* Status Icon and Text */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isValid ? (
              <motion.div
                key="valid"
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="invalid"
                className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div>
            <motion.h2
              className={`
                text-3xl font-bold
                ${isValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}
              `}
              key={isValid ? 'valid-text' : 'invalid-text'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isValid ? 'VALID' : 'INVALID'}
            </motion.h2>
            <p className={`text-sm mt-1 ${isValid ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
              {isValid
                ? `${blockCount} blocks verified`
                : 'Integrity check failed'
              }
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-right">
          <div className={`text-sm font-semibold ${isValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            Status
          </div>
          <div className={`text-xs mt-1 ${isValid ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {isValid ? 'Verified' : 'Error detected'}
          </div>
        </div>
      </div>

      {/* Warning Message for Invalid Chain */}
      <AnimatePresence>
        {!isValid && (
          <motion.div
            className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 rounded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-red-800 dark:text-red-300">
              <strong>Warning:</strong> Invalid hash or broken chain link detected
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
