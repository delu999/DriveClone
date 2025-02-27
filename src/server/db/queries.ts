import "server-only";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
  type DB_FileType,
  type DB_FolderType,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
  },
  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  },
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentFolderId: number | null = folderId;

    while (currentFolderId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentFolderId));
      if (!folder[0]) {
        break;
      }

      parents.unshift(folder[0]);
      currentFolderId = folder[0]?.parent;
    }
    return parents;
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
    };
    userId: string;
  }) {
    return db.insert(filesSchema).values({ ...input.file, parent: 1 });
  },
};
