export function DecisionSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display-md text-display-md font-bold text-on-surface mb-4">Smart Decision Engine</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Not every dispute should be fought. RepresentAI provides a structured recommendation based on evidence strength.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-error/10 text-error flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">FIGHT</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Strong evidence supports contesting the dispute. The generated response package is ready for submission.
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">thumb_down</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">ACCEPT</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Evidence indicates the merchant should not fight the dispute, saving time and potential arbitration fees.
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">person_search</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">HUMAN REVIEW</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Evidence is incomplete or contradictory. The system flags it for human review rather than pretending certainty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenchmarkSection() {
  return (
    <section id="benchmark" className="py-24 bg-surface-container-lowest border-y border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display-md text-display-md font-bold text-on-surface mb-6">
            Don't just trust the AI.<br/>
            <span className="text-secondary">Measure it.</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            RepresentAI includes a built-in synthetic benchmark engine. We evaluate the AI against a dataset of 50 ground-truth dispute scenarios to measure accuracy, false positives, and evidence grounding.
          </p>
          <ul className="flex flex-col gap-4 font-label-md text-label-md text-on-surface mb-8">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">analytics</span> Decision Accuracy</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">fact_check</span> Evidence Grounding</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">rule</span> Human Review Rate</li>
          </ul>
        </div>
        
        <div className="bg-background border border-outline-variant rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant">
            <h3 className="font-headline-sm font-bold">Benchmark Methodology</h3>
            <span className="bg-surface-container-high px-3 py-1 rounded text-xs font-bold text-on-surface-variant uppercase tracking-wider">Live Evaluation</span>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-on-surface">FIGHT Accuracy</span>
                <span className="text-sm font-mono text-on-surface-variant">Evaluated dynamically</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full w-[85%] opacity-50"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-on-surface">ACCEPT Accuracy</span>
                <span className="text-sm font-mono text-on-surface-variant">Evaluated dynamically</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-2 rounded-full w-[92%] opacity-50"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-on-surface">Hallucination Rate</span>
                <span className="text-sm font-mono text-on-surface-variant">Evaluated dynamically</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div className="bg-[#10B981] h-2 rounded-full w-[100%] opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
