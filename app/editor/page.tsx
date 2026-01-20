"use client";

import EditorDropdown from "./dropdown";
import Editor from "./editor";

export default function () {
  return (
    <div className="flex flex-col px-4 py-4 min-h-screen gap-1">
      {/* Navbar of sorts. */}
      <div className="w-auto flex dark:bg-gray-900/20">
        <div className="ml-auto font-sans">
          <EditorDropdown />
        </div>
      </div>
      <Editor />
    </div>
  );
}
