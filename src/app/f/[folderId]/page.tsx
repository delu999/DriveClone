import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { FileItem, FolderItem } from "~/lib/mock-data";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  console.log(params.folderId);

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const foldersFromDb = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
  const filesFromDb = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
    
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
