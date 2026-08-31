"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Google authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-container flex flex-col items-center justify-center p-container-margin relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary opacity-[0.03] rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10">
        <div className="flex flex-col items-center text-center mb-stack-lg">
          <div className="w-12 h-12 rounded bg-primary flex items-center justify-center shrink-0 mb-stack-sm">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none mb-base">RepresentAI</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Sign in to access your investigation dashboard.</p>
        </div>

        {error && (
          <div className="mb-stack-md bg-error-container text-on-error-container px-stack-md py-stack-sm rounded border border-[#ffb4ab] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span className="font-label-sm text-label-sm">{error}</span>
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-inline-sm px-stack-lg py-stack-md bg-surface-container-low border border-outline-variant rounded font-label-md text-label-md text-on-surface hover:bg-surface-container-high active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          Continue with Google
        </button>

        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-stack-lg">
          By signing in, you agree to our Terms of Service and Privacy Policy. Secure access restricted to authorized personnel.
        </p>
      </div>
    </div>
  );
}
