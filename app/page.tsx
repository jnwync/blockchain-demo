'use client';

import { useEffect } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import BlockChainView from '@/components/BlockChainView';

export default function Home() {
  // Phase 3: Use custom blockchain state management hook
  const { 
    chain, 
    validationStatus, 
    isValid, 
    difficulty,
    isMining,
    addBlock 
  } = useBlockchain(2); // Start with difficulty 2

  useEffect(() => {
    // Pre-mine a couple of blocks to demonstrate the chain on initial load
    const initializeChain = async () => {
      try {
        await addBlock('Alice pays Bob 10 coins');
        await addBlock('Bob pays Charlie 5 coins');
      } catch (error) {
        console.error('Error initializing chain:', error);
      }
    };
    
    // Only initialize if we just have genesis block
    if (chain.length === 1) {
      initializeChain();
    }
  }, []); // Empty dependency array - run once on mount

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Blockchain Visualizer
          </h1>
          <p className="text-gray-600">
            Watch how blockchain works in real-time
          </p>
          
          {/* Chain Status Info */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Status:</span>
              <span className={`font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {isValid ? '✓ Valid' : '✗ Invalid'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Difficulty:</span>
              <span className="font-semibold text-blue-600">{difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Blocks:</span>
              <span className="font-semibold text-gray-900">{chain.length}</span>
            </div>
            {isMining && (
              <div className="flex items-center gap-2 text-yellow-600">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="font-semibold">Mining...</span>
              </div>
            )}
          </div>
        </header>

        <main>
          {/* Phase 2 & 3: Display the Blockchain with live state */}
          <BlockChainView chain={chain} validationStatus={validationStatus} />

          {/* TODO: Add interactive components in future phases:
              - ValidationIndicator (Phase 4)
              - DifficultySelector (Phase 4)
              - MiningForm (Phase 4)
              - Block editing (Phase 5)
              - TransactionLedger (Phase 6 - bonus)
          */}
        </main>
      </div>
    </div>
  );
}
