import React, { useMemo, useState } from "react";
import { Check, X, RotateCcw, HelpCircle, Info } from "lucide-react";
import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  isLast: boolean;
  /** called when the user presses "Check". Passes whether the current selection is fully correct */
  onResult?: (correct: boolean) => void;
}

type PerOptionState = "selected-correct" | "selected-wrong" | "neutral";

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onNext, isLast, onResult }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const correctSet = useMemo(() => new Set(question.correct), [question.correct]);

  const toggle = (id: string) => {
    if (checked) return; // lock after checking
    if (question.type === "single") {
      setSelected([id]);
    } else {
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    }
  };

  const computeCorrectness = (): boolean => {
    if (question.type === "single") {
      return selected.length === 1 && correctSet.has(selected[0]);
    }
    if (selected.length !== correctSet.size) return false;
    return selected.every((id) => correctSet.has(id));
  };

  const perOption = (id: string): PerOptionState => {
    const isSelected = selected.includes(id);
    const isCorrect = correctSet.has(id);
    if (!checked) return "neutral";
    if (isSelected && isCorrect) return "selected-correct";
    if (isSelected && !isCorrect) return "selected-wrong";
    return "neutral";
  };

  const handleCheck = () => {
    const ok = computeCorrectness();
    setCorrect(ok);
    setChecked(true);
    onResult?.(ok);
  };

  const handleRetry = () => {
    setSelected([]);
    setChecked(false);
    setCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{question.text}</h3>
        {question.type === "multi" && (
          <div className="mt-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-flex items-center gap-1">
            <Info size={16} /> Select all that apply
          </div>
        )}
      </div>

      <div className="space-y-2">
        {question.options.map((opt) => {
          const state = perOption(opt.id);
          const disabled = checked;
          const base = "flex items-start gap-3 rounded-md border p-3";
          const styles =
            state === "selected-correct" ? "border-green-300 bg-green-50" :
            state === "selected-wrong" ? "border-red-300 bg-red-50" :
            "border-gray-200 bg-white";

        return (
          <label key={opt.id} className={`${base} ${styles} cursor-pointer`}>
            <input
              type={question.type === "single" ? "radio" : "checkbox"}
              name={question.id}
              value={opt.id}
              disabled={disabled}
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{opt.text}</span>
                {checked && state === "selected-correct" && <Check className="text-green-600" size={18} />}
                {checked && state === "selected-wrong" && <X className="text-red-600" size={18} />}
              </div>
              {/* Per-answer comment */}
              {checked && (
                ((state === "selected-correct") || (state === "selected-wrong")) &&
                opt.comment && (
                  <p className={
                    state === "selected-correct" ? "text-green-700 text-sm mt-1" :
                    "text-red-700 text-sm mt-1"
                  }>
                    {opt.comment}
                  </p>
                )
              )}
            </div>
          </label>
        );})}
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button
            onClick={handleCheck}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
            disabled={selected.length === 0}
          >
            Check Answer
          </button>
        ) : (
          <>
            <div className={`flex items-center gap-2 font-medium ${correct ? "text-green-600" : "text-red-600"}`}>
              {correct ? (<><Check size={20} /> Correct!</>) : (<><X size={20} /> Incorrect</>)}
            </div>

            {!correct && question.type === "multi" && (
              <button
                onClick={() => setShowHint((v) => !v)}
                className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 inline-flex items-center gap-2"
              >
                <HelpCircle size={18} /> {showHint ? "Hide hint" : "Show hint"}
              </button>
            )}

            {!correct && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 inline-flex items-center gap-2"
              >
                <RotateCcw size={18} /> Try Again
              </button>
            )}

            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
            >
              {isLast ? "Finish" : "Next Question"}
            </button>
          </>
        )}
      </div>

      {checked && !correct && showHint && question.type === "multi" && (
        <div className="mt-3 text-sm text-indigo-800 bg-indigo-50 border border-indigo-200 rounded p-3">
          <p>
            Hint: There are <strong>{question.correct.length}</strong> correct answers in total.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
