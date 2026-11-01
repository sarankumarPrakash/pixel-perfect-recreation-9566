import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import mandapam from "@/assets/mandapam.jpg";
import couple from "@/assets/couple.jpg";
/** engagement-rings asset is a blank arch template — bundled couple art fills the frame. */
const couplePortraitSrc = couple;
import { Divider, GoldCard, Jasmine, Kolam, Lamp, SectionTitle } from "./Ornaments";
import { FloatingPetals } from "./FloatingPetals";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9 },
};

function Person({ p, role }: { p: typeof wedding.groom | typeof wedding.bride; role: string }) {
  return (
    <motion.div {...fade} className="mx-auto max-w-xs text-center sm:max-w-sm">
      <p className="font-caps text-[0.65rem] tracking-[0.25em] text-gold sm:text-xs sm:tracking-[0.3em]">{role}</p>
      <h3 className="mt-2 text-balance font-display text-2xl text-primary sm:text-3xl md:text-4xl">{p.name}</h3>
      <p className="mt-1 text-base italic text-muted-foreground sm:text-lg">{p.qualification}</p>
      {p.work && <p className="text-balance text-base text-muted-foreground sm:text-lg">{p.work}</p>}
      <div className="mt-5 text-sm leading-relaxed sm:text-base">
        <p className="font-caps text-[0.65rem] tracking-[0.2em] text-gold sm:text-[0.7rem] sm:tracking-[0.25em]">
          {role === "The Groom" ? "Son of" : "Daughter of"}
        </p>
        <p className="mt-1 text-balance font-semibold">{p.father}</p>
        <p className="text-balance font-semibold">{p.mother}</p>
      </div>
    </motion.div>
  );
}

export function CoupleIntroduction() {
  return (
    <section id="couple" className="relative overflow-hidden bg-silk-ivory px-4 py-16 sm:px-6 sm:py-24">
      <Kolam className="absolute -left-16 -top-16 h-48 w-48 text-gold/20 sm:-left-20 sm:-top-20 sm:h-72 sm:w-72" />
      <Kolam className="absolute -bottom-16 -right-16 h-52 w-52 text-gold/20 sm:-bottom-24 sm:-right-24 sm:h-80 sm:w-80" />
      <Jasmine className="mx-auto mb-8 w-full max-w-xs sm:max-w-sm" />
      <SectionTitle>Together With Our Families</SectionTitle>
      <Divider />
      <motion.figure
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative mx-auto my-10 max-w-sm overflow-hidden rounded-t-full gold-frame shadow-gold sm:max-w-md"
      >
        <motion.img
          src={couplePortraitSrc}
          alt="Illustration of the bride and groom in traditional wedding attire"
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-[3/4] min-h-[18rem] w-full object-cover object-[center_15%] sm:min-h-[22rem]"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 6 }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = couple;
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/50 to-transparent px-4 pb-6 pt-16 text-center sm:px-6 sm:pb-8"
          aria-hidden
        >
          <p className="font-display text-3xl text-gold-gradient sm:text-4xl">{wedding.monogram}</p>
          <p className="mt-2 font-caps text-[0.65rem] tracking-[0.28em] text-champagne sm:text-xs">
            {wedding.reception.date}
          </p>
        </div>
      </motion.figure>
      <div className="mx-auto grid max-w-4xl items-center gap-8 sm:gap-12 md:grid-cols-[1fr_auto_1fr]">
        <Person p={wedding.groom} role="The Groom" />
        <motion.div {...fade} className="flex justify-center text-gold">
          <Heart className="h-10 w-10 fill-primary text-primary" />
        </motion.div>
        <Person p={wedding.bride} role="The Bride" />
      </div>
      <p className="sr-only">Groom's parents: {wedding.groom.father}, {wedding.groom.mother}. Bride's parents: {wedding.bride.father}, {wedding.bride.mother}.</p>
    </section>
  );
}

function Venue() {
  return (
    <>
      <p className="mt-6 text-balance font-display text-lg text-primary sm:text-xl md:text-2xl">{wedding.venue.name}</p>
      {wedding.venue.lines.map((l) => (
        <p key={l} className="text-balance text-base text-muted-foreground sm:text-lg">{l}</p>
      ))}
    </>
  );
}

export function ReceptionDetails() {
  const r = wedding.reception;
  return (
    <section id="reception" className="relative overflow-hidden bg-maroon-radial px-4 py-16 sm:px-6 sm:py-24">
      <FloatingPetals count={10} />
      <GoldCard>
        <p className="font-caps text-xs tracking-[0.35em] text-gold">Join us for the</p>
        <h2 className="mt-2 font-caps text-2xl tracking-[0.12em] text-primary sm:text-4xl sm:tracking-[0.2em] md:text-5xl">RECEPTION</h2>
        <Divider />
        <p className="text-balance text-base font-semibold sm:text-xl">{r.date}</p>
        <p className="mt-1 text-balance font-caps text-sm tracking-[0.15em] text-gold sm:text-base sm:tracking-widest">{r.time}</p>
        <Venue />
      </GoldCard>
    </section>
  );
}

