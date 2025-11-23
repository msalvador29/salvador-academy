// https://www.sanity.io/docs/structure-builder-cheat-sheet
import type {StructureResolver} from 'sanity/structure'

// icons
import { LibraryBig, BadgeQuestionMark } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Salvador Studio")
    .items([
      // 📚 CONTENT GROUP
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
            ])
        ),

      // ❓ QUESTIONS GROUP
      S.listItem()
        .title("Questions")
        .icon(BadgeQuestionMark)
        .child(
          S.list()
            .title("Questions")
            .items([
              S.documentTypeListItem("questionBank").title("Question Banks"),
            ])
        ),
    ]);

export default structure;

