'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        headline: ["Brand", "Design"],
        products: [
            { name: "Logo Systems", hd: "110 × 110" },
            { name: "Visual Identity", hd: "110 × 110" },
            { name: "Brand Guidelines", hd: "110 × 110" },
        ],
        imgs: [
            "/assets/images/brand-1.webp",
            "/assets/images/brand-2.webp",
            "/assets/images/brand-3.webp",
        ],
        g0: "#FFE4E6",
        g1: "#FB7185",
        g2: "#BE123C",
    },

    {
        headline: ["UI/UX", "Design"],
        products: [
            { name: "Web Interfaces", hd: "110 × 110" },
            { name: "Mobile Apps", hd: "110 × 110" },
            { name: "Design Systems", hd: "110 × 110" },
        ],
        imgs: [
            "/assets/images/ui.png",
            "/assets/images/ux.png",
            "/assets/images/ui-ux.png",
        ],
        g0: "#DBEAFE",
        g1: "#60A5FA",
        g2: "#1D4ED8",
    },

    {
        headline: ["AI", "Driven"],
        products: [
            { name: "Data Insights", hd: "110 × 110" },
            { name: "Automation", hd: "110 × 110" },
            { name: "Predictive Models", hd: "110 × 110" },
        ],
        imgs: [
            "/assets/images/ai-1.webp",
            "/assets/images/ai-2.webp",
            "/assets/images/ai-3.webp",
        ],
        g0: "#E9D5FF",
        g1: "#A855F7",
        g2: "#6B21A8",
    },
];

// Orbit config â€” 3 arms at 120Â° each, centered on the visible hex area
const ORBIT_R = 200;           // px radius of orbit circle
const ORBIT_CX = 200;           // px from sticky-wrapper left  (hex center)
const ORBIT_CY = 200;           // px from sticky-wrapper top   (hex center)
const BASE_ANGLES = [-90, 30, 150]; // starting angles for the 3 orbit slots (degrees)

