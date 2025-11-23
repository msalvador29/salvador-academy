import { defineType, defineField } from "sanity";

// icons
import { CircleQuestionMark } from "lucide-react";

export const keyQuestionType = defineType({
  name: "keyQuestion",
  title: "Key Question",
  type: "document",
  icon: CircleQuestionMark,
  fields: [
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      description: "Choose the lesson that this key question belongs to.",
      validation: (Rule) => Rule.required().error("Lesson is required."),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "The order of the key question in the lesson (unique per lesson).",
      validation: (Rule) => Rule.required().error("Order is required.")
        .min(1)
        .max(25)
        .integer()
        .positive(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "The key question of the lesson.",
      validation: (Rule) => Rule.required().error("Question is required."),
    }),
  ],
  preview: {
    select: {
      lesson: "lesson.title",
      lessonCode: "lesson.fullCode",
      question: "question",
      order: "order",
    },
    prepare({ lesson, lessonCode, question, order }) {
      return {
        title: `${question || ""}`,
        subtitle: `${lessonCode || "" }-KQ${order || "" } :${lesson || "" } `,
        media: CircleQuestionMark,
      };
    },
  },
});