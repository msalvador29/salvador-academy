// https://www.sanity.io/docs/structure-builder-cheat-sheet
import type {StructureResolver} from 'sanity/structure'

// icons
import { LibraryBig, FileQuestion } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Salvador Studio")
    .items([
      // CONTENT GROUP
      S.listItem()
        .title("Content")
        .icon(LibraryBig)
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("subject").title("Subjects"),
              S.documentTypeListItem("strand").title("Strands"),
              S.documentTypeListItem("unit").title("Units"),
              S.documentTypeListItem("lesson").title("Lessons"),
              S.documentTypeListItem("successCriteria").title("Success Criteria"),
              S.documentTypeListItem("keyQuestion").title("Key Questions"),
            ])
        ),

      // QUESTIONS GROUP
      S.listItem()
        .title("Questions")
        .icon(FileQuestion)
        .child(
          S.list()
            .title("Questions")
            .items([
              S.documentTypeListItem("questionBank").title("Question Banks"),
              S.documentTypeListItem("multipleChoiceQuestion").title("Multiple Choice Questions"),
              S.documentTypeListItem("numericalAnswerQuestion").title("Numerical Answer Questions"),
              S.documentTypeListItem("multiPartQuestion").title("Multi-Part Questions"),
            ])
        ),
    ]);

export default structure;

