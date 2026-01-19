"use client";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";

export default function () {
  const monacoRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [editorWidth, setEditorWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  async function processMarkdown(markdown: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        properties: {
          className: [""],
        },
        content: (node) => {
          return {
            type: "element",
            tagName: "span",
            properties: {},
            children: [{ type: "text", value: "##" }],
          };
        },
      })
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(markdown);

    setHtmlContent(String(file));
  }

  function handleEditorChange(value: string | undefined) {
    if (value) {
      processMarkdown(value);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = editorWidth;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    function handleMouseMove(e: MouseEvent) {
      const deltaX = e.clientX - startX;
      const newWidth = startWidth + (deltaX / containerWidth) * 100;
      setEditorWidth(Math.max(20, Math.min(80, newWidth)));
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <div ref={containerRef} className="flex mx-8 gap-0 my-4 h-screen">
      <div style={{ width: `${editorWidth}%` }}>
        <Editor
          defaultLanguage="markdown"
          height="90vh"
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
          onChange={handleEditorChange}
        />
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors"
      />
      <div style={{ width: `${100 - editorWidth}%` }} className="overflow-auto">
        <article
          className="prose prose-slate prose-h1:text-md font-sans lg:prose-xl dark:prose-invert p-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
