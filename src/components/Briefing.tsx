"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const CHAPTER_SECONDS = 9;

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
  const last = chapters.length - 1;

  function go(next: number) {
    setIndex(Math.min(Math.max(next, 0), last));
  }

  function onChapterEnd() {
    if (index >= last) {
      setPlaying(false);
      return;
    }
    setIndex(index + 1);
  }

  function togglePlay() {
    if (!motionAllowed()) {
      go(index >= last ? 0 : index + 1);
      return;
    }
    if (!playing && index === last) setIndex(0);
    setPlaying((value) => !value);
  }

  return (
    <section
      id="briefing"
      aria-labelledby="briefing-title"
      className="lit relative overflow-hidden rounded-4xl p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">One-minute briefing</p>
        <p className="font-mono text-xs text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
        </p>
      </div>
      <h2 id="briefing-title" className="sr-only">
        The NSE in one minute
      </h2>

      <div aria-live="polite" className="mt-8 min-h-62 sm:min-h-54">
        <div key={index} className="fade-up">
          <p className="text-sm font-medium text-gold">{chapter.kicker}</p>
          <p className="mt-2 font-display text-[1.65rem] leading-tight font-semibold tracking-tight sm:text-3xl">
            {chapter.title}
          </p>
          <p className="mt-4 max-w-xl text-[0.97rem] leading-relaxed text-soft">{chapter.body}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden="true">
        {chapters.map((item, itemIndex) => (
          <span key={item.kicker} className="h-1 overflow-hidden rounded-full bg-white/10">
            {itemIndex < index ? (
              <span className="briefing-fill w-full! animate-none!" />
            ) : itemIndex === index ? (
              <span
                key={`fill-${index}`}
                className="briefing-fill"
                style={{
                  animationDuration: `${CHAPTER_SECONDS}s`,
                  animationPlayState: playing ? "running" : "paused",
                }}
                onAnimationEnd={onChapterEnd}
              />
            ) : null}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="grid h-14 w-14 place-items-center rounded-full bg-ice text-ink shadow-[0_0_0_1px_rgb(168_219_255/0.45),0_10px_32px_-8px_rgb(111_189_242/0.7)] transition-transform hover:scale-105"
          aria-label={playing ? "Pause briefing" : "Play briefing"}
        >
          <Icon name={playing ? "pause" : "play"} className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Previous chapter"
          onClick={() => {
            setPlaying(false);
            go(index - 1);
          }}
          disabled={index === 0}
        >
          <Icon name="chevronLeft" />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Next chapter"
          onClick={() => {
            setPlaying(false);
            go(index + 1);
          }}
          disabled={index === last}
        >
          <Icon name="chevronRight" />
        </button>
        <Link href="/markets" className="btn btn-quiet ml-auto">
          Continue to the markets
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Chapters">
        {chapters.map((item, itemIndex) => (
          <li key={item.kicker}>
            <button
              type="button"
              aria-current={itemIndex === index ? "step" : undefined}
              onClick={() => {
                setPlaying(false);
                go(itemIndex);
              }}
              className={`chip transition-colors ${itemIndex === index ? "chip-ice" : "hover:text-fg"}`}
            >
              {item.kicker}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs leading-relaxed text-faint">
        The words are the lesson, so the briefing reads fine with the sound off. A filmed version can replace this frame
        later.
      </p>
    </section>
  );
}
