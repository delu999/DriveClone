"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { FileRow, FolderRow } from "~/app/f/[folderId]/file-row";
import React from "react";
import { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { Cloud, FileText, Folder, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePostHog } from "posthog-js/react";
import { twMerge } from "tailwind-merge";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const posthog = usePostHog();

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <header className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
        <div className="flex items-center gap-3">
          <Cloud className="h-6 w-6 text-gray-100" />
          <span className="text-lg font-semibold text-gray-100">
            Simple Drive
          </span>
        </div>
        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <UploadButton
            endpoint="driveUploader"
            className="ut-button:hover:bg-gray-200 ut-button:text-sm ut-button:font-medium ut-button:bg-gray-100 ut-button:text-gray-900 h-8 ut-button:w-fit rounded-md bg-gray-100 px-3 text-sm font-medium text-gray-900 shadow hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            appearance={{
              allowedContent: {
                display: "none",
              },
            }}
            content={{
              button({ ready }) {
                if (ready)
                  return (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  );
                return "Getting ready...";
              },
            }}
            onBeforeUploadBegin={(files) => {
              posthog.capture("files_uploading", {
                fileCount: files.length,
              });

              return files;
            }}
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            input={{
              folderId: props.currentFolderId,
            }}
          />
        </div>
      </header>

      <div className="flex items-center gap-2 border-b border-gray-800 px-6 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-gray-500">
              <Link href="/f/1">My drive</Link>
            </BreadcrumbItem>

            {props.parents.map((folder, index) => (
              <React.Fragment key={folder.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/f/${folder.id}`}
                    className="text-gray-500"
                  >
                    {folder.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {props.folders.map((folder) => (
            <FolderRow key={folder.id} folder={folder} />
          ))}
          {props.files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      </main>
    </div>
  );
}
