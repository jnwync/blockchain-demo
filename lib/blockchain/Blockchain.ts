/**
 * Blockchain Class
 * 
 * Manages the entire blockchain - a chain of blocks linked by cryptographic hashes.
 * Provides methods to add blocks, validate the chain, and maintain integrity.
 */

import { Block } from './Block';
import type { BlockchainConfig, ValidationResult, BlockValidation, MiningResult } from './types';

export class Blockchain {
  /** Array of all blocks in the chain */
  chain: Block[];
  
  /** Mining difficulty (1-4 = number of leading zeros required) */
  difficulty: number;

  /**
   * Create a new Blockchain
   * 
   * Automatically creates the genesis block (the first block).
   * The genesis block is special - it has no previous block to link to.
   * 
   * @param config - Optional configuration object
   */
  constructor(config?: BlockchainConfig) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = config?.difficulty || 2; // Default difficulty: 2 leading zeros
  }

  /**
   * Create the Genesis Block
   * 
   * The genesis block is the first block in any blockchain.
   * It's hardcoded and has no previous hash (set to "0").
   * 
   * In real blockchains like Bitcoin, the genesis block often contains
   * a special message. Bitcoin's genesis block contained:
   * "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
   * 
   * @returns The genesis block (Block #0)
   */
  private createGenesisBlock(): Block {
    const genesisBlock = new Block(0, Date.now(), 'Genesis Block', '0');
    // Genesis block doesn't need to be mined in our simple implementation
    // In real blockchains, even genesis blocks follow mining rules
    return genesisBlock;
  }

  /**
   * Get the most recent block in the chain
   * 
   * This is useful when adding a new block, as we need the
   * hash of the latest block to link to it.
   * 
   * @returns The last block in the chain
   */
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add a new block to the blockchain
   * 
   * Creates a new block, mines it with the current difficulty,
   * and adds it to the chain. The new block automatically links
   * to the previous block via its previousHash property.
   * 
   * @param data - The data/transaction to store in the new block
   * @returns MiningResult containing hash, nonce, attempts, and duration
   * 
   * @example
   * ```typescript
   * const blockchain = new Blockchain();
   * const result = blockchain.addBlock("Alice pays Bob 10 coins");
   * console.log(`Block added with hash: ${result.hash}`);
   * ```
   */
  addBlock(data: string): MiningResult {
    const previousBlock = this.getLatestBlock();
    
    const newBlock = new Block(
      this.chain.length,           // index: 0, 1, 2, ...
      Date.now(),                  // current timestamp
      data,                        // the data to store
      previousBlock.hash           // link to previous block
    );
    
    // Mine the block (find valid nonce)
    const miningResult = newBlock.mineBlock(this.difficulty);
    
    // Add the mined block to the chain
    this.chain.push(newBlock);
    
    return miningResult;
  }

  /**
   * Validate the entire blockchain
   * 
   * Checks two critical rules:
   * 1. Hash Integrity: Each block's hash must match its calculated hash
   *    (detects if block data was tampered with)
   * 2. Chain Linkage: Each block's previousHash must match the actual
   *    previous block's hash (detects if blocks were inserted/removed)
   * 
   * @returns True if chain is valid, false if any block is invalid
   * 
   * @example
   * ```typescript
   * console.log(blockchain.isChainValid()); // true
   * 
   * // Tamper with a block
   * blockchain.chain[1].data = "HACKED!";
   * console.log(blockchain.isChainValid()); // false
   * ```
   */
  isChainValid(): boolean {
    // Start at block 1 (skip genesis block, it has no previous block)
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Rule 1: Check if current block's hash is valid
      // If someone tampered with the data, the hash won't match
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Rule 2: Check if blocks are properly linked
      // Current block's previousHash should match previous block's hash
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate the chain and return detailed information
   * 
   * Similar to isChainValid() but provides specific information
   * about which block is invalid and why.
   * 
   * @returns ValidationResult with details about chain validity
   */
  validateChain(): ValidationResult {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check hash integrity
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return {
          isValid: false,
          invalidBlockIndex: i,
          reason: `Block ${i}: Hash mismatch (data was tampered)`
        };
      }

      // Check chain linkage
      if (currentBlock.previousHash !== previousBlock.hash) {
        return {
          isValid: false,
          invalidBlockIndex: i,
          reason: `Block ${i}: Previous hash doesn't match Block ${i - 1}`
        };
      }
    }

    return {
      isValid: true,
      invalidBlockIndex: null,
      reason: null
    };
  }

  /**
   * Get validation status for each block individually
   * 
   * Useful for UI to show which specific blocks are invalid.
   * 
   * @returns Array of BlockValidation objects, one per block
   */
  getBlockValidationStatus(): BlockValidation[] {
    return this.chain.map((block, index) => {
      if (index === 0) {
        // Genesis block is always valid (no previous block to check)
        return { index, isValid: true, reason: null };
      }

      const previousBlock = this.chain[index - 1];

      // Check hash integrity
      if (block.hash !== block.calculateHash()) {
        return {
          index,
          isValid: false,
          reason: 'Hash mismatch - block was tampered'
        };
      }

      // Check linkage
      if (block.previousHash !== previousBlock.hash) {
        return {
          index,
          isValid: false,
          reason: "Previous hash doesn't match chain"
        };
      }

      return { index, isValid: true, reason: null };
    });
  }

  /**
   * Set the mining difficulty
   * 
   * @param difficulty - Number of leading zeros required (1-4)
   */
  setDifficulty(difficulty: number): void {
    if (difficulty < 1 || difficulty > 4) {
      throw new Error('Difficulty must be between 1 and 4');
    }
    this.difficulty = difficulty;
  }

  /**
   * Get blockchain statistics
   */
  getStats() {
    return {
      length: this.chain.length,
      difficulty: this.difficulty,
      isValid: this.isChainValid(),
      latestBlockHash: this.getLatestBlock().hash
    };
  }
}
