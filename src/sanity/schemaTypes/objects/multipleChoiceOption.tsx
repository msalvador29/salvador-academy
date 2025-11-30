import { CheckCircle, CircleX } from "lucide-react";
import { defineType, defineField } from "sanity";

export const multipleChoiceOption = defineType({
  name: "multipleChoiceOption",
  title: "Multiple Choice Option",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Option content",
      type: "contentWithBlockMath",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCorrect",
      title: "Correct answer?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      contentParts: "content.0.children",
      isCorrect: "isCorrect",
    },
    prepare({ contentParts, isCorrect }) {
      const Icon = isCorrect ? <CheckCircle color="green" /> : <CircleX color="red" />;

      const content =
      Array.isArray(contentParts)
        ? contentParts.map((part) => part.text || "").join("")
        : "";

      return {
        title: content || "",
        subtitle: isCorrect ? "Correct answer" : "Incorrect option",
        media: Icon
      };
    },
  },
});

export default multipleChoiceOption;
