"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LearningPath } from "@/components/LearningPath";
import { OutLink } from "@/components/OutLink";
import { CheckBars, StudyStrip, type StudyRow } from "@/components/StudyStrip";
import { Icon, type IconName } from "@/components/ui/Icon";
import { openSearch } from "@/lib/nina";
import { stages, type PathLesson } from "@/lib/path";
import { clearStudy, hasProgress, setNickname } from "@/lib/progress";
import { links, reviewed } from "@/lib/site";
import { daypartFor, greetings, useMinute, useStudy, WEEK_MS } from "@/lib/useStudy";

export function DeskView({
  lessons,
  rows,
  featured,
}: {
  lessons: PathLesson[];
  rows: StudyRow[];
  featured: string[];
}) {
  const study = useStudy();
  const minute = useMinute();
  const [confirmClear, setConfirmClear] = useState(false);
  const [saved, setSaved] = useState(false);

  const daypart = daypartFor(minute);
  const greeting = daypart ? greetings[daypart] : null;
  const returning = hasProgress(study);
  const readCount = lessons.filter((lesson) => lesson.slug in study.lessons).length;
  const weekAgo = minute === null ? Infinity : minute * 60_000 - WEEK_MS;
  const thisWeek = Object.values(study.lessons).filter((at) => at > 0 && at >= weekAgo).length;
  const nextIndex = lessons.findIndex((lesson) => !(lesson.slug in study.lessons));
  const next = nextIndex === -1 ? undefined : lessons[nextIndex];
  const currentStage = next ? stages.find((stage) => stage.lessons.includes(next.slug)) : undefined;

  const byTicker = new Map(rows.map((row) => [row.ticker, row]));
  const recentRows = study.recent.map((ticker) => byTicker.get(ticker)).filter((row) => row !== undefined);
  const stripRows = (recentRows.length > 0 ? recentRows : featured.map((ticker) => byTicker.get(ticker)).filter((row) => row !== undefined)).slice(0, 4);
  const quizLessons = lessons.filter((lesson) => study.quiz[lesson.slug]);
  const quizTarget = next ?? lessons[lessons.length - 1];

  const actions: { icon: IconName; label: string; href?: string; onClick?: () => void }[] = [
    { icon: "book", label: next ? "Continue lesson" : "Review lessons", href: next ? `/learn/${next.slug}` : "/learn" },
    { icon: "search", label: "Search notes", onClick: openSearch },
    { icon: "type", label: "Glossary", href: "/glossary" },
    { icon: "quiz", label: "Take a quiz", href: `/learn/${quizTarget.slug}#quiz` },
  ];

  function onSaveName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("nickname");
    setNickname(typeof value === "string" ? value : "");
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-8 sm:px-8 sm:pt-12">
      {/* The Habari panel */}
      <section className="glass relative overflow-hidden rounded-4xl" aria-labelledby="desk-greeting">
        <div
          className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-10 px-6 pt-10 pb-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="min-w-0">
            <h1 id="desk-greeting" className="greeting text-[clamp(2rem,3.3vw,2.85rem)]">
              <span className="block text-gold">
                {greeting ? greeting.swahili : "Habari"}
                {study.nickname ? `, ${study.nickname}` : ""}.
              </span>
              <span className="block text-steel">
                {returning ? "Welcome back to your desk." : "Karibu. This is your desk."}
              </span>
            </h1>
            <p className="mt-4 text-muted">
              {greeting ? `${greeting.english}. ` : ""}Your Swath study path
            </p>

            <div className="mt-10">
              <p className="text-sm text-muted">Lessons read on this device</p>
              <p className="mt-2 font-display text-6xl leading-none font-medium tracking-tight tabular-nums sm:text-7xl">
                {readCount}
                <span className="ml-2 text-2xl font-normal tracking-normal text-muted">of {lessons.length}</span>
              </p>
              <p className="mt-4">
                {thisWeek > 0 ? (
                  <span className="chip chip-ice">
                    +{thisWeek} {thisWeek === 1 ? "lesson" : "lessons"} this week
                  </span>
                ) : readCount === lessons.length ? (
                  <span className="chip chip-mint">Path complete</span>
                ) : (
                  <span className="chip chip-ice">{readCount === 0 ? "Start with lesson 1" : "Pick up where you stopped"}</span>
                )}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="px-2 pt-8 pb-6 sm:px-4">
              <LearningPath lessons={lessons} />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-1.5" aria-label="Path stages">
                {stages.map((stage) => (
                  <li
                    key={stage.id}
                    className={`rounded-full px-3 py-1 text-xs ${
                      stage.id === currentStage?.id ? "bg-ice/12 text-ice" : "text-muted"
                    }`}
                    aria-current={stage.id === currentStage?.id ? "step" : undefined}
                  >
                    {stage.label}
                  </li>
                ))}
              </ul>
              <Link href="/learn" className="inline-flex items-center gap-1 text-sm text-gold hover:underline">
                Open the full path
                <Icon name="arrowUpRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-hair px-6 pt-6 pb-2 sm:px-10">
          <p className="eyebrow text-faint!">{recentRows.length > 0 ? "Your study names" : "Suggested study names"}</p>
        </div>
        <div className="relative px-4 pb-4 sm:px-8">
          <StudyStrip rows={stripRows} />
        </div>

        <div className="relative flex items-center gap-4 border-t border-hair px-6 py-5 sm:px-10">
          <span className="relative h-px flex-1 bg-gradient-to-r from-ice/10 to-gold/70" aria-hidden="true">
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_#e9b872]" />
          </span>
          {next ? (
            <Link href={`/learn/${next.slug}`} className="group text-right text-sm leading-snug">
              <span className="text-muted">Next up · </span>
              <span className="font-medium text-fg group-hover:text-ice">
                Lesson {nextIndex + 1} · {next.title}
              </span>
              <span className="block text-xs text-faint">{next.minutes} min read</span>
            </Link>
          ) : (
            <p className="text-right text-sm text-mint">All eight lessons read. Try a company&apos;s three checks next.</p>
          )}
        </div>
      </section>

      {/* Working cards */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:items-start">
        <section className="panel rounded-3xl p-6" aria-labelledby="actions-title">
          <h2 id="actions-title" className="font-display font-semibold">
            Quick actions
          </h2>
          <ul className="mt-5 grid grid-cols-4 gap-2">
            {actions.map((action) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-hair-strong text-ice transition-colors group-hover:border-ice/60 group-hover:bg-ice/10">
                    <Icon name={action.icon} />
                  </span>
                  <span className="text-center text-xs leading-tight text-muted group-hover:text-fg">{action.label}</span>
                </>
              );
              return (
                <li key={action.label}>
                  {action.href ? (
                    <Link href={action.href} className="group flex flex-col items-center gap-2 rounded-2xl py-2">
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={action.onClick}
                      className="group flex w-full flex-col items-center gap-2 rounded-2xl py-2"
                    >
                      {inner}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="panel rounded-3xl p-6" aria-labelledby="fresh-title">
          <h2 id="fresh-title" className="font-display font-semibold">
            Notes freshness
          </h2>
          <p className="mt-1 text-xs text-faint">Where the mockup showed a live index</p>
          <p className="mt-5 font-display text-2xl font-semibold tracking-tight">{reviewed}</p>
          <p className="mt-1 text-sm text-muted">Last review of every Swath note</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            For today&apos;s index and prices, use the exchange itself and note its timestamp:{" "}
            <OutLink href={links.nse}>nse.co.ke</OutLink>
          </p>
        </section>

        <section className="panel rounded-3xl p-6" aria-labelledby="quiz-results-title">
          <h2 id="quiz-results-title" className="font-display font-semibold">
            Quiz results
          </h2>
          {quizLessons.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-muted">
              No quizzes finished yet. Each lesson ends with three questions.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-hair">
              {quizLessons.map((lesson) => {
                const result = study.quiz[lesson.slug];
                const full = result.correct === result.total;
                return (
                  <li key={lesson.slug} className="flex items-center justify-between gap-3 py-2.5">
                    <Link href={`/learn/${lesson.slug}#quiz`} className="min-w-0 truncate text-sm text-soft hover:text-ice">
                      {lesson.title}
                    </Link>
                    <span className={`chip tabular-nums ${full ? "chip-mint" : ""}`}>
                      {result.correct}/{result.total}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="panel rounded-3xl p-6 lg:col-span-2" aria-labelledby="shelf-title">
          <div className="flex items-center justify-between gap-3">
            <h2 id="shelf-title" className="font-display font-semibold">
              Your shelf
            </h2>
            <Link href="/companies" className="text-sm text-ice hover:underline">
              Browse companies
            </Link>
          </div>
          {recentRows.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Companies you open will collect here with their check progress. Try{" "}
              <Link href="/companies/scom" className="link">
                Safaricom
              </Link>{" "}
              first.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-hair">
              {recentRows.map((row) => {
                const done = study.checks[row.ticker]?.length ?? 0;
                return (
                  <li key={row.ticker}>
                    <Link
                      href={`/companies/${row.ticker.toLowerCase()}`}
                      className="group grid grid-cols-[auto_1fr_5rem] items-center gap-4 py-3"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-hair-strong font-mono text-[0.65rem] text-ice">
                        {row.ticker.slice(0, 4)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-fg group-hover:text-ice">{row.name}</span>
                        <span className="block truncate text-xs text-faint">
                          {row.ticker} · {row.segment}
                          {row.sector ? ` · ${row.sector}` : ""}
                        </span>
                      </span>
                      <CheckBars done={done} label={false} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="panel rounded-3xl p-6" aria-labelledby="device-title">
          <h2 id="device-title" className="font-display font-semibold">
            On this device
          </h2>
          <form className="mt-4" onSubmit={onSaveName}>
            <label htmlFor="nickname" className="text-sm text-muted">
              What should the greeting call you?
            </label>
            <div className="mt-2 flex gap-2">
              <input
                key={study.nickname}
                id="nickname"
                name="nickname"
                defaultValue={study.nickname}
                maxLength={24}
                placeholder="Optional nickname"
                autoComplete="nickname"
                className="field h-11!"
                onChange={() => setSaved(false)}
              />
              <button type="submit" className="btn btn-ghost btn-sm h-11! shrink-0">
                Save
              </button>
            </div>
            <p className="mt-2 text-xs text-faint" aria-live="polite">
              {saved ? "Saved in this browser." : "Kept in this browser only. Never sent anywhere."}
            </p>
          </form>
          <div className="mt-6 border-t border-hair pt-5">
            {confirmClear ? (
              <div className="space-y-3">
                <p className="text-sm text-soft">Clear all progress, checks, quiz results and your nickname?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm border-coral/50 text-coral hover:bg-coral/10"
                    onClick={() => {
                      clearStudy();
                      setConfirmClear(false);
                      setSaved(false);
                    }}
                  >
                    Yes, clear it
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(false)}>
                    Keep it
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-coral disabled:opacity-40"
                onClick={() => setConfirmClear(true)}
                disabled={!returning && !study.nickname}
              >
                <Icon name="reset" className="h-4 w-4" />
                Clear this device
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
