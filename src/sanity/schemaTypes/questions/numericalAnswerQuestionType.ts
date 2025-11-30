// sanity
import { defineField, defineType } from "sanity";

// icons
import { MessageCircleQuestionMark } from "lucide-react";

export const numericalAnswerQuestionType = defineType({
  name: "numericalAnswerQuestion",
  title: "Question - Numerical Answer",
  type: "document",
  icon: MessageCircleQuestionMark,
  initialValue: { isRandomised: true },
  fields: [
    defineField({
      name: "questionBank",
      title: "Question Bank",
      type: "reference",
      to: [{ type: "questionBank" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "contentWithBlockMath",
      description: "The explanation of the question (required).",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "instructions",
      title: "Instructions/Command",
      type: "contentWithBlockMath",
      description: "The instructions/command for the question (optional).",
    }),
    defineField({
      name: "answerPrefix",
      title: "Answer Prefix",
      type: "contentWithInlineMath",
      description: "This shows to the left of the answer field (i.e. AnswerPrefix =). Limit to one equation or one small line of text.",
    }),
    defineField({
      name: "numericalAnswer",
      title: "Numerical Answer",
      type: "number",
      description: "The exact correct numerical value (required).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "precision",
      title: "Required Decimal Places",
      type: "number",
      description:
        "If set, the student's answer must include exactly this many decimal places (optional).",
      validation: (rule) =>
        rule
          .min(0)
          .integer()
          .error("Precision must be a whole number greater than or equal to 0."),
    }),

    defineField({
      name: "tolerance",
      title: "Tolerance (±)",
      type: "number",
      description:
        "Accepted error range from the numerical answer. For example, 0.1 allows ±0.1 (optional).",
      validation: (rule) =>
        rule.min(0).error("Tolerance must be greater than or equal to 0."),
    }),

    defineField({
      name: "unitsOptions",
      title: "Units Options",
      type: "array",
      of: [{ type: "multipleChoiceOptionStringOnly" }],
      description:
        "If provided, students will choose units from a dropdown (optional).",
      validation: (Rule) =>
        Rule.custom((options: { content?: string, isCorrect?: boolean }[] | undefined) => {
          if (!options || options.length === 0) {
            // fully optional — no units is allowed
            return true;
          }

          const hasCorrect = options.some((opt) => opt.isCorrect === true);

          return hasCorrect
            ? true
            : "One option must be marked as the correct units.";
        }),
    }),
    defineField({
      name: "isRandomised",
      title: "Randomize options?",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      id: "_id",
      instructions: "instructions.0.children.0.text",
      content: "content.0.children.0.text",
      questionBankLesson: "questionBank.successCriteria.lesson.fullCode",
      successCriteria: "questionBank.successCriteria.code",
      questionBankCode: "questionBank.code",
    },
    prepare({ id, instructions, content, questionBankLesson, successCriteria, questionBankCode }: { id?: string, instructions?: string, content?: string, questionBankLesson?: string, successCriteria?: string, questionBankCode?: string }) {
      
      const raw = instructions?.trim() || content?.trim();

      const title =
        raw && raw.length > 0
          ? raw.charAt(0).toUpperCase() + raw.slice(1)
          : "Numerical answer question";

      return {
        title,
        subtitle: `${questionBankLesson}.${successCriteria}.${questionBankCode} - ${id}`,
      };
    },
  },
});
