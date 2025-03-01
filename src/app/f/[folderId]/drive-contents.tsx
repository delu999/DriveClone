"use client";

import { FileRow, FolderRow } from "~/app/f/[folderId]/file-row";
import React from "react";
import { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { Cloud, Upload } from "lucide-react";
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
    <div className="flex h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <header className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
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
            className="ut-button:hover:bg-gray-200 ut-button:text-sm ut-button:font-medium ut-button:bg-gray-100 ut-button:text-gray-900 ut-button:w-fit h-8 rounded-md bg-gray-100 ut-button:px-3 text-sm hover:bg-gray-200"
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
        {props.parents.map((folder, index) => (
          <div key={folder.id} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-500">{">"}</span>}
            <Link
              href={`/f/${folder.id}`}
              className={cn(
                "text-sm hover:text-gray-100",
                index === props.parents.length - 1
                  ? "text-gray-100"
                  : "text-gray-400",
              )}
            >
              {folder.name}
            </Link>
          </div>
        ))}
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
