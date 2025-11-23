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

  const lesson = await getLessonBySlug(lessonSlug);

  if (!lesson) {
    notFound();
  }

  const scList = lesson.successCriteria ?? [];

  const subjectTitle = lesson.unit?.strand?.subject?.title;
  const strandTitle = lesson.unit?.strand?.title;
  const unitTitle = lesson.unit?.title;
  const unitSlug = lesson.unit?.slug as string | undefined;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Breadcrumbs (no Salvador Academy, unit is linked) */}
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
          <span className="text-slate-700 font-medium">{lesson.title}</span>
        </nav>

        {/* Lesson header */}
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {lesson.fullCode ?? `Lesson ${lesson.code}`}
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

        {/* Success Criteria */}
        {scList.length > 0 && (
          <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h2 className="mb-2 text-sm font-semibold tracking-tight text-slate-800">
              Success Criteria
            </h2>
            <ul className="space-y-1 text-sm text-slate-700">
              {scList.map((sc: any) => (
                <li key={sc._id} className="flex gap-2">
                  <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {(lesson.fullCode ?? `L${lesson.code}`) + "." + sc.code}
                  </span>
                  <span>{sc.description?.trim()}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Placeholder for main lesson content */}
        <section className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
          Lesson content (examples, explanations, practice, videos, etc.) will
          go here.
        </section>
      </div>
    </main>
  );
}
