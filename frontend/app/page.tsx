"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDisputes } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisputes()
      .then(setDisputes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Disputes</h1>
          <p className="text-slate-500">Manage and investigate chargebacks.</p>
        </div>
        <button 
          onClick={() => alert("Simulation triggered (Endpoint integration pending)")}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
        >
          ▶ Run Demo
        </button>
      </header>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      ) : disputes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500">No active disputes.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {disputes.map((dispute) => {
            const hasInvestigation = dispute.investigations && dispute.investigations.length > 0;
            const investigationStatus = hasInvestigation ? dispute.investigations[0].status : null;
            
            return (
              <Link key={dispute.id} href={`/disputes/${dispute.id}`}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold shrink-0">
                      🔴
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{dispute.razorpay_dispute_id}</h3>
                      <div className="flex gap-4 text-sm text-slate-500">
                        <span>₹{(dispute.amount / 100).toLocaleString()}</span>
                        <span>•</span>
                        <span className="capitalize">{dispute.reason_code.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">
                        {investigationStatus === 'COMPLETED' ? 'Investigation Complete' : 
                         investigationStatus === 'IN_PROGRESS' ? 'Investigating...' : 'Requires Action'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Respond by {dispute.respond_by ? formatDistanceToNow(new Date(dispute.respond_by)) : 'Unknown'}
                      </p>
                    </div>
                    
                    <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {investigationStatus === 'COMPLETED' ? 'View Result' : 'Investigate'}
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}
