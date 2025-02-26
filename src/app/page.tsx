import { db } from "~/server/db";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import DriveContents from "./drive-contents";
import { FileItem, FolderItem } from "~/lib/mock-data";

export default async function GoogleDriveClone() {
  const filesFromDb = await db.select().from(filesSchema);
  const foldersFromDb = await db.select().from(foldersSchema);

  const files: FileItem[] = filesFromDb.map((file: any) => ({
    id: file.id.toString(),
    name: file.name,
    type: "file",
    url: file.url,
    parent: file.parent.toString(),
    size: file.size.toString(),
  }));

  const folders: FolderItem[] = foldersFromDb.map((folder: any) => ({
    id: folder.id.toString(),
    name: folder.name,
    type: "folder",
    parent: folder.parent !== null ? folder.parent.toString() : null,
  }));

  return <DriveContents files={files} folders={folders} />;
}
