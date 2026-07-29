const LAWS = [
  {
    n: "01",
    title: "Blind books",
    body: "Positions stay encrypted until settlement. Nobody copies your trade, because nobody can see it.",
  },
  {
    n: "02",
    title: "Unnamed capital",
    body: "Deposit, wager and withdraw with no name attached. Proofs, not profiles.",
  },
  {
    n: "03",
    title: "Ruthless settlement",
    body: "Oracles resolve on-chain, instantly, with no appeal and no house discretion.",
  },
];

export default function ThreeLaws() {
  return (
    <section
      style={{
        background: "#080A0C",
        padding: "clamp(64px,14vw,110px) clamp(20px,6vw,40px)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 22,
            borderBottom: "1px solid #1A1C1F",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 600,
              fontSize: "clamp(34px,4.4vw,60px)",
              lineHeight: 0.98,
              letterSpacing: "-.01em",
              textTransform: "uppercase",
              color: "#F7F2E8",
              textWrap: "balance",
            }}
          >
            Three laws of the house
          </h2>
          <span
            style={{
              fontFamily: "var(--font-manrope)",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: ".22em",
              color: "#5A5D61",
              textTransform: "uppercase",
            }}
          >
            Protocol · MMXXVI
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 1,
            background: "#1A1C1F",
          }}
        >
          {LAWS.map((law) => (
            <div
              key={law.n}
              className="atr-law-card"
              style={{
                background: "#111214",
                padding: "clamp(28px,6vw,40px) clamp(22px,5vw,32px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "background .25s",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: ".24em",
                  color: "#5A5D61",
                }}
              >
                {law.n}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-barlow-condensed)",
                  fontWeight: 600,
                  fontSize: 27,
                  lineHeight: 1.06,
                  textTransform: "uppercase",
                  color: "#F7F2E8",
                }}
              >
                {law.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.75,
                  color: "#8E9296",
                  textWrap: "pretty",
                }}
              >
                {law.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
