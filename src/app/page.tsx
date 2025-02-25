"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Upload } from "lucide-react";
import { mockFiles, mockFolders, FolderItem } from "~/lib/mock-data";
import { FileRow } from "~/app/file-rows";
import React from "react";

export default function Page() {
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [currentPath, setCurrentPath] = useState<
    { id: string; name: string }[]
  >([{ id: "root", name: "Home" }]);

  // Filtra le cartelle e i file in base alla cartella corrente
  const folders = mockFolders.filter(
    (folder) => folder.parent === currentFolderId,
  );
  const files = mockFiles.filter((file) => file.parent === currentFolderId);

  const navigateToFolder = (folder: FolderItem) => {
    setCurrentFolderId(folder.id);
    setCurrentPath([...currentPath, { id: folder.id, name: folder.name }]);
  };

  const navigateToBreadcrumb = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    setCurrentFolderId(newPath[newPath.length - 1]?.id ?? "root");
  };

  return (
    <div className="dark min-h-screen w-full bg-background">
      <div className="container mx-auto min-h-screen max-w-6xl p-4 text-foreground">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Breadcrumb>
        <BreadcrumbList>
          {currentPath.map((crumb, index) => {
          const isLast = index === currentPath.length - 1;
          return (
            <React.Fragment key={crumb.id}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {isLast ? (
              <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
              <BreadcrumbLink
                onClick={() => navigateToBreadcrumb(index)}
              >
                {crumb.name}
              </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            </React.Fragment>
          );
          })}
        </BreadcrumbList>
        </Breadcrumb>
        <Button size="sm">
        <Upload className="mr-2 h-4 w-4" />
        Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {folders.map((folder) => (
        <FileRow
          key={folder.id}
          item={folder}
          onFolderClick={navigateToFolder}
        />
        ))}
        {files.map((file) => (
        <FileRow key={file.id} item={file} />
        ))}
      </div>
      </div>
    </div>
  );
}
