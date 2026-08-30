import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShieldAlert, LayoutDashboard, FileBarChart2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RepresentAI",
  description: "AI Dispute Investigation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex`}>
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-12">
            <ShieldAlert className="text-blue-500 w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">RepresentAI</span>
          </div>
          
          <nav className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
              <LayoutDashboard className="w-5 h-5 text-slate-400" />
              <span>Dashboard</span>
            </Link>
            <Link href="/benchmark" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
              <FileBarChart2 className="w-5 h-5 text-slate-400" />
              <span>Benchmark</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
