import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -ml-96 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -mr-48 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Copy */}
        <div className="flex flex-col gap-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Now investigating live disputes</span>
          </div>
          
          <h1 className="font-display-lg text-[48px] lg:text-[64px] font-bold text-on-surface leading-[1.1] tracking-tight">
            Turn chargebacks into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">evidence.</span>
          </h1>
          
          <p className="font-body-lg text-[20px] text-on-surface-variant leading-relaxed">
            RepresentAI investigates disputes across payment, order, shipping, and customer systems, verifies every claim against retrieved evidence, and prepares a response package for merchant review.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/login" className="bg-primary text-on-primary px-6 py-3 rounded border border-transparent font-label-lg text-label-lg hover:bg-primary/90 transition-colors shadow-sm">
              Get Started
            </Link>
            <Link href="#how-it-works" className="bg-surface-container-lowest text-on-surface px-6 py-3 rounded border border-outline-variant font-label-lg text-label-lg hover:bg-surface-container-low transition-colors shadow-sm">
              See How It Works
            </Link>
          </div>
        </div>

        {/* Right UI Visualization */}
        <div className="relative w-full h-[540px] perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl blur-xl transform translate-y-8"></div>
          
          <div className="absolute inset-0 bg-[#0A101C] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-[13px] text-[#94A3B8]">
            {/* Window Header */}
            <div className="h-10 bg-[#0F172A] border-b border-[#1E293B] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <div className="ml-4 font-mono text-[11px] text-[#64748B]">investigation_pipeline.log</div>
            </div>

            {/* Visual Output */}
            <div className="p-6 flex flex-col gap-6 overflow-hidden">
              <div>
                <div className="text-white font-bold mb-2">CHARGEBACK RECEIVED</div>
                <div className="flex justify-between border-b border-[#1E293B] pb-2">
                  <span className="text-[#F1F5F9]">₹50,000</span>
                  <span className="text-[#38BDF8]">Dispute #disp_8F21</span>
                </div>
              </div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-px h-4 bg-[#1E293B]"></div>
                <span className="material-symbols-outlined text-[16px] my-1">arrow_downward</span>
                <div className="w-px h-4 bg-[#1E293B]"></div>
              </div>

              <div>
                <div className="text-[#38BDF8] font-bold mb-2 animate-pulse">INVESTIGATING...</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2"><span className="text-[#10B981]">✓</span> Payment</div>
                  <div className="flex items-center gap-2"><span className="text-[#10B981]">✓</span> Order</div>
                  <div className="flex items-center gap-2"><span className="text-[#10B981]">✓</span> Shipping</div>
                  <div className="flex items-center gap-2"><span className="text-[#10B981]">✓</span> Comm Log</div>
                </div>
              </div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-px h-4 bg-[#1E293B]"></div>
                <span className="material-symbols-outlined text-[16px] my-1">arrow_downward</span>
                <div className="w-px h-4 bg-[#1E293B]"></div>
              </div>

              <div>
                <div className="text-white font-bold mb-2">EVIDENCE VALIDATED</div>
                <div className="bg-[#0F172A] rounded border border-[#1E293B] p-3 flex justify-between">
                  <div><span className="text-[#10B981] font-bold">18</span> verified</div>
                  <div><span className="text-[#F59E0B] font-bold">2</span> unavailable</div>
                  <div><span className="text-white font-bold">0</span> hallucinated</div>
                </div>
              </div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-px h-4 bg-[#1E293B]"></div>
                <span className="material-symbols-outlined text-[16px] my-1">arrow_downward</span>
                <div className="w-px h-4 bg-[#1E293B]"></div>
              </div>

              <div>
                <div className="text-white font-bold mb-2">RECOMMENDATION</div>
                <div className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-4 py-2 rounded font-bold tracking-widest text-center">
                  FIGHT
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
