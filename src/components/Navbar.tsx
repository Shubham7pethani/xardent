"use client";
import React from "react";
import { motion, type Transition } from "framer-motion";
import { TextScramble } from "@/components/TextScramble";
import Link from "next/link";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function Navbar() {
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [active, setActive] = React.useState<string | null>(null);
  const [megaTab, setMegaTab] = React.useState<"design" | "development" | "dataAI" | "seoGrowth">(
    "development"
  );
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [brandScrambleTrigger, setBrandScrambleTrigger] = React.useState(0);
  const [isShrunk, setIsShrunk] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    const setDropdownTopVar = () => {
      const header = headerRef.current;
      if (!header) return;
      const desktop = window.innerWidth > 980;
      setIsDesktop(desktop);
      if (!desktop) return;
      const r = header.getBoundingClientRect();
      const top = Math.round(r.bottom + 10);
      header.style.setProperty("--xd-dropdown-top", `${top}px`);
    };

    setDropdownTopVar();
    window.addEventListener("scroll", setDropdownTopVar, { passive: true });
    window.addEventListener("resize", setDropdownTopVar);
    return () => {
      window.removeEventListener("scroll", setDropdownTopVar);
      window.removeEventListener("resize", setDropdownTopVar);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active]);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const shouldShrink = y > 40;

      setIsShrunk((prev) => (prev === shouldShrink ? prev : shouldShrink));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const panelTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : transition;

  return (
    <header
      className={`xd-header${isShrunk ? " xd-header--shrunk" : ""}`}
      data-xd-navbar
      ref={headerRef}
    >
      <div className="xd-container">
        <Link
          className="xd-brand"
          href="/"
          onMouseEnter={() => setBrandScrambleTrigger(1)}
          onMouseLeave={() => setBrandScrambleTrigger(0)}
        >
          <img className="xd-logo" src="/images/logo.svg" alt="Xardent logo" />
          <span className="xd-brandText" aria-label="Xardent">
            <TextScramble
              trigger={brandScrambleTrigger}
              as="span"
              className="xd-brandName"
            >
              Xardent
            </TextScramble>
          </span>
        </Link>

        <nav className="xd-nav" aria-label="Primary" data-xd-nav ref={dropdownRef}>
          <ul className="xd-menu" role="menubar">
            <li
              className="xd-item xd-hasDropdown xd-item--mega"
              role="none"
              data-open={active === "Services" ? "true" : "false"}
            >
              <button
                className="xd-link"
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={active === "Services" ? "true" : "false"}
                onMouseEnter={() => setActive("Services")}
                onClick={() =>
                  setActive((cur) => (cur === "Services" ? null : "Services"))
                }
              >
                Services
                <span className="xd-caret" aria-hidden="true"></span>
              </button>

              {active === "Services" && (
                <motion.div
                  className="xd-dropdown xd-dropdown--mega"
                  role="menu"
                  aria-label="Services"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={panelTransition}
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    visibility: "visible",
                    transition: "none",
                  }}
                  transformTemplate={({ y, scale }) => {
                    if (!isDesktop) return `translateY(${y}) scale(${scale})`;
                    return `translate(-50%, ${y}) scale(${scale})`;
                  }}
                >
                  <div className="xd-mega">
                      <div
                        className="xd-megaLeft"
                        role="tablist"
                        aria-label="Service categories"
                      >
                        <button
                          className={`xd-megaTab${
                            megaTab === "design" ? " is-active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={megaTab === "design" ? "true" : "false"}
                          onMouseEnter={() => setMegaTab("design")}
                          onClick={() => setMegaTab("design")}
                        >
                          Design
                        </button>
                        <button
                          className={`xd-megaTab${
                            megaTab === "development" ? " is-active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={
                            megaTab === "development" ? "true" : "false"
                          }
                          onMouseEnter={() => setMegaTab("development")}
                          onClick={() => setMegaTab("development")}
                        >
                          Development
                        </button>
                        <button
                          className={`xd-megaTab${
                            megaTab === "dataAI" ? " is-active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={megaTab === "dataAI" ? "true" : "false"}
                          onMouseEnter={() => setMegaTab("dataAI")}
                          onClick={() => setMegaTab("dataAI")}
                        >
                          Data &amp; AI
                        </button>
                        <button
                          className={`xd-megaTab${
                            megaTab === "seoGrowth" ? " is-active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={megaTab === "seoGrowth" ? "true" : "false"}
                          onMouseEnter={() => setMegaTab("seoGrowth")}
                          onClick={() => setMegaTab("seoGrowth")}
                        >
                          SEO &amp; Digital Growth
                        </button>

                        <a className="xd-megaAll" href="/contact">
                          <span>Let&apos;s Build Your Product</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-megaCenter">
                        <div
                          className={`xd-megaPanel${
                            megaTab === "design" ? " is-active" : ""
                          }`}
                          role="tabpanel"
                          data-xd-mega-panel="design"
                        >
                          <div className="xd-megaCols">
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/design">
                                  UI / UX Design
                                </a>
                                <div className="text-xs text-slate-500">Web apps, dashboards, admin panels, SaaS products</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/design">
                                  Product Design (SaaS & Enterprise)
                                </a>
                                <div className="text-xs text-slate-500">From idea → wireframes → final UI</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/design">
                                  Design Systems
                                </a>
                                <div className="text-xs text-slate-500">Scalable component systems (Figma + dev-ready)</div>
                              </div>
                            </div>
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/design">
                                  UX Audit & Optimization
                                </a>
                                <div className="text-xs text-slate-500">Improve usability, conversion, clarity</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/design">
                                  Prototyping & Wireframing
                                </a>
                                <div className="text-xs text-slate-500">Clickable prototypes before development</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`xd-megaPanel${
                            megaTab === "development" ? " is-active" : ""
                          }`}
                          role="tabpanel"
                          data-xd-mega-panel="development"
                        >
                          <div className="xd-megaCols">
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  Web Application Development
                                </a>
                                <div className="text-xs text-slate-500">React, Next.js, full-stack web apps</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  Custom Software Development
                                </a>
                                <div className="text-xs text-slate-500">Business software, internal tools, automation</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  SaaS Product Development
                                </a>
                                <div className="text-xs text-slate-500">MVP to scalable SaaS platforms</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  Enterprise & Banking Systems
                                </a>
                                <div className="text-xs text-slate-500">Secure, role-based, compliance-ready systems</div>
                              </div>
                            </div>
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  Desktop Applications (Windows)
                                </a>
                                <div className="text-xs text-slate-500">High-performance desktop software</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  API & Backend Development
                                </a>
                                <div className="text-xs text-slate-500">Secure APIs, databases, integrations</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/development">
                                  Cloud & Deployment
                                </a>
                                <div className="text-xs text-slate-500">Scalable hosting, CI/CD, performance tuning</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`xd-megaPanel${
                            megaTab === "dataAI" ? " is-active" : ""
                          }`}
                          role="tabpanel"
                          data-xd-mega-panel="dataAI"
                        >
                          <div className="xd-megaCols">
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/data-ai">
                                  Data Analytics & Dashboards
                                </a>
                                <div className="text-xs text-slate-500">Business insights, reports, KPIs</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/data-ai">
                                  AI-Powered Applications
                                </a>
                                <div className="text-xs text-slate-500">Intelligent systems, automation, chat-based AI</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/data-ai">
                                  Document & Image AI Solutions
                                </a>
                                <div className="text-xs text-slate-500">OCR, data extraction, AI processing</div>
                              </div>
                            </div>
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/data-ai">
                                  Process Automation
                                </a>
                                <div className="text-xs text-slate-500">Reduce manual work using AI & scripts</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`xd-megaPanel${
                            megaTab === "seoGrowth" ? " is-active" : ""
                          }`}
                          role="tabpanel"
                          data-xd-mega-panel="seoGrowth"
                        >
                          <div className="xd-megaCols">
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/seo-growth">
                                  Technical SEO
                                </a>
                                <div className="text-xs text-slate-500">Speed, structure, performance optimization</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/seo-growth">
                                  On-Page SEO
                                </a>
                                <div className="text-xs text-slate-500">Content, keywords, site architecture</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/seo-growth">
                                  Website Optimization
                                </a>
                                <div className="text-xs text-slate-500">Conversion & performance improvements</div>
                              </div>
                            </div>
                            <div className="xd-megaCol">
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/seo-growth">
                                  Search Ranking Improvement
                                </a>
                                <div className="text-xs text-slate-500">Long-term organic growth</div>
                              </div>
                              
                              <div className="xd-megaItem">
                                <a className="xd-megaLink" href="/services/seo-growth">
                                  Analytics & Tracking Setup
                                </a>
                                <div className="text-xs text-slate-500">Google Analytics, Search Console, insights</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="xd-megaRight" aria-label="Work samples">
                        <div className="xd-megaMedia">
                          <div className="xd-megaStack">
                            <div className="xd-megaImg" data-xd-image="1">
                              <img
                                src="/images/xr-billing.png"
                                alt="Billing software UI"
                              />
                            </div>
                            <div className="xd-megaImg" data-xd-image="2">
                              <img
                                src="/images/snappingo.png"
                                alt="Mobile app UI"
                              />
                            </div>
                          </div>
                          <div
                            className="xd-megaImg xd-megaImg--big"
                            data-xd-image="3"
                          >
                            <img
                              src="/images/cbs.png"
                              alt="Banking software UI"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xd-megaFooter">
                      <span className="xd-megaFooterText">
                        Want to develop your digital product? Let&apos;s connect!
                      </span>
                      <a className="xd-megaContact" href="#">
                        CONTACT US
                      </a>
                    </div>
                </motion.div>
              )}
            </li>

            <li
              className="xd-item xd-hasDropdown"
              role="none"
              data-open={active === "Solutions" ? "true" : "false"}
            >
              <button
                className="xd-link"
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={active === "Solutions" ? "true" : "false"}
                onMouseEnter={() => setActive("Solutions")}
                onClick={() =>
                  setActive((cur) => (cur === "Solutions" ? null : "Solutions"))
                }
              >
                Solutions
                <span className="xd-caret" aria-hidden="true"></span>
              </button>
              {active === "Solutions" && (
                <motion.div
                  className="xd-dropdown xd-dropdown--dark"
                  role="menu"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={panelTransition}
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    visibility: "visible",
                    transition: "none",
                  }}
                  transformTemplate={({ y, scale }) => {
                    if (!isDesktop) return `translateY(${y}) scale(${scale})`;
                    return `translate(-50%, ${y}) scale(${scale})`;
                  }}
                >
                  <div className="xd-dark">
                      <div className="xd-darkIntro">
                        <div className="xd-darkTitle">Solutions</div>
                        <div className="xd-darkText">
                          Business-ready software solutions built for real-world operations.
                        </div>

                        <a className="xd-megaAll" href="/solutions">
                          <span>Explore Solutions</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Billing &amp; Invoicing Systems
                              </a>
                              <div className="text-xs text-slate-400">GST-ready billing, invoices, payments, reports</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Banking &amp; Financial Software
                              </a>
                              <div className="text-xs text-slate-400">Secure transaction systems, role-based access, compliance-ready platforms</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Enterprise Business Systems
                              </a>
                              <div className="text-xs text-slate-400">ERP, CRM, internal tools, workflow management</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Business Analytics &amp; Dashboards
                              </a>
                              <div className="text-xs text-slate-400">Sales, finance &amp; operations insights in real time</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                AI Automation Solutions
                              </a>
                              <div className="text-xs text-slate-400">Process automation, AI workflows, smart business tools</div>
                            </div>
                          </div>
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Document &amp; OCR Solutions
                              </a>
                              <div className="text-xs text-slate-400">Invoice scanning, data extraction, document processing</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Web &amp; Application Platforms
                              </a>
                              <div className="text-xs text-slate-400">Business websites, portals, SaaS &amp; custom platforms</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Desktop Software (Windows)
                              </a>
                              <div className="text-xs text-slate-400">Billing, accounting &amp; enterprise desktop applications</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/solutions">
                                Cloud &amp; System Integration
                              </a>
                              <div className="text-xs text-slate-400">Hosting, APIs, third-party integrations, system syncing</div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Maintenance &amp; Support
                              </a>
                              <div className="text-xs text-slate-400">Updates, monitoring, performance &amp; long-term support</div>
                            </div>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Ready-to-use and custom-built software solutions for businesses, enterprises, and financial systems.
                          </span>
                          <a className="xd-megaContact" href="/solutions">
                            Explore Solutions
                          </a>
                        </div>
                      </div>
                    </div>
                </motion.div>
              )}
            </li>

            <li
              className="xd-item xd-hasDropdown"
              role="none"
              data-open={active === "Contact Us" ? "true" : "false"}
            >
              <button
                className="xd-link"
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={active === "Contact Us" ? "true" : "false"}
                onMouseEnter={() => setActive("Contact Us")}
                onClick={() =>
                  setActive((cur) => (cur === "Contact Us" ? null : "Contact Us"))
                }
              >
                Contact Us
                <span className="xd-caret" aria-hidden="true"></span>
              </button>
              {active === "Contact Us" && (
                <motion.div
                  className="xd-dropdown xd-dropdown--dark"
                  role="menu"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={panelTransition}
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    visibility: "visible",
                    transition: "none",
                  }}
                  transformTemplate={({ y, scale }) => {
                    if (!isDesktop) return `translateY(${y}) scale(${scale})`;
                    return `translate(-50%, ${y}) scale(${scale})`;
                  }}
                >
                  <div className="xd-dark">
                      <div className="xd-darkIntro">
                        <div className="xd-darkTitle">Contact Us</div>
                        <div className="xd-darkText">
                          Talk to our team about your software requirements — from billing systems to enterprise and AI-powered solutions.
                        </div>

                        <a className="xd-megaAll" href="#">
                          <span>Start Your Project</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Custom Software Development
                              </a>
                              <div className="text-xs text-slate-400">
                                End-to-end software development for billing, banking &amp; enterprise systems
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Billing &amp; Financial Software
                              </a>
                              <div className="text-xs text-slate-400">
                                GST billing, accounting, finance &amp; secure transaction systems
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Enterprise Application Solutions
                              </a>
                              <div className="text-xs text-slate-400">
                                ERP, CRM, internal tools &amp; workflow management systems
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                AI &amp; Automation Solutions
                              </a>
                              <div className="text-xs text-slate-400">
                                Process automation, document AI &amp; smart business workflows
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Data Analytics &amp; Dashboards
                              </a>
                              <div className="text-xs text-slate-400">
                                Business insights, reporting &amp; decision-making dashboards
                              </div>
                            </div>
                          </div>
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Web &amp; Application Development
                              </a>
                              <div className="text-xs text-slate-400">
                                Web apps, portals, SaaS &amp; business platforms
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="/contact">
                                Desktop Software (Windows)
                              </a>
                              <div className="text-xs text-slate-400">
                                Billing, accounting &amp; enterprise desktop applications
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="#">
                                System Integration &amp; Cloud Setup
                              </a>
                              <div className="text-xs text-slate-400">
                                APIs, cloud deployment &amp; third-party system integration
                              </div>
                            </div>
                            <div className="xd-megaItem">
                              <a className="xd-megaLink" href="#">
                                Long-Term Support &amp; Maintenance
                              </a>
                              <div className="text-xs text-slate-400">
                                Updates, performance, security &amp; ongoing support
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Start a conversation to build, improve, or scale your business software.
                          </span>
                          <a className="xd-megaContact" href="/contact">
                            Start Your Project
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
            </li>

            <li className="xd-item" role="none">
              <a
                className="xd-link"
                href="/work"
                role="menuitem"
                onMouseEnter={() => setActive(null)}
              >
                Work
              </a>
            </li>

            <li className="xd-item" role="none">
              <a
                className="xd-link"
                href="/our-team"
                role="menuitem"
                onMouseEnter={() => setActive(null)}
              >
                Our Team
              </a>
            </li>

            <li
              className="xd-item xd-hasDropdown"
              role="none"
              data-open={active === "About" ? "true" : "false"}
            >
              <button
                className="xd-link"
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={active === "About" ? "true" : "false"}
                onMouseEnter={() => setActive("About")}
                onClick={() =>
                  setActive((cur) => (cur === "About" ? null : "About"))
                }
              >
                About
                <span className="xd-caret" aria-hidden="true"></span>
              </button>
              {active === "About" && (
                <motion.div
                  className="xd-dropdown xd-dropdown--dark"
                  role="menu"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={panelTransition}
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    visibility: "visible",
                    transition: "none",
                  }}
                  transformTemplate={({ y, scale }) => {
                    if (!isDesktop) return `translateY(${y}) scale(${scale})`;
                    return `translate(-50%, ${y}) scale(${scale})`;
                  }}
                >
                  <div className="xd-dark">
                      <div className="xd-darkIntro">
                        <div className="xd-darkTitle">About Xardent</div>
                        <div className="xd-darkText">
                          Xardent is a software development company focused on building reliable, scalable, and business-ready digital solutions for modern enterprises.
                        </div>

                        <a className="xd-megaAll" href="/about">
                          <span>👉 Learn More About Us</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <div className="text-sm font-semibold text-white mb-2">
                                Who We Are
                              </div>
                              <a className="xd-megaLink" href="/about">
                                Software Development Company
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Business & Enterprise Solutions Provider
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Technology & Automation Experts
                              </a>
                            </div>
                            <div className="xd-megaItem">
                              <div className="text-sm font-semibold text-white mb-2">
                                What We Do
                              </div>
                              <a className="xd-megaLink" href="/about">
                                Custom Software Development
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Web & Application Development
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Windows Desktop Software
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Billing & Financial Systems
                              </a>
                              <a className="xd-megaLink" href="/about">
                                AI & Automation Solutions
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Data Analytics & Dashboards
                              </a>
                            </div>
                          </div>
                          <div className="xd-megaCol">
                            <div className="xd-megaItem">
                              <div className="text-sm font-semibold text-white mb-2">
                                How We Work
                              </div>
                              <a className="xd-megaLink" href="/about">
                                Requirement-driven development
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Secure & scalable architecture
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Long-term support & maintenance
                              </a>
                            </div>
                            <div className="xd-megaItem">
                              <div className="text-sm font-semibold text-white mb-2">
                                Why Choose Xardent
                              </div>
                              <a className="xd-megaLink" href="/about">
                                Business-focused solutions
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Clean & maintainable systems
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Trusted development process
                              </a>
                            </div>
                            <div className="xd-megaItem">
                              <div className="text-sm font-semibold text-white mb-2">
                                Quick Links
                              </div>
                              <a className="xd-megaLink" href="/work">
                                Our Work
                              </a>
                              <a className="xd-megaLink" href="/about">
                                Our Process
                              </a>
                              <a className="xd-megaLink" href="/contact">
                                Contact Us
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Want to know if we&apos;re a fit? Let&apos;s talk.
                          </span>
                          <a className="xd-megaContact" href="/contact">
                            CONTACT US
                          </a>
                        </div>
                      </div>
                    </div>
                </motion.div>
              )}
            </li>
          </ul>
        </nav>

        <div className="xd-actions">
          <a className="xd-cta" href="#">
            TALK TO EXPERTS
          </a>

          <button
            className="xd-burger"
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            data-xd-burger
          >
            <span className="xd-burgerLine"></span>
            <span className="xd-burgerLine"></span>
            <span className="xd-burgerLine"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
