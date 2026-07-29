const MARKETS = [
  { q: "BTC above $180K by Dec 31", p: "41%", v: "$2.4M" },
  { q: "Fed cuts twice before Q4", p: "67%", v: "$1.1M" },
  { q: "OpenAI ships an agent OS", p: "23%", v: "$860K" },
  { q: "ETH/BTC reclaims 0.05", p: "55%", v: "$3.0M" },
  { q: "TSMC 2nm slips to 2027", p: "18%", v: "$490K" },
  { q: "A sovereign buys BTC", p: "34%", v: "$1.7M" },
  { q: "Nvidia misses guidance", p: "12%", v: "$920K" },
  { q: "Stablecoin bill signed", p: "72%", v: "$2.2M" },
];
// Duplicated once so the 48s marquee loop (translateX -50%) has no seam.
const ROW = [...MARKETS, ...MARKETS];

export default function Ticker() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 3,
        borderTop: "1px solid #1A1C1F",
        background: "rgba(8,10,12,.78)",
        backdropFilter: "blur(10px)",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "atr-marquee 48s linear infinite",
        }}
      >
        {ROW.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "0 30px",
              borderRight: "1px solid #1A1C1F",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <span style={{ fontSize: 11.5, color: "#8E9296" }}>{row.q}</span>
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 600,
                fontSize: 15,
                color: "#F7F2E8",
              }}
            >
              {row.p}
            </span>
            <span style={{ fontSize: 9.5, letterSpacing: ".16em", color: "#5A5D61" }}>
              {row.v}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg,#080A0C 0%, transparent 10%, transparent 90%, #080A0C 100%)",
        }}
      />
    </div>
  );
}
