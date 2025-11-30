import { defineType, defineField } from "sanity";

// icons
import { FolderOpen } from "lucide-react";

export const questionBankType = defineType({
  name: "questionBank",
  title: "Question Bank",
  type: "document",
  icon: FolderOpen,
  fields: [
    defineField({
      name: "successCriteria",
      title: "Success Criteria",
    type: "reference",
    to: [{ type: "successCriteria" }],
    description: "Choose the success criteria that this question bank belongs to.",
    validation: (Rule) => Rule.required().error("Success Criteria is required.")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "The description of the question bank. (i.e. Factor a hard trinomial by common factoring first.)",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "number",
      description: "The code of the question bank. (i.e. 1, 2, 3, ...)",
      validation: (Rule) => Rule.required()
        .min(1)
        .max(25)
        .positive()
        .error("Code is required. Should be positive."),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "number",
      description: "The level of the question bank. Min: 1, maximum 10.",
      validation: (Rule) => Rule.required()
        .error("Level is required.")
        .min(1)
        .max(10)
        .integer()
        .positive(),
    })    
  ],
  preview: {
    select: {
      description: "description",
      code: "code",
      lessonCode: "successCriteria.lesson.fullCode",
      successCriteriaCode: "successCriteria.code",
      level: "level",
    },
    prepare({ description, code, lessonCode, successCriteriaCode, level }) {
      const formattedDesc = description?.trim() || "Untitled";
    
      const prefix = [lessonCode, successCriteriaCode, code]
        .filter(Boolean)
        .join(".");
    
      return {
        title: `${prefix} : ${formattedDesc}`,
        subtitle: level ? `Level ${level}` : "",
        media: FolderOpen,
      };
    }
  },
});