import { getUnitBySlug } from "@/lib/sanity/queries/units";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UnitPageProps {
  params: Promise<{
    unitSlug: string;
  }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
  // Next 16: params is a Promise
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
        {/* Breadcrumbs (no Salvador Academy) */}
        <nav className="mb-4 text-sm text-slate-500">
          {subjectTitle && (
            <>
              <span>{subjectTitle}</span>
            </>
          )}
          {strandTitle && (
            <>
              <span className="mx-1 text-slate-400">/</span>
              <span>{strandTitle}</span>
            </>
          )}
          <span className="mx-1 text-slate-400">/</span>
          <span className="text-slate-700 font-medium">{unit.title}</span>
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
            <ul className="space-y-3">
              {lessons.map((lesson: any) => (
                <li
                  key={lesson._id}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
                >
                  <Link href={`/lessons/${lesson.slug}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          {lesson.fullCode ?? `Lesson ${lesson.code}`}
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

                      {typeof lesson.successCriteriaCount === "number" && (
                        <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                          {lesson.successCriteriaCount} SC
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
