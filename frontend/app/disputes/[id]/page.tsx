"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getDispute, startInvestigation, generatePdf, submitResponse } from "@/lib/api";

export default function DisputeDetail() {
  const params = useParams();
  const disputeId = params.id as string;
  
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investigating, setInvestigating] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDispute = async () => {
    try {
      const data = await getDispute(disputeId);
      setDispute(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load dispute data from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispute();
  }, [disputeId]);

  // Simulate visual progress pipeline while backend does its work
  useEffect(() => {
    let interval: any;
    if (investigating) {
      setProcessingStage(1);
      let stage = 1;
      interval = setInterval(() => {
        stage += 1;
        if (stage <= 5) {
          setProcessingStage(stage);
        }
      }, 1500); // Progress visually every 1.5s
    } else {
      setProcessingStage(0);
    }
    return () => clearInterval(interval);
  }, [investigating]);

  const handleInvestigate = async () => {
    setInvestigating(true);
    setError(null);
    try {
      await startInvestigation(disputeId);
      await fetchDispute();
    } catch (e) {
      console.error(e);
      setError("Investigation API failed. Ensure backend and Gemini are reachable.");
    } finally {
      setInvestigating(false);
    }
  };

  const handleGeneratePdf = async (invId: string) => {
    try {
      await generatePdf(invId);
      const blob = await import("@/lib/api").then(m => m.downloadPdf(invId));
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RepresentAI_Dispute_${disputeId}_Evidence_Package.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      setPdfPath(`RepresentAI_Dispute_${disputeId}_Evidence_Package.pdf`);
    } catch(e) {
      console.error(e);
      setError("Failed to download PDF. Check backend logs.");
    }
  };
  
  const handleSubmit = async (invId: string) => {
    try {
      await submitResponse(invId);
      await fetchDispute();
    } catch (e) {
      console.error(e);
      setError("Failed to submit payload to simulated Razorpay endpoint.");
    }
  }

  if (loading) return <div className="p-10 font-label-md text-label-md text-on-surface-variant flex items-center justify-center h-full"><span className="material-symbols-outlined animate-spin mr-2">sync</span> Loading forensic canvas...</div>;
  if (!dispute) return (
    <div className="p-10 font-label-md text-label-md text-error bg-error-container p-4 rounded">
      {error || "Dispute not found."}
    </div>
  );

  const investigation = dispute.investigations && dispute.investigations.length > 0 
    ? dispute.investigations[0] 
    : null;

  const invStatus = investigation ? investigation.status : 'PENDING';
  const isProcessing = investigating || invStatus === 'IN_PROGRESS';
  const isCompleted = invStatus === 'COMPLETED';
  const evidence = investigation?.evidence || [];
  const verifiedCount = evidence.filter((e: any) => e.verified === true).length;
  const decision = investigation?.decision;
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-stack-xl">
      {error && (
        <div className="mb-stack-md bg-error-container text-on-error-container px-stack-md py-stack-sm rounded-lg flex items-center justify-between border border-[#ffb4ab]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span className="font-label-md text-label-md">{error}</span>
          </div>
          <button onClick={() => setError(null)}><span className="material-symbols-outlined text-[16px]">close</span></button>
        </div>
      )}

      {pdfPath && (
        <div className="mb-stack-md bg-[#166534]/10 text-[#166534] px-stack-md py-stack-sm rounded-lg flex items-center justify-between border border-[#166534]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">task</span>
            <span className="font-label-md text-label-md">Evidence package compiled and downloaded successfully.</span>
          </div>
          <button onClick={() => setPdfPath(null)}><span className="material-symbols-outlined text-[16px]">close</span></button>
        </div>
      )}

      {/* Forensic Header */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px] mr-1">arrow_back</span> Return to Command Center
            </Link>
            <h1 className="font-display-md text-display-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-on-surface-variant">account_balance_wallet</span>
              Dispute: {dispute.razorpay_dispute_id}
            </h1>
          </div>
          <div className="text-right">
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Disputed Amount</div>
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">₹{(dispute.amount / 100).toLocaleString()}</div>
          </div>
        </div>
        <div className="px-stack-lg py-stack-md bg-surface-container-lowest flex items-center justify-between">
          <div className="flex gap-stack-lg">
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Reason Code</div>
              <div className="font-body-md text-body-md text-on-surface capitalize font-medium">{dispute.reason_code.replace(/_/g, ' ')}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Response Deadline</div>
              <div className="font-body-md text-body-md text-error font-medium">In 7 Days (Demo)</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Payment ID</div>
              <div className="font-body-md text-body-md text-on-surface font-medium">{dispute.payment_id}</div>
            </div>
          </div>
          
          {/* Action Button */}
          {!isCompleted && !isProcessing && (
            <button 
              onClick={handleInvestigate}
              className="bg-primary text-on-primary font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
              START AI INVESTIGATION
            </button>
          )}
          {isProcessing && (
             <button disabled className="bg-secondary text-on-primary font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(49,107,243,0.3)]">
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              INVESTIGATION IN PROGRESS
            </button>
          )}
          {isCompleted && (
            <div className="bg-[#166534]/10 text-[#166534] font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg flex items-center gap-2 border border-[#166534]/20">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              INVESTIGATION COMPLETED
            </div>
          )}
        </div>
      </div>

      {/* Forensic Pipeline Visualizer (Active during processing) */}
      {(isProcessing || isCompleted) && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <h2 className="font-title-sm text-title-sm font-bold text-on-surface uppercase tracking-wider mb-stack-lg text-on-surface-variant">Forensic Pipeline Activity</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-outline-variant z-0"></div>
            
            {[
              { num: 1, title: "Payment Context", icon: "payments" },
              { num: 2, title: "Order Retrieval", icon: "inventory_2" },
              { num: 3, title: "Shipping Verif.", icon: "local_shipping" },
              { num: 4, title: "Gemini Reasoning", icon: "psychology" },
              { num: 5, title: "Deterministic Validation", icon: "rule" },
            ].map((step, idx) => {
              const isDone = isCompleted || processingStage > step.num;
              const isActive = processingStage === step.num && isProcessing;
              return (
                <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-2 bg-surface-container-lowest md:px-2 w-full md:w-32 mb-4 md:mb-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${isDone ? 'bg-[#166534] border-[#166534] text-white' : isActive ? 'bg-secondary border-secondary text-white shadow-[0_0_15px_rgba(49,107,243,0.4)]' : 'bg-surface-container-low border-outline-variant text-on-surface-variant'}`}>
                    {isActive ? (
                       <span className="material-symbols-outlined text-[24px] animate-pulse">{step.icon}</span>
                    ) : (
                       <span className="material-symbols-outlined text-[24px]">{isDone ? 'check' : step.icon}</span>
                    )}
                  </div>
                  <div>
                    <div className={`font-label-sm text-label-sm font-bold ${isActive ? 'text-secondary' : isDone ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.title}</div>
                    <div className="font-body-xs text-[10px] text-on-surface-variant uppercase mt-1">
                      {isDone ? 'VERIFIED' : isActive ? 'EXECUTING...' : 'PENDING'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Post-Investigation Layout */}
      {isCompleted && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
            {/* The Decision Panel */}
            <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface-bright">
                <h2 className="font-title-sm text-title-sm font-bold text-on-surface uppercase tracking-wider text-on-surface-variant">RepresentAI Decision</h2>
              </div>
              <div className="p-stack-lg flex-1 flex flex-col justify-between">
                <div>
                  <div className={`inline-flex items-center gap-2 px-stack-md py-stack-sm rounded-lg font-headline-md text-headline-md font-bold text-white shadow-md mb-stack-lg w-full justify-center ${decision === 'FIGHT' ? 'bg-[#166534]' : decision === 'ACCEPT' ? 'bg-[#d97706]' : 'bg-secondary'}`}>
                    <span className="material-symbols-outlined text-[24px]">gavel</span>
                    RECOMMEND {decision}
                  </div>
                  
                  <div className="mb-stack-lg">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface mb-stack-sm">Evidence Strength</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-display-md font-bold text-on-surface">{(verifiedCount / evidence.length * 100).toFixed(0)}%</div>
                      <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-[#166534] h-full" style={{ width: `${(verifiedCount / evidence.length * 100)}%`}}></div>
                      </div>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">{verifiedCount} of {evidence.length} claims deterministically verified.</div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-stack-md rounded-lg border border-outline-variant">
                  <h3 className="font-label-md text-label-md font-bold text-on-surface mb-stack-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">psychology</span> Why This Decision?
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic leading-relaxed">
                    "{investigation.reasoning_summary}"
                  </p>
                </div>
              </div>
            </div>

            {/* Evidence Ledger */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
                <h2 className="font-title-sm text-title-sm font-bold text-on-surface uppercase tracking-wider text-on-surface-variant">Immutable Evidence Ledger</h2>
                <div className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                   <span className="material-symbols-outlined text-[14px]">lock</span> Data Grounded
                </div>
              </div>
              <div className="overflow-x-auto flex-1 bg-surface-container-lowest">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <tr>
                      <th className="py-stack-sm px-stack-lg font-medium border-b border-outline-variant w-1/3">AI Claim</th>
                      <th className="py-stack-sm px-stack-md font-medium border-b border-outline-variant">Source Node</th>
                      <th className="py-stack-sm px-stack-md font-medium border-b border-outline-variant w-1/3">Retrieved Value</th>
                      <th className="py-stack-sm px-stack-lg font-medium border-b border-outline-variant text-right">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm">
                    {evidence.map((ev: any, idx: number) => (
                      <tr key={idx} className="border-b border-outline-variant/30 hover:bg-surface-bright transition-colors">
                        <td className="py-stack-md px-stack-lg font-medium text-on-surface">{ev.claim}</td>
                        <td className="py-stack-md px-stack-md">
                          <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded text-[10px] font-label-md uppercase tracking-wider border border-outline-variant">
                            {ev.source}
                          </span>
                        </td>
                        <td className="py-stack-md px-stack-md font-mono text-xs text-on-surface-variant bg-surface-container-lowest m-2 rounded p-2 border border-surface-variant">
                          {ev.value}
                        </td>
                        <td className="py-stack-md px-stack-lg text-right">
                          {ev.verified === true ? (
                            <span className="text-[#166534] font-label-sm flex items-center justify-end gap-1">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span> VERIFIED
                            </span>
                          ) : (
                            <span className="text-[#ba1a1a] font-label-sm flex items-center justify-end gap-1">
                              <span className="material-symbols-outlined text-[16px]">cancel</span> REJECTED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Evidence Package Submissions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between p-stack-lg mt-stack-xl">
            <div className="mb-stack-md md:mb-0">
              <h2 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[24px]">folder_special</span>
                Evidence Package Ready
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Professional PDF containing all verified claims and formatting required by the issuer.</p>
            </div>
            <div className="flex items-center gap-stack-md">
              <button 
                onClick={() => handleGeneratePdf(investigation.id)}
                className="border border-outline-variant text-on-surface font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                PREVIEW PDF
              </button>
              {dispute.status === 'under_review' ? (
                <button 
                  disabled
                  className="bg-[#166534] text-white font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg flex items-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  SUBMITTED SUCCESSFULLY
                </button>
              ) : (
                <button 
                  onClick={() => handleSubmit(investigation.id)}
                  className="bg-primary text-on-primary font-label-md text-label-md px-stack-lg py-stack-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  SUBMIT TO BANK (SIMULATION)
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
