import { defineType, defineField } from "sanity";

// icons
import { Star } from "lucide-react";

export const successCriteriaType = defineType({
  name: "successCriteria",
  title: "Success Criteria",
  type: "document",
  icon: Star,
  fields: [
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      description: "Choose the lesson that this success criteria belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "The success criteria description. (i.e. I can...)",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(200)
          .custom((value) => {
            if (!value) return true
            const trimmed = value.trim()
            return trimmed.length === value.length
              ? true
              : "Remove leading or trailing spaces."
          })
          .error("Description must be between 10–200 characters. Remove leading or trailing spaces."),
    }),
    defineField({
      name: "title",
      title: "Unique Title",
      type: "string",
      description: "Optional title for the success criteria",
    }),
    defineField({
      name: "code",
      title: "Taxonomy Code",
      type: "number",
      description: "Success Criteria Number/Taxonomy short code, (1, 2, 3, ...).",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(25)
          .integer()
          .positive(),
    }),
  ],
  preview: {
    select: {
      description: "description",
      code: "code",
      lessonCode: "lesson.fullCode"
    },
    prepare({ description, code, lessonCode }) {
      const formattedDescription = description
        ? description.charAt(0).toUpperCase() + description.slice(1)
        : "Untitled";

      return {
        title: `${formattedDescription}`,
        subtitle: lessonCode ? `${lessonCode}.${code}` : "",
        media: Star,
      };
    },
  },
});
