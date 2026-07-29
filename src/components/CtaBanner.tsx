export default function CtaBanner({ countLabel }: { countLabel: string }) {
  return (
    <section style={{ position: "relative", padding: "0 40px 120px", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          position: "relative",
          border: "1px solid #1A1C1F",
          background: "linear-gradient(160deg,#111214,#0B0D0F 60%,#111214)",
          padding: "clamp(48px,7vw,96px) clamp(28px,5vw,72px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "120%",
            background: "radial-gradient(ellipse at 50% 30%, rgba(255,245,216,.10), transparent 62%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "relative",
            fontFamily: "var(--font-manrope)",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: ".32em",
            color: "#6E7276",
            textTransform: "uppercase",
          }}
        >
          Access in waves
        </span>
        <h2
          style={{
            position: "relative",
            margin: 0,
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 600,
            fontSize: "clamp(36px,5.4vw,78px)",
            lineHeight: 0.94,
            letterSpacing: "-.01em",
            textTransform: "uppercase",
            color: "#F7F2E8",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          The doors open once. They do not open twice.
        </h2>
        <p
          style={{
            position: "relative",
            margin: 0,
            maxWidth: "52ch",
            fontSize: 14,
            lineHeight: 1.8,
            color: "#8E9296",
          }}
        >
          {countLabel} initiates hold a seat. Earliest oath, earliest key.
        </p>
        <a
          href="#join"
          className="atr-cta-link"
          style={{
            position: "relative",
            padding: "17px 40px",
            background: "linear-gradient(168deg,#FFFFFF,#F7F2E8 34%,#C8CCD0 62%,#F7F2E8)",
            color: "#080A0C",
            fontFamily: "var(--font-manrope)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          Claim your place
        </a>
      </div>
    </section>
  );
}
