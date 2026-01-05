import React from "react";
import {
  FiBarChart2,
  FiCloud,
  FiCreditCard,
  FiFileText,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

interface ServicesOverviewProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "Banking Software Development",
    description: "Enterprise-grade banking solutions",
    features: ["Core banking systems", "Payment & transaction modules", "Secure APIs & integrations"],
    icon: <FiCreditCard className="h-8 w-8" />,
  },
  {
    id: 2,
    title: "Billing & Accounting Software",
    description: "Automated financial management",
    features: [
      "Automated billing systems",
      "Invoice & GST-ready solutions",
      "Enterprise finance tools",
    ],
    icon: <FiFileText className="h-8 w-8" />,
  },
  {
    id: 3,
    title: "SaaS Product Development",
    description: "Scalable cloud-native applications",
    features: ["Custom SaaS platforms", "Multi-tenant architecture", "Scalable cloud solutions"],
    icon: <FiCloud className="h-8 w-8" />,
  },
  {
    id: 4,
    title: "Data Analytics & BI",
    description: "Intelligent business insights",
    features: ["Business dashboards", "Data insights & reporting", "Decision-driven analytics"],
    icon: <FiBarChart2 className="h-8 w-8" />,
  },
  {
    id: 5,
    title: "SEO & Growth Optimization",
    description: "Digital growth strategies",
    features: [
      "Website SEO",
      "Ranking & performance optimization",
      "Conversion-focused strategies",
    ],
    icon: <FiTrendingUp className="h-8 w-8" />,
  },
  {
    id: 6,
    title: "Security & Compliance",
    description: "Enterprise security solutions",
    features: ["Security audits & testing", "Compliance management", "Data protection systems"],
    icon: <FiShield className="h-8 w-8" />,
  },
];

const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  title = "Our Core Services",
  subtitle = "End-to-end digital solutions designed for scale, security, and growth.",
  services = defaultServices,
}) => {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-slate-600 md:text-xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-950 md:text-2xl">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>

              <ul className="mt-5 space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-600">
                    <span className="mr-2 mt-1 text-blue-600">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
