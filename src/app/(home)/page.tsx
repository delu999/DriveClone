import { auth } from "@clerk/nextjs/server";
import { Cloud, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <div className="flex items-center gap-3">
          <Cloud className="h-10 w-10 text-gray-100" />
          <span className="text-2xl font-semibold text-gray-100">
            Simple Drive
          </span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-100 sm:text-5xl md:text-6xl">
            Store everything. <br className="hidden sm:inline" />
            Access anywhere.
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Simple Drive gives you secure cloud storage with a clean, minimal
            interface. No clutter, just your files.
          </p>
        </div>
        <form
          action={async () => {
            "use server";

            const session = await auth();
            if (!session.userId) {
              return redirect("/sign-in");
            }
            return redirect("/drive");
          }}
        >
          <Button
            type="submit"
            className="h-12 bg-gray-100 px-8 text-base text-gray-900 hover:bg-gray-200"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </div>
    </>
  );
}
