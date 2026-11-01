import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import mandapam from "@/assets/mandapam.jpg";
import couple from "@/assets/couple.jpg";
import rings from "@/assets/engagement-rings.jpeg.asset.json";
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
    <motion.div {...fade} className="text-center">
      <p className="font-caps text-xs tracking-[0.3em] text-gold">{role}</p>
      <h3 className="mt-2 font-display text-3xl text-primary sm:text-4xl">{p.name}</h3>
      <p className="mt-1 text-lg italic text-muted-foreground">{p.qualification}</p>
      {p.work && <p className="text-lg text-muted-foreground">{p.work}</p>}
      <div className="mt-5 text-base">
        <p className="font-caps text-[0.7rem] tracking-[0.25em] text-gold">{role === "The Groom" ? "Son of" : "Daughter of"}</p>
        <p className="mt-1 font-semibold">{p.father}</p>
        <p className="font-semibold">{p.mother}</p>
      </div>
    </motion.div>
  );
}

export function CoupleIntroduction() {
  return (
    <section id="couple" className="relative overflow-hidden bg-silk-ivory px-6 py-24">
      <Kolam className="absolute -left-20 -top-20 h-72 w-72 text-gold/20" />
      <Kolam className="absolute -bottom-24 -right-24 h-80 w-80 text-gold/20" />
      <Jasmine className="mx-auto mb-8 w-64" />
      <SectionTitle>Together With Our Families</SectionTitle>
      <Divider />
      <motion.figure
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mx-auto my-10 max-w-md overflow-hidden rounded-t-full gold-frame shadow-gold"
      >
        <motion.img
          src={rings.url}
          alt="The couple's hands with engagement rings"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 6 }}
        />
      </motion.figure>
      <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[1fr_auto_1fr]">
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
      <p className="mt-6 font-display text-xl text-primary sm:text-2xl">{wedding.venue.name}</p>
      {wedding.venue.lines.map((l) => (
        <p key={l} className="text-lg text-muted-foreground">{l}</p>
      ))}
    </>
  );
}

export function ReceptionDetails() {
  const r = wedding.reception;
  return (
    <section id="reception" className="relative overflow-hidden bg-maroon-radial px-6 py-24">
      <FloatingPetals count={10} />
      <GoldCard>
        <p className="font-caps text-xs tracking-[0.35em] text-gold">Join us for the</p>
        <h2 className="mt-2 font-caps text-3xl tracking-[0.2em] text-primary sm:text-5xl">RECEPTION</h2>
        <Divider />
        <p className="text-xl font-semibold">{r.date}</p>
        <p className="mt-1 font-caps tracking-widest text-gold">{r.time}</p>
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
    <section ref={ref} id="muhurtham" className="relative overflow-hidden px-6 py-28">
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
      <div className="absolute bottom-6 left-4 flex gap-4 sm:left-10"><Lamp className="h-20" /><Lamp className="h-16" /></div>
      <div className="absolute bottom-6 right-4 flex gap-4 sm:right-10"><Lamp className="h-16" /><Lamp className="h-20" /></div>
      <Jasmine className="relative mx-auto mb-6 w-72" />
      <GoldCard className="bg-card/85">
        <p className="font-caps text-xs tracking-[0.35em] text-gold">The auspicious</p>
        <h2 className="mt-2 font-caps text-2xl tracking-[0.18em] text-primary sm:text-4xl">WEDDING MUHURTHAM</h2>
        <Divider />
        <p className="text-xl font-semibold">{m.date}</p>
        <p className="mt-1 font-caps tracking-widest text-gold">{m.time}</p>
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
    <section id="countdown" className="relative bg-silk-ivory px-6 py-24 text-center">
      <SectionTitle>Counting Down</SectionTitle>
      <Divider />
      {t?.done ? (
        <motion.p {...fade} className="font-display text-3xl text-primary sm:text-5xl">
          Happily Married! Thank you for your blessings.
        </motion.p>
      ) : (
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:gap-6" aria-live="polite">
          {(["Days", "Hours", "Minutes", "Seconds"] as const).map((k) => (
            <motion.div key={k} {...fade} className="rounded-sm gold-frame bg-maroon-radial py-5 shadow-gold sm:py-8">
              <div className="relative h-10 overflow-hidden sm:h-16">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={t ? t[k] : k}
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block font-caps text-3xl text-gold-gradient sm:text-6xl"
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
      <p className="mt-8 italic text-muted-foreground">until {wedding.muhurtham.date}, 6:00 AM IST</p>
    </section>
  );
}

export function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden bg-silk-ivory px-6 pb-24">
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
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-caps text-sm tracking-[0.25em] text-primary-foreground shadow-gold"
        >
          <Navigation className="h-4 w-4" /> GET DIRECTIONS
        </motion.a>
      </GoldCard>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section id="closing" className="relative overflow-hidden bg-maroon-radial px-6 py-24 text-center">
      <FloatingPetals count={20} />
      <Kolam className="absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 text-gold/10" />
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
        className="relative mx-auto w-72 rounded-t-full border-2 border-gold shadow-gold sm:w-96"
      />
      <div className="relative mt-6 flex justify-center gap-10"><Lamp className="h-16" /><Lamp className="h-16" /></div>
      <motion.h2 {...fade} className="relative mt-8 font-display text-3xl text-gold-gradient sm:text-5xl">
        {wedding.groom.name.toUpperCase()} <span className="text-primary-foreground">❤️</span> {wedding.bride.name.toUpperCase()}
      </motion.h2>
      <Divider />
      <motion.p {...fade} className="relative mx-auto max-w-xl text-xl italic text-ivory sm:text-2xl">{wedding.closing.message}</motion.p>
      <motion.p {...fade} className="relative mt-8 font-caps tracking-[0.3em] text-champagne">{wedding.closing.signoff}</motion.p>
    </section>
  );
}
