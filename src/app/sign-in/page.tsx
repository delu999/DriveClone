import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Cloud, ArrowRight, Lock, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <main className="flex-1 flex flex-col items-center justify-center">
        <SignInButton mode="modal" fallbackRedirectUrl={"/drive"}>
          <Button size="lg" className="bg-white text-black">Sign In</Button>
        </SignInButton>
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
