"use client";

import { useEffect, useMemo, useState } from "react";

type LoaderPanelProps = {
  accent: string;
  steps: string[];
  progress?: number;
  duration?: number;
  infinite?: boolean;
};

function LoaderPanel({
  accent,
  steps,
  progress,
  duration = 5000, 
  infinite = true,
}: LoaderPanelProps) {
  const safeSteps = useMemo(() => (steps.length > 0 ? steps : ["No steps"]), [steps]);
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (typeof progress === "number") {
      return;
    } 

    const timer = window.setInterval(() => {
      setInternalProgress((current) => {
        const next = current + 1;
        if (next >= safeSteps.length) {
          return infinite ? 0 : safeSteps.length - 1;
        }
        return next;
      });
    }, duration);

    return () => {
      window.clearInterval(timer);
    };
  }, [duration, infinite, progress, safeSteps.length]);

  const currentProgress = typeof progress === "number"
    ? ((progress % safeSteps.length) + safeSteps.length) % safeSteps.length
    : internalProgress;

  const progressPercent = ((currentProgress + 1) / safeSteps.length) * 100;

  return (
    <div
      className="absolute left-[-0.5vw] bottom-[1vh] w-[20rem] rounded-[1.35rem] border px-5 py-5 backdrop-blur-xl"
      style={{
        borderColor: `${accent}35`,
        background: `linear-gradient(180deg, rgba(8,12,22,0.88), ${accent}18 110%)`,
        boxShadow: `0 20px 52px ${accent}22`,
      }}
    >


      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500" 
          style={{
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            boxShadow: `0 0 14px ${accent}66`,
          }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {safeSteps.map((step, index) => {
          const isDone = index <= currentProgress;
          const isCurrent = index === currentProgress;
          return (
            <div
              key={step}
              className="flex items-center gap-3 rounded-[0.9rem] border px-3 py-3 transition-all duration-500"
              style={{
                borderColor: isDone ? `${accent}45` : "rgba(255,255,255,0.08)",
                background: isCurrent ? `${accent}14` : "rgba(255,255,255,0.02)",
                transform: isCurrent ? "translateX(4px)" : "translateX(0px)",
              }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border text-sm font-bold transition-all duration-500"
                style={{
                  borderColor: isDone ? accent : "rgba(255,255,255,0.12)",
                  background: isDone ? accent : "transparent",
                  color: isDone ? "#06101a" : "rgba(255,255,255,0.35)",
                  boxShadow: isCurrent ? `0 0 20px ${accent}55` : "none",
                }}
              >
                {isDone ? "✓" : index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{step}</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-white/38">
                  {isCurrent ? "Running" : isDone ? "Completed" : "Queued"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ); 
}

export default LoaderPanel; 