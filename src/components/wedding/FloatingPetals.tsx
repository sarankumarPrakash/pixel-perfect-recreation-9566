import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function FloatingPetals({ count = 14, className = "" }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: (i * 1.3) % 10,
        dur: 10 + ((i * 7) % 8),
        size: 10 + ((i * 5) % 10),
        hue: i % 3,
      })),
    [count],
  );
  if (reduce) return null;
  const fills = ["var(--maroon)", "oklch(0.55 0.17 15)", "var(--champagne)"];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 20 20"
          width={p.size}
          height={p.size}
          className="absolute -top-8"
          style={{ left: `${p.left}%` }}
          animate={{ y: ["0vh", "110vh"], x: [0, 30, -20, 10], rotate: [0, 180, 360] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <path d="M10 0C16 4 18 12 10 20 2 12 4 4 10 0Z" fill={fills[p.hue]} opacity="0.85" />
        </motion.svg>
      ))}
    </div>
  );
}

export function GoldParticles({ count = 30 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-champagne"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ opacity: [0, 1, 0], y: [0, -40] }}
          transition={{ duration: 3 + (i % 4), delay: (i % 7) * 0.5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
