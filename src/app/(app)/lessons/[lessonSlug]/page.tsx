import { getLessonBySlug } from "@/lib/sanity/queries/lessons";
import { notFound } from "next/navigation";
import Link from "next/link";

interface LessonPageProps {
  params: Promise<{
    lessonSlug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonSlug } = await params;

  const lesson = (await getLessonBySlug(lessonSlug));

  if (!lesson) notFound();

  const scList = lesson.successCriteria ?? [];
  const keyQuestions = (lesson as any).keyQuestions ?? []; // until you regen types
  const prerequisites = (lesson as any).prerequisites ?? [];

  const subjectTitle = lesson.unit?.strand?.subject?.title;
  const strandTitle = lesson.unit?.strand?.title;
  const unitTitle = lesson.unit?.title;
  const unitSlug = lesson.unit?.slug;

  const lessonCodeLabel = lesson.fullCode ?? `Lesson ${lesson.code}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-slate-500">
          {subjectTitle && <span>{subjectTitle}</span>}
          {strandTitle && (
            <>
              <span className="mx-1 text-slate-400">/</span>
              <span>{strandTitle}</span>
            </>
          )}
          {unitTitle && (
            <>
              <span className="mx-1 text-slate-400">/</span>
              {unitSlug ? (
                <Link
                  href={`/units/${unitSlug}`}
                  className="text-slate-700 hover:text-slate-900 hover:underline"
                >
                  {unitTitle}
                </Link>
              ) : (
                <span>{unitTitle}</span>
              )}
            </>
          )}
          <span className="mx-1 text-slate-400">/</span>
          <span className="font-medium text-slate-700">{lesson.title}</span>
        </nav>

        {/* Lesson header */}
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {lessonCodeLabel}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="mt-2 text-sm text-slate-600">
              {lesson.description.trim()}
            </p>
          )}
        </header>

        {/* ✅ Prerequisites section */}
        {prerequisites.length > 0 && (
          <section
            aria-labelledby="prerequisites-heading"
            className="mb-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
          >
            <h2
              id="prerequisites-heading"
              className="mb-2 text-sm font-semibold tracking-tight text-slate-800"
            >
              Prerequisites
            </h2>
            <ul className="space-y-1 text-sm text-slate-700">
              {prerequisites.map((preq: any) => (
                <li key={preq._id}>
                  {preq.slug ? (
                    <Link
                      href={`/lessons/${preq.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {preq.fullCode} — {preq.title}
                    </Link>
                  ) : (
                    <span>
                      {preq.fullCode} — {preq.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ✅ Success Criteria as square checkboxes — without codes */}
        {scList.length > 0 && (
          <section
            aria-labelledby="success-criteria-heading"
            className="mb-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
          >
            <h2
              id="success-criteria-heading"
              className="mb-3 text-sm font-semibold tracking-tight text-slate-800"
            >
              Success Criteria
            </h2>
            <p className="mb-3 text-xs text-slate-500">
              Use this checklist to track which goals have been met in this lesson.
            </p>

            <ul className="space-y-3 text-sm text-slate-700">
              {scList.map((sc) => (
                <li key={sc._id}>
                  <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
                    {/* square checkbox */}
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border border-slate-400 accent-slate-900
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40
                                focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    />
                    <p className="text-sm text-slate-800">
                      {sc.description?.trim()}
                    </p>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}


        {/* Key Questions / Lesson Parts */}
        {keyQuestions.length > 0 && (
          <section
            aria-labelledby="key-questions-heading"
            className="mb-8 space-y-4"
          >
            <h2
              id="key-questions-heading"
              className="text-sm font-semibold tracking-tight text-slate-800"
            >
              Key Questions
            </h2>

            <div className="space-y-4">
              {keyQuestions.map((kq: any) => (
                <section
                  key={kq._id}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                >
                  <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Part {kq.order}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {kq.question}
                  </p>
                </section>
              ))}
            </div>
          </section>
        )}

        {/* Overall lesson content placeholder */}
        <section className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
          Overall lesson content will go here.
        </section>
      </div>
    </main>
  );
}
