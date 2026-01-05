"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let ScrollTrigger: any = null;
    (async () => {
      try {
        const stPkg =
          (await import("gsap/ScrollTrigger").catch(() =>
            import("gsap/dist/ScrollTrigger")
          )) || {};
        ScrollTrigger = (stPkg as any).default || (stPkg as any).ScrollTrigger || stPkg;
      } catch {
        ScrollTrigger = null;
      }
    })();

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      // Lenis expects time in ms
      lenis.raf(time);
      rafIdRef.current = window.requestAnimationFrame(raf);
    };

    try {
      lenis.on("scroll", () => {
        try {
          ScrollTrigger?.update?.();
        } catch {}
      });
    } catch {}

    rafIdRef.current = window.requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    // Ensure we never keep the page in a scroll-locked state after client navigation.
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";

    // Lenis sometimes needs a resize after route changes to recompute scroll height.
    const lenis = lenisRef.current as any;
    try {
      lenis?.resize?.();
    } catch {}

    const t = window.setTimeout(() => {
      try {
        (lenisRef.current as any)?.resize?.();
      } catch {}
    }, 50);

    return () => {
      window.clearTimeout(t);
    };
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;
