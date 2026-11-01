import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { wedding, weddingAudioSources } from "@/config/wedding";

type Ctx = { autoStart: () => () => void; start: () => void; toggle: () => void; playing: boolean; failed: boolean };
const MusicCtx = createContext<Ctx | null>(null);
const fallback: Ctx = { autoStart: () => () => {}, start: () => {}, toggle: () => {}, playing: false, failed: true };
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
  const gestureBound = useRef(false);

  const isMutedPref = () => sessionStorage.getItem(KEY) === "1";

  const unmuteIfNeeded = useCallback(() => {
    const a = ref.current;
    if (!a || isMutedPref()) return;
    if (!a.muted) return;
    a.muted = false;
    a.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const tryAutoplay = useCallback(async () => {
    const a = ref.current;
    if (!a || isMutedPref()) return;

    try {
      a.muted = false;
      await a.play();
      setPlaying(true);
      setFailed(false);
      return;
    } catch {
      /* blocked — try muted autoplay (allowed on most mobile browsers) */
    }

    try {
      a.muted = true;
      await a.play();
      setPlaying(true);
      setFailed(false);
      a.muted = false;
      try {
        await a.play();
      } catch {
        a.muted = true;
      }
    } catch {
      /* wait for interaction */
    }
  }, []);

  useEffect(() => {
    let sourceIndex = 0;
    const a = new Audio(weddingAudioSources[sourceIndex] ?? wedding.audioSrc);
    a.loop = true;
    a.volume = 0.45;
    a.preload = "auto";
    a.setAttribute("playsinline", "");
    const onError = () => {
      sourceIndex += 1;
      const next = weddingAudioSources[sourceIndex];
      if (next) {
        setFailed(false);
        a.src = next;
        a.load();
        void tryAutoplay();
        return;
      }
      setFailed(true);
    };
    a.addEventListener("error", onError);
    a.addEventListener("playing", () => {
      setPlaying(true);
      setFailed(false);
    });
    ref.current = a;

    const onReady = () => void tryAutoplay();
    a.addEventListener("canplay", onReady);
    void tryAutoplay();

    return () => {
      a.removeEventListener("canplay", onReady);
      a.removeEventListener("error", onError);
      a.pause();
    };
  }, [tryAutoplay]);

  useEffect(() => {
    if (gestureBound.current || isMutedPref()) return;
    gestureBound.current = true;
    const events = ["pointerdown", "touchstart", "keydown"] as const;
    const unlock = () => {
      unmuteIfNeeded();
      void ref.current?.play().then(() => setPlaying(true)).catch(() => {});
      events.forEach((e) => window.removeEventListener(e, unlock));
    };
    events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unlock));
  }, [unmuteIfNeeded]);

  const play = useCallback(() => {
    void tryAutoplay();
  }, [tryAutoplay]);

  const start = useCallback(() => {
    if (isMutedPref()) return;
    void tryAutoplay();
  }, [tryAutoplay]);

  const autoStart = useCallback(() => {
    if (isMutedPref()) return () => {};
    void tryAutoplay();
    const events = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"] as const;
    const off = () => events.forEach((e) => window.removeEventListener(e, retry));
    const retry = () => {
      void tryAutoplay();
      off();
    };
    events.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    return () => {
      off();
    };
  }, [tryAutoplay]);

  const toggle = useCallback(() => {
    if (!ref.current) return;
    if (playing && !ref.current.paused) {
      ref.current.pause();
      setPlaying(false);
      sessionStorage.setItem(KEY, "1");
    } else {
      sessionStorage.setItem(KEY, "0");
      setFailed(false);
      ref.current.muted = false;
      ref.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setFailed(true));
    }
  }, [playing]);

  return <MusicCtx.Provider value={{ autoStart, start, toggle, playing, failed }}>{children}</MusicCtx.Provider>;
}

export const useMusic = () => {
  const c = useContext(MusicCtx);
  return c ?? fallback;
};

export function MusicPlayer() {
  const { toggle, playing, failed } = useMusic();
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggle}
      data-auto-scroll-ignore
      disabled={false}
      aria-label={playing ? "Mute music" : "Play music"}
      title={failed ? "Music unavailable" : playing ? "Mute music" : "Play music"}
      className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-maroon-radial text-champagne shadow-gold disabled:opacity-50 sm:h-14 sm:w-14"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
    >
      {playing ? (
        <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
          <Music className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.span>
      ) : (
        <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </motion.button>
  );
}
