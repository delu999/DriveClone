"use client";

import { FileRow, FolderRow } from "~/app/f/[folderId]/file-row";
import React from "react";
import { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { ChevronRight, Cloud, Upload } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { cn } from "~/lib/utils";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const posthog = usePostHog();

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center justify-center gap-3">
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
              className="ut-button:hover:bg-gray-200 ut-button:text-sm ut-button:font-medium ut-button:bg-gray-100 ut-button:text-gray-900 ut-button:w-fit ut-button:px-3 h-8 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
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
        </div>
      </header>
      <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              {props.parents.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="mx-2 text-gray-500" size={16} />
                  )}
                  <Link
                    href={`/f/${folder.id}`}
                    className="text-gray-300 hover:text-white"
                  >
                    {folder.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-gray-800 shadow-xl">
            <div className="border-b border-gray-700 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-3">Size</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            <ul>
              {props.folders.map((folder) => (
                <FolderRow key={folder.id} folder={folder} />
              ))}
              {props.files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
