
export interface Option {
  id: string;
  text: string;
  /** Optional explanation shown after checking the answer */
  comment?: string;
}

export interface Question {
  id: string;
  text: string;
  type: "single" | "multi";
  options: Option[];
  /** array of option ids that are correct */
  correct: string[];
}

export interface QuestionnaireData {
  title: string;
  questions: Question[];
}
