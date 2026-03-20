"use client";

import Image from "next/image";

type ThreeDMarqueeProps = {
  images: string[];
  className?: string;
};

const baseStripClass =
  "flex min-w-max gap-5 will-change-transform";

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  const loopImages = [...images, ...images];

  return (
    <div
      className={className}
      style={{
        perspective: "1100px",
        transformStyle: "preserve-3d",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateX(22deg) rotateY(-14deg) scale(1.12)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute left-[-14%] top-[16%] w-[128%] overflow-hidden opacity-70">
          <div
            className={baseStripClass}
            style={{
              animation: "acraMarqueeForward 42s linear infinite",
            }}
          >
            {loopImages.map((src, idx) => (
              <Card key={`row-a-${idx}`} src={src} />
            ))}
          </div>
        </div>

        <div className="absolute left-[-14%] top-[45%] w-[128%] overflow-hidden opacity-75">
          <div
            className={baseStripClass}
            style={{
              animation: "acraMarqueeReverse 38s linear infinite",
            }}
          >
            {loopImages.map((src, idx) => (
              <Card key={`row-b-${idx}`} src={src} />
            ))}
          </div>
        </div>

        <div className="absolute left-[-14%] top-[74%] w-[128%] overflow-hidden opacity-65">
          <div
            className={baseStripClass}
            style={{
              animation: "acraMarqueeForward 46s linear infinite",
            }}
          >
            {loopImages.map((src, idx) => (
              <Card key={`row-c-${idx}`} src={src} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ src }: { src: string }) {
  return (
    <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_16px_35px_rgba(0,0,0,0.35)]">
      <Image src={src} alt="Acra highlight" fill sizes="(max-width: 768px) 44vw, 176px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
    </div>
  );
}
