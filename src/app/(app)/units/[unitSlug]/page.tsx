import { getUnitBySlug } from "@/lib/sanity/queries/units";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UnitPageProps {
  params: Promise<{
    unitSlug: string;
  }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { unitSlug } = await params;

  const unit = await getUnitBySlug(unitSlug);

  if (!unit) {
    notFound();
  }

  const subjectTitle = unit.strand?.subject?.title;
  const strandTitle = unit.strand?.title;
  const lessons = unit.lessons ?? [];

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
          <span className="mx-1 text-slate-400">/</span>
          <span className="font-medium text-slate-700">{unit.title}</span>
        </nav>

        {/* Unit header */}
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {unit.fullCode ?? "Unit"}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {unit.title}
          </h1>
          {unit.description && (
            <p className="mt-2 text-sm text-slate-600">
              {unit.description.trim()}
            </p>
          )}
        </header>

        {/* Lessons list */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold tracking-tight text-slate-800">
            Lessons in this unit
          </h2>

          {lessons.length === 0 ? (
            <p className="text-sm text-slate-500">
              No lessons have been added to this unit yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {lessons.map((lesson) => {
                const lessonCodeLabel =
                  lesson.fullCode ?? `Lesson ${lesson.code}`;
                const scList = lesson.successCriteria ?? [];
                const keyQuestions = lesson.keyQuestions ?? [];

                return (
                  <li
                    key={lesson._id}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:bg-slate-100"
                  >
                    {/* Header row is clickable */}
                    <Link href={`/lessons/${lesson.slug}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            {lessonCodeLabel}
                          </p>
                          <h3 className="text-sm font-medium text-slate-900">
                            {lesson.title}
                          </h3>
                          {lesson.description && (
                            <p className="mt-1 text-xs text-slate-600">
                              {lesson.description.trim()}
                            </p>
                          )}
                        </div>

                        {/* ✅ removed SC pill */}
                      </div>
                    </Link>

                    {/* Success Criteria checklist */}
                    {scList.length > 0 && (
                      <section className="mt-3 rounded-lg bg-white px-3 py-2 border border-slate-200">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Success Criteria
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-800">
                          {scList.map((sc) => (
                            <li key={sc._id}>
                              <label className="flex items-start gap-3 cursor-pointer">
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

                    {/* Key Questions list */}
                    {keyQuestions.length > 0 && (
                      <section className="mt-3 rounded-lg bg-white px-3 py-2 border border-slate-200">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Key Questions
                        </h4>
                        <ul className="space-y-1 text-sm text-slate-800">
                          {keyQuestions.map((kq) => (
                            <li key={kq._id} className="flex gap-2">
                              <span className="text-[11px] font-medium text-slate-400">
                                Part {kq.order}
                              </span>
                              <span>{kq.question}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
