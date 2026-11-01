import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Divider() {
  return (
    <div className="mx-auto my-6 flex items-center justify-center gap-3 text-gold" aria-hidden>
      <span className="h-px w-16 bg-gold/60 sm:w-24" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
        <path d="M20 0c2 5 6 8 10 10-4 2-8 5-10 10-2-5-6-8-10-10 4-2 8-5 10-10z" />
        <circle cx="3" cy="10" r="2" /><circle cx="37" cy="10" r="2" />
      </svg>
      <span className="h-px w-16 bg-gold/60 sm:w-24" />
    </div>
  );
}

export function Kolam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden>
      {[0, 45, 90, 135].map((r) => (
        <ellipse key={r} cx="50" cy="50" rx="44" ry="16" transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="10" />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4;
        return <circle key={i} cx={50 + 30 * Math.cos(a)} cy={50 + 30 * Math.sin(a)} r="1.6" fill="currentColor" />;
      })}
    </svg>
  );
}

export function Lamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className} aria-hidden>
      <g className="animate-flicker">
        <ellipse cx="20" cy="14" rx="5" ry="10" fill="var(--champagne)" opacity="0.9" />
        <ellipse cx="20" cy="17" rx="2.5" ry="5" fill="var(--ivory)" />
      </g>
      <circle cx="20" cy="14" r="16" fill="var(--gold)" opacity="0.15" />
      <path d="M6 26 Q20 36 34 26 L30 32 Q20 38 10 32 Z" fill="var(--gold)" />
      <rect x="18" y="34" width="4" height="30" fill="var(--gold)" />
      <path d="M8 76 Q20 62 32 76 Z" fill="var(--gold)" />
    </svg>
  );
}

export function Jasmine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden>
      <path d="M0 4 Q100 34 200 4" stroke="var(--gold)" strokeWidth="0.6" fill="none" />
      {[...Array(13)].map((_, i) => {
        const t = i / 12;
        const x = t * 200;
        const y = 4 + 30 * t * (1 - t) * 2;
        return <circle key={i} cx={x} cy={y} r="3.2" fill="var(--ivory)" stroke="var(--champagne)" strokeWidth="0.6" />;
      })}
    </svg>
  );
}

export function GoldCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`relative mx-auto max-w-xl rounded-sm gold-frame bg-card/90 px-6 py-10 text-center shadow-gold backdrop-blur-sm sm:px-12 ${className}`}
    >
      {["left-2 top-2", "right-2 top-2 rotate-90", "right-2 bottom-2 rotate-180", "left-2 bottom-2 -rotate-90"].map((p) => (
        <svg key={p} className={`absolute h-8 w-8 text-gold ${p}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden>
          <path d="M2 30V2h28M6 26V6h20" /><circle cx="6" cy="6" r="2" fill="currentColor" />
        </svg>
      ))}
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <motion.h2
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className={`text-center font-caps text-2xl uppercase sm:text-4xl ${light ? "text-gold-gradient" : "text-primary"}`}
    >
      {children}
    </motion.h2>
  );
}
