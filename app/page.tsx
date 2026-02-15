export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Blockchain Visualizer
          </h1>
          <p className="text-gray-600">
            Watch how blockchain works in real-time
          </p>
        </header>

        <main>
          {/* TODO: Add components here as we build them:
              - ValidationIndicator (Phase 6)
              - DifficultySelector (Phase 6)
              - MiningForm (Phase 6)
              - BlockChainView (Phase 4)
              - TransactionLedger (Phase 8 - bonus)
          */}
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Blockchain components will be added in the next phases
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
