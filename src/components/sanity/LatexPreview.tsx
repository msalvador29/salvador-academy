// katex
import katex from "katex";
import "katex/dist/katex.min.css";
import { SquareSigma } from "lucide-react";

// sanity 
import type { PreviewProps } from "sanity";

// The props will include everything from `preview.select`
type LatexPreviewProps = PreviewProps & {
  code?: string;
  value?: { code?: string };
  latexColor?: string;
};

export const LatexPreview: React.FC<LatexPreviewProps> = (props) => {
  const { renderDefault } = props;

  // Prefer selected code, but fall back to value.code if needed
  const code = props.code ?? props.value?.code ?? "";

  let rendered = "";
  try {
    rendered = katex.renderToString(code || "", {
      throwOnError: false,
      displayMode: true,
    });
  } catch {
    rendered = "";
  }

  const title =
    code.trim().length > 0
      ? `LaTeX: ${code.slice(0, 40)}`
      : "LaTeX block";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {/* Default preview (title / subtitle / icon) */}
      {renderDefault?.({
        ...props,
        title: `Latex Code: ${code?.slice(0, 40)}` || "LaTeX block",
        subtitle: `Color: ${props.latexColor || ""}`,
        media: <SquareSigma />
      })}

      {/* KaTeX-rendered math */}
      <div
        style={{
          padding: "0.25rem",
        }}
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  );
};
