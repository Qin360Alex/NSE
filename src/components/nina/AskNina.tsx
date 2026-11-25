"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { OutLink } from "@/components/OutLink";
import { Icon } from "@/components/ui/Icon";
import { NoteStamp } from "@/components/ui/SourceStamp";
import { ASK_EVENT, askNina, ninaSuggestions, type NinaReply } from "@/lib/nina";
import { links } from "@/lib/site";

type Turn = { id: number; question: string; reply: NinaReply };

function NinaAvatar({ size = "h-9 w-9" }: { size?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-nina text-nina-ink shadow-[0_0_20px_rgb(199_181_247/0.5)]`}
      aria-hidden="true"
    >
      <Icon name="sparkle" className="h-[55%] w-[55%]" />
    </span>
  );
}

function Reply({ reply, onClose }: { reply: NinaReply; onClose: () => void }) {
  if (reply.kind === "advice") {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-soft">
        <p>
          I can&apos;t tell you what to buy, sell, or hold, or what a price will do. Nobody on Swath can, and that is on
          purpose. A licensed adviser can talk about your own situation.
        </p>
        <p>What I can do is help you learn to judge a company yourself:</p>
        <ul className="space-y-1.5">
          <li>
            <Link className="link" href="/learn/how-to-study-a-company" onClick={onClose}>
              How to study a company
            </Link>
          </li>
          <li>
            <Link className="link" href="/learn/what-can-go-wrong" onClick={onClose}>
              What can go wrong
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  if (reply.kind === "price") {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-soft">
        <p>
          Swath doesn&apos;t show share prices. A price without the exchange&apos;s own date and time can mislead. For
          today&apos;s figures, use the NSE website or a licensed broker, and note the timestamp.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <OutLink href={links.nse}>Nairobi Securities Exchange</OutLink>
          <Link className="link" href="/learn/facts-and-opinions" onClick={onClose}>
            Facts, calculations, and opinions
          </Link>
        </p>
      </div>
    );
  }

  if (reply.kind === "empty") {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-soft">
        <p>
          I couldn&apos;t find that in Swath&apos;s notes yet. I only answer from these notes, so I won&apos;t guess.
        </p>
        <p>
          Try a simpler word such as <em>dividend</em>, <em>CDS</em>, or a ticker such as <em>SCOM</em>, or browse the{" "}
          <Link className="link" href="/glossary" onClick={onClose}>
            glossary
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-soft">Here is what Swath&apos;s notes say.</p>
      <ul className="space-y-2.5">
        {reply.hits.map(({ hit, snippet }) => (
          <li key={hit.href} className="rounded-2xl border border-hair bg-night/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={hit.href}
                onClick={onClose}
                className="min-w-0 truncate font-display font-semibold text-fg hover:text-ice"
              >
                {hit.title}
              </Link>
              <span className="shrink-0 font-mono text-[0.7rem] text-ice">{hit.kicker}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">&ldquo;{snippet}&rdquo;</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <NoteStamp label={hit.group} />
              <Link href={hit.href} onClick={onClose} className="inline-flex items-center gap-1 text-xs font-medium text-ice">
                Open note
                <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-faint">
        Read the note in full, then check the official source it cites.
      </p>
    </div>
  );
}

export function AskNina() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  function ask(question: string) {
    const clean = question.trim();
    if (!clean) return;
    const id = nextId.current;
    nextId.current += 1;
    setTurns((current) => [...current, { id, question: clean, reply: askNina(clean) }]);
    setDraft("");
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    function onAsk(event: Event) {
      const question = (event as CustomEvent<{ question?: string }>).detail?.question;
      setOpen(true);
      if (question) {
        const id = nextId.current;
        nextId.current += 1;
        setTurns((current) => [...current, { id, question, reply: askNina(question) }]);
      }
    }
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: "smooth" });
  }, [turns.length, open]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(draft);
  }

  return (
    <div className="no-print">
      {!open ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="btn btn-nina fixed right-4 z-40 h-12 bottom-[calc(env(safe-area-inset-bottom,0px)+88px)] sm:right-6 lg:bottom-6"
          aria-haspopup="dialog"
        >
          <Icon name="sparkle" className="h-4 w-4" />
          Ask Nina
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="overlay-in absolute inset-0 bg-night/60 backdrop-blur-[2px]" onMouseDown={close} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="nina-panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col"
          >
            <div className="flex items-center gap-3 border-b border-nina/20 px-5 py-4">
              <NinaAvatar />
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="font-display text-lg font-semibold text-fg">
                  Nina
                </h2>
                <p className="truncate text-xs text-muted">Study assistant · searches Swath&apos;s notes</p>
              </div>
              <button type="button" className="icon-btn" onClick={close} aria-label="Close Nina">
                <Icon name="close" />
              </button>
            </div>

            <div ref={threadRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite">
              <div className="flex gap-3">
                <NinaAvatar size="h-7 w-7" />
                <div className="nina-bubble min-w-0 flex-1 p-4 text-sm leading-relaxed text-soft">
                  <p>
                    Habari! I&apos;m Nina. Ask me about the NSE and I&apos;ll answer from Swath&apos;s own notes, with
                    the note each answer came from.
                  </p>
                  <p className="mt-2 text-muted">I won&apos;t give tips, forecasts, or prices.</p>
                </div>
              </div>

              {turns.length === 0 ? (
                <div>
                  <p className="eyebrow text-faint!">Try asking</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ninaSuggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          onClick={() => ask(suggestion)}
                          className="chip chip-nina text-left transition-colors hover:bg-nina/15"
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {turns.map((turn) => (
                <div key={turn.id} className="fade-up space-y-4">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-sm text-fg">
                      {turn.question}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <NinaAvatar size="h-7 w-7" />
                    <div className="nina-bubble min-w-0 flex-1 p-4">
                      <Reply reply={turn.reply} onClose={close} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-nina/20 px-5 pt-4"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
            >
              <label htmlFor="nina-input" className="sr-only">
                Ask Nina a question
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="nina-input"
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about the NSE…"
                  autoComplete="off"
                  maxLength={200}
                  className="field rounded-full! border-nina/30! focus:border-nina/70! focus:shadow-[0_0_0_4px_rgb(199_181_247/0.14)]!"
                />
                <button
                  type="submit"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-nina text-nina-ink transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  disabled={!draft.trim()}
                  aria-label="Send question"
                >
                  <Icon name="send" className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-faint">
                Nina searches Swath&apos;s notes only. AI answers are coming. Not investment advice.
              </p>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
