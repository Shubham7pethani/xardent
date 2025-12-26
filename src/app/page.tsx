import HeroSection from "@/components/HeroSection";
import { FloatingTimeBadge } from "@/components/FloatingTimeBadge";
import { FloatingContacts } from "@/components/FloatingContacts";
import { SectionBlack } from "@/components/SectionBlack";
import IntroAnimation from "@/components/IntroAnimation";
import XardentVideo from "@/components/xardentviedo";
import HireUsSection from "@/components/HireUsSection";

export default function Home() {
  return (
    <>
      <main>
        {/** Hero Section */}
        <HeroSection />

        {/** Scroll animation + logos section, with global bg -> black */}
        <SectionBlack trigger="center" centerBand={0.26}>
          <IntroAnimation />
        </SectionBlack>

        {/** Xardent scroll experience box section */}
        <SectionBlack amount={0.35} exitAmount={0.12}>
          <XardentVideo />
        </SectionBlack>

        <SectionBlack trigger="center" centerBand={0.26}>
          <HireUsSection />
        </SectionBlack>
      </main>

      {/* Global floating UI */}
      <FloatingTimeBadge />
      <FloatingContacts />
    </>
  );
}
