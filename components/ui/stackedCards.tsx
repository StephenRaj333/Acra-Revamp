"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type StackedCardsPanelProps = {
  accent: string;
  cards: { title: string; detail: string }[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
};

type StackCard = {
  id: number;
  title: string;
  detail: string;
};

type CardRotateProps = {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag: boolean;
};

function CardRotate({ children, onSendToBack, sensitivity, disableDrag }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
      return;
    }
    x.set(0);
    y.set(0);
  };

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.25}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

function pseudoRandomRotationFromId(id: number): number {
  const seed = Math.sin(id * 12.9898) * 43758.5453;
  const normalized = seed - Math.floor(seed);
  return normalized * 10 - 5;
}

function StackedCardsPanel({
  accent,
  cards,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = false,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}: StackedCardsPanelProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const baseStack = useMemo<StackCard[]>(
    () => cards.map((card, index) => ({ id: index + 1, title: card.title, detail: card.detail })),
    [cards],
  );

  const [stack, setStack] = useState<StackCard[]>(baseStack);

  useEffect(() => {
    setStack(baseStack);
  }, [baseStack]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const next = [...prev];
      const index = next.findIndex((card) => card.id === id);
      if (index < 0) return prev;
      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || stack.length < 2 || isPaused) {
      return;
    }
    const interval = window.setInterval(() => {
      setStack((prev) => {
        if (prev.length < 2) return prev;
        const next = [...prev];
        const [topCard] = next.splice(next.length - 1, 1);
        next.unshift(topCard);
        return next;
      });
    }, autoplayDelay);

    return () => {
      window.clearInterval(interval);
    };
  }, [autoplay, autoplayDelay, isPaused, stack.length]);

  return (
    <div
      className="absolute left-[-0.5vw] bottom-[10vh] h-[18rem] w-[22rem]"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{
        perspective: "600px",
        overflow: "visible",
        transform: "translate(3%, 14%)",
        transformOrigin: "bottom right",
      }}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? pseudoRandomRotationFromId(card.id) : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="absolute inset-0 rounded-[1.1rem] border px-5 py-5"
              onClick={() => {
                if (shouldEnableClick) {
                  sendToBack(card.id);
                }
              }}
              animate={{
                rotateZ: (stack.length - index - 1) * 2.6 + randomRotate,
                scale: 1 + index * 0.05 - stack.length * 0.05,
                y: (stack.length - index - 1) * -12,
                x: (stack.length - index - 1) * -6,
                opacity: 0.72 + index * 0.08,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "tween",
                duration: 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                zIndex: index + 1,
                borderColor: `${accent}55`,
                background: `linear-gradient(160deg, ${accent}f0, #091019 70%)`,
                backgroundColor: "#091019",
                boxShadow: `0 16px 42px ${accent}1f, inset 0 1px 0 rgba(255,255,255,0.14)`,
                transformStyle: "preserve-3d",
                // backfaceVisibility: "hidden",
                // WebkitBackfaceVisibility: "hidden",
                overflow: "hidden",  
              }}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.22em]" style={{ color: accent }}>
                AI Stack
              </p>
              <h4 className="mt-3 text-xl font-semibold text-white">{card.title}</h4>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/72">{card.detail}</p>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}

export default StackedCardsPanel;