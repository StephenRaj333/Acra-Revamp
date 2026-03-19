"use client";
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

// ── Planet illustrations per slot per slide ─────────────────────────────────
// 3 orbital arms (slots). Each slot has 3 illustrations — one per slide.
// On slide change the illustration inside morphs.

// Slot 0 illustrations: Brand→ gold sphere  |  UX→ teal sphere  |  AI→ purple sphere
// Slot 1 illustrations: Brand→ coral blob   |  UX→ cloud        |  AI→ orange hex
// Slot 2 illustrations: Brand→ small gem    |  UX→ monitor chip |  AI→ data node

function PlanetGold(): ReactElement {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <radialGradient id="pgG" cx="35%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#FFE566"/><stop offset="55%" stopColor="#FFAA00"/><stop offset="100%" stopColor="#CC7700"/>
        </radialGradient>
        <filter id="pgSh" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#CC7700" floodOpacity="0.44"/>
        </filter>
      </defs>
      <circle cx="26" cy="26" r="22" fill="url(#pgG)" filter="url(#pgSh)"/>
      <ellipse cx="20" cy="18" rx="6" ry="3.8" fill="rgba(255,255,255,0.46)" transform="rotate(-25 20 18)"/>
    </svg>
  );
}

function PlanetTeal(): ReactElement {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <radialGradient id="ptG" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stopColor="#5EEAD4"/><stop offset="55%" stopColor="#0D9488"/><stop offset="100%" stopColor="#065F5A"/>
        </radialGradient>
        <filter id="ptSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="6" floodColor="#0D9488" floodOpacity="0.44"/>
        </filter>
      </defs>
      <circle cx="28" cy="28" r="24" fill="url(#ptG)" filter="url(#ptSh)"/>
      <ellipse cx="21" cy="20" rx="7" ry="4.2" fill="rgba(255,255,255,0.38)" transform="rotate(-22 21 20)"/>
    </svg>
  );
}

function PlanetPurple(): ReactElement {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="ppG" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stopColor="#C8AEFF"/><stop offset="55%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#4A1FA8"/>
        </radialGradient>
        <filter id="ppSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="6" floodColor="#5B1FCC" floodOpacity="0.44"/>
        </filter>
      </defs>
      <circle cx="27" cy="27" r="23" fill="url(#ppG)" filter="url(#ppSh)"/>
      <ellipse cx="21" cy="19" rx="7" ry="4" fill="rgba(255,255,255,0.36)" transform="rotate(-22 21 19)"/>
    </svg>
  );
}

function PlanetCoral(): ReactElement {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <defs>
        <radialGradient id="pcorG" cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#FF7A55"/><stop offset="100%" stopColor="#CC2A14"/>
        </radialGradient>
        <filter id="pcorSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#CC2A14" floodOpacity="0.36"/>
        </filter>
      </defs>
      <path d="M25,4 C34,3 43,11 44,20 C45,29 38,38 29,41 C20,44 10,38 7,29 C4,20 9,9 18,5 C21,4 23,4 25,4 Z"
        fill="url(#pcorG)" filter="url(#pcorSh)"/>
      <ellipse cx="19" cy="15" rx="7" ry="4.2" fill="rgba(255,255,255,0.28)" transform="rotate(-15 19 15)"/>
    </svg>
  );
}

function PlanetCloud(): ReactElement {
  return (
    <svg width="62" height="42" viewBox="0 0 62 42" fill="none">
      <defs>
        <filter id="pclSh" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0D9488" floodOpacity="0.14"/>
        </filter>
      </defs>
      <path d="M11,33 Q2,33 2,25 Q2,17 9,16 Q8,6 18,6 Q23,3 30,8 Q35,3 44,9 Q52,7 54,16 Q60,16 60,24 Q60,33 48,33 Z"
        fill="white" filter="url(#pclSh)"/>
    </svg>
  );
}

function PlanetOrange(): ReactElement {
  return (
    <svg width="50" height="58" viewBox="0 0 50 58" fill="none">
      <defs>
        <linearGradient id="porG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB088"/><stop offset="100%" stopColor="#E85520"/>
        </linearGradient>
        <filter id="porSh" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#E85520" floodOpacity="0.4"/>
        </filter>
      </defs>
      <polygon points="25,3 47,16 47,39 25,52 3,39 3,16" fill="url(#porG)" filter="url(#porSh)"/>
      <polygon points="25,3 36,16 25,22" fill="rgba(255,255,255,0.34)"/>
    </svg>
  );
}

