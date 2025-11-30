// components/MultiPartQuestionCard.tsx

import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/RichTextComponents";

interface MultipleChoiceOption {
  _key: string;
  isCorrect?: boolean;
  label?: any;
  content?: any;
  text?: string;
}

interface UnitsOption {
  _key: string;
  content: string;
  isCorrect?: boolean;
}

interface MultiPartQuestionPart {
  _id: string;
  _type: "multipleChoiceQuestion" | "numericalAnswerQuestion" | string;
  content?: any;        // we won't display this, but it's there
  instructions?: any;   // we WILL display this
  // MC fields
  options?: MultipleChoiceOption[];
  isRandomised?: boolean;
  // Numerical fields
  answerPrefix?: any;
  unitsOptions?: UnitsOption[];
}

interface MultiPartQuestion {
  _id: string;
  content: any;              // shared stem (contentWithBlockMath)
  parts?: MultiPartQuestionPart[]; // parts[]-> already dereferenced
}

interface MultiPartQuestionCardProps {
  question: MultiPartQuestion;
}

function getPartLabel(index: number) {
  // a), b), c), ...
  const letter = String.fromCharCode("a".charCodeAt(0) + index);
  return `${letter})`;
}

export default function MultiPartQuestionCard({
  question,
}: MultiPartQuestionCardProps) {
  const { content, parts } = question;

  const hasParts = Array.isArray(parts) && parts.length > 0;
  const partsToRender = hasParts ? parts! : [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      {/* Header */}
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Question — Multi-Part
      </div>

      {/* Shared stem / explanation */}
      {content && (
        <div className="mb-4 text-slate-800">
          <PortableText value={content} components={RichTextComponents} />
        </div>
      )}

      {/* Parts */}
      {hasParts ? (
        <ol className="space-y-3">
          {partsToRender.map((part, index) => {
            const label = getPartLabel(index);
            const instructions = part.instructions;
            const type = part._type;

            return (
              <li key={part._id ?? index} className="text-sm text-slate-800">
                {/* a) / b) / c) line */}
                <div className="mb-1 flex gap-2">
                  <span className="font-medium">{label}</span>
                  <div className="flex-1">
                    {instructions ? (
                      <PortableText
                        value={instructions}
                        components={RichTextComponents}
                      />
                    ) : (
                      <span className="text-slate-500">
                        No instructions provided for this part.
                      </span>
                    )}
                  </div>
                </div>

                {/* Render part-specific interaction, with NO extra borders/shadows */}
                {type === "multipleChoiceQuestion" && (
                  <MultiPartMCOptions part={part} />
                )}

                {type === "numericalAnswerQuestion" && (
                  <MultiPartNumericalAnswer part={part} />
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="text-sm text-slate-500">
          This multi-part question has no parts configured.
        </p>
      )}
    </article>
  );
}

/* ---------- Sub-renderers ---------- */

function MultiPartMCOptions({ part }: { part: MultiPartQuestionPart }) {
  const hasOptions =
    Array.isArray(part.options) && part.options.length > 0;
  const optionsToRender = hasOptions ? part.options! : [];

  if (!hasOptions) {
    return (
      <p className="ml-6 text-xs text-slate-500">
        No options provided for this part.
      </p>
    );
  }

  return (
    <ul className="mt-1 ml-6 space-y-2">
      {optionsToRender.map((opt) => {
        const richLabel = opt.label || opt.content;
        const plainLabel = opt.text;

        return (
          <li key={opt._key} className="flex items-start gap-2">
            {/* Radio circle (not wired to state yet) */}
            <button
              type="button"
              className="mt-1 h-3.5 w-3.5 flex-none rounded-full border border-slate-500 hover:bg-slate-200"
            />

            {/* Option label */}
            <div className="text-sm text-slate-800">
              {richLabel ? (
                <PortableText
                  value={richLabel}
                  components={RichTextComponents}
                />
              ) : (
                <span>{plainLabel || "Option"}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MultiPartNumericalAnswer({ part }: { part: MultiPartQuestionPart }) {
  const hasUnits =
    Array.isArray(part.unitsOptions) && part.unitsOptions.length > 0;
  const unitsToRender = hasUnits ? part.unitsOptions! : [];

  return (
    <div className="mt-1 ml-6 flex flex-wrap items-center gap-2">
      {/* Answer prefix (e.g. v =, P =, etc.) */}
      {part.answerPrefix && (
        <div className="text-sm text-slate-800">
          <PortableText
            value={part.answerPrefix}
            components={RichTextComponents}
          />
        </div>
      )}

      {/* Numeric input */}
      <input
        type="text"
        inputMode="decimal"
        className="min-w-[120px] rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        placeholder="Enter your answer"
      />

      {/* Units dropdown, if configured */}
      {hasUnits && (
        <select
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
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
  );
}
