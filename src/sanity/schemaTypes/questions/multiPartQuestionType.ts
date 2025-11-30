// sanity
import { defineField, defineType } from "sanity";

// icons
import { MessageCircleQuestionMark } from "lucide-react";

export const multiPartQuestionType = defineType({
  name: "multiPartQuestion",
  title: "Question - Multi-Part Question",
  type: "document",
  icon: MessageCircleQuestionMark,
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
      description: "The shared content stem/explanation of the questions (required).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parts",
      title: "Parts",
      type: "array",
      description: "Each part is either multiple choice or numerical answer. Parts reuse the shared content above.",
      of: [
        {
          type: "reference",
          to: [
            { type: "multipleChoiceQuestion" },
            { type: "numericalAnswerQuestion" },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("A multi-part question must have at least one part."),
    }),
  ],

  preview: {
    select: {
      content: "content.0.children.0.text",
      questionBankLesson: "questionBank.successCriteria.lesson.fullCode",
      successCriteria: "questionBank.successCriteria.code",
      questionBankCode: "questionBank.code",
    },
    prepare({ content, questionBankLesson, successCriteria, questionBankCode }: { content?: string, questionBankLesson?: string, successCriteria?: string, questionBankCode?: string }) { 
      const raw = content?.trim();

      const questionTitle =
        raw && raw.length > 0
        ? raw.charAt(0).toUpperCase() + raw.slice(1)
        : "";
  
      return {
        title: `Multi-Part Question - ${questionTitle}`,
        subtitle: [questionBankLesson, successCriteria, questionBankCode]
          .filter(Boolean)
          .join("."),
      };
    },
  },
})