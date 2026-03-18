import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "components", "StickyReveal.tsx");

const content = `"use client";
import { useEffect, useRef, ReactElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    headline: ["Brand", "Vision"],
    tag: "Brand & Strategy",
    blobBg: "linear-gradient(145deg, #F7D4C4 0%, #F0C0A8 100%)",
    accentColor: "#e63624",
    services: [
      { name: "Brand Identity",   scope: "Full Suite",    iconBg: "#FDE8E0", iconColor: "#e63624" },
      { name: "Strategy Roadmap", scope: "Custom Plan",   iconBg: "#FBCFBF", iconColor: "#C22A10" },
      { name: "Campaign Design",  scope: "Multi-Channel", iconBg: "#F9B8A0", iconColor: "#A01800" },
    ],
  },
  {
    id: 1,
    headline: ["UX", "Studio"],
    tag: "Experience Design",
    blobBg: "linear-gradient(145deg, #B8EDE6 0%, #9ADAD0 100%)",
    accentColor: "#0d9488",
    services: [
      { name: "UI Design System",  scope: "End to End",  iconBg: "#C8F5EF", iconColor: "#0d9488" },
      { name: "Figma Prototyping", scope: "Interactive", iconBg: "#8FDED4", iconColor: "#077068" },
      { name: "User Research",     scope: "Deep Dive",   iconBg: "#5ECDC0", iconColor: "#055A54" },
    ],
  },
  {
    id: 2,
    headline: ["AI", "Engine"],
    tag: "Data & Automation",
    blobBg: "linear-gradient(145deg, #E0D0F8 0%, #CDB8F0 100%)",
    accentColor: "#7c3aed",
    services: [
      { name: "Analytics Platform", scope: "Real-time",  iconBg: "#EDE0FC", iconColor: "#7c3aed" },
      { name: "AI Automation",      scope: "Enterprise", iconBg: "#D0B8F8", iconColor: "#5B1FCC" },
      { name: "Data Pipeline",      scope: "End to End", iconBg: "#B898F0", iconColor: "#3B0FAA" },
    ],
  },
];

// ── Service Row Icons ─────────────────────────────────────────────────────────
function ServiceIcon({ slideIdx, rowIdx, color }: { slideIdx: number; rowIdx: number; color: string }) {
  if (slideIdx === 0) {
    if (rowIdx === 0) return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill={color} opacity="0.9"/>
        <polygon points="10,2 14,7 10,10" fill="rgba(255,255,255,0.4)"/>
      </svg>
    );
    if (rowIdx === 1) return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.8"/>
        <circle cx="10" cy="10" r="2" fill={color}/>
        <line x1="10" y1="2" x2="10" y2="5" stroke={color} strokeWidth="1.5"/>
        <line x1="18" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.5"/>
      </svg>
    );
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M2,8 L14,4 L14,14 L2,12 Z" fill={color} opacity="0.9"/>
        <path d="M14,7 Q18,9 18,10 Q18,11 14,13" fill={color} opacity="0.6"/>
        <circle cx="2" cy="14" r="2.5" fill={color}/>
      </svg>
    );
  }
  if (slideIdx === 1) {
    if (rowIdx === 0) return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect x="2" y="3" width="16" height="11" rx="2" fill={color} opacity="0.9"/>
        <rect x="6" y="14" width="8" height="2" fill={color} opacity="0.6"/>
        <rect x="4" y="5" width="12" height="7" rx="1" fill="rgba(255,255,255,0.35)"/>
      </svg>
    );
    if (rowIdx === 1) return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M4,15 L13,6 Q16,3 17,4 Q18,5 15,8 L6,17 Z" fill={color} opacity="0.9"/>
        <circle cx="5" cy="15" r="1.5" fill={color}/>
      </svg>
    );
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M2,10 Q10,2 18,10 Q10,18 2,10 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3.5" fill={color}/>
        <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.6)"/>
      </svg>
    );
  }
  if (rowIdx === 0) return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect x="2" y="11" width="4" height="7" rx="1" fill={color}/>
      <rect x="8" y="7" width="4" height="11" rx="1" fill={color} opacity="0.8"/>
      <rect x="14" y="3" width="4" height="15" rx="1" fill={color} opacity="0.6"/>
    </svg>
  );
  if (rowIdx === 1) return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect x="5" y="7" width="10" height="9" rx="3" fill={color} opacity="0.9"/>
      <rect x="8" y="3" width="4" height="4" rx="1" fill={color} opacity="0.7"/>
      <circle cx="8" cy="11" r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="12" cy="11" r="1.5" fill="rgba(255,255,255,0.7)"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="4" r="2" fill={color}/>
      <circle cx="4" cy="14" r="2" fill={color} opacity="0.8"/>
      <circle cx="16" cy="14" r="2" fill={color} opacity="0.8"/>
      <line x1="10" y1="6" x2="4" y2="12" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <line x1="10" y1="6" x2="16" y2="12" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
}

// ── Center Illustrations (inside 148px frosted circle) ────────────────────────

function IllBrand(): ReactElement {
  return (
    <svg width="80" height="94" viewBox="0 0 80 94" fill="none">
      <defs>
        <linearGradient id="ilBTop" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FF9F80"/><stop offset="100%" stopColor="#E63624"/>
        </linearGradient>
        <linearGradient id="ilBL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C22A14"/><stop offset="100%" stopColor="#8A1200"/>
        </linearGradient>
        <linearGradient id="ilBR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E63624"/><stop offset="100%" stopColor="#A01800"/>
        </linearGradient>
        <filter id="ilBSh" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#E63624" floodOpacity="0.38"/>
        </filter>
      </defs>
      <polygon points="40,6 72,26 40,44 8,26" fill="url(#ilBTop)" filter="url(#ilBSh)"/>
      <polygon points="8,26 40,44 20,70" fill="url(#ilBL)"/>
      <polygon points="72,26 40,44 60,70" fill="url(#ilBR)"/>
      <polygon points="20,70 40,44 60,70 40,90" fill="#B01800"/>
      <polygon points="40,6 55,26 40,36" fill="rgba(255,255,255,0.38)"/>
      <polygon points="40,6 25,26 40,36" fill="rgba(255,255,255,0.1)"/>
    </svg>
  );
}

function IllUX(): ReactElement {
  return (
    <svg width="92" height="78" viewBox="0 0 92 78" fill="none">
      <defs>
        <linearGradient id="ilUXG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4"/><stop offset="100%" stopColor="#0D9488"/>
        </linearGradient>
        <filter id="ilUXSh" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#0D9488" floodOpacity="0.32"/>
        </filter>
      </defs>
      <rect x="3" y="4" width="86" height="54" rx="8" fill="url(#ilUXG)" filter="url(#ilUXSh)"/>
      <rect x="9" y="10" width="74" height="42" rx="5" fill="rgba(255,255,255,0.18)"/>
      <rect x="15" y="16" width="26" height="4" rx="2" fill="rgba(255,255,255,0.65)"/>
      <rect x="15" y="24" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.35)"/>
      <rect x="15" y="30" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.22)"/>
      <rect x="52" y="15" width="24" height="22" rx="4" fill="rgba(255,255,255,0.22)"/>
      <rect x="55" y="18" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="55" y="24" width="12" height="2.5" rx="1.2" fill="rgba(255,255,255,0.3)"/>
      <rect x="37" y="58" width="18" height="6" rx="1" fill="#0D9488"/>
      <rect x="26" y="64" width="40" height="4" rx="2" fill="#077068"/>
      <ellipse cx="22" cy="17" rx="9" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-5 22 17)"/>
    </svg>
  );
}

function IllAI(): ReactElement {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
      <defs>
        <linearGradient id="ilAITop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8AEFF"/><stop offset="100%" stopColor="#9B6EE8"/>
        </linearGradient>
        <linearGradient id="ilAIL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#5B1FCC"/>
        </linearGradient>
        <linearGradient id="ilAIR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9B6EE8"/><stop offset="100%" stopColor="#3B0FAA"/>
        </linearGradient>
        <filter id="ilAISh" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="10" floodColor="#7C3AED" floodOpacity="0.42"/>
        </filter>
      </defs>
      <polygon points="44,8 78,26 44,44 10,26" fill="url(#ilAITop)" filter="url(#ilAISh)"/>
      <polygon points="10,26 44,44 44,80 10,62" fill="url(#ilAIL)"/>
      <polygon points="78,26 44,44 44,80 78,62" fill="url(#ilAIR)"/>
      <polygon points="44,8 61,26 44,36" fill="rgba(255,255,255,0.3)"/>
    </svg>
  );
}

const CENTER_ILLS: (() => ReactElement)[] = [IllBrand, IllUX, IllAI];

// ── Satellite SVGs ─────────────────────────────────────────────────────────────

function SatGold(): ReactElement {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <defs>
        <radialGradient id="satGoldG" cx="35%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#FFE566"/><stop offset="55%" stopColor="#FFAA00"/><stop offset="100%" stopColor="#CC7700"/>
        </radialGradient>
        <filter id="satGoldSh" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="2" dy="5" stdDeviation="6" floodColor="#CC7700" floodOpacity="0.42"/>
        </filter>
      </defs>
      <circle cx="30" cy="30" r="25" fill="url(#satGoldG)" filter="url(#satGoldSh)"/>
      <ellipse cx="23" cy="21" rx="7" ry="4.5" fill="rgba(255,255,255,0.46)" transform="rotate(-25 23 21)"/>
    </svg>
  );
}

function SatCoral(): ReactElement {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="satCoralG" cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#FF7A55"/><stop offset="100%" stopColor="#CC2A14"/>
        </radialGradient>
        <filter id="satCoralSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#CC2A14" floodOpacity="0.36"/>
        </filter>
      </defs>
      <path d="M27,5 C37,4 47,12 48,22 C49,32 41,41 31,44 C21,47 10,40 7,30 C4,20 10,9 20,6 C23,5 25,5 27,5 Z"
        fill="url(#satCoralG)" filter="url(#satCoralSh)"/>
      <ellipse cx="21" cy="17" rx="7.5" ry="4.5" fill="rgba(255,255,255,0.3)" transform="rotate(-15 21 17)"/>
    </svg>
  );
}

function SatTeal(): ReactElement {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="satTealG" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stopColor="#5EEAD4"/><stop offset="55%" stopColor="#0D9488"/><stop offset="100%" stopColor="#065F5A"/>
        </radialGradient>
        <filter id="satTealSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="6" stdDeviation="7" floodColor="#0D9488" floodOpacity="0.46"/>
        </filter>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#satTealG)" filter="url(#satTealSh)"/>
      <ellipse cx="24" cy="23" rx="8" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-22 24 23)"/>
    </svg>
  );
}

function SatCloud(): ReactElement {
  return (
    <svg width="70" height="46" viewBox="0 0 70 46" fill="none">
      <defs>
        <filter id="satCloudSh" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#0D9488" floodOpacity="0.18"/>
        </filter>
      </defs>
      <path d="M13,36 Q3,36 3,27 Q3,18 11,17 Q10,7 20,7 Q25,4 32,9 Q38,4 47,10 Q56,8 58,17 Q64,17 64,26 Q64,36 52,36 Z"
        fill="white" filter="url(#satCloudSh)"/>
    </svg>
  );
}

function SatOrange(): ReactElement {
  return (
    <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
      <defs>
        <linearGradient id="satOrangeG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB088"/><stop offset="100%" stopColor="#E85520"/>
        </linearGradient>
        <filter id="satOrangeSh" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="6" floodColor="#E85520" floodOpacity="0.4"/>
        </filter>
      </defs>
      <polygon points="28,4 52,18 52,42 28,56 4,42 4,18" fill="url(#satOrangeG)" filter="url(#satOrangeSh)"/>
      <polygon points="28,4 40,18 28,25" fill="rgba(255,255,255,0.36)"/>
    </svg>
  );
}

function SatPurple(): ReactElement {
  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
      <defs>
        <radialGradient id="satPurpleG" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stopColor="#C8AEFF"/><stop offset="55%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#4A1FA8"/>
        </radialGradient>
        <filter id="satPurpleSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="6" stdDeviation="7" floodColor="#5B1FCC" floodOpacity="0.46"/>
        </filter>
      </defs>
      <circle cx="31" cy="31" r="27" fill="url(#satPurpleG)" filter="url(#satPurpleSh)"/>
      <ellipse cx="24" cy="23" rx="8" ry="5" fill="rgba(255,255,255,0.38)" transform="rotate(-22 24 23)"/>
    </svg>
  );
}

const SATELLITES: (() => ReactElement)[][] = [
  [SatGold, SatCoral],
  [SatTeal, SatCloud],
  [SatOrange, SatPurple],
];

type SatPos = { top?: number; bottom?: number; left?: number; right?: number };
const SAT_POSITIONS: SatPos[][] = [
  [{ top: -22, right: -10 }, { bottom: -14, left: -18 }],
  [{ top: -26, left: 20 },   { bottom: 16, right: -30 }],
  [{ top: -18, right: -8 },  { bottom: -16, left: 10 }],
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function StickyReveal() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const currentIdx = useRef(0);

  const blobRefs      = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const outerRingRef  = useRef<HTMLDivElement>(null);
  const midRingRef    = useRef<HTMLDivElement>(null);
  const accentDotRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const centerGlowRef = useRef<HTMLDivElement>(null);
  const centerIllRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const satelliteRefs = useRef<(HTMLDivElement | null)[][]>([[null, null], [null, null], [null, null]]);
  const nameRefs      = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const tagRefs       = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rowRefs       = useRef<(HTMLDivElement | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
  const dotRefs       = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Hide slides 1 & 2 initially ──────────────────────────────────────
    [1, 2].forEach((si) => {
      gsap.set(blobRefs.current[si],       { opacity: 0 });
      gsap.set(nameRefs.current[si],       { opacity: 0, y: 22 });
      gsap.set(tagRefs.current[si],        { opacity: 0 });
      gsap.set(centerIllRefs.current[si],  { opacity: 0, scale: 0.62 });
      satelliteRefs.current[si].forEach((el) => gsap.set(el, { opacity: 0, scale: 0.28 }));
      rowRefs.current[si].forEach((el)     => gsap.set(el, { opacity: 0, x: 22 }));
    });

    // ── Entrance for slide 0 ─────────────────────────────────────────────
    const entrance = gsap.timeline({ delay: 0.3 });
    entrance
      .fromTo(blobRefs.current[0], { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.72, ease: "power2.out" })
      .fromTo(centerIllRefs.current[0], { scale: 0.5, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.88, ease: "back.out(1.5)" }, "-=0.42")
      .fromTo(nameRefs.current[0], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.55")
      .fromTo(tagRefs.current[0], { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");

    satelliteRefs.current[0].forEach((el, i) =>
      entrance.fromTo(el, { scale: 0.22, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.4)" }, \`-=\${i === 0 ? 0.18 : 0.36}\`)
    );
    rowRefs.current[0].forEach((el, i) =>
      entrance.fromTo(el, { x: 22, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, i === 0 ? "-=0.45" : "-=0.32")
    );

    // ── Idle satellite float (all slides, continuous) ────────────────────
    SLIDES.forEach((_, si) => {
      satelliteRefs.current[si].forEach((el, oi) => {
        if (!el) return;
        gsap.to(el, {
          y: \`+=\${[11, 14][oi]}\`, x: \`+=\${[5, -6][oi]}\`, rotation: \`+=\${[4, -5][oi]}\`,
          duration: [2.9, 3.4][oi], repeat: -1, yoyo: true, ease: "sine.inOut", delay: oi * 0.5,
        });
      });
    });

    // ── Center illustration idle float ───────────────────────────────────
    gsap.to(centerIllRefs.current[0], { y: 7, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut", delay: 0.9 });

    // ── Outer ring: scroll-SCRUB rotation (visually spins as you scroll) ─
    gsap.to(outerRingRef.current, {
      rotation: 720,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "+=250%", scrub: 1.4 },
    });

    // ── Mid ring: counter-rotates on scroll ──────────────────────────────
    gsap.to(midRingRef.current, {
      rotation: -720,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "+=250%", scrub: 1.4 },
    });

    // ── Pin + slide-swap trigger ─────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "+=250%",
      pin: true,
      onUpdate: (self) => {
        const p = self.progress;
        const newIdx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
        if (newIdx !== currentIdx.current) {
          animateTransition(currentIdx.current, newIdx);
          currentIdx.current = newIdx;
        }
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      entrance.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Slide transition ─────────────────────────────────────────────────────
  function animateTransition(from: number, to: number) {
    const ease   = "power3.inOut";
    const d      = 0.27;
    const accent = SLIDES[to].accentColor;

    // Blob crossfade
    gsap.to(blobRefs.current[from], { opacity: 0, duration: 0.45, ease });
    gsap.fromTo(blobRefs.current[to], { opacity: 0 }, { opacity: 1, duration: 0.55, ease, delay: d });

    // Accent dots color
    accentDotRefs.current.forEach((el, di) => {
      if (!el) return;
      gsap.to(el, { backgroundColor: accent, boxShadow: \`0 0 \${di === 0 ? 18 : 12}px \${accent}\`, duration: 0.55, delay: d });
    });

    // Center glow shadow color
    gsap.to(centerGlowRef.current, { boxShadow: \`0 8px 44px \${accent}50, 0 2px 14px rgba(0,0,0,0.1)\`, duration: 0.6, delay: d });

    // Center illustration exit
    gsap.killTweensOf(centerIllRefs.current[from]);
    gsap.to(centerIllRefs.current[from], { scale: 0.48, opacity: 0, rotation: 24, duration: 0.32, ease: "power2.in" });

    // Center illustration enter (burst in with spin)
    gsap.fromTo(
      centerIllRefs.current[to],
      { scale: 1.38, opacity: 0, rotation: -26 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.74, ease: "back.out(1.5)", delay: d + 0.08 }
    );
    gsap.killTweensOf(centerIllRefs.current[to]);
    gsap.to(centerIllRefs.current[to], { y: 7, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut", delay: d + 0.88 });

    // Satellites exit / enter
    satelliteRefs.current[from].forEach((el, i) =>
      gsap.to(el, { opacity: 0, scale: 0.28, duration: 0.24 + i * 0.05, ease: "power2.in" })
    );
    satelliteRefs.current[to].forEach((el, i) =>
      gsap.fromTo(el, { opacity: 0, scale: 0.28 }, { opacity: 1, scale: 1, duration: 0.58, ease: "back.out(1.4)", delay: d + 0.18 + i * 0.12 })
    );

    // Name + tag
    gsap.to(nameRefs.current[from], { opacity: 0, y: -20, duration: 0.34 });
    gsap.to(tagRefs.current[from],  { opacity: 0, duration: 0.24 });
    gsap.fromTo(nameRefs.current[to], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: d + 0.2 });
    gsap.fromTo(tagRefs.current[to],  { opacity: 0 },        { opacity: 1, duration: 0.4, delay: d + 0.22 });

    // Service rows
    rowRefs.current[from].forEach((el, i) => gsap.to(el, { opacity: 0, x: -15, duration: 0.2 + i * 0.04 }));
    rowRefs.current[to].forEach((el, i) =>
      gsap.fromTo(el, { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: 0.46, ease: "power2.out", delay: d + 0.3 + i * 0.08 })
    );

    // Right panel flash
    gsap.fromTo(rightPanelRef.current, { backgroundColor: "#f7f7f7" }, { backgroundColor: "#ffffff", duration: 0.65, delay: d });

    // Progress dots
    dotRefs.current.forEach((dot, i) =>
      gsap.to(dot, { scale: i === to ? 1.6 : 1, backgroundColor: i === to ? SLIDES[i].accentColor : "rgba(0,0,0,0.14)", duration: 0.38 })
    );
  }

  function dotXY(deg: number, r: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
  }

  const A0 = SLIDES[0].accentColor;

  return (
    <section
      ref={wrapRef}
      style={{ height: "100vh", background: "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* Card */}
      <div style={{
        width: "88vw", maxWidth: 1060, height: "84vh", maxHeight: 620,
        background: "white", borderRadius: 28, overflow: "hidden",
        boxShadow: "0 28px 80px rgba(0,0,0,0.13), 0 6px 20px rgba(0,0,0,0.07)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Content row */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ════ LEFT PANEL ═════════════════════════════════════════════ */}
          <div style={{ position: "relative", width: "44%", flexShrink: 0, overflow: "visible", zIndex: 2 }}>

            {/* Stacked colored blob backgrounds */}
            {SLIDES.map((slide, si) => (
              <div key={si} ref={(el) => { blobRefs.current[si] = el; }}
                style={{ position: "absolute", inset: 0, background: slide.blobBg, borderRadius: "0 32px 32px 0" }}>
                <div style={{ position: "absolute", top: 18, left: 18, zIndex: 20, display: "flex", alignItems: "center", gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
                    <polygon points="14,2 26,26 2,26" fill={slide.accentColor}/>
                  </svg>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: slide.accentColor }}>
                    AKRA
                  </span>
                </div>
              </div>
            ))}

            {/* ── ORBIT SYSTEM — centered, shifted up 30px for text space ─ */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 320, height: 320,
              marginLeft: -160, marginTop: -190,
              zIndex: 5,
            }}>

              {/* OUTER RING — GSAP scrub-rotates as you scroll */}
              <div ref={outerRingRef} style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: \`1.5px solid \${A0}65\`,
                willChange: "transform",
              }}>
                {/* 4 large accent glow dots at cardinal positions */}
                {[0, 90, 180, 270].map((deg, di) => {
                  const { x, y } = dotXY(deg, 159);
                  return (
                    <div key={di} ref={(el) => { accentDotRefs.current[di] = el; }}
                      style={{
                        position: "absolute",
                        width: di === 0 ? 12 : 8, height: di === 0 ? 12 : 8,
                        borderRadius: "50%",
                        backgroundColor: A0,
                        boxShadow: \`0 0 \${di === 0 ? 20 : 12}px \${A0}\`,
                        left: "50%", top: "50%",
                        transform: \`translate(calc(-50% + \${x}px), calc(-50% + \${y}px))\`,
                      }}
                    />
                  );
                })}
                {/* 4 micro dots at diagonal positions */}
                {[45, 135, 225, 315].map((deg, di) => {
                  const { x, y } = dotXY(deg, 159);
                  return (
                    <div key={\`m\${di}\`} style={{
                      position: "absolute", width: 5, height: 5, borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.6)",
                      left: "50%", top: "50%",
                      transform: \`translate(calc(-50% + \${x}px), calc(-50% + \${y}px))\`,
                    }}/>
                  );
                })}
              </div>

              {/* MID RING — counter-rotates on scroll */}
              <div ref={midRingRef} style={{
                position: "absolute",
                width: 218, height: 218,
                top: (320 - 218) / 2, left: (320 - 218) / 2,
                borderRadius: "50%",
                border: \`1px dashed \${A0}45\`,
                willChange: "transform",
              }}>
                {/* 3 small square nodes on mid ring */}
                {[0, 120, 240].map((deg, di) => {
                  const { x, y } = dotXY(deg, 108);
                  return (
                    <div key={di} style={{
                      position: "absolute", width: 8, height: 8, borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      left: "50%", top: "50%",
                      transform: \`translate(calc(-50% + \${x}px), calc(-50% + \${y}px))\`,
                    }}/>
                  );
                })}
              </div>

              {/* CENTER FROSTED GLASS CIRCLE */} 
              <div ref={centerGlowRef} style={{
                position: "absolute",
                width: 148, height: 148,
                top: (320 - 148) / 2, left: (320 - 148) / 2,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(14px)",
                boxShadow: \`0 8px 44px \${A0}50, 0 2px 14px rgba(0,0,0,0.1)\`,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", zIndex: 6,
              }}>
                {SLIDES.map((_, si) => {
                  const IllComp = CENTER_ILLS[si];
                  return (
                    <div key={si} ref={(el) => { centerIllRefs.current[si] = el; }}
                      style={{ position: "absolute", opacity: si === 0 ? 1 : 0, willChange: "transform, opacity",
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IllComp />
                    </div>
                  );
                })}
              </div>

              {/* SATELLITE OBJECTS per slide */}
              {SLIDES.map((_, si) =>
                SATELLITES[si].map((SatComp, oi) => (
                  <div key={\`sat-\${si}-\${oi}\`}
                    ref={(el) => { satelliteRefs.current[si][oi] = el; }}
                    style={{ position: "absolute", opacity: si === 0 ? 1 : 0, willChange: "transform, opacity", zIndex: 8, ...SAT_POSITIONS[si][oi] }}>
                    <SatComp />
                  </div>
                ))
              )}
            </div>

            {/* Headline per slide */}
            {SLIDES.map((slide, si) => (
              <div key={\`name-\${si}\`} ref={(el) => { nameRefs.current[si] = el; }}
                style={{ position: "absolute", bottom: 56, left: 26, zIndex: 10, opacity: si === 0 ? 1 : 0, willChange: "transform, opacity" }}>
                {slide.headline.map((line, li) => (
                  <div key={li} style={{
                    display: "block", fontWeight: 900,
                    fontSize: "clamp(2.4rem, 3.6vw, 3.4rem)", lineHeight: 0.96,
                    letterSpacing: "-0.04em", color: "#1a1a1a",
                    textShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}>{line}</div>
                ))}
              </div>
            ))}

            {/* Tag per slide */}
            {SLIDES.map((slide, si) => (
              <div key={\`tag-\${si}\`} ref={(el) => { tagRefs.current[si] = el; }}
                style={{
                  position: "absolute", bottom: 24, left: 26, zIndex: 10,
                  fontSize: 9, fontWeight: 800,
                  textTransform: "uppercase" as const, letterSpacing: "0.22em",
                  color: slide.accentColor, opacity: si === 0 ? 1 : 0,
                }}>{slide.tag}</div>
            ))}
          </div>

          {/* ════ RIGHT PANEL ════════════════════════════════════════════ */}
          <div ref={rightPanelRef} style={{
            flex: 1, background: "white", display: "flex", flexDirection: "column",
            padding: "36px 38px 20px 42px", overflow: "hidden",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
              <h2 style={{ margin: 0, fontWeight: 500, fontSize: 26, lineHeight: 1.25, color: "#1a1a1a" }}>
                Our<br/>Services
              </h2>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF3C7",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>😎</div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between",
              paddingBottom: 7, borderBottom: "1.5px solid #F0F0F0", marginBottom: 2 }}>
              <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.18em", color: "#B0B0B0" }}>Service</span>
              <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.18em", color: "#B0B0B0" }}>No.</span>
            </div>

            <div style={{ position: "relative", flex: 1 }}>
              {SLIDES.map((slide, si) => (
                <div key={si} style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                  {slide.services.map((svc, ri) => (
                    <div key={ri} ref={(el) => { rowRefs.current[si][ri] = el; }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "13px 0", borderBottom: "1px solid #F5F5F5",
                        opacity: si === 0 ? 1 : 0, willChange: "transform, opacity" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        {ri === 0 ? (
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F3F3F3",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="7" height="9" viewBox="0 0 7 9"><polygon points="0,0 7,4.5 0,9" fill="#999"/></svg>
                          </div>
                        ) : <div style={{ width: 22, height: 22, flexShrink: 0 }}/>}
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.2 }}>{svc.name}</div>
                          <div style={{ fontSize: 9.5, color: "#B8B8B8", letterSpacing: "0.06em", marginTop: 2 }}>{svc.scope}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 11, background: svc.iconBg,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <ServiceIcon slideIdx={si} rowIdx={ri} color={svc.iconColor}/>
                        </div>
                        <button style={{ width: 26, height: 26, borderRadius: "50%",
                          border: "1.5px solid #E8E8E8", background: "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", color: "#AAAAAA", fontSize: 18, lineHeight: 1, padding: 0 }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom toolbar ─────────────────────────────────────────────── */}
        <div style={{ height: 54, borderTop: "1px solid #F0F0F0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 22px", background: "white", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {SLIDES.map((slide, i) => (
              <div key={i} ref={(el) => { dotRefs.current[i] = el; }}
                style={{ width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: i === 0 ? slide.accentColor : "rgba(0,0,0,0.14)",
                  transform: \`scale(\${i === 0 ? 1.6 : 1})\`, willChange: "transform, background-color" }}/>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16,
            background: "#F4F4F4", borderRadius: 40, padding: "7px 18px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#AAAAAA"/>
              <rect x="10" y="1" width="6" height="6" rx="1.5" fill="#AAAAAA"/>
              <rect x="1" y="10" width="6" height="6" rx="1.5" fill="#AAAAAA"/>
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#AAAAAA"/>
            </svg>
            <div style={{ width: 1, height: 14, background: "#E0E0E0" }}/>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2,11 L9,4 Q11.5,1.5 13,3 Q14.5,4.5 12,7 L5,14 Z" fill="#AAAAAA"/>
            </svg>
            <div style={{ width: 1, height: 14, background: "#E0E0E0" }}/>
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
              <circle cx="6" cy="4" r="3" fill="#AAAAAA"/>
              <path d="M0,14 Q0,9 6,9 Q12,9 12,14" fill="#AAAAAA" opacity="0.8"/>
            </svg>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3,4 L5,6 L7,4" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{ width: 1, height: 14, background: "#E0E0E0" }}/>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1C1C1C",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5,6.5 h10 M8,2.5 l4,4 -4,4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="7" height="7" rx="2" fill="#DDDDDD"/>
            <rect x="10" y="1" width="7" height="7" rx="2" fill="#DDDDDD"/>
            <rect x="1" y="10" width="7" height="7" rx="2" fill="#DDDDDD"/>
            <rect x="10" y="10" width="7" height="7" rx="2" fill="#DDDDDD"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
`;

writeFileSync(outPath, content, "utf8");
console.log("Written:", outPath);
