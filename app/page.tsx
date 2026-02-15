'use client';

import { useEffect, useRef } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import { useToast } from '@/hooks/useToast';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useIsMobile } from '@/hooks/useMediaQuery';
import BlockChainView from '@/components/BlockChainView';
import ValidationIndicator from '@/components/ValidationIndicator';
import DifficultySelector from '@/components/DifficultySelector';
import MiningForm from '@/components/MiningForm';
import TransactionLedger from '@/components/TransactionLedger';
import ToastContainer from '@/components/ToastContainer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const isMobile = useIsMobile();
  const miningFormRef = useRef<HTMLDivElement>(null);
  
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

  // Toast notifications
  const { toasts, hideToast, success, info, error: showError } = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'm',
      description: 'Focus mining form',
      callback: () => {
        miningFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        const input = miningFormRef.current?.querySelector('input');
        input?.focus();
      }
    },
    {
      key: '1',
      description: 'Set difficulty to 1',
      callback: () => {
        if (!isMining) {
          setDifficulty(1);
        }
      }
    },
    {
      key: '2',
      description: 'Set difficulty to 2',
      callback: () => {
        if (!isMining) {
          setDifficulty(2);
        }
      }
    },
    {
      key: '3',
      description: 'Set difficulty to 3',
      callback: () => {
        if (!isMining) {
          setDifficulty(3);
        }
      }
    },
    {
      key: '4',
      description: 'Set difficulty to 4',
      callback: () => {
        if (!isMining) {
          setDifficulty(4);
        }
      }
    },
  ]);

  // Handle copy hash with toast notification
  const handleCopyHash = (hash: string) => {
    success('Copied');
  };

  useEffect(() => {
    // Pre-mine a couple of blocks to demonstrate the chain on initial load
    const initializeChain = async () => {
      try {
        await addBlock('Alice pays Bob 10 coins');
        await addBlock('Bob pays Charlie 5 coins');
      } catch (err) {
        console.error('Error initializing chain:', err);
      }
    };
    
    // Only initialize if we just have genesis block
    if (chain.length === 1) {
      initializeChain();
    }
  }, []); // Empty dependency array - run once on mount

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Blockchain Visualizer
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-6">
          {/* Phase 4: Validation Indicator */}
          <ValidationIndicator isValid={isValid} blockCount={chain.length} />

          {/* Phase 4: Interactive Controls */}
          <div ref={miningFormRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            onCopyHash={handleCopyHash}
          />

          {/* Phase 6: Transaction Ledger (Bonus Feature) */}
          <TransactionLedger chain={chain} />
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={hideToast} />
    </div>
  );
}
