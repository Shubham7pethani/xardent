"use client"

import React, { useRef } from "react"
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Globe,
  Users,
  Target,
  Monitor, 
  DollarSign, 
  Building2, 
  Brain, 
  BarChart3, 
  Cloud,
  CheckCircle2,
  Shield,
  TrendingUp,
  Wrench,
  MessageSquare,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeroBackground } from '@/components/ui/hero-background'
import FooterNewsletter from "@/components/FooterNewsletter"

interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`min-h-[100svh] flex items-center py-20 md:py-24 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          {subtitle ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                {subtitle}
              </span>
            </motion.div>
          ) : null}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-slate-900"
          >
            {title}
          </motion.h2>
        </div>
        {children}
      </div>
    </motion.section>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  delay?: number
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <span className="font-medium text-slate-900">{title}</span>
    </motion.div>
  )
}

interface ValueItemProps {
  icon: React.ReactNode
  title: string
  delay?: number
}

const ValueItem: React.FC<ValueItemProps> = ({ icon, title, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <span className="text-slate-700">{title}</span>
    </motion.div>
  )
}

const AboutHeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden min-h-[100svh]"
    >
      <HeroBackground />
      
      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center w-full min-h-[100svh] flex flex-col pt-24 md:pt-28 pb-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] text-slate-900">
              Building Software That Powers{" "}
              <span className="text-primary">Real Businesses</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-lg sm:text-xl md:text-2xl text-slate-600"
          >
            At Xardent, we design and develop software systems that help businesses operate efficiently, securely, and at scale.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 text-base sm:text-lg md:text-xl text-slate-600"
          >
            From billing systems to enterprise platforms and AI automation, we turn business requirements into reliable technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="gap-2 text-base md:text-lg px-8">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="pt-10"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
              <CardContent className="p-5 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">Built for real operations</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Software that works daily for billing, finance, and workflows.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
              <CardContent className="p-5 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">Security-first delivery</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Roles, access control, and safe handling of sensitive data.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
              <CardContent className="p-5 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">Production-ready results</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Clean architecture, deployment readiness, and handover support.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const WhoWeAreSection: React.FC = () => {
  return (
    <Section title="Who We Are" subtitle="WHO WE ARE">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl space-y-6 text-center text-lg text-slate-600"
      >
        <p>
          Xardent is a technology-driven software company specializing in custom software, enterprise systems, and digital solutions.
        </p>
        <p>
          We work with businesses that need dependable software — not just good design, but systems that work every day in real operations.
        </p>
        <p className="font-semibold text-slate-900">
          We focus on long-term value, system stability, and business growth.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Target className="h-6 w-6" />
            </div>
            <div className="text-sm font-semibold text-slate-900">Business-first execution</div>
            <div className="mt-2 text-xs text-slate-600">
              Built for daily operations, not just demos.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-sm font-semibold text-slate-900">Secure by design</div>
            <div className="mt-2 text-xs text-slate-600">
              Roles, access control, and safe data handling.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-sm font-semibold text-slate-900">Designed to scale</div>
            <div className="mt-2 text-xs text-slate-600">
              Architecture that grows with your business.
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

const WhatWeDoSection: React.FC = () => {
  const services = [
    { icon: <Code2 className="h-5 w-5" />, title: "Custom Software Development" },
    { icon: <Globe className="h-5 w-5" />, title: "Web & Application Development" },
    { icon: <Monitor className="h-5 w-5" />, title: "Windows Desktop Software" },
    { icon: <DollarSign className="h-5 w-5" />, title: "Billing & Financial Software" },
    { icon: <Building2 className="h-5 w-5" />, title: "Enterprise Systems (ERP, CRM, Workflows)" },
    { icon: <Brain className="h-5 w-5" />, title: "AI & Automation Solutions" },
    { icon: <BarChart3 className="h-5 w-5" />, title: "Data Analytics & Business Dashboards" },
    { icon: <Cloud className="h-5 w-5" />, title: "System Integration & Cloud Setup" },
  ]

  return (
    <Section title="What We Do" subtitle="WHAT WE DO" className="bg-white">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            icon={service.icon}
            title={service.title}
            delay={index * 0.1}
          />
        ))}
      </div>
    </Section>
  )
}

const OurApproachSection: React.FC = () => {
  const values = [
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Practical",
      description: "Focused on real business workflows — not theory.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure",
      description: "Access control and safe handling for sensitive data.",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Scalable",
      description: "Architecture that grows with your team and usage.",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Easy to maintain",
      description: "Clean code, clear structure, and smooth handover.",
    },
  ]

  return (
    <Section title="Our Approach" subtitle="OUR APPROACH">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-lg text-slate-600"
        >
          We believe software should be:
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-4 min-w-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    {value.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-slate-900 break-words">
                      {value.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 leading-relaxed break-words">
                      {value.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-slate-600 max-w-3xl mx-auto"
        >
          Every project starts with understanding business requirements, followed by careful system design, clean development, and long-term support.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Clarity
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Clear scope, milestones, and delivery checkpoints.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <Shield className="h-5 w-5 text-primary" />
                Reliability
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Stable systems designed for real workflows.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <Wrench className="h-5 w-5 text-primary" />
                Maintainability
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Clean code + handover for long-term success.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}

const OurProcessSection: React.FC = () => {
  const steps = [
    { number: "1", title: "Business & requirement analysis", icon: <Users className="h-5 w-5" /> },
    { number: "2", title: "System planning & architecture", icon: <Code2 className="h-5 w-5" /> },
    { number: "3", title: "Development & testing", icon: <CheckCircle2 className="h-5 w-5" /> },
    { number: "4", title: "Deployment & handover", icon: <Cloud className="h-5 w-5" /> },
    { number: "5", title: "Support, updates & scaling", icon: <Wrench className="h-5 w-5" /> },
  ]

  return (
    <Section title="How We Work" subtitle="OUR PROCESS" className="bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-full"
              >
                <Card className="h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center min-w-0">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {step.number}
                    </div>
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      {step.icon}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 leading-snug break-words">
                      {step.title}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Clear scope</div>
                  <div className="text-xs text-slate-600">We define milestones before build starts.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Security checks</div>
                  <div className="text-xs text-slate-600">Access control + safe data practices.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Performance</div>
                  <div className="text-xs text-slate-600">Built to stay fast as you scale.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Confidentiality</div>
                  <div className="text-xs text-slate-600">NDA-friendly, privacy-first execution.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}

const WhyXardentSection: React.FC = () => {
  const reasons = [
    { icon: <Users className="h-5 w-5" />, title: "Business-first mindset" },
    { icon: <Code2 className="h-5 w-5" />, title: "Clean and scalable code" },
    { icon: <Lock className="h-5 w-5" />, title: "Secure systems & data protection" },
    { icon: <MessageSquare className="h-5 w-5" />, title: "Transparent communication" },
    { icon: <TrendingUp className="h-5 w-5" />, title: "Long-term partnership approach" },
  ]

  return (
    <Section title="Why Choose Xardent" subtitle="WHY XARDENT">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-4 min-w-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    {reason.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 break-words">
                      {reason.title}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-lg font-medium text-slate-900"
        >
          We don't just deliver software — we support businesses as they grow.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Transparent delivery
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Clear updates and predictable timelines.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <Shield className="h-5 w-5 text-primary" />
                Enterprise mindset
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Quality checks and stable architecture.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <Wrench className="h-5 w-5 text-primary" />
                After-launch care
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Support and improvements as you scale.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}

const TrustSection: React.FC = () => {
  return (
    <Section title="Client Trust & Confidentiality" subtitle="TRUST & CONFIDENTIALITY" className="bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl space-y-6 text-center text-lg text-slate-600"
      >
        <p>
          We respect client privacy and confidentiality. Many of our projects are internal, enterprise, or business-critical systems that cannot be publicly disclosed in detail.
        </p>
        <p className="font-semibold text-slate-900">
          This ensures long-term trust and security.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 font-semibold text-slate-900">
              <Lock className="h-5 w-5 text-primary" />
              NDA-friendly delivery
            </div>
            <p className="mt-2 text-sm text-slate-600">
              We can share outcomes and workflows without exposing sensitive client information.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 font-semibold text-slate-900">
              <Shield className="h-5 w-5 text-primary" />
              Security practices
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Role-based access, audit trails, and safe handling for business-critical data.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

const CTASection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section ref={ref} className="min-h-[100svh] flex items-center py-20 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border border-slate-200 bg-white p-8 md:p-12 text-center shadow-sm">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-slate-900">
              Let's Build Something Reliable Together
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Whether you're starting a new system or upgrading existing software, Xardent is ready to help you build technology that lasts.
            </p>
            <Button size="lg" className="gap-2">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

const AboutPageComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeroSection />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <OurApproachSection />
      <OurProcessSection />
      <WhyXardentSection />
      <TrustSection />
      <CTASection />
      <FooterNewsletter />
    </div>
  )
}

export default function Demo() {
  return <AboutPageComponent />
}

