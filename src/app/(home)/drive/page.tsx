import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <div className="flex min-h-[55vh]">
        <form
          className="flex w-full items-center justify-center"
          action={async () => {
            "use server";
            const session = await auth();
            if (!session.userId) {
              return redirect("/sign-in");
            }

            const rootFolderId = await MUTATIONS.onboardUser(session.userId);
            return redirect(`/f/${rootFolderId}`);
          }}
        >
          <Button className="h-12 bg-gray-100 px-8 text-base text-gray-900 hover:bg-gray-200">
            Create new Drive
          </Button>
        </form>
      </div>
    );
  }
  return redirect(`/f/${rootFolder.id}`);
}
