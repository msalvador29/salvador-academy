// sanity
import { defineType } from "sanity";

// icons
import { SquareFunction } from "lucide-react";

// decorators
const InlineMathDecorator = (props: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'serif', fontSize: '1.2em', fontStyle: 'italic' }}>{props.children}</span>
)

export const contentWithInlineMath = defineType({
  name: "contentWithInlineMath",
  title: "Content with Inline Math",
  type: "array",
  of: [
    { 
      type: "block",
      marks: {
        decorators: [
          { "title": "Strong", "value": "strong" },
          { "title": "Emphasis", "value": "em" },
          { "title": "Underline", "value": "underline" },
          { "title": "Inline Math", "value": "inlineMath", "icon": <SquareFunction size={14} />, "component": InlineMathDecorator }
        ],
      }
    }
  ]
})