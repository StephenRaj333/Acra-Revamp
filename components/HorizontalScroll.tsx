"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Brand data (3 sections) ──────────────────────────────────────────────────
const sections = [
  {
    id: 1,
    label: "Brand & Strategy",
    tag: "01 — IDENTITY",
    heading: "We Build\nBrands That\nCommand Attention",
    sub: "At AKRA, we transform complex business challenges into bold, effective solutions — blending deep technical expertise with a fearless creative vision.",
    accent: "#e63624",
    brand: "BRAND",
    icon: "/brand-icon.svg",
    color: "#1a0a08",
    brandLetters: ["B", "R", "A", "N", "D"],
    gradientFrom: "#2d0d06",
    gradientTo: "#1a0a08",
  },
  {
    id: 2,
    label: "Experience Design",
    tag: "02 — UX / UI",
    heading: "Designing\nExperiences\nUsers Love",
    sub: "From intuitive interfaces to immersive digital journeys, our design philosophy puts human behaviour at the heart of every pixel and interaction.",
    accent: "#1a4fd6",
    brand: "DESIGN",
    icon: "/design-icon.svg",
    color: "#06101a",
    brandLetters: ["D", "E", "S", "I", "G", "N"],
    gradientFrom: "#061020",
    gradientTo: "#06101a",
  },
  {
    id: 3,
    label: "Data & Automation",
    tag: "03 — INTELLIGENCE",
    heading: "Powered by\nData, Driven\nby Insight",
    sub: "We harness AI, automation and advanced analytics to give businesses the clarity and speed they need to make bold decisions and stay ahead.",
    accent: "#18a363",
    brand: "DATA",
    icon: "/data-icon.svg",
    color: "#061a0e",
    brandLetters: ["D", "A", "T", "A"],
    gradientFrom: "#061a10",
    gradientTo: "#061a0e",
  },
];

