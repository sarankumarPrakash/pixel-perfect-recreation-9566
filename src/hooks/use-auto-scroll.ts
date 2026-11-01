import { useEffect } from "react";

/**
 * Gently scrolls the page down after a start delay. Stops for good as soon as the
 * guest scrolls, taps or presses a key, or when the bottom is reached.
 */
export function useAutoScroll(enabled: boolean, startDelay = 5000, pxPerSecond = 45) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    let pos = window.scrollY;
    let stopped = false;
    const stop = () => {
      stopped = true;
      cancelAnimationFrame(raf);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true }));

    const step = (t: number) => {
      if (stopped) return;
      if (last) pos += ((t - last) / 1000) * pxPerSecond;
      last = t;
      window.scrollTo(0, pos);
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) return stop();
      raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => {
      pos = window.scrollY;
      document.documentElement.style.scrollBehavior = "auto";
      raf = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      stop();
      document.documentElement.style.scrollBehavior = "";
    };
  }, [enabled, startDelay, pxPerSecond]);
}
