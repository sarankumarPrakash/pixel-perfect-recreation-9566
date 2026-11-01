import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

type Ctx = { autoStart: () => () => void; start: () => void; toggle: () => void; playing: boolean; failed: boolean };
const MusicCtx = createContext<Ctx | null>(null);
const KEY = "wedding-music-muted";

export function playBell() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    [520, 1300, 2100].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.18 / (i + 1), ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 3);
    });
  } catch {
    /* no audio support */
  }
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const a = new Audio(wedding.audioSrc);
    a.loop = true;
    a.volume = 0.45;
    a.preload = "auto";
    a.addEventListener("error", () => setFailed(true));
    ref.current = a;
    return () => a.pause();
  }, []);

  const play = useCallback(() => {
    ref.current?.play().then(() => setPlaying(true)).catch(() => setFailed(true));
  }, []);

  const start = useCallback(() => {
    if (sessionStorage.getItem(KEY) === "1") return;
    play();
  }, [play]);

  // Try to play on page load; browsers may block it until the guest's first tap, key press or scroll.
  const autoStart = useCallback(() => {
    if (sessionStorage.getItem(KEY) === "1") return () => {};
    const events = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"] as const;
    const off = () => events.forEach((e) => window.removeEventListener(e, retry));
    const retry = () => {
      ref.current
        ?.play()
        .then(() => {
          setPlaying(true);
          off();
        })
        .catch(() => {});
    };
    const t = setTimeout(() => {
      ref.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => events.forEach((e) => window.addEventListener(e, retry, { passive: true })));
    }, 50);
    return () => {
      clearTimeout(t);
      off();
    };
  }, []);

  const toggle = useCallback(() => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
      sessionStorage.setItem(KEY, "1");
    } else {
      sessionStorage.setItem(KEY, "0");
      play();
    }
  }, [playing, play]);

  return <MusicCtx.Provider value={{ autoStart, start, toggle, playing, failed }}>{children}</MusicCtx.Provider>;
}

export const useMusic = () => {
  const c = useContext(MusicCtx);
  if (!c) throw new Error("useMusic outside provider");
  return c;
};

export function MusicPlayer() {
  const { toggle, playing, failed } = useMusic();
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggle}
      disabled={failed}
      aria-label={playing ? "Mute music" : "Play music"}
      title={failed ? "Music unavailable" : playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-maroon-radial text-champagne shadow-gold disabled:opacity-50"
    >
      {playing ? (
        <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
          <Music className="h-6 w-6" />
        </motion.span>
      ) : (
        <VolumeX className="h-6 w-6" />
      )}
    </motion.button>
  );
}
