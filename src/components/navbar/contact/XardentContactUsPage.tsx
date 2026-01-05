"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { HeroBackground } from "@/components/ui/hero-background";
import FooterNewsletter from "@/components/FooterNewsletter";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building,
  ArrowRight,
  CheckCircle,
  FileText,
  Briefcase,
  Globe,
  Code,
  Bot,
  BarChart3,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface EngagementStep {
  title: string;
  description: string;
}

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    icon: FileText,
    title: "Billing & Financial Software",
    description:
      "GST billing, invoicing, accounting, payment tracking, and secure financial systems designed for accuracy and compliance.",
  },
  {
    icon: Briefcase,
    title: "Banking & Enterprise Systems",
    description:
      "Transaction systems, role-based access platforms, audit-ready software, and enterprise-grade applications.",
  },
  {
    icon: Globe,
    title: "Web & Application Development",
    description:
      "Business websites, web applications, SaaS platforms, and internal portals built for performance and scalability.",
  },
  {
    icon: Code,
    title: "Desktop Software (Windows)",
    description:
      "High-performance desktop applications for billing, accounting, and enterprise operations.",
  },
  {
    icon: Bot,
    title: "AI & Automation Solutions",
    description:
      "Process automation, document AI, OCR systems, and smart workflows to reduce manual effort.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Dashboards",
    description:
      "Business dashboards, reporting systems, KPIs, and decision-making analytics.",
  },
  {
    icon: Cloud,
    title: "System Integration & Cloud Setup",
    description:
      "API development, cloud deployment, third-party integrations, and system synchronization.",
  },
  {
    icon: Wrench,
    title: "Long-Term Support & Maintenance",
    description:
      "Ongoing updates, monitoring, performance optimization, and security support.",
  },
];

const engagementSteps: EngagementStep[] = [
  {
    title: "Understand Your Requirements",
    description: "We listen to your business goals, workflows, and challenges.",
  },
  {
    title: "Propose the Right Solution",
    description: "Clear technical approach, timelines, and scope.",
  },
  {
    title: "Build & Deliver",
    description: "Secure, scalable, and production-ready software.",
  },
  {
    title: "Support & Scale",
    description: "Long-term maintenance and future improvements.",
  },
];

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "contact@xardent.com",
    link: "mailto:contact@xardent.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    value: "San Francisco, CA",
    link: "#location",
  },
];

const whoWeWorkWith = [
  "Business owners & founders",
  "Enterprises & financial institutions",
  "Startups building production-ready systems",
  "Companies modernizing legacy software",
];

const whyChooseUs = [
  "Real-world experience in billing & financial software",
  "Enterprise-grade security & scalability",
  "Business-first development approach",
  "Clear communication & reliable delivery",
  "Long-term partnership mindset",
];

export function XardentContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-[100svh] flex items-center py-24 sm:py-28">
        <HeroBackground />

        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-8" variants={fadeInUp}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Let's Connect</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Let's Build Software That Works
              <br />
              <span className="text-primary">for Your Business</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              Talk to Xardent about your software needs — from billing and
              financial systems to enterprise platforms, AI automation, and
              analytics solutions.
            </p>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              We partner with businesses to design, build, and maintain reliable
              software for real-world operations.
            </p>

            <Button size="lg" className="text-lg px-8">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-28 sm:py-32 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Whether you're planning a new system or improving an existing one,
              our team is ready to understand your requirements and recommend
              the right solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Engagement Approach */}
      <section className="py-28 sm:py-32 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              How We Work With You
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-slate-200 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {engagementSteps.map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4 relative z-10 ring-4 ring-white">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Who We Work With & Why Choose Us */}
      <section className="py-28 sm:py-32 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8">Who Contacts Xardent?</h2>
              <ul className="space-y-4">
                {whoWeWorkWith.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8">Why Choose Xardent?</h2>
              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 sm:py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Start a Conversation With Xardent
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              If you're planning a software project or need expert guidance, our
              team is ready to help you move forward with confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="p-8 border-slate-200 bg-white shadow-sm">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              className={`pl-10 ${
                                errors.name ? "border-destructive" : ""
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Email Address"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className={`pl-10 ${
                                errors.email ? "border-destructive" : ""
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="company"
                            type="text"
                            placeholder="Company"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell us about your project</Label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-slate-400" />
                          <Textarea
                            id="message"
                            placeholder="Tell us about your project..."
                            rows={6}
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            className={`pl-10 resize-none ${
                              errors.message ? "border-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-slate-600 text-lg mb-6">
                        Thank you for reaching out. We'll get back to you within
                        24 hours.
                      </p>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            company: "",
                            message: "",
                          });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Contact Methods */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-6">
                Other ways to reach us
              </h3>

              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="p-6 border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">
                          {method.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-1">
                          {method.description}
                        </p>
                        <p className="font-medium">{method.value}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </Card>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="min-h-[100svh] flex items-center py-20 sm:py-24 bg-white border-t border-slate-200">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how Xardent can help you
            achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </section>

      <FooterNewsletter />
    </div>
  );
}

export default function XardentContactUsDemo() {
  return <XardentContactUs />;
}
