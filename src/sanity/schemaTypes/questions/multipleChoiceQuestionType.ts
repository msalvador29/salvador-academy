// sanity
import { defineField, defineType } from "sanity";

// icons
import { MessageCircleQuestionMark } from "lucide-react";

export const multipleChoiceQuestionType = defineType({
  name: "multipleChoiceQuestion",
  title: "Question - Multiple Choice",
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
      description: "The instructions/command for the question (optional)."
    }),
    defineField({
      name: "options",
      title: "Multiple Choice Options",
      type: "array",
      of: [{ type: "multipleChoiceOption" }],
      validation: (Rule) =>
        Rule.custom((options: { isCorrect?: boolean }[] | undefined) => {
          if (!options || options.length === 0) {
            return "At least one option is required.";
          }
    
          const correctCount = options.filter(opt => opt.isCorrect).length;
    
          if (correctCount === 0) {
            return "One option must be marked as the correct answer.";
          }
    
          if (correctCount > 1) {
            return "Only one option can be marked as correct.";
          }
    
          return true;
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
        : "Multiple choice question";
  
      return {
        title,
        subtitle: `${questionBankLesson}.${successCriteria}.${questionBankCode} - ${id}`,
      };
    },
  },
})