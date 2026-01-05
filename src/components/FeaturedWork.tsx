import * as React from "react";
import { FiArrowRight } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Banking Dashboard UI",
    category: "Financial Technology",
    description:
      "A modern, intuitive banking dashboard with real-time analytics, transaction tracking, and comprehensive financial management tools.",
    image: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Billing Management System",
    category: "Enterprise Software",
    description:
      "Streamlined billing and invoice management platform with automated workflows, payment processing, and detailed reporting capabilities.",
    image: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "3",
    title: "SaaS Admin Panel",
    category: "Cloud Platform",
    description:
      "Comprehensive admin dashboard for SaaS applications featuring user management, analytics, and system configuration tools.",
    image: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-01.png",
    tags: ["Vue.js", "Node.js", "MongoDB"],
  },
];

interface FeaturedWorkProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

function FeaturedWork({
  title = "Our Work",
  subtitle =
    "Explore our collection of innovative solutions and cutting-edge technologies designed to transform your business.",
  projects = defaultProjects,
}: FeaturedWorkProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-base text-slate-600 md:text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs font-medium text-slate-950 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-slate-950 transition-colors group-hover:text-blue-700">
                  {project.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-blue-700 transition-all group-hover:gap-2">
                  View Case Study
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
