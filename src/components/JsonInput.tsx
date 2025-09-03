
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import type { QuestionnaireData } from "../types";

interface JsonInputProps { onSubmit: (data: QuestionnaireData) => void; }

const JsonInput: React.FC<JsonInputProps> = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validate = (parsed: any) => {
    if (!parsed || typeof parsed !== "object") throw new Error("Root must be an object");
    if (!parsed.title || typeof parsed.title !== "string") throw new Error("Missing string field: title");
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) throw new Error("questions must be a non-empty array");
    parsed.questions.forEach((q: any, i: number) => {
      if (!q.id || !q.text || !q.type) throw new Error(`Question #${i + 1}: missing id/text/type`);
      if (q.type !== "single" && q.type !== "multi") throw new Error(`Question #${i + 1}: type must be 'single' or 'multi'`);
      if (!Array.isArray(q.options) || q.options.length === 0) throw new Error(`Question #${i + 1}: options must be a non-empty array`);
      const optIds = new Set<string>();
      q.options.forEach((o: any, j: number) => {
        if (!o.id || !o.text) throw new Error(`Question #${i + 1} Option #${j + 1}: missing id/text`);
        if (optIds.has(o.id)) throw new Error(`Question #${i + 1}: duplicate option id '${o.id}'`);
        optIds.add(o.id);
      });
      if (!Array.isArray(q.correct) || q.correct.length === 0) throw new Error(`Question #${i + 1}: correct must be a non-empty array of option ids`);
      q.correct.forEach((cid: any) => {
        if (typeof cid !== "string" || !optIds.has(cid)) throw new Error(`Question #${i + 1}: correct id '${cid}' not found among options`);
      });
      if (q.type === "single" && q.correct.length !== 1) throw new Error(`Question #${i + 1}: single-choice must have exactly 1 correct id`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      validate(parsed);
      onSubmit(parsed as QuestionnaireData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleLoadSample = () => {
    const sample: QuestionnaireData = {
      title: "Sample Questionnaire",
      questions: [
        {
          id: "q1",
          text: "Which of these are programming languages?",
          type: "multi",
          options: [
            { id: "a", text: "Python", comment: "Python is a high-level general purpose language." },
            { id: "b", text: "HTML", comment: "HTML is a markup language, not a programming language." },
            { id: "c", text: "Java", comment: "Yes, Java is a programming language." },
            { id: "d", text: "CSS", comment: "CSS is a styling language, not a programming language." }
          ],
          correct: ["a", "c"]
        },
        {
          id: "q2",
          text: "What is the capital of Spain?",
          type: "single",
          options: [
            { id: "a", text: "Barcelona", comment: "Largest city in Catalonia, but not the capital." },
            { id: "b", text: "Madrid", comment: "Correct! Madrid is Spain's capital." },
            { id: "c", text: "Valencia", comment: "Great oranges, not the capital." }
          ],
          correct: ["b"]
        }
      ]
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create Questionnaire</h2>
        <p className="text-gray-600 mb-4">
          Paste your questionnaire JSON below or load a sample.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"title":"...", "questions":[...]}'
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
              disabled={!jsonInput.trim()}
            >
              Create Questionnaire
            </button>
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300"
            >
              Load Sample Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JsonInput;
