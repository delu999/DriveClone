import React from "react";
import { FileItem, FolderItem } from "~/lib/mock-data";
import { FolderIcon, FileIcon, MoreVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { files, folders } from "~/server/db/schema";

export function FileRow(props: { file: typeof files.$inferSelect }) {
  const { file } = props;

  return (
    <Link
      href={`/f/${file.id}`}
      className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <FileIcon className="h-8 w-8 text-gray-500" />
          <div>
            <h3 className="font-medium">{file.name}</h3>
            {"size" in file && file.size && (
              <p className="text-sm text-muted-foreground">{file.size}</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}

export function FolderRow(props: { folder: typeof folders.$inferSelect }) {
  const { folder } = props;

  return (
    <Link
      href={`/f/${folder.id}`}
      className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon className="h-8 w-8 text-blue-500" />
          <div>
            <h3 className="font-medium">{folder.name}</h3>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
