"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [distanceFromCenter * 80, 0, distanceFromCenter * -80]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [distanceFromCenter * 25, 0, distanceFromCenter * -25]
  );

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 35, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(distanceFromCenter) * 26, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-12 w-12 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [distanceFromCenter * 60, 0, distanceFromCenter * -60]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [distanceFromCenter * 25, 0, distanceFromCenter * -25]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-Math.abs(distanceFromCenter) * 30, 0, Math.abs(distanceFromCenter) * 30]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-14 w-14 shrink-0 object-contain will-change-transform invert"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

const Skiper31 = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // 0 when the section's top hits the bottom of the viewport,
    // 1 when the section's bottom reaches the top — covers the whole full-screen scroll
    offset: ["start end", "end start"],
  });

  const line1 = "Partnering with forward";
  const line2 = "thinking companies worldwide";

  const charactersLine1 = line1.split("");
  const charactersLine2 = line2.split("");
  const centerIndexLine1 = Math.floor(charactersLine1.length / 2);
  const centerIndexLine2 = Math.floor(charactersLine2.length / 2);

  const macIcon = [
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Scroll to see more
        </p>

        <div
          className="font-geist w-full max-w-5xl text-center text-[clamp(32px,4.5vw,64px)] font-bold uppercase tracking-tight leading-tight"
          style={{ perspective: "500px" }}
        >
          <div className="whitespace-nowrap">
            {charactersLine1.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndexLine1}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="whitespace-nowrap">
            {charactersLine2.map((char, index) => (
              <CharacterV1
                key={"l2-" + index}
                char={char}
                index={index}
                centerIndex={centerIndexLine2}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
          {macIcon.map((char, index) => (
            <CharacterV3
              key={index}
              char={char}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };
