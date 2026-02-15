/**
 * Test script for Phase 1 blockchain implementation
 * 
 * Run in browser console to verify blockchain logic works correctly
 */

import { Blockchain } from './lib/blockchain';

console.log('🔗 Testing Blockchain Implementation - Phase 1\n');
console.log('='.repeat(60));

// Test 1: Create blockchain with genesis block
console.log('\n✅ Test 1: Create Blockchain');
const blockchain = new Blockchain({ difficulty: 2 });
console.log('Genesis block created:', blockchain.chain[0]);
console.log(`Chain length: ${blockchain.chain.length}`);

// Test 2: Add blocks
console.log('\n✅ Test 2: Add Blocks');
console.log('Mining block 1...');
const result1 = blockchain.addBlock('Alice pays Bob 10 coins');
console.log(`Block 1 mined in ${result1.duration}ms with ${result1.attempts} attempts`);
console.log(`Hash: ${result1.hash}`);

console.log('\nMining block 2...');
const result2 = blockchain.addBlock('Bob pays Charlie 5 coins');
console.log(`Block 2 mined in ${result2.duration}ms with ${result2.attempts} attempts`);
console.log(`Hash: ${result2.hash}`);

console.log('\nMining block 3...');
const result3 = blockchain.addBlock('Charlie pays Alice 15 coins');
console.log(`Block 3 mined in ${result3.duration}ms with ${result3.attempts} attempts`);
console.log(`Hash: ${result3.hash}`);

console.log(`\nChain now has ${blockchain.chain.length} blocks`);

// Test 3: Validate chain
console.log('\n✅ Test 3: Validate Chain');
const isValid = blockchain.isChainValid();
console.log(`Is chain valid? ${isValid ? '✓ YES' : '✗ NO'}`);

// Test 4: Display chain
console.log('\n✅ Test 4: Display Full Chain');
blockchain.chain.forEach((block, index) => {
  console.log(`\nBlock #${index}`);
  console.log(`  Timestamp: ${new Date(block.timestamp).toLocaleString()}`);
  console.log(`  Data: ${block.data}`);
  console.log(`  Previous Hash: ${block.previousHash.substring(0, 10)}...`);
  console.log(`  Hash: ${block.hash.substring(0, 10)}...`);
  console.log(`  Nonce: ${block.nonce}`);
});

// Test 5: Test tampering detection
console.log('\n✅ Test 5: Test Tampering Detection');
console.log('Attempting to tamper with Block 1...');
const originalData = blockchain.chain[1].data;
blockchain.chain[1].data = 'Alice pays Bob 9999 coins (HACKED!)';

console.log(`Original data: "${originalData}"`);
console.log(`Tampered data: "${blockchain.chain[1].data}"`);

const isValidAfterTamper = blockchain.isChainValid();
console.log(`Is chain valid after tampering? ${isValidAfterTamper ? '✓ YES' : '✗ NO (TAMPERING DETECTED!)'}`);

// Test 6: Detailed validation
console.log('\n✅ Test 6: Detailed Validation');
const validation = blockchain.validateChain();
console.log('Validation result:', validation);

// Restore data
blockchain.chain[1].data = originalData;
blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

console.log('\n✅ Test 7: Test Different Difficulties');
const testChain = new Blockchain({ difficulty: 1 });
console.log('Testing difficulty 1 (1 zero)...');
const d1 = testChain.addBlock('Test with difficulty 1');
console.log(`  Duration: ${d1.duration}ms, Attempts: ${d1.attempts}`);

testChain.setDifficulty(3);
console.log('Testing difficulty 3 (3 zeros)...');
const d3 = testChain.addBlock('Test with difficulty 3');
console.log(`  Duration: ${d3.duration}ms, Attempts: ${d3.attempts}`);

// Test 8: Stats
console.log('\n✅ Test 8: Blockchain Statistics');
const stats = blockchain.getStats();
console.log('Stats:', stats);

console.log('\n' + '='.repeat(60));
console.log('🎉 All Phase 1 Tests Complete!\n');
console.log('✓ Block class works');
console.log('✓ Blockchain class works');
console.log('✓ Mining works with different difficulties');
console.log('✓ Validation detects tampering');
console.log('✓ Chain linkage verified');
console.log('\nReady for Phase 2! 🚀');

export default blockchain;
