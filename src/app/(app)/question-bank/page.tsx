// app/question-bank/page.tsx

import Link from "next/link";
import { getAllQuestionBanks } from "@/lib/sanity/queries/questionBank";

export const metadata = {
  title: "Question Bank | Salvador Academy",
};

export default async function QuestionBankPage() {
  const questionBanks = await getAllQuestionBanks();
  const hasBanks = Array.isArray(questionBanks) && questionBanks.length > 0;

  if (!hasBanks) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <header className="mb-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Question Bank
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              All Question Banks
            </h1>
          </header>

          <section className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No question banks found yet. Once you create question bank entries
            in Sanity, they&apos;ll appear here.
          </section>
        </div>
      </main>
    );
  }

  // Group question banks by success criteria _id
  const groupedBySC: Record<string, any[]> = {};

  for (const qb of questionBanks) {
    const scId = qb.successCriteria?._id || "unknown-sc";
    if (!groupedBySC[scId]) groupedBySC[scId] = [];
    groupedBySC[scId].push(qb);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Page header */}
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Question Bank
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            All Question Banks
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Below are all question banks grouped by success criteria.
          </p>
        </header>

        {/* Render grouped success criteria sections */}
        <section className="space-y-10">
          {Object.values(groupedBySC).map((banksForSC: any[]) => {
            const first = banksForSC[0];
            const sc = first.successCriteria;
            const lesson = sc?.lesson;

            const lessonCode: string | undefined = lesson?.fullCode;
            const lessonTitle: string | undefined = lesson?.title;
            const lessonSlug: string | undefined =
              typeof lesson?.slug === "string"
                ? lesson.slug
                : lesson?.slug?.current;

            return (
              <div key={sc?._id ?? Math.random()} className="space-y-3">
                {/* Success Criterion heading */}
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {lessonCode && sc?.code
                      ? `${lessonCode}.${sc.code} — ${sc.description}`
                      : sc?.description || "Success Criterion"}
                  </h2>

                  {lesson && lessonSlug && (
                    <Link
                      href={`/lessons/${lessonSlug}`}
                      className="text-xs text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
                    >
                      View Lesson: {lessonCode} — {lessonTitle}
                    </Link>
                  )}
                </div>

                {/* Question banks under this success criterion */}
                <div className="space-y-3">
                  {banksForSC.map((qb) => {
                    const qbCode: string | undefined = qb.code;
                    const scCode: string | undefined = sc?.code;

                    const compositeCode = [lessonCode, scCode, qbCode]
                      .filter(Boolean)
                      .join(".");

                    return (
                      <Link
                        key={qb._id}
                        href={`/question-bank/${qb._id}`}
                        className="block rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {compositeCode || "Question Bank"}
                        </p>

                        <h3 className="mt-0.5 text-sm font-semibold text-slate-900">
                          Question Bank {qbCode ?? ""}
                        </h3>

                        {qb.description && (
                          <p className="mt-2 text-sm text-slate-700">
                            {qb.description}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
