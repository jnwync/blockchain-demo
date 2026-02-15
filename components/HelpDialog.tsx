'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HelpDialog Component
 * 
 * Provides quick help and keyboard shortcuts information
 * Displays in a modal overlay
 */
export default function HelpDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open help dialog"
        title="Help & Shortcuts"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    🎓 How to Use Blockchain Visualizer
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close dialog"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Quick Start */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Quick Start
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><strong>Mine Blocks:</strong> Enter data in the mining form and click "Mine Block"</li>
                      <li><strong>Change Difficulty:</strong> Select difficulty levels 1-4 (higher = slower mining)</li>
                      <li><strong>Tamper Blocks:</strong> Click "Edit" on any block to simulate an attack</li>
                      <li><strong>Watch Validation:</strong> See how tampering breaks the chain</li>
                    </ol>
                  </section>

                  {/* Keyboard Shortcuts */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-2xl">⌨️</span>
                      Keyboard Shortcuts
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">M</kbd>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Focus mining form</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">1-4</kbd>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Set difficulty</span>
                      </div>
                    </div>
                  </section>

                  {/* Features */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Features
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Copy Hashes:</strong>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Hover over hash displays and click the copy icon</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Dark Mode:</strong>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Toggle theme with the button in the top-right corner</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Real-time Validation:</strong>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Watch the validation indicator change as you modify blocks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Transaction Ledger:</strong>
                          <p className="text-sm text-gray-600 dark:text-gray-400">View complete history at the bottom of the page</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Key Concepts */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      Key Concepts
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <strong className="text-blue-900 dark:text-blue-300">Hash:</strong>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                          A unique fingerprint of the block's data. Any change invalidates the hash.
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                        <strong className="text-purple-900 dark:text-purple-300">Nonce:</strong>
                        <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                          A number that miners adjust to find a valid hash (Proof-of-Work).
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <strong className="text-green-900 dark:text-green-300">Previous Hash:</strong>
                        <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                          Links each block to the one before it, creating an unbreakable chain.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Got it!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
