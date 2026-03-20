"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

type FlipWordsPickerProps = {
  words: string[];
  accent?: string;
  activeIndex?: number;
  onChange?: (index: number, word: string) => void;
  className?: string;
  height?: number;
};

function wrapIndex(value: number, total: number): number {
  if (total <= 0) return 0;
  return ((value % total) + total) % total;
}

function shortestDistance(index: number, center: number, total: number): number {
  const raw = ((index - center) % total + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

function nearestLoopedTarget(current: number, wrappedTarget: number, total: number): number {
  if (total <= 0) return wrappedTarget;
  const cycle = Math.round(current / total) * total;
  const candidates = [cycle + wrappedTarget, cycle + wrappedTarget + total, cycle + wrappedTarget - total];
  return candidates.reduce((best, next) => (Math.abs(next - current) < Math.abs(best - current) ? next : best), candidates[0]);
}

function FlipWordsPicker({
  words,
  accent = "#7aa2ff",
  activeIndex,
  onChange,
  className,
  height = 224,
}: FlipWordsPickerProps) {
  const safeWords = useMemo(() => (words.length > 0 ? words : ["-"]), [words]);
  const total = safeWords.length;
  const itemHeight = 46;
  const radius = 108;
  const dragStartYRef = useRef<number | null>(null);
  const dragStartValueRef = useRef(0);
  const snapTimerRef = useRef<number | null>(null);
  const initialSelected = wrapIndex(activeIndex ?? 0, total);
  const selectedRef = useRef(initialSelected);

  const position = useMotionValue(initialSelected);
  const smoothPosition = useSpring(position, {
    stiffness: 220,
    damping: 30,
    mass: 0.75,
  });

  const [renderPosition, setRenderPosition] = useState(initialSelected);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const clamped = wrapIndex(selectedRef.current, total);
    selectedRef.current = clamped;
  }, [total]);

  useEffect(() => {
    if (typeof activeIndex !== "number") return;
    const wrapped = wrapIndex(activeIndex, total);
    const current = position.get();
    const target = nearestLoopedTarget(current, wrapped, total);
    selectedRef.current = wrapped;
    animate(position, target, {
      type: "spring",
      stiffness: 240,
      damping: 32,
      mass: 0.8,
    });
  }, [activeIndex, total, position]);

  useMotionValueEvent(smoothPosition, "change", (latest) => {
    setRenderPosition(latest);
    const nearest = wrapIndex(Math.round(latest), total);
    if (nearest !== selectedRef.current) {
      selectedRef.current = nearest;
      onChange?.(nearest, safeWords[nearest]);
    }
  });

  const snapToNearest = () => {
    const nearest = Math.round(position.get());
    animate(position, nearest, {
      type: "spring",
      stiffness: 260,
      damping: 30,
      mass: 0.7,
    });
  };

  const queueSnap = () => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current);
    }
    snapTimerRef.current = window.setTimeout(() => {
      snapToNearest();
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const delta = event.deltaY / 120;
    position.set(position.get() + delta * 0.32);
    queueSnap();
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    setIsDragging(true);
    dragStartYRef.current = event.clientY;
    dragStartValueRef.current = position.get();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (dragStartYRef.current === null) return;
    const deltaY = event.clientY - dragStartYRef.current;
    position.set(dragStartValueRef.current - deltaY / itemHeight);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    dragStartYRef.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    snapToNearest();
  };

  const ringItems = useMemo(() => {
    return safeWords.map((word, index) => {
      const diff = shortestDistance(index, renderPosition, total);
      const angle = diff * 24;
      const abs = Math.abs(diff);
      const active = abs < 0.42;
      return {
        key: `${word}-${index}`,
        word,
        transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
        opacity: abs > 3.4 ? 0 : active ? 1 : Math.max(0.1, 0.78 - abs * 0.24),
        blur: Math.min(6, abs * 1.6),
        scale: active ? 1 : Math.max(0.82, 1 - abs * 0.07),
        active,
      };
    });
  }, [renderPosition, radius, safeWords, total]);

  return (
    <div
      className={className}
      style={{
        width: 400, 
        height,
        borderRadius: 24,
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${accent}44`,
        background:
          "linear-gradient(180deg, rgba(250,252,255,0.22), rgba(215,225,248,0.08) 20%, rgba(18,24,40,0.6) 52%, rgba(9,12,20,0.74) 100%)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.34), 0 28px 64px rgba(0,0,0,0.48), 0 0 56px ${accent}26`,
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        role="listbox"
        aria-label="3D vertical picker"
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1100px",
          transformStyle: "preserve-3d",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 82%, transparent 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: itemHeight,
            marginTop: -(itemHeight / 2),
            // borderTop: `1px solid ${accent}66`,
            // borderBottom: `1px solid ${accent}66`,
            background: `linear-gradient(90deg, transparent, ${accent}22 15%, ${accent}18 85%, transparent)`,
            boxShadow: `0 0 28px ${accent}2a`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "70%",
            height: itemHeight + 24,
            transform: "translate(-50%, -50%)",
            borderRadius: 18,
            border: `1px solid ${accent}55`,
            boxShadow: `0 0 36px ${accent}3f, inset 0 0 24px ${accent}14`,
            animation: "picker-focus-pulse 2.3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "50%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            transform: "translateY(-50%)",
            boxShadow: `0 0 14px ${accent}`,
            animation: "picker-dot-flicker 1.2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            transform: "translateY(-50%)",
            boxShadow: `0 0 14px ${accent}`,
            animation: "picker-dot-flicker 1.2s ease-in-out infinite 0.25s",
            pointerEvents: "none",
          }}
        />

        {ringItems.map((item) => (
          <div
            key={item.key}
            aria-selected={item.active}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              marginTop: -itemHeight / 2,
              height: itemHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
              transform: item.transform,
              opacity: item.opacity,
              filter: `blur(${item.blur}px)`,
              transition: "opacity 180ms linear, filter 220ms ease",
              pointerEvents: "none",
            }} 
          >
            <span
              style={{
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                fontSize: item.active ? 42 : 29,
                fontWeight: item.active ? 760 : 560,
                letterSpacing: item.active ? "-0.02em" : "-0.01em",
                transform: `scale(${item.active ? item.scale * 1.08 : item.scale})`,
                color: item.active ? "rgba(255,255,255,0.97)" : "rgba(221,228,245,0.72)",
                textShadow: item.active ? `0 0 34px ${accent}66, 0 2px 14px rgba(0,0,0,0.35)` : "0 2px 12px rgba(0,0,0,0.22)",
                transition: "transform 180ms ease",
              }}
            >
              {item.word}
            </span>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(7,10,16,0.88) 0%, rgba(7,10,16,0.32) 18%, rgba(7,10,16,0) 30%, rgba(7,10,16,0) 70%, rgba(7,10,16,0.34) 82%, rgba(7,10,16,0.9) 100%)",
          }}
        />

        <style>{`
          @keyframes picker-focus-pulse {
            0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.02); }
          }
          @keyframes picker-dot-flicker {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default FlipWordsPicker;