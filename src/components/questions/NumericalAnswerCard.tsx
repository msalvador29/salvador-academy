import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/RichTextComponents";

// Reuse the same shape as multipleChoiceOption since it's the same Sanity type
interface UnitsOption {
  _key: string;
  content: string;
  isCorrect?: boolean;
}

interface NumericalAnswerQuestion {
  _id: string;
  _type?: string;
  content: any;          // required (PortableText)
  instructions?: any;    // optional (PortableText)
  answerPrefix?: any;    // contentWithInlineMath (PortableText)
  unitsOptions?: UnitsOption[];
  isRandomised?: boolean;
}

// Pure, non-mutating shuffle (same pattern as MultipleChoiceCard)
function shuffleOptions<T>(options: T[]): T[] {
  const arr = [...options];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

interface NumericalAnswerCardProps {
  question: NumericalAnswerQuestion;
}

export default function NumericalAnswerCard({ question }: NumericalAnswerCardProps) {
  const {
    content,
    instructions,
    answerPrefix,
    unitsOptions,
    isRandomised,
  } = question;

  const hasUnits = Array.isArray(unitsOptions) && unitsOptions.length > 0;

  const unitsToRender = hasUnits ? unitsOptions! : [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Question — Numerical Answer
      </div>

      {/* Main question content */}
      {content && (
        <div className="mb-4 text-slate-800">
          <PortableText value={content} components={RichTextComponents} />
        </div>
      )}

      {/* Instructions */}
      {instructions && (
        <div className="mb-4 text-slate-800 font-bold">
          <PortableText value={instructions} components={RichTextComponents} />
        </div>
      )}

      {/* Answer input row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Answer prefix (e.g. v = , P = , etc.) */}
        {answerPrefix && (
          <div className="text-sm text-slate-800">
            <PortableText value={answerPrefix} components={RichTextComponents} />
          </div>
        )}

        {/* Numerical input */}
        <input
          type="text"
          inputMode="decimal"
          className="min-w-[120px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          placeholder="Enter your answer"
        />

        {/* Optional units dropdown */}
        {hasUnits && (
          <select
            className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            defaultValue=""
          >
            <option value="" disabled>
              Units
            </option>
            {unitsToRender.map((unit) => (
              <option key={unit._key} value={unit.content}>
                {unit.content}
              </option>
            ))}
          </select>
        )}
      </div>
    </article>
  );
}
