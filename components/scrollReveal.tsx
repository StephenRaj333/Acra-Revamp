'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        headline: ["Brand", "Design"],
        products: [
            {
                name: "Logo Systems",
                hd: "Scalable logos built for digital & print consistency"
            },
            {
                name: "Visual Identity",
                hd: "Cohesive colors, typography & assets for strong recall"
            },
            {
                name: "Brand Guidelines",
                hd: "Clear rules to maintain brand consistency across platforms"
            },
        ],
        imgs: [
            "/assets/images/brand-1.webp",
            "/assets/images/brand-2.webp",
            "/assets/images/brand-3.webp",
        ],
        g0: "#FFB7A7",
        g1: "#FF4B31",
        g2: "#971809",
    },
    {
        headline: ["UI/UX", "Design"],
        products: [
            {
                name: "Web Interfaces",
                hd: "High-conversion, responsive web experiences"
            },
            {
                name: "Mobile Apps",
                hd: "Intuitive mobile-first designs with seamless flows"
            },
            {
                name: "Design Systems",
                hd: "Reusable components for faster and scalable development"
            },
        ],
        imgs: [
            "/assets/images/ui.png",
            "/assets/images/ux.png",
            "/assets/images/ui-ux.png",
        ],
        g0: "#A9C7FF",
        g1: "#2F6DF6",
        g2: "#1633A1",
    },
    {
        headline: ["AI", "Driven"],
        products: [
            {
                name: "Data Insights",
                hd: "Turn raw data into actionable business intelligence"
            },
            {
                name: "Automation",
                hd: "Streamline workflows and reduce manual effort"
            },
            {
                name: "Predictive Models",
                hd: "Forecast trends with AI-powered decision systems"
            },
        ],
        imgs: [
            "/assets/images/ai-1.webp",
            "/assets/images/ai-2.webp",
            "/assets/images/ai-3.webp",
        ],
        g0: "#BDF6DC",
        g1: "#20C37C",
        g2: "#0E6A44",
    },
    {
    headline: ["Social", "Media"],
    products: [
        {
            name: "Content Strategy",
            hd: "Engaging content plans tailored for each platform"
        },
        {
            name: "Social Campaigns",
            hd: "Creative campaigns designed to boost reach & engagement"
        },
        {
            name: "Community Management",
            hd: "Building and nurturing loyal audience interactions"
        },
    ],
    imgs: [ 
        "/assets/images/sm-1.png",
        "/assets/images/sm-2.png",
        "/assets/images/sm-3.png",
    ],
    g0: "#FFD6F9",
    g1: "#E843C4",
    g2: "#8A1C73",
    },
    {
        headline: ["Marketing", "Communication"],
        products: [
            {
                name: "Brand Messaging",
                hd: "Clear, consistent communication that defines your voice"
            },
            {
                name: "Campaign Strategy",
                hd: "Result-driven campaigns across digital & offline channels"
            },
            {
                name: "Content Creation",
                hd: "Compelling copy and visuals that drive conversions"
            },
        ],
        imgs: [
            "/assets/images/mc-1.png",
            "/assets/images/mc-2.png",
            "/assets/images/mc-3.png",
        ],
        g0: "#FFE7B3",
        g1: "#FF9F1C",
        g2: "#B86B00",
    }
];
// Orbit config â€” 3 arms at 120Â° each, centered on the visible hex area
const ORBIT_R = "8.89vw";     // vw radius of orbit circle
const ORBIT_CX = "8.89vw";    // vw from sticky-wrapper left  (hex center)
const ORBIT_CY = "8.89vw";    // vw from sticky-wrapper top   (hex center)
const BASE_ANGLES = [-90, 30, 150]; // starting angles for the 3 orbit slots (degrees)
const SLIDE_COUNT = SLIDES.length;

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
    const imgRefs = useRef<(HTMLDivElement | null)[][]>(
        BASE_ANGLES.map(() => Array<HTMLDivElement | null>(SLIDE_COUNT).fill(null))
    );

    // headlineRefs[slide]
    const headlineRefs = useRef<(HTMLDivElement | null)[]>(Array<HTMLDivElement | null>(SLIDE_COUNT).fill(null));

    useEffect(() => {
        // Set base angles for arms
        BASE_ANGLES.forEach((angle, ai) => {
            if (armRefs.current[ai]) gsap.set(armRefs.current[ai], { rotation: angle, transformOrigin: "0px 0px" });
            if (counterRefs.current[ai]) gsap.set(counterRefs.current[ai], { rotation: -angle });
        });

        // Hide slides except first on mount
        Array.from({ length: SLIDE_COUNT - 1 }, (_, idx) => idx + 1).forEach((si) => {
            if (headlineRefs.current[si]) gsap.set(headlineRefs.current[si], { opacity: 0, y: 44 });
            imgRefs.current.forEach((arm) => { if (arm[si]) gsap.set(arm[si], { opacity: 0 }); });
        });

        if (parallaxRef.current) {
            gsap.set(parallaxRef.current, { autoAlpha: 0 });
        }

        const bgVisibility = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
                if (!parallaxRef.current) return;
                gsap.to(parallaxRef.current, {
                    autoAlpha: self.isActive ? 0.55 : 0,
                    duration: 0.3,
                    ease: "power1.out",
                    overwrite: true,
                });
            },
        });

        // Sticky pin + scroll driver
        const st = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${(SLIDE_COUNT - 1) * 100}%`,
            pin: stickyRef.current,
            onUpdate: (self) => {
                const newIdx = Math.min(
                    SLIDE_COUNT - 1,
                    Math.floor(self.progress * SLIDE_COUNT)
                );
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

        return () => { st.kill(); bgVisibility.kill(); };
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
            <div
                ref={wrapperRef}
                className="scroll-reveal-wrapper"
                style={{ minHeight: `${SLIDE_COUNT * 100}vh`, paddingTop: "7.11vw", position: "relative", overflow: "hidden" }}
            >

                <div
                    ref={parallaxRef}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100vw",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <ShootingStars />
                    <StarsBackground />
                </div>

                <div ref={stickyRef} className="sticky-wrapper  mx-auto relative max-w-[48vw] w-full" style={{ position: "sticky", top: "15vh", zIndex: 2 }}>

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
                                    transformOrigin: "0 0",
                                }}
                            >
                                {/* Counter-rotate wrapper â€” keeps images upright */}
                                <div
                                    ref={(el) => { counterRefs.current[ai] = el; }}
                                    style={{
                                        position: "absolute",
                                        right: "-7.67vw", top: "-6.67vw",
                                        width: "8.89vw", height: "8.89vw",
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
                                                    filter: "drop-shadow(0 0.27vw 0.80vw rgba(0,0,0,0.22))",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="w-full relative overflow-hidden p-[1.78vw] min-h-[26.67vw] flex items-center justify-center gap-[1.78vw] rounded-4xl max-w-[48vw] mx-auto spiral-box border border-white/14"
                        style={{
                            background: `radial-gradient(130% 120% at 8% 12%, ${SLIDES[currentSlide].g1}2b 0%, rgba(9, 13, 24, 0.96) 42%), radial-gradient(80% 90% at 88% 86%, ${SLIDES[currentSlide].g2}40 0%, rgba(5, 8, 14, 0.96) 56%), linear-gradient(160deg, rgba(7, 10, 18, 0.97), rgba(11, 15, 27, 0.95) 45%, rgba(6, 9, 16, 0.97))`,
                            boxShadow: `0 1.78vw 4.45vw rgba(0,0,0,0.48), inset 0 0 0 0.04vw rgba(255,255,255,0.08), 0 0 2.2vw ${SLIDES[currentSlide].g2}33`,
                        }}
                    >

                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background: `radial-gradient(circle at 92% 16%, ${SLIDES[currentSlide].g0}33, transparent 36%), radial-gradient(circle at 20% 90%, ${SLIDES[currentSlide].g1}22, transparent 34%)`,
                            }}
                        />
                        <div className="pointer-events-none absolute inset-x-[3%] top-[3%] h-[0.06vw] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                        <div className="pointer-events-none absolute right-[2.2vw] top-[1.5vw] h-[6.2vw] w-[6.2vw] rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute right-[2.9vw] top-[2.2vw] h-[4.8vw] w-[4.8vw] rounded-full border border-white/7" />

                        <div ref={hexRef} className="hex-wrap absolute left-[-35%] top-[-40%]" style={{ willChange: "transform" }}>
                            <svg width="35.56vw" height="35.56vw" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
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

                        <div className="spinner-text w-1/2" style={{ position: "relative", minHeight: "7.11vw" }}>
                            {SLIDES.map((slide, si) => (
                                <div key={si} ref={(el) => { headlineRefs.current[si] = el; }}
                                    className="text-content"
                                    style={{
                                        position: "absolute",
                                        left: "10%", top: "-2.22vw",
                                        opacity: si === 0 ? 1 : 0,
                                        willChange: "transform, opacity",
                                    }}>
                                    <h4
                                        className="text-[2.13vw] font-bold"
                                        style={{
                                            color: "#ffffff",
                                            textShadow: `0 0.22vw 0.71vw ${SLIDES[currentSlide].g2}35`,
                                        }}
                                    >
                                        {slide.headline[0]} <br /> {slide.headline[1]}
                                    </h4>
                                </div>
                            ))}
                        </div>

                        <div className="text-right-content w-1/2 pl-[1.42vw]">
                            <div className="title pb-[1vw] flex items-center justify-between">
                                <h2
                                    className="text-[2.13vw] font-bold leading-tight"
                                    style={{
                                        backgroundImage: `linear-gradient(100deg, ${SLIDES[currentSlide].g0} 0%, #ffffff 38%, ${SLIDES[currentSlide].g1} 100%)`,
                                        backgroundSize: "100% 100%",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        WebkitTextFillColor: "transparent",
                                        display: "inline-block",
                                    }}
                                >
                                    Our Services
                                </h2>  
                            </div>

                            <div style={{ position: "relative", overflow: 'hidden', minHeight: "17vw", width: "100%", zIndex: 10 }}>
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
                                                className="flex items-center justify-between py-[0.71vw] px-[0.62vw] mb-[0.36vw] group cursor-pointer rounded-[0.62vw] border"
                                                style={{
                                                    transition: "all 0.3s ease",
                                                    borderColor: `${SLIDES[currentSlide].g1}30`,
                                                    background: `linear-gradient(90deg, ${SLIDES[currentSlide].g2}1f, rgba(255,255,255,0.02) 46%, rgba(255,255,255,0.015))`,
                                                }}
                                            >
                                                {/* Left: Text */}
                                                <div style={{ flex: 1 }}>
                                                    <p
                                                        className="text-[1vw] font-semibold mb-[0.18vw]"
                                                        style={{ color: "#f4f7ff" }}
                                                    >
                                                        {p.name}
                                                    </p>
                                                    <p className="text-[0.62vw]" style={{ color: "rgba(228, 235, 252, 0.72)" }}>{p.hd}</p>
                                                </div>

                                                {/* Right: Icon Badge */}
                                                <div
                                                    className="w-[2.13vw] h-[2.13vw] rounded-[0.36vw] flex items-center justify-center flex-shrink-0 ml-[0.71vw]"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${SLIDES[currentSlide].g0} 0%, ${SLIDES[currentSlide].g1} 100%)`,
                                                        boxShadow: `0 0.18vw 0.62vw ${SLIDES[currentSlide].g2}55`,
                                                    }}
                                                >
                                                    <Image
                                                        src={SLIDES[currentSlide].imgs[ri % 3]}
                                                        width={32}
                                                        height={32}
                                                        alt={p.name}
                                                        style={{
                                                            objectFit: "contain",
                                                            filter: "brightness(0) invert(1) opacity(0.88)",
                                                        }}
                                                    />
                                                </div>

                                                {/* Plus button */}
                                                <button
                                                    className="flex items-center justify-center w-[1.78vw] h-[1.78vw] rounded-full flex-shrink-0 ml-[0.53vw] transition-all group-hover:scale-110"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${SLIDES[currentSlide].g1} 0%, ${SLIDES[currentSlide].g2} 100%)`,
                                                        color: "white",
                                                        boxShadow: `0 0.27vw 0.8vw ${SLIDES[currentSlide].g2}66`,
                                                    }}
                                                >
                                                    <span className="text-[0.89vw] font-light">+</span>
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
