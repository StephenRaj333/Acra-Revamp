"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Marquee capabilities ─────────────────────────────────────────────────────
const CAPS = [
  "Brand Strategy", "Visual Identity", "UX / UI Design", "Motion Design",
  "Data Analytics", "AI Automation", "Growth Marketing", "Product Design",
];

// ─── Headline words config ────────────────────────────────────────────────────
type WordCfg = { text: string; color: string; stroke?: string };
const WORDS: WordCfg[] = [
  { text: "Together , we",  color: "rgba(255,255,255,0.92)" },
  { text: "scale",  color: "#e63624" },
  { text: "New Heights", color: "transparent", stroke: "1.5px rgba(255,255,255,0.5)" },
];

// ─── Orbital dot positions ─────────────────────────────────────────────────────
type DotSpec = { size: number; glow: number; top?: string; bottom?: string; left?: string; right?: string };
const ORB_DOTS: DotSpec[] = [
  { size: 5,  glow: 14, top: "8%",    left: "18%" },
  { size: 7,  glow: 20, top: "22%",   right: "8%" },
  { size: 4,  glow: 12, bottom: "14%",left: "14%" },
  { size: 6,  glow: 18, bottom: "26%",right: "7%" },
  { size: 3,  glow: 8,  top: "54%",   left: "3%"  },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef   = useRef<HTMLElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const bigARef      = useRef<HTMLDivElement>(null);
  const lineTopRef   = useRef<HTMLDivElement>(null);
  const lineLeftRef  = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const w0Ref        = useRef<HTMLSpanElement>(null);
  const w1Ref        = useRef<HTMLSpanElement>(null);
  const w2Ref        = useRef<HTMLSpanElement>(null);
  const sepRef       = useRef<HTMLDivElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const visualRef    = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const float1Ref    = useRef<HTMLDivElement>(null);
  const float2Ref    = useRef<HTMLDivElement>(null);
  const float3Ref    = useRef<HTMLDivElement>(null);
  const float4Ref    = useRef<HTMLDivElement>(null);
  const float5Ref    = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current!;

    const ctx = gsap.context(() => {
      // ── ENTRY TIMELINE ──────────────────────────────────────────────────────
      const tl = gsap.timeline();

      // 1. Cinematic bg reveal
      tl.fromTo(bgRef.current,
        { scale: 1.18, filter: "brightness(0.35)" },
        { scale: 1, filter: "brightness(1)", duration: 2.4, ease: "expo.out" }
      );

      // 2. Giant A emerges from void
      tl.fromTo(bigARef.current,
        { opacity: 0, scale: 1.5, filter: "blur(40px)" },
        { opacity: 1, scale: 1,   filter: "blur(0px)", duration: 2.2, ease: "power2.out" },
        "-=2.2"
      );

      // 3. Frame lines extend (top horizontal, left vertical)
      tl.fromTo(lineTopRef.current,
        { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" },
        "-=1.8"
      );
      tl.fromTo(lineLeftRef.current,
        { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "expo.inOut" },
        "-=1.3"
      );

      // 4. Badge pill
      tl.fromTo(badgeRef.current,
        { x: -48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=1.0"
      );

      // 5a–5c. Heading word reveals (overflow:hidden + translateY)
      const wordRefs = [w0Ref, w1Ref, w2Ref];
      wordRefs.forEach((ref, wi) => {
        tl.fromTo(ref.current,
          { yPercent: 108, skewY: 2 },
          { yPercent: 0, skewY: 0, duration: 1.05, ease: "expo.out" },
          wi === 0 ? "-=0.8" : "-=0.82"
        );
      });

      // 6. Separator line
      tl.fromTo(sepRef.current,
        { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
        "-=0.5"
      );

      // 7. Sub text
      tl.fromTo(subRef.current,
        { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.45"
      );

      // 8. Stats
      tl.fromTo(statsRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          onStart: () => {
            const statTargets = [
              { end: 200, suffix: "+" },
              { end: 8, suffix: " Yrs" },
              { end: 50, suffix: "+" },
            ];

            statTargets.forEach((target, i) => {
              const el = statValueRefs.current[i];
              if (!el) return;

              const counter = { val: 0 };
              gsap.to(counter, {
                val: target.end,
                duration: 1.15,
                delay: i * 0.08,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(counter.val)}${target.suffix}`;
                },
              });
            });
          },
        },
        "-=0.42"
      );

      // 9. CTAs
      tl.fromTo(ctaRef.current,
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "back.out(1.5)" },
        "-=0.38"
      );

      // 10. Orbital ring — dramatic spin-in
      tl.fromTo(orbRef.current,
        { scale: 0.55, opacity: 0, rotation: -60 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "back.out(1.2)" },
        "-=1.4"
      );

      // 11. Floating shapes pop in
      tl.fromTo(
        [float1Ref.current, float2Ref.current, float3Ref.current, float4Ref.current, float5Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.09, duration: 0.65, ease: "back.out(2.2)" },
        "-=1.0"
      );

      // ── AMBIENT LOOPS ────────────────────────────────────────────────────────
      // Outer ring clockwise
      gsap.to(".hero-ring-outer", {
        rotation: 360, duration: 24, repeat: -1, ease: "none",
        transformOrigin: "center center",
      });
      // Mid ring counter-clockwise
      gsap.to(".hero-ring-mid", {
        rotation: -360, duration: 16, repeat: -1, ease: "none",
        transformOrigin: "center center",
      });

      // Floater idle bobs (different phases + axes for organic feel)
      const bobData = [
        { ref: float1Ref, y: 22,  x: 0,   r: 7,   d: 4.2 },
        { ref: float2Ref, y: -26, x: 14,  r: -10, d: 5.1, delay: 1.0 },
        { ref: float3Ref, y: 14,  x: -10, r: 14,  d: 3.9, delay: 0.6 },
        { ref: float4Ref, y: -20, x: 0,   r: -6,  d: 4.7, delay: 1.8 },
        { ref: float5Ref, y: 18,  x: 8,   r: 8,   d: 3.5, delay: 0.3 },
      ];
      bobData.forEach(({ ref, y, x, r, d, delay = 0 }) => {
        gsap.to(ref.current, {
          y, x, rotation: r,
          duration: d, repeat: -1, yoyo: true,
          ease: "sine.inOut", delay,
        });
      });

      // ── SCROLL PARALLAX (multi-layer depth) ──────────────────────────────────
      const ST = { trigger: section, start: "top top", end: "bottom top", scrub: 1.6 };

      // Layer 0 (deepest): bg barely moves — infinite depth feel
      gsap.to(bgRef.current, { yPercent: 20, ease: "none", scrollTrigger: ST });

      // Layer 1: Giant lettermark — peels away upward
      gsap.to(bigARef.current, {
        yPercent: -30, scale: 1.14,
        ease: "none", scrollTrigger: ST,
      });

      // Layer 2: Orbit visual — moves at medium depth + gains rotation
      gsap.to(orbRef.current, {
        yPercent: -44, rotation: 55,
        ease: "none", scrollTrigger: ST,
      });

      // Layer 3–5: Floating shapes (near, move fastest = lowest depth)
      gsap.to(float1Ref.current, { yPercent: -88,  ease: "none", scrollTrigger: { ...ST, scrub: 1.0 } });
      gsap.to(float2Ref.current, { yPercent: -68, xPercent: 7,  ease: "none", scrollTrigger: { ...ST, scrub: 1.0 } });
      gsap.to(float3Ref.current, { yPercent: -52,  ease: "none", scrollTrigger: { ...ST, scrub: 0.9 } });
      gsap.to(float4Ref.current, { yPercent: -115, ease: "none", scrollTrigger: { ...ST, scrub: 0.8 } });
      gsap.to(float5Ref.current, { yPercent: -75,  ease: "none", scrollTrigger: { ...ST, scrub: 1.1 } });

      // Layer 6: Content exits upward + fades (parallax exit)
      gsap.to(contentRef.current, {
        yPercent: -20, opacity: 0,
        ease: "none", scrollTrigger: { ...ST, scrub: 1.3, end: "55% top" },
      });

      // Scroll indicator vanishes first
      gsap.to(scrollIndRef.current, {
        opacity: 0, yPercent: -28,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "16% top", scrub: 1 },
      });

    }, section);

    // ── MOUSE 3D TILT ──────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 → 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(visualRef.current, {
        rotateX: ny * -8, rotateY: nx * 10,
        duration: 1.6, ease: "power2.out",
        transformPerspective: 1400,
      });
    };
    const onMouseLeave = () => {
      gsap.to(visualRef.current, {
        rotateX: 0, rotateY: 0,
        duration: 2.2, ease: "elastic.out(1, 0.4)",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="relative min-h-[92vh] overflow-hidden px-5 pb-14 pt-28" style={{ background: "linear-gradient(160deg, #2d0d06 0%, #1a0603 48%, #0b0302 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgba(230,54,36,0.35),transparent_40%),radial-gradient(circle_at_78%_72%,rgba(230,54,36,0.2),transparent_42%)]" />
        <div className="relative z-10 mx-auto max-w-xl text-left">
          <p className="inline-flex items-center rounded-full border border-[#e6362460] bg-[#e636241a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
            AKRA - Full Service Consultancy
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] text-white">
            Together, we
            <span className="block text-[#e63624]">scale</span>
            <span className="block text-white/85">new heights</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            We bring together business strategy, design, and technology to help your company grow faster with clarity and confidence.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/25 p-3">
            <div>
              <p className="text-xl font-black text-white">200+</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">Brands Scaled</p>
            </div>
            <div>
              <p className="text-xl font-black text-white">8 Yrs</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">In Industry</p>
            </div>
            <div>
              <p className="text-xl font-black text-white">50+</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">Awards Won</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh", overflow: "hidden", position: "relative", background: "#0b0302" }}
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, willChange: "transform, filter" }}>
        {/* Main gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(122deg, #2d0d06 0%, #1a0603 38%, #0b0302 100%)",
        }}/>
        {/* Film-grain noise */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.042,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "220px",
        }}/>
        {/* Radial vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}/>
        {/* Ground glow */}
        <div style={{
          position: "absolute", bottom: "-12%", left: "50%", transform: "translateX(-50%)",
          width: "58%", height: "42%",
          background: "radial-gradient(ellipse, rgba(230,54,36,0.14), transparent 70%)",
          filter: "blur(70px)",
        }}/>
      </div>

      {/* ── Giant "A" Lettermark ────────────────────────────────────────────── */}
      <div
        ref={bigARef}
        style={{
          position: "absolute", right: "-3vw", bottom: "-6vh",
          fontSize: "clamp(18rem, 36vw, 42rem)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.08em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(230,54,36,0.052)",
          userSelect: "none", willChange: "transform, filter",
          zIndex: 1, pointerEvents: "none",
        }}
      >A</div>

      {/* ── Frame accent lines ──────────────────────────────────────────────── */}
      <div ref={lineTopRef} style={{
        position: "absolute", top: 30, left: "8vw",
        width: "calc(84vw)", height: 1,
        background: "linear-gradient(to right, rgba(230,54,36,0.55), rgba(255,255,255,0.07), transparent)",
        zIndex: 15, transformOrigin: "left center",
      }}/>
      <div ref={lineLeftRef} style={{
        position: "absolute", top: 30, left: "8vw",
        width: 1, height: "calc(100vh - 60px)",
        background: "linear-gradient(to bottom, rgba(230,54,36,0.55), rgba(255,255,255,0.04) 60%, transparent)",
        zIndex: 15, transformOrigin: "top center",
      }}/>

      {/* ── Top right corner bracket ────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 30, right: "8vw",
        width: 30, height: 30,
        borderTop: "1.5px solid rgba(255,255,255,0.1)",
        borderRight: "1.5px solid rgba(255,255,255,0.1)",
        zIndex: 15,
      }}/>
      {/* Bottom left corner bracket */}
      <div style={{
        position: "absolute", bottom: 42, left: "8vw",
        width: 30, height: 30,
        borderBottom: "1.5px solid rgba(255,255,255,0.08)",
        borderLeft: "1.5px solid rgba(255,255,255,0.08)",
        zIndex: 15,
      }}/>

      {/* ── Section index ────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 30, right: "calc(8vw + 46px)",
        zIndex: 15, display: "flex", alignItems: "center", gap: 8, opacity: 0.25,
      }}>
        <span style={{ fontSize: 9, fontFamily: "monospace", color: "white", letterSpacing: "0.14em" }}>
          00 / 04
        </span>
      </div>

      {/* ── FLOATING PARALLAX SHAPES ─────────────────────────────────────────── */}
      {/* Float 1: large accent ring — upper right */}
      <div ref={float1Ref} style={{
        position: "absolute", top: "7vh", right: "7vw",
        width: 230, height: 230, borderRadius: "50%",
        border: "1px solid rgba(230,54,36,0.18)",
        willChange: "transform", zIndex: 3, opacity: 0,
      }}>
        <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px solid rgba(230,54,36,0.07)" }}/>
        <div style={{ position: "absolute", inset: 5,  borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.03)" }}/>
      </div>

      {/* Float 2: diamond — lower left */}
      <div ref={float2Ref} style={{
        position: "absolute", bottom: "22vh", left: "3.5vw",
        width: 58, height: 58,
        border: "1.5px solid rgba(230,54,36,0.42)",
        transform: "rotate(45deg)",
        willChange: "transform", zIndex: 3, opacity: 0,
      }}>
        <div style={{ position: "absolute", inset: 9, border: "1px solid rgba(230,54,36,0.18)" }}/>
      </div>

      {/* Float 3: grid square — left mid */}
      <div ref={float3Ref} style={{
        position: "absolute", top: "34vh", left: "2.5vw",
        willChange: "transform", zIndex: 3, opacity: 0,
      }}>
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
          <rect x="1" y="1" width="72" height="72" stroke="rgba(230,54,36,0.24)" strokeWidth="1"/>
          <line x1="25" x2="25" y1="1" y2="73" stroke="rgba(230,54,36,0.1)" strokeWidth="0.5"/>
          <line x1="49" x2="49" y1="1" y2="73" stroke="rgba(230,54,36,0.1)" strokeWidth="0.5"/>
          <line y1="25" y2="25" x1="1" x2="73" stroke="rgba(230,54,36,0.1)" strokeWidth="0.5"/>
          <line y1="49" y2="49" x1="1" x2="73" stroke="rgba(230,54,36,0.1)" strokeWidth="0.5"/>
          <circle cx="37" cy="37" r="3.5" fill="rgba(230,54,36,0.45)"/>
        </svg>
      </div>

      {/* Float 4: diagonal slash — top center */}
      <div ref={float4Ref} style={{
        position: "absolute", top: "10vh", left: "42vw",
        width: 3, height: 140,
        background: "linear-gradient(to bottom, transparent, rgba(230,54,36,0.52), transparent)",
        transform: "rotate(22deg)",
        willChange: "transform", zIndex: 3, opacity: 0,
      }}/>

      {/* Float 5: plus/crosshair — right mid */}
      <div ref={float5Ref} style={{
        position: "absolute", top: "52vh", right: "14vw",
        willChange: "transform", zIndex: 3, opacity: 0,
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="0" x2="14" y2="28" stroke="rgba(230,54,36,0.45)" strokeWidth="1.5"/>
          <line x1="0" y1="14" x2="28" y2="14" stroke="rgba(230,54,36,0.45)" strokeWidth="1.5"/>
          <circle cx="14" cy="14" r="2.5" fill="rgba(230,54,36,0.6)"/>
        </svg>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 10, height: "100%",
        display: "flex", alignItems: "center",
        padding: "0 8vw", gap: "5vw",
      }}>

        {/* LEFT — Content */}
        <div ref={contentRef} style={{ flex: "0 0 auto", marginTop: '5vw', width: "min(52vw, 660px)", willChange: "transform, opacity" }}>

          {/* Badge */}
          <div ref={badgeRef} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginTop: 16,
            marginBottom: 8, opacity: 0,
            padding: "7px 16px",
            border: "1px solid rgba(230,54,36,0.32)",
            borderRadius: 100,
            background: "rgba(230,54,36,0.07)",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#e63624", boxShadow: "0 0 8px #e63624",
              animation: "hero-pulse-dot 2s ease-in-out infinite",
            }}/>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: "0.28em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.52)",
            }}>AKRA — Full Service Consultancy</span>
          </div>

          {/* 3-word headline */}
          <div style={{ marginBottom: 22 }}>
            {WORDS.map((word, wi) => {
              const refs = [w0Ref, w1Ref, w2Ref];
              return (
                <div key={wi} style={{ overflow: "hidden", lineHeight: 'normal', marginBottom: 5 }}>
                  <span
                    ref={refs[wi]}
                    style={{
                      display: "block",
                      fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 'normal',
                      willChange: "transform",
                      color: word.color,
                      ...(word.stroke ? { WebkitTextStroke: word.stroke } : {}),
                    } as React.CSSProperties}
                  >{word.text}</span>
                </div>
              );
            })}
          </div>

          {/* Separator */}
          <div ref={sepRef} style={{
            height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 20,
            transformOrigin: "left center",
          }}/>

          {/* Sub */}
          <p ref={subRef} style={{
            fontSize: "clamp(0.87rem, 1.15vw, 1rem)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.85, maxWidth: 430, marginBottom: 24,
            opacity: 0,
          }}>
            We bring together brilliant thinkers who understand business, tech, and marketing to help your company reach higher and grow stronger.
          </p>

          {/* Stats */}
          <div ref={statsRef} style={{ display: "flex", gap: 0, marginBottom: 30, opacity: 0 }}>
            {[
              { v: "200+",  l: "Brands Scaled" },
              { v: "8 Yrs", l: "In Industry"   },
              { v: "50+",   l: "Awards Won"     },
            ].map((s, si) => (
              <div key={si} style={{
                paddingLeft: si > 0 ? 28 : 0,
                marginLeft:  si > 0 ? 28 : 0,
                borderLeft:  si > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{
                  fontSize: "clamp(1.7rem, 2.5vw, 2.8rem)", fontWeight: 900,
                  color: "white", letterSpacing: "-0.04em", lineHeight: 1,
                }} ref={(el) => { statValueRefs.current[si] = el; }}>0</div> 
                <div style={{
                  fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase" as const, color: "rgba(255,255,255,0.26)",
                  marginTop: 5,
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Visual spectacle */}
        <div ref={visualRef} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", willChange: "transform",
        }}>
          {/* Orbit ring system */}
          <div ref={orbRef} style={{ position: "relative", width: 420, height: 420, willChange: "transform" }}>

            {/* Outer rotating ring */}
            <div className="hero-ring-outer" style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1.5px solid rgba(230,54,36,0.28)",
            }}>
              {/* Cardinal glow dots */}
              {[0, 90, 180, 270].map((deg, di) => {
                const rad = (deg * Math.PI) / 180;
                const r = 209;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <div key={di} style={{
                    position: "absolute",
                    width: di === 0 ? 12 : 8, height: di === 0 ? 12 : 8,
                    borderRadius: "50%", background: "#e63624",
                    boxShadow: `0 0 ${di === 0 ? 24 : 14}px #e63624`,
                    left: "50%", top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}/>
                );
              })}
              {/* Diagonal micro-dots */}
              {[45, 135, 225, 315].map((deg, di) => {
                const rad = (deg * Math.PI) / 180;
                const r = 209;
                return (
                  <div key={`m${di}`} style={{
                    position: "absolute", width: 5, height: 5, borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    left: "50%", top: "50%",
                    transform: `translate(calc(-50% + ${Math.cos(rad) * r}px), calc(-50% + ${Math.sin(rad) * r}px))`,
                  }}/>
                );
              })}
            </div>

            {/* Mid ring: dashed, counter-rotates — carries BRAND letters */}
            <div className="hero-ring-mid" style={{
              position: "absolute",
              width: 294, height: 294,
              top: (420 - 294) / 2, left: (420 - 294) / 2,
              borderRadius: "50%",
              border: "1px dashed rgba(230,54,36,0.22)",
            }}>
              {["B","R","A","N","D"]?.map((l, li) => {
                const angle = (li / 5) * 2 * Math.PI - Math.PI / 2;
                const r = 146;
                return (
                  <div key={li} style={{
                    position: "absolute",
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(230,54,36,0.1)",
                    border: "1.5px solid rgba(230,54,36,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#e63624", fontSize: 14, fontWeight: 900, letterSpacing: "0.06em",
                    boxShadow: "0 0 14px rgba(230,54,36,0.2)",
                    left: "50%", top: "50%",
                    transform: `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`,
                  }}>
                    {l}
                  </div>
                );
              })}
            </div>

            {/* Inner glow ring */}
            <div style={{
              position: "absolute",
              width: 200, height: 200,
              top: (420 - 200) / 2, left: (420 - 200) / 2,
              borderRadius: "50%",
              border: "0.5px solid rgba(230,54,36,0.15)",
              background: "radial-gradient(circle at 50% 50%, rgba(230,54,36,0.04), transparent 70%)",
            }}/>

            {/* Core frosted circle with gem SVG */}
            <div style={{
              position: "absolute",
              width: 172, height: 172,
              top: (420 - 172) / 2, left: (420 - 172) / 2,
              borderRadius: "50%",
              background: "radial-gradient(circle at 36% 33%, rgba(230,54,36,0.36), rgba(230,54,36,0.04))",
              border: "2px solid rgba(230,54,36,0.5)",
              boxShadow: "0 0 100px rgba(230,54,36,0.28), inset 0 0 50px rgba(230,54,36,0.1)",
              backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="78" height="90" viewBox="0 0 78 90" fill="none">
                <defs>
                  <linearGradient id="heroGemG" x1="18%" y1="0%" x2="82%" y2="100%">
                    <stop offset="0%" stopColor="#FF9F80"/>
                    <stop offset="100%" stopColor="#e63624"/>
                  </linearGradient>
                  <filter id="heroGemSh" x="-20%" y="-10%" width="140%" height="135%">
                    <feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="#e63624" floodOpacity="0.55"/>
                  </filter>
                </defs>
                <polygon points="39,4 71,24 39,42 7,24" fill="url(#heroGemG)" filter="url(#heroGemSh)"/>
                <polygon points="7,24  39,42 20,68" fill="#C22A14"/>
                <polygon points="71,24 39,42 58,68" fill="#A01800"/>
                <polygon points="20,68 39,42 58,68 39,86" fill="#800800"/>
                <polygon points="39,4 54,24 39,34" fill="rgba(255,255,255,0.42)"/>
                <polygon points="39,4 24,24 39,34" fill="rgba(255,255,255,0.11)"/>
              </svg>
            </div>

            {/* Micro accent dots scattered around orb */}
            {ORB_DOTS.map(({ size, glow, ...pos }, di) => (
              <div key={di} style={{
                position: "absolute", width: size, height: size, borderRadius: "50%",
                background: "#e63624", boxShadow: `0 0 ${glow}px #e63624`,
                ...pos,
              } as React.CSSProperties}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────────── */}
      <div ref={scrollIndRef} style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        zIndex: 20,
      }}>
        
      </div>

      {/* ── Bottom capability marquee ─────────────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center",
        background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)",
        zIndex: 20,
      }}>
        {/* Double the items so seamless loop with translateX(-50%) */}
        <div style={{
          display: "flex", gap: 0,
          animation: "hero-marquee 30s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {[0, 1].map((ri) => (
            <span key={ri} style={{ display: "inline-flex", alignItems: "center" }}>
              {CAPS.map((item, ii) => (
                <span key={ii} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span style={{
                    fontSize: 9.5, fontWeight: 700, letterSpacing: "0.24em",
                    textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)",
                    padding: "0 20px",
                  }}>{item}</span>
                  <span style={{ color: "rgba(230,54,36,0.45)", fontSize: 7, fontWeight: 900 }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Keyframes ────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes hero-mouse-dot {
          0%, 100% { transform: translateY(0);    opacity: 1;   }
          60%       { transform: translateY(14px); opacity: 0.1; }
        }
        @keyframes hero-pulse-dot {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        @keyframes hero-marquee {
          from { transform: translateX(0);    }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
