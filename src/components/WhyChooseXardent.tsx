"use client";

import React from "react";
import { easeOut, motion } from "framer-motion";
import { FiAward, FiHeadphones, FiLock, FiShield, FiUsers } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface CrossPatternCardProps {
  children: React.ReactNode;
  className?: string;
  patternClassName?: string;
  gradientClassName?: string;
}

function CrossPatternCard({
  children,
  className,
  patternClassName,
  gradientClassName,
}: CrossPatternCardProps) {
  return (
    <motion.div
      className={cn(
        "border w-full rounded-2xl overflow-hidden",
        "bg-white",
        "border-slate-200",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={cn(
          "size-full bg-repeat",
          "[background-size:95px_95px]",
          "[background-image:linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)]",
          patternClassName
        )}
      >
        <div
          className={cn(
            "size-full bg-gradient-to-tr",
            "from-white via-white/[0.93] to-white",
            gradientClassName
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

interface ReasonItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface WhyChooseXardentProps {
  reasons?: ReasonItem[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  className?: string;
}

const defaultReasons: ReasonItem[] = [
  {
    id: "secure-scalable",
    icon: FiShield,
    title: "Secure & Scalable Architecture",
    description:
      "Built with enterprise-grade security protocols and designed to scale seamlessly with your business growth, ensuring your data remains protected at every stage.",
  },
  {
    id: "banking-grade",
    icon: FiLock,
    title: "Banking-Grade Software Standards",
    description:
      "We adhere to the highest industry standards with rigorous testing, compliance certifications, and security measures that meet banking-level requirements.",
  },
  {
    id: "custom-built",
    icon: FiAward,
    title: "Custom-Built (No Templates)",
    description:
      "Every solution is crafted from scratch to match your unique business needs. No cookie-cutter templates—just tailored software that fits your vision perfectly.",
  },
  {
    id: "experienced-team",
    icon: FiUsers,
    title: "Experienced Development Team",
    description:
      "Our seasoned developers bring years of expertise across diverse industries, delivering innovative solutions backed by proven methodologies and best practices.",
  },
  {
    id: "long-term-support",
    icon: FiHeadphones,
    title: "Long-Term Support & Growth",
    description:
      "We're committed to your success beyond launch. Our dedicated support team ensures continuous optimization, updates, and strategic guidance as your business evolves.",
  },
];

const WhyChooseXardent: React.FC<WhyChooseXardentProps> = ({
  reasons = defaultReasons,
  sectionTitle = "Why Businesses Choose Xardent",
  sectionSubtitle =
    "Trusted by forward-thinking companies for reliable, scalable, and secure software solutions",
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      className={cn(
        "w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8",
        "bg-gradient-to-b from-white via-slate-50 to-white",
        className
      )}
      role="region"
      aria-label="Why Choose Xardent"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">{sectionSubtitle}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className={cn(
                index === reasons.length - 1 && reasons.length % 3 === 2
                  ? "md:col-span-2 lg:col-span-1"
                  : "",
                index === reasons.length - 1 &&
                  reasons.length % 2 === 1 &&
                  reasons.length % 3 !== 2
                  ? "md:col-span-2 lg:col-span-3"
                  : ""
              )}
            >
              <CrossPatternCard className="h-full">
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <motion.div
                    className="mb-4 p-3 w-fit rounded-xl bg-blue-600/10 text-blue-700 border border-blue-600/20"
                    whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <reason.icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-3 flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>{reason.title}</span>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </div>
              </CrossPatternCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-slate-600 mb-4">
            Join hundreds of satisfied clients who trust Xardent for their software needs
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-blue-600/15 border border-blue-600/25"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseXardent;
