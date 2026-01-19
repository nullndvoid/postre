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
import { useRef, useState } from "react";

export default function () {
  const monacoRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const [editorWidth, setEditorWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  async function processMarkdown(markdown: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeDocument)
      .use(rehypeSlug)
      .use(
        rehypeAutolinkHeadings,
        // {
        //   properties: {
        //     className: [""],
        //   },
        //   content: () => {
        //     return {
        //       type: "element",
        //       tagName: "span",
        //       properties: {
        //         class: "text-gray-200",
        //       },
        //       children: [{ type: "text", value: "#" }],
        //     };
        //   },
        // }
      )
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(markdown);

    setHtmlContent(String(file));
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
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
    <div className="flex items-center justify-center min-h-screen">
      <div ref={containerRef} className="flex m-8 gap-4 h-[90vh] w-full">
        <div style={{ width: `${editorWidth}%` }} className="flex flex-col">
          <span className="font-mono text-xs text-gray-400 pt-4 pb-2">
            EDITOR
          </span>
          <textarea
            name="md-editor"
            value={editorContent}
            onChange={(e) => {
              e.preventDefault();
              setEditorContent(e.target.value);
              handleEditorChange(e.target.value);
            }}
            className="flex-1 w-full p-4 bg-gray-900/50 text-white font-mono resize-none outline-none ring-0"
          ></textarea>
        </div>
        <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors"
        />
        <div
          style={{ width: `${100 - editorWidth}%` }}
          className="flex flex-col"
        >
          <span className="font-mono text-xs text-gray-400 px-4 pt-4 pb-2">
            PREVIEW
          </span>
          <div className="flex-1 overflow-auto">
            <article
              className="prose-sm lg:prose-xl prose-slate font-sans dark:prose-invert p-4 prose-a:underline"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
