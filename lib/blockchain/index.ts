/**
 * Blockchain Library - Public Exports
 * 
 * This file defines the public API for our blockchain library.
 * Import from here to use blockchain functionality in your application.
 * 
 * @example
 * ```typescript
 * import { Block, Blockchain } from '@/lib/blockchain';
 * 
 * const blockchain = new Blockchain({ difficulty: 2 });
 * blockchain.addBlock("Alice pays Bob 10 coins");
 * ```
 */

// Core classes
export { Block } from './Block';
export { Blockchain } from './Blockchain';

// TypeScript type definitions
export type {
  IBlock,
  MiningResult,
  ValidationResult,
  BlockValidation,
  BlockchainConfig
} from './types';
