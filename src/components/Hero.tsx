"use client";

import { useCountdown } from "@/lib/useCountdown";
import JoinPanel from "./JoinPanel";
import LiveFeed from "./LiveFeed";
import Ticker from "./Ticker";

type FeedRow = { who: string; what: string; createdAt: string };

export default function Hero({
  launchDateIso,
  initialFeed,
}: {
  launchDateIso: string;
  initialFeed: FeedRow[];
}) {
  const targetMs = new Date(launchDateIso).getTime();
  const { d, h, m, s } = useCountdown(targetMs);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/atrum-key-art.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(100vw,100vh)",
            height: "max(100vh,100vw)",
            marginLeft: "calc(max(100vw,100vh) / -2)",
            marginTop: "calc(max(100vh,100vw) / -2)",
            objectFit: "cover",
            objectPosition: "50% 62%",
            filter: "grayscale(.35) contrast(1.05)",
            animation: "atr-drift 36s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 58% 44% at 50% 58%, rgba(8,10,12,0), rgba(8,10,12,.58) 60%, #080A0C 92%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,10,12,.92) 0%, rgba(8,10,12,.5) 26%, rgba(8,10,12,.4) 52%, rgba(8,10,12,.92) 86%, #080A0C 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "24%",
            width: "min(460px,62vw)",
            height: "min(460px,62vw)",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,245,216,.14), transparent 68%)",
            filter: "blur(16px)",
            animation: "atr-halo 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "12vh",
            background: "linear-gradient(180deg, transparent, rgba(236,231,218,.035), transparent)",
            animation: "atr-scan 11s linear infinite",
            pointerEvents: "none",
          }}
        />
      </div>

      <header
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "24px 40px",
          animation: "atr-in 1s ease both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/IMG_0991.PNG"
            alt="ATRUM"
            style={{ height: 22, width: "auto", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-manrope)",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: ".2em",
            color: "#8E9296",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#FFF5D8",
              boxShadow: "0 0 8px rgba(255,245,216,.8)",
              animation: "atr-pulse 2.4s ease-in-out infinite",
            }}
          />
          Invite-only
        </div>
      </header>

      <div
        style={{
          position: "relative",
          zIndex: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "center",
          padding: "48px 28px 64px",
          gap: 22,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-manrope)",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: ".42em",
            color: "#9BA0A5",
            textTransform: "uppercase",
            animation: "atr-rise 1s ease .1s both",
          }}
        >
          Private prediction markets
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(46px,9.6vw,164px)",
            lineHeight: 0.9,
            letterSpacing: "-.022em",
            textTransform: "uppercase",
            background:
              "linear-gradient(177deg,#FFFFFF 3%,#F7F2E8 22%,#8B9096 46%,#FDFCF8 60%,#9AA0A6 76%,#ECE7DA 96%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 60px rgba(8,10,12,.95)) drop-shadow(0 0 120px rgba(255,245,216,.14))",
            animation: "atr-rise 1.15s ease .2s both",
          }}
        >
          Bet in
          <br />
          the dark
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "44ch",
            fontSize: 14.5,
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#A9AEB2",
            textWrap: "pretty",
            animation: "atr-rise 1.3s ease .3s both",
          }}
        >
          Wager in silence. No visible book, no name on the ledger, no crowd to copy you.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 22,
            animation: "atr-rise 1.4s ease .4s both",
          }}
        >
          {[
            { v: d, label: "DAYS" },
            null,
            { v: h, label: "HRS" },
            null,
            { v: m, label: "MIN" },
            null,
            { v: s, label: "SEC", accent: true },
          ].map((unit, i) =>
            unit === null ? (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: 30,
                  color: "#3F4043",
                  lineHeight: 1.3,
                }}
              >
                /
              </span>
            ) : (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontWeight: 600,
                    fontSize: 38,
                    lineHeight: 1,
                    color: unit.accent ? "#FFF5D8" : "#F7F2E8",
                  }}
                >
                  {unit.v}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontWeight: 500,
                    fontSize: 9,
                    letterSpacing: ".24em",
                    color: "#6E7276",
                  }}
                >
                  {unit.label}
                </span>
              </div>
            )
          )}
        </div>

        <div
          id="join"
          style={{
            width: "100%",
            maxWidth: 540,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            animation: "atr-rise 1.5s ease .5s both",
          }}
        >
          <JoinPanel />
        </div>

        <LiveFeed initialFeed={initialFeed} />
      </div>

      <Ticker />
    </section>
  );
}
