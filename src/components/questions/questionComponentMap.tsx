import type { ComponentType } from "react";
import MultipleChoiceCard from "./MultipleChoiceCard";
import NumericalAnswerCard from "./NumericalAnswerCard";
import MultiPartQuestionCard from "./MultiPartQuestionCard";

type QuestionComponent = ComponentType<{ question: any }>;

export const QUESTION_COMPONENTS: Record<string, QuestionComponent> = {
  multipleChoiceQuestion: MultipleChoiceCard,
  numericalAnswerQuestion: NumericalAnswerCard,
  multiPartQuestion: MultiPartQuestionCard
};

// Optional fallback for unknown types
export function UnknownQuestionCard({ question }: { question: any }) {
  return (
    <article className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="mb-1 font-semibold">
        Unknown question type
      </div>
      <div>
        <span className="font-mono text-xs">
          {_safe(question?._type) || "missing"}
        </span>
      </div>
    </article>
  );
}

function _safe(value: unknown): string {
  return typeof value === "string" ? value : "";
}
