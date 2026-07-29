import BootOverlay from "@/components/BootOverlay";
import Hero from "@/components/Hero";
import ThreeLaws from "@/components/ThreeLaws";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { getRecentFeed, getWaitlistStats } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const BASE_COUNT = Number(process.env.WAITLIST_BASE_COUNT ?? 0);

export default async function Home() {
  const [stats, feed] = await Promise.all([
    getWaitlistStats().catch((err) => {
      console.error("[page] waitlist stats unavailable:", err.message);
      return { count: 0, displayCount: BASE_COUNT };
    }),
    getRecentFeed(2).catch((err) => {
      console.error("[page] waitlist feed unavailable:", err.message);
      return [];
    }),
  ]);

  return (
    <div
      style={{
        background: "#080A0C",
        color: "#ECE7DA",
        fontFamily: "var(--font-manrope)",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <BootOverlay />
      <Hero initialFeed={feed} />
      <ThreeLaws />
      <CtaBanner countLabel={stats.displayCount.toLocaleString("en-US")} />
      <Footer />
    </div>
  );
}
