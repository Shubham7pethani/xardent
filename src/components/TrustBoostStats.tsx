"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  easeOut,
  motion,
  useInView,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiBriefcase, FiCalendar, FiHeart, FiShield } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(countRef, { once: false, amount: 0.6 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className={cn(
        "group flex flex-col items-center rounded-2xl border border-slate-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      )}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: easeOut },
        },
      }}
    >
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-700 transition-colors duration-300 group-hover:bg-blue-600/20"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>

      <div
        ref={countRef}
        className="flex items-center text-5xl font-bold tracking-tight text-slate-950"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>

      <p className="mt-2 text-base font-medium text-slate-600">{label}</p>

      <div className="mt-4 h-1 w-12 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-20" />
    </motion.div>
  );
}

interface TrustBoostStatsProps {
  stats?: Array<{
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix: string;
  }>;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

function TrustBoostStats({
  stats = [
    { icon: <FiCalendar className="h-8 w-8" />, value: 5, label: "Years Experience", suffix: "+" },
    {
      icon: <FiBriefcase className="h-8 w-8" />,
      value: 10,
      label: "Successful Projects",
      suffix: "+",
    },
    { icon: <FiHeart className="h-8 w-8" />, value: 92, label: "Client Satisfaction", suffix: "%" },
    {
      icon: <FiShield className="h-8 w-8" />,
      value: 8,
      label: "Long-Term Partnerships",
      suffix: "+",
    },
  ],
  title = "Why Choose Us",
  subtitle = "TRUST & EXCELLENCE",
  description =
    "We deliver exceptional results backed by years of experience and a commitment to client satisfaction.",
  className,
}: TrustBoostStatsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={cn("w-full overflow-hidden px-4 py-20", className)}
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="mb-16 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.span
            className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.span>

          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h2>

          <motion.div
            className="h-1 w-24 rounded-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-600"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default TrustBoostStats;
