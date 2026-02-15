'use client';

import { useEffect, useState } from 'react';
import { Blockchain } from '@/lib/blockchain';
import { IBlock, BlockValidation } from '@/lib/blockchain/types';
import BlockChainView from '@/components/BlockChainView';

export default function Home() {
  const [chain, setChain] = useState<IBlock[]>([]);
  const [validationStatus, setValidationStatus] = useState<BlockValidation[]>([]);

  useEffect(() => {
    // Initialize blockchain with genesis block and a few pre-mined blocks
    const blockchain = new Blockchain({ difficulty: 2 });
    
    // Mine a couple of blocks to demonstrate the chain
    blockchain.addBlock('Alice pays Bob 10 coins');
    blockchain.addBlock('Bob pays Charlie 5 coins');
    
    // Get validation status for all blocks
    const validation = blockchain.getBlockValidationStatus();
    
    setChain(blockchain.chain);
    setValidationStatus(validation);
  }, []);

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
        </header>

        <main>
          {/* Phase 2: Display the Blockchain */}
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
