// schemaTypes/questionHeader.ts
import { defineType } from "sanity";
import { SquareFunction, Subscript, Superscript, Strikethrough, Waves } from "lucide-react";

// decorators
const Accent1Decorator = (props: { children: React.ReactNode }) => (
    <span style={{ color: 'oklch(66.7% 0.295 322.15)' }}>{props.children}</span>
)
const Accent2Decorator = (props: { children: React.ReactNode }) => (
    <span style={{ color: 'oklch(74.6% 0.16 232.661)' }}>{props.children}</span>
)
const Accent3Decorator = (props: { children: React.ReactNode }) => (
    <span style={{ color: 'oklch(70.4% 0.14 182.503)' }}>{props.children}</span>
)
const SupDecorator = (props: { children: React.ReactNode }) => (
    <sup>{props.children}</sup>
);
const SubsDecorator = (props: { children: React.ReactNode }) => (
    <sub>{props.children}</sub>
);
const StrikeDecorator = (props: { children: React.ReactNode }) => (
    <span style={{ textDecoration: 'line-through' }}>{props.children}</span>
)
const WavyUnderlineDecorator = (props: { children: React.ReactNode }) => (
    <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>{props.children}</span>
)
const InlineMathDecorator = (props: { children: React.ReactNode }) => (
    <span style={{ fontFamily: 'serif', fontSize: '1.2em', fontStyle: 'italic' }}>{props.children}</span>
)

export const headerContent = defineType({
  name: "headerContent",
  title: "Question Header Content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
      ],
      lists: [], // removes lists
      marks: {
        annotations: [], // removes annotations and links
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em"},
          { title: "Underline", value: "underline"},
          { title: "Superscript", value: "superscript", icon: <Superscript size={14} />, component: SupDecorator },
          { title: "Subscript", value: "subscript", icon: <Subscript size={14} />, component: SubsDecorator },
          { title: "Strike", value: "strike", icon: <Strikethrough size={14} />, component: StrikeDecorator },
          { title: "Accent 1", value: "accent1", icon: () => <span>A1</span>, component: Accent1Decorator },
          { title: "Accent 2", value: "accent2", icon: () => <span>A2</span>, component: Accent2Decorator },
          { title: "Accent 3", value: "accent3", icon: () => <span>A3</span>, component: Accent3Decorator },
          { title: "Wavy Underline", value: "underlineWavy", icon: <Waves size={14} />, component: WavyUnderlineDecorator },
          { title: "Inline Math", value: "inlineMath", icon: <SquareFunction size={14} />, component: InlineMathDecorator },
        ],
      },
    },
  ],
});
