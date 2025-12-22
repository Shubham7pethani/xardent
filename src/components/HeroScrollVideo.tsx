"use client";

import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";

/* =========================
   Types
========================= */

type Source = { mp4?: string; webm?: string; ogg?: string };
type VideoLike = string | Source;

type Eases = {
  container?: string; // e.g. "expo.out"
  overlay?: string; // e.g. "expo.out"
  text?: string; // e.g. "power3.inOut"
};

export type HeroScrollVideoProps = {
  // Top headline area
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode; // e.g., date or small label
  credits?: ReactNode;

  // Media
  media?: VideoLike; // string URL or {mp4, webm, ogg}
  poster?: string;
  mediaType?: "video" | "image";
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;

  // Overlay content (shown over sticky media on scroll)
  overlay?: {
    caption?: ReactNode;
    heading?: ReactNode;
    paragraphs?: ReactNode[];
    extra?: ReactNode; // slot for buttons, links, etc.
  };

  // Simple labels around the box
  topLabel?: ReactNode;
  bottomLabel?: ReactNode;

  // Layout and animation tuning
  initialBoxSize?: number; // px, starting square size (default 360)
  targetSize?:
    | { widthVw: number; heightVh: number; borderRadius?: number }
    | "fullscreen";
  scrollHeightVh?: number; // total scroll height for sticky section (default 280)
  showHeroExitAnimation?: boolean; // headline roll-away (default true)
  sticky?: boolean; // keep media sticky (default true)
  overlayBlur?: number; // px blur for overlay content at start (default 10)
  overlayRevealDelay?: number; // seconds offset inside main timeline (default 0.35)
  eases?: Eases;

  // Smooth scrolling
  smoothScroll?: boolean; // initialize Lenis (default true)
  lenisOptions?: Record<string, unknown>;

  className?: string;
  style?: CSSProperties;
};

/* =========================
   Defaults
========================= */

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

/* =========================
   Helpers
========================= */

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string";
}

