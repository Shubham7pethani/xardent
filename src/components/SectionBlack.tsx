"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type SectionBlackProps = {
  children: React.ReactNode;
  /**
   * How much of the section should be visible before we switch
   * the global background. 0 = any visibility, 1 = fully visible.
   */
  amount?: number;
};

const SectionBlack: React.FC<SectionBlackProps> = ({ children, amount = 0.8 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount,
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;

    if (inView) {
      body.classList.add("section-bg-dark");
    } else {
      body.classList.remove("section-bg-dark");
    }

    return () => {
      body.classList.remove("section-bg-dark");
    };
  }, [inView]);

  return <div ref={ref}>{children}</div>;
};

export { SectionBlack };
