"use client";

export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 w-fit bg-gray-700 dark:bg-gray-200 text-white dark:outline-2 dark:-outline-offset-1 dark:hover:text-white dark:hover:bg-black/70 dark:text-black font-sans hover:font-semibold font-medium hover:text-black hover:bg-gray-300 dark:hover:text-grey-700 hover:outline-2 hover:outline-black dark:hover:outline-white hover:-outline-offset-2"
    >
      {text}
    </button>
  );
}
