"use client";

import { useEffect, useState } from "react";
import { getBenchmarks } from "@/lib/api";

export default function Benchmark() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBenchmarks()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10 font-label-md text-label-md text-on-surface-variant">Calculating benchmarks...</div>;
  }

  const metrics = data?.metrics || {
    total_cases: 0,
    accuracy: 0,
    evidence_grounding: 0,
    hallucinations: 0,
    review_rate: 0
  };

  const matrix = data?.confusion_matrix || [];

  return (
    <>
      {/* Page Header */}
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-headline-lg font-semibold text-primary">Evaluation & Benchmarks</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Measuring AI accuracy, grounding, and deterministic validation performance.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* KPI Grid */}
        <div className="xl:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-stack-md mb-gutter">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-secondary/5 opacity-50 z-0"></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase z-10">Test Cases</span>
            <div className="font-display-lg text-display-lg text-primary mt-stack-sm z-10">{metrics.total_cases}</div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md flex flex-col justify-between relative overflow-hidden">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase z-10">Decision Accuracy</span>
            <div className="font-display-lg text-display-lg text-primary mt-stack-sm z-10 flex items-baseline gap-1">
              {metrics.accuracy}<span className="font-headline-md text-headline-md text-outline">%</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md flex flex-col justify-between relative overflow-hidden">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase z-10">Evidence Grounding</span>
            <div className="font-display-lg text-display-lg text-[#16a34a] mt-stack-sm z-10 flex items-baseline gap-1">
              {metrics.evidence_grounding}<span className="font-headline-md text-headline-md text-outline">%</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md flex flex-col justify-between relative overflow-hidden">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase z-10">Hallucinated Claims</span>
            <div className="font-display-lg text-display-lg text-primary mt-stack-sm z-10">{metrics.hallucinations}</div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md flex flex-col justify-between relative overflow-hidden">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase z-10">Human Review Rate</span>
            <div className="font-display-lg text-display-lg text-primary mt-stack-sm z-10 flex items-baseline gap-1">
              {metrics.review_rate}<span className="font-headline-md text-headline-md text-outline">%</span>
            </div>
          </div>
        </div>

        {/* Decision Matrix (Confusion Matrix) */}
        <div className="xl:col-span-8 bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg">
          <div className="flex items-center justify-between mb-stack-md">
            <h3 className="font-title-lg text-title-lg text-primary">Decision Matrix</h3>
            <span className="font-label-sm text-label-sm text-outline px-2 py-1 bg-surface-container rounded">Predicted vs Actual</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b border-surface-variant bg-surface-container-low font-label-md text-label-md text-on-surface-variant w-1/4"></th>
                  <th className="p-3 border-b border-surface-variant bg-surface-container-low font-label-md text-label-md text-on-surface-variant text-center border-l border-surface-variant">Predicted: FIGHT</th>
                  <th className="p-3 border-b border-surface-variant bg-surface-container-low font-label-md text-label-md text-on-surface-variant text-center border-l border-surface-variant">Predicted: ACCEPT</th>
                  <th className="p-3 border-b border-surface-variant bg-surface-container-low font-label-md text-label-md text-on-surface-variant text-center border-l border-surface-variant">Predicted: REVIEW</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md">
                {matrix.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-surface-variant hover:bg-surface-bright transition-colors">
                    <td className="p-3 font-label-md text-label-md text-on-surface-variant bg-surface-container-low border-r border-surface-variant">
                      Actual: {row.actual.replace('_', ' ')}
                    </td>
                    <td className={`p-3 text-center border-l border-surface-variant ${row.actual === 'FIGHT' ? 'bg-[#dbe1ff]/30 font-bold text-primary' : 'text-outline'}`}>
                      {row.predicted_fight}
                    </td>
                    <td className={`p-3 text-center border-l border-surface-variant ${row.actual === 'ACCEPT' ? 'bg-[#dbe1ff]/30 font-bold text-primary' : 'text-outline'}`}>
                      {row.predicted_accept}
                    </td>
                    <td className={`p-3 text-center border-l border-surface-variant ${row.actual === 'HUMAN_REVIEW' ? 'bg-[#dbe1ff]/30 font-bold text-primary' : 'text-outline'}`}>
                      {row.predicted_review}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grounding Audit */}
        <div className="xl:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg flex-1">
            <div className="flex items-center gap-inline-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary">policy</span>
              <h3 className="font-title-lg text-title-lg text-primary">Grounding Audit</h3>
            </div>
            
            <div className="space-y-stack-md">
              <div className="p-stack-sm border border-surface-variant rounded bg-surface-bright flex gap-inline-sm items-start">
                <span className="material-symbols-outlined text-[#16a34a] mt-0.5">check_circle</span>
                <div>
                  <p className="font-body-md text-body-md text-primary font-semibold">{metrics.evidence_grounding}% Mapping Success</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{metrics.evidence_grounding}% of AI claims successfully mapped to source data.</p>
                </div>
              </div>
              
              <div className="p-stack-sm border border-surface-variant rounded bg-surface-bright flex gap-inline-sm items-start">
                <span className="material-symbols-outlined text-primary mt-0.5">verified_user</span>
                <div>
                  <p className="font-body-md text-body-md text-primary font-semibold">{metrics.hallucinations} Rejected Claims</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{metrics.hallucinations} claims rejected due to lack of evidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
