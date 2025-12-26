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
  scrub?: number; // ScrollTrigger scrub smoothing (higher = smoother)
  expandDelay?: number; // delay (timeline units) before expansion starts
  showHeroExitAnimation?: boolean; // headline roll-away (default true)
  sticky?: boolean; // keep media sticky (default true)
  overlayBlur?: number; // px blur for overlay content at start (default 10)
  overlayRevealDelay?: number; // seconds offset inside main timeline (default 0.35)
  eases?: Eases;

  // Smooth scrolling
  smoothScroll?: boolean; // initialize Lenis (default true)
  lenisOptions?: Record<string, unknown>;

  // Extra effects
  screenSplit?: boolean;

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
  scrub: 1.1,
  expandDelay: 0,
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
  scrub = DEFAULTS.scrub,
  expandDelay = DEFAULTS.expandDelay,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  // Extra effects
  screenSplit = false,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);
  const screenCurtainRef = useRef<HTMLDivElement | null>(null);
  const curtainCardsRef = useRef<HTMLDivElement | null>(null);

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
      const screenCurtain = screenCurtainRef.current;
      const mediaWrapper = rootRef.current?.querySelector(
        ".hsv-media-wrapper"
      ) as HTMLDivElement | null;
      const boxLabels = rootRef.current?.querySelectorAll<HTMLElement>(
        ".hsv-box-label"
      );
      const curtainCards = curtainCardsRef.current?.querySelectorAll<HTMLElement>(
        ".hsv-split-card"
      );
      const curtainCardInners =
        curtainCardsRef.current?.querySelectorAll<HTMLElement>(
          ".hsv-split-card-inner"
        );

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
            scrub,
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
          scrub,
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

      if (screenSplit && screenCurtain) {
        (gsap as any).set(screenCurtain, {
          opacity: 0,
          clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
        });
      }

      // Animate the container to expand, then shrink back with the same smooth easing
      const expandStart = Math.max(0, expandDelay || 0);

      if (expandStart > 0) {
        mainTl.to({}, { duration: expandStart });
      }

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
        expandStart
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
            expandStart
          );
        }

        // Reveal overlay panel
        mainTl
          .to(
            overlayEl,
            {
              clipPath: "inset(0% 0 0 0)",
              backdropFilter: `blur(${overlayBlur}px)` ,
              ease: overlayEase,
            },
            expandStart + overlayRevealDelay
          )
          // Content slides in and unblurs
          .to(
            overlayCaption,
            { y: 0, ease: overlayEase },
            expandStart + overlayRevealDelay + 0.05
          )
          .to(
            overlayContent,
            {
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              ease: overlayEase,
            },
            expandStart + overlayRevealDelay + 0.05
          );
      }

      if (screenSplit && screenCurtain) {
        mainTl.to(
          screenCurtain,
          {
            opacity: 1,
            clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
            ease: containerEase,
            duration: 0.9,
          },
          ">-0.05"
        );

        if (mediaWrapper) {
          mainTl.to(
            mediaWrapper,
            {
              opacity: 0,
              scale: 0.9,
              ease: "power2.inOut",
              duration: 0.8,
            },
            "<"
          );
        }

        if (boxLabels && boxLabels.length) {
          mainTl.to(
            boxLabels,
            {
              opacity: 0,
              y: 40,
              ease: "power2.inOut",
              duration: 0.8,
            },
            "<"
          );
        }

        if (curtainCards && curtainCards.length) {
          mainTl.fromTo(
            curtainCards,
            {
              y: 260,
              opacity: 0,
              rotateX: 16,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              ease: "power3.out",
              duration: 1.1,
              stagger: 0.22,
            },
            ">-0.1"
          );
        }

        if (curtainCardInners && curtainCardInners.length) {
          mainTl.to(
            curtainCardInners,
            {
              rotateY: 180,
              ease: textEase,
              duration: 0.9,
              stagger: 0.08,
            },
            ">+0.2"
          );
        }
      }

      // Try to play video
      const videoEl = container.querySelector(
        "video"
      ) as HTMLVideoElement | null;
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
            .forEach(
              (t: any) => rootRef.current!.contains(t.trigger) && t.kill(true)
            );
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
    screenSplit,
  ]);

  // Media rendering
  const renderMedia = () => {
    if (mediaType === "image") {
      const src = typeof media === "string" ? media : media?.mp4 || "";
      if (!src) {
        return <div className="hsv-media-fallback" aria-hidden="true" />;
      }
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

          {screenSplit ? (
            <div className="hsv-screen-curtain" ref={screenCurtainRef}>
              <div className="hsv-split-heading">DESIGN. CODE. SCALE.</div>
              <div className="hsv-split-cards" ref={curtainCardsRef}>
                <div className="hsv-split-card">
                  <div className="hsv-split-card-inner">
                    <div className="hsv-split-card-face hsv-split-card-front">
                      <span className="hsv-split-card-text">
                        Does your business need a clear digital identity that feels modern and professional?
                      </span>
                    </div>
                    <div className="hsv-split-card-face hsv-split-card-back">
                      <span className="hsv-split-card-text">
                        We craft strong digital identities that reflect your brand's vision, build trust, and leave a lasting impression.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hsv-split-card">
                  <div className="hsv-split-card-inner">
                    <div className="hsv-split-card-face hsv-split-card-front">
                      <span className="hsv-split-card-text">
                        Is your software or website confusing users instead of guiding them smoothly?
                      </span>
                    </div>
                    <div className="hsv-split-card-face hsv-split-card-back">
                      <span className="hsv-split-card-text">
                        We design intuitive user experiences that feel natural, reduce friction, and keep users engaged from start to finish.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hsv-split-card">
                  <div className="hsv-split-card-inner">
                    <div className="hsv-split-card-face hsv-split-card-front">
                      <span className="hsv-split-card-text">
                        Are you struggling to turn visitors into real customers or leads?
                      </span>
                    </div>
                    <div className="hsv-split-card-face hsv-split-card-back">
                      <span className="hsv-split-card-text">
                        Our conversion-focused design and development turns attention into action and visitors into loyal customers.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hsv-split-card">
                  <div className="hsv-split-card-inner">
                    <div className="hsv-split-card-face hsv-split-card-front">
                      <span className="hsv-split-card-text">
                        Looking to build smart software that actually supports your business growth?
                      </span>
                    </div>
                    <div className="hsv-split-card-face hsv-split-card-back">
                      <span className="hsv-split-card-text">
                        We build scalable, high-performance software solutions aligned with your business goals — today and tomorrow.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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

        .hsv-screen-curtain {
          position: absolute;
          inset: 0;
          background: #020617;
          z-index: 4;
          pointer-events: none;
          clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
        }

        .hsv-split-heading {
          position: absolute;
          top: 14vh;
          left: 0;
          right: 0;
          text-align: center;
          font-size: clamp(32px, 4.6vw, 56px);
          font-weight: 800;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: rgba(241, 245, 249, 0.9);
          pointer-events: none;
        }

        .hsv-split-cards {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 2vw, 20px);
          padding-inline: clamp(16px, 6vw, 64px);
          pointer-events: none;
        }

        .hsv-split-card {
          width: 300px;
          height: 340px;
          min-height: 340px;
          border-radius: 24px;
          perspective: 1200px;
        }

        .hsv-split-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          transform-style: preserve-3d;
          box-shadow: 0 26px 70px rgba(15, 23, 42, 0.7);
        }

        .hsv-split-card-face {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 26px 20px 24px;
          background: #6366f1;
          color: #f9fafb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          isolation: isolate;
        }

        .hsv-split-card-text {
          position: relative;
          display: block;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          z-index: 1;
        }

        .hsv-split-card-front .hsv-split-card-text {
          text-wrap: pretty;
          text-wrap: balance;
        }

        .hsv-split-card-face::before,
        .hsv-split-card-face::after {
          content: "";
          position: absolute;
          width: 120px;
          height: 120px;
          background:
            linear-gradient(#18181b, #18181b) 50% 0 / 26px 120px no-repeat,
            linear-gradient(#18181b, #18181b) 0 50% / 120px 26px no-repeat;
          border-radius: 24px;
          opacity: 0.9;
          animation: hsv-card-spin 5s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        .hsv-split-card-face::before {
          top: -40px;
          left: -34px;
        }

        .hsv-split-card-face::after {
          bottom: -52px;
          right: -36px;
        }

        .hsv-split-card-front {
          background: #60a5fa;
          font-size: 1.28rem;
          line-height: 1.45;
          font-weight: 800;
          letter-spacing: 0.01em;
        }

        .hsv-split-card-back {
          background: #1e40af;
          transform: rotateY(180deg);
          font-size: 1.08rem;
          line-height: 1.65;
          font-weight: 650;
          opacity: 0.95;
        }

        @keyframes hsv-card-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 900px) {
          .hsv-split-cards {
            align-items: flex-end;
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 40px;
          }

          .hsv-split-card {
            min-width: 220px;
          }
        }

        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #020617;
          display: grid;
          place-items: center;
          box-shadow: 0 24px 80px rgba(15, 23, 42, 0.45);
        }

        .hsv-media-fallback {
          width: 100%;
          height: 100%;
          background:
            radial-gradient(700px 300px at 20% 10%, rgba(99, 102, 241, 0.35), transparent 60%),
            radial-gradient(700px 320px at 80% 30%, rgba(34, 211, 238, 0.22), transparent 62%),
            linear-gradient(180deg, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 1));
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
