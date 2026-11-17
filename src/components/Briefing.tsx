"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const chapters = [
  {
    kicker: "The marketplace",
    title: "Where a listed share changes hands",
    body: "The Nairobi Securities Exchange is where listed securities in Kenya are bought and sold. A company lists shares. Investors trade them through licensed brokers. The price is whatever buyers and sellers agree that day. Swath will not show you one, because a price without the exchange's own time and date is how people get misled.",
  },
  {
    kicker: "The referee",
    title: "The CMA is not the NSE",
    body: "The Capital Markets Authority regulates this market. It licenses intermediaries and can punish abuse. The NSE runs the marketplace inside that framework. They are different institutions. The exchange is also a listed company. That does not make it the regulator, and it does not mean it endorses this site.",
  },
  {
    kicker: "The record",
    title: "A CDS account is the electronic holding",
    body: "The Central Depository and Settlement Corporation keeps the electronic record of who holds listed shares. That record sits in a CDS account, opened through a licensed Central Depository Agent. A trade is not finished when the order is placed. The record still has to change hands under the published settlement rules.",
  },
  {
    kicker: "How to use this desk",
    title: "One market, then one company",
    body: "Read who does what. Open one market segment. Study a single company with the three checks on its card. If a sentence here and a sentence on nse.co.ke disagree, believe the NSE page, and read the date on it. Search looks through these notes only. It will not tell you what to buy.",
  },
];

function motionAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Briefing() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const chapter = chapters[index];

  useEffect(() => {
    if (!playing) return;
    if (!motionAllowed()) return;
    const timer = window.setTimeout(() => {
      if (index >= chapters.length - 1) {
        setPlaying(false);
        return;
      }
      setIndex(index + 1);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [playing, index]);

  function go(next: number) {
    setIndex(Math.min(Math.max(next, 0), chapters.length - 1));
  }

  return (
    <section id="briefing" aria-labelledby="briefing-title" className="scroll-mt-24 rounded-[2rem] bg-pine p-5 text-white sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">One-minute briefing</p>
        <p className="text-xs text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
        </p>
      </div>
      <h2 id="briefing-title" className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">
        The NSE in one minute
      </h2>
      <div aria-live="polite" className="mt-6 min-h-40">
        <p className="text-sm font-semibold text-gold">{chapter.kicker}</p>
        <p className="mt-2 font-serif text-2xl leading-snug">{chapter.title}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">{chapter.body}</p>
      </div>
      <div className="mt-6 flex gap-2" aria-hidden="true">
        {chapters.map((item, itemIndex) => (
          <span
            key={item.kicker}
            className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-gold" : "bg-white/20"}`}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex h-12 items-center rounded-full bg-gold px-5 text-sm font-semibold text-goldink"
          onClick={() => {
            if (!motionAllowed()) {
              go(index >= chapters.length - 1 ? 0 : index + 1);
              return;
            }
            if (index === chapters.length - 1 && !playing) {
              setIndex(0);
            }
            setPlaying((value) => !value);
          }}
        >
          {playing ? "Pause" : "Play briefing"}
        </button>
        <button
          type="button"
          className="inline-flex h-12 items-center rounded-full border border-white/25 px-4 text-sm font-semibold disabled:opacity-40"
          onClick={() => {
            setPlaying(false);
            go(index - 1);
          }}
          disabled={index === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="inline-flex h-12 items-center rounded-full border border-white/25 px-4 text-sm font-semibold disabled:opacity-40"
          onClick={() => {
            setPlaying(false);
            go(index + 1);
          }}
          disabled={index === chapters.length - 1}
        >
          Next
        </button>
        <Link href="/markets" className="inline-flex h-12 items-center text-sm font-semibold text-gold">
          Continue to the markets
        </Link>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-white/60">
        A filmed version can replace this frame. The words are the lesson either way, so the briefing stays readable with the sound off.
      </p>
    </section>
  );
}
