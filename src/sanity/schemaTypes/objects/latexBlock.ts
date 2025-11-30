// sanity
import { defineType, defineField } from "sanity";

import { LatexPreview } from "@/components/sanity/LatexPreview";

export const latexBlock = defineType({
  name: "latexBlock",
  title: "LaTeX Block",
  type: "object",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX Code",
      type: "text",
      rows: 1,
    }),
    defineField({
      name: "latexColor",
      title: "LaTeX Color",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "" },
          { title: "Accent1", value: "accent1" },
          { title: "Accent2", value: "accent2" },
          { title: "Accent3", value: "accent3" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      code: "latex", // this becomes props.latex in LatexPreview
      latexColor: "latexColor"
    },
  },
  components: {
    preview: LatexPreview,
  },
});