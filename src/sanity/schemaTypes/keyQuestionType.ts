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
      name: "question",
      title: "Question Header",
      type: "headerContent",
      description: "The key question of the lesson. Please limit to one block.",
      validation: (Rule) => Rule.required().error("Question is required."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The slug of the key question.",
      options: {
        source: "question",
        maxLength: 96
        },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "content",
      title: "Answer / Article Content",
      type: "lessonContent"
    }),
  ],
  preview: {
    select: {
      lesson: "lesson.title",
      lessonCode: "lesson.fullCode",
      questionParts: "question.0.children"
    },
    prepare({ lesson, lessonCode, questionParts }) {
      const question =
      Array.isArray(questionParts)
        ? questionParts.map((part) => part.text || "").join("")
        : "";

      return {
        title: `${question || ""}`,
        subtitle: `KQ | ${lessonCode || "" } : ${lesson || "" } `,
        media: CircleQuestionMark
      };
    },
  },
});
