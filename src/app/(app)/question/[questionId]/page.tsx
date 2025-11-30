import { getKeyQuestionById } from "@/lib/sanity/queries/keyQuestions";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import RichTextHeaderComponents from "@/components/RichTextHeaderComponents";
import RichTextLessonComponents from "@/components/RichTextLessonComponents";

// fonts
import { Gaegu, Gloria_Hallelujah, Patrick_Hand_SC } from "next/font/google";

const GaeguFont = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const GloriaHallelujahFont = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const PatrickHandSCFont = Patrick_Hand_SC({
  subsets: ["latin"],
  weight: ["400"],
});

interface QuestionPageByIdProps {
  params: Promise<{
    questionId: string;
  }>;
}

export default async function QuestionPageById({ params }: QuestionPageByIdProps) {
  const { questionId } = await params;

  const question = await getKeyQuestionById(questionId);

  if (!question) {
    return notFound();  // TODO: Come up with a better way to handle this
  }

  return (
    <main className="mx-auto max-w-5xl px-12 py-24">
      {/* Header */}
      <header className="mb-12 px-8">
        <h1 className={`text-black text-4xl tracking-wider leading-12 font-bold uppercase text-center ${PatrickHandSCFont.className}`}>
          <PortableText value={question.question} components={RichTextHeaderComponents} />
        </h1>
      </header>

      {/* Content */}
      <article className={`text-black text-2xl tracking-wider leading-16 [&>p]:my-10 ${GloriaHallelujahFont.className}`}>
        <PortableText value={question.content} components={RichTextLessonComponents} />
      </article>
      <div className={`py-6 text-black text-2xl tracking-wider leading-8 text-bold ${GaeguFont.className} space-y-4`}>
        <p>EX 1: At 8:00 AM, a bamboo plant measured 76 inches tall. By noon the next day, the plant was 111 inches high.</p>
        <p>a) What is the dependent variable? What is the independent variable?</p>
        <p>b) Is the dependent variable increasing or decreasing?</p>
        <p>c) Find the rate of change.</p>
      </div>      
    </main>
  );
}
