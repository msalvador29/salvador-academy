import { defineType, defineField } from "sanity";
import { Table } from "lucide-react";

export const tableOfValues = defineType({
  name: "tableOfValues",
  title: "Table of Values",
  type: "object",
  icon: <Table size={14} />,
  fields: [
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
    }),
    defineField({
      name: "xLabel",
      title: "X-axis label",
      type: "string",
      initialValue: "x",
    }),
    defineField({
      name: "yLabel",
      title: "Y-axis label",
      type: "string",
      initialValue: "y",
    }),
    defineField({
      name: "headerColor",
      title: "Header Background",
      type: "string",
      description: "Choose a header colour for this table.",
      initialValue: "bg-black",
      options: {
        layout: "dropdown",
        list: [
          { title: "Default (Black)", value: "bg-black" },
          { title: "Blue", value: "bg-blue-500" },
          { title: "Rose", value: "bg-red-400" },
          { title: "Violet", value: "bg-violet-400" },
        ],
      },
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineField({
          name: "row",
          type: "object",
          fields: [
            defineField({
              name: "x",
              title: "x",
              type: "string",
            }),
            defineField({
              name: "y",
              title: "y",
              type: "string",
            }),
          ],
          preview: {
            select: { x: "x", y: "y" },
            prepare({ x, y }) {
              return {
                title: `(${x || " "}, ${y || " "})`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      xLabel: "xLabel",
      yLabel: "yLabel",
      rows: "rows",
    },
    prepare({ title, xLabel, yLabel, rows }) {
      const count = rows?.length ?? 0;
      return {
        title: title || "Table of Values",
        subtitle: `${yLabel || "x"} vs ${xLabel || "y"} • ${count} row${
          count === 1 ? "" : "s"
        }`,
        media: Table,
      };
    },
  },
});
