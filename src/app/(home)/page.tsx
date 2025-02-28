import { auth } from "@clerk/nextjs/server";
import { Cloud, ArrowRight, Lock, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32">
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
                Simple Drive gives you secure cloud storage with a clean,
                minimal interface. No clutter, just your files.
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
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-gray-950/50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-gray-100" />
            <span className="text-sm font-semibold text-gray-100">
              Simple Drive
            </span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 Simple Drive. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
