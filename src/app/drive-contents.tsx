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
import { mockFiles, mockFolders, FolderItem, FileItem } from "~/lib/mock-data";
import { FileRow } from "~/app/file-row";
import React from "react";
import { files, folders } from "~/server/db/schema";
import Link from "next/link";

export default function DriveContents(props: {
  files: FileItem[];
  folders: FolderItem[];
}) {
  const breadcrumb: unknown[] = [];

  return (
    <div className="dark min-h-screen w-full bg-background">
      <div className="container mx-auto min-h-screen max-w-6xl p-4 text-foreground">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/f/1">My drive</Link>
              </BreadcrumbItem>

              {breadcrumb.map((folder, index) => (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={`/f/${folder.id}`}>
                      {folder.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {props.folders.map((folder) => (
            <FileRow key={folder.id} item={folder} />
          ))}
          {props.files.map((file) => (
            <FileRow key={file.id} item={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
