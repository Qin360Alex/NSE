/* The eight lessons grouped into four stages of the learning path. */

export type StageId = "basics" | "markets" | "companies" | "habits";

export type Stage = {
  id: StageId;
  label: string;
  blurb: string;
  lessons: string[];
};

export const stages: Stage[] = [
  {
    id: "basics",
    label: "Basics",
    blurb: "What the exchange is, and who does what around it.",
    lessons: ["the-nse-in-one-sitting", "who-does-what"],
  },
  {
    id: "markets",
    label: "Markets",
    blurb: "The shelves, what a share pays, and where your holding is recorded.",
    lessons: ["market-segments", "shares-and-dividends", "the-cds-account"],
  },
  {
    id: "companies",
    label: "Companies",
    blurb: "Reading one listed company from its own documents.",
    lessons: ["how-to-study-a-company"],
  },
  {
    id: "habits",
    label: "Habits",
    blurb: "Risk, and telling a fact from an opinion.",
    lessons: ["what-can-go-wrong", "facts-and-opinions"],
  },
];

export function stageFor(slug: string): Stage | undefined {
  return stages.find((stage) => stage.lessons.includes(slug));
}

export type PathLesson = {
  slug: string;
  title: string;
  minutes: number;
};
