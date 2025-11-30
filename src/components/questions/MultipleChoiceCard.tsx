import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/RichTextComponents";

interface MultipleChoiceOption {
  _key: string;
  isCorrect?: boolean;
  label?: any;
  content?: any;
  text?: string;
}

interface MultipleChoiceQuestion {
  _id: string;
  content: any;
  instructions?: any;
  options?: MultipleChoiceOption[];
  isRandomised?: boolean; // unused but kept for schema consistency
}

interface MultipleChoiceCardProps {
  question: MultipleChoiceQuestion;
}

export default function MultipleChoiceCard({ question }: MultipleChoiceCardProps) {
  const { content, instructions, options } = question;

  const hasOptions = Array.isArray(options) && options.length > 0;
  const optionsToRender = hasOptions ? options! : [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Question — Multiple Choice
      </div>

      {/* Content */}
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

      {/* Options */}
      {hasOptions ? (
        <ul className="space-y-3">
          {optionsToRender.map((opt) => {
            const richLabel = opt.label || opt.content;
            const plainLabel = opt.text;

            return (
              <li key={opt._key} className="flex items-start gap-3 px-1">
                {/* Circle is clickable */}
                <button
                  type="button"
                  className="mt-0.5 h-4 w-4 rounded-full border border-slate-500 flex-none hover:bg-slate-200"
                />

                {/* Option text (NOT clickable) */}
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
      ) : (
        <p className="text-sm text-slate-500">No options provided for this question.</p>
      )}
    </article>
  );
}
