"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if they already have a name in metadata and auto-forward
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.full_name) {
        // Fallback to update profile table if metadata exists but profile doesn't
        await supabase.from('profiles').upsert({ 
          id: user.id, 
          full_name: user.user_metadata.full_name 
        });
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    setError(null);
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    // 1. Update auth metadata
    const { error: metaError } = await supabase.auth.updateUser({
      data: { full_name: name.trim() }
    });

    if (metaError) {
      setError("Failed to save profile. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Update profiles table (if the migration was run)
    // We ignore errors here because if the user didn't run the SQL, we still have user_metadata
    await supabase.from('profiles').upsert({ 
      id: user.id, 
      full_name: name.trim() 
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-primary-container flex flex-col items-center justify-center p-container-margin relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary opacity-[0.03] rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10">
        <div className="flex flex-col items-center text-center mb-stack-lg">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface leading-none mb-base">Welcome to RepresentAI.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Before we get started, what should we call you?</p>
        </div>

        {error && (
          <div className="mb-stack-md bg-error-container text-on-error-container px-stack-md py-stack-sm rounded border border-[#ffb4ab] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span className="font-label-sm text-label-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div>
            <label htmlFor="name" className="block font-label-sm text-label-sm text-on-surface-variant mb-base uppercase tracking-wider">Your Name</label>
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full bg-surface-bright border border-outline-variant rounded p-stack-sm font-body-md text-on-surface focus:outline-none focus:border-secondary transition-colors"
              required
              autoFocus
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full flex items-center justify-center gap-inline-sm px-stack-lg py-stack-sm bg-primary text-on-primary rounded font-label-md text-label-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            ) : null}
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