export function WeddingDetails() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const m = wedding.muhurtham;
  return (
    <section ref={ref} id="muhurtham" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <motion.img
        src={mandapam}
        alt=""
        loading="lazy"
        width={1600}
        height={1008}
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-maroon-deep/70" />
      <div className="absolute bottom-4 left-2 flex gap-2 sm:bottom-6 sm:left-10 sm:gap-4">
        <Lamp className="h-10 w-8 sm:h-20 sm:w-auto" />
        <Lamp className="h-8 w-6 sm:h-16 sm:w-auto" />
      </div>
      <div className="absolute bottom-4 right-2 flex gap-2 sm:bottom-6 sm:right-10 sm:gap-4">
        <Lamp className="h-8 w-6 sm:h-16 sm:w-auto" />
        <Lamp className="h-10 w-8 sm:h-20 sm:w-auto" />
      </div>
      <Jasmine className="relative mx-auto mb-6 w-full max-w-xs sm:max-w-sm" />
      <GoldCard className="bg-card/85">
        <p className="font-caps text-xs tracking-[0.35em] text-gold">The auspicious</p>
        <h2 className="mt-2 font-caps text-xl tracking-[0.1em] text-primary sm:text-3xl sm:tracking-[0.18em] md:text-4xl">WEDDING MUHURTHAM</h2>
        <Divider />
        <p className="text-balance text-base font-semibold sm:text-xl">{m.date}</p>
        <p className="mt-1 text-balance font-caps text-sm tracking-[0.15em] text-gold sm:text-base sm:tracking-widest">{m.time}</p>
        <Venue />
      </GoldCard>
    </section>
  );
}

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

export function CountdownTimer() {
  const target = new Date(wedding.muhurtham.isoStart).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section id="countdown" className="relative bg-silk-ivory px-4 py-16 text-center sm:px-6 sm:py-24">
      <SectionTitle>Counting Down</SectionTitle>
      <Divider />
      {t?.done ? (
        <motion.p {...fade} className="font-display text-3xl text-primary sm:text-5xl">
          Happily Married! Thank you for your blessings.
        </motion.p>
      ) : (
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-6" aria-live="polite">
          {(["Days", "Hours", "Minutes", "Seconds"] as const).map((k) => (
            <motion.div key={k} {...fade} className="rounded-sm gold-frame bg-maroon-radial py-4 shadow-gold sm:py-8">
              <div className="relative h-9 overflow-hidden sm:h-16">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={t ? t[k] : k}
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block font-caps text-2xl text-gold-gradient sm:text-4xl md:text-6xl"
                  >
                    {t ? String(t[k]).padStart(2, "0") : "--"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-2 font-caps text-[0.6rem] tracking-[0.2em] text-champagne sm:text-xs">{k}</p>
            </motion.div>
          ))}
        </div>
      )}
      <p className="mt-8 px-2 text-sm italic text-muted-foreground sm:text-base">until {wedding.muhurtham.date}, 6:00 AM IST</p>
    </section>
  );
}

export function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden bg-silk-ivory px-4 pb-16 sm:px-6 sm:pb-24">
      <GoldCard>
        <MapPin className="mx-auto h-10 w-10 text-primary" />
        <SectionTitle>The Venue</SectionTitle>
        <Divider />
        <Venue />
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={wedding.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 font-caps text-xs tracking-[0.15em] text-primary-foreground shadow-gold sm:w-auto sm:max-w-none sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.25em]"
        >
          <Navigation className="h-4 w-4" /> GET DIRECTIONS
        </motion.a>
      </GoldCard>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section id="closing" className="relative overflow-hidden bg-maroon-radial px-4 py-16 text-center sm:px-6 sm:py-24">
      <FloatingPetals count={20} />
      <Kolam className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 text-gold/10 sm:h-[28rem] sm:w-[28rem] md:h-[34rem] md:w-[34rem]" />
      <motion.img
        src={couple}
        alt="Illustration of a Tamil bride and groom under a golden floral arch"
        loading="lazy"
        width={1024}
        height={1280}
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative mx-auto w-56 max-w-[85vw] rounded-t-full border-2 border-gold shadow-gold sm:w-72 md:w-96"
      />
      <div className="relative mt-6 flex justify-center gap-10"><Lamp className="h-16" /><Lamp className="h-16" /></div>
      <motion.h2 {...fade} className="relative mt-8 px-2 text-balance font-display text-xl leading-snug text-gold-gradient sm:text-3xl md:text-5xl">
        {wedding.groom.name.toUpperCase()} <span className="text-primary-foreground">❤️</span> {wedding.bride.name.toUpperCase()}
      </motion.h2>
      <Divider />
      <motion.p {...fade} className="relative mx-auto max-w-xl px-2 text-base italic text-ivory sm:text-xl md:text-2xl">{wedding.closing.message}</motion.p>
      <motion.p {...fade} className="relative mt-8 px-2 font-caps text-xs tracking-[0.2em] text-champagne sm:text-sm sm:tracking-[0.3em]">{wedding.closing.signoff}</motion.p>
    </section>
  );
}
