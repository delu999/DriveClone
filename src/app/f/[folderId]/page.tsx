import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";
import { get } from "http";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentFolderId: number | null = folderId;

  while (currentFolderId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentFolderId))
    if (!folder[0]) {
      break;
    }

    parents.unshift(folder[0]);
    currentFolderId = folder[0]?.parent;
  }
  return parents;
}

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  console.log(params.folderId);

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
