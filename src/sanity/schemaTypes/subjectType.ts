import { defineType, defineField } from "sanity";

// icons
import { BookText } from "lucide-react";

export const subjectType = defineType({
  name: "subject",
  title: "Subject",
  type: "document",
  icon: BookText,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Full subject title, e.g. Mathematics, Science.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Taxonomy Code",
      type: "string",
      description: "Taxonomy short code, e.g. MATH, SCIE.",
      validation: (Rule) =>
        Rule.required()
          .length(4)
          .custom((value) =>
            value && value.toUpperCase() !== value
              ? "Use four uppercase letters (e.g. MATH)"
              : true
          ),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in URLs, e.g. mathematics.",
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
      description: "Optional description of the subject.",
    })
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
        subtitle: `${slug || "" }`,
        media: BookText,
      };
    },
  },
});
