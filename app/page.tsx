'use client';

import { useEffect } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import BlockChainView from '@/components/BlockChainView';
import ValidationIndicator from '@/components/ValidationIndicator';
import DifficultySelector from '@/components/DifficultySelector';
import MiningForm from '@/components/MiningForm';

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
    setDifficulty
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
          <BlockChainView chain={chain} validationStatus={validationStatus} />

          {/* TODO: Add in future phases:
              - Block editing for tampering demo (Phase 5)
              - TransactionLedger view (Phase 6 - bonus)
          */}
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
