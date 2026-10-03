import { RichText as LexicalRichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type CodeFields = { code?: string; language?: string };

// Default converters, plus the code block used for snippets in articles.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    Code: ({ node }: { node: { fields: CodeFields } }) => (
      <pre>
        <code data-language={node.fields.language}>{node.fields.code}</code>
      </pre>
    ),
  },
});

/** Renders an article body from the dashboard, styled by `.prose-note`. */
export function RichText({ data }: { data: SerializedEditorState }) {
  return <LexicalRichText data={data} converters={converters} className="prose-note" disableContainer={false} />;
}
