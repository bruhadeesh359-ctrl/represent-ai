"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDispute, startInvestigation, generatePdf, submitResponse } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function DisputeDetail() {
  const params = useParams();
  const disputeId = params.id as string;
  
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investigating, setInvestigating] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  const fetchDispute = async () => {
    try {
      const data = await getDispute(disputeId);
      setDispute(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispute();
  }, [disputeId]);

  const handleInvestigate = async () => {
    setInvestigating(true);
    try {
      await startInvestigation(disputeId);
      await fetchDispute(); // refresh to show completed state
    } catch (e) {
      console.error(e);
      alert("Investigation failed.");
    } finally {
      setInvestigating(false);
    }
  };

  const handleGeneratePdf = async (invId: string) => {
    try {
      const res = await generatePdf(invId);
      alert(`PDF Generated at: ${res.path}`);
      setPdfPath(res.path);
    } catch(e) {
      console.error(e);
      alert("Failed to generate PDF");
    }
  };
  
  const handleSubmit = async (invId: string) => {
    try {
      await submitResponse(invId);
      alert("Submitted to Razorpay successfully!");
      fetchDispute();
    } catch (e) {
      alert("Failed to submit");
    }
  }

  if (loading) return <div className="p-10 animate-pulse">Loading dispute...</div>;
  if (!dispute) return <div className="p-10">Dispute not found.</div>;

  const investigation = dispute.investigations && dispute.investigations.length > 0 
    ? dispute.investigations[0] 
    : null;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dispute: {dispute.razorpay_dispute_id}</h1>
          <p className="text-slate-500 text-lg">
            ₹{(dispute.amount / 100).toLocaleString()} • {dispute.reason_code.replace(/_/g, ' ')}
          </p>
        </div>
        
        {!investigation || investigation.status === 'PENDING' ? (
          <button 
            onClick={handleInvestigate}
            disabled={investigating}
            className={`px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all ${
              investigating 
                ? 'bg-blue-200 text-blue-700 cursor-wait' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {investigating ? 'Investigating...' : '🔍 INVESTIGATE'}
          </button>
        ) : (
          <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-medium">
            Investigation Status: {investigation.status}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Payment Information</h3>
            {dispute.payments && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Razorpay ID</p>
                  <p className="font-medium text-slate-900">{dispute.payments.razorpay_payment_id}</p>
                </div>
                <div>
                  <p className="text-slate-500">Customer Email</p>
                  <p className="font-medium text-slate-900">{dispute.payments.email}</p>
                </div>
                <div>
                  <p className="text-slate-500">Method</p>
                  <p className="font-medium text-slate-900 capitalize">{dispute.payments.method}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Investigation Results */}
        <div className="col-span-2">
          {investigating ? (
            <div className="bg-white p-10 rounded-2xl border border-blue-200 shadow-lg text-center space-y-6">
               <div className="inline-block animate-spin text-4xl">⚙️</div>
               <h3 className="text-xl font-bold text-blue-900">AI Investigation in Progress</h3>
               <div className="w-full bg-slate-100 rounded-full h-3 max-w-md mx-auto overflow-hidden">
                 <div className="bg-blue-500 h-3 w-2/3 animate-pulse"></div>
               </div>
               <p className="text-slate-500">Gathering evidence from Orders, Shipping, and CRM...</p>
            </div>
          ) : investigation && investigation.status === 'COMPLETED' ? (
            <div className="space-y-6">
              {/* Decision Box */}
              <div className={`p-8 rounded-2xl border shadow-lg ${
                investigation.decision === 'FIGHT' ? 'bg-green-50 border-green-200' :
                investigation.decision === 'ACCEPT' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <h2 className="text-sm font-bold tracking-widest text-slate-500 mb-2 uppercase">AI Recommendation</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">
                    {investigation.decision === 'FIGHT' ? '🟢' : investigation.decision === 'ACCEPT' ? '🔴' : '🟡'}
                  </span>
                  <h1 className="text-4xl font-black text-slate-900">{investigation.decision}</h1>
                </div>
                
                <p className="text-lg text-slate-800 mb-6 leading-relaxed">
                  {investigation.reasoning_summary}
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleGeneratePdf(investigation.id)}
                    className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Generate PDF
                  </button>
                  <button 
                    onClick={() => handleSubmit(investigation.id)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
                  >
                    Approve & Submit
                  </button>
                </div>
              </div>

              {/* Evidence Graph / List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 text-xl">Verified Evidence</h3>
                <div className="space-y-4">
                  {investigation.evidence?.map((ev: any) => (
                    <div key={ev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {ev.id.split('-')[1]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{ev.source}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
                        </div>
                        <p className="font-medium text-slate-900 mb-1">{ev.claim}</p>
                        <p className="text-sm text-slate-600 font-mono bg-slate-200 px-2 py-1 rounded inline-block">Value: {ev.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl mb-4">
                📂
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Investigate</h3>
              <p className="text-slate-500 max-w-sm">
                Click Investigate to have RepresentAI gather evidence across your systems and generate a recommendation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
