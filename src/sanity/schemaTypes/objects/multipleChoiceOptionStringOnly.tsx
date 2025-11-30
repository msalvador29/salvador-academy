import { CheckCircle, CircleX } from "lucide-react";
import { defineType, defineField } from "sanity";

export const multipleChoiceOptionStringOnly = defineType({
  name: "multipleChoiceOptionStringOnly",
  title: "Multiple Choice Option (String Only)",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Option content",
      type: "string",
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
      content: "content",
      isCorrect: "isCorrect",
    },
    prepare({ content, isCorrect }) {
      const Icon = isCorrect ? <CheckCircle color="green" /> : <CircleX color="red" />;

      return {
        title: content || "",
        subtitle: isCorrect ? "Correct answer" : "Incorrect option",
        media: Icon
      };
    },
  },
});

export default multipleChoiceOptionStringOnly;