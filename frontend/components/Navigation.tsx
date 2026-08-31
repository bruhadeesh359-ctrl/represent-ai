"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  const isDisputes = pathname === "/dashboard" || pathname.startsWith("/disputes");
  const isBenchmarks = pathname.startsWith("/benchmark");
  const isOverview = pathname === "/overview";
  const isInvestigations = pathname.startsWith("/investigations");

  const getPageTitle = () => {
    if (isBenchmarks) return "Benchmarks";
    if (isDisputes) return "Overview";
    return "RepresentAI";
  };

  const isPublicRoute = pathname === "/" || pathname === "/login" || pathname === "/onboarding";

  useEffect(() => {
    if (isPublicRoute) return;
    
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Try profile first, fallback to metadata, then email
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else {
          setUserName(user.email || null);
        }
      }
    };
    fetchUser();
  }, [isPublicRoute]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="bg-surface-container-lowest font-body-md text-body-md text-on-surface antialiased h-screen flex overflow-hidden">
      {/* SideNavBar - Always Dark */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-primary-container border-r border-primary flex flex-col py-container-margin px-inline-sm z-50">
        {/* Header */}
        <div className="mb-stack-lg px-inline-sm">
          <div className="flex items-center gap-inline-sm">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-white leading-none">RepresentAI</h1>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-base opacity-80">Fintech Intelligence</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-base">
          <Link href="/dashboard" className={`flex items-center gap-inline-sm px-inline-sm py-stack-sm rounded hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] transition-transform ${isDisputes ? "bg-surface-container-low text-secondary font-bold" : "text-on-primary-container"}`}>
            <span className="material-symbols-outlined" style={isDisputes ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
            <span className="font-label-md text-label-md">Overview</span>
          </Link>
          <Link href="/investigations" className={`flex items-center gap-inline-sm px-inline-sm py-stack-sm rounded hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] transition-transform ${isInvestigations ? "bg-surface-container-low text-secondary font-bold" : "text-on-primary-container"}`}>
            <span className="material-symbols-outlined" style={isInvestigations ? { fontVariationSettings: "'FILL' 1" } : {}}>troubleshoot</span>
            <span className="font-label-md text-label-md">Investigations</span>
          </Link>
          <Link href="/benchmark" className={`flex items-center gap-inline-sm px-inline-sm py-stack-sm rounded hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] transition-transform ${isBenchmarks ? "bg-surface-container-low text-secondary font-bold" : "text-on-primary-container"}`}>
            <span className="material-symbols-outlined" style={isBenchmarks ? { fontVariationSettings: "'FILL' 1" } : {}}>analytics</span>
            <span className="font-label-md text-label-md">Benchmarks</span>
          </Link>
          <div className="mt-auto mb-stack-md">
            <Link href="/settings" className={`flex items-center gap-inline-sm px-inline-sm py-stack-sm rounded hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] transition-transform ${pathname.startsWith('/settings') ? "bg-surface-container-low text-secondary font-bold" : "text-on-primary-container"}`}>
              <span className="material-symbols-outlined" style={pathname.startsWith('/settings') ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="pt-stack-md border-t border-primary flex flex-col gap-base px-inline-sm">
          <div className="flex items-center gap-inline-xs text-on-primary-container">
            <span className="material-symbols-outlined text-[14px] text-[#166534]" style={{ fontVariationSettings: "'FILL' 1" }}>api</span>
            <span className="font-label-sm text-label-sm">API: Online</span>
          </div>
          <div className="flex items-center gap-inline-xs text-on-primary-container">
            <span className="material-symbols-outlined text-[14px] text-[#2563EB]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="font-label-sm text-label-sm">Gemini: Active</span>
          </div>
          <div className="flex items-center gap-inline-xs text-on-primary-container">
            <span className="material-symbols-outlined text-[14px] opacity-70" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            <span className="font-label-sm text-label-sm">Razorpay: Connected</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 bg-background">
        {/* TopNavBar */}
        <header className="bg-surface text-primary font-label-md text-label-md flex justify-between items-center h-16 w-full px-container-margin border-b border-outline-variant sticky top-0 z-40">
          <div className="flex items-center gap-stack-lg h-full">
            <div className="h-full flex items-center border-b-2 border-primary opacity-100">
              <span className="font-label-md text-label-md text-primary">{getPageTitle()}</span>
            </div>
          </div>
          <div className="flex items-center gap-gutter">
            <div className="flex items-center gap-inline-sm bg-tertiary-fixed text-on-secondary-fixed-variant px-inline-sm py-base rounded-full border border-secondary-fixed">
              <span className="material-symbols-outlined text-[16px]">science</span>
              <span className="font-label-sm text-label-sm">DEMO ENVIRONMENT</span>
            </div>
            <div className="flex items-center gap-inline-sm text-on-surface-variant">
              {userName && <span className="font-label-sm text-label-sm font-medium">{userName}</span>}
              <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant ml-inline-sm overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-container-margin pb-32">
          {children}
        </main>
      </div>
    </div>
  );
}
