import { getQuestionBankById } from "@/lib/sanity/queries/questionBank";
import { getQuestionsByQuestionBankId } from "@/lib/sanity/queries/questions";
import { QUESTION_COMPONENTS, UnknownQuestionCard } from "@/components/questions/questionComponentMap";

interface QuestionBankPageProps {
  params: Promise<{
    questionBankId: string;
  }>;
}

export default async function QuestionBankPage({ params }: QuestionBankPageProps) {
  const { questionBankId } = await params;

  const [questionBank, questions] = await Promise.all([
    getQuestionBankById(questionBankId),
    getQuestionsByQuestionBankId(questionBankId),
  ]);

  if (!questionBank) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Question Bank
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Sorry, we could not find a Question Bank with the Reference:{" "}
            <span className="font-mono break-all text-slate-800">
              {questionBankId}
            </span>
          </p>
        </div>
      </main>
    );
  }

  const { _id, description, code, successCriteria } = questionBank;

  const bankSuccessCriteriaCode = [
    successCriteria?.lesson?.fullCode,
    successCriteria?.code,
    code,
  ]
    .filter(Boolean)
    .join(".");

  const hasQuestions = Array.isArray(questions) && questions.length > 0;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10 space-y-6">
        {/* Header */}
        <header className="space-y-2 border-b border-slate-200 pb-4">
          <div className="text-xs text-slate-400">
            <span className="uppercase tracking-wide">
              {bankSuccessCriteriaCode || "Unknown Success Criteria"}
            </span>
            <span> - </span>
            <span>
              {successCriteria?.description || "Unknown Success Criteria Description"}
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {description?.trim() || "Untitled Question Bank"}
          </h1>

          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <div>
              <span className="font-medium">Question Bank ID:</span>{" "}
              <span className="font-mono break-all text-slate-800">
                {_id}
              </span>
            </div>
          </div>
        </header>

        {/* Questions */}
        <section className="space-y-4">
          {hasQuestions ? (
            questions.map((question: any) => {
              const QuestionComponent =
                QUESTION_COMPONENTS[question._type as string];

              if (!QuestionComponent) {
                return (
                  <UnknownQuestionCard key={question._id} question={question} />
                );
              }

              return (
                <QuestionComponent
                  key={question._id}
                  question={question}
                />
              );
            })
          ) : (
            <p className="text-sm text-slate-600">
              Sorry, there are no questions in this Question Bank.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
