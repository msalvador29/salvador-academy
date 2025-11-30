import React from "react";
import Image from "next/image";
import katex from "katex";
import { TableOfValuesBlock } from "./blocks/TableOfValuesBlock";

export const RichTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      return (
        <Image
          src={value.asset.url}
          alt={value.alt}
          width={value.asset.metadata.dimensions.width}
          height={value.asset.metadata.dimensions.height}
        />
      );
    },

    latexBlock: ({ value }: { value: { latex?: string; latexColor?: string } }) => {
      const code = value?.latex || "";
      const colorClass = value?.latexColor || "";

      let rendered = "";
      try {
        rendered = katex.renderToString(code, {
          throwOnError: false,
          displayMode: true,
        });
      } catch {
        rendered = "";
      }

      return (
        <div className={`latex-block ${colorClass}`} dangerouslySetInnerHTML={{ __html: rendered }} />
      );
    },

    tableOfValues: ({ value }: { value: any }) => {
      return (
        <TableOfValuesBlock title={value.title} xLabel={value.xLabel} yLabel={value.yLabel} rows={value.rows} headerColor={value.headerColor} />
      );
    },
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li className="mb-2">{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li className="mb-2">{children}</li>,
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4>{children}</h4>,
    h5: ({ children }: { children?: React.ReactNode }) => <h5>{children}</h5>,
    h6: ({ children }: { children?: React.ReactNode }) => <h6>{children}</h6>,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: any; }) => {
      const href = value?.href || "#";
      const rel =
        href && !href.startsWith("/") ? "noreferrer noopener" : undefined;
      
      return (
        <a href={href} rel={rel}>{children}</a>
      );
    },
    inlineMath: ({ children }: { children: React.ReactNode }) => {
      // children is usually just the text you've marked as "Inline Math"
      const text = React.Children.toArray(children).join("");
  
      let html = "";
      try {
        html = katex.renderToString(text, {
          throwOnError: false,
          displayMode: false, // inline mode
        });
      } catch {
        html = ""; // fallback to nothing if it really breaks
      }
  
      return (
        <span className="latex-inline mx-[2px]" dangerouslySetInnerHTML={{ __html: html }} />
      );
    },
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children: React.ReactNode }) => (
      <span className="underline underline-offset-6">{children}</span>
    ),
    underlineWavy: ({ children }: { children: React.ReactNode }) => (
      <span className="underline underline-offset-6 decoration-wavy">{children}</span>
    ),
    strike: ({ children }: { children: React.ReactNode }) => (
      <span className="line-through">{children}</span>
    ),
    subscript: ({ children }: { children: React.ReactNode }) => (
      <span className="subscript">{children}</span>
    ),
    superscript: ({ children }: { children: React.ReactNode }) => (
      <span className="superscript"><sup>{children}</sup></span>
    ),
    accent1: ({ children }: { children: React.ReactNode }) => (
      <span className="accent1">{children}</span>
    ),
    accent2: ({ children }: { children: React.ReactNode }) => (
      <span className="accent2">{children}</span>
    ),
    accent3: ({ children }: { children: React.ReactNode }) => (
      <span className="accent3">{children}</span>
    ),
    
  },
};

export default RichTextComponents;
