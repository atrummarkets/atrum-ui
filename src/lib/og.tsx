import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const OLD_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
    { headers: { "User-Agent": OLD_CHROME_UA } }
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(?:woff|truetype|opentype)'\)/);
  if (!match) throw new Error(`og: could not resolve font data for ${family} ${weight}`);

  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

async function assetDataUri(relPath: string, mime: string) {
  const buf = await readFile(
    join(/* turbopackIgnore: true */ process.cwd(), relPath)
  );
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export async function renderShareImage() {
  const headline = "PRIVATE PREDICTION MARKETS";
  const subline = "Wager in silence. No visible book, no name on the ledger.";
  const label = "ATRUM.FUN";

  const [bgUri, wordmarkUri, barlow, manropeMedium, manropeSemibold] = await Promise.all([
    assetDataUri("assets/og-bg.jpg", "image/jpeg"),
    assetDataUri("assets/atrum-wordmark-ivory.png", "image/png"),
    loadGoogleFont("Barlow Condensed", 600, headline),
    loadGoogleFont("Manrope", 500, subline + label),
    loadGoogleFont("Manrope", 600, label),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#06070A",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgUri}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to top, rgba(6,7,10,0.95) 0%, rgba(6,7,10,0.72) 24%, rgba(6,7,10,0.08) 52%, rgba(6,7,10,0.35) 100%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmarkUri}
          height={30}
          style={{ position: "absolute", top: 46, left: 58 }}
        />
        <div
          style={{
            position: "absolute",
            left: 58,
            bottom: 60,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 860,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Barlow Condensed",
              fontWeight: 600,
              fontSize: 54,
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              color: "#E8E4DC",
              gap: "0.28em",
            }}
          >
            {headline.split(" ").map((word) => (
              <div key={word} style={{ display: "flex" }}>
                {word}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: 20,
              color: "#8B94A3",
            }}
          >
            {subline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 58,
            bottom: 64,
            display: "flex",
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.16em",
            color: "#C9A96E",
          }}
        >
          {label}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Barlow Condensed", data: barlow, weight: 600, style: "normal" },
        { name: "Manrope", data: manropeMedium, weight: 500, style: "normal" },
        { name: "Manrope", data: manropeSemibold, weight: 600, style: "normal" },
      ],
    }
  );
}
