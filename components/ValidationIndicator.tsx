interface ValidationIndicatorProps {
  isValid: boolean;
  blockCount: number;
}

/**
 * ValidationIndicator Component
 * 
 * Large, prominent display showing chain validity status.
 * Updates automatically when chain changes.
 * 
 * Requirements:
 * - Green background with checkmark when valid
 * - Red background with X when invalid
 * - Clear, easy-to-read status
 */
export default function ValidationIndicator({ isValid, blockCount }: ValidationIndicatorProps) {
  return (
    <div
      className={`
        rounded-lg p-6 shadow-lg border-2 transition-all duration-300
        ${isValid 
          ? 'bg-green-50 border-green-400' 
          : 'bg-red-50 border-red-400'
        }
      `}
    >
      <div className="flex items-center justify-between">
        {/* Status Icon and Text */}
        <div className="flex items-center gap-4">
          {isValid ? (
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          
          <div>
            <h2
              className={`
                text-3xl font-bold
                ${isValid ? 'text-green-700' : 'text-red-700'}
              `}
            >
              {isValid ? '✓ CHAIN VALID' : '✗ CHAIN INVALID'}
            </h2>
            <p className={`text-sm mt-1 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
              {isValid
                ? `All ${blockCount} blocks are properly linked and verified`
                : 'One or more blocks have been tampered with'
              }
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-right">
          <div className={`text-sm font-semibold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
            Integrity Check
          </div>
          <div className={`text-xs mt-1 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            {isValid ? 'No tampering detected' : 'Tampering detected!'}
          </div>
        </div>
      </div>

      {/* Warning Message for Invalid Chain */}
      {!isValid && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-800">
            <strong>⚠️ Security Alert:</strong> The blockchain has been compromised. 
            One or more blocks have invalid hashes or broken links.
          </p>
        </div>
      )}
    </div>
  );
}
