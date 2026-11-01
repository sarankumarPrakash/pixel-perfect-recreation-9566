import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import murugan from "@/assets/murugan.jpg";
import { wedding } from "@/config/wedding";
import { TempleAnimation } from "./TempleAnimation";
import { FloatingPetals, GoldParticles } from "./FloatingPetals";
import { Divider } from "./Ornaments";

export function OpeningScreen() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-maroon-radial px-4 py-12 sm:py-16">
      <GoldParticles />
      <TempleAnimation />
      <div className="relative z-20 flex w-full max-w-lg flex-col items-center text-center">
        <motion.img
          src={murugan}
          alt="Lord Murugan"
          width={1024}
          height={1280}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 1.4 }}
          className="h-40 w-auto rounded-t-full border-2 border-gold object-cover shadow-gold sm:h-56"
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2, duration: 1.2 }}>
          <p className="mt-6 font-caps text-xs tracking-[0.2em] text-champagne sm:text-base sm:tracking-[0.3em]">With the Divine Blessings</p>
          <Divider />
          <p className="font-serif text-base italic text-ivory/90 sm:text-2xl">You're Invited to Celebrate</p>
          <h1 className="mt-3 text-balance font-display text-[clamp(1.65rem,6.5vw,2.75rem)] leading-snug text-gold-gradient sm:text-5xl md:text-6xl">
            {wedding.groom.name}
            <span className="my-1 block text-2xl sm:my-0 sm:inline sm:text-4xl">&amp;</span>
            {wedding.bride.name}
          </h1>
        </motion.div>
        <motion.a
          href="#couple"
          aria-label="Scroll to invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 4.2 }, y: { duration: 2, repeat: Infinity } }}
          className="mt-12 flex flex-col items-center font-caps text-xs tracking-[0.3em] text-champagne"
        >
          Scroll
          <ChevronDown className="mt-1 h-6 w-6" />
        </motion.a>
      </div>
      <FloatingPetals count={16} className="z-20" />
    </section>
  );
}

export function LoadingMonogram() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-radial"
    >
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-gold font-display text-3xl text-gold-gradient shadow-gold"
      >
        {wedding.monogram}
      </motion.div>
    </motion.div>
  );
}
