import HeroSection from "@/components/HeroSection";
import { Skiper31 } from "@/components/Skiper31";
import { FloatingTimeBadge } from "@/components/FloatingTimeBadge";
import { FloatingContacts } from "@/components/FloatingContacts";
import { SectionBlack } from "@/components/SectionBlack";
import XardentVideo from "@/components/xardentviedo";

export default function Home() {
  return (
    <>
      <main>
        {/** Hero Section */}
        <HeroSection />

        {/** Scroll animation + logos section, with global bg -> black */}
        <SectionBlack>
          <Skiper31 />
        </SectionBlack>

        {/** Xardent scroll experience box section */}
        <SectionBlack amount={0.3}>
          <XardentVideo />
        </SectionBlack>
      </main>

      {/* Global floating UI */}
      <FloatingTimeBadge />
      <FloatingContacts />
    </>
  );
}
