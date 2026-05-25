import { PublicHeader } from "@/components/layout/PublicHeader";
import { ConcessionArea } from "@/components/landing/ConcessionArea";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { IndicatorStrip } from "@/components/landing/IndicatorStrip";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PortalModules } from "@/components/landing/PortalModules";
import { SecuritySection } from "@/components/landing/SecuritySection";

export default function HomePage() {
  return (
    <main className="corporate-portal min-h-screen overflow-hidden bg-[#f7fafc] text-[#142638]">
      <PublicHeader />
      <HeroSection />
      <IndicatorStrip />
      <HowItWorks />
      <PortalModules />
      <ConcessionArea />
      <SecuritySection />
      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