// Slot 2 variants — small jewel/chip/node
function PlanetGem(): ReactElement {
  return (
    <svg width="46" height="52" viewBox="0 0 46 52" fill="none">
      <defs>
        <linearGradient id="pgemG" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFB8A0"/><stop offset="100%" stopColor="#E63624"/>
        </linearGradient>
        <filter id="pgemSh" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#E63624" floodOpacity="0.36"/>
        </filter>
      </defs>
      <polygon points="23,3 41,14 23,25 5,14" fill="url(#pgemG)" filter="url(#pgemSh)"/>
      <polygon points="5,14 23,25 12,40" fill="#C22A14"/>
      <polygon points="41,14 23,25 34,40" fill="#A01800"/>
      <polygon points="12,40 23,25 34,40 23,49" fill="#800800"/>
      <polygon points="23,3 32,14 23,20" fill="rgba(255,255,255,0.4)"/>
    </svg>
  );
}

function PlanetChip(): ReactElement { 
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="pchipG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4"/><stop offset="100%" stopColor="#0D9488"/>
        </linearGradient>
        <filter id="pchipSh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0D9488" floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="10" y="10" width="32" height="32" rx="6" fill="url(#pchipG)" filter="url(#pchipSh)"/>
      <rect x="16" y="16" width="20" height="20" rx="3" fill="rgba(255,255,255,0.22)"/>
      <rect x="20" y="20" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="20" y="26" width="8" height="2.5" rx="1.2" fill="rgba(255,255,255,0.35)"/>
      <line x1="5" y1="20" x2="10" y2="20" stroke="#0D9488" strokeWidth="2"/>
      <line x1="5" y1="28" x2="10" y2="28" stroke="#0D9488" strokeWidth="2"/>
      <line x1="42" y1="20" x2="47" y2="20" stroke="#0D9488" strokeWidth="2"/>
      <line x1="42" y1="28" x2="47" y2="28" stroke="#0D9488" strokeWidth="2"/>
      <line x1="20" y1="5" x2="20" y2="10" stroke="#0D9488" strokeWidth="2"/>
      <line x1="28" y1="5" x2="28" y2="10" stroke="#0D9488" strokeWidth="2"/>
    </svg>
  );
}

function PlanetNode(): ReactElement {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="pnodeG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8AEFF"/><stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
        <filter id="pnodeSh" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#5B1FCC" floodOpacity="0.36"/>
        </filter>
      </defs>
      <circle cx="26" cy="10" r="7" fill="url(#pnodeG)" filter="url(#pnodeSh)"/>
      <circle cx="10" cy="38" r="7" fill="url(#pnodeG)" filter="url(#pnodeSh)"/>
      <circle cx="42" cy="38" r="7" fill="url(#pnodeG)" filter="url(#pnodeSh)"/>
      <line x1="26" y1="17" x2="10" y2="31" stroke="#9B6EE8" strokeWidth="1.8" opacity="0.55"/>
      <line x1="26" y1="17" x2="42" y2="31" stroke="#9B6EE8" strokeWidth="1.8" opacity="0.55"/>
      <circle cx="26" cy="10" r="3" fill="rgba(255,255,255,0.55)"/>
    </svg>
  );
}

// PLANET_ILLS[slot][slide]
const PLANET_ILLS: ((() => ReactElement)[])[] = [
  [PlanetGold,  PlanetTeal,  PlanetPurple],
  [PlanetCoral, PlanetCloud, PlanetOrange],
  [PlanetGem,   PlanetChip,  PlanetNode],
];

// Arms at 0°, 120°, 240° — orbit radius from center of 320px container
const ARM_ANGLES = [0, 120, 240];   // degrees
const ARM_RADIUS = 148;             // px from center to planet center

