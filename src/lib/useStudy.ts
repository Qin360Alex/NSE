"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseStudy, readStudyRaw, subscribeStudy, type StudyState } from "./progress";

/** The learner's progress on this device. Renders as empty on the server. */
export function useStudy(): StudyState {
  const raw = useSyncExternalStore(subscribeStudy, readStudyRaw, () => "");
  return useMemo(() => parseStudy(raw), [raw]);
}

function subscribeNothing() {
  return () => {};
}

/** False during server render and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

function subscribeMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

function currentMinute() {
  return Math.floor(Date.now() / 60_000);
}

/** The current minute since the epoch, or null on the server. */
export function useMinute(): number | null {
  return useSyncExternalStore(subscribeMinute, currentMinute, () => null);
}

export type Daypart = "morning" | "afternoon" | "evening";

export function daypartFor(minute: number | null): Daypart | null {
  if (minute === null) return null;
  const hour = new Date(minute * 60_000).getHours();
  if (hour >= 4 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

export const greetings: Record<Daypart, { swahili: string; english: string }> = {
  morning: { swahili: "Habari za asubuhi", english: "Good morning" },
  afternoon: { swahili: "Habari za mchana", english: "Good afternoon" },
  evening: { swahili: "Habari za jioni", english: "Good evening" },
};

export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
