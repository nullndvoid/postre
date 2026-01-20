"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function EditorDropdown() {
  return (
    <div className="w-52 text-right font-sans text-sm/1.5">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-blue-900/50 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          Publish
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right border border-white/5 dark:bg-gray-900/50 bg-gray-200 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Draft
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Unlisted
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-white/10">
              {/* <Globe className="size-4 fill-white/30" /> */}
              Public
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>

          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-white/10">
              <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘A
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-white/10">
              <TrashIcon className="size-4 fill-white/30" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
