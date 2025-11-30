import React from "react";
import { RichTextComponents } from "./RichTextComponents";

export const RichTextHeaderComponents = {
  ...RichTextComponents,

  block: {
    // render "normal" blocks as inline so they can live safely inside <h1>
    normal: ({ children }: { children?: React.ReactNode }) => (
      <span className="whitespace-pre-wrap">{children}</span>
    ),
  }
};

export default RichTextHeaderComponents;
