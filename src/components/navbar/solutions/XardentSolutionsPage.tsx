"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import FooterNewsletter from "@/components/FooterNewsletter";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  FileText,
  Building2,
  BarChart3,
  Bot,
  FileSearch,
  Globe,
  Monitor,
  Cloud,
  Wrench,
  Shield,
  CheckCircle2,
} from "lucide-react";

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  capabilities?: string[];
}

interface SolutionSectionProps {
  title: string;
  description: string;
  features: FeatureItem[];
  className?: string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  title,
  description,
  features,
  className,
}) => {
  return (
    <section
      className={cn(
        "py-20 md:py-28 lg:py-32 bg-white lg:min-h-screen lg:flex lg:items-center",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="flex flex-col h-full p-6 border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <CardHeader className="p-0 pb-4">
                <div className="mb-3 p-2 w-fit rounded-lg bg-blue-50 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <CardDescription className="text-sm text-slate-600 mb-4">
                  {feature.description}
                </CardDescription>
                {feature.capabilities && (
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const XardentSolutionsPage: React.FC = () => {

  const billingSolutions: FeatureItem[] = [
    {
      id: "billing",
      icon: FileText,
      title: "Billing & Invoicing Systems",
      description:
        "We build robust billing systems designed for accuracy, compliance, and daily business use. Our solutions are suitable for small businesses, enterprises, and financial organizations.",
      capabilities: [
        "GST-ready billing & invoicing",
        "Payment tracking & reconciliation",
        "Customer & product management",
        "Reports & tax summaries",
        "Secure data handling",
      ],
    },
    {
      id: "banking",
      icon: Building2,
      title: "Banking & Financial Software",
      description:
        "Xardent develops secure and compliance-ready financial software built for reliability and trust.",
      capabilities: [
        "Transaction processing systems",
        "Role-based access & permissions",
        "Audit logs & security controls",
        "Financial reporting systems",
        "Scalable architectures for growth",
      ],
    },
    {
      id: "enterprise",
      icon: Building2,
      title: "Enterprise Business Systems",
      description:
        "We design enterprise-grade systems that streamline operations, improve productivity, and support business growth.",
      capabilities: [
        "ERP & CRM platforms",
        "Internal business tools",
        "Workflow & approval systems",
        "Department-level automation",
      ],
    },
  ];

  const technologySolutions: FeatureItem[] = [
    {
      id: "analytics",
      icon: BarChart3,
      title: "Business Analytics & Dashboards",
      description:
        "Make data-driven decisions with real-time insights. Our dashboards convert complex data into clear, actionable information.",
      capabilities: [
        "Sales & revenue dashboards",
        "Finance & operations analytics",
        "KPI tracking",
        "Custom reports for management",
      ],
    },
    {
      id: "ai",
      icon: Bot,
      title: "AI Automation Solutions",
      description:
        "We apply AI to automate repetitive processes and improve efficiency across business operations.",
      capabilities: [
        "Business process automation",
        "Smart workflows",
        "AI-assisted decision systems",
        "Chat-based automation tools",
      ],
    },
    {
      id: "ocr",
      icon: FileSearch,
      title: "Document & OCR Solutions",
      description:
        "Xardent builds AI-powered document processing systems that extract, validate, and organize data automatically.",
      capabilities: [
        "Invoice & bill scanning",
        "Data extraction from PDFs & images",
        "Document classification",
        "Financial & enterprise workflows",
      ],
    },
  ];

  const platformSolutions: FeatureItem[] = [
    {
      id: "web",
      icon: Globe,
      title: "Web & Application Platforms",
      description:
        "We create modern web platforms and applications that support business operations and customer engagement.",
      capabilities: [
        "Business websites",
        "Customer portals",
        "SaaS platforms",
        "Custom web applications",
      ],
    },
    {
      id: "desktop",
      icon: Monitor,
      title: "Desktop Software (Windows)",
      description:
        "For businesses that need performance, security, and offline access, we develop powerful Windows desktop applications.",
      capabilities: [
        "Billing & accounting software",
        "Enterprise desktop systems",
        "Internal tools & utilities",
      ],
    },
    {
      id: "cloud",
      icon: Cloud,
      title: "Cloud & System Integration",
      description:
        "We connect applications, systems, and services into one reliable ecosystem.",
      capabilities: [
        "Cloud hosting & deployment",
        "API development & integrations",
        "Third-party system syncing",
        "Secure infrastructure setup",
      ],
    },
  ];

  const supportFeatures: FeatureItem[] = [
    {
      id: "maintenance",
      icon: Wrench,
      title: "Maintenance & Long-Term Support",
      description:
        "We provide ongoing support to keep your software secure, updated, and performing at its best.",
      capabilities: [
        "Bug fixes & updates",
        "Performance monitoring",
        "Security improvements",
        "Long-term system maintenance",
      ],
    },
  ];

  const whyChooseFeatures = [
    "Real-world software experience",
    "Strong focus on billing & financial systems",
    "Secure, scalable architectures",
    "Business-first approach",
    "Reliable long-term support",
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col items-center text-center relative isolate overflow-hidden mx-auto py-24 md:py-28 lg:py-32 px-4 w-full min-h-screen">
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 md:space-y-8 px-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
            Business-Ready Solutions
          </div>

          <h1 className="text-slate-900 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
            Business-Ready Software Solutions for Real-World Operations
          </h1>

          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Xardent delivers reliable, secure, and scalable software solutions built for businesses, enterprises, and financial systems.
          </p>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
            From billing and banking software to AI automation and analytics — we build systems that work in production.
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-medium text-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
            >
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <SolutionSection
        title="Core Business Solutions"
        description="Comprehensive software systems designed for accuracy, compliance, and daily business operations"
        features={billingSolutions}
        className="border-t border-slate-200"
      />

      <SolutionSection
        title="Technology & Automation"
        description="Advanced AI and analytics solutions to drive efficiency and insights"
        features={technologySolutions}
        className="bg-white"
      />

      <SolutionSection
        title="Platform & Infrastructure"
        description="Modern platforms and cloud solutions for seamless operations"
        features={platformSolutions}
      />

      <SolutionSection
        title="Support & Maintenance"
        description="Ongoing support to keep your systems secure and performing optimally"
        features={supportFeatures}
        className="bg-white"
      />

      <section className="py-20 md:py-28 lg:py-32 bg-slate-50 border-t border-slate-200 lg:min-h-screen lg:flex lg:items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Why Businesses Choose Xardent
            </h2>
            <p className="text-lg text-slate-600">
              Production-ready software for billing, finance, analytics, and automation — built with security and scalability in mind.
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
            <Card className="lg:col-span-7 p-6 md:p-8 border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-0 pb-5">
                <CardTitle className="text-2xl md:text-3xl text-slate-900">
                  Built for real business operations
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-slate-600">
                  We don’t just build demos. We ship systems that handle daily usage, audits, and growth.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4">
                  {whyChooseFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-base md:text-lg">
                      <Shield className="h-5 w-5 md:h-6 md:w-6 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Billing & finance focus
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      GST-ready billing, reconciliations, transaction flows, and reporting.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Bot className="h-5 w-5 text-blue-600" />
                      Automation that saves time
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      AI workflows, OCR, dashboards, and smart internal tools.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-5 grid gap-6">
              <Card className="p-6 md:p-7 border-slate-200 bg-white shadow-sm">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-slate-900">What we build</CardTitle>
                  <CardDescription className="text-sm text-slate-600">
                    End-to-end systems that connect people, processes, and data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-slate-700">
                      <Building2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Banking & enterprise platforms
                    </li>
                    <li className="flex items-start text-sm text-slate-700">
                      <BarChart3 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Analytics dashboards & KPI reporting
                    </li>
                    <li className="flex items-start text-sm text-slate-700">
                      <Globe className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Web apps, customer portals & SaaS
                    </li>
                    <li className="flex items-start text-sm text-slate-700">
                      <Monitor className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Windows desktop software for operations
                    </li>
                    <li className="flex items-start text-sm text-slate-700">
                      <Cloud className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Cloud deployments & integrations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 md:p-7 border-slate-200 bg-white shadow-sm">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-slate-900">How we deliver</CardTitle>
                  <CardDescription className="text-sm text-slate-600">
                    Clear process, fast iterations, and long-term support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Discovery → UI/UX → Development → Testing → Launch → Support
                  </div>
                  <div className="mt-4 grid gap-3">
                    <div className="flex items-start text-sm text-slate-700">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Security, roles/permissions, audit logs
                    </div>
                    <div className="flex items-start text-sm text-slate-700">
                      <Wrench className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      Maintenance, updates, and improvements
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-28 lg:py-32 bg-white lg:min-h-screen lg:flex lg:items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card className="border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            <CardContent className="p-6 md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                    Let's Build a Solution That Works for Your Business
                  </h2>
                  <p className="mt-3 text-lg text-slate-600 max-w-2xl lg:max-w-none">
                    Whether you need a billing system, banking software, analytics platform, or enterprise solution — Xardent is ready to build it.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-medium text-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                    >
                      Let's Build Your Product
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <div className="text-sm text-slate-600">
                      Reply time: within 24 hours
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Discovery → UI/UX → Development → Testing → Launch → Support
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <Card className="border-slate-200 bg-white shadow-none">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-base text-slate-900">What you get</CardTitle>
                        <CardDescription className="text-sm text-slate-600">
                          Clear deliverables from day one.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            UI screens + workflow plan
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            Secure backend + database
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            Deploy + support setup
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200 bg-white shadow-none">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-base text-slate-900">Best for</CardTitle>
                        <CardDescription className="text-sm text-slate-600">
                          Teams that need real production systems.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-start">
                            <FileText className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            Billing & invoicing products
                          </li>
                          <li className="flex items-start">
                            <Building2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            Banking & finance workflows
                          </li>
                          <li className="flex items-start">
                            <BarChart3 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                            Dashboards & automation
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
};

export default XardentSolutionsPage;


