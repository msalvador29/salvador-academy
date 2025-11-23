import { defineType, defineField } from "sanity";

// icons
import { BookText } from "lucide-react";

export const unitType = defineType({
  name: "unit",
  title: "Unit",
  type: "document",
  icon: BookText,
  fields: [
    defineField({
      name: "strand",
      title: "Strand",
      type: "reference",
      to: [{ type: "strand" }],
      description: "Choose the strand that this unit belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Full unit title, e.g. Factoring, Polynomial Functions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Taxonomy Code",
      type: "string",
      description: "Taxonomy short code, e.g. FCT, POL.",
      validation: (Rule) =>
        Rule.required()
          .length(3)
          .custom((value) =>
            value && value.toUpperCase() !== value
              ? "Use three uppercase letters (e.g. FCT)"
              : true
          ),
    }),
    defineField({
      name: "fullCode",
      title: "Full Taxonomy Code",
      type: "string",
      description: "Full taxonomy code, e.g. BA-FCT, FN-POL.",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[A-Z]{2}-[A-Z]{3}$/, "taxonomy code")
          .error("Use format AA-BBB (e.g. BA-FCT)"),
    }),
    defineField({
        name: "order",
        title: "Order",
        type: "number",
        description: "Controls display order within the strand (1, 2, 3, ...)",
        validation: (Rule) => Rule.required().min(1)
      }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in URLs, e.g. factoring, polynomial-functions.",
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
      description: "Optional description of the unit."
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
