export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface-container-lowest border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-display-md text-display-md font-bold text-on-surface mb-4">How RepresentAI Works</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            From detection to response, turning a fragmented dispute process into a single, automated workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Detect",
              desc: "A chargeback dispute enters the merchant workflow from the payment gateway.",
              icon: "sensors"
            },
            {
              step: "02",
              title: "Investigate",
              desc: "The agent retrieves relevant payment, order, shipping, and customer evidence.",
              icon: "troubleshoot"
            },
            {
              step: "03",
              title: "Verify",
              desc: "Every generated claim is checked against retrieved source data deterministically.",
              icon: "fact_check"
            },
            {
              step: "04",
              title: "Respond",
              desc: "The merchant reviews the generated evidence package and decides whether to proceed.",
              icon: "send"
            }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="text-[120px] font-black text-outline/10 leading-none absolute -top-12 -left-4 z-0 transition-transform group-hover:-translate-y-2">
                {item.step}
              </div>
              <div className="relative z-10 pt-8">
                <div className="w-12 h-12 rounded bg-surface-container-low border border-outline-variant flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EvidenceValidation() {
  return (
    <section id="evidence" className="py-24 bg-[#0A101C] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="font-display-md text-display-md font-bold text-white mb-6">
            AI can reason.<br/>
            <span className="text-primary">Evidence has to prove it.</span>
          </h2>
          <p className="font-body-lg text-body-lg text-[#94A3B8]">
            RepresentAI does not blindly trust generated claims. Every claim must be grounded in retrieved evidence before entering the response package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Supported Claim */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-8 flex flex-col gap-6 font-mono text-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-50"></div>
            
            <div>
              <div className="text-[#64748B] mb-2 uppercase tracking-wider text-xs">AI CLAIM</div>
              <div className="text-white bg-[#1E293B]/50 p-4 rounded border border-[#1E293B]">
                "Order was successfully delivered."
              </div>
            </div>

            <div className="flex justify-center text-[#38BDF8]">
              <span className="material-symbols-outlined">arrow_downward</span>
            </div>

            <div>
              <div className="text-[#64748B] mb-2 uppercase tracking-wider text-xs">SOURCE DATA: Shipping System</div>
              <div className="text-[#94A3B8] bg-[#1E293B]/50 p-4 rounded border border-[#1E293B]">
                <span className="text-[#38BDF8]">status:</span> "delivered"<br/>
                <span className="text-[#38BDF8]">delivered_at:</span> "2026-08-24T14:30:00Z"
              </div>
            </div>

            <div className="flex justify-center text-[#38BDF8]">
              <span className="material-symbols-outlined">arrow_downward</span>
            </div>

            <div className="flex items-center gap-3 bg-[#10B981]/10 text-[#10B981] p-4 rounded border border-[#10B981]/20">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="font-bold tracking-widest uppercase">Claim Supported</span>
            </div>
          </div>

          {/* Unsupported Claim */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-8 flex flex-col gap-6 font-mono text-sm relative opacity-75">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EF4444] to-transparent opacity-50"></div>
            
            <div>
              <div className="text-[#64748B] mb-2 uppercase tracking-wider text-xs">AI CLAIM</div>
              <div className="text-white bg-[#1E293B]/50 p-4 rounded border border-[#1E293B]">
                "Customer IP matched."
              </div>
            </div>

            <div className="flex justify-center text-[#38BDF8]">
              <span className="material-symbols-outlined">arrow_downward</span>
            </div>

            <div>
              <div className="text-[#64748B] mb-2 uppercase tracking-wider text-xs">SOURCE DATA</div>
              <div className="text-[#94A3B8] bg-[#1E293B]/50 p-4 rounded border border-[#1E293B] italic">
                No available evidence
              </div>
            </div>

            <div className="flex justify-center text-[#38BDF8]">
              <span className="material-symbols-outlined">arrow_downward</span>
            </div>

            <div className="flex items-center gap-3 bg-[#EF4444]/10 text-[#EF4444] p-4 rounded border border-[#EF4444]/20">
              <span className="material-symbols-outlined">cancel</span>
              <span className="font-bold tracking-widest uppercase">Claim Unsupported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
