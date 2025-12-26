"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, type Variants } from "framer-motion";

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

type ScrollCurtainSplitSectionProps = {
  children?: React.ReactNode;
};

const ScrollCurtainSplitSection: React.FC<ScrollCurtainSplitSectionProps> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 0.9,
  });

  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  useMotionValueEvent(smoothScrollYProgress, "change", (latest) => {
    const shouldBeOpen = latest > 0.25;
    setIsCurtainOpen(shouldBeOpen);
  });

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-stretch justify-center overflow-hidden bg-slate-950">
        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-black text-white"
          variants={curtainVariants}
          initial="hidden"
          animate={isCurtainOpen ? "visible" : "hidden"}
        >
          <div className="flex h-full w-full items-center justify-center px-6">
            {children ?? (
              <div className="flex w-full max-w-5xl items-stretch justify-between gap-6">
                <div className="flex-1 bg-slate-900/80" />
                <div className="flex-1 bg-slate-900/80" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollCurtainSplitSection;
