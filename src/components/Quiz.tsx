"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { recordQuiz } from "@/lib/progress";
import type { Question } from "@/lib/types";

const letters = ["A", "B", "C", "D", "E", "F"];

export function Quiz({ slug, questions }: { slug: string; questions: Question[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState<boolean[]>(() => questions.map(() => false));
  const answered = checked.filter(Boolean).length;
  const correct = questions.filter((question, index) => checked[index] && picked[index] === question.answer).length;

  function check(questionIndex: number) {
    const nextChecked = checked.map((item, index) => (index === questionIndex ? true : item));
    setChecked(nextChecked);
    if (nextChecked.every(Boolean)) {
      const score = questions.filter((question, index) => picked[index] === question.answer).length;
      recordQuiz(slug, score, questions.length);
    }
  }

  function reset(questionIndex: number) {
    setPicked((current) => current.map((item, index) => (index === questionIndex ? null : item)));
    setChecked((current) => current.map((item, index) => (index === questionIndex ? false : item)));
  }

  return (
    <section id="quiz" className="anchor mt-16" aria-labelledby="quiz-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Check yourself</p>
          <h2 id="quiz-title" className="mt-2 display-md">
            Three quick questions
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            The point is to notice a distinction, not to collect a score.
          </p>
        </div>
        <p className="chip tabular-nums" aria-live="polite">
          {answered === 0 ? `${questions.length} questions` : `${correct} of ${answered} correct`}
        </p>
      </div>
      <ol className="mt-8 space-y-5">
        {questions.map((question, questionIndex) => {
          const choice = picked[questionIndex];
          const isChecked = checked[questionIndex];
          const gotIt = isChecked && choice === question.answer;
          return (
            <li key={question.prompt} className="glass rounded-3xl p-5 sm:p-6">
              <fieldset>
                <legend className="flex gap-3 font-display text-lg leading-snug font-semibold text-fg">
                  <span className="font-mono text-sm leading-7 font-normal text-ice">0{questionIndex + 1}</span>
                  <span>{question.prompt}</span>
                </legend>
                <div className="mt-5 grid gap-2.5">
                  {question.choices.map((option, optionIndex) => {
                    const selected = choice === optionIndex;
                    const isAnswer = optionIndex === question.answer;
                    let state = "idle";
                    if (isChecked && isAnswer) state = "correct";
                    else if (isChecked && selected) state = "wrong";
                    else if (selected) state = "selected";
                    return (
                      <label key={option} className="quiz-option" data-state={state} data-locked={isChecked}>
                        <input
                          type="radio"
                          name={`q-${slug}-${questionIndex}`}
                          className="sr-only"
                          checked={selected}
                          disabled={isChecked}
                          onChange={() => {
                            setPicked((current) =>
                              current.map((item, index) => (index === questionIndex ? optionIndex : item)),
                            );
                          }}
                        />
                        <span className="quiz-letter" aria-hidden="true">
                          {state === "correct" ? (
                            <Icon name="check" className="h-4 w-4" />
                          ) : state === "wrong" ? (
                            <Icon name="close" className="h-3.5 w-3.5" />
                          ) : (
                            letters[optionIndex]
                          )}
                        </span>
                        <span className="pt-0.5 text-soft">
                          {option}
                          {state === "correct" ? <span className="sr-only"> (correct answer)</span> : null}
                          {state === "wrong" ? <span className="sr-only"> (your answer, not correct)</span> : null}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {isChecked ? (
                <div
                  className={`fade-up mt-5 flex gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed ${
                    gotIt ? "border-mint/30 bg-mint/6" : "border-coral/30 bg-coral/6"
                  }`}
                >
                  <Icon
                    name={gotIt ? "check" : "info"}
                    className={`mt-0.5 h-4 w-4 shrink-0 ${gotIt ? "text-mint" : "text-coral"}`}
                  />
                  <p className="text-soft">
                    <strong className={gotIt ? "text-mint" : "text-coral"}>{gotIt ? "Correct. " : "Not quite. "}</strong>
                    {question.why}
                  </p>
                </div>
              ) : null}
              <div className="mt-5">
                {!isChecked ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={choice === null}
                    onClick={() => check(questionIndex)}
                  >
                    Check answer
                  </button>
                ) : (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => reset(questionIndex)}>
                    <Icon name="reset" className="h-4 w-4" />
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
