"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

export function Quiz({ questions }: { questions: Question[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState<boolean[]>(() => questions.map(() => false));

  return (
    <section className="mt-12 border-t border-line pt-8" aria-labelledby="quiz-title">
      <h2 id="quiz-title" className="font-serif text-3xl">Check yourself</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Three questions on this lesson. The point is to notice a distinction, not to collect a score.
      </p>
      <ol className="mt-8 space-y-8">
        {questions.map((question, questionIndex) => {
          const choice = picked[questionIndex];
          const isChecked = checked[questionIndex];
          return (
            <li key={question.prompt} className="rounded-3xl border border-line bg-white p-5 sm:p-6">
              <fieldset>
                <legend className="font-semibold leading-relaxed">
                  {questionIndex + 1}. {question.prompt}
                </legend>
                <div className="mt-4 space-y-2">
                  {question.choices.map((option, optionIndex) => {
                    const selected = choice === optionIndex;
                    const correct = optionIndex === question.answer;
                    let state = "border-line";
                    if (isChecked && correct) state = "border-green bg-foam";
                    else if (isChecked && selected && !correct) state = "border-gold bg-white";
                    else if (selected) state = "border-green";
                    return (
                      <label key={option} className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 ${state}`}>
                        <input
                          type="radio"
                          name={`q-${questionIndex}`}
                          className="mt-1"
                          checked={selected}
                          disabled={isChecked}
                          onChange={() => {
                            setPicked((current) => current.map((item, index) => (index === questionIndex ? optionIndex : item)));
                          }}
                        />
                        <span>
                          <span className="block">{option}</span>
                          {isChecked && correct ? (
                            <span className="mt-1 block text-sm font-semibold text-green">Correct</span>
                          ) : null}
                          {isChecked && selected && !correct ? (
                            <span className="mt-1 block text-sm font-semibold text-goldink">Not this one</span>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {isChecked ? <p className="mt-4 text-sm leading-relaxed text-muted">{question.why}</p> : null}
              <div className="mt-4 flex flex-wrap gap-3">
                {!isChecked ? (
                  <button
                    type="button"
                    className="inline-flex h-11 items-center rounded-full bg-green px-4 text-sm font-semibold text-white disabled:opacity-50"
                    disabled={choice === null}
                    onClick={() => {
                      setChecked((current) => current.map((item, index) => (index === questionIndex ? true : item)));
                    }}
                  >
                    Check answer
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
                    onClick={() => {
                      setPicked((current) => current.map((item, index) => (index === questionIndex ? null : item)));
                      setChecked((current) => current.map((item, index) => (index === questionIndex ? false : item)));
                    }}
                  >
                    Try again
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <noscript>
        <p className="mt-4 text-sm text-muted">The questions need JavaScript. The lesson text above stands on its own.</p>
      </noscript>
    </section>
  );
}
