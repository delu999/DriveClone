import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { folders_table, files_table } from "~/server/db/schema";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size} bytes</div>
        <div className="col-span-1 text-gray-400">
          <button
            onClick={() => deleteFile(file.id)}
            aria-label={`Delete ${file.name}`}
            title={`Delete ${file.name}`}
            className="inline-flex items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50"
            type="button"
          >
            <Trash2Icon className="h-5 w-5" />
            <span className="sr-only">Delete {file.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
