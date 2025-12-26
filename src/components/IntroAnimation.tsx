"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { SiAmazonwebservices, SiOpenai } from "react-icons/si";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  title: string;
  description: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 54;
const IMG_HEIGHT = 54;

function FlipCard({ src, title, description, index, total, phase, target }: FlipCardProps) {
  const [imageOk, setImageOk] = useState(Boolean(src));

  useEffect(() => {
    setImageOk(Boolean(src));
  }, [src]);

  const fallbackIcon = useMemo(() => {
    if (title === "AWS") {
      return <SiAmazonwebservices size={IMG_WIDTH} color="#FF9900" />;
    }
    if (title === "OpenAI") {
      return <SiOpenai size={IMG_WIDTH} color="#FFFFFF" />;
    }
    return null;
  }, [title]);

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
      }}
      className="pointer-events-auto"
      aria-label={title}
    >
      {imageOk ? (
        <img
          src={src}
          alt={title}
          title={title}
          className="h-full w-full object-contain"
          onError={() => setImageOk(false)}
          style={{
            filter:
              "drop-shadow(0 10px 18px rgba(2, 6, 23, 0.35)) drop-shadow(0 2px 4px rgba(2, 6, 23, 0.25))",
          }}
        />
      ) : fallbackIcon ? (
        <span
          aria-label={title}
          className="grid h-full w-full place-items-center"
          style={{
            filter:
              "drop-shadow(0 10px 18px rgba(2, 6, 23, 0.35)) drop-shadow(0 2px 4px rgba(2, 6, 23, 0.25))",
          }}
        >
          {fallbackIcon}
        </span>
      ) : null}
    </motion.div>
  );
}

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;
const SECTION_SCROLL_PX = 6000;

