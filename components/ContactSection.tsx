"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 3000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 20.5937, lng: 78.9629 },
  autoRotate: true,
  autoRotateSpeed: 0.18,
};

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

const sampleArcs = [
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[0] },
  { order: 1, startLat: 51.5072, startLng: -0.1276, endLat: 22.5726, endLng: 88.3639, arcAlt: 0.28, color: colors[1] },
  { order: 2, startLat: 19.076, startLng: 72.8777, endLat: 40.7128, endLng: -74.006, arcAlt: 0.52, color: colors[2] },
  { order: 2, startLat: 12.9716, startLng: 77.5946, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.22, color: colors[0] },
  { order: 3, startLat: 13.0827, startLng: 80.2707, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.31, color: colors[1] },
  { order: 3, startLat: 34.0522, startLng: -118.2437, endLat: 28.6139, endLng: 77.209, arcAlt: 0.58, color: colors[2] },
  { order: 4, startLat: 48.8566, startLng: 2.3522, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.37, color: colors[0] },
  { order: 4, startLat: -33.8688, startLng: 151.2093, endLat: 19.076, endLng: 72.8777, arcAlt: 0.34, color: colors[1] },
  { order: 5, startLat: 52.52, startLng: 13.405, endLat: 40.7128, endLng: -74.006, arcAlt: 0.46, color: colors[2] },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -26.2041, endLng: 28.0473, arcAlt: 0.4, color: colors[0] },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[1] },
  { order: 6, startLat: 25.276987, startLng: 55.296249, endLat: 19.076, endLng: 72.8777, arcAlt: 0.19, color: colors[2] },
];

const acraMarqueeImages = [
  "/assets/images/brand-1.webp",
  "/assets/images/brand-2.webp",
  "/assets/images/brand-3.webp",
  "/assets/images/ui.png",
  "/assets/images/ux.png",
  "/assets/images/ui-ux.png",
  "/assets/images/ai-1.webp",
  "/assets/images/ai-2.webp",
  "/assets/images/ai-3.webp",
  "/assets/images/sm-1.png",
  "/assets/images/sm-2.png",
  "/assets/images/sm-3.png",
  "/assets/images/mc-1.png",
  "/assets/images/mc-2.png",
  "/assets/images/mc-3.png",
];

export default function ContactSection() {
  return (
    <section className="relative mx-auto my-20 w-[min(94rem,96%)] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#060c18] px-4 py-12 md:px-8 md:py-16">
      <ThreeDMarquee className="pointer-events-none absolute inset-0 h-full w-full" images={acraMarqueeImages} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(47,109,246,0.26),transparent_40%),radial-gradient(circle_at_86%_72%,rgba(232,67,196,0.2),transparent_42%),linear-gradient(130deg,rgba(2,6,15,0.94),rgba(5,13,28,0.82))]" />

      <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-[24rem] md:h-[38rem]"
        >
          <World data={sampleArcs} globeConfig={globeConfig} />
        </motion.div>   

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-[1.8rem] border border-white/15 bg-black/35 p-6 text-center backdrop-blur-sm md:p-9"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/90">Acra Digital Agency</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white md:text-5xl">
            Ready to launch your next digital growth chapter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
            From brand design and UI/UX to AI automation and social campaigns, Acra builds connected digital systems that move businesses forward faster.
          </p>

          <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
            <InfoPill label="Call Us" value="+91 98765 43210" />
            <InfoPill label="Email" value="hello@acraagency.com" />
            <InfoPill label="Business Hours" value="Mon - Sat, 9:30 AM to 7:00 PM" />
            <InfoPill label="Location" value="Kolkata, India" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/6 px-4 py-3">
      <p className="text-[0.66rem] uppercase tracking-[0.18em] text-cyan-100/75">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