const ScrollReveal = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const hexRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const hexRotRef = useRef(0);
    const curRef = useRef(0);
    const animating = useRef(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // SVG gradient stops
    const stop0Ref = useRef<SVGStopElement>(null);
    const stop1Ref = useRef<SVGStopElement>(null);
    const stop2Ref = useRef<SVGStopElement>(null);

    // 3 orbit arm divs â€” each pivots from the orbit center
    const armRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    // 3 counter-rotate wrappers inside each arm (keep images upright)
    const counterRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    // imgRefs[arm][slide]
    const imgRefs = useRef<(HTMLDivElement | null)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    // headlineRefs[slide]
    const headlineRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

    useEffect(() => {
        // Set base angles for arms
        BASE_ANGLES.forEach((angle, ai) => {
            if (armRefs.current[ai]) gsap.set(armRefs.current[ai], { rotation: angle, transformOrigin: "0px 0px" });
            if (counterRefs.current[ai]) gsap.set(counterRefs.current[ai], { rotation: -angle });
        });

        // Hide slides 1 & 2 on mount
        [1, 2].forEach((si) => {
            if (headlineRefs.current[si]) gsap.set(headlineRefs.current[si], { opacity: 0, y: 44 });
            imgRefs.current.forEach((arm) => { if (arm[si]) gsap.set(arm[si], { opacity: 0 }); });
        });

        // Sticky pin + scroll driver
        const st = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=200%",
            pin: stickyRef.current,
            onUpdate: (self) => {
                const newIdx = self.progress < 0.34 ? 0 : self.progress < 0.67 ? 1 : 2;
                if (newIdx !== curRef.current && !animating.current) {
                    transition(curRef.current, newIdx);
                    curRef.current = newIdx;
                }
                
                // Parallax effect: background moves slower than scroll
                if (parallaxRef.current) {
                    const parallaxAmount = self.progress * 100; // 0 to 100
                    gsap.set(parallaxRef.current, {
                        y: parallaxAmount * 0.3,
                    });
                }
            },
        });

        return () => { st.kill(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function transition(from: number, to: number) {
        animating.current = true;
        setCurrentSlide(to);
        const slide = SLIDES[to];
        const ORBIT_DUR = 1.4;

        // Create a master timeline for synchronized orbit + crossfade
        const tl = gsap.timeline({
            onComplete: () => { animating.current = false; }
        });

        // 1. Orbit all 3 arms together (single 360 rotation)
        armRefs.current.forEach((arm, ai) => {
            if (!arm) return;
            const curArmRot = (gsap.getProperty(arm, "rotation") as number) || BASE_ANGLES[ai];
            tl.to(arm, {
                rotation: curArmRot + 120,
                duration: ORBIT_DUR,
                ease: "power2.inOut",
                overwrite: true,
            }, 0); // Start all at time 0 (synchronized)

            // Counter-rotate so images stay upright
            if (counterRefs.current[ai]) {
                const curCounterRot = (gsap.getProperty(counterRefs.current[ai], "rotation") as number) || -BASE_ANGLES[ai];
                tl.to(counterRefs.current[ai], {
                    rotation: curCounterRot - 120,
                    duration: ORBIT_DUR,
                    ease: "power2.inOut",
                    overwrite: true,
                }, 0); // Sync with arm rotation
            }
        });

        // 2. Crossfade images during orbit
        const fadeDelay = ORBIT_DUR * 0.35;
        const fadeDur = ORBIT_DUR * 0.4;
        imgRefs.current.forEach((armImgs) => {
            if (armImgs[from]) {
                tl.to(armImgs[from], {
                    opacity: 0,
                    duration: fadeDur,
                    ease: "power2.in",
                }, fadeDelay);
            }
            if (armImgs[to]) {
                tl.fromTo(armImgs[to],
                    { opacity: 0 },
                    { opacity: 1, duration: fadeDur, ease: "power2.out" },
                    fadeDelay
                );
            }
        });

        // 3. Hex: small nudge (+40 deg) synchronized with orbit
        hexRotRef.current += 40;
        tl.to(hexRef.current, {
            rotation: hexRotRef.current,
            transformOrigin: "50% 50%",
            duration: ORBIT_DUR,
            ease: "power4.inOut",
        }, 0);

        // 4. Gradient tween
        tl.to(stop0Ref.current, { attr: { "stop-color": slide.g0 }, duration: 1.0 }, 0.2);
        tl.to(stop1Ref.current, { attr: { "stop-color": slide.g1 }, duration: 1.0 }, 0.3);
        tl.to(stop2Ref.current, { attr: { "stop-color": slide.g2 }, duration: 1.0 }, 0.4);

        // 5. Headline
        tl.to(headlineRefs.current[from], { opacity: 0, y: -52, duration: 0.38, ease: "power2.in" }, 0);
        tl.fromTo(headlineRefs.current[to],
            { opacity: 0, y: 52 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
            0.5
        );
    }

    return (
        <>
            <div ref={wrapperRef} className="scroll-reveal-wrapper" style={{ minHeight: "300vh", paddingTop: "10rem" }}>

                <div ref={stickyRef} className="sticky-wrapper mx-auto relative max-w-[1080px] w-full" style={{ position: "sticky", top: "8vh" }}>

                    <div style={{
                        position: "absolute",
                        left: ORBIT_CX, top: ORBIT_CY,
                        width: 0, height: 0,
                        zIndex: 10, pointerEvents: "none",
                    }}>
                        {BASE_ANGLES.map((_, ai) => (
                            <div
                                key={ai}
                                ref={(el) => { armRefs.current[ai] = el; }}
                                style={{
                                    position: "absolute",
                                    width: ORBIT_R,
                                    height: "100%",
                                    left: 0, top: 0,
                                    transformOrigin: "0px 0px",
                                }}
                            >
                                {/* Counter-rotate wrapper â€” keeps images upright */}
                                <div
                                    ref={(el) => { counterRefs.current[ai] = el; }}
                                    style={{
                                        position: "absolute",
                                        right: -150, top: -150,
                                        width: "200px", height: "200px",
                                    }}
                                >
                                    {SLIDES.map((slide, si) => (
                                        <div
                                            key={si}
                                            ref={(el) => { imgRefs.current[ai][si] = el; }}
                                            style={{
                                                position: "absolute", inset: 0,
                                                opacity: si === 0 ? 1 : 0,
                                            }}
                                        >
                                            <Image
                                                className="w-full h-full"
                                                src={slide.imgs[ai]}
                                                width={100} height={100}
                                                alt=""
                                                style={{
                                                    objectFit: "contain",
                                                    width: "100%", height: "100%",
                                                    filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.22))",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full relative overflow-hidden p-10 min-h-[600px] flex items-center justify-center gap-10 bg-white rounded-4xl max-w-[1080px] mx-auto">

                        <div ref={hexRef} className="hex-wrap absolute left-[-35%] top-[-40%]" style={{ willChange: "transform" }}>
                            <svg width="800px" height="800px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop ref={stop0Ref} offset="0%" stopColor={SLIDES[0].g0} />
                                        <stop ref={stop1Ref} offset="50%" stopColor={SLIDES[0].g1} />
                                        <stop ref={stop2Ref} offset="100%" stopColor={SLIDES[0].g2} />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 7.5860 42.9414 L 23.8516 52.1758 C 26.6407 53.7695 29.3126 53.7930 32.1485 52.1758 L 48.4141 42.9414 C 50.5938 41.6992 51.7890 40.4336 51.7890 37.0352 L 51.7890 18.8008 C 51.7890 15.4961 50.5703 14.3008 48.5783 13.1523 L 32.2657 3.8711 C 29.3595 2.2070 26.5704 2.2305 23.7344 3.8711 L 7.4219 13.1523 C 5.4297 14.3008 4.2110 15.4961 4.2110 18.8008 L 4.2110 37.0352 C 4.2110 40.4336 5.4063 41.6992 7.5860 42.9414 Z"
                                    fill="url(#hexGradient)"
                                />
                            </svg>
                        </div>

                        <div className="spinner-text w-1/2" style={{ position: "relative", minHeight: 160 }}>
                            {SLIDES.map((slide, si) => (
                                <div key={si} ref={(el) => { headlineRefs.current[si] = el; }}
                                    className="text-content"
                                    style={{
                                        position: "absolute",
                                        left: "10%", top: "-50px",
                                        opacity: si === 0 ? 1 : 0,
                                        willChange: "transform, opacity",
                                    }}>
                                    <h4 className="text-white text-5xl font-bold">
                                        {slide.headline[0]} <br /> {slide.headline[1]}
                                    </h4>
                                </div>
                            ))}
                        </div>

                        <div className="text-right-content w-1/2 pl-8">
                            <div className="title pb-12">
                                <h2 className="text-5xl text-black font-bold leading-tight">Our <br /> Services</h2>
                            </div>

                            <div className="flex gap-16 pb-6 text-xs uppercase tracking-widest font-semibold">
                                <h4 className="text-gray-400" style={{ flex: 1 }}>Service</h4>
                                <h4 className="text-gray-400">No.</h4>
                            </div>

                            <div style={{ position: "relative", overflow: "hidden", minHeight: 160, width: "100%" }}>
                                <AnimatePresence mode="sync">  
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ x: "100%" }}  
                                        animate={{ x: 0 }}
                                        exit={{ x: "-100%" }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                                    >
                                        {SLIDES[currentSlide].products.map((p, ri) => (
                                            <div
                                                key={ri}
                                                className="flex items-center justify-between py-4 mb-2 group cursor-pointer"
                                                style={{
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.paddingLeft = "12px";
                                                    e.currentTarget.style.paddingRight = "12px";
                                                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)";
                                                    e.currentTarget.style.borderRadius = "8px";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.paddingLeft = "0";
                                                    e.currentTarget.style.paddingRight = "0";
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                    e.currentTarget.style.borderRadius = "0";
                                                }}
                                            >
                                                {/* Left: Text */}
                                                <div style={{ flex: 1 }}>
                                                    <p className="text-black text-base font-semibold mb-1">{p.name}</p>
                                                    <p className="text-gray-500 text-sm">{p.hd}</p>
                                                </div>

                                                {/* Right: Icon Badge */}
                                                <div 
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-4"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${SLIDES[currentSlide].g0} 0%, ${SLIDES[currentSlide].g1} 100%)`,
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                    }}
                                                >
                                                    <Image
                                                        src={SLIDES[currentSlide].imgs[ri % 3]}
                                                        width={32}
                                                        height={32}
                                                        alt={p.name}
                                                        style={{
                                                            objectFit: "contain",
                                                            filter: "brightness(0) invert(1) opacity(0.7)",
                                                        }}
                                                    />
                                                </div>

                                                {/* Plus button */}
                                                <button 
                                                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ml-3 transition-all group-hover:scale-110"
                                                    style={{
                                                        background: SLIDES[currentSlide].g0,
                                                        color: "white",
                                                    }}
                                                >
                                                    <span className="text-xl font-light">+</span>
                                                </button>
                                            </div>  
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ScrollReveal;
