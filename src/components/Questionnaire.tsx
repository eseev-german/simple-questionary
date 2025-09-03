
import React, { useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import type { QuestionnaireData, Question } from "../types";

interface QuestionnaireProps {
  data: QuestionnaireData;
  onReset: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ data, onReset }) => {
  const [current, setCurrent] = useState(0);
  const [isCompleted, setCompleted] = useState(false);
  const [initialWrongIndices, setInitialWrongIndices] = useState<number[]>([]);
  const [inReview, setInReview] = useState(false);
  const [lastCheckedCorrect, setLastCheckedCorrect] = useState<boolean | null>(null);

  const questionsToShow: Question[] = useMemo(() => {
    return inReview ? initialWrongIndices.map((i) => data.questions[i]) : data.questions;
  }, [inReview, initialWrongIndices, data.questions]);

  const progress = Math.round(((current + 1) / questionsToShow.length) * 100);

  const handleNext = () => {
    // record correctness for current question (only during initial pass)
    if (!inReview && lastCheckedCorrect !== null) {
      setInitialWrongIndices((prev) => {
        const idxInOriginal = current; // during initial pass current aligns with original index
        const exists = prev.includes(idxInOriginal);
        if (lastCheckedCorrect) {
          // remove if accidentally present
          return exists ? prev.filter((i) => i != idxInOriginal) : prev;
        } else {
          // add if not present
          return exists ? prev : [...prev, idxInOriginal];
        }
      });
    }

    if (current < questionsToShow.length - 1) {
      setCurrent((c) => c + 1);
      setLastCheckedCorrect(null);
      return;
    }

    // finished a pass
    if (!inReview) {
      if (initialWrongIndices.length > 0) {
        // start review of incorrect ones
        setInReview(true);
        setCurrent(0);
        setLastCheckedCorrect(null);
      } else {
        setCompleted(true);
      }
    } else {
      // finished review
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setCompleted(false);
    setInReview(false);
    setInitialWrongIndices([]);
    setLastCheckedCorrect(null);
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center mx-auto">
        <h2 className="text-2xl font-bold mb-4">Questionnaire Completed!</h2>
        <p className="text-gray-600 mb-6">You have completed the questionnaire.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Try Again
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700"
          >
            New Questionnaire
          </button>
        </div>
      </div>
    );
  }

  const q = questionsToShow[current];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>

        {inReview && (
          <div className="bg-amber-100 border-l-4 border-amber-500 p-3 mb-4 rounded">
            <p className="text-amber-700">
              <strong>Review Mode:</strong> Retrying questions you answered incorrectly.
            </p>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {current + 1} of {questionsToShow.length}{inReview ? " (Review)" : ""}
          </span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${inReview ? "bg-amber-500" : "bg-blue-600"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <QuestionCard
        key={q.id}
        question={q}
        onNext={handleNext}
        isLast={current === questionsToShow.length - 1}
        onResult={setLastCheckedCorrect}
      />
    </div>
  );
};

export default Questionnaire;
