const KEY = "swath.completedLessons";

export function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function writeCompleted(slugs: string[]) {
  localStorage.setItem(KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event("swath-progress"));
}

export function toggleCompleted(slug: string) {
  const current = loadCompleted();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
  writeCompleted(next);
  return next.includes(slug);
}
