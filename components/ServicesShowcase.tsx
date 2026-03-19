"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Digital Marketing Strategy",
  "Brand Identity Development",
  "UI/UX Design & Prototyping",
  "Search Engine Optimization",
  "Social Media Management",
  "AI-Powered Business Intelligence",
  "Content Marketing & Copywriting",
  "Web Development & Design",
  "E-Commerce Solutions",
  "Pay-Per-Click Advertising",
  "Business Plan Writing",
  "Email Marketing Automation",
  "Conversion Rate Optimization",
  "Cloud Infrastructure & DevOps",
  "Mobile App Development",
  "Cybersecurity Consulting",
  "IT Project Management",
  "Business Process Automation",
  "Video Production & Editing",
  "Growth Hacking & Scaling",
];

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const content = contentRef.current!;
    const courses = coursesRef.current!;

    const ctx = gsap.context(() => {
      // ── CONTENT: Luge-style clip-reveal ──────────────────────────────────
      // Each text element is inside an overflow:hidden wrapper.
      // The inner text slides up from 100% translateY to 0 (text mask reveal).
      const contentInners = content.querySelectorAll<HTMLElement>(".js-reveal-inner");
      const bgEl = bgRef.current;

      // Set initial states
      gsap.set(contentInners, { yPercent: 110 });
      if (bgEl) gsap.set(bgEl, { scaleY: 0, transformOrigin: "top center" });

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Background panel expands first
      if (bgEl) {
        contentTl.to(bgEl, {
          scaleY: 1,
          duration: 1.4,
          ease: "expo.out",
        }, 0);
      }

      // Suptitle reveals
      contentTl.to(contentInners[0], {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.out",
      }, 0.1);

      // Title reveals
      contentTl.to(contentInners[1], {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.out",
      }, 0.2);

      // Text reveals
      contentTl.to(contentInners[2], {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.out",
      }, 0.35);

      // ── COURSES: staggered mask-reveal from bottom ──────────────────────
      const courseItems = courses.querySelectorAll<HTMLElement>(".js-course");
      const courseInners = courses.querySelectorAll<HTMLElement>(".js-course .sb__inner");

      // Initial: each course item has overflow:hidden, inner text pushed down
      gsap.set(courseInners, { yPercent: 105 });

      // Title item reveals first, then rest stagger
      const courseTl = gsap.timeline({
        scrollTrigger: {
          trigger: courses,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      courseItems.forEach((_, i) => {
        courseTl.to(courseInners[i], {
          yPercent: 0,
          duration: 1.0,
          ease: "expo.out",
        }, i * 0.05);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── s__inner ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "160px 0 100px", position: "relative" }}>

        {/* ── Content area (u-container > js-content) ────────────────────── */}
        <div
          ref={contentRef}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 8vw 80px",
            position: "relative",
          }}
        >
          {/* Background panel — reveals from top via scaleY */}
          <div
            ref={bgRef}
            style={{
              position: "absolute",
              top: -60,
              left: "4vw",
              right: "30vw",
              bottom: -20,
              background: "linear-gradient(180deg, rgba(230,54,36,0.035) 0%, transparent 100%)",
              borderRadius: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Suptitle — overflow hidden mask */}
          <div style={{ overflow: "hidden", position: "relative", zIndex: 1, marginBottom: 20 }}>
            <h2
              className="js-reveal-inner"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#e63624",
                margin: 0,
              }}
            >
              Services
            </h2>
          </div>

          {/* Title — overflow hidden mask */}
          <div style={{ overflow: "hidden", position: "relative", zIndex: 1, marginBottom: 28 }}>
            <p
              className="js-reveal-inner"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "white",
                margin: 0,
              }}
            >
              We help businesses thrive
            </p>
          </div>

          {/* Description — overflow hidden mask */}
          <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
            <p
              className="js-reveal-inner"
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 540,
                margin: 0,
              }}
            >
              Access expert-led{" "}
              <span style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                digital strategies
              </span>
              , AI-driven insights, and bespoke consulting designed to amplify
              your brand and accelerate growth.
            </p>
          </div>
        </div>

        {/* ── Courses list (s__courses) ───────────────────────────────────── */}
        <div ref={coursesRef} style={{ padding: "0 8vw" }}>
          {/* Title item */}
          <div
            className="js-course"
            style={{
              overflow: "hidden",
              display: "inline-block",
              marginBottom: 16,
              borderBottom: "2px solid rgba(255,255,255,0.08)",
              paddingBottom: 16,
              width: "100%",
            }}
          >
            <span
              className="sb__inner"
              style={{
                display: "block",
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              20+ Services
            </span>
          </div>

          {/* Service items — each is overflow:hidden with inner sliding up */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap" }}>
            {SERVICES.map((service, i) => (
              <li
                key={i}
                className="js-course"
                style={{
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  flex: "0 0 50%",
                  maxWidth: "50%",
                }}
              >
                <span
                  className="sb__inner"
                  style={{
                    display: "block",
                    padding: "18px 0",
                    fontSize: "clamp(0.88rem, 1.1vw, 1.05rem)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    cursor: "default",
                    transition: "color 0.4s ease, padding-left 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "white";
                    el.style.paddingLeft = "12px";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "rgba(255,255,255,0.5)";
                    el.style.paddingLeft = "0px";
                  }}
                >
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
