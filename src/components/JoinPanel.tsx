"use client";

import { useEffect, useRef, useState } from "react";

type JoinResult = {
  position: number;
  inviteCode: string;
  invitesUsed: number;
};

const EMAIL_STORAGE_KEY = "atrum_waitlist_email";
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "atrum.fun";

async function submitJoin(email: string, ref: string | null): Promise<JoinResult> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, ref }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Something went wrong");
  return data as JoinResult;
}

export default function JoinPanel() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JoinResult | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore a returning visitor's seat without making them re-type their email.
  useEffect(() => {
    const saved = window.localStorage.getItem(EMAIL_STORAGE_KEY);
    if (!saved) return;
    submitJoin(saved, null)
      .then((r) => setResult(r))
      .catch(() => {});
  }, []);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || pending) return;
    setPending(true);
    setError(null);
    const ref = new URLSearchParams(window.location.search).get("ref");
    try {
      const r = await submitJoin(email, ref);
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email);
      setResult(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  };

  if (result) {
    const inviteLink = `${SITE_ORIGIN}/oath/${result.inviteCode}`;
    const shareHref =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(
        "I took the oath. ATRUM — private prediction markets. " + inviteLink
      );
    const inviteW = Math.round((result.invitesUsed / 3) * 100) + "%";

    const handleCopy = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(inviteLink).catch(() => {});
      }
      setCopied(true);
      copyTimeout.current = setTimeout(() => setCopied(false), 1800);
    };

    return (
      <div
        style={{
          border: "1px solid #2B2E31",
          background: "rgba(17,18,20,.68)",
          backdropFilter: "blur(16px)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          textAlign: "left",
          animation: "atr-rise .5s ease both",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1,
              color: "#F7F2E8",
            }}
          >
            #{result.position.toLocaleString("en-US")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-manrope)",
              fontWeight: 500,
              fontSize: 9.5,
              letterSpacing: ".2em",
              color: "#8E9296",
              textTransform: "uppercase",
            }}
          >
            Sealed in the ledger
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ height: 1, background: "#2B2E31" }}>
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg,#3F4043,#FFF5D8)",
                boxShadow: "0 0 10px rgba(255,245,216,.5)",
                width: inviteW,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-manrope)",
              fontWeight: 500,
              fontSize: 9.5,
              letterSpacing: ".18em",
              color: "#6E7276",
              textTransform: "uppercase",
            }}
          >
            <span>{result.invitesUsed} / 3 initiates</span>
            <span>+100 places</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <code
            style={{
              flex: 1,
              minWidth: 180,
              padding: "13px 15px",
              background: "#080A0C",
              border: "1px solid #2B2E31",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11.5,
              color: "#ECE7DA",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {inviteLink}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="atr-btn-outline"
            style={{
              padding: "13px 18px",
              background: "transparent",
              border: "1px solid #3F4043",
              color: "#ECE7DA",
              fontFamily: "var(--font-manrope)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href={shareHref}
            target="_blank"
            rel="noopener"
            className="atr-btn-outline"
            style={{
              padding: "13px 18px",
              border: "1px solid #3F4043",
              fontFamily: "var(--font-manrope)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
            }}
          >
            Post it
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input
          type="email"
          required
          placeholder="you@ciphered.mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="atr-input"
          style={{
            flex: 1,
            minWidth: 210,
            padding: "16px 18px",
            background: "rgba(17,18,20,.62)",
            border: "1px solid #2B2E31",
            color: "#ECE7DA",
            fontSize: 14,
            outline: "none",
            backdropFilter: "blur(12px)",
            transition: "all .2s",
          }}
        />
        <button
          type="submit"
          disabled={pending}
          className="atr-btn-primary"
          style={{
            padding: "16px 28px",
            background: "linear-gradient(168deg,#FFFFFF,#F7F2E8 34%,#C8CCD0 62%,#F7F2E8)",
            color: "#080A0C",
            border: "none",
            fontFamily: "var(--font-manrope)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            cursor: pending ? "default" : "pointer",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? "Sealing…" : "Take the oath"}
        </button>
      </form>
      <div
        style={{
          fontFamily: "var(--font-manrope)",
          fontWeight: 500,
          fontSize: 9.5,
          letterSpacing: ".18em",
          color: error ? "#E0A458" : "#6E7276",
          textTransform: "uppercase",
        }}
      >
        {error ?? "Invite-only at launch · first 500 pay no settlement fee"}
      </div>
    </>
  );
}
