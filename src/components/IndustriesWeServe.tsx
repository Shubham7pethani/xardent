import React from "react";
import {
  FiBriefcase,
  FiHome,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface IndustriesWeServeProps {
  title?: string;
  subtitle?: string;
  industries?: Industry[];
}

const defaultIndustries: Industry[] = [
  {
    id: "1",
    name: "Banking & FinTech",
    icon: <FiHome className="h-12 w-12" />,
    description: "Secure financial solutions for modern banking",
  },
  {
    id: "2",
    name: "Enterprises & Corporates",
    icon: <FiUsers className="h-12 w-12" />,
    description: "Scalable systems for large organizations",
  },
  {
    id: "3",
    name: "Startups & SaaS Companies",
    icon: <FiTrendingUp className="h-12 w-12" />,
    description: "Agile solutions for rapid growth",
  },
  {
    id: "4",
    name: "E-Commerce & Retail",
    icon: <FiShoppingCart className="h-12 w-12" />,
    description: "Seamless shopping experiences",
  },
  {
    id: "5",
    name: "Service-Based Businesses",
    icon: <FiBriefcase className="h-12 w-12" />,
    description: "Streamlined operations and client management",
  },
];

const IndustriesWeServe: React.FC<IndustriesWeServeProps> = ({
  title = "Industries We Empower",
  subtitle = "Banking clients trust companies that already understand their domain",
  industries = defaultIndustries,
}) => {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/35 hover:shadow-lg"
            >
              <div className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-xl transition-all duration-300 group-hover:bg-blue-600/20" />
                  <div className="relative text-blue-700 transition-transform duration-300 group-hover:scale-110">
                    {industry.icon}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
                  {industry.name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {industry.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-6 py-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            <p className="text-sm font-medium text-slate-950">
              Trusted by industry leaders across multiple sectors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
