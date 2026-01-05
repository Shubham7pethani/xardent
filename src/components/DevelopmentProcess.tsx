"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCode,
  FiPenTool,
  FiSearch,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

interface DevelopmentProcessProps {
  steps?: ProcessStep[];
  title?: string;
  autoPlayInterval?: number;
  className?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Requirement Analysis",
    description:
      "We dive deep into your business needs, technical requirements, and project goals to create a comprehensive roadmap for success.",
    icon: FiSearch,
    details: [
      "Business Goals Assessment",
      "Technical Requirements Gathering",
      "Stakeholder Interviews",
      "Project Scope Definition",
    ],
  },
  {
    id: "02",
    title: "UI/UX & Architecture Design",
    description:
      "Our design team creates intuitive user experiences while our architects build a scalable technical foundation.",
    icon: FiPenTool,
    details: [
      "User Experience Design",
      "Visual Design & Branding",
      "System Architecture Planning",
      "Database Schema Design",
    ],
  },
  {
    id: "03",
    title: "Development & Integration",
    description:
      "Expert developers bring your vision to life with clean, efficient code and seamless third-party integrations.",
    icon: FiCode,
    details: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Database Implementation",
    ],
  },
  {
    id: "04",
    title: "Testing & Security Review",
    description:
      "Rigorous testing and security audits ensure your application is robust, secure, and ready for production.",
    icon: FiShield,
    details: [
      "Automated Testing",
      "Security Audits",
      "Performance Testing",
      "User Acceptance Testing",
    ],
  },
  {
    id: "05",
    title: "Launch & Ongoing Support",
    description:
      "We ensure a smooth launch and provide continuous support to keep your application running at peak performance.",
    icon: FiZap,
    details: [
      "Deployment & Launch",
      "Performance Monitoring",
      "Bug Fixes & Updates",
      "24/7 Technical Support",
    ],
  },
];

export function DevelopmentProcess({
  steps = DEFAULT_STEPS,
  title = "Our Development Process",
  autoPlayInterval = 4000,
  className,
}: DevelopmentProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rafStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) return;

    rafStartRef.current = null;
    let rafId = 0;

    const tick = (t: number) => {
      if (rafStartRef.current === null) rafStartRef.current = t;
      const elapsed = t - rafStartRef.current;
      const pct = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgress(pct);

      if (elapsed >= autoPlayInterval) {
        setActiveStep((s) => (s + 1) % steps.length);
        rafStartRef.current = null;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeStep, autoPlayInterval, isHovered, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
    rafStartRef.current = null;
  };

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            A proven methodology that ensures quality, reliability, and success at every stage
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div
            className="space-y-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                    isActive
                      ? "border-blue-600/35 bg-blue-600/5 shadow-lg"
                      : "border-slate-200 bg-white/70 hover:border-blue-600/25 hover:bg-slate-50"
                  )}
                  onClick={() => handleStepClick(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : isCompleted
                            ? "bg-blue-600/15 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {isCompleted ? (
                        <FiCheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={cn(
                            "text-sm font-bold",
                            isActive ? "text-blue-700" : "text-slate-500"
                          )}
                        >
                          {step.id}
                        </span>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="h-fit lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-700">
                  {React.createElement(steps[activeStep].icon, {
                    className: "h-8 w-8",
                  })}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-slate-950">
                  {steps[activeStep].title}
                </h3>

                <p className="mb-6 text-slate-600">{steps[activeStep].description}</p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                    Key Activities
                  </h4>
                  {steps[activeStep].details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/15">
                        <FiCheckCircle className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-sm text-slate-950">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                  <span className="text-sm text-slate-500">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                  <div className="flex gap-2">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleStepClick(index)}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          index === activeStep
                            ? "w-8 bg-blue-600"
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        )}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevelopmentProcess;
