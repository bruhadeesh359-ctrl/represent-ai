"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDisputes, getBenchmarks } from "@/lib/api";

export default function Dashboard() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisputes()
      .then(setDisputes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Helper to get the latest investigation reliably
  const getLatestInv = (d: any) => {
    if (!d.investigations || d.investigations.length === 0) return null;
    return [...d.investigations].sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())[0];
  };

  // --- Financial Calculations ---
  const totalAmount = disputes.reduce((sum, d) => sum + (d.amount || 0), 0) / 100;
  
  const amountFight = disputes.filter(d => {
    const inv = getLatestInv(d);
    return inv?.status === 'COMPLETED' && inv.decision === 'FIGHT';
  }).reduce((sum, d) => sum + (d.amount || 0), 0) / 100;

  const amountAccept = disputes.filter(d => {
    const inv = getLatestInv(d);
    return inv?.status === 'COMPLETED' && inv.decision === 'ACCEPT';
  }).reduce((sum, d) => sum + (d.amount || 0), 0) / 100;

  const amountReview = disputes.filter(d => {
    const inv = getLatestInv(d);
    return inv?.status === 'COMPLETED' && inv.decision === 'HUMAN_REVIEW';
  }).reduce((sum, d) => sum + (d.amount || 0), 0) / 100;

  const amountPending = disputes.filter(d => {
    const inv = getLatestInv(d);
    return !inv || inv.status !== 'COMPLETED';
  }).reduce((sum, d) => sum + (d.amount || 0), 0) / 100;

  // --- Segregate Disputes ---
  const attentionRequired = disputes.filter(d => {
    const inv = getLatestInv(d);
    return !inv || (inv.status === 'COMPLETED' && inv.decision === 'HUMAN_REVIEW');
  }).sort((a, b) => b.amount - a.amount);

  const completedDisputes = disputes.filter(d => {
    const inv = getLatestInv(d);
    return inv?.status === 'COMPLETED' && inv.decision !== 'HUMAN_REVIEW';
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-stack-xl">
      
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display-md text-display-md font-bold text-on-surface mb-base">Command Center</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Live operational dispute intelligence.</p>
        </div>
      </div>

      {/* Financial Exposure Strip */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface">
          <h2 className="font-title-sm text-title-sm font-bold text-on-surface uppercase tracking-wider text-on-surface-variant">Financial Exposure</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="p-stack-lg relative overflow-hidden group">
            <div className="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant"></span> Total Exposure
            </div>
            <div className="font-display-md text-display-md text-on-surface">
              ₹{(totalAmount / 100000).toFixed(2)}L
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-surface-variant"></div>
          </div>
          
          <div className="p-stack-lg relative overflow-hidden group">
            <div className="font-label-sm text-label-sm text-[#166534] mb-stack-sm uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#166534]"></span> Recommend Fight
            </div>
            <div className="font-display-md text-display-md text-on-surface">
              ₹{(amountFight / 100000).toFixed(2)}L
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#166534] opacity-20"></div>
          </div>

          <div className="p-stack-lg relative overflow-hidden group">
            <div className="font-label-sm text-label-sm text-[#d97706] mb-stack-sm uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d97706]"></span> Accept / Review
            </div>
            <div className="font-display-md text-display-md text-on-surface">
              ₹{((amountAccept + amountReview) / 100000).toFixed(2)}L
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#d97706] opacity-20"></div>
          </div>

          <div className="p-stack-lg relative overflow-hidden group">
            <div className="font-label-sm text-label-sm text-secondary mb-stack-sm uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> Investigation Pending
            </div>
            <div className="font-display-md text-display-md text-on-surface">
              ₹{(amountPending / 100000).toFixed(2)}L
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Attention Required Section */}
      <div className="bg-surface-container-lowest border border-error rounded-xl overflow-hidden shadow-[0_0_15px_rgba(186,26,26,0.05)]">
        <div className="px-stack-lg py-stack-md border-b border-error bg-[#ffeed9]">
          <h2 className="font-title-md text-title-md font-bold text-[#ba1a1a] flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            ATTENTION REQUIRED
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-stack-sm px-stack-lg font-medium">Dispute ID</th>
                <th className="py-stack-sm px-stack-md font-medium">Amount</th>
                <th className="py-stack-sm px-stack-md font-medium">Status / Recommendation</th>
                <th className="py-stack-sm px-stack-lg font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              {loading ? (
                <tr><td colSpan={4} className="py-10 text-center text-on-surface-variant">Scanning disputes...</td></tr>
              ) : attentionRequired.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-[#166534] font-medium">No urgent disputes requiring attention.</td></tr>
              ) : (
                attentionRequired.map(dispute => {
                  const hasInvestigation = dispute.investigations && dispute.investigations.length > 0;
                  const invStatus = hasInvestigation ? dispute.investigations[0].status : null;
                  const decision = hasInvestigation ? dispute.investigations[0].decision : null;

                  return (
                    <tr key={dispute.id} className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                      <td className="py-stack-md px-stack-lg font-label-md text-on-surface">{dispute.razorpay_dispute_id}</td>
                      <td className="py-stack-md px-stack-md font-medium">₹{(dispute.amount / 100).toLocaleString()}</td>
                      <td className="py-stack-md px-stack-md">
                        {!hasInvestigation ? (
                          <span className="text-secondary font-label-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">pending</span> Investigation Required
                          </span>
                        ) : decision === 'HUMAN_REVIEW' ? (
                          <span className="text-[#d97706] font-label-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">person_search</span> Human Review Needed
                          </span>
                        ) : (
                          <span>{invStatus}</span>
                        )}
                      </td>
                      <td className="py-stack-md px-stack-lg text-right">
                        <Link href={`/disputes/${dispute.id}`}>
                          <button className="font-label-md text-label-md bg-primary text-on-primary px-stack-md py-base rounded hover:opacity-90 transition-opacity">
                            {hasInvestigation ? "Review Decision" : "Start Investigation"}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Disputes Queue */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
          <h2 className="font-title-md text-title-md font-bold text-on-surface">Dispute Queue</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-inline-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input className="pl-container-margin pr-stack-md py-stack-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-64 placeholder:text-on-surface-variant" placeholder="Search dispute ID..." type="text"/>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-stack-sm px-stack-lg font-medium">Dispute ID</th>
                <th className="py-stack-sm px-stack-md font-medium">Amount</th>
                <th className="py-stack-sm px-stack-md font-medium">Reason</th>
                <th className="py-stack-sm px-stack-md font-medium">AI Readiness</th>
                <th className="py-stack-sm px-stack-lg font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant">Loading queue...</td></tr>
              ) : disputes.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant">No active disputes found.</td></tr>
              ) : (
                disputes.map(dispute => {
                  const hasInvestigation = dispute.investigations && dispute.investigations.length > 0;
                  const invStatus = hasInvestigation ? dispute.investigations[0].status : null;
                  const decision = hasInvestigation ? dispute.investigations[0].decision : null;
                  
                  return (
                    <tr key={dispute.id} className="border-b border-outline-variant hover:bg-surface-bright transition-colors group">
                      <td className="py-stack-md px-stack-lg font-label-md text-on-surface">
                        {dispute.razorpay_dispute_id}
                      </td>
                      <td className="py-stack-md px-stack-md font-medium">₹{(dispute.amount / 100).toLocaleString()}</td>
                      <td className="py-stack-md px-stack-md capitalize text-on-surface-variant">{dispute.reason_code.replace(/_/g, ' ')}</td>
                      <td className="py-stack-md px-stack-md">
                        {invStatus === 'COMPLETED' ? (
                          <span className="text-[#166534] font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">verified</span> RESOLVED
                          </span>
                        ) : invStatus === 'IN_PROGRESS' ? (
                          <span className="text-[#d97706] font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span> INVESTIGATING
                          </span>
                        ) : (
                          <span className="text-secondary font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">pending</span> READY FOR AI
                          </span>
                        )}
                      </td>
                      <td className="py-stack-md px-stack-lg text-right">
                        <Link href={`/disputes/${dispute.id}`}>
                          <button className={`font-label-md text-label-md px-stack-md py-base rounded transition-colors ${invStatus === 'COMPLETED' ? 'border border-outline-variant text-on-surface hover:bg-surface-container-low' : 'bg-primary text-on-primary hover:opacity-90'}`}>
                            {invStatus === 'COMPLETED' ? 'View Report' : 'Investigate'}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
