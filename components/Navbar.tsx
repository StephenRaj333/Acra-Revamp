"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: "transparent" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 26,26 2,26" fill="#e63624" />
        </svg>
        <span className="text-white font-bold text-xl tracking-widest uppercase">
          AKRA
        </span>
      </div>

      {/* Hamburger */}
      <button className="flex flex-col gap-[5px] group cursor-pointer">
        <span className="block w-7 h-[2px] bg-white group-hover:w-5 transition-all duration-300" />
        <span className="block w-5 h-[2px] bg-red-500 group-hover:w-7 transition-all duration-300" />
      </button>
    </nav>
  );
}
