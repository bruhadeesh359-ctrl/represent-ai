export function TrustStrip() {
  return (
    <div className="border-y border-outline-variant bg-surface-container-lowest py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-6 opacity-70">
        <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface">
          <span className="material-symbols-outlined text-[20px]">account_tree</span>
          Built for payment dispute workflows
        </div>
        <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface">
          <span className="material-symbols-outlined text-[20px]">gavel</span>
          Evidence-grounded AI
        </div>
        <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface">
          <span className="material-symbols-outlined text-[20px]">verified</span>
          Deterministic validation
        </div>
        <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface">
          <span className="material-symbols-outlined text-[20px]">shield_person</span>
          Human approval before submission
        </div>
      </div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section id="product" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <h2 className="font-display-md text-display-md font-bold text-on-surface mb-6">
            A chargeback isn't just a payment problem.<br/>
            <span className="text-secondary">It's an evidence problem.</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Merchants lose millions to friendly fraud because gathering evidence across fragmented systems takes hours. RepresentAI connects the dots automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Workflow */}
          <div className="bg-surface-container-low border border-error/20 rounded-xl p-8 opacity-70">
            <h3 className="font-headline-sm text-headline-sm font-bold text-error mb-8">Manual Investigation</h3>
            <ul className="flex flex-col gap-6 font-body-md text-body-md text-on-surface-variant">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <div>
                  <strong className="text-on-surface block mb-1">Fragmented systems</strong>
                  Jumping between Razorpay, Shopify, shipping dashboards, and CRM to find data.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <div>
                  <strong className="text-on-surface block mb-1">Hours of manual work</strong>
                  Manually taking screenshots and compiling PDFs for a single dispute.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <div>
                  <strong className="text-on-surface block mb-1">Inconsistent evidence</strong>
                  Human error leads to missed details and weak representment packages.
                </div>
              </li>
            </ul>
          </div>

          {/* RepresentAI Workflow */}
          <div className="bg-[#0A101C] border border-primary/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-8 relative z-10">RepresentAI</h3>
            <ul className="flex flex-col gap-6 font-body-md text-body-md text-[#94A3B8] relative z-10">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <strong className="text-white block mb-1">Automated investigation</strong>
                  The agent retrieves data directly from all connected merchant systems.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <strong className="text-white block mb-1">Evidence validation</strong>
                  Every generated claim is deterministically verified against the source data.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <strong className="text-white block mb-1">Structured response</strong>
                  A professional, evidence-backed PDF is instantly generated for review.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
