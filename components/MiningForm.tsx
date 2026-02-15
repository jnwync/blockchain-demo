import { useState, FormEvent } from 'react';
import { MiningResult } from '@/lib/blockchain/types';

interface MiningFormProps {
  onMine: (data: string) => Promise<MiningResult>;
  isMining: boolean;
  lastMiningResult: MiningResult | null;
  difficulty: number;
}

/**
 * MiningForm Component
 * 
 * Allows users to mine new blocks by entering data.
 * Shows mining progress and displays results after completion.
 * 
 * Features:
 * - Text input for block data
 * - Mine button with loading state
 * - Mining progress spinner
 * - Success message with mining stats
 */
export default function MiningForm({ 
  onMine, 
  isMining, 
  lastMiningResult,
  difficulty 
}: MiningFormProps) {
  const [blockData, setBlockData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!blockData.trim()) {
      setError('Please enter some data for the block');
      return;
    }

    setError(null);

    try {
      await onMine(blockData);
      setBlockData(''); // Clear input after successful mining
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mine block');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Mine New Block
        </h3>
        <p className="text-sm text-gray-600">
          Enter transaction data and click mine to add a new block to the chain
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Field */}
        <div>
          <label htmlFor="blockData" className="block text-sm font-semibold text-gray-700 mb-2">
            Block Data
          </label>
          <input
            id="blockData"
            type="text"
            value={blockData}
            onChange={(e) => setBlockData(e.target.value)}
            disabled={isMining}
            placeholder="e.g., Alice pays Bob 10 coins"
            className={`
              w-full px-4 py-3 border-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors
              ${isMining 
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
                : 'bg-white border-gray-300 hover:border-gray-400'
              }
            `}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Mine Button */}
        <button
          type="submit"
          disabled={isMining || !blockData.trim()}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white
            transition-all duration-200 flex items-center justify-center gap-3
            ${isMining
              ? 'bg-yellow-500 cursor-wait'
              : blockData.trim()
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isMining ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none" 
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                />
              </svg>
              <span>Mining Block...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
              <span>Mine Block</span>
            </>
          )}
        </button>
      </form>

      {/* Mining Result */}
      {lastMiningResult && !isMining && (
        <div className="mt-4 p-4 bg-green-50 border-2 border-green-400 rounded-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-green-800 font-semibold mb-2">
                ✓ Block Mined Successfully!
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-green-700 font-semibold">Time:</span>
                  <span className="ml-2 text-green-900">{lastMiningResult.duration}ms</span>
                </div>
                <div>
                  <span className="text-green-700 font-semibold">Attempts:</span>
                  <span className="ml-2 text-green-900">{lastMiningResult.attempts.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-green-700 font-semibold">Nonce:</span>
                  <span className="ml-2 text-green-900 font-mono">{lastMiningResult.nonce}</span>
                </div>
                <div>
                  <span className="text-green-700 font-semibold">Difficulty:</span>
                  <span className="ml-2 text-green-900">{difficulty}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-700 font-semibold text-sm">Hash:</span>
                <code className="ml-2 text-xs text-green-900 font-mono break-all">
                  {lastMiningResult.hash.substring(0, 32)}...
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-gray-700">
          <strong>⛏️ Mining:</strong> The computer will try different nonce values until it finds 
          a hash with {difficulty} leading zero{difficulty > 1 ? 's' : ''}. This proves computational work was done (Proof-of-Work).
        </p>
      </div>
    </div>
  );
}
