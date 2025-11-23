import { defineType, defineField } from "sanity";

// icons
import { BookText } from "lucide-react";

export const lessonType = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  icon: BookText,
  fields: [
    defineField({
      name: "unit",
      title: "Unit",
      type: "reference",
      to: [{ type: "unit" }],
      description: "Choose the unit that this lesson belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
      validation: (Rule) =>
        Rule.unique().error("Prerequisites must be unique.")
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Full lesson title, e.g. Difference of Square, Modelling Polynomial Functions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Taxonomy Code",
      type: "number",
      description: "Lesson Number/Taxonomy short code, (1, 2, 3, ...).",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(25)
          .integer()
          .positive(),
    }),
    defineField({
      name: "fullCode",
      title: "Full Taxonomy Code",
      type: "string",
      description: "Full taxonomy code, e.g. BA-FCT-3, FN-POL-5.",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[A-Z]{2}-[A-Z]{3}-[0-9]{1,2}$/, "taxonomy code")
          .error("Use format AA-BBB-CC (e.g. BA-FCT-3)"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in URLs, e.g. difference-of-square, modelling-polynomial-functions.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 1,
      description: "Optional description of the lesson."
    }),
  ],
  preview: {
    select: {
      title: "title",
      fullCode: "fullCode",
      slug: "slug.current",

    },
    prepare({ title, fullCode, slug }) {
      const formattedTitle = title
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : "Untitled";

      return {
        title: `${fullCode} : ${formattedTitle}`,
        subtitle: `${slug || "" }`,
        media: BookText,
      };
    },
  },
});
