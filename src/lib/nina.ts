/*
  Nina, phase 1: retrieval only.
  She answers from Swath's own notes, quotes the closest sentence, and links the note.
  She refuses advice and forecasts, and never prints a price.
*/
import { allHits, type SearchHit } from "./search";

export type NinaHit = { hit: SearchHit; snippet: string };

export type NinaReply =
  | { kind: "answer"; hits: NinaHit[] }
  | { kind: "advice" }
  | { kind: "price" }
  | { kind: "empty" };

const STOP = new Set([
  "a", "about", "an", "and", "any", "are", "as", "at", "be", "between", "by", "can", "could",
  "define", "definition", "describe", "difference", "do", "does", "explain", "for", "from", "get",
  "give", "has", "have", "how", "i", "if", "in", "into", "is", "it", "its", "kenya", "know", "me",
  "mean", "meaning", "means", "my", "of", "on", "or", "please", "should", "so", "tell",
  "that", "the", "their", "there", "these", "this", "those", "to", "vs", "versus", "was", "we",
  "what", "whats", "when", "where", "which", "who", "why", "will", "with", "work", "works", "would",
  "you", "your",
]);

const ADVICE = [
  /\bshould i\b/,
  /\brecommend/,
  /\bbest (stock|share|company|companies|investment|buy|pick)s?\b/,
  /\bwhich (stock|share|company|companies)s? (to|should|is best|are best)\b/,
  /\b(good|great|safe|bad) (buy|investment|stock|share)s?\b/,
  /\bworth (buying|it)\b/,
  /\bprice target/,
  /\b(predict|prediction|forecast)/,
  /\bwill (it|the|they|\w+) (rise|go up|fall|drop|grow|double|crash)\b/,
  /\b(hot|stock) tips?\b/,
  /\bmake (quick |easy |fast )?money\b/,
  /\bguarantee/,
];

const PRICE = [
  /\b(current|today'?s?|latest|live) (share |stock )?price/,
  /\bprice of\b/,
  /\bhow much (is|does|are) (a |one )?(share|stock|\w+ share)/,
  /\btrading at\b/,
];

function normalise(question: string) {
  return question.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function stem(word: string) {
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function termsOf(question: string) {
  return Array.from(
    new Set(
      normalise(question)
        .split(" ")
        .filter((word) => word.length > 1 && !STOP.has(word))
        .map(stem),
    ),
  );
}

function bestSentence(text: string, terms: string[]) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let best = sentences[0] ?? text;
  let bestScore = -1;
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    const score = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0), 0);
    if (score > bestScore) {
      best = sentence;
      bestScore = score;
    }
  }
  const clean = best.trim();
  return clean.length > 240 ? `${clean.slice(0, 237).trimEnd()}…` : clean;
}

export function askNina(question: string): NinaReply {
  const text = normalise(question);
  if (ADVICE.some((pattern) => pattern.test(text))) return { kind: "advice" };
  if (PRICE.some((pattern) => pattern.test(text))) return { kind: "price" };

  const terms = termsOf(question);
  // A question that names a note outright ("Explain who does what") finds it, even if every word is a stopword.
  const named = (hit: SearchHit) => {
    const title = normalise(hit.title);
    return title.length > 3 && ` ${text} `.includes(` ${title} `);
  };
  if (terms.length === 0 && !allHits.some(named)) return { kind: "empty" };

  const definitional = /^(what is|whats|what are|define|meaning of)\b/.test(text);
  const needed = terms.length === 0 ? 0 : Math.max(1, Math.ceil(terms.length / 2));

  const scored = allHits
    .map((hit) => {
      const title = `${hit.title} ${hit.kicker}`.toLowerCase();
      const hay = `${title} ${hit.text.toLowerCase()}`;
      const exact = named(hit);
      let matched = exact ? terms.length : 0;
      let score = exact ? 20 : 0;
      for (const term of exact ? [] : terms) {
        if (hay.includes(term)) {
          matched += 1;
          score += title.includes(term) ? 4 : 1;
        }
      }
      if (matched > 0 && definitional && hit.group === "Glossary") score += 2;
      if (matched > 0 && hit.kicker.toLowerCase() === terms[0]) score += 6;
      return { hit, matched, score };
    })
    .filter((item) => item.score > 0 && item.matched >= needed)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return { kind: "empty" };

  return {
    kind: "answer",
    hits: scored.map(({ hit }) => ({ hit, snippet: bestSentence(hit.text, terms) })),
  };
}

export const ninaSuggestions = [
  "What is a CDS account?",
  "Is the CMA the same as the NSE?",
  "How do dividends work?",
  "What is the Main segment?",
];

export const ASK_EVENT = "swath:ask";
export const SEARCH_EVENT = "swath:search";

export function openNina(question?: string) {
  window.dispatchEvent(new CustomEvent<{ question?: string }>(ASK_EVENT, { detail: { question } }));
}

export function openSearch() {
  window.dispatchEvent(new Event(SEARCH_EVENT));
}
