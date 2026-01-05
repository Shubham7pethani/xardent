"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticText } from "@/components/MagneticText";
import { NextGenAnimated } from "@/components/NextGenAnimated";
import { TextRotate } from "@/components/TextRotate";
import { HeroBackground } from "@/components/ui/hero-background";
import { MdOutlinePhone, MdOutlinePhoneInTalk } from "react-icons/md";

export default function HeroSection() {
  const [isLetsTalkHovered, setIsLetsTalkHovered] = useState(false);

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto flex min-h-[calc(100svh-86px)] max-w-6xl flex-col items-center justify-between px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h1 className="text-balance tracking-tight text-slate-950">
            <span className="block text-[clamp(46px,6.2vw,100px)] font-light leading-[1.08]">
              Building{" "}
              <NextGenAnimated className="inline-flex align-baseline" />
            </span>
            <span className="mt-7 block text-[clamp(52px,7.2vw,124px)] font-extrabold italic leading-[1.08]">
              <TextRotate
                texts={[
                  "Smart Software",
                  "Web Applications",
                  "Mobile Apps",
                  "Business Systems",
                  "Billing Solutions",
                  "Banking Software",
                ]}
                staggerDuration={0.03}
                splitBy="characters"
                mainClassName="justify-center"
                elementLevelClassName="text-inherit font-inherit"
              />
            </span>
            <span className="mt-7 block text-[clamp(46px,6.2vw,104px)] font-semibold leading-[1.08]">
              <span className="md:whitespace-nowrap">
                for{" "}
                <MagneticText
                  text="Modern"
                  hoverText="Growing"
                  className="inline-flex align-baseline"
                  inheritTypography
                  textClassName="text-inherit font-inherit tracking-inherit"
                  hoverTextClassName="text-inherit font-inherit tracking-inherit"
                  circleClassName="bg-slate-950"
                  circleSize={220}
                />{" "}
                Businesses
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-12 max-w-3xl text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-[18px]">
            Xardent designs and develops custom billing software, banking systems, web applications, and mobile
            solutions that help businesses operate efficiently and scale with confidence.
          </p>

          <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffffff,rgba(59,130,246,0.4))] shadow-[0_16px_40px_rgba(37,99,235,0.25)]">
                  <span className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.5)]">
                    ★
                  </span>
                  <span className="text-[20px] font-semibold text-slate-900">5+</span>
                </div>
                <div className="text-left text-sm sm:text-[15px] text-slate-800">
                  <div className="font-semibold">Years of</div>
                  <div className="font-semibold">Excellence</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffffff,rgba(56,189,248,0.42))] shadow-[0_16px_40px_rgba(8,145,178,0.28)]">
                  <span className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0ea5e9] text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(14,165,233,0.5)]">
                    🔥
                  </span>
                  <span className="text-[20px] font-semibold text-slate-900">92%</span>
                </div>
                <div className="text-left text-sm sm:text-[15px] text-slate-800">
                  <div className="font-semibold">Success</div>
                  <div className="font-semibold">Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffffff,rgba(129,140,248,0.4))] shadow-[0_16px_40px_rgba(79,70,229,0.25)]">
                  <span className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e] text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(34,197,94,0.5)]">
                    ✔
                  </span>
                  <span className="text-[20px] font-semibold text-slate-900">10 +</span>
                </div>
                <div className="text-left text-sm sm:text-[15px] text-slate-800">
                  <div className="font-semibold">Thriving</div>
                  <div className="font-semibold">Projects</div>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-blue-600 bg-blue-600 px-8 text-sm font-bold tracking-wide text-white transition hover:bg-blue-700 hover:border-blue-700 active:scale-95 sm:w-auto"
              onMouseEnter={() => setIsLetsTalkHovered(true)}
              onMouseLeave={() => setIsLetsTalkHovered(false)}
            >
              <div className="relative flex items-center justify-center gap-3">
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  LET&apos;S TALK
                </span>

                <span className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
                  <motion.span
                    initial={false}
                    animate={isLetsTalkHovered ? { y: -18, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{ position: "absolute", left: 0, right: 0 }}
                  >
                    <MdOutlinePhone className="h-5 w-5 text-white" />
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={isLetsTalkHovered ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{ position: "absolute", left: 0, right: 0 }}
                  >
                    <MdOutlinePhoneInTalk className="h-5 w-5 text-white" />
                  </motion.span>
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating contacts and time badge moved to the layout/page */}
    </section>
  );
}
