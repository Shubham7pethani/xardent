"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "@/components/ui/hero-background";
import FooterNewsletter from "@/components/FooterNewsletter";
import {
  Search,
  Zap,
  FileText,
  Layout,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Utility function for class names
function cnUtil(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

// Types
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  items?: string[];
}

interface Benefit {
  text: string;
}

interface WhyPoint {
  text: string;
}

// Animation Container Component
interface AnimatedContainerProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Grid Pattern Component
function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

// Feature Card Component
interface FeatureCardProps extends React.ComponentProps<"div"> {
  feature: Feature;
}

function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const p = genRandomPattern();

  return (
    <div className={cn("relative overflow-hidden p-6 bg-white", className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="from-slate-900/5 to-slate-900/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-slate-900/5 stroke-slate-900/25 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>
      <div className="text-blue-600 mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold tracking-tight mb-2 text-slate-900">{feature.title}</h3>
      <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
      {feature.items && (
        <ul className="space-y-2">
          {feature.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Main SEO Page Component
export function XardentSEODigitalGrowthPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const features: Feature[] = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Technical SEO Optimization",
      description:
        "A strong technical foundation is critical for search engine success. We optimize your website's structure, speed, and performance to ensure search engines can crawl, index, and rank your site effectively.",
      items: [
        "Website speed & performance",
        "Core Web Vitals",
        "Mobile responsiveness",
        "Site structure & indexing",
        "Security & best practices",
      ],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "On-Page SEO Optimization",
      description:
        "We optimize your website content and pages to align with search intent, improve relevance, and increase organic traffic.",
      items: [
        "Keyword research & placement",
        "Page titles & meta descriptions",
        "Content optimization",
        "Internal linking",
        "SEO-friendly site architecture",
      ],
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Website Optimization for Conversions",
      description:
        "SEO brings traffic — optimization turns that traffic into customers. We improve usability, page performance, and user experience to increase engagement and conversions.",
      items: [
        "Page speed optimization",
        "UX & layout improvements",
        "Conversion-focused structure",
        "Performance enhancements",
      ],
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Search Ranking Improvement",
      description:
        "We focus on long-term, sustainable ranking growth using ethical SEO practices that build authority and trust with search engines.",
      items: [
        "Improved keyword rankings",
        "Increased organic traffic",
        "Better search visibility",
        "Stronger online authority",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Performance Tracking",
      description:
        "Data-driven growth starts with accurate tracking. We set up and configure analytics tools to measure performance and guide smarter decisions.",
      items: [
        "Google Analytics setup",
        "Search Console integration",
        "Traffic & behavior insights",
        "SEO performance reports",
      ],
    },
  ];

  const benefits: Benefit[] = [
    { text: "Consistent organic traffic" },
    { text: "Higher-quality leads" },
    { text: "Stronger brand credibility" },
    { text: "Better return on marketing spend" },
    { text: "Long-term business growth" },
  ];

  const whyPoints: WhyPoint[] = [
    { text: "Technical + content SEO expertise" },
    { text: "Performance-focused strategies" },
    { text: "Transparent reporting & insights" },
    { text: "SEO aligned with business goals" },
    { text: "Sustainable, long-term growth approach" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative isolate flex w-full flex-col overflow-hidden bg-white text-slate-900 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <HeroBackground />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="outline" className="mb-4 border-slate-300 text-slate-700 bg-slate-50">
                SEO & Digital Growth
              </Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900"
            >
              Grow Your Online Presence.{" "}
              <span className="text-blue-600">Rank Higher.</span> Get More
              Customers.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 mb-4 max-w-3xl mx-auto"
            >
              Xardent helps businesses increase visibility, improve search
              rankings, and convert traffic into real leads through smart SEO and
              performance-driven digital growth strategies.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-sm text-slate-500 mb-8"
            >
              Long-term growth built on data, performance, and trust.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" className="gap-2">
                Let's Build Your Product
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-slate-300 text-slate-700 bg-slate-50">
                Business Impact
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                Why Invest in SEO & Digital Growth?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-white"
                >
                  <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-base text-slate-900">{benefit.text}</span>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Why Xardent Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-slate-300 text-slate-700 bg-slate-50">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                Why Xardent?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-white"
                >
                  <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-base text-slate-900">{point.text}</span>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedContainer
            delay={0.2}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="rounded-2xl border bg-white p-8 md:p-12">
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                Let's Grow Your Business Online
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Whether you want higher rankings, better website performance, or
                more qualified leads — Xardent is ready to help you grow.
              </p>
              <Button size="lg" className="gap-2">
                Let's Build Your Product
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}

export default function SEODigitalGrowthPageDemo() {
  return <XardentSEODigitalGrowthPage />;
}

