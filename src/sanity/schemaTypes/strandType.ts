import { defineType, defineField } from "sanity";

// icons
import { BookText } from "lucide-react";

export const strandType = defineType({
  name: "strand",
  title: "Strand",
  type: "document",
  icon: BookText,
  fields: [
    defineField({
      name: "subject",
      title: "Subject",
      type: "reference",
      to: [{ type: "subject" }],
      description: "Choose the subject that this strand belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Full strand title, e.g. Functions and Relations, Basic Algebra."    ,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Taxonomy Code",
      type: "string",
      description: "Taxonomy short code, e.g. FN, BA.",
      validation: (Rule) =>
        Rule.required()
          .length(2)
          .custom((value) =>
            value && value.toUpperCase() !== value
              ? "Use two uppercase letters (e.g. FN)"
              : true
          ),
    }),
    defineField({
        name: "order",
        title: "Order",
        type: "number",
        description: "Controls display order within the subject (1, 2, 3, ...)",
        validation: (Rule) => Rule.required().min(1)
      }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in URLs, e.g. functions-and-relations, basic-algebra.",
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
      description: "Optional description of the strand.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      code: "code",
      slug: "slug.current",

    },
    prepare({ title, code, slug }) {
      const formattedTitle = title
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : "Untitled";
  
      return {
        title: `${code} : ${formattedTitle}`,
        subtitle: `${slug?.current}`,
        media: BookText,
      };
    },
  },
});
