import { motion } from "framer-motion";

function Door({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isLeft ? -105 : 105 }}
      transition={{ delay: 1, duration: 2.4, ease: [0.6, 0, 0.3, 1] }}
      style={{ transformOrigin: isLeft ? "left center" : "right center" }}
      className={`absolute top-0 h-full w-1/2 bg-maroon-radial ${isLeft ? "left-0 border-r" : "right-0 border-l"} border-gold`}
    >
      <div className="absolute inset-4 grid grid-cols-2 grid-rows-4 gap-3 sm:inset-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rounded-sm border border-gold/70 bg-gold-gradient opacity-25" />
        ))}
      </div>
      <div className={`absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-2 border-gold bg-gold-gradient ${isLeft ? "right-3" : "left-3"}`} />
    </motion.div>
  );
}

export function TempleAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" style={{ perspective: 1600 }} aria-hidden>
      <Door side="left" />
      <Door side="right" />
      {/* Temple bell */}
      <motion.div
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.svg
          width="70"
          height="120"
          viewBox="0 0 70 120"
          style={{ transformOrigin: "35px 0px" }}
          animate={{ rotate: [0, 18, -14, 10, -6, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <rect x="33" y="0" width="4" height="40" fill="var(--gold)" />
          <path d="M35 38c-14 0-20 14-22 40-1 8-6 10-6 14h56c0-4-5-6-6-14-2-26-8-40-22-40z" fill="var(--gold)" />
          <circle cx="35" cy="100" r="6" fill="var(--champagne)" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
