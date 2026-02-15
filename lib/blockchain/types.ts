/**
 * Core TypeScript interfaces for Blockchain Visualizer
 * 
 * These types define the structure of our blockchain data and operations.
 * Written for educational purposes to demonstrate blockchain concepts.
 */

/**
 * Represents a single block in the blockchain
 */
export interface IBlock {
  /** Position in the blockchain (0, 1, 2, ...) */
  index: number;
  
  /** Unix timestamp (milliseconds) when block was created */
  timestamp: number;
  
  /** The actual data/transaction stored in this block */
  data: string;
  
  /** Hash of the previous block (creates the "chain") */
  previousHash: string;
  
  /** Number used in mining to find valid hash */
  nonce: number;
  
  /** SHA-256 hash of this block (unique identifier) */
  hash: string;
}

/**
 * Result returned after mining a block
 */
export interface MiningResult {
  /** Whether mining was successful */
  success: boolean;
  
  /** The final hash found */
  hash: string;
  
  /** The nonce value that produced the valid hash */
  nonce: number;
  
  /** Number of hash calculations attempted */
  attempts: number;
  
  /** Time taken to mine in milliseconds */
  duration: number;
}

/**
 * Result of chain validation
 */
export interface ValidationResult {
  /** Whether the entire chain is valid */
  isValid: boolean;
  
  /** Index of the first invalid block (null if all valid) */
  invalidBlockIndex: number | null;
  
  /** Reason for invalidity (null if valid) */
  reason: string | null;
}

/**
 * Validation status for an individual block
 */
export interface BlockValidation {
  /** Block index */
  index: number;
  
  /** Whether this specific block is valid */
  isValid: boolean;
  
  /** Reason if invalid (null if valid) */
  reason: string | null;
}

/**
 * Configuration for blockchain instance
 */
export interface BlockchainConfig {
  /** Mining difficulty (1-4, number of leading zeros) */
  difficulty?: number;
}
