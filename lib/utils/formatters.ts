/**
 * Utility functions for formatting blockchain data for display
 */

/**
 * Truncates a hash string to a specified length with ellipsis
 * @param hash - The full hash string
 * @param length - Number of characters to show (default: 10)
 * @returns Truncated hash with "..." suffix
 * 
 * @example
 * truncateHash("00abc123def456", 10) // "00abc123de..."
 */
export function truncateHash(hash: string, length: number = 10): string {
  if (hash.length <= length) {
    return hash;
  }
  return `${hash.substring(0, length)}...`;
}

/**
 * Formats a timestamp into a human-readable date/time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string
 * 
 * @example
 * formatTimestamp(1645459200000) // "2/21/2022, 12:00:00 PM"
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Formats a timestamp into a short date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Short formatted date
 * 
 * @example
 * formatShortDate(1645459200000) // "Feb 21, 2022"
 */
export function formatShortDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Formats a timestamp into time only
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Time string
 * 
 * @example
 * formatTime(1645459200000) // "12:00:00 PM"
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

/**
 * Determines if a hash meets the difficulty requirement (starts with N zeros)
 * @param hash - The hash to check
 * @param difficulty - Number of leading zeros required
 * @returns True if hash is valid for difficulty level
 * 
 * @example
 * isValidHash("00abc123", 2) // true
 * isValidHash("0abc123", 2) // false
 */
export function isValidHash(hash: string, difficulty: number): boolean {
  const target = Array(difficulty + 1).join('0');
  return hash.startsWith(target);
}

/**
 * Gets a color class based on hash validity
 * @param hash - The hash to check
 * @param difficulty - Number of leading zeros required
 * @returns Tailwind color class
 */
export function getHashColor(hash: string, difficulty: number): string {
  return isValidHash(hash, difficulty) ? 'text-green-600' : 'text-red-600';
}
