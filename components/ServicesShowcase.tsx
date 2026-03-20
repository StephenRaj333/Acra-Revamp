"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { MotionValue } from "framer-motion";

type AcraCard = {
    title: string;
    caption: string;
    thumbnail: string;
};

const ACRO_CARDS: AcraCard[] = [
    { title: "AI Strategy", caption: "Data, AI & Automation", thumbnail: "/assets/images/ai-1.webp" },
    { title: "Predictive Models", caption: "Business Intelligence", thumbnail: "/assets/images/ai-2.webp" },
    { title: "Process Automation", caption: "Operational Scale", thumbnail: "/assets/images/ai-3.webp" },
    { title: "Brand Identity", caption: "Branding & Design", thumbnail: "/assets/images/brand-1.webp" },
    { title: "Visual Systems", caption: "Creative Direction", thumbnail: "/assets/images/brand-2.webp" },
    { title: "Guideline Kits", caption: "Consistency at Scale", thumbnail: "/assets/images/brand-3.webp" },
    { title: "Web Interfaces", caption: "UI/UX Design", thumbnail: "/assets/images/ui.png" },
    { title: "Mobile Flows", caption: "Product Experience", thumbnail: "/assets/images/ux.png" },
    { title: "Design Systems", caption: "Reusable Architecture", thumbnail: "/assets/images/ui-ux.png" },
    { title: "Growth Roadmaps", caption: "Business Consulting", thumbnail: "/assets/images/ai-1.webp" },
    { title: "Execution Planning", caption: "Delivery Frameworks", thumbnail: "/assets/images/brand-2.webp" },
    { title: "Scale Programs", caption: "Market Expansion", thumbnail: "/assets/images/ui.png" },
    { title: "Data Insights", caption: "Insight Engineering", thumbnail: "/assets/images/ai-2.webp" },
    { title: "Conversion Design", caption: "Performance UX", thumbnail: "/assets/images/ux.png" },
    { title: "Digital Presence", caption: "Brand Communications", thumbnail: "/assets/images/brand-3.webp" },
];

const firstRow = ACRO_CARDS.slice(0, 5);
const secondRow = ACRO_CARDS.slice(5, 10);
const thirdRow = ACRO_CARDS.slice(10, 15);

function Card({ card }: { card: AcraCard }) {
    return (
        <motion.article
            whileHover={{ y: -8, scale: 1.012 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="group relative h-[17rem] w-[24rem] md:h-[19rem] md:w-[28rem] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.3)]"
        >
            <Image src={card.thumbnail} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1119]/80 via-[#111725]/35 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.18em] text-[#d7e7ff]">{card.caption}</p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">{card.title}</h3>
            </div>
        </motion.article>
    );
}

function ParallaxRow({ cards, x }: { cards: AcraCard[]; x: MotionValue<number> }) {
    return (
        <motion.div style={{ x }} className="mb-6 flex gap-4 md:mb-8 md:gap-6">
            {cards.map((card) => (
                <Card key={`${card.title}-${card.caption}`} card={card} />
            ))}
        </motion.div>
    ); 
}

export default function ServicesShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.2], [12, 0]);
    const rotateZ = useTransform(scrollYProgress, [0, 0.2], [-8, 0]);
    // const opacity = useTransform(scrollYProgress, [0, 0.18], [0.35, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [120, 0]);

    const xLeft = useTransform(scrollYProgress, [0, 1], [0, 420]);
    const xRight = useTransform(scrollYProgress, [0, 1], [0, -420]);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden py-24 md:py-32"
            style={{
              background: '#000'
            }}
        >   
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="mx-auto max-w-[1500px] px-4 md:px-8">
                <div className="mx-auto mb-14 max-w-5xl text-center md:mb-20">
                    <h2 className="mt-3 text-4xl md:text-6xl font-bold text-white leading-[1.05]">
                        All in one place. Everything you need, expertly delivered.
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base text-white/85">
                        From idea to execution: strategy, creativity, technology, and growth, all under one roof.
                    </p>
                    <div className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                        <span>IT Consulting</span> 
                        <span className="text-white/50">•</span>
                        <span>Branding & Design</span>
                        <span className="text-white/50">•</span>
                        <span>Data, AI & Automation</span>
                    </div>
                </div>

                <motion.div
                    style={{
                        rotateX,
                        rotateZ,
                        // opacity,
                        y,
                        transformPerspective: 1000,
                    }}
                    className="relative"
                >   
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_62%)]" />
                    <ParallaxRow cards={firstRow} x={xRight} />
                    <ParallaxRow cards={secondRow} x={xLeft} />
                    <ParallaxRow cards={thirdRow} x={xRight} />
                </motion.div>
                
            </div>
        </section>
    );  
}
