"use client";

type StarsBackgroundProps = {
  count?: number;
};

const rand = (seed: number) => {
  const x = Math.sin(seed * 1234.567) * 10000;
  return x - Math.floor(x);
};

export function StarsBackground({ count = 90 }: StarsBackgroundProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const top = rand(i + 1) * 100;
    const left = rand(i + 171) * 100;
    const size = 1 + rand(i + 341) * 2.2;
    const opacity = 0.25 + rand(i + 511) * 0.7;
    const delay = rand(i + 681) * 4;
    const duration = 2.2 + rand(i + 851) * 4.8;

    return { i, top, left, size, opacity, delay, duration };
  });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((star) => (
        <span
          key={star.i}
          className="star-dot"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .star-dot {
          position: absolute;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(151, 220, 255, 0.6) 100%);
          box-shadow: 0 0 8px rgba(131, 214, 255, 0.6);
          animation-name: star-pulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes star-pulse {
          0%,
          100% {
            transform: scale(0.85);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.35);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
