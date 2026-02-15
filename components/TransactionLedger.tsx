import { IBlock } from '@/lib/blockchain/types';
import { formatTimestamp } from '@/lib/utils/formatters';

interface TransactionLedgerProps {
  chain: IBlock[];
}

/**
 * TransactionLedger Component
 * 
 * Bonus Feature: Simple list view of all block data in chronological order.
 * Provides a transaction history view of the blockchain.
 */
export default function TransactionLedger({ chain }: TransactionLedgerProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          📜 Transaction Ledger
        </h3>
        <p className="text-sm text-gray-600">
          Complete history of all transactions in chronological order
        </p>
      </div>

      {/* Transaction List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {chain.map((block, index) => (
          <div
            key={block.index}
            className={`
              p-4 rounded-lg border-l-4 transition-colors
              ${index === 0 
                ? 'bg-blue-50 border-blue-500' 
                : 'bg-gray-50 border-gray-400 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-start justify-between">
              {/* Block Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded">
                    Block #{block.index}
                  </span>
                  {index === 0 && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Genesis
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {block.data || '(Genesis Block)'}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimestamp(block.timestamp)}
                </div>
              </div>

              {/* Transaction Icon */}
              <div className="ml-4">
                {index === 0 ? (
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{chain.length}</div>
            <div className="text-xs text-gray-500">Total Blocks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{chain.length - 1}</div>
            <div className="text-xs text-gray-500">Transactions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {chain[chain.length - 1]?.nonce || 0}
            </div>
            <div className="text-xs text-gray-500">Last Nonce</div>
          </div>
        </div>
      </div>
    </div>
  );
}
