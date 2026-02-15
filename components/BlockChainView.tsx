import { IBlock, BlockValidation } from '@/lib/blockchain/types';
import BlockCard from './BlockCard';

interface BlockChainViewProps {
  chain: IBlock[];
  validationStatus: BlockValidation[];
}

/**
 * BlockChainView Component
 * 
 * Container that displays the entire blockchain with visual linking
 * between blocks. Shows how each block's previousHash connects to
 * the previous block's hash.
 */
export default function BlockChainView({ chain, validationStatus }: BlockChainViewProps) {
  if (chain.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 text-lg">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="font-semibold">No blocks in the chain</p>
          <p className="text-sm mt-2">Mine your first block to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Chain Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Blockchain
        </h2>
        <p className="text-gray-600 mt-1">
          {chain.length} block{chain.length !== 1 ? 's' : ''} in the chain
        </p>
      </div>

      {/* Scrollable Chain Container */}
      <div className="relative">
        {/* Horizontal scroll container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center space-x-0 min-w-max">
            {chain.map((block, index) => {
              // Find validation status for this block
              const validation = validationStatus.find(v => v.index === index);
              const isValid = validation?.isValid ?? true;
              
              return (
                <BlockCard
                  key={block.index}
                  block={block}
                  isValid={isValid}
                  isFirst={index === 0}
                  isLast={index === chain.length - 1}
                />
              );
            })}
          </div>
        </div>

        {/* Scroll hint on mobile */}
        {chain.length > 1 && (
          <div className="flex justify-center mt-4">
            <div className="text-sm text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-2 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span>Scroll to see all blocks</span>
              <svg
                className="w-4 h-4 ml-2 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Chain Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          🔗 How Blocks Link Together
        </h3>
        <p className="text-sm text-blue-800">
          Each block's <strong>Previous Hash</strong> field matches the <strong>Hash</strong> of the block before it. 
          This creates an unbreakable chain - changing any block would break all the links that come after it!
        </p>
      </div>
    </div>
  );
}
