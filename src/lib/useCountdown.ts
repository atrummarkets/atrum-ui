"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

export type Countdown = { d: string; h: string; m: string; s: string };

export function useCountdown(targetMs: number): Countdown {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Date.now() can't be read during render without risking an SSR/client
    // hydration mismatch, so the first real value is deliberately set here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null) {
    return { d: "00", h: "00", m: "00", s: "00" };
  }

  const day = 86400000;
  const diff = Math.max(0, targetMs - now);
  return {
    d: pad(diff / day),
    h: pad((diff % day) / 3600000),
    m: pad((diff % 3600000) / 60000),
    s: pad((diff % 60000) / 1000),
  };
}