// ── Main Component ────────────────────────────────────────────────────────────
export default function StickyReveal() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const currentIdx = useRef(0);

  const blobRefs       = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const outerRingRef   = useRef<HTMLDivElement>(null);
  const midRingRef     = useRef<HTMLDivElement>(null);
  const accentDotRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const centerGlowRef  = useRef<HTMLDivElement>(null);
  const centerIllRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  // Orbital arm wrappers (3 arms). Each arm's rotation is driven by GSAP proxy.
  const armRefs        = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  // Planet bodies (counter-rotate to stay upright)
  const planetRefs     = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  // Planet illustrations per arm per slide — [arm][slide]
  const planetIllRefs  = useRef<(HTMLDivElement | null)[][]>([[null,null,null],[null,null,null],[null,null,null]]);
  const nameRefs       = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const tagRefs        = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rowRefs        = useRef<(HTMLDivElement | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
  const dotRefs        = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rightPanelRef  = useRef<HTMLDivElement>(null);
  // GSAP proxy object for arm rotation (so we can read/tween a plain number)
  const orbitProxy     = useRef({ angle: 0 });

  useEffect(() => {
    // ── Hide slides 1 & 2 initially ──────────────────────────────────────
    [1, 2].forEach((si) => {
      gsap.set(blobRefs.current[si],       { opacity: 0 });
      gsap.set(nameRefs.current[si],       { opacity: 0, y: 22 });
      gsap.set(tagRefs.current[si],        { opacity: 0 });
      gsap.set(centerIllRefs.current[si],  { opacity: 0, scale: 0.62 });
      rowRefs.current[si].forEach((el)     => gsap.set(el, { opacity: 0, x: 240 }));
    });
    // Hide slide 1 & 2 planet illustrations initially
    planetIllRefs.current.forEach((arm) => {
      [1, 2].forEach((si) => gsap.set(arm[si], { opacity: 0, scale: 0.28 }));
    });

    // ── Position arms at their base angles ──────────────────────────────
    ARM_ANGLES.forEach((angle, ai) => {
      gsap.set(armRefs.current[ai], { rotation: angle });
      gsap.set(planetRefs.current[ai], { rotation: -angle });
    });

    // ── Entrance for slide 0 ─────────────────────────────────────────────
    const entrance = gsap.timeline({ delay: 0.3 });
    entrance
      .fromTo(blobRefs.current[0], { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.72, ease: "power2.out" })
      .fromTo(centerIllRefs.current[0], { scale: 0.5, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.88, ease: "back.out(1.5)" }, "-=0.42")
      .fromTo(nameRefs.current[0], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.55")
      .fromTo(tagRefs.current[0], { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");

    // Entrance: planets pop in staggered
    armRefs.current.forEach((_, ai) =>
      entrance.fromTo(planetRefs.current[ai], { scale: 0.18, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, `-=${ai === 0 ? 0.18 : 0.32}`)
    );
    rowRefs.current[0].forEach((el, i) =>
      entrance.fromTo(el, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.52, ease: "power3.out" }, i === 0 ? "-=0.45" : "-=0.36")
    );

    // ── Idle planet float ────────────────────────────────────────────────
    armRefs.current.forEach((_, ai) => {
      if (!planetRefs.current[ai]) return;
      gsap.to(planetRefs.current[ai], {
        y: `+=${[8, 11, 9][ai]}`, duration: [2.8, 3.3, 3.0][ai],
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: ai * 0.55,
      });
    });

    // ── Center illustration idle float ───────────────────────────────────
    gsap.to(centerIllRefs.current[0], { y: 7, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut", delay: 0.9 });

    // ── Scroll-scrub proxy drives outer ring + arms simultaneously ────────
    // orbitProxy.angle goes 0 → 720 over the full 250% scroll distance.
    // Arms add their base offset so they all revolve together.
    gsap.to(orbitProxy.current, {
      angle: 720,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "+=250%", scrub: 1.4 },
      onUpdate: () => {
        const a = orbitProxy.current.angle;
        // Outer ring
        if (outerRingRef.current) gsap.set(outerRingRef.current, { rotation: a });
        // Mid ring counter-rotates
        if (midRingRef.current) gsap.set(midRingRef.current, { rotation: -a });
        // Each arm rotates by a + its base angle; planet body counter-rotates to stay upright
        ARM_ANGLES.forEach((base, ai) => {
          const arm = armRefs.current[ai];
          const planet = planetRefs.current[ai];
          if (arm) gsap.set(arm, { rotation: base + a });
          if (planet) {
            // Kill any idle-float tweens momentarily so we don't conflict
            gsap.set(planet, { rotation: -(base + a) });
          }
        });
      },
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
      gsap.to(el, { backgroundColor: accent, boxShadow: `0 0 ${di === 0 ? 18 : 12}px ${accent}`, duration: 0.55, delay: d });
    });

    // Center glow shadow color
    gsap.to(centerGlowRef.current, { boxShadow: `0 8px 44px ${accent}50, 0 2px 14px rgba(0,0,0,0.1)`, duration: 0.6, delay: d });

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

    // Planet illustrations morph — swap per-arm illustrations for the new slide
    planetIllRefs.current.forEach((arm, ai) => {
      // Exit old
      gsap.to(arm[from], { opacity: 0, scale: 0.28, rotation: 20, duration: 0.28, ease: "power2.in", delay: ai * 0.04 });
      // Enter new
      gsap.fromTo(arm[to],
        { opacity: 0, scale: 1.4, rotation: -18 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.62, ease: "back.out(1.5)", delay: d + 0.1 + ai * 0.06 }
      );
    });

    // Name + tag
    gsap.to(nameRefs.current[from], { opacity: 0, y: -20, duration: 0.34 });
    gsap.to(tagRefs.current[from],  { opacity: 0, duration: 0.24 });
    gsap.fromTo(nameRefs.current[to], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: d + 0.2 });
    gsap.fromTo(tagRefs.current[to],  { opacity: 0 },        { opacity: 1, duration: 0.4, delay: d + 0.22 });

    // Service rows — slide exit LEFT, slide enter from RIGHT
    rowRefs.current[from].forEach((el, i) =>
      gsap.to(el, { x: -220, opacity: 0, duration: 0.28, ease: "power3.in", delay: i * 0.045 })
    );
    rowRefs.current[to].forEach((el, i) =>
      gsap.fromTo(el,
        { x: 220, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.52, ease: "power3.out", delay: d + 0.18 + i * 0.08 }
      )
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
                border: `1.5px solid ${A0}65`,
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
                        boxShadow: `0 0 ${di === 0 ? 20 : 12}px ${A0}`,
                        left: "50%", top: "50%",
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    />
                  );
                })}
                {/* 4 micro dots at diagonal positions */}
                {[45, 135, 225, 315].map((deg, di) => {
                  const { x, y } = dotXY(deg, 159);
                  return (
                    <div key={`m${di}`} style={{
                      position: "absolute", width: 5, height: 5, borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.6)",
                      left: "50%", top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
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
                border: `1px dashed ${A0}45`,
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
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
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
                boxShadow: `0 8px 44px ${A0}50, 0 2px 14px rgba(0,0,0,0.1)`,
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

              {/* ORBITAL ARMS — 3 persistent arms that revolve like a solar system */}
              {ARM_ANGLES.map((_, ai) => (
                <div
                  key={`arm-${ai}`}
                  ref={(el) => { armRefs.current[ai] = el; }}
                  style={{
                    position: "absolute",
                    // Arm originates from center of orbit container
                    width: ARM_RADIUS, height: 2,
                    top: "50%", left: "50%",
                    marginTop: -1,
                    transformOrigin: "0% 50%",
                    zIndex: 8,
                    // Arm line — subtle
                    // borderBottom: "1px dashed rgba(255,255,255,0.15)",
                  }}
                >
                  {/* Planet body — counter-rotates to keep illustrations upright */}
                  <div
                    ref={(el) => { planetRefs.current[ai] = el; }}
                    style={{
                      position: "absolute",
                      right: -30, top: "50%",
                      width: 64, height: 64,
                      marginTop: -32,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      willChange: "transform",
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))",
                    }}
                  >
                    {/* Per-slide illustrations stacked inside the planet */}
                    {SLIDES.map((_, si) => {
                      const IllComp = PLANET_ILLS[ai][si];
                      return (
                        <div
                          key={`pill-${ai}-${si}`}
                          ref={(el) => { planetIllRefs.current[ai][si] = el; }}
                          style={{
                            position: "absolute",
                            opacity: si === 0 ? 1 : 0,
                            willChange: "transform, opacity",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <IllComp />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Headline per slide */}
            {SLIDES.map((slide, si) => (
              <div key={`name-${si}`} ref={(el) => { nameRefs.current[si] = el; }}
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
              <div key={`tag-${si}`} ref={(el) => { tagRefs.current[si] = el; }}
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

            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
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
                  transform: `scale(${i === 0 ? 1.6 : 1})`, willChange: "transform, background-color" }}/>
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
