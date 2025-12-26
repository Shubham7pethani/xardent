"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const HireUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 0.9,
  });

  const headingX = useTransform(smoothScrollYProgress, [0, 1], [140, -140]);

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-6xl px-6">
          <motion.div
            style={{ x: headingX }}
            className="pointer-events-none mb-10 select-none whitespace-nowrap text-[clamp(56px,8vw,140px)] font-medium leading-none tracking-tight text-white/18"
          >
            Hire Us - Hire Us
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
            <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/55 p-10 shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="text-xl font-medium text-white">Hire A UI UX Designer</div>
              <div className="mt-2 text-[clamp(28px,3vw,40px)] font-extrabold leading-tight text-white">
                <span className="italic">Who Resonates With</span>
                <br />
                <span className="italic">Your Brand&apos;s Vision</span>
              </div>

              <div className="mt-10 space-y-6 text-[13px] leading-6 text-slate-300">
                <div>
                  <div className="font-semibold text-white">Outsourcing vendors</div>
                  <div>often display inflexible working methods.</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Freelance designers</div>
                  <div>offer flexibility but don&apos;t guarantee dependability.</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Design agencies</div>
                  <div>fall short of the transparency that is assured by In-House Designers.</div>
                </div>
                <div>
                  <div className="font-semibold text-white">In-house designers</div>
                  <div>fail to match the competence of Design Agencies.</div>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-800/70 pt-6 text-[11px] leading-5 text-slate-400">
                Very rarely do you find a Service Solution that ticks off all the boxes of Product Design needs? More often than not there is always something that doesn&apos;t feel right.
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-600 to-blue-900 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <div className="max-w-[70%]">
                  <div className="text-lg font-semibold text-white">Dedicated Product</div>
                  <div className="text-lg font-semibold text-white">Solutions</div>
                  <div className="mt-2 text-xs text-white/80">Product Scalable solutions for companies</div>
                  <button className="mt-6 rounded-full bg-white px-5 py-2 text-[10px] font-bold tracking-widest text-slate-900">
                    LEARN MORE
                  </button>
                </div>
                <div className="absolute right-7 top-1/2 h-20 w-20 -translate-y-1/2 rotate-12 rounded-2xl bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
              </div>

              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-700 to-slate-950 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <div className="max-w-[70%]">
                  <div className="text-lg font-semibold text-white">Trusted</div>
                  <div className="text-lg font-semibold text-white">Design Partner</div>
                  <div className="mt-2 text-xs text-white/80">Hire dedicated design team (Ptoas)</div>
                  <button className="mt-6 rounded-full bg-white px-5 py-2 text-[10px] font-bold tracking-widest text-slate-900">
                    LEARN MORE
                  </button>
                </div>
                <div className="absolute right-7 top-1/2 h-20 w-20 -translate-y-1/2 rounded-[22px] bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
              </div>

              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 to-blue-950 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <div className="max-w-[70%]">
                  <div className="text-lg font-semibold text-white">Complete</div>
                  <div className="text-lg font-semibold text-white">Enterprise Solution</div>
                  <div className="mt-2 text-xs text-white/80">Product design partner for enterprises</div>
                  <button className="mt-6 rounded-full bg-white px-5 py-2 text-[10px] font-bold tracking-widest text-slate-900">
                    LEARN MORE
                  </button>
                </div>
                <div className="absolute right-7 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireUsSection;
