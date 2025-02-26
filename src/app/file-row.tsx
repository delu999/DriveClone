import React from "react";
import { FileItem, FolderItem } from "~/lib/mock-data";
import {
  FolderIcon,
  FileIcon,
  ImageIcon,
  FileTextIcon,
  MoreVertical,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";

interface FileRowProps {
  item: FileItem | FolderItem;
}

export function FileRow({ item }: FileRowProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <FolderIcon className="h-8 w-8 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />;
      case "document":
        return <FileTextIcon className="h-8 w-8 text-orange-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Link
      href={`/f/${item.id}`}
      className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {getFileIcon(item.type)}
          <div>
            <h3 className="font-medium">{item.name}</h3>
            {"size" in item && item.size && (
              <p className="text-sm text-muted-foreground">{item.size}</p>
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
