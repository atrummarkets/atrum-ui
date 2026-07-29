const X_HREF = "https://x.com/atrummarkets";
const SUPPORT_HREF = "mailto:atrummarkets@gmail.com";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1A1C1F",
        padding: "28px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        flexWrap: "wrap",
        fontFamily: "var(--font-manrope)",
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: ".2em",
        color: "#5A5D61",
        textTransform: "uppercase",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/IMG_0991.PNG"
        alt="ATRUM"
        style={{ height: 52, width: "auto", objectFit: "contain" }}
      />
      <div style={{ display: "flex", gap: 26 }}>
        <a href="#join" style={{ color: "#6E7276" }}>
          Waitlist
        </a>
        <a href={X_HREF} target="_blank" rel="noopener" style={{ color: "#6E7276" }}>
          X
        </a>
        <a href={SUPPORT_HREF} style={{ color: "#6E7276" }}>
          Support
        </a>
      </div>
      <span>© MMXXVI</span>
    </footer>
  );
}
