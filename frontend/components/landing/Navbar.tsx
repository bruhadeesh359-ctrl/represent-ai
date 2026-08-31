"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold text-on-surface">RepresentAI</span>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 font-label-md text-label-md text-on-surface-variant">
          <Link href="#product" className="hover:text-primary transition-colors">Product</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
          <Link href="#evidence" className="hover:text-primary transition-colors">Evidence Integrity</Link>
          <Link href="#benchmark" className="hover:text-primary transition-colors">Benchmark</Link>
          <Link href="#security" className="hover:text-primary transition-colors">Security</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block font-label-md text-label-md text-on-surface hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/login" className="bg-primary text-on-primary px-5 py-2.5 rounded font-label-md text-label-md hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
