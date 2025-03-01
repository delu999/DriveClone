import React from "react";
import { FolderIcon, FileIcon, MoreVertical } from 'lucide-react';
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { files_table, folders_table } from "~/server/db/schema";
import { deleteFile } from "~/server/actions";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;

  return (
    <div className="group relative flex flex-col rounded-lg border border-gray-800 bg-gray-950/50 p-4 hover:bg-gray-900/50">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <FileIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
          <Link
            href={file.url}
            className="text-sm font-medium text-gray-100 hover:underline truncate"
          >
            {file.name}
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 ml-2"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Move
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              className="text-red-400 focus:bg-gray-700 focus:text-red-400"
              onClick={() => {
                deleteFile(file.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-auto pt-2 text-xs text-gray-400">
        {"size" in file && file.size && <p>{file.size}</p>}
      </div>
    </div>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;

  return (
    <div className="group relative flex flex-col rounded-lg border border-gray-800 bg-gray-950/50 p-4 hover:bg-gray-900/50">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <FolderIcon className="h-6 w-6 flex-shrink-0 text-blue-400" />
          <Link
            href={`/f/${folder.id}`}
            className="text-sm font-medium text-gray-100 hover:underline truncate"
          >
            {folder.name}
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 ml-2"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-100 focus:bg-gray-700 focus:text-gray-100">
              Move
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 focus:bg-gray-700 focus:text-red-400">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}