"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDisputes } from "@/lib/api";

export default function Investigations() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisputes()
      .then(setDisputes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter only disputes that have investigations
  const investigations = disputes.filter(d => d.investigations && d.investigations.length > 0);
  
  const needsReviewCount = investigations.filter(d => d.investigations[0].decision === 'HUMAN_REVIEW').length;
  const inProgressCount = investigations.filter(d => d.investigations[0].status === 'IN_PROGRESS').length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-stack-xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display-md text-display-md font-bold text-on-surface mb-base">Investigations Console</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Live audit log of all AI reviews and manual interventions.</p>
        </div>
        <Link href="/dashboard">
          <button className="bg-primary text-on-primary font-label-md text-label-md px-stack-md py-stack-sm rounded hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Investigation
          </button>
        </Link>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface flex justify-between items-center">
          <h2 className="font-title-md text-title-md font-bold text-on-surface">Investigation Queue</h2>
          <div className="flex gap-2">
             {needsReviewCount > 0 && <span className="bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20 font-label-sm text-label-sm px-2 py-1 rounded">{needsReviewCount} Needs Review</span>}
             {inProgressCount > 0 && <span className="bg-secondary/10 text-secondary border border-secondary/20 font-label-sm text-label-sm px-2 py-1 rounded">{inProgressCount} In Progress</span>}
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-stack-sm px-stack-lg font-medium">Dispute ID</th>
                <th className="py-stack-sm px-stack-md font-medium">Date</th>
                <th className="py-stack-sm px-stack-md font-medium">Status</th>
                <th className="py-stack-sm px-stack-md font-medium">AI Decision</th>
                <th className="py-stack-sm px-stack-lg font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant">Loading investigations...</td></tr>
              ) : investigations.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant">No investigations have been started yet.</td></tr>
              ) : (
                investigations.map(dispute => {
                  const inv = dispute.investigations[0];
                  
                  return (
                    <tr key={dispute.id} className="border-b border-outline-variant hover:bg-surface-bright transition-colors group">
                      <td className="py-stack-md px-stack-lg font-label-md text-on-surface">
                        {dispute.razorpay_dispute_id}
                      </td>
                      <td className="py-stack-md px-stack-md font-medium text-on-surface-variant">
                        {new Date(inv.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-stack-md px-stack-md">
                        {inv.status === 'COMPLETED' ? (
                          <span className="text-[#166534] font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">verified</span> COMPLETED
                          </span>
                        ) : inv.status === 'FAILED' ? (
                          <span className="text-error font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">error</span> FAILED
                          </span>
                        ) : (
                          <span className="text-[#d97706] font-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span> IN PROGRESS
                          </span>
                        )}
                      </td>
                      <td className="py-stack-md px-stack-md">
                        {inv.decision === 'FIGHT' ? (
                          <span className="text-[#166534] font-label-sm font-bold">FIGHT</span>
                        ) : inv.decision === 'ACCEPT' ? (
                          <span className="text-on-surface font-label-sm font-bold">ACCEPT</span>
                        ) : inv.decision === 'HUMAN_REVIEW' ? (
                          <span className="text-[#d97706] font-label-sm font-bold">HUMAN REVIEW</span>
                        ) : (
                          <span className="text-on-surface-variant font-label-sm italic">Pending...</span>
                        )}
                      </td>
                      <td className="py-stack-md px-stack-lg text-right">
                        <Link href={`/disputes/${dispute.id}`}>
                          <button className={`font-label-md text-label-md px-stack-md py-base rounded transition-colors border border-outline-variant text-on-surface hover:bg-surface-container-low`}>
                            View Forensic Canvas
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
