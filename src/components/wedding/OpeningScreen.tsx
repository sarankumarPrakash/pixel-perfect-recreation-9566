import { motion } from "framer-motion";
import murugan from "@/assets/murugan.jpg";
import { wedding } from "@/config/wedding";
import { TempleAnimation } from "./TempleAnimation";
import { FloatingPetals, GoldParticles } from "./FloatingPetals";
import { Divider } from "./Ornaments";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-maroon-radial"
    >
      <GoldParticles />
      <TempleAnimation />
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.img
          src={murugan}
          alt="Lord Murugan"
          width={1024}
          height={1280}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 1.6 }}
          className="h-40 w-auto rounded-t-full border-2 border-gold object-cover shadow-gold sm:h-56"
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2, duration: 1.2 }}>
          <p className="mt-6 font-caps text-sm tracking-[0.3em] text-champagne sm:text-base">With the Divine Blessings</p>
          <Divider />
          <p className="font-serif text-lg italic text-ivory/90 sm:text-2xl">You're Invited to Celebrate</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-gold-gradient sm:text-6xl">
            {wedding.groom.name} <span className="block text-2xl sm:inline sm:text-4xl">&amp;</span> {wedding.bride.name}
          </h1>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="mt-10 rounded-sm border border-champagne bg-gold-gradient px-8 py-4 font-caps text-sm font-semibold tracking-[0.25em] text-maroon-deep shadow-gold"
        >
          OPEN WEDDING INVITATION
        </motion.button>
      </div>
      <FloatingPetals count={16} className="z-20" />
    </motion.section>
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
