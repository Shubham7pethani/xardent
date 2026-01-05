"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Brain, 
  FileText, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeroBackground } from "@/components/ui/hero-background";
import FooterNewsletter from "@/components/FooterNewsletter";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface FeatureCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onDragOver"> {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, children }, ref) => {
    const cardVariants = {
      offscreen: {
        y: 30,
        opacity: 0,
      },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          bounce: 0.4,
          duration: 0.8,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8",
          className
        )}
      >
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-slate-600">{description}</p>
        </div>
        <div className="mt-6">{children}</div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
      {icon}
    </div>
    <p className="text-sm text-slate-600 pt-2">{text}</p>
  </div>
);

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
      {icon}
    </div>
    <p className="text-sm text-slate-900">{text}</p>
  </div>
);

export function XardentDataAIPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative isolate overflow-hidden py-32">
        <HeroBackground />
        <div className="container mx-auto overflow-hidden">
          <div className="mb-20 flex flex-col items-center gap-6 text-center">
            <Badge variant="outline" className="border-slate-300 text-slate-700 bg-white">Data & AI Solutions</Badge>
            <h1 className="text-4xl font-semibold lg:text-5xl max-w-4xl text-slate-900">
              Turn Your Data Into Intelligent Business Decisions
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Xardent helps businesses unlock the power of data and artificial intelligence to gain insights, automate processes, and build smarter software solutions.
            </p>
            <p className="text-sm text-slate-500 max-w-2xl">
              From analytics dashboards to AI-powered automation — we make data work for you.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-screen-xl">
            <img
              src="/images/data%26ai.png"
              alt="Data Analytics Dashboard"
              className="aspect-video max-h-[500px] w-full rounded-xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(rgba(15,23,42,0.1)_1px,transparent_1px)]"></div>
            <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(rgba(15,23,42,0.1)_1px,transparent_1px)]"></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              title="Data Analytics & Business Dashboards"
              description="We transform raw business data into clear, actionable insights. Our analytics solutions help you track performance, understand trends, and make confident decisions."
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">What we deliver</h4>
                <div className="grid grid-cols-1 gap-4">
                  <FeatureItem icon={<BarChart3 className="h-5 w-5 text-blue-600" />} text="Interactive dashboards" />
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="Business reports & insights" />
                  <FeatureItem icon={<TrendingUp className="h-5 w-5 text-blue-600" />} text="KPI tracking systems" />
                  <FeatureItem icon={<BarChart3 className="h-5 w-5 text-blue-600" />} text="Sales, finance & operations analytics" />
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-3">Best for</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Management & decision makers</Badge>
                    <Badge variant="secondary">Growing businesses</Badge>
                    <Badge variant="secondary">Data-driven teams</Badge>
                  </div>
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              title="AI-Powered Applications"
              description="We build intelligent applications that use AI to automate tasks, improve user experience, and enhance decision-making."
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">Use cases</h4>
                <div className="grid grid-cols-1 gap-4">
                  <FeatureItem icon={<Brain className="h-5 w-5 text-blue-600" />} text="Chat-based AI systems" />
                  <FeatureItem icon={<Users className="h-5 w-5 text-blue-600" />} text="Smart assistants for apps & websites" />
                  <FeatureItem icon={<Zap className="h-5 w-5 text-blue-600" />} text="AI-driven automation tools" />
                  <FeatureItem icon={<TrendingUp className="h-5 w-5 text-blue-600" />} text="Intelligent recommendation systems" />
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              title="Document & Image AI Solutions"
              description="Xardent develops AI solutions that understand documents and images, enabling faster data extraction and automation."
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">Capabilities</h4>
                <div className="grid grid-cols-1 gap-4">
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="OCR (text extraction from images & PDFs)" />
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="Invoice & bill processing" />
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="Document classification" />
                  <FeatureItem icon={<BarChart3 className="h-5 w-5 text-blue-600" />} text="Image-based data analysis" />
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-3">Perfect for</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Billing & accounting software</Badge>
                    <Badge variant="secondary">Banking & financial systems</Badge>
                    <Badge variant="secondary">Business automation</Badge>
                  </div>
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              title="AI-Driven Process Automation"
              description="We automate repetitive and manual business processes using AI, scripts, and smart workflows — saving time and reducing human error."
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">Automate</h4>
                <div className="grid grid-cols-1 gap-4">
                  <FeatureItem icon={<Zap className="h-5 w-5 text-blue-600" />} text="Data entry & validation" />
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="Report generation" />
                  <FeatureItem icon={<FileText className="h-5 w-5 text-blue-600" />} text="Document workflows" />
                  <FeatureItem icon={<Zap className="h-5 w-5 text-blue-600" />} text="Internal business processes" />
                </div>
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-slate-900">Why Use Data & AI Solutions?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitItem icon={<TrendingUp className="h-5 w-5 text-blue-600" />} text="Faster and better decision-making" />
              <BenefitItem icon={<Zap className="h-5 w-5 text-blue-600" />} text="Reduced manual work" />
              <BenefitItem icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />} text="Improved business efficiency" />
              <BenefitItem icon={<Users className="h-5 w-5 text-blue-600" />} text="Smarter customer experiences" />
              <BenefitItem icon={<TrendingUp className="h-5 w-5 text-blue-600" />} text="Scalable and future-ready systems" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-slate-900">Why Xardent?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitItem icon={<Brain className="h-5 w-5 text-blue-600" />} text="Practical AI solutions (not just buzzwords)" />
              <BenefitItem icon={<BarChart3 className="h-5 w-5 text-blue-600" />} text="Strong experience with business & billing data" />
              <BenefitItem icon={<Shield className="h-5 w-5 text-blue-600" />} text="Secure and scalable AI systems" />
              <BenefitItem icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />} text="Custom solutions built for real business needs" />
              <BenefitItem icon={<Users className="h-5 w-5 text-blue-600" />} text="End-to-end support from planning to deployment" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6 text-slate-900">Build Smarter Systems With Data & AI</h2>
            <p className="text-lg text-slate-600 mb-8">
              Whether you want business analytics, AI automation, or intelligent software — Xardent is ready to help you transform your data into results.
            </p>
            <Button size="lg" className="gap-2">
              Let's Build Your Product
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}

export default function DataAIPageDemo() {
  return <XardentDataAIPage />;
}

