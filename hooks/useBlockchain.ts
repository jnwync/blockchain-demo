import { useState, useCallback, useEffect, useRef } from 'react';
import { Blockchain } from '@/lib/blockchain';
import { IBlock, BlockValidation, MiningResult } from '@/lib/blockchain/types';

/**
 * Custom hook for managing blockchain state in React
 * 
 * Encapsulates all blockchain logic and provides a clean API
 * for components to interact with the blockchain.
 */
export function useBlockchain(initialDifficulty: number = 2) {
  // Store blockchain instance in a ref to persist across renders
  const blockchainRef = useRef<Blockchain | null>(null);
  
  // React state
  const [chain, setChain] = useState<IBlock[]>([]);
  const [validationStatus, setValidationStatus] = useState<BlockValidation[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [difficulty, setDifficultyState] = useState<number>(initialDifficulty);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [lastMiningResult, setLastMiningResult] = useState<MiningResult | null>(null);
  
  // Initialize blockchain on mount
  useEffect(() => {
    if (!blockchainRef.current) {
      blockchainRef.current = new Blockchain({ difficulty: initialDifficulty });
      updateChainState();
    }
  }, [initialDifficulty]);
  
  /**
   * Updates all chain-related state from the blockchain instance
   */
  const updateChainState = useCallback(() => {
    if (!blockchainRef.current) return;
    
    const bc = blockchainRef.current;
    
    // Update chain
    setChain([...bc.chain]);
    
    // Update validation
    const validation = bc.getBlockValidationStatus();
    setValidationStatus(validation);
    
    // Update overall validity
    const valid = bc.isChainValid();
    setIsValid(valid);
  }, []);
  
  /**
   * Mines and adds a new block to the chain
   * @param data - The data to store in the block
   * @returns Promise resolving to the mining result
   */
  const addBlock = useCallback(async (data: string): Promise<MiningResult> => {
    if (!blockchainRef.current) {
      throw new Error('Blockchain not initialized');
    }
    
    if (isMining) {
      throw new Error('Already mining a block');
    }
    
    setIsMining(true);
    setLastMiningResult(null);
    
    try {
      // Mining is synchronous but we wrap in setTimeout to allow UI to update
      const result = await new Promise<MiningResult>((resolve) => {
        setTimeout(() => {
          const miningResult = blockchainRef.current!.addBlock(data);
          resolve(miningResult);
        }, 10); // Small delay to show "Mining..." state
      });
      
      setLastMiningResult(result);
      updateChainState();
      
      return result;
    } finally {
      setIsMining(false);
    }
  }, [isMining, updateChainState]);
  
  /**
   * Changes the mining difficulty
   * @param newDifficulty - New difficulty level (1-4)
   */
  const setDifficulty = useCallback((newDifficulty: number) => {
    if (!blockchainRef.current) return;
    
    if (newDifficulty < 1 || newDifficulty > 4) {
      console.warn('Difficulty must be between 1 and 4');
      return;
    }
    
    blockchainRef.current.difficulty = newDifficulty;
    setDifficultyState(newDifficulty);
  }, []);
  
  /**
   * Edits a block's data without re-mining (for tampering demo)
   * @param index - Block index to edit
   * @param newData - New data value
   */
  const editBlock = useCallback((index: number, newData: string) => {
    if (!blockchainRef.current) return;
    
    if (index < 0 || index >= blockchainRef.current.chain.length) {
      console.warn('Invalid block index');
      return;
    }
    
    // Directly modify the block data without recalculating hash
    // This breaks the chain intentionally for educational purposes
    blockchainRef.current.chain[index].data = newData;
    
    updateChainState();
  }, [updateChainState]);
  
  /**
   * Resets the blockchain to just the genesis block
   */
  const resetChain = useCallback(() => {
    blockchainRef.current = new Blockchain({ difficulty });
    updateChainState();
    setLastMiningResult(null);
  }, [difficulty, updateChainState]);
  
  /**
   * Fixes a tampered block by re-mining it
   * @param index - Block index to fix
   */
  const fixBlock = useCallback(async (index: number): Promise<void> => {
    if (!blockchainRef.current) return;
    
    const block = blockchainRef.current.chain[index];
    if (!block || index === 0) return; // Can't fix genesis block
    
    setIsMining(true);
    
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          // Recalculate hash with current data
          block.hash = block.calculateHash();
          
          // Mine the block with current difficulty
          block.mineBlock(blockchainRef.current!.difficulty);
          
          // Update all subsequent blocks
          for (let i = index + 1; i < blockchainRef.current!.chain.length; i++) {
            const currentBlock = blockchainRef.current!.chain[i];
            currentBlock.previousHash = blockchainRef.current!.chain[i - 1].hash;
            currentBlock.hash = currentBlock.calculateHash();
            currentBlock.mineBlock(blockchainRef.current!.difficulty);
          }
          
          resolve();
        }, 10);
      });
      
      updateChainState();
    } finally {
      setIsMining(false);
    }
  }, [updateChainState]);
  
  /**
   * Gets detailed validation information for a specific block
   * @param index - Block index
   * @returns Validation info for the block
   */
  const getBlockValidation = useCallback((index: number): BlockValidation | undefined => {
    return validationStatus.find(v => v.index === index);
  }, [validationStatus]);
  
  return {
    // State
    chain,
    validationStatus,
    isValid,
    difficulty,
    isMining,
    lastMiningResult,
    
    // Methods
    addBlock,
    setDifficulty,
    editBlock,
    resetChain,
    fixBlock,
    getBlockValidation,
  };
}
