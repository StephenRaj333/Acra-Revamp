"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(bgRef.current, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power2.out" })
      .fromTo(
        headingRef.current,
        { y: 80, opacity: 0, skewY: 4 }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1 },
        "-=1.2"
      )
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#d42a15]">
      {/* Animated background mesh */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d42a15] via-[#b01e0e] to-[#8a1208]" />
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-white/5" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border border-white/5 -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1
          ref={headingRef}
          className="text-white font-black uppercase leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          Together, We Scale<br />New Heights
        </h1>
        <p
          ref={subRef}
          className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          We bring together brilliant thinkers who understand business, tech, and
          marketing to help your company reach higher and grow stronger.
        </p>
        <button
          ref={btnRef}
          className="px-8 py-3 rounded-full bg-white text-[#d42a15] font-bold text-sm uppercase tracking-widest hover:bg-[#d42a15] hover:text-white hover:border hover:border-white transition-all duration-300"
        >
          Learn More
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/50 animate-pulse" />
      </div>
    </section>
  );
}
