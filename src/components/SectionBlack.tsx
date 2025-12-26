"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type SectionBlackProps = {
  children: React.ReactNode;
  /**
   * How much of the section should be visible before we switch
   * the global background. 0 = any visibility, 1 = fully visible.
   */
  amount?: number;
  exitAmount?: number;
  trigger?: "amount" | "center";
  centerBand?: number;
};

const SectionBlack: React.FC<SectionBlackProps> = ({
  children,
  amount = 0.8,
  exitAmount,
  trigger = "amount",
  centerBand = 0.22,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const key = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return (crypto as any).randomUUID();
    }
    return `sb_${Math.random().toString(16).slice(2)}`;
  }, []);

  const exitThreshold = exitAmount ?? Math.min(0.08, amount);
  const inViewEnter = useInView(sentinelRef, { amount });
  const inViewExit = useInView(sentinelRef, { amount: exitThreshold });

  useEffect(() => {
    if (trigger !== "amount") return;
    setIsActive((prev) => {
      if (!prev && inViewEnter) return true;
      if (prev && !inViewExit) return false;
      return prev;
    });
  }, [inViewEnter, inViewExit, trigger]);

  useEffect(() => {
    if (trigger !== "center") return;
    const el = ref.current;
    if (!el) return;

    const band = Math.min(0.8, Math.max(0.05, centerBand));
    const marginPct = ((1 - band) / 2) * 100;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsActive(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        rootMargin: `-${marginPct}% 0px -${marginPct}% 0px`,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, centerBand]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;

    const w = window as any;
    const set: Set<string> = w.__xardentSectionBlackActive || new Set();
    w.__xardentSectionBlackActive = set;

    if (isActive) set.add(key);
    else set.delete(key);

    body.classList.toggle("section-bg-dark", set.size > 0);

    return () => {
      set.delete(key);
      body.classList.toggle("section-bg-dark", set.size > 0);
    };
  }, [isActive, key]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        ref={sentinelRef}
        style={{
          position: "sticky",
          top: "35vh",
          left: 0,
          right: 0,
          height: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export { SectionBlack };
