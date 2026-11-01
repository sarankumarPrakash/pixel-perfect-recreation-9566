import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MusicPlayer, MusicProvider, playBell, useMusic } from "@/components/wedding/MusicPlayer";
import { LoadingMonogram, OpeningScreen } from "@/components/wedding/OpeningScreen";
import {
  ClosingSection,
  CountdownTimer,
  CoupleIntroduction,
  ReceptionDetails,
  VenueSection,
  WeddingDetails,
} from "@/components/wedding/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P. Monish ❤ R. Saranya — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of P. Monish & R. Saranya on 22 November 2026 at Sri Karthikeyan Mahal, Gobichettipalayam." },
      { property: "og:title", content: "P. Monish ❤ R. Saranya — Wedding Invitation" },
      { property: "og:description", content: "Reception 21 Nov 2026 · Muhurtham 22 Nov 2026 · Sri Karthikeyan Mahal, Gobichettipalayam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <MusicProvider>
      <Invitation />
    </MusicProvider>
  ),
});

function Invitation() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const { start } = useMusic();

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(id);
  }, []);

  const open = () => {
    playBell();
    start();
    setOpened(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className={opened ? "" : "h-screen overflow-hidden"}>
      <AnimatePresence>{loading && <LoadingMonogram key="load" />}</AnimatePresence>
      <AnimatePresence>{!loading && !opened && <OpeningScreen key="open" onOpen={open} />}</AnimatePresence>
      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.4 }}>
          <CoupleIntroduction />
          <ReceptionDetails />
          <WeddingDetails />
          <CountdownTimer />
          <VenueSection />
          <ClosingSection />
          <MusicPlayer />
        </motion.div>
      )}
    </main>
  );
}
