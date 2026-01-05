"use client";

import * as React from "react";
import { FiArrowRight, FiShield, FiZap } from "react-icons/fi";
import { cn } from "@/lib/utils";

type GradientButtonVariant = "default" | "secondary";

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GradientButtonVariant;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "gradient-button",
          "inline-flex items-center justify-center gap-2",
          "rounded-[11px] min-w-[180px] px-9 py-4",
          "text-base leading-[19px] font-bold text-white",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "secondary" ? "gradient-button-variant" : "",
          className
        )}
        {...props}
      />
    );
  }
);

GradientButton.displayName = "GradientButton";

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const CallToActionSection = ({
  title = "Custom Banking & SaaS Software, Built the Right Way",
  subtitle =
    "We design and develop secure banking systems, intelligent billing software, scalable SaaS platforms, and data-driven solutions tailored to your business needs.",
  primaryButtonText = "Talk to Experts",
  secondaryButtonText = "Request a Consultation",
  onPrimaryClick = () => console.log("Primary button clicked"),
  onSecondaryClick = () => console.log("Secondary button clicked"),
  className,
}: CallToActionProps) => {
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  return (
    <section className={cn("relative overflow-hidden px-6 py-24", className)}>
      <style jsx global>{`
        @property --pos-x {
          syntax: '<percentage>';
          initial-value: 11.14%;
          inherits: false;
        }

        @property --pos-y {
          syntax: '<percentage>';
          initial-value: 140%;
          inherits: false;
        }

        @property --spread-x {
          syntax: '<percentage>';
          initial-value: 150%;
          inherits: false;
        }

        @property --spread-y {
          syntax: '<percentage>';
          initial-value: 180.06%;
          inherits: false;
        }

        @property --color-1 {
          syntax: '<color>';
          initial-value: #000;
          inherits: false;
        }

        @property --color-2 {
          syntax: '<color>';
          initial-value: #08012c;
          inherits: false;
        }

        @property --color-3 {
          syntax: '<color>';
          initial-value: #4e1e40;
          inherits: false;
        }

        @property --color-4 {
          syntax: '<color>';
          initial-value: #70464e;
          inherits: false;
        }

        @property --color-5 {
          syntax: '<color>';
          initial-value: #88394c;
          inherits: false;
        }

        @property --border-angle {
          syntax: '<angle>';
          initial-value: 20deg;
          inherits: true;
        }

        @property --border-color-1 {
          syntax: '<color>';
          initial-value: hsla(340, 75%, 60%, 0.2);
          inherits: true;
        }

        @property --border-color-2 {
          syntax: '<color>';
          initial-value: hsla(340, 75%, 40%, 0.75);
          inherits: true;
        }

        @property --stop-1 {
          syntax: '<percentage>';
          initial-value: 37.35%;
          inherits: false;
        }

        @property --stop-2 {
          syntax: '<percentage>';
          initial-value: 61.36%;
          inherits: false;
        }

        @property --stop-3 {
          syntax: '<percentage>';
          initial-value: 78.42%;
          inherits: false;
        }

        @property --stop-4 {
          syntax: '<percentage>';
          initial-value: 89.52%;
          inherits: false;
        }

        @property --stop-5 {
          syntax: '<percentage>';
          initial-value: 100%;
          inherits: false;
        }

        .gradient-button {
          position: relative;
          appearance: none;
          cursor: pointer;
          background: radial-gradient(
            var(--spread-x) var(--spread-y) at var(--pos-x) var(--pos-y),
            var(--color-1) var(--stop-1),
            var(--color-2) var(--stop-2),
            var(--color-3) var(--stop-3),
            var(--color-4) var(--stop-4),
            var(--color-5) var(--stop-5)
          );
          transition:
            --pos-x 0.5s,
            --pos-y 0.5s,
            --spread-x 0.5s,
            --spread-y 0.5s,
            --color-1 0.5s,
            --color-2 0.5s,
            --color-3 0.5s,
            --color-4 0.5s,
            --color-5 0.5s,
            --border-angle 0.5s,
            --border-color-1 0.5s,
            --border-color-2 0.5s,
            --stop-1 0.5s,
            --stop-2 0.5s,
            --stop-3 0.5s,
            --stop-4 0.5s,
            --stop-5 0.5s;
        }

        .gradient-button::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            var(--border-angle),
            var(--border-color-1),
            var(--border-color-2)
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
        }

        .gradient-button:hover {
          --pos-x: 0%;
          --pos-y: 91.51%;
          --spread-x: 120.24%;
          --spread-y: 103.18%;
          --color-1: #c96287;
          --color-2: #c66c64;
          --color-3: #cc7d23;
          --color-4: #37140a;
          --color-5: #000;
          --border-angle: 190deg;
          --border-color-1: hsla(340, 78%, 90%, 0.1);
          --border-color-2: hsla(340, 75%, 90%, 0.6);
          --stop-1: 0%;
          --stop-2: 8.8%;
          --stop-3: 21.44%;
          --stop-4: 71.34%;
          --stop-5: 85.76%;
        }

        .gradient-button-variant {
          --color-1: #000022;
          --color-2: #1f3f6d;
          --color-3: #469396;
          --color-4: #f1ffa5;
          --border-angle: 200deg;
          --border-color-1: hsla(320, 75%, 90%, 0.6);
          --border-color-2: hsla(320, 50%, 90%, 0.15);
        }

        .gradient-button-variant:hover {
          --pos-x: 0%;
          --pos-y: 95.51%;
          --spread-x: 110.24%;
          --spread-y: 110.2%;
          --color-1: #000020;
          --color-2: #f1ffa5;
          --color-3: #469396;
          --color-4: #1f3f6d;
          --color-5: #000;
          --stop-1: 0%;
          --stop-2: 10%;
          --stop-3: 35.44%;
          --stop-4: 71.34%;
          --stop-5: 90.76%;
          --border-angle: 210deg;
          --border-color-1: hsla(320, 75%, 90%, 0.2);
          --border-color-2: hsla(320, 50%, 90%, 0.75);
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/70 to-transparent" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur-sm">
            <FiShield className="h-4 w-4 text-blue-700" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
              SECURE • SCALABLE • CUSTOM-BUILT
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
            <GradientButton
              onClick={onPrimaryClick}
              onMouseEnter={() => setHoveredButton("primary")}
              onMouseLeave={() => setHoveredButton(null)}
              className="group"
            >
              <FiZap className="h-5 w-5" />
              {primaryButtonText}
              <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </GradientButton>

            <GradientButton
              variant="secondary"
              onClick={onSecondaryClick}
              onMouseEnter={() => setHoveredButton("secondary")}
              onMouseLeave={() => setHoveredButton(null)}
              className="group"
            >
              <FiShield className="h-5 w-5" />
              {secondaryButtonText}
              <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </GradientButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Secure & Confidential Discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Custom Solutions (No Templates)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Long-Term Technical Support</span>
            </div>
          </div>

          <div className="hidden">{hoveredButton}</div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
