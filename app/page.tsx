'use client';

import { useEffect } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import BlockChainView from '@/components/BlockChainView';
import ValidationIndicator from '@/components/ValidationIndicator';
import DifficultySelector from '@/components/DifficultySelector';
import MiningForm from '@/components/MiningForm';
import TransactionLedger from '@/components/TransactionLedger';

export default function Home() {
  // Phase 3: Use custom blockchain state management hook
  const { 
    chain, 
    validationStatus, 
    isValid, 
    difficulty,
    isMining,
    lastMiningResult,
    addBlock,
    setDifficulty,
    editBlock
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            ⛓️ Blockchain Visualizer
          </h1>
          <p className="text-lg text-gray-600">
            Watch how blockchain works in real-time - mine blocks, see validation, and understand proof-of-work
          </p>
        </header>

        <main className="space-y-6">
          {/* Phase 4: Validation Indicator */}
          <ValidationIndicator isValid={isValid} blockCount={chain.length} />

          {/* Phase 4: Interactive Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DifficultySelector
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              disabled={isMining}
            />
            <MiningForm
              onMine={addBlock}
              isMining={isMining}
              lastMiningResult={lastMiningResult}
              difficulty={difficulty}
            />
          </div>

          {/* Phase 2 & 3: Display the Blockchain */}
          <BlockChainView 
            chain={chain} 
            validationStatus={validationStatus}
            onEditBlock={editBlock}
          />

          {/* Educational Info Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Try Tampering with the Blockchain!
            </h3>
            <p className="text-sm text-yellow-800 mb-3">
              Click the <strong>"Edit"</strong> button on any block (except Genesis) to change its data. 
              This simulates a malicious actor trying to alter transaction history.
            </p>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>The block's hash won't be recalculated (tampered data)</li>
              <li>The validation indicator will turn red</li>
              <li>The tampered block and all subsequent blocks will show as invalid</li>
              <li>This demonstrates why blockchain is secure and tamper-evident!</li>
            </ul>
          </div>

          {/* Phase 6: Transaction Ledger (Bonus Feature) */}
          <TransactionLedger chain={chain} />
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS • 
            Educational blockchain visualization
          </p>
        </footer>
      </div>
    </div>
  );
}
