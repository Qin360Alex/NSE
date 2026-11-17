export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type Source = {
  label: string;
  href: string;
};

export type Question = {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
};

export type SegmentId = "main" | "aims" | "gems" | "fixed-income";
