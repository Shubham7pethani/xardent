"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, Variants } from "framer-motion";
import { MdOutlinePhone, MdOutlinePhoneInTalk } from "react-icons/md";
import DesignApproach from "./designsection/DesignApproach";
import { HeroBackground } from "@/components/ui/hero-background";
import FooterNewsletter from "@/components/FooterNewsletter";
import {
  ChevronRight,
  Target,
  Brain,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  Phone,
} from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Export types for Button usage
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
  const containerVariants = variants?.container || defaultContainerVariants;
  const itemVariants = variants?.item || defaultItemVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface CardStickyProps {
  index: number;
  incrementY?: number;
  incrementZ?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      children,
      className,
      style,
    },
    ref
  ) => {
    const y = index * incrementY;
    const z = index * incrementZ;

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top: y,
          zIndex: z,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("sticky", className)}
      >
        {children}
      </motion.div>
    );
  }
);

CardSticky.displayName = "CardSticky";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const UI_UX_SERVICES = [
  {
    id: "service-1",
    title: "UI/UX Design",
    description:
      "We design modern, intuitive interfaces for web apps, dashboards, admin panels, and SaaS platforms.",
    includes: [
      "User flow & journey mapping",
      "Information architecture",
      "Clean, modern UI design",
      "SaaS & fintech-focused UX",
      "Mobile-first & responsive design",
    ],
  },
  {
    id: "service-2",
    title: "UX Audit & Optimization",
    description:
      "Already have a product? We analyze usability issues and improve user experience for better performance.",
    includes: [
      "UX & usability audit",
      "Conversion optimization",
      "User behavior analysis",
      "Design improvement recommendations",
    ],
  },
  {
    id: "service-3",
    title: "Prototyping & Wireframing",
    description: "We validate ideas before development to save time and cost.",
    includes: [
      "Low & high-fidelity wireframes",
      "Clickable prototypes (Figma)",
      "Early user testing & feedback",
    ],
  },
  {
    id: "service-4",
    title: "Product Design (SaaS & Enterprise)",
    description: "From idea to final UI — we design complete digital products.",
    includes: [
      "Idea validation",
      "UX strategy",
      "End-to-end product design",
      "Developer-ready design handoff",
    ],
  },
  {
    id: "service-5",
    title: "Design Systems",
    description:
      "We build scalable design systems to keep your product consistent and fast to develop.",
    includes: [
      "Figma component libraries",
      "Typography & color systems",
      "Reusable UI components",
      "Dev-ready documentation",
    ],
  },
];

const WHY_CHOOSE_US = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Business-first design thinking",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "SaaS & fintech experience",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast iteration & feedback",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & scalable design",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Long-term design support",
  },
];

const TOOLS = [
  {
    name: "Figma",
    logo: "https://cdn.worldvectorlogo.com/logos/figma-5.svg",
    fallback:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f172a"/><circle cx="26" cy="18" r="10" fill="#f24e1e"/><circle cx="38" cy="18" r="10" fill="#ff7262"/><circle cx="26" cy="32" r="10" fill="#a259ff"/><circle cx="38" cy="32" r="10" fill="#1abcfe"/><path d="M26 42a10 10 0 1 0 0 20V42z" fill="#0acf83"/></svg>'
      ),
  },
  {
    name: "FigJam",
    logo: "https://cdn.worldvectorlogo.com/logos/figjam-1.svg",
    fallback:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f172a"/><rect x="18" y="16" width="28" height="32" rx="6" fill="#f59e0b"/><path d="M18 42c6 0 10 6 14 6s8-6 14-6v6c-6 0-10 6-14 6s-8-6-14-6v-6z" fill="#22c55e"/></svg>'
      ),
  },
  {
    name: "Adobe XD",
    logo: "https://cdn.worldvectorlogo.com/logos/adobe-xd-1.svg",
  },
  {
    name: "Framer",
    logo: "https://cdn.worldvectorlogo.com/logos/framer-1.svg",
  },
  {
    name: "Notion",
    logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg",
  },
  { name: "Jira", logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg" },
];

function XardentDesignPage() {
  const [isLetsTalkHovered, setIsLetsTalkHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden flex flex-col items-center justify-center py-20 md:py-24 bg-white">
        <HeroBackground />
        <div className="container mx-auto px-6 w-full relative z-10">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    duration: 1.5,
                  },
                },
              },
            }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge / Eyebrow Text */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                UI / UX Design Services
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-slate-900">
              Design That Converts Users Into Customers
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              We craft intuitive, scalable, and conversion-focused digital experiences for SaaS platforms, fintech products, and enterprise solutions that drive measurable business growth.
            </p>

            {/* Value Statement */}
            <p className="text-base md:text-lg font-semibold text-slate-800 mb-10 max-w-2xl mx-auto">
              Every pixel optimized for engagement. Every interaction designed for conversion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
              
              <Link
                href="#work"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-sm font-semibold tracking-wide text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 active:scale-95 sm:w-auto"
              >
                View Design Work
              </Link>
            </div>
          </AnimatedGroup>
        </div>

        {/* Dashboard Image Box - Moved up after CTA buttons */}
        <div className="w-screen relative pb-20 mt-8 left-1/2 -translate-x-1/2 px-4 md:px-6 lg:px-8">
          {/* Blue/Purple Glow Effect */}
          <div
            className="absolute left-1/2 w-[90%] pointer-events-none z-0"
            style={{
              top: "-23%",
              transform: "translateX(-50%)"
            }}
            aria-hidden="true"
          >
            <div className="w-full h-[400px] bg-gradient-to-b from-blue-500/20 via-purple-500/15 to-transparent blur-3xl rounded-full" />
          </div>
          
          <div className="relative z-10 w-full">
            <img
              src="https://i.postimg.cc/SKcdVTr1/Dashboard2.png"
              alt="Dashboard preview showing analytics and metrics interface"
              className="w-full h-auto rounded-lg shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Design Approach Section */}
      <DesignApproach 
        title="Our UI/UX Design Approach"
        subtitle="At Xardent, UI/UX design is not just about visuals — it's about clarity, usability, and business impact."
        badge="UI/UX Design"
      />

      {/* UI/UX Design Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              UI/UX Design Services
            </h2>
          </div>
          <ContainerScroll className="min-h-[400vh] space-y-8">
            {UI_UX_SERVICES.map((service, index) => (
              <CardSticky
                key={service.id}
                index={index + 1}
                incrementY={40}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                  <span className="text-4xl font-bold text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-slate-600 mb-6">
                  {service.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-3 text-slate-900">Includes:</h4>
                  <ul className="space-y-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </section>

      {/* Why Choose Xardent Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Xardent for Design?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  {item.icon}
                </div>
                <span className="font-medium text-slate-900">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools We Use Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools We Use
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all"
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-12 w-auto"
                  onError={(e) => {
                    if (tool.fallback) {
                      e.currentTarget.src = tool.fallback;
                    }
                  }}
                />
                <span className="text-sm text-slate-500">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Let's Design Something Powerful
            </h2>
            <p className="text-lg mb-8 text-slate-600">
              Have an idea or an existing product? Let's turn it into a
              user-friendly, high-performing experience.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="group relative overflow-hidden bg-blue-600 text-white hover:bg-blue-700"
            >
              <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
                LET'S TALK
              </span>
              <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
              </i>
            </Button>
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}

export default XardentDesignPage;
