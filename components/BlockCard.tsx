'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { IBlock } from '@/lib/blockchain/types';
import { truncateHash, formatTimestamp } from '@/lib/utils/formatters';

interface BlockCardProps {
  block: IBlock;
  isValid: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onEdit?: (index: number, newData: string) => void;
  onCopyHash?: (hash: string) => void;
}

/**
 * BlockCard Component
 * 
 * Displays a single block with all 6 required fields:
 * 1. Block number (index)
 * 2. Timestamp
 * 3. Data
 * 4. Previous hash
 * 5. Nonce
 * 6. Hash
 * 
 * Phase 5: Added edit functionality for tampering demonstration
 * Enhanced: Added animations, copy-to-clipboard, accessibility
 * Optimized: Memoized for performance
 */
const BlockCard = memo(function BlockCard({ block, isValid, isFirst = false, isLast = false, onEdit, onCopyHash }: BlockCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(block.data);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  
  const handleSave = () => {
    if (onEdit && editedData !== block.data) {
      onEdit(block.index, editedData);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedData(block.data);
    setIsEditing(false);
  };

  const copyToClipboard = async (text: string, type: 'hash' | 'prevHash') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(type);
      if (onCopyHash) onCopyHash(text);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Block Card */}
      <motion.div
        className={`
          relative bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 p-6 min-w-[300px] max-w-[300px]
          transition-all duration-300
          ${isValid ? 'border-green-400' : 'border-red-500'}
          ${!isValid && 'bg-red-50 dark:bg-red-900/20'}
        `}
        whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
        animate={!isValid ? { x: [0, -2, 2, -2, 2, 0] } : {}}
        transition={!isValid ? { duration: 0.5 } : { duration: 0.2 }}
      >
        {/* Block Number Badge */}
        <motion.div
          className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          #{block.index}
        </motion.div>

        {/* Invalid Block Warning */}
        {!isValid && (
          <motion.div
            className="mb-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-3 py-2 rounded text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            ⚠️ Invalid Block
          </motion.div>
        )}

        {/* Block Header */}
        <div className="mb-4 pt-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {block.index === 0 ? 'Genesis Block' : `Block ${block.index}`}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimestamp(block.timestamp)}
          </p>
        </div>

        {/* Block Data */}
        <div className="space-y-3">
          {/* Data */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Data
              </label>
              {/* Edit Button (not for genesis block) */}
              {block.index > 0 && onEdit && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedData}
                  onChange={(e) => setEditedData(e.target.value)}
                  className="w-full p-2 border-2 border-yellow-400 rounded text-sm focus:outline-none focus:border-yellow-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded hover:bg-yellow-600"
                  >
                    Tamper Block
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                  ⚠️ Changing data without re-mining will break the chain!
                </p>
              </div>
            ) : (
              <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200 break-words">
                {block.data || '(empty)'}
              </div>
            )}
          </div>

          {/* Previous Hash */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Previous Hash
            </label>
            <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded relative group">
              <code className="text-xs text-blue-600 dark:text-blue-400 font-mono break-all hash-display">
                {truncateHash(block.previousHash, 16)}
              </code>
              <button
                onClick={() => copyToClipboard(block.previousHash, 'prevHash')}
                className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-600"
                title="Copy previous hash"
                aria-label="Copy previous hash to clipboard"
              >
                {copiedHash === 'prevHash' ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Current Hash */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Hash
            </label>
            <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded relative group">
              <code className={`text-xs font-mono break-all hash-display ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {truncateHash(block.hash, 16)}
              </code>
              <button
                onClick={() => copyToClipboard(block.hash, 'hash')}
                className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-600"
                title="Copy hash"
                aria-label="Copy hash to clipboard"
              >
                {copiedHash === 'hash' ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Nonce */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Nonce
            </label>
            <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              {block.nonce}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Arrow Connector (if not last block) */}
      {!isLast && (
        <motion.div
          className="flex items-center mx-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {/* Hash Link Indicator */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">
              linked
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

export default BlockCard;
