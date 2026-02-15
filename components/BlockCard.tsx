import { useState } from 'react';
import { IBlock } from '@/lib/blockchain/types';
import { truncateHash, formatTimestamp } from '@/lib/utils/formatters';

interface BlockCardProps {
  block: IBlock;
  isValid: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onEdit?: (index: number, newData: string) => void;
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
 */
export default function BlockCard({ block, isValid, isFirst = false, isLast = false, onEdit }: BlockCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(block.data);
  
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
  return (
    <div className="flex items-center">
      {/* Block Card */}
      <div
        className={`
          relative bg-white rounded-lg shadow-lg border-2 p-6 min-w-[300px] max-w-[300px]
          transition-all duration-300
          ${isValid ? 'border-green-400' : 'border-red-500'}
          ${!isValid && 'bg-red-50'}
        `}
      >
        {/* Block Number Badge */}
        <div className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md">
          #{block.index}
        </div>

        {/* Invalid Block Warning */}
        {!isValid && (
          <div className="mb-3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            ⚠️ Invalid Block
          </div>
        )}

        {/* Block Header */}
        <div className="mb-4 pt-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {block.index === 0 ? 'Genesis Block' : `Block ${block.index}`}
          </h3>
          <p className="text-xs text-gray-500">
            {formatTimestamp(block.timestamp)}
          </p>
        </div>

        {/* Block Data */}
        <div className="space-y-3">
          {/* Data */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600 uppercase">
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
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-800 break-words">
                {block.data || '(empty)'}
              </div>
            )}
          </div>

          {/* Previous Hash */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase">
              Previous Hash
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded">
              <code className="text-xs text-blue-600 font-mono break-all">
                {truncateHash(block.previousHash, 16)}
              </code>
            </div>
          </div>

          {/* Current Hash */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase">
              Hash
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded">
              <code className={`text-xs font-mono break-all ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {truncateHash(block.hash, 16)}
              </code>
            </div>
          </div>

          {/* Nonce */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase">
              Nonce
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-800">
              {block.nonce}
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Connector (if not last block) */}
      {!isLast && (
        <div className="flex items-center mx-2">
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400"
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
            <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
              linked
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
