# Interactive Questionnaire Tool

A lightweight **React + TypeScript + Tailwind** application for creating and running interactive questionnaires.  
Supports **single-choice** and **multi-choice** questions, answer validation, per-answer comments, retry mode, and automatic review of incorrectly answered questions.

---

## 🚀 Features
- Input questionnaire via **JSON** (or load sample data).
- Supports:
  - **single** (exactly one correct answer)
  - **multi** (multiple correct answers)
- Shows **per-answer comments** after checking.
- **Review Mode**: retry only the questions you answered incorrectly.
- Progress bar and completion screen.
- Clean UI with **TailwindCSS** and **lucide-react** icons.

---

## 📦 Installation & Running
```bash
npm install
npm run dev
````

Then open: [http://localhost:5173](http://localhost:5173)

---

## 📝 Creating a New Questionnaire

Provide a valid JSON object like this:

```json
{
  "title": "Sample Quiz",
  "questions": [
    {
      "id": "q1",
      "text": "Which of these are programming languages?",
      "type": "multi",
      "options": [
        { "id": "a", "text": "Python", "comment": "Python is a high-level programming language." },
        { "id": "b", "text": "HTML", "comment": "HTML is a markup language, not a programming language." },
        { "id": "c", "text": "Java", "comment": "Yes, Java is a programming language." },
        { "id": "d", "text": "CSS", "comment": "CSS is a styling language." }
      ],
      "correct": ["a", "c"]
    },
    {
      "id": "q2",
      "text": "What is the capital of Spain?",
      "type": "single",
      "options": [
        { "id": "a", "text": "Barcelona", "comment": "Biggest city in Catalonia, not the capital." },
        { "id": "b", "text": "Madrid", "comment": "Correct! Madrid is the capital." },
        { "id": "c", "text": "Valencia", "comment": "Famous for oranges, but not the capital." }
      ],
      "correct": ["b"]
    }
  ]
}
```

### Rules:

* `type` must be `"single"` or `"multi"`.
* Each option requires an `id` and `text`. `comment` is optional.
* `correct` must be a non-empty array of option IDs.
* For `"single"`: **exactly 1 correct ID**.
* IDs must be unique per question.

---

## ⚠️ Important Notes

* JSON is validated before running. Invalid structure will show an error.
* During **Review Mode**, only initially wrong questions are shown.
* Comments appear only after answers are checked.
* Works entirely client-side — no server required.
