import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { folders, files } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      Seed function
      <form action={async (e) => {
        "use server";
        console.log("Seeding database");

        const folderInsert = await db.insert(folders).values(mockFolders.map((folder, index) => ({
            id: index + 1,
            name: folder.name,
            parent: index !== 0 ? 1 : null,
        })));
        console.log(folderInsert);

        const fileInsert = await db.insert(files).values(mockFiles.map((file, index) => ({
            id: index + 1,
            name: file.name,
            size: 40000,
            url: file.url,
            parent: (index % 3) + 1,
        })));
        console.log(fileInsert);
      }}>
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