/* =========================
   Component
========================= */

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Future Forms",
  subtitle = "Design in Motion",
  meta = "2025",
  credits = (
    <>
      <p>Crafted by</p>
      <p>Scott Clayton</p>
    </>
  ),

  media,
  poster,
  mediaType = "video",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,

  overlay = {
    caption: "PROJECT • 07",
    heading: "Clarity in Motion",
    paragraphs: [
      "Scroll to expand the frame and reveal the story.",
      "Built with GSAP ScrollTrigger and optional Lenis smooth scroll.",
    ],
    extra: null,
  },

  topLabel,
  bottomLabel,

  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const isClient = typeof window !== "undefined";

  const hasHeroContent = Boolean(title || subtitle || meta || credits);

  const hasOverlayContent = Boolean(
    overlay &&
      (overlay.caption ||
        overlay.heading ||
        (overlay.paragraphs && overlay.paragraphs.length > 0) ||
        overlay.extra)
  );

  // Inline CSS variables for tuning (non-theme)
  const cssVars: CSSProperties = useMemo(
    () => ({
      ["--initial-size" as any]: `${initialBoxSize}px`,
      ["--overlay-blur" as any]: `${overlayBlur}px`,
    }),
    [initialBoxSize, overlayBlur]
  );

  // Scroll + GSAP wiring
  useEffect(() => {
    if (!isClient) return;

    let gsap: any;
    let ScrollTrigger: any;
    let CustomEase: any;
    let LenisCtor: any;
    let lenis: any;

    let heroTl: any;
    let mainTl: any;
    let overlayDarkenEl: HTMLDivElement | null = null;

    let rafCb: ((t: number) => void) | null = null;

    let cancelled = false;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;

      const ScrollTriggerPkg =
        (await import("gsap/ScrollTrigger").catch(() =>
          import("gsap/dist/ScrollTrigger")
        )) || {};
      ScrollTrigger =
        (ScrollTriggerPkg as any).default ||
        (ScrollTriggerPkg as any).ScrollTrigger ||
        ScrollTriggerPkg;

      const CustomEasePkg =
        (await import("gsap/CustomEase").catch(() =>
          import("gsap/dist/CustomEase")
        )) || {};
      CustomEase =
        (CustomEasePkg as any).default ||
        (CustomEasePkg as any).CustomEase ||
        CustomEasePkg;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      if (cancelled) return;

      if (smoothScroll) {
        const try2 = await import("lenis").catch(() => null);
        LenisCtor = (try2 as any)?.default || (try2 as any)?.Lenis;
        if (LenisCtor) {
          lenis = new LenisCtor({
            duration: 0.8,
            smoothWheel: true,
            gestureOrientation: "vertical",
            ...(lenisOptions || {}),
          });
          rafCb = (time: number) => lenis?.raf(time * 1000);
          (gsap as any).ticker.add(rafCb);
          (gsap as any).ticker.lagSmoothing(0);
          lenis?.on?.("scroll", (ScrollTrigger as any).update);
        }
      }

      const containerEase = eases.container ?? "expo.out";
      const overlayEase = eases.overlay ?? "expo.out";
      const textEase = eases.text ?? "power3.inOut";

      const container = containerRef.current;
      const overlayEl = overlayRef.current;
      const overlayCaption = overlayCaptionRef.current;
      const overlayContent = overlayContentRef.current;
      const headline = headlineRef.current!;

      // Darkening overlay inside the media box (only when overlay content exists)
      if (container && hasOverlayContent) {
        overlayDarkenEl = document.createElement("div");
        overlayDarkenEl.setAttribute("data-auto-darken", "true");
        overlayDarkenEl.style.position = "absolute";
        overlayDarkenEl.style.inset = "0";
        overlayDarkenEl.style.background = "rgba(0,0,0,0)";
        overlayDarkenEl.style.pointerEvents = "none";
        overlayDarkenEl.style.zIndex = "1";
        container.appendChild(overlayDarkenEl);
      }

      // Headline roll-away
      if (showHeroExitAnimation && headline) {
        heroTl = (gsap as any).timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "top+=420 top",
            scrub: 1.1,
          },
        });

        headline
          .querySelectorAll<HTMLElement>(".hsv-headline > *")
          .forEach((el, i) => {
            heroTl.to(
              el,
              {
                rotationX: 80,
                y: -36,
                scale: 0.86,
                opacity: 0,
                filter: "blur(4px)",
                transformOrigin: "center top",
                ease: textEase,
              },
              i * 0.08
            );
          });
      }

      // Main sticky expansion timeline
      const triggerEl = rootRef.current?.querySelector(
        "[data-sticky-scroll]"
      ) as HTMLElement | null;

      if (!triggerEl || !container) return;

      mainTl = (gsap as any).timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // Target size
      const target = (() => {
        if (targetSize === "fullscreen") {
          // Keep corners rounded even at max size
          return { width: "92vw", height: "92vh", borderRadius: 24 };
        }
        return {
          width: `${targetSize.widthVw ?? 92}vw`,
          height: `${targetSize.heightVh ?? 92}vh`,
          borderRadius: targetSize.borderRadius ?? 0,
        };
      })();

      // Initial states (horizontal card when small)
      const initialWidth = initialBoxSize * 1.9;
      const initialHeight = initialBoxSize * 0.85;
      (gsap as any).set(container, {
        width: initialWidth,
        height: initialHeight,
        borderRadius: 24,
        filter: "none",
        clipPath: "inset(0 0 0 0)",
      });

      if (hasOverlayContent && overlayEl && overlayContent && overlayCaption) {
        (gsap as any).set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
        (gsap as any).set(overlayContent, {
          filter: `blur(var(--overlay-blur))`,
          scale: 1.05,
        });
        (gsap as any).set([overlayContent, overlayCaption], { y: 30 });
      }

      // Animate the container to expand, then shrink back with the same smooth easing
      mainTl.to(
        container,
        {
          width: target.width,
          height: target.height,
          borderRadius: target.borderRadius,
          ease: containerEase,
          duration: 1,
          repeat: 1,
          yoyo: true,
        },
        0
      );

      if (hasOverlayContent && overlayEl && overlayContent && overlayCaption) {
        // Darken as it expands
        if (overlayDarkenEl) {
          mainTl.to(
            overlayDarkenEl,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              ease: "power2.out",
            },
            0
          );
        }
        // Reveal overlay panel
        mainTl
          .to(
            overlayEl,
            {
              clipPath: "inset(0% 0 0 0)",
              backdropFilter: `blur(${overlayBlur}px)`,
              ease: overlayEase,
            },
            overlayRevealDelay
          )
          // Content slides in and unblurs
          .to(
            overlayCaption,
            { y: 0, ease: overlayEase },
            overlayRevealDelay + 0.05
          )
          .to(
            overlayContent,
            {
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              ease: overlayEase,
            },
            overlayRevealDelay + 0.05
          );
      }

      // Try to play video
      const videoEl = container.querySelector("video") as HTMLVideoElement | null;
      if (videoEl) {
        const tryPlay = () => videoEl.play().catch(() => {});
        tryPlay();
        (ScrollTrigger as any).create({
          trigger: triggerEl,
          start: "top top",
          onEnter: tryPlay,
        });
      }
    })();

    return () => {
      cancelled = true;
      try {
        heroTl?.kill?.();
        mainTl?.kill?.();
      } catch {}
      try {
        // Clean up ScrollTriggers owned by this root
        if ((ScrollTrigger as any)?.getAll && rootRef.current) {
          (ScrollTrigger as any)
            .getAll()
            .forEach((t: any) => rootRef.current!.contains(t.trigger) && t.kill(true));
        }
      } catch {}
      try {
        // Remove darken element
        const root = containerRef.current;
        if (root) {
          const autoDarken = root.querySelector(
            "[data-auto-darken]"
          ) as HTMLDivElement | null;
          autoDarken?.parentElement?.removeChild(autoDarken);
        }
      } catch {}
      try {
        if (rafCb && (gsap as any)?.ticker) {
          (gsap as any).ticker.remove(rafCb);
          (gsap as any).ticker.lagSmoothing(1000, 16);
        }
      } catch {}
      try {
        (lenis as any)?.off?.("scroll", (ScrollTrigger as any)?.update);
        (lenis as any)?.destroy?.();
      } catch {}
    };
  }, [
    isClient,
    initialBoxSize,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    sticky,
    smoothScroll,
    lenisOptions,
    hasOverlayContent,
  ]);

  // Media rendering
  const renderMedia = () => {
    if (mediaType === "image") {
      const src = typeof media === "string" ? media : media?.mp4 || "";
      return (
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }
    // video
    const sources: React.ReactElement[] = [];
    if (typeof media === "string") {
      sources.push(<source key="mp4" src={media} type="video/mp4" />);
    } else if (isSourceObject(media)) {
      if (media.webm)
        sources.push(
          <source key="webm" src={media.webm} type="video/webm" />
        );
      if (media.mp4)
        sources.push(<source key="mp4" src={media.mp4} type="video/mp4" />);
      if (media.ogg)
        sources.push(<source key="ogg" src={media.ogg} type="video/ogg" />);
    }

    return (
      <video
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay || muted}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        {sources}
      </video>
    );
  };

  return (
    <div
      ref={rootRef}
      className={["hsv-root", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
    >
      {/* Headline/hero area (optional) */}
      {hasHeroContent && (
        <div className="hsv-container" ref={headlineRef}>
          <div className="hsv-headline">
            {title ? <h1 className="hsv-title">{title}</h1> : null}
            {subtitle ? <h2 className="hsv-subtitle">{subtitle}</h2> : null}
            {meta ? <div className="hsv-meta">{meta}</div> : null}
            {credits ? <div className="hsv-credits">{credits}</div> : null}
          </div>
        </div>
      )}

      {/* Sticky scroll section */}
      <div
        className="hsv-scroll"
        data-sticky-scroll
        style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}
      >
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          {topLabel ? (
            <div className="hsv-box-label hsv-box-label-top">{topLabel}</div>
          ) : null}

          {bottomLabel ? (
            <div className="hsv-box-label hsv-box-label-bottom">{bottomLabel}</div>
          ) : null}

          <div className="hsv-media-wrapper">
            <div className="hsv-media" ref={containerRef}>
              {renderMedia()}

              {/* overlay that reveals */}
              <div className="hsv-overlay" ref={overlayRef}>
                {overlay?.caption ? (
                  <div className="hsv-caption" ref={overlayCaptionRef}>
                    {overlay.caption}
                  </div>
                ) : null}
                <div className="hsv-overlay-content" ref={overlayContentRef}>
                  {overlay?.heading ? <h3>{overlay.heading}</h3> : null}
                  {overlay?.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {overlay?.extra}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles (scoped) */}
      <style>{`
        .hsv-root {
          color: inherit;
          background: transparent;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
          overflow-x: clip;
        }

        .hsv-container {
          height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(16px, 3vw, 40px);
          perspective: 900px;
        }

        .hsv-headline {
          text-align: center;
          transform-style: preserve-3d;
          max-width: min(100%, 1100px);
        }
        .hsv-headline > * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform-origin: center top;
        }

        .hsv-title {
          margin: 0 0 0.6rem 0;
          font-size: clamp(40px, 8vw, 96px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .hsv-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(18px, 3.5vw, 28px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .hsv-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.7rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: 1px solid rgba(148, 163, 184, 0.35);
        }
        .hsv-meta::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          display: inline-block;
        }
        .hsv-credits {
          margin-top: 1.1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.65;
        }

        .hsv-scroll {
          position: relative;
        }
        .hsv-sticky.is-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .hsv-media-wrapper {
          position: relative;
          display: grid;
          place-items: center;
          z-index: 2;
        }

        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          display: grid;
          place-items: center;
          box-shadow: 0 24px 80px rgba(15, 23, 42, 0.45);
        }

        .hsv-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 14, 0.42);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(16px, 4vw, 40px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(var(--overlay-blur));
          z-index: 2;
        }

        .hsv-caption {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          position: absolute;
          top: clamp(8px, 3vw, 24px);
          left: 0;
          width: 100%;
          text-align: center;
          opacity: 0.95;
        }

        .hsv-overlay-content {
          margin-top: 1.2rem;
          max-width: 68ch;
          display: grid;
          gap: 0.9rem;
        }
        .hsv-overlay-content h3 {
          font-size: clamp(26px, 5vw, 50px);
          line-height: 1.02;
          margin: 0;
          font-weight: 900;
        }
        .hsv-overlay-content p {
          font-size: clamp(15px, 2.1vw, 19px);
          line-height: 1.75;
          margin: 0;
          opacity: 0.95;
        }

        .hsv-box-label {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          pointer-events: none;
          text-align: center;
        }

        .hsv-box-label-top {
          top: 18vh;
        }

        .hsv-box-label-bottom {
          bottom: 26vh;
        }

        .hsv-top-heading {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          align-items: center;
        }

        .hsv-top-eyebrow {
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.9);
        }

        .hsv-top-main {
          font-size: clamp(56px, 7vw, 96px);
          font-weight: 800;
          letter-spacing: -0.055em;
          background: linear-gradient(135deg, #ffffff, #a5b4fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hsv-bottom-label {
          font-size: clamp(40px, 5.5vw, 84px);
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #e5e7eb;
          font-style: normal;
          line-height: 1.02;
        }

        @media (max-width: 900px) {
          .hsv-overlay-content {
            max-width: 40ch;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroScrollVideo;
