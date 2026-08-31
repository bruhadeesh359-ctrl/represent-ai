"use client";

import Link from "next/link";

export default function Overview() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-stack-xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display-md text-display-md font-bold text-on-surface mb-base">Overview Console</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">High-level metrics and system status.</p>
        </div>
        <Link href="/dashboard">
          <button className="bg-primary text-on-primary font-label-md text-label-md px-stack-md py-stack-sm rounded hover:opacity-90 transition-opacity">
            View All Disputes
          </button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
          <div className="flex items-center gap-inline-sm mb-stack-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">gavel</span>
            <h3 className="font-label-md text-label-md">Total Disputes</h3>
          </div>
          <p className="font-display-lg text-display-lg font-bold text-on-surface">2,543</p>
          <div className="mt-stack-xs text-[#166534] font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            +12% this month
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
          <div className="flex items-center gap-inline-sm mb-stack-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <h3 className="font-label-md text-label-md">Win Rate</h3>
          </div>
          <p className="font-display-lg text-display-lg font-bold text-on-surface">78.4%</p>
          <div className="mt-stack-xs text-[#166534] font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            +2.1% this month
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
          <div className="flex items-center gap-inline-sm mb-stack-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            <h3 className="font-label-md text-label-md">AI Auto-Accept</h3>
          </div>
          <p className="font-display-lg text-display-lg font-bold text-on-surface">65.2%</p>
          <div className="mt-stack-xs text-[#166534] font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            +5.4% this month
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
          <div className="flex items-center gap-inline-sm mb-stack-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <h3 className="font-label-md text-label-md">Avg Resolution Time</h3>
          </div>
          <p className="font-display-lg text-display-lg font-bold text-on-surface">1.2m</p>
          <div className="mt-stack-xs text-[#166534] font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            -18s this month
          </div>
        </div>
      </div>

      {/* Activity Feed Placeholder */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface">
          <h2 className="font-title-md text-title-md font-bold text-on-surface">Recent System Activity</h2>
        </div>
        <div className="p-stack-lg flex flex-col items-center justify-center h-48 text-center bg-surface-container-lowest">
           <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-stack-sm">
            <span className="material-symbols-outlined text-[24px] text-on-surface-variant">notifications_off</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">No recent alerts in the demo environment.</p>
        </div>
      </div>
    </div>
  );
}
