"use client";

import { useEffect, useState } from "react";

type FeedRow = { who: string; what: string; createdAt: string };

const POLL_MS = 2600;

export default function LiveFeed({ initialFeed }: { initialFeed: FeedRow[] }) {
  const [feed, setFeed] = useState<FeedRow[]>(initialFeed);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      try {
        const res = await fetch("/api/waitlist/feed", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.feed)) setFeed(data.feed);
      } catch {
        // network hiccup — keep showing the last known feed
      }
    };
    const t = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        minHeight: 42,
        fontFamily: "var(--font-manrope)",
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: ".16em",
        color: "#6E7276",
        textTransform: "uppercase",
      }}
    >
      {feed.map((row) => (
        <div
          key={row.createdAt}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            animation: "atr-feed .5s ease both",
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              background: "#FFF5D8",
              boxShadow: "0 0 7px rgba(255,245,216,.7)",
            }}
          />
          <span style={{ color: "#A9AEB2" }}>{row.who}</span>
          <span>{row.what}</span>
        </div>
      ))}
    </div>
  );
}
