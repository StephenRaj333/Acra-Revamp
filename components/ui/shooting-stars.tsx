"use client";

type ShootingStarsProps = {
  count?: number;
};

const rand = (seed: number) => {
  const x = Math.sin(seed * 999.91) * 10000;
  return x - Math.floor(x);
};

export function ShootingStars({ count = 12 }: ShootingStarsProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const top = 5 + rand(i + 1) * 55;
    const left = -20 + rand(i + 101) * 120;
    const delay = rand(i + 201) * 8;
    const duration = 2.5 + rand(i + 301) * 3.5;
    const length = 100 + rand(i + 401) * 180;

    return { i, top, left, delay, duration, length };
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((star) => (
        <span
          key={star.i}
          className="shooting-star-line"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.length}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .shooting-star-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(180, 230, 255, 0.95));
          filter: drop-shadow(0 0 6px rgba(133, 209, 255, 0.7));
          transform: rotate(-20deg);
          opacity: 0;
          animation-name: shooting-star-run;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes shooting-star-run {
          0% {
            transform: translate3d(0, 0, 0) rotate(-20deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          55% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(48vw, 18vw, 0) rotate(-20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
