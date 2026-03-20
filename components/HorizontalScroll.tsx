"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlipWordsPanel from "@/components/ui/flipWords";
import LoaderPanel from "@/components/ui/loaderPanel";
import StackedCardsPanel from "@/components/ui/stackedCards";  

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

const BRAND_WORDS = ["Identity", "Voice", "Recall", "Trust", "Momentum"];

const LOADER_STEPS = [
  "User journey mapped",
  "Wireframes approved",
  "Design system aligned",
  "Prototype usability tested",
  "Interaction polish pass",
]; 

const AI_STACKED_CARDS = [
  {
    title: "Signal Layer",
    detail: "Live inputs ranked and routed in one motion system.",
  },
  {
    title: "Forecast Layer",
    detail: "Models reprioritize decisions as fresh data arrives.",
  },
  {
    title: "Action Layer",
    detail: "Automation sequences fire only when confidence is high.",
  },
  {
    title: "Insight Layer",
    detail: "Executive-ready summaries stack behind the live engine.",
  },
]; 

// ─── Main component ───────────────────────────────────────────────────────────
export default function HorizontalScroll() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const trackRef        = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [brandWordIndex, setBrandWordIndex] = useState(0);
  const activeRef       = useRef(0);
  const sectionRefs     = useRef<HTMLDivElement[]>([]);
  const headingRefs     = useRef<HTMLDivElement[]>([]);
  const tagRefs         = useRef<HTMLDivElement[]>([]);
  const subRefs         = useRef<HTMLDivElement[]>([]); 
  const ellipseRefs     = useRef<HTMLDivElement[]>([]);
  const progressRef     = useRef<HTMLDivElement>(null);
  const labelRefs       = useRef<HTMLDivElement[]>([]); 
  // Parallax depth layers per section (bg orbs, floating shapes)
  const bgOrbRefs       = useRef<HTMLDivElement[]>([]);
  const floatARef       = useRef<HTMLDivElement[]>([]);  // slow layer
  const floatBRef       = useRef<HTMLDivElement[]>([]);  // fast layer
  const backdropTextRef = useRef<HTMLDivElement[]>([]);  // giant bg word
  // Cross-section traveler — single element that voyages across all 3 panels
  const travelerRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const brandTimer = window.setInterval(() => {
      setBrandWordIndex((current) => (current + 1) % BRAND_WORDS.length);
    }, 1600);

    return () => {
      window.clearInterval(brandTimer);
    };
  }, []);

  useEffect(() => {
    if (isMobile !== false) return;
    const ctx = gsap.context(() => {
      // ── GSAP horizontal scroll ────────────────────────────────────────────
      const track = trackRef.current!;
      const panels = sectionRefs.current;
      const getTotalWidth = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getTotalWidth()}`,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          // active section detection
          const idx = Math.round(self.progress * (sections.length - 1));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActiveIndex(idx);
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
          // Traveler illustration morph based on scroll progress
          if (travelerRef.current) {
            const p = self.progress;
            const brand = travelerRef.current.querySelector(".traveler-brand") as HTMLElement;
            const ux    = travelerRef.current.querySelector(".traveler-ux")    as HTMLElement;
            const data  = travelerRef.current.querySelector(".traveler-data")  as HTMLElement;
            if (brand && ux && data) {
              const brandO = p < 0.28 ? 1 : p < 0.46 ? 1 - (p - 0.28) / 0.18 : 0;
              const uxO    = p < 0.30 ? 0 : p < 0.48 ? (p - 0.30) / 0.18 :
                             p < 0.68 ? 1 : p < 0.84 ? 1 - (p - 0.68) / 0.16 : 0;
              const dataO  = p < 0.66 ? 0 : p < 0.82 ? (p - 0.66) / 0.16 : 1;
              gsap.set(brand, { opacity: brandO });
              gsap.set(ux,    { opacity: uxO });
              gsap.set(data,  { opacity: dataO });
            }
          } 
        },
      },
    });

    // horizontal drag
    mainTl.to(track, {
      x: () => -getTotalWidth(),
      ease: "none",
    });


    if (travelerRef.current) {
      // Position: moves from 8vw to (300vw - 8vw) so it covers all panels
      gsap.to(travelerRef.current, {
        x: () => getTotalWidth() * 0.28,     // travels 28% of total horizontal distance
        y: "-=90",                      // arcs upward in the middle, back down at end
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getTotalWidth()}`,
          scrub: 1.0,
        },
      });
      // Scale pulse: small → big → medium across 3 phases
      gsap.to(travelerRef.current, {
        scale: 1.55,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        duration: 3.2,
      });
      // Morph colour based on scroll progress (brand-red → ux-blue → data-green)
      // We tween a CSS variable equivalent by changing box-shadow & opacity of child divs
    }

    // ── Per-panel entrance animations (staggered on scroll) ──────────────
    panels.forEach((panel, i) => {
      const heading  = headingRefs.current[i];
      const tag      = tagRefs.current[i];
      const sub      = subRefs.current[i]; 
      const ellipse  = ellipseRefs.current[i];
      const bgOrb    = bgOrbRefs.current[i];
      const floatA   = floatARef.current[i];
      const floatB   = floatBRef.current[i];
      const bdText   = backdropTextRef.current[i];

      // ── Deep parallax: background orb moves very slowly (depth = far)
      if (bgOrb) {
        gsap.fromTo(bgOrb,
          { x: 120 },
          {
            x: -120,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: 2.5,
            },
          }
        );
      }

      // ── Mid parallax: floating shape A (medium depth)
      if (floatA) {
        gsap.fromTo(floatA,
          { x: 80, y: 30, rotation: -8 },
          {
            x: -80, y: -30, rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: 1.6,
            },
          }
        );
      }

      // ── Near parallax: floating shape B (shallow depth, moves fastest)
      if (floatB) {
        gsap.fromTo(floatB,
          { x: 60, y: -20, rotation: 5 },
          {
            x: -160, y: 20, rotation: -15,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: 0.9,
            },
          }
        );
      }

      // ── Backdrop text parallax (slowest — near-static)
      if (bdText) {
        gsap.fromTo(bdText,
          { x: 60 },
          {
            x: -60,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: 3.5,
            },
          }
        );
      }

      // parallax on ellipse — moves slightly slower than the scroll
      gsap.to(ellipse, {
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top top`,
          end: () => `+=${getTotalWidth()}`,
          scrub: 1.5,
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

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  if (isMobile === null) {
    return null;
  }

  if (isMobile) {
    return (
      <section className="relative bg-[#090909] px-4 py-14">
        <div className="mx-auto max-w-xl space-y-4">
          <h2 className="text-3xl font-black leading-tight text-white">What we do</h2>
          <p className="text-sm text-white/70">Simple, focused delivery across strategy, experience, and automation.</p>
          {sections.map((section) => (
            <article
              key={section.id}
              className="rounded-2xl border border-white/10 p-4"
              style={{
                background: `linear-gradient(140deg, ${section.gradientFrom}, ${section.gradientTo})`,
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: section.accent }}>
                {section.tag}
              </p>
              <h3 className="mt-2 whitespace-pre-line text-2xl font-black leading-tight text-white">{section.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{section.sub}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

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

      {/* ── Horizontal scroll container ───────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${sections.length * 100}vw`, position: "relative", willChange: "transform" }}
        >
         
          <div
            ref={travelerRef}
            style={{
              position: "absolute",
              left: "6vw",
              top: "50%",
              marginTop: -52,
              width: 104, height: 104,
              zIndex: 20,
              pointerEvents: "none",
              willChange: "transform",
            }}
          >
            {/* Phase 1 — Brand Seal (red diamond stamp) */}
            <div className="traveler-brand" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
                <defs>
                  <radialGradient id="trBrandG" cx="38%" cy="32%" r="62%">
                    <stop offset="0%" stopColor="#FF7A55"/>
                    <stop offset="100%" stopColor="#e63624"/>
                  </radialGradient>
                  <filter id="trBrandSh">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#e63624" floodOpacity="0.55"/>
                  </filter>
                </defs>
                {/* Outer octagon ring */}
                <polygon points="52,4 80,16 98,40 98,64 80,88 52,100 24,88 6,64 6,40 24,16"
                  stroke="#e6362455" strokeWidth="1.5" fill="none"/>
                {/* Diamond gem */}
                <polygon points="52,18 76,40 52,82 28,40"
                  fill="url(#trBrandG)" filter="url(#trBrandSh)"/>
                <polygon points="52,18 64,40 52,54" fill="rgba(255,255,255,0.32)"/>
                <polygon points="52,18 40,40 52,54" fill="rgba(255,255,255,0.08)"/>
                {/* Center A */}
                <text x="52" y="56" textAnchor="middle" fontFamily="Arial Black,sans-serif"
                  fontWeight="900" fontSize="18" fill="rgba(255,255,255,0.9)" letterSpacing="-1">A</text>
              </svg>
            </div>

            {/* Phase 2 — UX Cursor (blue) */}
            <div className="traveler-ux" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}>
              <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
                <defs>
                  <filter id="trUXSh">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#1a4fd6" floodOpacity="0.55"/>
                  </filter>
                </defs>
                {/* Screen frame */}
                <rect x="10" y="14" width="84" height="58" rx="8"
                  fill="#1a4fd615" stroke="#1a4fd655" strokeWidth="1.5" filter="url(#trUXSh)"/>
                <rect x="18" y="22" width="68" height="42" rx="4" fill="#1a4fd610"/>
                {/* UI lines */}
                <rect x="24" y="28" width="24" height="4" rx="2" fill="#1a4fd655"/>
                <rect x="24" y="36" width="40" height="3" rx="1.5" fill="#1a4fd630"/>
                <rect x="24" y="43" width="30" height="3" rx="1.5" fill="#1a4fd620"/>
                {/* Cursor */}
                <path d="M62,44 L62,68 L68,62 L74,74 L78,72 L72,60 L80,60 Z"
                  fill="#1a4fd6cc" stroke="#1a4fd6" strokeWidth="1" strokeLinejoin="round"/>
                {/* Stand */}
                <rect x="44" y="72" width="16" height="5" rx="1" fill="#1a4fd640"/>
                <rect x="36" y="77" width="32" height="3" rx="1.5" fill="#1a4fd635"/>
              </svg>
            </div>

            {/* Phase 3 — Data Orb (green network) */}
            <div className="traveler-data" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}>
              <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
                <defs>
                  <radialGradient id="trDataG" cx="38%" cy="32%" r="62%">
                    <stop offset="0%" stopColor="#4adeaa"/>
                    <stop offset="100%" stopColor="#18a363"/>
                  </radialGradient>
                  <filter id="trDataSh">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#18a363" floodOpacity="0.55"/>
                  </filter>
                </defs>
                {/* Outer orbit ring */}
                <circle cx="52" cy="52" r="46" stroke="#18a36335" strokeWidth="1.5" fill="none"/>
                <circle cx="52" cy="52" r="32" stroke="#18a36320" strokeWidth="1" fill="none" strokeDasharray="4 6"/>
                {/* Core orb */}
                <circle cx="52" cy="52" r="20" fill="url(#trDataG)" filter="url(#trDataSh)"/>
                <ellipse cx="46" cy="44" rx="7" ry="4" fill="rgba(255,255,255,0.35)" transform="rotate(-20 46 44)"/>
                {/* Network nodes */}
                {[[52,6],[98,52],[52,98],[6,52],[82,22],[82,82],[22,82],[22,22]].map(([cx,cy],ni) => (
                  <circle key={ni} cx={cx} cy={cy} r={ni < 4 ? 4 : 3}
                    fill="#18a36355" stroke="#18a36388" strokeWidth="1"/>
                ))}
                {/* Network connectors */}
                <line x1="52" y1="32" x2="52" y2="10" stroke="#18a36330" strokeWidth="1"/>
                <line x1="72" y1="52" x2="94" y2="52" stroke="#18a36330" strokeWidth="1"/>
                <line x1="52" y1="72" x2="52" y2="94" stroke="#18a36330" strokeWidth="1"/>
                <line x1="32" y1="52" x2="10" y2="52" stroke="#18a36330" strokeWidth="1"/>
              </svg>
            </div>
          </div>
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

              {/* ── PARALLAX LAYER 1: Large background radial orb (far/slow) ── */}
              <div
                ref={(el) => { if (el) bgOrbRefs.current[i] = el; }}
                className="absolute pointer-events-none"
                style={{
                  width: "70vw", height: "70vw",
                  right: i === 1 ? "-10vw" : "-20vw",
                  top: i === 1 ? "5vh" : "-15vh",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 40%, ${section.accent}18 0%, transparent 65%)`,
                  filter: "blur(60px)",
                  willChange: "transform",
                }}
              />

              {/* ── PARALLAX LAYER 2: Section-specific mid floating shape ── */}
              <div
                ref={(el) => { if (el) floatARef.current[i] = el; }}
                className="absolute pointer-events-none"
                style={{ willChange: "transform",
                  ...(i === 0 && { // Brand: AKRA seal ring
                    width: 180, height: 180,
                    top: "12vh", right: "18vw",
                    borderRadius: "50%",
                    border: `2px solid ${section.accent}28`,
                    boxShadow: `0 0 60px ${section.accent}14`,
                  }),
                  ...(i === 1 && { // UX: skewed wireframe card
                    width: 140, height: 96,
                    top: "14vh", right: "16vw",
                    borderRadius: 14,
                    border: `1.5px solid ${section.accent}30`,
                    background: `${section.accent}06`,
                    backdropFilter: "blur(4px)",
                  }),
                  ...(i === 2 && { // Data: hexagonal node
                    width: 100, height: 114,
                    top: "10vh", right: "20vw",
                    background: "transparent",
                  }),
                }}
              >
                {i === 0 && (
                  // Brand: inner seal ring with AKRA text
                  <div style={{ position: "absolute", inset: 16, borderRadius: "50%",
                    border: `1px solid ${section.accent}20`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.32em",
                      color: `${section.accent}55`, textTransform: "uppercase" }}>AKRA</span>
                  </div>
                )}
                {i === 1 && (
                  // UX: mini wireframe UI lines inside card
                  <svg width="140" height="96" viewBox="0 0 140 96" fill="none" style={{ position: "absolute", inset: 0 }}>
                    <rect x="10" y="10" width="50" height="6" rx="3" fill={`${section.accent}25`}/>
                    <rect x="10" y="22" width="80" height="3.5" rx="2" fill={`${section.accent}14`}/>
                    <rect x="10" y="30" width="60" height="3.5" rx="2" fill={`${section.accent}10`}/>
                    <rect x="10" y="50" width="36" height="22" rx="5" fill={`${section.accent}15`}/>
                    <rect x="54" y="50" width="36" height="22" rx="5" fill={`${section.accent}10`}/>
                    <rect x="98" y="50" width="32" height="22" rx="5" fill={`${section.accent}08`}/>
                  </svg>
                )}
                {i === 2 && (
                  // Data: hexagonal outline SVG
                  <svg width="100" height="114" viewBox="0 0 100 114" fill="none">
                    <polygon points="50,4 94,27 94,73 50,96 6,73 6,27"
                      stroke={`${section.accent}35`} strokeWidth="1.5" fill={`${section.accent}06`}/>
                    <polygon points="50,22 76,36.5 76,65.5 50,80 24,65.5 24,36.5"
                      stroke={`${section.accent}20`} strokeWidth="1" fill="none"/>
                    <circle cx="50" cy="57" r="8" fill={`${section.accent}30`}/>
                  </svg>
                )}
              </div>

              {/* ── PARALLAX LAYER 3: Near floating shape (fastest) ── */}
              <div
                ref={(el) => { if (el) floatBRef.current[i] = el; }}
                className="absolute pointer-events-none"
                style={{ willChange: "transform",
                  ...(i === 0 && { // Brand: angled letterpress slash
                    width: 4, height: 180,
                    bottom: "15vh", left: "22vw",
                    background: `linear-gradient(to bottom, transparent, ${section.accent}55, transparent)`,
                    transform: "rotate(20deg)",
                  }),
                  ...(i === 1 && { // UX: cursor SVG
                    width: 42, height: 52,
                    bottom: "18vh", left: "16vw",
                  }),
                  ...(i === 2 && { // Data: binary float text
                    fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                    letterSpacing: "0.12em", lineHeight: 1.7,
                    bottom: "14vh", left: "14vw",
                    color: `${section.accent}40`,
                    userSelect: "none",
                  }),
                }}
              >
                {i === 1 && (
                  <svg width="42" height="52" viewBox="0 0 42 52" fill="none">
                    <path d="M6,6 L6,42 L14,34 L22,50 L27,47 L19,31 L30,31 Z"
                      fill={`${section.accent}55`} stroke={`${section.accent}88`} strokeWidth="1.2"
                      strokeLinejoin="round"/>
                  </svg>
                )}
                {i === 2 && "01 10\n10 01\n00 11\n11 00"}
              </div>

              {/* ── PARALLAX LAYER 0: Giant backdrop word (slowest, deepest) ── */}
              <div
                ref={(el) => { if (el) backdropTextRef.current[i] = el; }}
                className="absolute font-black select-none pointer-events-none"
                style={{
                  fontSize: "clamp(14rem, 22vw, 28rem)",
                  color: "rgba(255,255,255,0.018)",
                  right: "-6vw", bottom: "-10vh",
                  lineHeight: 1,
                  letterSpacing: "-0.08em",
                  willChange: "transform",
                }}
              >
                {i === 0 ? "BRAND" : i === 1 ? "DESIGN" : "DATA"}
              </div>

              {/* ── Big background number (kept, slightly more transparent) ── */}
              <div
                className="absolute font-black select-none pointer-events-none"
                style={{
                  fontSize: "clamp(14rem, 22vw, 26rem)",
                  color: "rgba(255,255,255,0.015)",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
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
                  {i === 0 && (
                    <FlipWordsPanel
                      accent={section.accent}
                      words={BRAND_WORDS}
                      activeIndex={activeIndex === i ? brandWordIndex : 0}
                    />
                  )}
                  {i === 1 && (
                    <LoaderPanel
                      accent={section.accent}
                      steps={LOADER_STEPS}
                    />
                  )}
                  {i === 2 && (
                    <StackedCardsPanel
                      accent={section.accent}
                      cards={AI_STACKED_CARDS}
                      autoplayDelay={2600} 
                      pauseOnHover 
                      sensitivity={260} 
                    />
                  )}
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
        @keyframes blink-caret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
