"use client";

import Link from "next/link";
import { useId } from "react";
import type { PathLesson } from "@/lib/path";
import { useStudy } from "@/lib/useStudy";

/*
  The glow line from the Habari mockup, given a true meaning:
  one node per lesson, rising from ice blue (start) into morning gold (finish).
  Read lessons glow; the next lesson pulses gold; the rest wait as hollow rings.
*/

const W = 560;
const H = 240;
const PAD_X = 26;

type Point = { x: number; y: number };

function pointsFor(count: number): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0 : index / (count - 1);
    const wobble = index === 0 || index === count - 1 ? 0 : index % 2 === 1 ? 16 : -4;
    return {
      x: PAD_X + t * (W - PAD_X * 2),
      y: 206 - t * 176 + wobble,
    };
  });
}

function segment(points: Point[], index: number) {
  const p0 = points[Math.max(index - 1, 0)];
  const p1 = points[index];
  const p2 = points[index + 1];
  const p3 = points[Math.min(index + 2, points.length - 1)];
  const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
  const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
  return `C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

function curve(points: Point[], from: number, to: number) {
  if (to <= from) return "";
  let d = `M${points[from].x.toFixed(1)} ${points[from].y.toFixed(1)}`;
  for (let index = from; index < to; index += 1) d += segment(points, index);
  return d;
}

export function LearningPath({ lessons, className = "" }: { lessons: PathLesson[]; className?: string }) {
  const study = useStudy();
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const points = pointsFor(lessons.length);
  const nextIndex = lessons.findIndex((lesson) => !(lesson.slug in study.lessons));
  const doneTo = nextIndex === -1 ? lessons.length - 1 : nextIndex;
  const full = curve(points, 0, lessons.length - 1);
  const done = curve(points, 0, doneTo);
  const last = points[points.length - 1];
  const first = points[0];

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}-line`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0" stopColor="#a8dbff" />
            <stop offset="0.55" stopColor="#a8dbff" />
            <stop offset="1" stopColor="#e9b872" />
          </linearGradient>
          <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a8dbff" stopOpacity="0.13" />
            <stop offset="1" stopColor="#a8dbff" stopOpacity="0" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g className="stroke-ice" strokeOpacity="0.07">
          <line x1="0" y1="60" x2={W} y2="60" />
          <line x1="0" y1="120" x2={W} y2="120" />
          <line x1="0" y1="180" x2={W} y2="180" />
        </g>
        <path d={`${full}L${last.x} ${H}L${first.x} ${H}Z`} fill={`url(#${id}-area)`} />
        <path
          d={full}
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeOpacity="0.32"
          strokeWidth="2"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />
        {done ? (
          <g key={done}>
            <path
              d={done}
              pathLength={1}
              className="draw"
              fill="none"
              stroke={`url(#${id}-line)`}
              strokeWidth="10"
              strokeOpacity="0.5"
              filter={`url(#${id}-glow)`}
            />
            <path
              d={done}
              pathLength={1}
              className="draw"
              fill="none"
              stroke={`url(#${id}-line)`}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ) : null}
      </svg>
      <ol className="absolute inset-0" aria-label="Learning path">
        {lessons.map((lesson, index) => {
          const point = points[index];
          const state = lesson.slug in study.lessons ? "done" : index === nextIndex ? "next" : "todo";
          const status = state === "done" ? "read" : state === "next" ? "next up" : "not started";
          return (
            <li key={lesson.slug}>
              <Link
                href={`/learn/${lesson.slug}`}
                className="path-node"
                data-state={state}
                style={{ left: `${(point.x / W) * 100}%`, top: `${(point.y / H) * 100}%` }}
                aria-label={`Lesson ${index + 1}: ${lesson.title}, ${status}`}
              >
                {state === "next" ? <span className="path-halo" aria-hidden="true" /> : null}
                <span className="path-dot" data-state={state} aria-hidden="true" />
                <span className="path-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="path-tip"
                  data-align={index < lessons.length / 2 ? "start" : "end"}
                  aria-hidden="true"
                >
                  {lesson.title} · {lesson.minutes} min
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
