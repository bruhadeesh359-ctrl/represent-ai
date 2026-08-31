"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setNameInput(user?.user_metadata?.full_name || "");
    });
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: nameInput.trim() }
    });
    setSavingName(false);
    if (!error) {
      setIsEditingName(false);
      setUser({
        ...user,
        user_metadata: { ...user?.user_metadata, full_name: nameInput.trim() }
      });
      // Force reload to update Navigation header
      window.location.reload(); 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-stack-xl">
      <div>
        <h1 className="font-display-md text-display-md font-bold text-on-surface mb-base">System Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your account and RepresentAI integrations.</p>
      </div>

      <div className="space-y-stack-md">
        {/* Profile Settings */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface">
            <h2 className="font-title-md text-title-md font-bold text-on-surface">Account Profile</h2>
          </div>
          <div className="p-stack-lg space-y-stack-md">
            <div className="flex justify-between items-center pb-stack-md border-b border-outline-variant">
              <div>
                <p className="font-label-md text-label-md text-on-surface">Name</p>
                {isEditingName ? (
                   <input 
                      type="text" 
                      value={nameInput} 
                      onChange={e => setNameInput(e.target.value)}
                      className="mt-1 bg-surface border border-outline-variant rounded px-2 py-1 font-body-md focus:outline-secondary"
                      placeholder="Your name"
                      autoFocus
                   />
                ) : (
                   <p className="font-body-md text-body-md text-on-surface-variant">
                     {user?.user_metadata?.full_name || "No name set"}
                   </p>
                )}
              </div>
              <div>
                {isEditingName ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingName(false)} className="border border-outline-variant text-on-surface px-stack-md py-stack-sm rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSaveName} disabled={savingName} className="bg-primary text-on-primary px-stack-md py-stack-sm rounded font-label-md text-label-md hover:opacity-90 transition-opacity">
                      {savingName ? "Saving..." : "Save"}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingName(true)} className="border border-outline-variant text-on-surface px-stack-md py-stack-sm rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">
                    Edit
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-label-md text-label-md text-on-surface">Logout</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Sign out of this device.</p>
              </div>
              <button 
                onClick={handleLogout}
                disabled={loading}
                className="bg-error-container text-on-error-container px-stack-md py-stack-sm rounded font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {loading ? <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> : <span className="material-symbols-outlined text-[18px]">logout</span>}
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm opacity-60">
          <div className="px-stack-lg py-stack-md border-b border-outline-variant bg-surface">
            <h2 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Razorpay Integration
            </h2>
          </div>
          <div className="p-stack-lg flex justify-between items-center">
            <div>
              <p className="font-label-md text-label-md text-on-surface">Webhook Secrets</p>
              <p className="font-body-md text-body-md text-on-surface-variant">These are managed via environment variables in the demo.</p>
            </div>
            <button disabled className="bg-surface-variant text-on-surface-variant px-stack-md py-stack-sm rounded font-label-md text-label-md cursor-not-allowed">
              Locked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
