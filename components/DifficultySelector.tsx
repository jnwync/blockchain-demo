interface DifficultySelectorProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
  disabled?: boolean;
}

/**
 * DifficultySelector Component
 * 
 * Allows user to select mining difficulty from 1-4.
 * Higher difficulty = more leading zeros required = longer mining time.
 * 
 * Difficulty levels:
 * - 1: Hash must start with "0" (easiest, ~ms)
 * - 2: Hash must start with "00" (easy, ~10ms)
 * - 3: Hash must start with "000" (medium, ~100ms)
 * - 4: Hash must start with "0000" (hard, ~1-2s)
 */
export default function DifficultySelector({ 
  difficulty, 
  onDifficultyChange, 
  disabled = false 
}: DifficultySelectorProps) {
  const levels = [
    { value: 1, label: '1', desc: 'Easy', time: '~ms', zeros: '0...' },
    { value: 2, label: '2', desc: 'Normal', time: '~10ms', zeros: '00...' },
    { value: 3, label: '3', desc: 'Hard', time: '~100ms', zeros: '000...' },
    { value: 4, label: '4', desc: 'Very Hard', time: '~1-2s', zeros: '0000...' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Mining Difficulty
        </h3>
        <p className="text-sm text-gray-600">
          Higher difficulty requires more computational work to mine blocks
        </p>
      </div>

      {/* Difficulty Buttons */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => !disabled && onDifficultyChange(level.value)}
            disabled={disabled}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              ${difficulty === level.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
              }
              ${disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
              }
            `}
          >
            {/* Selected Indicator */}
            {difficulty === level.value && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            
            {/* Level Number */}
            <div className={`
              text-3xl font-bold mb-1
              ${difficulty === level.value ? 'text-blue-600' : 'text-gray-700'}
            `}>
              {level.label}
            </div>
            
            {/* Description */}
            <div className={`
              text-xs font-semibold
              ${difficulty === level.value ? 'text-blue-600' : 'text-gray-600'}
            `}>
              {level.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Current Difficulty Info */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-700 font-semibold">Current: </span>
            <span className="text-blue-700 font-bold">Level {difficulty}</span>
          </div>
          <div className="text-right">
            <div className="text-gray-600">Required Hash:</div>
            <code className="text-blue-600 font-mono font-bold">
              {levels[difficulty - 1].zeros}
            </code>
          </div>
          <div className="text-right">
            <div className="text-gray-600">Est. Time:</div>
            <div className="text-blue-700 font-semibold">
              {levels[difficulty - 1].time}
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>💡 Tip:</strong> Difficulty determines how many leading zeros are required in the block hash. 
          Each additional zero makes mining approximately 16× harder!
        </p>
      </div>
    </div>
  );
}
