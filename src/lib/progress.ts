/*
  Study progress, stored only in this browser.
  v2 keeps lessons (with the time they were marked read), company checks,
  quiz results, recently opened companies, and an optional nickname.
  The v1 key (a plain list of lesson slugs) is migrated on first read.
*/

export type QuizResult = { correct: number; total: number; at: number };

export type StudyState = {
  lessons: Record<string, number>;
  checks: Record<string, number[]>;
  quiz: Record<string, QuizResult>;
  recent: string[];
  nickname: string;
};

const KEY = "swath.study.v2";
const LEGACY_KEY = "swath.completedLessons";
export const STUDY_EVENT = "swath-progress";
const MAX_RECENT = 8;
const MAX_NICKNAME = 24;

export const emptyStudy: StudyState = {
  lessons: {},
  checks: {},
  quiz: {},
  recent: [],
  nickname: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function migrateLegacy(raw: string): StudyState {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return emptyStudy;
    const lessons: Record<string, number> = {};
    for (const slug of parsed) {
      if (typeof slug === "string") lessons[slug] = 0;
    }
    return { ...emptyStudy, lessons };
  } catch {
    return emptyStudy;
  }
}

/** Raw snapshot string. Stable between calls while storage is unchanged. */
export function readStudyRaw(): string {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return raw;
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) return JSON.stringify(migrateLegacy(legacy));
    return "";
  } catch {
    return "";
  }
}

export function parseStudy(raw: string): StudyState {
  if (!raw) return emptyStudy;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return emptyStudy;

    const lessons: Record<string, number> = {};
    if (isRecord(data.lessons)) {
      for (const [slug, at] of Object.entries(data.lessons)) {
        if (typeof at === "number" && Number.isFinite(at)) lessons[slug] = at;
      }
    }

    const checks: Record<string, number[]> = {};
    if (isRecord(data.checks)) {
      for (const [ticker, list] of Object.entries(data.checks)) {
        if (Array.isArray(list)) {
          const clean = list.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < 10);
          if (clean.length > 0) checks[ticker] = Array.from(new Set(clean)).sort();
        }
      }
    }

    const quiz: Record<string, QuizResult> = {};
    if (isRecord(data.quiz)) {
      for (const [slug, result] of Object.entries(data.quiz)) {
        if (
          isRecord(result) &&
          typeof result.correct === "number" &&
          typeof result.total === "number" &&
          typeof result.at === "number"
        ) {
          quiz[slug] = { correct: result.correct, total: result.total, at: result.at };
        }
      }
    }

    const recent = Array.isArray(data.recent)
      ? data.recent.filter((item): item is string => typeof item === "string").slice(0, MAX_RECENT)
      : [];

    const nickname = typeof data.nickname === "string" ? data.nickname.slice(0, MAX_NICKNAME) : "";

    return { lessons, checks, quiz, recent, nickname };
  } catch {
    return emptyStudy;
  }
}

function write(state: StudyState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // Storage can be blocked (private mode, quota). Progress is a convenience, so fail quietly.
  }
  window.dispatchEvent(new Event(STUDY_EVENT));
}

function update(change: (state: StudyState) => StudyState) {
  write(change(parseStudy(readStudyRaw())));
}

export function subscribeStudy(onChange: () => void) {
  window.addEventListener(STUDY_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(STUDY_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function toggleLesson(slug: string) {
  update((state) => {
    const lessons = { ...state.lessons };
    if (slug in lessons) delete lessons[slug];
    else lessons[slug] = Date.now();
    return { ...state, lessons };
  });
}

export function toggleCheck(ticker: string, index: number) {
  update((state) => {
    const current = state.checks[ticker] ?? [];
    const next = current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index].sort();
    const checks = { ...state.checks };
    if (next.length === 0) delete checks[ticker];
    else checks[ticker] = next;
    return { ...state, checks };
  });
}

export function recordQuiz(slug: string, correct: number, total: number) {
  update((state) => ({
    ...state,
    quiz: { ...state.quiz, [slug]: { correct, total, at: Date.now() } },
  }));
}

export function recordVisit(ticker: string) {
  const state = parseStudy(readStudyRaw());
  if (state.recent[0] === ticker) return;
  write({
    ...state,
    recent: [ticker, ...state.recent.filter((item) => item !== ticker)].slice(0, MAX_RECENT),
  });
}

export function setNickname(name: string) {
  update((state) => ({ ...state, nickname: name.trim().slice(0, MAX_NICKNAME) }));
}

export function clearStudy() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // Nothing to clear if storage is blocked.
  }
  window.dispatchEvent(new Event(STUDY_EVENT));
}

export function hasProgress(state: StudyState) {
  return (
    Object.keys(state.lessons).length > 0 ||
    Object.keys(state.checks).length > 0 ||
    Object.keys(state.quiz).length > 0 ||
    state.recent.length > 0
  );
}
