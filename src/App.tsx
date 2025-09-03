
import React, { useState } from "react";
import { FileQuestion } from "lucide-react";
import JsonInput from "./components/JsonInput";
import Questionnaire from "./components/Questionnaire";
import type { QuestionnaireData } from "./types";

export default function App() {
  const [data, setData] = useState<QuestionnaireData | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <FileQuestion className="text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-bold">Interactive Questionnaire Tool</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {data ? (
          <Questionnaire data={data} onReset={() => setData(null)} />
        ) : (
          <JsonInput onSubmit={setData} />
        )}
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm">
        Interactive Questionnaire Tool © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
