import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { MusicPlayer, MusicProvider, useMusic } from "@/components/wedding/MusicPlayer";
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
  const { autoStart } = useMusic();
  useAutoScroll(!loading);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1200);
    const stop = autoStart();
    return () => {
      clearTimeout(id);
      stop();
    };
  }, [autoStart]);

  return (
    <main>
      <AnimatePresence>{loading && <LoadingMonogram key="load" />}</AnimatePresence>
      {!loading && (
        <>
          <OpeningScreen />
          <CoupleIntroduction />
          <ReceptionDetails />
          <WeddingDetails />
          <CountdownTimer />
          <VenueSection />
          <ClosingSection />
          <MusicPlayer />
        </>
      )}
    </main>
  );
}
