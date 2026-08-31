import { LandingNavbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip, ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks, EvidenceValidation } from "@/components/landing/HowItWorks";
import { DecisionSection, BenchmarkSection } from "@/components/landing/DecisionSection";
import { ProductPreview, PdfSection, SecuritySection, Footer } from "@/components/landing/ExtraSections";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 text-on-surface scroll-smooth">
      <LandingNavbar />
      
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <HowItWorks />
        <EvidenceValidation />
        <DecisionSection />
        <ProductPreview />
        <BenchmarkSection />
        <PdfSection />
        <SecuritySection />

        {/* Final CTA */}
        <section className="py-32 bg-primary-container relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-primary/5 pattern-grid-lg"></div>
          <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
            <h2 className="font-display-lg text-[40px] md:text-[56px] font-bold text-on-primary-container leading-[1.1] mb-8">
              Turn dispute investigation from manual work into an evidence-driven workflow.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/login" className="bg-primary text-on-primary px-8 py-4 rounded font-label-lg text-label-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/20">
                Open RepresentAI
              </Link>
              <Link href="#product" className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded border border-outline-variant font-label-lg text-label-lg hover:bg-surface-container-low transition-colors shadow-sm">
                Explore the Investigation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
