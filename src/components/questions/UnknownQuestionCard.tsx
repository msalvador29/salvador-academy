// components/UnknownQuestionCard.tsx

interface UnknownQuestionCardProps {
  question: any;
}

export function UnknownQuestionCard({ question }: UnknownQuestionCardProps) {
  const type = typeof question?._type === "string" ? question._type : "unknown";
  const id = typeof question?._id === "string" ? question._id : "no-id";

  return (
    <article className="rounded-lg border border-amber-300 bg-amber-50 p-4 shadow-sm text-sm text-amber-900">
      <div className="mb-1 font-semibold">
        Unknown question type
      </div>

      <div className="space-y-1">
        <p>
          <span className="font-semibold">_type:</span>{" "}
          <span className="font-mono">{type}</span>
        </p>

        <p>
          <span className="font-semibold">_id:</span>{" "}
          <span className="font-mono">{id}</span>
        </p>

        {/* Optional: dump extra fields for debugging */}
        {question && (
          <details className="mt-2 text-xs opacity-80">
            <summary className="cursor-pointer select-none">
              View raw data
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-amber-100 p-2 text-[10px] leading-tight">
              {JSON.stringify(question, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </article>
  );
}
