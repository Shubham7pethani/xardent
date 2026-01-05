"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HeroBackground } from "@/components/ui/hero-background";
import { FlippingCard } from "@/components/ui/flipping-card";
import FooterNewsletter from "@/components/FooterNewsletter";
import { 
  Code, 
  Globe, 
  Monitor, 
  Smartphone,
  Layers, 
  Cloud, 
  Database, 
  Shield, 
  Rocket,
  RefreshCw,
  MessageSquare,
  Building2,
  CheckCircle2,
  ArrowRight,
  Zap
} from "lucide-react";

// Glow Component
const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "top" | "above" | "bottom" | "below" | "center" }
>(({ className, variant = "top", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute w-full",
      variant === "top" && "top-0",
      variant === "above" && "-top-[128px]",
      variant === "bottom" && "bottom-0",
      variant === "below" && "-bottom-[128px]",
      variant === "center" && "top-[50%]",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_transparent_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.2)_10%,_transparent_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  features: string[];
  techStack?: string;
  backDescription: string;
  buttonText: string;
}

function ServiceCard({
  icon,
  imageSrc,
  imageAlt,
  title,
  description,
  features,
  techStack,
  backDescription,
  buttonText,
}: ServiceCardProps) {
  return (
    <div className="flex justify-center">
      <FlippingCard
        width={380}
        height={380}
        className="w-full shadow-sm"
        frontContent={
          <div className="flex h-full w-full flex-col p-4">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-36 w-full rounded-md object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.dataset.fallbackApplied === "true") return;
                img.dataset.fallbackApplied = "true";
                img.src =
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-600">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            </div>
            <p className="mt-3 text-[13.5px] text-slate-600">{description}</p>
            {techStack && (
              <div className="mt-auto pt-4">
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Tech:</span> {techStack}
                </p>
              </div>
            )}
          </div>
        }
        backContent={
          <div className="flex h-full w-full flex-col p-6">
            <p className="text-[13.5px] text-slate-600">{backDescription}</p>
            <ul className="mt-4 space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto bg-slate-900 text-white px-4 py-2 rounded-md text-[13.5px] w-min whitespace-nowrap h-9 flex items-center justify-center">
              {buttonText}
            </button>
          </div>
        }
      />
    </div>
  );
}

// Why Choose Section
interface WhyChooseItemProps {
  title: string;
  description: string;
}

function WhyChooseItem({ title, description }: WhyChooseItemProps) {
  return (
    <Card className="group relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14)_0%,transparent_60%)]" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10)_0%,transparent_60%)]" />
        </div>

        <div className="relative flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="mb-2 text-base font-semibold text-slate-900 sm:text-lg">{title}</h4>
            <p className="text-sm text-slate-600 sm:text-base">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          y: isHovered ? -6 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-8 overflow-hidden"
        style={{
          boxShadow: isHovered
            ? "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <motion.div
          animate={{
            rotate: isHovered ? 8 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary"
        >
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-xl bg-primary/30 blur-xl"
          />
          {icon}
        </motion.div>

        <div className="relative mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2 relative inline-block">
            {title}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.4 }}
            />
          </h3>
        </div>

        <p className="text-muted-foreground leading-relaxed">{description}</p>

        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const XardentTrustSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1]);

  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Business-Driven Engineering",
      description:
        "We deeply understand your business goals before writing a single line of code. Every solution is built to improve efficiency, revenue, and long-term growth — not just to 'look good.'",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Enterprise Experience in Financial Systems",
      description:
        "From billing platforms to secure banking-grade applications, we build compliant, high-performance systems trusted for accuracy, security, and scalability.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure, Scalable & Future-Proof",
      description:
        "Our architecture is designed for today's needs and tomorrow's growth — ensuring performance, data security, and seamless scalability as your business expands.",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "End-to-End Product Ownership",
      description:
        "From idea validation and design to development, deployment, and maintenance — Xardent handles the entire lifecycle so you can focus on your business.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Clear Communication & On-Time Delivery",
      description:
        "No confusion. No delays. We follow transparent processes, provide regular updates, and deliver exactly what we promise — on time, every time.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-background via-background to-accent/5 py-24 px-4 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div style={{ opacity, scale }} className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Leading Businesses Trust Xardent
            </motion.h2>

            <motion.svg
              width="100%"
              height="20"
              viewBox="0 0 300 20"
              className="mx-auto"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <motion.path
                d="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary"
              />
            </motion.svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-6"
          >
            We don't just build software — we engineer scalable digital systems that help
            businesses grow, secure, and lead their industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Main Development Page Component