// ─── Ellipse orbiting brand visual ───────────────────────────────────────────
function BrandEllipse({
  section,
  active,
}: {
  section: (typeof sections)[0];
  active: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 420, height: 420 }}
    >
      {/* Outer ring */}
      <div
        className="absolute rounded-full border transition-all duration-700"
        style={{
          width: 420,
          height: 420,
          borderColor: active ? section.accent + "55" : "transparent",
          boxShadow: active ? `0 0 60px ${section.accent}22` : "none",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
        }}
      />
      {/* Middle ring */}
      <div
        className="absolute rounded-full border transition-all duration-700"
        style={{
          width: 300,
          height: 300,
          borderColor: active ? section.accent + "33" : "transparent",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1) 0.1s",
        }}
      />
      {/* Core circle */}
      <div
        className="absolute rounded-full transition-all duration-700 flex items-center justify-center overflow-hidden"
        style={{
          width: 220,
          height: 220,
          background: active
            ? `radial-gradient(circle at 40% 40%, ${section.accent}33, ${section.accent}08)`
            : "rgba(255,255,255,0.03)",
          border: `2px solid ${active ? section.accent + "66" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(12px)",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Big brand letter in center */}
        <span
          className="font-black select-none transition-all duration-700"
          style={{
            fontSize: 100,
            color: active ? section.accent : "rgba(255,255,255,0.04)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          {section.brandLetters[0]}
        </span>
      </div>

      {/* Orbiting letters */}
      {section.brandLetters.map((letter, i) => {
        const total = section.brandLetters.length;
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const r = 150;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <div
            key={i}
            className="absolute flex items-center justify-center rounded-full font-black transition-all duration-700"
            style={{
              width: 48,
              height: 48,
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              background: active
                ? `${section.accent}22`
                : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${active ? section.accent + "55" : "rgba(255,255,255,0.07)"}`,
              color: active ? section.accent : "rgba(255,255,255,0.15)",
              fontSize: 16,
              boxShadow: active ? `0 0 16px ${section.accent}33` : "none",
              transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${i * 0.05}s`,
            }}
          >
            {letter}
          </div>
        );
      })}

      {/* Accent dot top */}
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          width: 10,
          height: 10,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          background: active ? section.accent : "rgba(255,255,255,0.1)",
          boxShadow: active ? `0 0 20px ${section.accent}` : "none",
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<HTMLDivElement[]>([]);
  const tagRefs = useRef<HTMLDivElement[]>([]);
  const subRefs = useRef<HTMLDivElement[]>([]);
  const ellipseRefs = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // ── import Lenis dynamically (SSR safe) ──────────────────────────────
    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });

    // ── GSAP horizontal scroll ────────────────────────────────────────────
    const track = trackRef.current!;
    const panels = sectionRefs.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth + window.innerWidth}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // active section detection
          const idx = Math.round(self.progress * (sections.length - 1));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            // update labels
            labelRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, {
                color: i === idx ? "#ffffff" : "rgba(255,255,255,0.25)",
                duration: 0.4,
              });
              const dot = el.querySelector(".dot") as HTMLElement;
              if (dot)
                gsap.to(dot, {
                  backgroundColor:
                    i === idx ? sections[i].accent : "rgba(255,255,255,0.2)",
                  scale: i === idx ? 1.4 : 1,
                  duration: 0.4,
                });
            });
          }
          // progress bar
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress });
          }
        },
      },
    });

    // horizontal drag
    mainTl.to(track, {
      x: () => -totalWidth,
      ease: "none",
    });

    // ── Per-panel entrance animations (staggered on scroll) ──────────────
    panels.forEach((panel, i) => {
      const heading = headingRefs.current[i];
      const tag = tagRefs.current[i];
      const sub = subRefs.current[i];
      const ellipse = ellipseRefs.current[i];

      const enterProgress = i / sections.length;
      const midProgress = (i + 0.5) / sections.length;

      // parallax on ellipse — moves slower than the scroll
      gsap.to(ellipse, {
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top top`,
          end: () => `+=${totalWidth + window.innerWidth}`,
          scrub: 1.5,
          containerAnimation: mainTl,
        },
      });

      // heading lines split
      if (heading) {
        const lines = heading.querySelectorAll(".line");
        gsap.fromTo(
          lines,
          { y: 60, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left 85%",
              end: "left 30%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (tag) {
        gsap.fromTo(
          tag,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (sub) {
        gsap.fromTo(
          sub,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (ellipse) {
        gsap.fromTo(
          ellipse,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // slow rotate on scroll
        gsap.to(ellipse.querySelectorAll(".orbit-ring"), {
          rotation: 360,
          repeat: -1,
          duration: 18,
          ease: "none",
          transformOrigin: "center center",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(() => {});
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50">
        <div
          ref={progressRef}
          className="h-full w-full bg-gradient-to-r from-[#e63624] via-[#1a4fd6] to-[#18a363] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Section nav pills ─────────────────────────────────────────────── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {sections.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) labelRefs.current[i] = el;
            }}
            className="flex items-center gap-2 cursor-pointer group"
            style={{
              color: i === 0 ? "#ffffff" : "rgba(255,255,255,0.25)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 700,
              transition: "color 0.4s",
            }}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div
              className="dot rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: 6,
                backgroundColor:
                  i === 0 ? s.accent : "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Horizontal scroll container ───────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${sections.length * 100}vw` }}
        >
          {sections.map((section, i) => (
            <div
              key={section.id}
              ref={(el) => {
                if (el) sectionRefs.current[i] = el;
              }}
              className="relative flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{
                width: "100vw",
                height: "100vh",
                background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})`,
              }}
            >
              {/* ── Noise texture overlay ── */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "200px",
                }}
              />

              {/* ── Big background number ── */}
              <div
                className="absolute font-black select-none pointer-events-none"
                style={{
                  fontSize: "clamp(18rem, 28vw, 32rem)",
                  color: "rgba(255,255,255,0.02)",
                  right: "-4vw",
                  bottom: "-8vh",
                  lineHeight: 1,
                  letterSpacing: "-0.08em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* ── Accent corner line ── */}
              <div
                className="absolute top-0 left-0 w-[2px]"
                style={{
                  height: "35%",
                  background: section.accent,
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute top-0 left-0 h-[2px]"
                style={{
                  width: "12%",
                  background: section.accent,
                  opacity: 0.6,
                }}
              />

              {/* ── Layout: left ellipse + right text ── */}
              <div className="relative z-10 flex items-center justify-between w-full h-full px-[8vw]">
                {/* LEFT — Ellipse */}
                <div
                  ref={(el) => {
                    if (el) ellipseRefs.current[i] = el;
                  }}
                  className="relative flex-shrink-0 flex items-center justify-center"
                  style={{ width: 420, height: 420 }}
                >
                  {/* Outer rotating ring */}
                  <div
                    className="orbit-ring absolute rounded-full"
                    style={{
                      width: 420,
                      height: 420,
                      border: `1px solid ${section.accent}33`,
                    }}
                  />
                  {/* Mid rotating ring (counter) */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 310,
                      height: 310,
                      border: `1px dashed ${section.accent}22`,
                      animation: `spin-reverse 24s linear infinite`,
                    }}
                  />

                  {/* Core glow circle */}
                  <div
                    className="absolute rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      width: 220,
                      height: 220,
                      background: `radial-gradient(circle at 35% 35%, ${section.accent}44, ${section.accent}08)`,
                      border: `2px solid ${section.accent}55`,
                      boxShadow: `0 0 80px ${section.accent}22, inset 0 0 40px ${section.accent}11`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="font-black select-none"
                      style={{
                        fontSize: 88,
                        color: section.accent,
                        lineHeight: 1,
                        letterSpacing: "-0.06em",
                        opacity: 0.9,
                      }}
                    >
                      {section.brandLetters[0]}
                    </span>
                  </div>

                  {/* Orbiting brand letters */}
                  {section.brandLetters.map((letter, li) => {
                    const total = section.brandLetters.length;
                    const angle = (li / total) * 2 * Math.PI - Math.PI / 2;
                    const r = 152;
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    return (
                      <div
                        key={li}
                        className="absolute flex items-center justify-center rounded-full font-black"
                        style={{
                          width: 50,
                          height: 50,
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          background: `${section.accent}18`,
                          border: `1.5px solid ${section.accent}44`,
                          color: section.accent,
                          fontSize: 15,
                          letterSpacing: "0.1em",
                          boxShadow: `0 0 14px ${section.accent}22`,
                        }}
                      >
                        {letter}
                      </div>
                    );
                  })}

                  {/* Accent dots on ring */}
                  {[0, 90, 180, 270].map((deg, di) => {
                    const rad = (deg * Math.PI) / 180;
                    const r = 210;
                    const x = Math.cos(rad) * r;
                    const y = Math.sin(rad) * r;
                    return (
                      <div
                        key={di}
                        className="absolute rounded-full"
                        style={{
                          width: di === 0 ? 10 : 6,
                          height: di === 0 ? 10 : 6,
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          background: section.accent,
                          boxShadow: `0 0 ${di === 0 ? 20 : 10}px ${section.accent}`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* RIGHT — Text content */}
                <div className="flex-1 flex flex-col justify-center pl-[5vw] max-w-[50vw]">
                  {/* tag */}
                  <div
                    ref={(el) => {
                      if (el) tagRefs.current[i] = el;
                    }}
                    className="flex items-center gap-3 mb-6"
                    style={{ opacity: 0 }}
                  >
                    <div
                      className="h-px w-12"
                      style={{ background: section.accent }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-[0.25em]"
                      style={{ color: section.accent }}
                    >
                      {section.tag}
                    </span>
                  </div>

                  {/* heading */}
                  <div
                    ref={(el) => {
                      if (el) headingRefs.current[i] = el;
                    }}
                    className="overflow-hidden mb-6"
                  >
                    {section.heading.split("\n").map((line, li) => (
                      <div
                        key={li}
                        className="line overflow-hidden"
                        style={{ opacity: 0 }}
                      >
                        <span
                          className="block font-black leading-[1.05] text-white uppercase"
                          style={{
                            fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {li === 0 ? (
                            line
                          ) : (
                            <>
                              {line.split(" ").map((word, wi) => (
                                <span key={wi}>
                                  {wi === 1 && li === 1 ? (
                                    <span style={{ color: section.accent }}>
                                      {word}
                                    </span>
                                  ) : (
                                    word
                                  )}{" "}
                                </span>
                              ))}
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* sub */}
                  <p
                    ref={(el) => {
                      if (el) subRefs.current[i] = el;
                    }}
                    className="text-white/55 leading-relaxed mb-10 max-w-md"
                    style={{
                      fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                      opacity: 0,
                    }}
                  >
                    {section.sub}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-6">
                    <button
                      className="flex items-center gap-3 px-7 py-3 rounded-full font-bold text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background: section.accent,
                        boxShadow: `0 0 30px ${section.accent}55`,
                        letterSpacing: "0.15em",
                      }}
                    >
                      Explore
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className="h-px flex-1 max-w-[80px] opacity-20"
                      style={{ background: "white" }}
                    />

                    <span className="text-white/30 text-xs uppercase tracking-widest font-medium">
                      {section.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Bottom section number ── */}
              <div
                className="absolute bottom-8 left-[8vw] flex items-center gap-3"
                style={{ opacity: 0.25 }}
              >
                <span
                  className="text-white text-xs uppercase tracking-[0.3em] font-bold"
                >
                  {String(i + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
                </span>
                <div
                  className="h-px w-8"
                  style={{ background: "white" }}
                />
                <span
                  className="text-white text-xs uppercase tracking-[0.2em]"
                >
                  {section.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spin-reverse keyframe */}
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </>
  );
}
