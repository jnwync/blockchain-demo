/**
 * Block Class
 * 
 * Represents a single block in the blockchain.
 * Each block contains data, timestamps, and cryptographic hashes
 * that link it to the previous block in the chain.
 */

import SHA256 from 'crypto-js/sha256';
import type { IBlock, MiningResult } from './types';

export class Block implements IBlock {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;

  /**
   * Create a new Block
   * 
   * @param index - Position in the blockchain (0, 1, 2, ...)
   * @param timestamp - Unix timestamp in milliseconds
   * @param data - The data/transaction to store
   * @param previousHash - Hash of the previous block (creates the chain link)
   */
  constructor(index: number, timestamp: number, data: string, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  /**
   * Calculate the SHA-256 hash of this block
   * 
   * The hash is calculated from all block properties concatenated together.
   * This creates a unique "fingerprint" for the block.
   * If ANY property changes, the hash changes completely (avalanche effect).
   * 
   * @returns SHA-256 hash as a hexadecimal string
   */
  calculateHash(): string {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.data +
      this.nonce
    ).toString();
  }

  /**
   * Mine this block using Proof-of-Work
   * 
   * Mining is the process of finding a nonce (number used once) that,
   * when included in the hash calculation, produces a hash starting
   * with a specific number of zeros (determined by difficulty).
   * 
   * This is computationally expensive by design - it's what makes
   * blockchain secure. An attacker would need to re-mine every block
   * after a tampered one.
   * 
   * @param difficulty - Number of leading zeros required (1-4)
   * @returns MiningResult with hash, nonce, attempts, and duration
   * 
   * @example
   * ```typescript
   * const block = new Block(1, Date.now(), "Alice pays Bob 10", "0");
   * const result = block.mineBlock(2); // Requires hash starting with "00"
   * console.log(result.hash); // "00a8b3f2c1d4e5f6..."
   * console.log(result.attempts); // 256 (average for difficulty 2)
   * ```
   */
  mineBlock(difficulty: number): MiningResult {
    // Create target string: difficulty 2 = "00", difficulty 3 = "000", etc.
    const target = Array(difficulty + 1).join('0');
    const startTime = performance.now();
    let attempts = 0;

    // Keep trying different nonces until we find a hash that starts with target
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
      attempts++;
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.log(`Block #${this.index} mined: ${this.hash} (${attempts} attempts in ${duration}ms)`);

    return {
      success: true,
      hash: this.hash,
      nonce: this.nonce,
      attempts,
      duration
    };
  }

  /**
   * Create a plain object representation of this block
   * Useful for JSON serialization
   */
  toJSON(): IBlock {
    return {
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      nonce: this.nonce,
      hash: this.hash
    };
  }
}
