"use client";

import { FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

const footerColumns = [
  {
    title: "Services",
    links: [
      "Banking Software Development",
      "Billing & Accounting Systems",
      "SaaS Product Development",
      "Data Analytics & BI",
      "SEO & Performance Optimization",
      "Custom Web & Mobile Apps",
    ],
  },
  {
    title: "Why Xardent",
    links: [
      "Secure & Scalable Architecture",
      "Industry-Focused Solutions",
      "Custom-Built (No Templates)",
      "Transparent Process",
      "Long-Term Support",
    ],
  },
  {
    title: "Company",
    links: ["About Xardent", "Our Work", "Careers", "Contact Us", "Partnerships"],
  },
];

const legalLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Settings",
  "Accessibility",
];

const socialIcons = [
  { icon: <FiInstagram className="h-5 w-5" />, href: "#" },
  { icon: <FiTwitter className="h-5 w-5" />, href: "#" },
  { icon: <FiLinkedin className="h-5 w-5" />, href: "#" },
  { icon: <FiYoutube className="h-5 w-5" />, href: "#" },
];

export default function FooterNewsletter() {
  return (
    <footer className="bg-white text-slate-900 relative w-full pt-20 pb-10">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Build Smarter Software with Xardent
              </h3>
              <p className="text-slate-600 mb-6">
                Get insights on banking systems, SaaS development, data analytics,
                and business automation—straight from our experts.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-slate-200 bg-white focus:ring-primary rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                />
                <button className="bg-primary text-white shadow-primary/20 hover:shadow-primary/30 rounded-lg px-6 py-3 font-medium shadow-lg transition">
                  Get in Touch
                </button>
              </div>
            </div>

            <div className="hidden justify-end md:flex">
              <div className="relative">
                <div className="relative">
                  <div className="relative w-80 overflow-hidden rounded-xl">
                    <iframe
                      title="Mumbai Office Map"
                      src="https://www.google.com/maps?q=Shop%20no.%206%2C%20bldg%202C%2C%20Hariom%20Chs%20Ltd.%2C%20Kanyapada%2C%20Near%20Maharaja%20Tower%2C%20Goregaon%20East%2C%20Mumbai%20400063%20India&output=embed"
                      className="relative h-[240px] w-80 rounded-xl"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className="pointer-events-none absolute left-3 bottom-3 right-3">
                      <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
                        <p className="text-sm font-semibold">Head Office</p>
                        <p className="text-slate-600 text-xs">
                          Shop no. 6, bldg 2C, Hariom Chs Ltd., Kanyapada, Near
                          Maharaja Tower, Goregaon East, Mumbai 400063 India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center space-x-2">
              <img className="h-8 w-8" src="/images/logo.svg" alt="Xardent logo" />
              <span className="text-xl font-bold">Xardent</span>
            </div>

            <p className="text-slate-600 mb-6">
              Empowering businesses with secure banking software, intelligent
              billing systems, scalable SaaS platforms, and data-driven solutions
              built for long-term growth.
            </p>

            <div className="flex space-x-4">
              {socialIcons.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-lg font-semibold">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-slate-900 transition whitespace-nowrap"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-slate-200 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-slate-600 mb-4 text-sm md:mb-0">
            © 2025 Xardent. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((text) => (
              <a
                key={text}
                href="#"
                className="text-slate-600 hover:text-slate-900 text-sm"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
