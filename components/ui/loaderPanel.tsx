"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type LoaderPanelProps = {
  accent: string;
  steps: string[];
  duration?: number;
  infinite?: boolean;
};

function LoaderPanel({
  accent,
  steps,
  duration = 1400,
  infinite = true,
}: LoaderPanelProps) {
  const safeSteps = useMemo(() => {
    const source = steps.length > 0 ? steps : ["No steps"];
    return source.slice(0, 5);
  }, [steps]);

  const [step, setStep] = useState(0); // 0..4 = steps, 5 = done (triggers success)
  const [phase, setPhase] = useState<"steps" | "success">("steps");
  const panelRef = useRef<HTMLDivElement>(null);
  const confettiFired = useRef(false);

  // ── Fire confetti centered on the panel ──
  const fireConfetti = useCallback(() => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height * 0.35) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: [accent, "#ffffff", "#fbbf24", "#818cf8"],
      startVelocity: 30,
      gravity: 0.8,
      ticks: 120,
      scalar: 0.9,
    });
  }, [accent]);

  // ── Step progression: advance one step every `duration` ms ──
  useEffect(() => {
    if (phase !== "steps") return;

    const timer = window.setTimeout(() => {
      setStep((prev) => {
        if (prev >= safeSteps.length - 1) {
          // Last step has been shown for its full duration → move to success
          setPhase("success");
          return prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, phase, step, safeSteps.length]);

  // ── Success phase: fire confetti once, then restart after 3 s ──
  useEffect(() => {
    if (phase !== "success") {
      confettiFired.current = false;
      return;
    }

    // Fire confetti exactly once per success phase
    if (!confettiFired.current) {
      confettiFired.current = true;
      fireConfetti();
    }

    if (!infinite) return;

    const restart = window.setTimeout(() => {
      setStep(0);
      setPhase("steps");
    }, 3000);

    return () => window.clearTimeout(restart);
  }, [fireConfetti, infinite, phase]);

  const progressPercent =
    phase === "success" ? 100 : ((step + 1) / safeSteps.length) * 100;

  return (
    <div
      ref={panelRef}
      className="absolute left-[-0.5vw] bottom-[1vh] w-[20rem] rounded-[1.35rem] border px-5 py-5 backdrop-blur-xl transition-all duration-500"
      style={{
        borderColor: `${accent}35`,
        background: `linear-gradient(180deg, rgba(8,12,22,0.88), ${accent}18 110%)`,
        boxShadow: `0 20px 52px ${accent}22`,
      }}
    >
      {/* ── Progress bar ── */}
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            boxShadow: `0 0 14px ${accent}66`,
          }}
        />
      </div>

      {/* ── SUCCESS phase: single premium box ── */}
      {phase === "success" && (
        <div
          className="mt-5 flex flex-col items-center justify-center rounded-[1rem] border px-5 py-10 text-center"
          style={{
            borderColor: `${accent}40`,
            background: `linear-gradient(160deg, ${accent}18, rgba(255,255,255,0.03))`,
            boxShadow: `inset 0 1px 0 ${accent}22, 0 8px 32px ${accent}18`,
          }}
        >
          {/* Checkmark circle */}
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: accent, boxShadow: `0 0 28px ${accent}55` }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06101a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p
            className="text-[0.65rem] font-bold uppercase tracking-[0.22em]"
            style={{ color: `${accent}99` }}
          >
            All Systems Verified
          </p>
          <p className="mt-2 text-[1.05rem] font-extrabold leading-tight text-white">
            UX Workflow Complete
          </p>
          <p className="mt-1.5 text-[0.7rem] leading-relaxed text-white/45">
            Every layer refined, tested &amp; production-ready.
          </p>
        </div>
      )}

      {/* ── STEPS phase: the checklist ── */}
      {phase === "steps" && (
        <div className="mt-5 space-y-3">
          {safeSteps.map((label, index) => {
            const isDone = index < step;
            const isCurrent = index === step;
            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-[0.9rem] border px-3 py-3 transition-all duration-500"
                style={{
                  borderColor: isDone
                    ? `${accent}45`
                    : "rgba(255,255,255,0.08)",
                  background: isCurrent
                    ? `${accent}14`
                    : "rgba(255,255,255,0.02)",
                  transform: isCurrent
                    ? "translateX(4px)"
                    : "translateX(0px)",
                }}
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full border text-sm font-bold transition-all duration-500"
                  style={{
                    borderColor: isDone
                      ? accent
                      : "rgba(255,255,255,0.12)",
                    background: isDone ? accent : "transparent",
                    color: isDone
                      ? "#06101a"
                      : "rgba(255,255,255,0.35)",
                    boxShadow: isCurrent
                      ? `0 0 20px ${accent}55`
                      : "none",
                  }}
                >
                  {isDone ? "✓" : index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-white/38">
                    {isCurrent
                      ? "Running"
                      : isDone
                        ? "Completed"
                        : "Queued"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LoaderPanel; 