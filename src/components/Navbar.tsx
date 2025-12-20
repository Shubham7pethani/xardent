"use client";
import React from "react";
import { motion, type Transition } from "framer-motion";
import { TextScramble } from "@/components/TextScramble";

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
  const [megaTab, setMegaTab] = React.useState<"design" | "development" | "seo">(
    "development"
  );
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [brandScrambleTrigger, setBrandScrambleTrigger] = React.useState(0);
  const [isShrunk, setIsShrunk] = React.useState(false);

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
        <a
          className="xd-brand"
          href="#"
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
        </a>

        <nav className="xd-nav" aria-label="Primary" data-xd-nav onMouseLeave={() => setActive(null)}>
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
                          Developing
                        </button>
                        <button
                          className={`xd-megaTab${
                            megaTab === "seo" ? " is-active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={megaTab === "seo" ? "true" : "false"}
                          onMouseEnter={() => setMegaTab("seo")}
                          onClick={() => setMegaTab("seo")}
                        >
                          SEO &amp; Marketing
                        </button>

                        <a className="xd-megaAll" href="#">
                          <span>LET&apos;S BUILD YOUR PRODUCT</span>
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
                              <a className="xd-megaLink" href="#">
                                UI/UX Design
                              </a>
                              <a className="xd-megaLink" href="#">
                                UI/UX Consulting
                              </a>
                              <a className="xd-megaLink" href="#">
                                UX Research
                              </a>
                              <a className="xd-megaLink" href="#">
                                UX Design Audit
                              </a>
                              <a className="xd-megaLink" href="#">
                                Usability Testing
                              </a>
                            </div>
                            <div className="xd-megaCol">
                              <a className="xd-megaLink" href="#">
                                Design System
                              </a>
                              <a className="xd-megaLink" href="#">
                                Heuristic Evaluation
                              </a>
                              <a className="xd-megaLink" href="#">
                                Interaction Design
                              </a>
                              <a className="xd-megaLink" href="#">
                                Digital Prototyping
                              </a>
                              <a className="xd-megaLink" href="#">
                                Digital Branding
                              </a>
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
                              <a className="xd-megaLink" href="#">
                                Front End Development
                              </a>
                              <a className="xd-megaLink" href="#">
                                Back End Development
                              </a>
                              <a className="xd-megaLink" href="#">
                                Full Stack Development
                              </a>
                              <a className="xd-megaLink" href="#">
                                API Development
                              </a>
                            </div>
                            <div className="xd-megaCol">
                              <a className="xd-megaLink" href="#">
                                AI Development Services
                              </a>
                              <a className="xd-megaLink" href="#">
                                ML Development Services
                              </a>
                              <a className="xd-megaLink" href="#">
                                Cloud Application Development
                              </a>
                              <a className="xd-megaLink" href="#">
                                Low-code No-code Development
                              </a>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`xd-megaPanel${
                            megaTab === "seo" ? " is-active" : ""
                          }`}
                          role="tabpanel"
                          data-xd-mega-panel="seo"
                        >
                          <div className="xd-megaCols">
                            <div className="xd-megaCol">
                              <a className="xd-megaLink" href="#">
                                All In One Digital Marketing
                              </a>
                              <a className="xd-megaLink" href="#">
                                Search Engine Optimisation (SEO)
                              </a>
                            </div>
                            <div className="xd-megaCol">
                              <a className="xd-megaLink" href="#">
                                Content Marketing
                              </a>
                              <a className="xd-megaLink" href="#">
                                Social Media Marketing
                              </a>
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
                          Ready-to-ship solutions and custom builds for startups
                          and growing businesses.
                        </div>

                        <a className="xd-megaAll" href="#">
                          <span>EXPLORE SOLUTIONS</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              SaaS MVP Development
                            </a>
                            <a className="xd-megaLink" href="#">
                              Custom Web Applications
                            </a>
                            <a className="xd-megaLink" href="#">
                              Mobile App Solutions
                            </a>
                            <a className="xd-megaLink" href="#">
                              E-commerce Platforms
                            </a>
                          </div>
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              AI Automation &amp; Chatbots
                            </a>
                            <a className="xd-megaLink" href="#">
                              Cloud &amp; DevOps Setup
                            </a>
                            <a className="xd-megaLink" href="#">
                              System Integrations
                            </a>
                            <a className="xd-megaLink" href="#">
                              Maintenance &amp; Support
                            </a>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Have a product idea? Let&apos;s ship it fast.
                          </span>
                          <a className="xd-megaContact" href="#">
                            CONTACT US
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
              data-open={active === "Hire Us" ? "true" : "false"}
            >
              <button
                className="xd-link"
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={active === "Hire Us" ? "true" : "false"}
                onMouseEnter={() => setActive("Hire Us")}
                onClick={() =>
                  setActive((cur) => (cur === "Hire Us" ? null : "Hire Us"))
                }
              >
                Hire Us
                <span className="xd-caret" aria-hidden="true"></span>
              </button>
              {active === "Hire Us" && (
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
                        <div className="xd-darkTitle">Hire Us</div>
                        <div className="xd-darkText">
                          Bring in a skilled team to build, ship and scale your
                          product with confidence.
                        </div>

                        <a className="xd-megaAll" href="#">
                          <span>START A PROJECT</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              Dedicated Team
                            </a>
                            <a className="xd-megaLink" href="#">
                              Fixed Price Projects
                            </a>
                            <a className="xd-megaLink" href="#">
                              Staff Augmentation
                            </a>
                            <a className="xd-megaLink" href="#">
                              Product Sprint
                            </a>
                          </div>
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              UI/UX Designers
                            </a>
                            <a className="xd-megaLink" href="#">
                              Frontend Developers
                            </a>
                            <a className="xd-megaLink" href="#">
                              Backend Developers
                            </a>
                            <a className="xd-megaLink" href="#">
                              QA &amp; Automation
                            </a>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Need experts quickly? We can start in days.
                          </span>
                          <a className="xd-megaContact" href="#">
                            CONTACT US
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
            </li>

            <li className="xd-item" role="none">
              <a className="xd-link" href="#" role="menuitem">
                Work
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
                          A product-focused team building modern web, mobile and
                          AI experiences.
                        </div>

                        <a className="xd-megaAll" href="#">
                          <span>MEET THE TEAM</span>
                          <span
                            className="xd-megaArrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>

                      <div className="xd-darkBody">
                        <div className="xd-megaCols">
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              Company
                            </a>
                            <a className="xd-megaLink" href="#">
                              Our Process
                            </a>
                            <a className="xd-megaLink" href="#">
                              Case Studies
                            </a>
                            <a className="xd-megaLink" href="#">
                              Testimonials
                            </a>
                          </div>
                          <div className="xd-megaCol">
                            <a className="xd-megaLink" href="#">
                              Careers
                            </a>
                            <a className="xd-megaLink" href="#">
                              Blog
                            </a>
                            <a className="xd-megaLink" href="#">
                              Partnerships
                            </a>
                            <a className="xd-megaLink" href="#">
                              Contact
                            </a>
                          </div>
                        </div>

                        <div className="xd-megaFooter">
                          <span className="xd-megaFooterText">
                            Want to know if we&apos;re a fit? Let&apos;s talk.
                          </span>
                          <a className="xd-megaContact" href="#">
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