export function XardentDevelopmentPage() {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.remove("section-bg-dark");

    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.__xardentSectionBlackActive) {
      w.__xardentSectionBlackActive = new Set();
    }
  }, []);

  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Web Application Development",
      title: "Web Application Development",
      description: "We build modern, fast, and scalable web applications using the latest technologies. From simple business websites to complex full-stack platforms, our solutions are designed for performance, security, and long-term growth.",
      backDescription:
        "From landing pages to full-stack SaaS platforms, we deliver fast, SEO-friendly, and secure web apps built to scale.",
      buttonText: "Learn More",
      features: [
        "Business & corporate websites",
        "Admin dashboards & panels",
        "Customer portals",
        "SaaS web platforms",
        "Internal business tools"
      ],
      techStack: "React, Next.js, full-stack architectures"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Mobile App Development",
      title: "Mobile App Development (Android & iOS)",
      description: "We build high-quality mobile applications for Android and iOS with smooth performance, great UX, and scalable architecture. From MVP apps to production-ready products, we handle everything end-to-end.",
      backDescription:
        "Launch a polished mobile app with clean UX, solid architecture, and reliable releases on Play Store and App Store.",
      buttonText: "Learn More",
      features: [
        "Android & iOS app development",
        "Flutter / React Native cross-platform apps",
        "API integration & real-time features",
        "App Store & Play Store deployment",
        "Performance, security & analytics setup"
      ],
      techStack: "Flutter, React Native, Firebase, REST APIs"
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Desktop Application Development",
      title: "Desktop Application Development (Windows)",
      description: "Xardent develops powerful Windows desktop applications for businesses that need speed, offline access, and system-level performance. Perfect for billing, accounting, and enterprise software.",
      backDescription:
        "Fast, reliable Windows applications designed for offline workflows, hardware integrations, and enterprise performance.",
      buttonText: "Learn More",
      features: [
        "Billing & invoicing software",
        "Accounting systems",
        "Inventory & POS systems",
        "Internal enterprise tools"
      ]
    },
    {
      icon: <Code className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Custom Software Development",
      title: "Custom Software Development",
      description: "Every business is different. We create fully customized software solutions tailored to your exact workflow, business logic, and growth plans.",
      backDescription:
        "Build software that fits your business perfectly — automate operations, reduce manual work, and enable growth.",
      buttonText: "Learn More",
      features: [
        "Business automation",
        "Custom CRM / ERP systems",
        "Workflow management tools",
        "Industry-specific software"
      ]
    },
    {
      icon: <Layers className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      imageAlt: "SaaS Product Development",
      title: "SaaS Product Development",
      description: "We help you turn your idea into a scalable SaaS product. From MVP development to full production-ready platforms, Xardent supports your product at every stage.",
      backDescription:
        "Ship an MVP fast, then scale with strong architecture, subscriptions, roles, and analytics built-in.",
      buttonText: "Learn More",
      features: [
        "MVP development",
        "Subscription-based systems",
        "User management & roles",
        "Scalable backend architecture"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Enterprise & Banking Software Solutions",
      title: "Enterprise & Banking Software Solutions",
      description: "We specialize in secure, reliable, and compliance-ready enterprise software. Our banking and financial systems are built with strict security, role-based access, and performance in mind.",
      backDescription:
        "Security-first systems for finance and enterprise — built for compliance, reliability, and role-based control.",
      buttonText: "Learn More",
      features: [
        "Banking & finance software",
        "Billing & payment systems",
        "Role-based access systems",
        "Compliance-ready applications"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
      imageAlt: "API & Backend Development",
      title: "API & Backend Development",
      description: "Strong backends power great software. We develop secure APIs and backend systems that connect applications, databases, and third-party services smoothly.",
      backDescription:
        "Reliable APIs and backend systems that scale — clean architecture, secure auth, and smooth integrations.",
      buttonText: "Learn More",
      features: [
        "REST & custom APIs",
        "Database architecture",
        "Third-party integrations",
        "Secure authentication systems"
      ]
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      imageSrc:
        "https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Cloud & Deployment Services",
      title: "Cloud & Deployment Services",
      description: "We deploy and manage software on scalable cloud infrastructure, ensuring reliability, performance, and smooth updates.",
      backDescription:
        "Go live confidently with cloud setup, CI/CD, monitoring, and performance optimization for smooth releases.",
      buttonText: "Learn More",
      features: [
        "Cloud hosting & setup",
        "CI/CD pipelines",
        "Performance optimization",
        "Secure deployment strategies"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center snap-start">
        <HeroBackground />

        <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center">
          <Badge
            variant="outline"
            className="mb-6 gap-2 border-white/40 bg-white/70 px-4 py-2 text-sm text-slate-800 shadow-sm backdrop-blur sm:text-base"
          >
            <Zap className="h-3 w-3" />
            <span>Built for startups, enterprises, and fast-growing businesses</span>
          </Badge>
          
          <h1 className="mb-7 text-4xl font-bold leading-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-7xl">
            Custom Software Development That Scales With Your Business
          </h1>
          
          <p className="mx-auto mb-12 max-w-3xl text-lg text-slate-600 sm:text-xl">
            At Xardent, we design and develop secure, high-performance software solutions — from business websites and mobile apps to enterprise-grade billing and banking systems.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 rounded-full bg-blue-600 px-10 text-base text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 sm:text-lg"
            >
              Let's Build Your Product
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-300 bg-white px-10 text-base text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 sm:text-lg"
            >
              View Our Work
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm sm:text-base">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Production-ready delivery
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm sm:text-base">
              <Shield className="h-4 w-4 text-blue-600" />
              Secure by design
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm sm:text-base">
              <Zap className="h-4 w-4 text-blue-600" />
              Fast iterations
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 sm:py-24 min-h-screen flex items-center snap-start bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Development Services
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Comprehensive software development solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      <XardentTrustSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32 min-h-screen flex items-center snap-start bg-white">
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Let's Build Your Software Solution
          </h2>
          
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-600 sm:text-xl">
            Whether you need a website, application, billing system, or enterprise software — Xardent is ready to build it for you.
          </p>

          <div className="mx-auto mb-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Fast kickoff:</span> clear scope, timeline, and deliverables in the first call.
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Weekly updates:</span> you always know what’s done and what’s next.
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Secure builds:</span> best practices for authentication, data, and deployments.
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Scalable architecture:</span> designed for growth, speed, and maintainability.
              </div>
            </div>
          </div>

          <div className="mx-auto mb-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Launch Faster</h3>
              <p className="text-sm text-slate-600">
                MVP to production with clean delivery milestones and quick iterations.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Enterprise-Ready</h3>
              <p className="text-sm text-slate-600">
                Reliability, security, and performance built in from day one.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Clear Communication</h3>
              <p className="text-sm text-slate-600">
                No confusion—transparent updates, priorities, and delivery tracking.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 rounded-full bg-blue-600 px-10 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowRight className="h-5 w-5" />
              Let's Build Your Product
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-300 bg-white px-10 text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}

export default function DevelopmentPageDemo() {
  return <XardentDevelopmentPage />;
}

