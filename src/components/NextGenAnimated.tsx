"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  className?: string;
}

function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  className,
}: FlipTextProps) {
  const framerProps: Variants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  return (
    <div className="flex justify-center space-x-2">
      <AnimatePresence mode="wait">
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("origin-center drop-shadow-sm", className)}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface NextGenAnimatedProps {
  text?: string;
  className?: string;
}

export function NextGenAnimated({ text = "Next-Gen", className }: NextGenAnimatedProps) {
  const charDuration = 0.5;
  const charDelayMultiple = 0.08;
  const underlineVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Start underline only after the last character flip has finished
  const underlineDelay = (text.length - 1) * charDelayMultiple + charDuration + 0.1;

  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-2", className)}>
      <div className="relative">
        <div className="flex">
          <FlipText
            word={text}
            duration={charDuration}
            delayMultiple={charDelayMultiple}
            className="text-inherit font-inherit tracking-inherit"
          />
        </div>

        <motion.svg
          width="100%"
          height="28"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="absolute -bottom-6 left-0 w-full text-slate-900"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M 0,12 Q 25,4 50,12 Q 75,20 100,12"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            variants={underlineVariants}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: underlineDelay,
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}