const TECHNOLOGIES = [
  {
    title: "Next.js",
    description: "Server-rendered React apps with routing, SEO, and performance out of the box.",
    src: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    title: "React",
    description: "Component-driven UIs built for speed, scalability, and maintainability.",
    src: "https://cdn.simpleicons.org/react/61dafb",
  },
  {
    title: "TypeScript",
    description: "Type-safe code that scales with your product and team.",
    src: "https://cdn.simpleicons.org/typescript/3178c6",
  },
  {
    title: "Node.js",
    description: "Fast APIs and real-time services with a huge ecosystem.",
    src: "https://cdn.simpleicons.org/nodedotjs/5fa04e",
  },
  {
    title: "MongoDB",
    description: "Flexible data models for rapid iteration and modern apps.",
    src: "https://cdn.simpleicons.org/mongodb/47a248",
  },
  {
    title: "PostgreSQL",
    description: "Reliable relational storage for complex business logic.",
    src: "https://cdn.simpleicons.org/postgresql/4169e1",
  },
  {
    title: "Tailwind CSS",
    description: "Beautiful UIs with fast iteration and consistent design.",
    src: "https://cdn.simpleicons.org/tailwindcss/06b6d4",
  },
  {
    title: "Figma",
    description: "Design-to-dev collaboration with strong systems thinking.",
    src: "https://cdn.simpleicons.org/figma/f24e1e",
  },
  {
    title: "Docker",
    description: "Consistent builds and deployments across environments.",
    src: "https://cdn.simpleicons.org/docker/2496ed",
  },
  {
    title: "AWS",
    description: "Scalable cloud infrastructure built for production workloads.",
    src: "",
  },
  {
    title: "Firebase",
    description: "Auth, storage, and realtime data for fast MVP launches.",
    src: "https://cdn.simpleicons.org/firebase/ffca28",
  },
  {
    title: "Stripe",
    description: "Secure payments and subscriptions that scale globally.",
    src: "https://cdn.simpleicons.org/stripe/635bff",
  },
  {
    title: "Prisma",
    description: "Type-safe database access with an excellent dev experience.",
    src: "https://cdn.simpleicons.org/prisma/ffffff",
  },
  {
    title: "Redis",
    description: "Caching and queues for high performance systems.",
    src: "https://cdn.simpleicons.org/redis/dc382d",
  },
  {
    title: "OpenAI",
    description: "AI features like chatbots, summarization, and automation.",
    src: "",
  },
  {
    title: "GitHub",
    description: "Collaboration, CI, and source control for reliable delivery.",
    src: "https://cdn.simpleicons.org/github/ffffff",
  },
  {
    title: "Vercel",
    description: "Edge-ready deployments optimized for Next.js.",
    src: "https://cdn.simpleicons.org/vercel/ffffff",
  },
  {
    title: "Kubernetes",
    description: "Orchestration for scalable services and microservices.",
    src: "https://cdn.simpleicons.org/kubernetes/326ce5",
  },
  {
    title: "Framer Motion",
    description: "High-quality UI motion that feels premium and smooth.",
    src: "https://cdn.simpleicons.org/framer/0055ff",
  },
  {
    title: "Supabase",
    description: "Postgres + Auth + Storage for fast modern product builds.",
    src: "https://cdn.simpleicons.org/supabase/3ecf8e",
  },
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 0.9,
  });

  useEffect(() => {
    const unsub = smoothScrollYProgress.on("change", setScrollProgressValue);
    return () => {
      unsub();
    };
  }, [smoothScrollYProgress]);

  const SCATTER_END = 0.16;
  const LINE_END = 0.28;
  const CIRCLE_HOLD_END = 0.42;
  const MORPH_END = 0.62;

  const introPhase: AnimationPhase =
    scrollProgressValue < SCATTER_END
      ? "scatter"
      : scrollProgressValue < LINE_END
        ? "line"
        : "circle";

  const effectiveScroll = useTransform(smoothScrollYProgress, (p) => {
    if (p <= CIRCLE_HOLD_END) return 0;
    if (p <= MORPH_END) {
      const t = (p - CIRCLE_HOLD_END) / (MORPH_END - CIRCLE_HOLD_END);
      return t * 600;
    }
    const t2 = (p - MORPH_END) / (1 - MORPH_END);
    return 600 + t2 * (MAX_SCROLL - 600);
  });

  const morphProgress = useTransform(effectiveScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(effectiveScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const scatterPositions = useMemo(() => {
    const w = containerSize.width || 1200;
    const h = containerSize.height || 800;

    return TECHNOLOGIES.map(() => ({
      x: (Math.random() - 0.5) * w * 0.9,
      y: (Math.random() - 0.5) * h * 0.7,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.85,
      opacity: 1,
    }));
  }, [containerSize.width, containerSize.height]);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `calc(100vh + ${SECTION_SCROLL_PX}px)` }}
    >
      <div ref={containerRef} className="sticky top-0 h-screen w-full bg-transparent overflow-hidden" style={{ background: "transparent" }}>
        <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: 1 }}
              className="max-w-[22ch] px-4 text-balance text-[clamp(18px,2.2vw,32px)] font-semibold tracking-tight text-white"
            >
              Built with the tools that ship products.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={
                introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.6 - morphValue } : { opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-3 text-[10px] font-bold tracking-[0.22em] text-gray-300"
            >
              SCROLL TO EXPLORE OUR STACK
            </motion.p>
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 px-4 pointer-events-none">
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center"
            >
              <h2 className="mb-3 text-[clamp(24px,4.2vw,52px)] font-semibold tracking-tight text-white">
                Explore Our Technology Stack
              </h2>
              <p className="max-w-xl text-[clamp(13px,1.3vw,16px)] leading-relaxed text-gray-300">
                We use a modern stack to build fast, scalable products. <br className="hidden md:block" />
                Flip a card to see what each technology helps us deliver.
              </p>
            </motion.div>
          </div>
          <div className="relative flex items-center justify-center w-full h-full">
            {TECHNOLOGIES.slice(0, TOTAL_IMAGES).map((tech, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const lineSpacing = 70;
                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                const lineX = i * lineSpacing - lineTotalWidth / 2;
                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
                const isMobile = containerSize.width < 768;
                const minDimension = Math.min(containerSize.width, containerSize.height);

                const safeH = containerSize.height || 800;
                const maxCircleRadius = safeH / 2 - IMG_HEIGHT * 0.7;
                const circleRadius = Math.max(0, Math.min(Math.min(minDimension * 0.35, 350), maxCircleRadius));

                const circleAngle = (i / TOTAL_IMAGES) * 360;
                const circleRad = (circleAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius,
                  rotation: circleAngle + 90,
                };

                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                const arcCenterY = arcApexY + arcRadius;

                const spreadAngle = isMobile ? 100 : 130;
                const startAngle = -90 - spreadAngle / 2;
                const step = spreadAngle / (TOTAL_IMAGES - 1);

                const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                const maxRotation = spreadAngle * 0.8;
                const boundedRotation = -scrollProgress * maxRotation;

                const currentArcAngle = startAngle + i * step + boundedRotation;
                const arcRad = (currentArcAngle * Math.PI) / 180;

                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius + parallaxValue,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                };
              }

              return (
                <FlipCard
                  key={i}
                  src={tech.src}
                  title={tech.title}
                  description={tech.description}
                  index={i}
                  total={TOTAL_IMAGES}
                  phase={introPhase}
                  target={target}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
