"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeroBackground } from '@/components/ui/hero-background';
import FooterNewsletter from "@/components/FooterNewsletter";
import { 
  FileText, 
  DollarSign, 
  Building2, 
  BarChart3, 
  Bot, 
  Monitor,
  Shield,
  CheckCircle2,
  ArrowRight,
  Lock,
  Code,
  Zap,
  FileCheck,
  Headphones
} from 'lucide-react';

interface ProjectFeature {
  title: string;
  items: string[];
}

interface ProjectImpact {
  items: string[];
}

interface Project {
  id: string;
  number: string;
  title: string;
  industry: string;
  overview: string;
  features: string[];
  impact: string[];
  icon: React.ElementType;
  color: string;
}

interface ProcessStep {
  number: string;
  title: string;
  icon: React.ElementType;
}

interface Standard {
  icon: React.ElementType;
  title: string;
}

const WorkProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '01',
      number: '01',
      title: 'GST Billing & Accounting System',
      industry: 'Retail & Services',
      overview: 'A complete GST-compliant billing and accounting system designed for daily business operations.',
      features: [
        'Invoice & tax calculation',
        'Customer & product management',
        'GST reports & summaries',
        'Secure user roles & permissions'
      ],
      impact: [
        'Reduced billing errors',
        'Faster invoice generation',
        'Clear financial visibility'
      ],
      icon: FileText,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: '02',
      number: '02',
      title: 'Financial Transaction Management Platform',
      industry: 'Finance / Banking Operations',
      overview: 'A secure backend platform to manage transactions, records, and financial reporting.',
      features: [
        'Transaction tracking & validation',
        'Audit logs & access control',
        'Financial dashboards',
        'Secure API architecture'
      ],
      impact: [
        'Improved data security',
        'Transparent transaction history',
        'Better financial control'
      ],
      icon: DollarSign,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: '03',
      number: '03',
      title: 'Enterprise Workflow & CRM System',
      industry: 'Enterprise / Corporate',
      overview: 'A custom enterprise system to manage internal workflows, approvals, and client interactions.',
      features: [
        'CRM & lead tracking',
        'Role-based workflows',
        'Internal task management',
        'Reporting & insights'
      ],
      impact: [
        'Increased team efficiency',
        'Organized business processes',
        'Centralized data access'
      ],
      icon: Building2,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: '04',
      number: '04',
      title: 'Business Analytics & Dashboard Suite',
      industry: 'Multi-Industry',
      overview: 'A data analytics platform that converts raw business data into actionable insights.',
      features: [
        'Real-time dashboards',
        'KPI & performance tracking',
        'Custom reports',
        'Data visualization'
      ],
      impact: [
        'Better decision-making',
        'Clear business insights',
        'Reduced manual reporting'
      ],
      icon: BarChart3,
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: '05',
      number: '05',
      title: 'AI-Powered Document Automation',
      industry: 'Operations & Administration',
      overview: 'An AI solution to automate document processing and data extraction.',
      features: [
        'OCR & document parsing',
        'Automated data extraction',
        'Workflow automation',
        'Secure data handling'
      ],
      impact: [
        'Reduced manual work',
        'Faster processing time',
        'Improved accuracy'
      ],
      icon: Bot,
      color: 'from-indigo-500/20 to-blue-500/20'
    },
    {
      id: '06',
      number: '06',
      title: 'Windows Desktop Billing Software',
      industry: 'Small & Medium Businesses',
      overview: 'A high-performance Windows desktop application for billing and accounting.',
      features: [
        'Offline support',
        'Fast invoice generation',
        'Secure local storage',
        'Export & backup options'
      ],
      impact: [
        'Reliable daily operations',
        'Smooth performance',
        'Low training required'
      ],
      icon: Monitor,
      color: 'from-teal-500/20 to-cyan-500/20'
    }
  ];

  const standards: Standard[] = [
    { icon: Code, title: 'Clean, scalable architecture' },
    { icon: Shield, title: 'Secure authentication & access control' },
    { icon: Zap, title: 'Production-ready deployment' },
    { icon: FileCheck, title: 'Documentation & handover' },
    { icon: Headphones, title: 'Post-launch support' }
  ];

  const processSteps: ProcessStep[] = [
    { number: '01', title: 'Requirement & business analysis', icon: FileText },
    { number: '02', title: 'System design & planning', icon: Code },
    { number: '03', title: 'Development & testing', icon: Zap },
    { number: '04', title: 'Deployment & handover', icon: CheckCircle2 },
    { number: '05', title: 'Ongoing support & scaling', icon: Headphones }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-slate-200 min-h-[100svh] flex items-center">
        <HeroBackground />
        <div className="container mx-auto px-4 py-20 md:py-24 lg:py-28 flex items-center">
          <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 w-full">
            <Badge variant="outline" className="mb-6">
              Our Work
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] md:leading-[1.08] text-slate-900">
              <span className="block">Software Projects Built for</span>
              <span className="mt-2 block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Real Business Use
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto pt-1">
              Xardent designs, develops, and maintains production-ready software systems used by businesses for billing, finance, operations, analytics, and automation.
            </p>
            <p className="text-sm text-slate-600">
              Each project is built with scalability, security, and long-term usage in mind.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Button
                size="lg"
                className="gap-2 text-lg px-8"
                onClick={() => {
                  document
                    .getElementById('featured-projects')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 text-lg px-8">
                <Link href="/contact">Talk to Experts</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4">
              <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
                <CardContent className="p-5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <FileText className="w-5 h-5 text-primary" />
                    Billing Systems
                  </div>
                  <p className="mt-1 text-sm text-slate-600">GST-ready invoicing, accounts, and reporting.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
                <CardContent className="p-5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Finance Platforms
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Transactions, audit logs, and secure access control.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
                <CardContent className="p-5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Dashboards & KPIs
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Real-time analytics and business insights.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
                <CardContent className="p-5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Bot className="w-5 h-5 text-primary" />
                    AI Automation
                  </div>
                  <p className="mt-1 text-sm text-slate-600">OCR + workflows that reduce manual work.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-projects" className="min-h-[100svh] flex items-center py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-600">Production software systems powering real businesses</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Card 
                  key={project.id}
                  className="group transition-shadow duration-300 cursor-pointer border-slate-200 bg-white shadow-sm hover:shadow-md"
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Project {project.number}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {project.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      {project.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Key Features
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedProject === project.id && (
                      <div className="pt-4 border-t border-slate-200 animate-in slide-in-from-top-2">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          Impact
                        </h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {project.impact.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* Confidentiality Notice */}
      <section className="bg-slate-50 border-y border-slate-200 min-h-[100svh] flex items-center py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Client Privacy & Confidentiality
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Many of our billing, finance, and enterprise systems are built under NDA. We protect client data — while still sharing what matters about our work.
              </p>
            </div>

            <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 lg:items-start">
              <Card className="lg:col-span-7 border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl">Why some details are not public</CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">
                    We showcase projects at a high level without exposing client-specific information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-600">
                    For financial workflows, billing operations, and internal enterprise tools, privacy is part of the product. Our approach keeps systems secure and partnerships long-term.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <FileCheck className="w-5 h-5 text-primary" />
                        What we can share
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          Architecture, modules, and workflows
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          Feature lists and business outcomes
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          Screens with demo/mock data
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Shield className="w-5 h-5 text-primary" />
                        How we protect you
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          Access control, roles, audit logs
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          Secure APIs + safe data handling
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          NDA-first communication
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/contact">Talk to Experts</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        document
                          .getElementById('featured-projects')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      View Projects
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-5 grid gap-6">
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">For regulated & high-stakes systems</CardTitle>
                    <CardDescription className="text-slate-600">
                      Ideal when you handle money, invoices, or sensitive operations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start">
                        <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                        Finance workflows with strict controls
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                        Billing systems with reporting & compliance
                      </li>
                      <li className="flex items-start">
                        <Building2 className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                        Enterprise tools with role-based access
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Support beyond launch</CardTitle>
                    <CardDescription className="text-slate-600">
                      We maintain, improve, and scale what we build.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Headphones className="w-5 h-5 text-primary mt-0.5" />
                      <p className="text-sm text-slate-700">
                        You get ongoing maintenance, monitoring guidance, and feature improvements — so the system stays reliable as your business grows.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Standards */}
      <section className="min-h-[100svh] flex items-center py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-14">
              <Badge variant="outline" className="mb-4">
                Quality Standards
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Every Xardent Project Includes
              </h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Built for long-term use — with clean architecture, production readiness, and support that lasts beyond launch.
              </p>
            </div>

            <div className="grid gap-10">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
                {standards.map((standard, idx) => {
                  const Icon = standard.icon;
                  return (
                    <Card
                      key={idx}
                      className="h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center gap-4 min-h-[168px] min-w-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 leading-snug break-words">
                          {standard.title}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-3 items-stretch">
                <Card className="h-full border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <Code className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="min-w-0 break-words">Architecture you can scale</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words">
                      Modular codebase, clear boundaries, and clean handover for future teams.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="min-w-0 break-words">Security-first by default</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words">
                      Access control, audit-friendly workflows, and safe handling for sensitive business data.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <Headphones className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="min-w-0 break-words">Support that scales</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words">
                      Post-launch improvements, monitoring guidance, and long-term maintenance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="min-w-0 break-words">Delivery checklist (what you receive)</span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-start gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 break-words">Project documentation</div>
                        <div className="text-xs text-slate-600 break-words">Setup, usage flows, and maintenance notes.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 min-w-0">
                      <Code className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 break-words">Clean source code</div>
                        <div className="text-xs text-slate-600 break-words">Readable structure with scalable modules.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 min-w-0">
                      <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 break-words">Production deployment plan</div>
                        <div className="text-xs text-slate-600 break-words">Release checklist and go-live support.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 min-w-0">
                      <Headphones className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 break-words">Post-launch support</div>
                        <div className="text-xs text-slate-600 break-words">Bug fixes, improvements, and scaling guidance.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section id="work-process" className="bg-white border-t border-slate-200 min-h-[100svh] flex items-center py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Projects Move from Idea to Production</h2>
              <p className="text-slate-600">Our proven development process</p>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative">
                    <Card className="text-center border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 pb-6">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold">
                          {step.number}
                        </div>
                        <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-900">{step.title}</p>
                      </CardContent>
                    </Card>
                    {idx < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Separator className="my-10" />

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Clear scope & milestones
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    You get a planned roadmap with delivery checkpoints — so you always know what comes next.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Shield className="w-5 h-5 text-primary" />
                    Testing & reliability
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    We validate critical flows, protect sensitive data, and keep performance stable in production.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Headphones className="w-5 h-5 text-primary" />
                    Handover + support
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Documentation, deployment help, and post-launch support so your system stays healthy.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">Talk to Experts</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  document
                    .getElementById('featured-projects')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[100svh] flex items-center py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="pt-12 pb-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Have a Project in Mind?</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Whether you need a billing system, enterprise platform, AI automation, or analytics solution — Xardent is ready to build software that works in the real world.
                </p>
                <Button size="lg" className="gap-2 text-lg px-8">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
};

export default WorkProjectsPage;

