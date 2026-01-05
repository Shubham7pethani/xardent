import HeroSection from "@/components/HeroSection";
import { SectionBlack } from "@/components/SectionBlack";
import IntroAnimation from "@/components/IntroAnimation";
import ServicesOverview from "@/components/ServicesOverview";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import TrustBoostStats from "@/components/TrustBoostStats";
import WhyChooseXardent from "@/components/WhyChooseXardent";
import DevelopmentProcess from "@/components/DevelopmentProcess";
import FeaturedWork from "@/components/FeaturedWork";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";
import FooterNewsletter from "@/components/FooterNewsletter";

export default function Home() {
  return (
    <>
      <main>
        {/** Hero Section */}
        <HeroSection />

        <ServicesOverview />

        <IndustriesWeServe />

        <TrustBoostStats />

        {/** Scroll animation + logos section, with global bg -> black */}
        <SectionBlack trigger="center" centerBand={0.26}>
          <IntroAnimation />
        </SectionBlack>

        <WhyChooseXardent />

        <DevelopmentProcess />

        <FeaturedWork />

        <TestimonialsSection
          title="What Clients Say"
          description="Real feedback from teams we’ve helped build, scale, and ship reliable software."
          testimonials={[
            {
              author: {
                name: "Aarav Sharma",
                handle: "FinTech Founder",
                avatar: "https://i.pravatar.cc/96?img=12",
              },
              text: "Xardent delivered a secure billing platform fast, with clean UI and solid architecture. Communication was smooth end-to-end.",
            },
            {
              author: {
                name: "Neha Verma",
                handle: "Operations Lead",
                avatar: "https://i.pravatar.cc/96?img=47",
              },
              text: "The team understood our domain quickly and built exactly what we needed. Performance and reliability are top-notch.",
            },
            {
              author: {
                name: "Rahul Mehta",
                handle: "Product Manager",
                avatar: "https://i.pravatar.cc/96?img=32",
              },
              text: "Great process, great quality. From requirements to launch, everything felt structured and professional.",
            },
            {
              author: {
                name: "Priya Singh",
                handle: "SaaS Co-Founder",
                avatar: "https://i.pravatar.cc/96?img=5",
              },
              text: "We got a scalable SaaS admin panel with clean code and strong UX. Support after launch has been excellent.",
            },
            {
              author: {
                name: "Karan Patel",
                handle: "CTO",
                avatar: "https://i.pravatar.cc/96?img=21",
              },
              text: "Security review and testing were thorough. We felt confident going live, and the system has been stable.",
            },
          ]}
        />

        <CallToActionSection />

        <FooterNewsletter />
      </main>
    </>
  );
}
